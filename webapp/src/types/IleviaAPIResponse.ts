import type { DirectionType } from '@/enums/DirectionType'

export type Line = {
  id: string
  name: string
  code: string
  color: string
  text_color: string
  physical_modes: {
    id: string
    name: string
  }[]
  routes: {
    id: string
    name: string
    direction: {
      id: string
      name: string
      direction_type: DirectionType
    }
  }[]
}

export type LinesResponse = {
  lines: Line[]
}

export type StopAreasResponse = {
  stop_areas: {
    id: string
    name: string
    label: string
    coord: {
      lon: string
      lat: string
    }
  }[]
}

export type NextDeparturesResponse = {
  times: string[]
}
