import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const useTimeHelpers = () => ({
  timeTo: (date: Date) => {
    return dayjs(dayjs()).to(dayjs(date))
  },

  timeFromDate: (date: Date) => {
    return dayjs(date).format('HH:mm')
  }
})
