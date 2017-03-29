import { Component, OnInit, ViewChild } from '@angular/core';
import { GetService } from '../../services/getService';
import { PostService } from '../../services/postService';
import {ViewController, Events, AlertController, Slides} from 'ionic-angular';

@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
  providers: [ GetService, PostService ]

})
export class AddContact implements OnInit{
    @ViewChild('choosePipe') choosePipe: Slides;
    constructor(public viewCtrl: ViewController, public getService: GetService, public postService: PostService, public events: Events, public alert: AlertController){}
    contact = {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        pipeline_position: 1,
        role: 1,
        tags: []
    };
    pipelineSteps;
    slides;
    tags;
    
    getPipelinePositions = () => {
        this.slides = [];
        this.getService.getStorage().then(key => {
            this.getService.getPipelinePositions(key).subscribe(res => {
                res.filter(x =>{
                    if(this.slides.indexOf(x) === -1) {
                        if (x.id <= 7) {
                        let z = x.contacts.length;
                        let obj = {
                            contacts: x.contacts,
                            id: x.id,
                            name: x.name,
                            number: z
                        }
                        this.slides.push(obj);
                        }
                    }
                })
            });
        })
    }
    getIndex(x){
        if(this.choosePipe.getActiveIndex() > 6){
            this.choosePipe.slideTo(6)
        }
        if(this.choosePipe.getActiveIndex() == this.slides.indexOf(x)){
            return true;
        } else {
            return false;
        }
    }
    setPipe(){
        this.contact.pipeline_position = this.choosePipe.getActiveIndex() + 1;
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    getTags(){
        this.getService.getStorage().then(key =>{
            this.getService.getTags(key).subscribe(res => {
                this.tags = res;
            })
        })
    }
    log(){
        console.log(this.contact, 'contact')
    }
    tag(x){
        this.contact.tags = [];
        for(let y of x){
            if(y.on){
                this.contact.tags.push(y.id);
            }
        }
    }
    addContact(contact){
        if(contact.first_name && contact.last_name && contact.phone && contact.email){
            this.getService.getStorage().then(key => {
                this.postService.addContact(key, this.contact).subscribe(() => {
                    this.getContacts();
                    this.contact = {
                        first_name: '',
                        last_name: '',
                        phone: '',
                        email: '',
                        pipeline_position: 0,
                        role: 1,
                        tags: []
                    };
                    this.events.publish('contactAdded');
                    this.dismiss();
                });
            })
        } else {
            let alert = this.alert.create({
                title: 'Please Fill Out all the Info',
                buttons: ['OK']
            })
            alert.present();
        }
    }
    getContacts = () => {
    this.getService.getStorage().then(key => {
      this.getService.getContacts(key).subscribe(res => {
      });
    })
  }
  ngOnInit(){
      this.getPipelinePositions();
      this.getTags();
  }

}