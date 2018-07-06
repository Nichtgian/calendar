import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

/*interfaces*/
import { Event } from "../../model/Event";

@Injectable()
export class EventProvider {

  events: Array<Event> = [];
  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(public http: HttpClient, private storage: Storage) {
    this.storage.ready().then(() => this.getEvents());
  }

  async getEvents() {
    await this.storage.get("events").then((val) => {
      if (val != null) {
        this.events = val
      };
    });
  }

  async load() {
    await this.getEvents();
    if (this.events != null) {
      return this.events;
    }
    return [];
  }

  async add(event: Event) {
    this.events.push(event);
    await this.storage.set("events", this.events);
    this.changeDetectionEmitter.emit();
  }

  edit(event: Event) {
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].id == event.id) {
        this.events[i] = event;
      }
    }
    this.storage.set("events", this.events);
    this.changeDetectionEmitter.emit();
  }

  delete(id: number) {
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].id == id) {
        this.events.splice(i, 1);
      }
    }
    this.storage.set("events", this.events);
    this.changeDetectionEmitter.emit();
  }
}
