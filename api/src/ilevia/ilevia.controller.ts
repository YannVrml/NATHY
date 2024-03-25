import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { IleviaService } from './ilevia.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  DAY_TO_MILLISECONDS,
  SECOND_TO_MILLISECONDS,
} from 'src/constants/duration.const';

@Controller('ilevia')
@UseInterceptors(CacheInterceptor)
export class IleviaController {
  constructor(private readonly IleviaService: IleviaService) {}

  @Get()
  @CacheTTL(1 * DAY_TO_MILLISECONDS)
  async lines() {
    return this.IleviaService.lines();
  }

  @Get(':lineId/stop_areas')
  @CacheTTL(1 * DAY_TO_MILLISECONDS)
  async stopAreas(@Param('lineId') lineId: string) {
    return this.IleviaService.stopAreas(lineId);
  }

  @Get(':lineId/:stopPointId/:routeId/departures')
  @CacheTTL(10 * SECOND_TO_MILLISECONDS)
  async nextDepartures(
    @Param('lineId') lineId: string,
    @Param('stopPointId') stopPointId: string,
    @Param('routeId') routeId: string,
  ) {
    return this.IleviaService.nextDepartures(lineId, stopPointId, routeId);
  }
}
