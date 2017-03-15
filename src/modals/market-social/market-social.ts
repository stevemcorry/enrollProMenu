import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/getService';
import { PostService } from '../../services/postService';
import { ModalController, Platform, NavParams, ViewController, Events} from 'ionic-angular';

@Component({
  selector: 'page-market-social',
  templateUrl: 'market-social.html',
  providers: [ GetService, PostService ]

})
export class MarketSocial implements OnInit{
    constructor(public viewCtrl: ViewController, public platform: Platform, public params: NavParams, public getService: GetService, public postService: PostService, public events: Events){
        this.option = params.get('option');
        this.content = this.option.content.fun;
    }
    option;
    content;

    dismiss() {
        this.viewCtrl.dismiss();
    }
    ngOnInit(){
        console.log(this.option)
    }
    
}