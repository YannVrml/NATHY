import { defineStore } from 'pinia'

const getNavGeoloc = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position)
      })
    } else {
      reject(new Error('Geolocation is not supported by this browser'))
    }
  })
}

export const useGeolocStore = defineStore('geoloc', {
  state: () => ({
    latitude: 0,
    longitude: 0,
    dialogModel: false,
    hasGeoloc: false
  }),

  actions: {
    async requestNavGeoloc() {
      const permission = await navigator.permissions.query({ name: 'geolocation' })
      if (permission.state === 'granted') {
        const position = await getNavGeoloc()
        this.latitude = position.coords?.latitude
        this.longitude = position.coords?.longitude
        this.hasGeoloc = true
      } else if (permission.state === 'prompt') {
        this.dialogModel = true
      }
    },

    async getPosition() {
      const position = await getNavGeoloc()
      this.latitude = position.coords?.latitude
      this.longitude = position.coords?.longitude
      this.hasGeoloc = true
    },

    distanceTo(latitude: number, longitude: number): number {
      if (!this.hasGeoloc) {
        return 0
      }
      const R = 6371e3 // metres
      const φ1 = (this.latitude * Math.PI) / 180 // φ, λ in radians
      const φ2 = (latitude * Math.PI) / 180
      const Δφ = ((latitude - this.latitude) * Math.PI) / 180
      const Δλ = ((longitude - this.longitude) * Math.PI) / 180

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

      return R * c // in metres
    }
  }
})
