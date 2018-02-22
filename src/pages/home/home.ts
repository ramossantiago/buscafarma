import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: number = -0.292557;
  lng: number = -78.478322;


  constructor(public navCtrl: NavController) {

  }

}
