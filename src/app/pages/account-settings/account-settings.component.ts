import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  links: NodeListOf<Element>

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector')
    this.settingsService.checkThemeActive(this.links)
  }
  changeTheme(theme: string) {
    this.settingsService.changeTheme(theme, this.links)
  }


}
