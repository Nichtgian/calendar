import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from "@angular/common/http";

import { Calendar } from './app.component';

/*pages*/
import { HomePage } from '../pages/home/home';
import { EventPage } from "../pages/event/event";
import { EventDetailsPage } from "../pages/event-details/event-details";
import { DayDetailsPage } from "../pages/day-details/day-details";

/*native*/
import { DatePicker } from "@ionic-native/date-picker";

/*providers*/
import { EventProvider } from '../providers/event/event';

/*firebase*/
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { IonicStorageModule } from "@ionic/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2jqIARWZLcYHHikCZSEsfQlEMTcvrbvE",
  authDomain: "calendar-187.firebaseapp.com",
  databaseURL: "https://calendar-187.firebaseio.com",
  projectId: "calendar-187",
  storageBucket: "calendar-187.appspot.com",
  messagingSenderId: "1007092087701"
};

@NgModule({
  declarations: [
    Calendar,
    HomePage,
    EventPage,
    EventDetailsPage,
    DayDetailsPage
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(Calendar),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    IonicStorageModule.forRoot()
  ],

  bootstrap: [
    IonicApp
  ],

  entryComponents: [
    Calendar,
    HomePage,
    EventPage,
    EventDetailsPage,
    DayDetailsPage
  ],

  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    StatusBar,
    SplashScreen,
    DatePicker,
    EventProvider
  ]
})

export class AppModule {}
