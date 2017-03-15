import { Component, OnInit } from '@angular/core';
import { MarketOptions } from '../../modals/market-options/market-options';
import { GetService } from '../../services/getService';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-marketing',
  templateUrl: 'marketing.html',
  providers: [ GetService ]
})
export class Marketing implements OnInit{

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public getService: GetService) {}
  markets;
  getMarkets(){
    this.getService.getStorage().then((key)=>{
      this.getService.getJobs(key).subscribe(res=>{
        this.markets = res;
      })
    })
  }

  openModal(market){
    this.navCtrl.push(MarketOptions, {market: market});
  }
  ngOnInit(){
    this.getMarkets();
  }
}