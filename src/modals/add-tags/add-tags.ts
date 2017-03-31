import {Component, OnInit} from '@angular/core';
import {ViewController, AlertController, NavParams, Events} from 'ionic-angular';
import { GetService } from '../../services/getService';
import { PostService } from '../../services/postService';
import { PutService } from '../../services/putService';

@Component({
    selector: 'page-add-tags',
    templateUrl: 'add-tags.html',
    providers: [GetService, PostService, PutService]
})
export class AddTags implements OnInit{
    constructor(public viewCtrl: ViewController, public getService: GetService, public postService: PostService, public putService: PutService, public alertCtrl: AlertController, public params: NavParams, public events: Events){
        this.contactTags = params.get('tags');
        this.contact = params.get('contact')
    }
    activeTags = [];
    contact;
    contactTags;
    tags;
    addTag(){
       let alert = this.alertCtrl.create({
            title: 'Add Tag',
            inputs: [
                {
                    name: 'tag',
                    placeholder: 'Tag Name',
                    type: 'text'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Save',
                    handler: data => {
                        let tag = {
                            name: data.tag
                        }
                        this.postTag(tag)
                    }
                }
            ]
        });
        alert.present()
    }

    updateTags(){
        let t = this.tags;
        for(let x of t){
            if(x.active == true){
                this.activeTags.push(x.id);
            }
        }
        this.getService.getStorage().then(key => {
            this.putService.updateTags(key, this.contact.id, this.activeTags).subscribe(res => {
                this.events.publish('tagsAdded')
            })
        })
    }

    activeTag(){
        let c = this.contactTags;
        let t = this.tags;
        for(let x of t){
            for(let z of c){
                if(x.id == z.id){
                    x.active = true;
                }
            }
        }
    }

    postTag(tag){
        this.getService.getStorage().then(key => {
            this.postService.addTag(key, tag).subscribe(res => {
                this.getTags();
            })
        })
    }


    getTags(){
        this.getService.getStorage().then(key => {
            this.getService.getTags(key).subscribe(res => {
                this.tags = res;
                this.activeTag();
            })
        })
    }

    dismiss(){
        this.viewCtrl.dismiss();
    }
    ngOnInit(){
        this.getTags();
    }
}