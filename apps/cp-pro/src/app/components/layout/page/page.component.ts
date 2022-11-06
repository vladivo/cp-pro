import { Component, OnDestroy } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LocationService } from '../../../services';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PageRoutingModule } from './page-routing.module';


@Component({
  selector: 'cp-page',
  standalone: true,
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  imports: [
    MatSidenavModule,
    SidebarComponent,
    HeaderComponent,
    PageRoutingModule,
  ],
})
export class PageComponent implements OnDestroy {
  private readonly subscription: Subscription;

  public constructor(
    private readonly router: Router,
    private readonly locationService: LocationService,
  ) {
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => this.onNavigationEnd(event as NavigationEnd));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private onNavigationEnd(event: NavigationEnd) {
    this.locationService.navigate(event.url);
  }
}
