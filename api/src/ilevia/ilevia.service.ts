import { Injectable } from '@nestjs/common';

@Injectable()
export class IleviaService {
  private readonly ileviaBaseUrl = process.env.ILEVIA_API_BASE_URL;

  private fetchOptions = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      'Referer': 'https://nws-lille.hove.io/fr/full/schedule',
      'Accept': 'application/json',
    }
  }

  async lines() {
    const response = await fetch(
      `${this.ileviaBaseUrl}/full/ws/v1/lines?count=200`,
      {
        ...this.fetchOptions,
      }
    );
    return response.json();
  }

  async stopAreas(lineId: string) {
    const response = await fetch(
      `${this.ileviaBaseUrl}/full/ws/v1/lines/${lineId}/stop_areas?count=200`,
      {
        ...this.fetchOptions,
      }
    );
    return response.json();
  }

  async nextDepartures(lineId: string, stopPointId: string, routeId: string) {
    const response = await fetch(
      `${this.ileviaBaseUrl}/fr/full/journey/stop_areas/${stopPointId}/lines/${lineId}/routes/${routeId}/departures?count=10`,
      {
        ...this.fetchOptions,
      }
    );
    return response.json();
  }
}
