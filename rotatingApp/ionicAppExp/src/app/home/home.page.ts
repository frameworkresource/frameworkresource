import { Component , OnInit } from '@angular/core';

import { HttpService } from '../services/remote/http.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private http: HttpService) {}

  className = 'base';
  allSources = [];
  itemsFull = [];
  items = [];
  column = "1.5";
  waitingTime = 22000;

  async ngOnInit() {
    const response = await this.http.what_now();
    const programList = response.split("-");
    await this.runProgram( parseInt(programList[1]), parseInt(programList[2]));
    await this.http.log_data();
    this.http.done();
  }

  private async runProgram(amount: Number, columns: Number){   
    await this.startRotating(amount, columns)
  }

  private transition() {
    return this.className === 'base' ? 'rotate' : 'base';
  }

  private async startRotating(amount, columns) {
    this.allSources = this.createListSources(amount);
    this.itemsFull = this.allSources.map(
      function(item) {
        return {src: item}
      }
    )
    this.column = (12 / parseInt(columns)).toString()
    this.items = this.itemsFull.slice(0, amount);
    setTimeout(() => this.rotateImage(), 2000);
    await this.timeout(this.waitingTime);
  }

  private timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private rotateImage() {
    this.className = this.transition();
  }

  private createListSources(amount) {
    const temp = [];
    for (let index = 0; index < amount; index++) {
      temp[index] = '../../assets/images/img' + ((index % 28) + 1) + '.jpg';
    }
    return temp;
  }
}
