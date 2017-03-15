import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/getService';
import { PostService } from '../../services/postService';
import { MarketEmail } from '../market-email/market-email';
import { MarketSocial } from '../market-social/market-social';
import { MarketText } from '../market-text/market-text';
import { MarketDrip } from '../market-drip/market-drip';
import { ModalController, Platform, NavParams, NavController, ViewController, Events} from 'ionic-angular';

@Component({
  selector: 'page-market-options',
  templateUrl: 'market-options.html',
  providers: [ GetService, PostService ]

})
export class MarketOptions implements OnInit{
    constructor(public viewCtrl: ViewController, public platform: Platform, public params: NavParams, public getService: GetService, public postService: PostService, public events: Events, public modalCtrl: ModalController, public navCtrl: NavController){
        this.market = params.get('market');
    }
    market = {
        name: '',
        templates: [],
        id: 0
    }
    getTemplates(){
        this.getService.getStorage().then((key)=>{
            this.getService.getSpecificJobs(key, this.market.id).subscribe((res)=>{
                this.market = res;
                console.log(this.market)
            })
        })
    }
    openModal(option){
        let method = option.template_type.id
        if(method == 2){
            let modal = this.modalCtrl.create(MarketEmail, {option: option});
            modal.present();
        }else if(method == 1){
            let modal = this.modalCtrl.create(MarketText, {option: option});
            modal.present();
        } else if(method == 3){
            let modal = this.modalCtrl.create(MarketDrip, {option: option});
            modal.present();
        } else {
            let modal = this.modalCtrl.create(MarketSocial, {option: option});
            modal.present();
        }
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    ngOnInit(){
        this.getTemplates();
    }
    
}