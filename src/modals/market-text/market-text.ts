import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/getService';
import { PostService } from '../../services/postService';
import { ChooseContacts } from '../choose-contacts/choose-contacts';
import { NavController, ModalController, Platform, NavParams, ViewController, Events} from 'ionic-angular';

@Component({
  selector: 'page-market-text',
  templateUrl: 'market-text.html',
  providers: [ GetService, PostService ]

})
export class MarketText implements OnInit{
    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public platform: Platform, public params: NavParams, public getService: GetService, public postService: PostService, public events: Events, public modalCtrl: ModalController){
        this.option = params.get('option');
    }
    option;
    content;
    data;
    email;
    call;
    follow;
    fun = true;
    direct;
    single = true;
    getTemplate(){
        this.getService.getStorage().then((key)=>{
            this.getService.getSpecificTemplate(key, this.option.id).subscribe(res=>{
                this.data = res;
                this.content = res.body_fun;
            })
        })
    }
    setContent(content){
        this.direct = false;
        this.fun = false;
        this.content = content;
    }
    contentChoose(x){
        if(x === 'direct'){
            this.content = this.data.body_direct;
        } else {
            this.content = this.data.body_fun;
        }
    }
    nextPage(content){
        let data = {
            content: content,
            type: 'text'
        }
        let modal = this.modalCtrl.create(ChooseContacts, {data: data});
        modal.present();
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    ngOnInit(){
        this.getTemplate();
    }
    
}