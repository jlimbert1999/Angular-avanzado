import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  title_route = ''
  titleChanges$: Subscription
  constructor(private router: Router) {
    this.titleChanges$ = this.getData_Route().subscribe((titulo: any) => {
      this.title_route = titulo.tituloRuta
      document.title = `Admin-Pro ${this.title_route}`
    })
  }
  ngOnDestroy(): void {
    this.titleChanges$.unsubscribe()
  }

  getData_Route() {
    return this.router.events
      .pipe(
        filter((event: any) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      )

  }

  ngOnInit(): void {
  }

}
