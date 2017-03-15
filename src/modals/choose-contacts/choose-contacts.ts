import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/postService';
import { GetService } from '../../services/getService';
import { SocialSharing } from 'ionic-native';
import { ModalController, Platform, NavParams, ViewController, Events} from 'ionic-angular';

@Component({
  selector: 'page-choose-contacts',
  templateUrl: 'choose-contacts.html',
  providers: [ GetService, PostService ]

})
export class ChooseContacts implements OnInit{
    constructor(public viewCtrl: ViewController, public platform: Platform, public params: NavParams, public getService: GetService, public modalCtrl: ModalController, public postService: PostService, public events: Events){
        this.data = params.get('data');
        console.log(this.data, 'data')
    }
    data;
    chosen = {
        phones: [],
        emails: []
    };
    phone = [];
    email = [];
    contacts;
    search;
    sendReady = false;
    getContacts(){
        this.getService.getStorage().then(key => {
            this.getService.getContacts(key).subscribe((res)=>{
                this.contacts = res;
            })
        })
    }
    getContactInfo(id){
        this.sendReady === false;
        this.getService.getStorage().then(key => {
            this.getService.getSpecificContact(key, id).subscribe((res)=>{
                if(this.phone.indexOf(res.phone) == -1){
                    this.phone.push(res.phone)
                    console.log(this.phone);
                } else {
                    this.phone.splice(this.phone.indexOf(res.phone), 1);
                    console.log(this.phone);
                }
                if(this.email.indexOf(res.email) == -1){
                    this.email.push(res.email)
                    console.log(this.email)
                } else {
                    this.email.splice(this.email.indexOf(res.email), 1);
                    console.log(this.email);
                }
                this.chosen = {
                    phones: this.phone,
                    emails: this.email
                }
                this.sendReady = true;
            })
        })
    }
    send(){
        if(this.chosen.phones[0]){
            if(this.sendReady){
                if(this.data.type === 'text'){
                    SocialSharing.shareViaSMS(this.data.content , this.phone.toString() ).then(()=>{
                    }).catch(()=>{
                        alert('no sms sent')
                    })
                } else if(this.data.type === 'email'){
                    SocialSharing.canShareViaEmail().then(() => {
                        SocialSharing.shareViaEmail(this.data.content, 'Subject', this.email).then(() => {
                        }).catch(() => {
                            alert('almost')
                        });
                    }).catch(() => {
                        alert('nope')
                    });
                }
            } else {
                setTimeout(()=>{
                    this.send()
                }, 500)
            }
        } else {
            alert('Please Choose a Contact')
        }
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    ngOnInit(){
        this.getContacts();
    }
    
}