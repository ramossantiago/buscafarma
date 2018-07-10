import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }


  verHoraActual() {

    let date = new Date();

    console.log(date.getHours(), date.getMinutes(), date.getDay());


  }

}
