import type { DirectionType } from '@/enums/DirectionType'

type Direction = {
  id: string
  name: string
  direction_type: DirectionType
}

type Route = {
  id: string
  name: string
  direction: Direction
}

type Line = {
  id: string
  name: string
  code: string
  color: string
  text_color: string
  routes: Route[]
}

export type MetroLine = Line & {
  stop_areas: StopPoint[]
}

export type NextDepartures = {
  route?: Route
  times?: Date[]
}

export type NextDeparturesOnArea = {
  forward?: NextDepartures
  backward?: NextDepartures
}

export type StopPoint = {
  id: string
  name: string
  label: string
  coord: {
    lon: number
    lat: number
  }
  line: Line
  nextDepartures?: NextDeparturesOnArea
}
