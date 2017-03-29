import { Component, OnInit } from '@angular/core';
import { NavController, Slides, ModalController, Events } from 'ionic-angular';
import  { GetService } from '../../services/getService';
import { ViewChild, style, animate, transition, trigger } from '@angular/core';
import { SpecificProspect } from '../../modals/specific-prospect/specific-prospect';
import { AddContact } from '../../modals/add-contact/add-contact';
import { PipelineChoose } from '../../modals/pipeline-choose/pipeline-choose';

@Component({
  selector: 'page-pipeline',
  templateUrl: 'pipeline.html',
  providers: [GetService],
  animations: [
  trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity:0}),
      animate(200, style({opacity:1})) 
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate(200, style({opacity:0})) 
    ])
  ])
]
})
export class Pipeline implements OnInit {

  @ViewChild('pipeSlider') pipeSlider: Slides;

  goToSlide(x) {
    this.pipeSlider.slideTo(x, 500);
  }
  slideChange(){
    if(this.pipeSlider._activeIndex <= 2){
      this.title = 'Names List';
      this.pipeColor(0);
    } else if(this.pipeSlider._activeIndex > 2 && this.pipeSlider._activeIndex <= 4){
      this.pipeColor(1);
      this.title = 'Enrollment'
    } else if (this.pipeSlider._activeIndex === 5){
      this.title = 'Customer'
      this.pipeColor(2);
    } else if (this.pipeSlider._activeIndex >= 6 && this.pipeSlider._activeIndex <= 8){
      this.title = 'Customer'
      this.pipeColor(3);
    }
  }
  constructor(public nav: NavController, public modalCtrl: ModalController, private getService: GetService, public events: Events) {
    this.events.subscribe('pipeSelect', () =>{
      this.getPipelinePositions();
    })
    this.events.subscribe('contactAdded', () => {
      this.getPipelinePositions();
    })
    this.events.subscribe('pipeAdvance', () => {
      this.getPipelinePositions();
      this.getContactPosition();
    })
    this.events.subscribe('editContact', () => {
      this.getPipelinePositions()
    });
    this.events.subscribe('leadsPipe', () =>{
      this.leadsPipe();
    })
    this.events.subscribe('enrollmentsPipe', () =>{
      this.leadsPipe();
    })
    this.events.subscribe('customerPipe', () =>{
      this.customerPipe();
    })
    this.events.subscribe('builderPipe', () =>{
      this.builderPipe();
    })
  }

  public pipelineSteps;
  public title = 'Names List';
  public slides = [
    {name: "Imported Contacts"}
  ];
  public something;
  public prospects = [];
  public allProspects;
  public pipelineFilter = [];
  public obj;
  public prepare = true;
  public invite = false;
  public present = false;
  public enroll = false;
  public support = false;
  dotColor(prosp){
    if(prosp == 0) {
      return "#959595";
      //grey
    } else if(prosp == 1) {
      return "#1A9199";
      //bluish
    } else {
      return "#E55F61"
      //red
    }
  }
  pipeColor(x){
    if(x === 0){
      this.prepare = true;
      this.invite = false;
      this.present = false;
      this.enroll = false;
      this.support = false;
    }
    else if(x === 1){
      this.prepare = false;
      this.invite = true;
      this.present = false;
      this.enroll = false;
      this.support = false;
    }
    else if(x === 2){
      this.prepare = false;
      this.invite = false;
      this.present = true;
      this.enroll = false;
      this.support = false;
    }
    else if(x === 3){
      this.prepare = false;
      this.invite = false;
      this.present = false;
      this.enroll = true;
      this.support = false;
    }
    else if(x === 4){
      this.prepare = false;
      this.invite = false;
      this.present = false;
      this.enroll = false;
      this.support = true;
    }
  }
  slidesSet(){
    this.slides = [];
    this.pipelineSteps.filter((x)=>{
        if(this.slides.indexOf(x) === -1) {
        if (x.id <= 7) {
          this.getContactPosition();
          this.goToSlide(0);
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
  }
  leadsPipe(){
    this.slides = [];
    this.pipelineSteps.filter((x)=>{
        if(this.slides.indexOf(x) === -1) {
        if (x.id <= 7) {
          this.getContactPosition();
          this.goToSlide(0);
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
    this.title = 'Names List';
  }
  customerPipe = () => {
    this.slides = [];
    this.pipelineSteps.filter((x)=>{
      if(this.slides.indexOf(x) === -1){
        if(x.id == 7 || x.id == 8 || x.id == 13 || x.id == 14) {
          this.getContactPosition();
          this.goToSlide(0);
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
    this.title = 'Customers';
  }
  builderPipe = () => {
    this.slides = [];
    this.pipelineSteps.filter((x)=>{
      if(this.slides.indexOf(x) === -1){
        if(x.id >= 7 && x.id <= 12) {
          this.getContactPosition();
          this.goToSlide(0)
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
    this.title = 'Builders';
  }
  openModal(prospect) {
    let pipeChange = this.pipelineSteps.filter(val => {
      return (val.id && val.name)
    })
    this.nav.push(SpecificProspect, {prospect: prospect, slides: pipeChange});
  }
  openAddModal() {
    let modal = this.modalCtrl.create(AddContact);
    modal.present();
  }
  pipelineChoose(){
    let modal = this.modalCtrl.create(PipelineChoose);
    modal.present();
  }
  getPipelinePositions = () => {
    this.getService.getStorage().then(key => {
      this.getService.getPipelinePositions(key).subscribe(res => {
        this.pipelineSteps = res;
        this.slidesSet();
      });
    })
  }
  getContactPosition(){
    this.getService.getStorage().then(key => {
      this.getService.getContactPosition(key).subscribe(res => {
        this.pipelineFilter = [];
        this.prospects = [];
        for(var i = 0; i < res.length; i++){
          for(var x = 0 ; x < res[i].contacts.length; x++){
            let id = res[i].id;
            this.obj = {
              id: id,
              contact: res[i].contacts[x]
            }
            if(this.pipelineFilter.indexOf(this.obj) === -1){
              this.pipelineFilter.push(this.obj);
              this.prospects.push(this.obj);
            }
          }
        } return true;
      });
    })
  }
  

  ngOnInit() {
    this.getPipelinePositions();
  }

}