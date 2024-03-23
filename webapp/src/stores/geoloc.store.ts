import { defineStore } from "pinia";

export const useGeolocStore = defineStore("geoloc", {
  state: () => ({
    latitude: 0,
    longitude: 0
  }),

  actions: {
    async requestNavGeoloc() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords?.latitude;
            this.longitude = position.coords?.longitude;
            resolve(this);
          });
        } else {
          reject(new Error('Geolocation is not supported by this browser'));
        }
      });
    },

    async isNearStation() {
      // Call API to check if the user is near a station
      return false;
    }
  }
});