import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/postService';
import { GetService } from '../../services/getService';
import { SocialSharing, CallNumber } from 'ionic-native';
import { ModalController, NavParams, ViewController, Events} from 'ionic-angular';

@Component({
  selector: 'page-specific-action',
  templateUrl: 'specific-action.html',
  providers: [ GetService, PostService ]

})
export class SpecificAction implements OnInit{
    constructor(public viewCtrl: ViewController, public params: NavParams, public getService: GetService, public postService: PostService, public events: Events, public modalCtrl: ModalController){
        this.action = params.get('action')
    }
    action = {
        something: 2,
        id: 2,
        notes: '',
        contact: {
            name: "",
            id: 0
        }
    };
    name;
    note;
    email;
    phone
    sendText(){
        SocialSharing.shareViaSMS('Hey ' + this.name + '!' , this.phone).then(()=>{
        }).catch(()=>{
            alert('no sms sent')
        })
    }
    sendEmail(){
        SocialSharing.canShareViaEmail().then(() => {
            SocialSharing.shareViaEmail('Body', 'Subject', [this.email]).then(() => {
            }).catch(() => {
                alert('almost')
            });
        }).catch(() => {
            alert('nope')
        });
    }
    callNumber(){
        CallNumber.callNumber(this.phone, false)
            .then(() => console.log('Launched dialer!'))
            .catch(() => alert('Cannot Call Number'));
    }
    contacts;
    getContacts(){
        this.getService.getStorage().then(key => {
            this.getService.getContacts(key).subscribe((res)=>{
                this.contacts = res;
            })
        })
    }
    getAction(id){
        this.getService.getStorage().then(key => {
            this.getService.getSpecificActions(key, id).subscribe(res=>{
                console.log(res,'Actions')
                this.action.notes = res.notes;
            })
            this.getService.getSpecificContact(key, this.action.contact.id).subscribe(data=>{
                this.phone = data.phone;
                this.email = data.email;
                this.action.contact.name = data.first_name + ' ' + data.last_name;
            })
        })
    }
    classCheck(x){
    let action = x.action_type.id
    if( action === 1){
      return 'email'
    } else if( action === 2){
      return 'text'
    } else if( action === 3){
      return 'call'
    }
  }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    ngOnInit(){
        this.getAction(this.action.id);
    }
    
}