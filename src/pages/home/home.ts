import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*interfaces*/
import { Field } from "../../model/Field";
import { Event } from "../../model/Event";

/*pages*/
import { EventPage } from "../event/event";
import { DayDetailsPage } from "../day-details/day-details";
import { EventDetailsPage } from "../event-details/event-details";

/*providers*/
import { EventProvider } from "../../providers/event/event";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  weekday: Array<string> = [
    "Montag", //1
    "Dienstag", //2
    "Mittwoch", //3
    "Donnerstag", //4
    "Freitag", //5
    "Samstag", //6
    "Sonntag"  //0
  ];

  month: Array<Array<Field>> = null;
  fields: Array<Field> = [];

  constructor(public navCtrl: NavController, private eventProvider: EventProvider, private storage: Storage) {
    this.storage.ready().then(() => this.load());
    this.eventProvider.changeDetectionEmitter.subscribe(
      () => {
        this.load();
      },
      (err) => {
        console.log("error at update: " + err);
      }
    );
  }

  date: Date = new Date(Date.now());

  async load() {
    const day: number = 24 * 60 * 60 * 1000;

    let date = this.date;
    let month = date.getMonth();
    let year = date.getFullYear();

    let daysOfMonth = new Date(year, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(year, month, 1);
    let lastDayOfMonth = new Date(year, month + 1, 0);
    let daysBefore = this.getDay(firstDayOfMonth);

    this.month = [];
    this.fields = [];

    for (let field = 0; field < 42; field++) {
      let content: Field = {
        id: field,
        date: null,
        events: [],

        last: false,
        next: false,
        today: false
      };

      /*previous month*/
      if (field < daysBefore) {
        content.date = new Date(firstDayOfMonth.getTime() - ((daysBefore - field) * day));
        content.last = true;
      }

      /*current month*/
      else if (field < daysOfMonth + daysBefore){
        content.date = new Date(firstDayOfMonth.getTime() + (field - daysBefore) * day);
      }

      /*next month*/
      else {
        content.date = new Date(lastDayOfMonth.getTime() + ((field - (daysOfMonth + daysBefore)) * day + day));
        content.next = true;
      }

      /*is today*/
      if (content.date.toDateString() == new Date().toDateString()) {
        content.today = true;
      }

      content.events = await this.getEvents(content.date);
      this.fields.push(content);
    }

    for (let w = 0; w < 6; w++) {
      this.month[w] = [];
      for (let d = 0; d < 7; d++) {
        this.month[w][d] = this.getField(w, d);
      }
    }
  }

  /*convert js weekday so - sa to swiss mo - so*/
  getDay(date: Date) {
    let day = date.getDay();
    day--;
    if (day < 0) {
      day = 6;
    }
    return day;
  }

  /*get field value 0 - 41 from week 1 - 6 and day 1 - 7*/
  getField(week: number, day: number) {
    return this.fields[7 * week + day];
  }

  /*return events of date*/
  async getEvents(date: Date) {
    const day: number = 24 * 60 * 60 * 1000;
    let dbEvents = await this.eventProvider.load();
    let events: Array<Event> = [];

    for (let i = 0; i < dbEvents.length; i++) {
      let event: Event = dbEvents[i];
      event.start = new Date(event.start);

      /*event is less than a day*/
      if (event.duration <= 24 * 60 &&
        event.start.getTime() >= date.getTime() &&
        event.start.getTime() + event.duration * 60 * 1000 < date.getTime() + day) {
        events.push(event);
      }

      /*event longer than a day*/
    }

    events.sort(function (e1, e2) {
      if (e1.start > e2.start) return 1;
      if (e1.start < e2.start) return -1;
      return 0;
    });

    return events;
  }

  async newEvent() {
    await this.navCtrl.push(EventPage);
  }

  async addEvent(day: Field) {
    await this.navCtrl.push(EventPage,{ 'date': day.date });
  }

  async showDay(day: Field) {
    if (day.events.length > 0) {
      await this.navCtrl.push(DayDetailsPage, { 'day': day });
    }
  }

  async showEventDetails(event: Event) {
    await this.navCtrl.push(EventDetailsPage, { 'event': event });
  }

  changeMonth(numb: number) {
    this.date.setMonth(this.date.getMonth() + numb);
    this.load();
  }
}
