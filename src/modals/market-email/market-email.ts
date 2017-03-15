import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/getService';
import { PostService } from '../../services/postService';
import { ChooseContacts } from '../choose-contacts/choose-contacts';
import { ModalController, Platform, NavParams, ViewController, Events} from 'ionic-angular';

@Component({
  selector: 'page-market-email',
  templateUrl: 'market-email.html',
  providers: [ GetService, PostService ]

})
export class MarketEmail implements OnInit{
    constructor(public modalCtrl: ModalController, public viewCtrl: ViewController, public platform: Platform, public params: NavParams, public getService: GetService, public postService: PostService, public events: Events){
        this.option = params.get('option');
        this.content = this.option.content.fun;
    }
    option;
    content;
    fun = true;
    direct;
    email;
    call;
    follow;
    subject = "Subject";
    setContent(content){
        this.direct = false;
        this.fun = false;
        this.content = content;
    }
    contentChoose(x){
        if(x === 'direct'){
            this.content = this.option.content.direct;
        } else {
            this.content = this.option.content.fun;
        }
    }
    nextPage(){
        let modal = this.modalCtrl.create(ChooseContacts);
        modal.present();
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    ngOnInit(){
    }
    
}