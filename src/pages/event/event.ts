import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/*interfaces*/
import { Event } from "../../model/Event";

/*providers*/
import { EventProvider } from "../../providers/event/event";

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})

export class EventPage {
  day: number = 24 * 60 * 60 * 1000;

  event = {
    id: this.getID(),
    start: new Date(Date.now() + this.day / 12).toISOString(),
    duration: 30,
    color: null,
    title: "",
    description: "",
    location: ""
  };

  colors: Array<any> = [
    {name: "purple", selected: true},
    {name: "blue", selected: false},
    {name: "green", selected: false},
    {name: "yellow", selected: false},
    {name: "orange", selected: false},
    {name: "red", selected: false}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventProvider: EventProvider) {
    let date = navParams.get('date');

    if (date != undefined && date != null) {
      this.event.start = new Date(date.getTime() + this.day / 2).toISOString();
    }
  }

  async pop() {
    await this.navCtrl.pop();
  }

  async add() {
    let event: Event = {
      id: this.event.id,
      start: new Date(new Date(this.event.start).getTime() - this.day / 12),
      duration: this.event.duration,
      color: this.getColor(),
      title: this.event.title,
      description: this.event.description,
      location: this.event.location
    };
    this.eventProvider.add(event);
    await this.pop();
  }

  colorChange(color) {
    for (let i = 0; i < this.colors.length; i++) {
      if (color.name != this.colors[i].name) {
        this.colors[i].selected = false;
      }
    }
  }

  getColor() {
    for (let i = 0; i < this.colors.length; i++) {
      if (this.colors[i].selected) {
        return this.colors[i].name;
      }
    }
  }

  /*random 5 digit int*/
  getID() {
    return Math.floor(Math.random() * 90000) + 10000;
  }
}
