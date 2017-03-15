import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/postService';
import { GetService } from '../../services/getService';
import { AddAction } from '../add-action/add-action';
import { ModalController, Platform, NavParams, ViewController, Events} from 'ionic-angular';

@Component({
  selector: 'page-choose-action-contacts',
  templateUrl: 'choose-action-contact.html',
  providers: [ GetService, PostService ]

})
export class ChooseActionContact implements OnInit{
    constructor(public viewCtrl: ViewController, public platform: Platform, public params: NavParams, public getService: GetService, public postService: PostService, public events: Events, public modalCtrl: ModalController){
        this.events.subscribe('actionAdded', () => {
            this.dismiss();
        })
        this.option = params.get('option');
    }
    option;
    contacts;
    getContacts(){
        this.getService.getStorage().then(key => {
            this.getService.getContacts(key).subscribe((res)=>{
                this.contacts = res;
            })
        })
    }
    addAction(contact){
        let modal = this.modalCtrl.create(AddAction, {contact: contact});
        modal.present();
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    ngOnInit(){
        this.getContacts();
    }
    
}