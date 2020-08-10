import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  pageTitle = 'Info';

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor() { }

  ngOnInit() {
  }

}
