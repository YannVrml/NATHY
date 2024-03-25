import type {
  LinesResponse,
  NextDeparturesResponse,
  StopAreasResponse
} from '@/types/IleviaAPIResponse'
import { ofetch } from 'ofetch'

export const useIlevia = () => {
  const apiBaseUrl = import.meta.env.VITE_ILEVIA_API_URL

  return {
    lines: () => {
      return ofetch<LinesResponse>(`${apiBaseUrl}`)
    },

    stop_area: (lineId: string) => {
      return ofetch<StopAreasResponse>(`${apiBaseUrl}/${lineId}/stop_areas`)
    },

    next_departures: (lineId: string, stopPointId: string, routeId: string) => {
      return ofetch<NextDeparturesResponse>(
        `${apiBaseUrl}/${lineId}/${stopPointId}/${routeId}/departures`
      )
    }
  }
}
