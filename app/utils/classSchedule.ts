import type { ClassSchedule, ClassType, MeetingProvider, Weekday } from '~/types'

export const WEEKDAYS: Weekday[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
export const HOLIDAY_DAYS: Weekday[] = ['Saturday', 'Sunday']
export const ALL_WEEK_DAYS: Weekday[] = [...WEEKDAYS, ...HOLIDAY_DAYS]
export const CLASS_TYPES: ClassType[] = ['Group', 'Special', 'Premium']
export const MEETING_PLATFORMS: MeetingProvider[] = ['Google Meet', 'Zoom']

export const isGroupClass = (classType: string) => classType === 'Group' || classType === 'Group Class'

export const getScheduleDaysLabel = (schedule?: Pick<ClassSchedule, 'daysOfWeek' | 'day'>) =>
  schedule?.daysOfWeek?.length ? schedule.daysOfWeek.join(', ') : schedule?.day || 'Schedule pending'

export const getScheduleDurationLabel = (durationMinutes?: number) => {
  const minutes = durationMinutes || 60
  if (minutes === 60) return '1 hour'
  if (minutes === 120) return '2 hours'
  return `${minutes} minutes`
}

export const addMinutesToTime = (startTime: string, durationMinutes: number) => {
  const match = startTime.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i)
  if (!match) return ''
  let hour = Number(match[1])
  const minute = Number(match[2])
  const meridiem = match[3]?.toUpperCase()
  if (meridiem === 'PM' && hour < 12) hour += 12
  if (meridiem === 'AM' && hour === 12) hour = 0
  const total = (hour * 60 + minute + durationMinutes) % (24 * 60)
  const endHour24 = Math.floor(total / 60)
  const endMinute = total % 60
  if (!meridiem) return `${String(endHour24).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`
  const endMeridiem = endHour24 >= 12 ? 'PM' : 'AM'
  const endHour = endHour24 % 12 || 12
  return `${endHour}:${String(endMinute).padStart(2, '0')} ${endMeridiem}`
}

export const getTodayClassTime = (schedule?: ClassSchedule) => {
  if (!schedule) return 'Schedule pending'
  const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()) as Weekday
  if (HOLIDAY_DAYS.includes(todayName) && isGroupClass(schedule.classType)) return `${todayName} — holiday`
  if (!schedule.daysOfWeek.includes(todayName)) return `No class today (${todayName})`
  return `${schedule.startTime} – ${schedule.endTime} ${schedule.timezone}`
}

export const normalizeSchedule = (schedule: ClassSchedule): ClassSchedule => {
  const group = isGroupClass(schedule.classType)
  const daysOfWeek = group ? [...WEEKDAYS] : schedule.daysOfWeek
  const classType: ClassType = group ? 'Group' : schedule.classType

  return {
    ...schedule,
    classType,
    daysOfWeek,
    day: daysOfWeek.join(', '),
    time: schedule.startTime,
    durationMinutes: group ? 60 : schedule.durationMinutes || 60,
    endTime: addMinutesToTime(schedule.startTime, group ? 60 : schedule.durationMinutes || 60) || schedule.endTime,
    capacity: classType === 'Special' ? Math.min(Math.max(schedule.capacity, 1), 2) : schedule.capacity
  }
}
