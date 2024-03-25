import { Injectable } from '@nestjs/common';

@Injectable()
export class IleviaService {
  private readonly ileviaBaseUrl = process.env.ILEVIA_API_BASE_URL;

  async lines() {
    const response = await fetch(
      `${this.ileviaBaseUrl}/full/ws/v1/lines?count=200`,
    );
    return response.json();
  }

  async stopAreas(lineId: string) {
    const response = await fetch(
      `${this.ileviaBaseUrl}/full/ws/v1/lines/${lineId}/stop_areas?count=200`,
    );
    return response.json();
  }

  async nextDepartures(lineId: string, stopPointId: string, routeId: string) {
    const response = await fetch(
      `${this.ileviaBaseUrl}/fr/full/journey/stop_areas/${stopPointId}/lines/${lineId}/routes/${routeId}/departures?count=10`,
    );
    return response.json();
  }
}
