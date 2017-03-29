import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/getService';
import { NavController, ModalController, Events, FabContainer, NavParams } from 'ionic-angular';
import { PutService } from '../../services/putService';
import { AddContact } from '../../modals/add-contact/add-contact';
import { SpecificAction } from '../../modals/specific-action/specific-action';
import { AddAction } from '../../modals/add-action/add-action';

@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html',
  providers: [ GetService, PutService ]

})
export class Actions implements OnInit{
  constructor(public navCtrl: NavController, public params: NavParams, private getService: GetService, public putService: PutService, public modalCtrl: ModalController, public events: Events) {
    this.start = params.get('key');
    this.events.subscribe('actionSelect', () =>{
      this.getActions();
    })
    this.events.subscribe('actionAdded', () =>{
      this.getActions();
    })
  }
  public start;
  public actions;
  public action = {
    action_type: {
      name: ''
    },
    complete: 0,
    contact: {
      first_name: ''
    },
    due_date: '',
    id: 0,
  }
  public newAction = {
    "complete": 1
  }
  public status = true;
  showDim = false;

  getActions(){
    this.getService.getStorage().then(key => {
            this.getService.getActions(key).subscribe(res => {
              this.actions = res;
             });
        })
  }
  completeAction(id){
    this.getService.getStorage().then(key => {
      setTimeout(()=>{
        this.putService.completeAction(key, id, this.newAction).subscribe(res => {
          this.getActions();
        })
      }, 500)
    })
  }
  addContact(){
    let modal = this.modalCtrl.create(AddContact);
    modal.present();
  }
  chooseActionContact(){
    let modal = this.modalCtrl.create(AddAction);
    modal.present();
  }
  openSpecificAction(action){
    this.navCtrl.push(SpecificAction, {action: action});
  }
  dateCheck(x){
    let date = (new Date()).toISOString().slice(0,10).replace(/-/g,"")
    let a = x.slice(0,4)
    let b = x.slice(5,7)
    let c = x.slice(8,10)
    let z = a+b+c;
    if(z > date){
      return '#768189'
    } else if (z == date){
      return '#1A9199'
    } else if (z < date){
      return '#E55F61'
    }
  }
  statusCheck(stat){
    if(stat){
      return "lightgreen"
    } else {
      return "white"
    }
  }
  animate(id){
    if(id == true){
      return true
    } else {
      return false
    }
  }
  closeFab(fab: FabContainer): void {
    if (fab !== undefined) {
      fab.close();
    }
  }
  classCheck(x){
    let action = x.action_type.id
    let date = (new Date()).toISOString().slice(0,10).replace(/-/g,"")
    let a = x.due_date.slice(0,4)
    let b = x.due_date.slice(5,7)
    let c = x.due_date.slice(8,10)
    let z = a+b+c;
    if( action === 1){
      if(z > date){
        return 'email'
      } else if (z == date){
        return 'emailBlue'
      } else if (z < date){
        return 'emailRed'
      }
    } else if( action === 2){
      if(z > date){
        return 'text'
      } else if (z == date){
        return 'textBlue'
      } else if (z < date){
        return 'textRed'
      }
    } else if( action === 3){
      if(z > date){
        return 'call'
      } else if (z == date){
        return 'callBlue'
      } else if (z < date){
        return 'callRed'
      }
    } else if( action === 4){
      if(z > date){
        return 'meet'
      } else if (z == date){
        return 'meetBlue'
      } else if (z < date){
        return 'meetRed'
      }
    }
  }
  flop = true;
  log(){
    console.log('skiped')
  }
  ngOnInit(){
      this.getActions();
  }
}
