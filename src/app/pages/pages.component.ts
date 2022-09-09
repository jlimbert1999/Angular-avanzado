import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function initCustomFunction(): any  //se eecuntra en assets
//ejecutar este metodo para ajustar bien el diseño


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  constructor(private settingsService: SettingsService) {

  }

  ngOnInit(): void {
    initCustomFunction()

  }

}
