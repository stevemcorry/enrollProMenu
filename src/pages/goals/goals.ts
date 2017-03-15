import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { GetService } from '../../services/getService';
import { EditGoals } from '../../modals/edit-goals/edit-goals';
import { NavController, Events, ModalController, AlertController, Slides } from 'ionic-angular';

@Component({
  selector: 'page-goals',
  templateUrl: 'goals.html',
  providers: [GetService]
})
export class Goals implements OnInit{
  @ViewChild('donutCanvas') doughnutCanvas;
  @ViewChild('gameSlides') gameSlides: Slides;

  doughnutChart: any;
  constructor(public navCtrl: NavController, public getService: GetService, public events: Events, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.events.subscribe('goalSelect', () => {
      this.getName();
      this.getContactPosition();
      this.getGoalTotals();
    })
    this.events.subscribe('points', () => {
      this.getContactPosition();
    })
  }
  name;
  pager = [
    {
      slide: 0,
      on: false
    },
    {
      slide: 1,
      on: false
    },
    {
      slide: 2,
      on: false
    }
  ]
  getName(){
    this.getService.getStorageName().then(res => {
      this.name = res;
    })
  }
  openEdit(){
    let modal = this.modalCtrl.create(EditGoals);
    modal.present();
  }
  pagerCheck(x){
    if(this.gameSlides.getActiveIndex() === x.slide){
      return "circleOn";
    } else {
      return 'none'
    }
  }
  openHelp(){
    if(this.gameSlides.getActiveIndex() === 0){
      let alert = this.alertCtrl.create({
        title: 'Points System',
        subTitle: 'For every 200 points, you will fill up the circle and gain one step. <br> For every 1000 points you gain a star',
        buttons: ['OK']
      });
      alert.present();
    } else if (this.gameSlides.getActiveIndex() === 1){
        let alert = this.alertCtrl.create({
          title: 'Bar Graphs',
          subTitle: 'Set new goals by clicking the pencil in the top left',
          buttons: ['OK']
        });
        alert.present();
    } else if (this.gameSlides.getActiveIndex() === 2){
        let alert = this.alertCtrl.create({
          title: 'Badges',
          subTitle: 'Earn Badges as you add and move more people in the pipeline!',
          buttons: ['OK']
        })
        alert.present();
    } else {
        let alert = this.alertCtrl.create({
            title: 'Points!',
            subTitle: 'Earn points as you add and move people in the pipeline!',
            buttons: ['OK']
          })
        alert.present();
    }
  }




  //First Slide
  diamond;
  emerald;
  sapphire;
  ruby;
  pearl;
  step;
  stars = [];
  points = 0;
  width;
  rank;
  donutChart(prog){
    if(this.doughnutChart){
      this.doughnutChart.destroy();
    }
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
            type: 'pie',
            options: {
              elements:{
                arc: {
                  roundedCornersFor: 0
                },
                center: {
                  maxText: '100%',
                  text: '67%',
                  fontColor: '#FF6684',
                  fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                  fontStyle: 'normal',
                  minFontSize: 1,
					        maxFontSize: 256,
                }
              },
              legend: {
                display: false
              },
              tooltips: {
                  enabled: false
              },
              cutoutPercentage: 78,
            },
            plotOptions: {
                series: {
                    borderRadiusTopLeft: '50%',
                    borderRadiusTopRight: '50%'
                  }
              },
            data: {
                datasets: [{
                    data: prog,
                    backgroundColor: [
                        '#ADD474',
                        '#5F4275',
                    ],
                    borderColor: [
                      '#5F4275',
                      '#5F4275'
                    ]
                }]
            }
        });
  }
  getContactPosition(){
    this.points = 0;
    this.getService.getStorage().then(key => {
      this.getService.getContactPosition(key).subscribe(res => {
      res.filter(x => {
        for(var j = 0; j < x.contacts.length; j++){
          if(x.contacts.length){
            this.points += (x.id * 10);
          }
        }
      })
      this.setPoints(this.points);
      });
    })
  }
  setPoints(x){
    let one = x % 200;
    let two = 200 - one;
    this.donutChart([one, two]);
    let step = Math.floor(x / 200);
    if(step % 5 === 0){
      this.diamond = false;
      this.emerald = false;
      this.sapphire = false;
      this.ruby = false;
      this.pearl = false;
      this.step = "pearl";
    } else if( step % 5 === 4){
      this.diamond = false;
      this.emerald = true;
      this.sapphire = true;
      this.ruby = true;
      this.pearl = true;
      this.step = "diamond";
    } else if( step % 5 === 3){
      this.diamond = false;
      this.emerald = false;
      this.sapphire = true;
      this.ruby = true;
      this.pearl = true;
      this.step = "emerald";
    } else if( step % 5 === 2){
      this.diamond = false;
      this.emerald = false;
      this.sapphire = false;
      this.ruby = true;
      this.pearl = true;
      this.step = "sapphire";
    } else if( step % 5 === 1){
      this.diamond = false;
      this.emerald = false;
      this.sapphire = false;
      this.ruby = false;
      this.pearl = true;
      this.step = "ruby";
    } 
    let star = Math.floor(x / 1000);
    if(star === 0 ){
      this.stars = [];
      this.rank = 'Bronze'
    } else if(star === 1) {
      this.stars = [1];
      this.rank = 'Silver'
    } else if (star === 2){
      this.stars = [1,2];
      this.rank = 'Gold'
    } else if (star === 3){
      this.stars = [1,2,3];
      this.rank = 'Platinum'
    } else if (star === 4){
      this.stars = [1,2,3,4];
      this.rank = 'Crystaled'
    } else {
      this.stars = [1,2,3,4,5];
      this.rank = 'Oil God'
    }
  }
  updateChart(data){
    this.donutChart(data);
  }
  //Second Slide
  goals = [];
  getGoalTotals(){
    this.goals = [];
    this.getService.getStorage().then(key => {
      this.getService.getContactPosition(key).subscribe(res => {
      res.filter(x => {
        let obj = {
          name: x.name,
          amount: x.contacts.length
        }
        if(obj.name === 'Top 45' || obj.name === 'Experienced E.O.'  || obj.name === 'Committed to Receiving Presentation'  || obj.name === 'Experienced Presentation'  || obj.name === 'Enrolled' )
        this.goals.push(obj);
      })
      });
    })
  }
  setWidth(x){
    return (x*10)+'%';
  }
  //Third Slide
  // inner1 = "225px";
  // inner2 = "181px";
  // inner3 = "136px";
  // inner4 = "92px";
  // inner5 = "45px";

  ngOnInit(){
  }
}