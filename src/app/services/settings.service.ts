import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  LinkTheme = document.querySelector('#theme');
  constructor() {
    let themeURL = localStorage.getItem('theme') || './assets/css/colors/default-dark.css'
    this.LinkTheme?.setAttribute('href', themeURL)
  }

  changeTheme(theme: string, links: NodeListOf<Element>) {
    const url = `./assets/css/colors/${theme}.css`
    this.LinkTheme?.setAttribute('href', url)
    localStorage.setItem('theme', url)
    this.checkThemeActive(links)
  }
  checkThemeActive(links: NodeListOf<Element>) {
    links.forEach(element => {
      element.classList.remove('working')
      const btnTheme = element.getAttribute('data-theme')
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      const themeActive = this.LinkTheme?.getAttribute('href')
      if (btnThemeUrl === themeActive) {
        element.classList.add('working')
      }
    })

  }
}
