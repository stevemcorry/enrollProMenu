import { Component, OnInit } from '@angular/core';
import { GetService} from '../../services/getService';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
  providers: [ GetService ]
})
export class Messages implements OnInit{

  constructor(public navCtrl: ModalController, public getService: GetService) {
  }

  ngOnInit(){
  }
}