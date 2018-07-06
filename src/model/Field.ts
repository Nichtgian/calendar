/*interfaces*/
import { Event } from "./Event";

export interface Field {
  id: number;     //0 - 41
  date: Date;
  events: Event[];

  last: boolean;  //field of last month
  next: boolean;  //field of next month
  today: boolean; //field is today
}
