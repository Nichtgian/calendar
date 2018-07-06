export interface Event {
  id: number;       //random int(5) for identification
  start: Date;      //event starting datetime
  duration: number; //in minutes
  color: string;

  title: string;
  description: string;
  location: string;
}
