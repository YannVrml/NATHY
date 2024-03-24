import { defineStore } from "pinia";

const getNavGeoloc = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      });
    } else {
      reject(new Error('Geolocation is not supported by this browser'));
    }
  });

}

export const useGeolocStore = defineStore("geoloc", {
  state: () => ({
    latitude: 0,
    longitude: 0,
    dialogModel: false,
    hasGeoloc: false,
  }),

  actions: {
    async requestNavGeoloc() {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      if (permission.state === 'granted') {
        const position = await getNavGeoloc();
        this.latitude = position.coords?.latitude;
        this.longitude = position.coords?.longitude;
        this.hasGeoloc = true;
      } else if (permission.state === 'prompt') {
        this.dialogModel = true;
      }
    },

    async getPosition() {
      const position = await getNavGeoloc();
      this.latitude = position.coords?.latitude;
      this.longitude = position.coords?.longitude;
      this.hasGeoloc = true;
    },
  }
});