import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-page-foud',
  templateUrl: './no-page-foud.component.html',
  styleUrls: ['./no-page-foud.component.css']
})
export class NoPageFoudComponent implements OnInit {
  year = new Date().getFullYear()
  constructor() { }

  ngOnInit(): void {
  }

}
