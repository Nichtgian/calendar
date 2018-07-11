import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*interfaces*/
import { Event } from "../../model/Event";

/*providers*/
import { EventProvider } from "../../providers/event/event";

@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})

export class EventDetailsPage {
  day: number = 24 * 60 * 60 * 1000;

  event = {
    id: 0,
    start: null,
    duration: 0,
    color: null,
    title: "",
    description: "",
    location: ""
  };

  colors: Array<any> = [
    {name: "purple", selected: false},
    {name: "blue", selected: false},
    {name: "green", selected: false},
    {name: "yellow", selected: false},
    {name: "orange", selected: false},
    {name: "red", selected: false}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventProvider: EventProvider) {
    let event: Event = navParams.get('event');
    this.event = {
      id: event.id,
      start: new Date(event.start.getTime() + this.day / 12).toISOString(),
      duration: event.duration,
      color: event.color,
      title: event.title,
      description: event.description,
      location: event.location
    };
    this.setColor();
  }

  public async pop() {
    await this.navCtrl.pop();
  }

  public async safe() {
    let event: Event = {
      id: this.event.id,
      start: new Date(new Date(this.event.start).getTime() - this.day / 12),
      duration: this.event.duration,
      color: this.getColor(),
      title: this.event.title,
      description: this.event.description,
      location: this.event.location
    };
    this.eventProvider.edit(event);
    await this.pop();
  }

  public setColor() {
    for (let i = 0; i < this.colors.length; i++) {
      if (this.event.color == this.colors[i].name) {
        this.colors[i].selected = true;
      }
    }
  }

  public colorChange(color) {
    for (let i = 0; i < this.colors.length; i++) {
      if (color.name != this.colors[i].name) {
        this.colors[i].selected = false;
      }
    }
  }

  public getColor() {
    for (let i = 0; i < this.colors.length; i++) {
      if (this.colors[i].selected) {
        return this.colors[i].name;
      }
    }
  }

  public async delete() {
    this.eventProvider.delete(this.event.id);
    await this.pop();
  }
}
