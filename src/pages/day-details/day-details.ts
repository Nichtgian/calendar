import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/*interfaces*/
import { Field } from "../../model/Field";

@IonicPage()
@Component({
  selector: 'page-day-details',
  templateUrl: 'day-details.html',
})

export class DayDetailsPage {
  day: Field = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.day = navParams.get('day');
  }
}
