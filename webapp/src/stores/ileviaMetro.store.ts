import { useIlevia } from '@/composables/useIlevia'
import type { MetroLine, NextDeparturesOnArea, StopPoint } from '@/types/MetroLine'
import { defineStore } from 'pinia'
import { useGeolocStore } from './geoloc.store'

const createDateFromTime = (time: string) => {
  const [hours, minutes] = time.split(':').map((time) => parseInt(time))
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)

  if (date < new Date()) date.setDate(date.getDate() + 1)
  return date
}

export const useIleviaMetroStore = defineStore('ileviaMetro', {
  state: (): {
    metroLines: MetroLine[]
    stopPoints: StopPoint[]
  } => ({
    metroLines: [],
    stopPoints: []
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
              coord: {
                lon: parseFloat(stopArea.coord.lon),
                lat: parseFloat(stopArea.coord.lat)
              },
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
          route:
            stopPoint.line.routes.find((route) => route.direction.direction_type === 'forward') ??
            stopPoint.line.routes[0],
          times: []
        },
        backward: {
          route:
            stopPoint.line.routes.find((route) => route.direction.direction_type === 'backward') ??
            stopPoint.line.routes[1],
          times: []
        }
      }
      try {
        if (nextDepartures?.forward?.route)
          nextDepartures.forward.times = (
            await ileviaApi.next_departures(
              stopPoint.line.id,
              stopPoint.id,
              nextDepartures.forward.route.id
            )
          ).times.map((time) => createDateFromTime(time))
      } catch (e) {
        nextDepartures.forward = undefined
      }
      try {
        if (nextDepartures?.backward?.route)
          nextDepartures.backward.times = (
            await ileviaApi.next_departures(
              stopPoint.line.id,
              stopPoint.id,
              nextDepartures.backward.route.id
            )
          ).times.map((time) => createDateFromTime(time))
      } catch (e) {
        nextDepartures.backward = undefined
      }
      stopPoint.nextDepartures = nextDepartures
      return stopPoint.nextDepartures
    },

    async pendMetroLineFetch() {
      return new Promise<void>((resolve) => {
        if (this.metroLines.length === 0) {
          const interval = setInterval(() => {
            if (this.metroLines.length > 0) {
              clearInterval(interval)
              resolve()
            }
          }, 100)
        } else {
          resolve()
        }
      })
    },

    nearStopAreas() {
      const geolocStore = useGeolocStore()
      if (!geolocStore.hasGeoloc) return []
      return this.stopPoints.filter((stopPoint) => {
        return geolocStore.distanceTo(stopPoint.coord.lat, stopPoint.coord.lon) < 500
      })
    }
  }
})
