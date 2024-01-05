export enum DayOfWeek {
    Sunday = 'Sunday',
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
  }
  
export type Events = {
    description: string;
    dayOfWeek: DayOfWeek;
    userId: string;
}

export default Events;