import { useIlevia } from '@/composables/useIlevia'
import type { Line } from '@/types/IleviaAPIResponse'
import type { MetroLine, NextDeparturesOnArea, StopPoint } from '@/types/MetroLine'
import { defineStore } from 'pinia'

const deg2rad = (deg: number) => {
  return deg * (Math.PI/180)
}

const createDateFromTime = (time: string) => {
  const [hours, minutes] = time.split(':').map((time) => parseInt(time))
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)

  if (date < new Date())
    date.setDate(date.getDate() + 1)
  return date
}

export const useIleviaMetroStore = defineStore('ileviaMetro', {
  state: (): {
    metroLines: MetroLine[];
    stopPoints: StopPoint[];
  } => ({
    metroLines: [],
    stopPoints: [],
  }),

  actions: {
    async getMetroLines() {
      const ileviaApi = useIlevia()

      const lines = await ileviaApi.lines()

      const metroLines = lines.lines.filter((line) =>
        line.physical_modes.some((mode) => mode.id === 'physical_mode:Metro')
      )
      this.metroLines = await Promise.all(
        metroLines.map(async (line) => {
          const stop_areas = await ileviaApi.stop_area(line.id)
          return {
            id: line.id,
            name: line.name,
            code: line.code,
            color: `#${line.color}`,
            text_color: `#${line.text_color}`,
            routes: line.routes,
            stop_areas: stop_areas.stop_areas.map((stopArea) => ({
              id: stopArea.id,
              name: stopArea.name,
              label: stopArea.label,
              coord: stopArea.coord,
              line
            }))
          }
        })
      )

      for (const metroLine of this.metroLines) {
        for (const stopArea of metroLine.stop_areas) {
          this.stopPoints.push({
            id: stopArea.id,
            name: stopArea.name,
            label: stopArea.label,
            coord: stopArea.coord,
            line: metroLine
          })
        }
      }

      return this.metroLines
    },

    async populateNextDepartures(stopPoint: StopPoint) {
      const ileviaApi = useIlevia()
      const nextDepartures: NextDeparturesOnArea = {
        forward: {
          route: stopPoint.line.routes.find((route) => route.direction.direction_type === 'forward') ?? stopPoint.line.routes[0],
          times: []
        },
        backward: {
          route: stopPoint.line.routes.find((route) => route.direction.direction_type === 'backward') ?? stopPoint.line.routes[1],
          times: []
        }
      };
      try {
        if (nextDepartures?.forward?.route)
          nextDepartures.forward.times = (await ileviaApi.next_departures(stopPoint.line.id, stopPoint.id, nextDepartures.forward.route.id))
            .times.map((time) => createDateFromTime(time));
      } catch (e) {
        nextDepartures.forward = undefined;
      }
      try {
        if (nextDepartures?.backward?.route)
          nextDepartures.backward.times = (await ileviaApi.next_departures(stopPoint.line.id, stopPoint.id, nextDepartures.backward.route.id))
            .times.map((time) => createDateFromTime(time));
      } catch (e) {
        nextDepartures.backward = undefined;
      }
      stopPoint.nextDepartures = nextDepartures;
      return stopPoint.nextDepartures;
    },

    nearStopAreas(lat: number, lon: number) {
      return this.stopPoints.filter((stopPoint) => {
        const R = 6371 // Radius of the earth in km
        const dLat = deg2rad(parseFloat(stopPoint.coord.lat) - lat) // deg2rad below
        const dLon = deg2rad(parseFloat(stopPoint.coord.lon) - lon)
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat)) *
            Math.cos(deg2rad(parseFloat(stopPoint.coord.lat))) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c // Distance in km
        return distance < 0.5 // Check if the distance is less than 500m
      })
    }
  }
})
