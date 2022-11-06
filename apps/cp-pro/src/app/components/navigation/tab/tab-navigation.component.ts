import { CdkMenuModule } from '@angular/cdk/menu';
import { NgForOf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { LinkDirective } from '../../../directives';
import { LocationNodeModel } from '../../../models';
import { LocationService } from '../../../services';

@Component({
  selector: 'cp-tab-navigation',
  standalone: true,
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.scss'],
  imports: [
    MatTabsModule,
    NgForOf,
    LinkDirective,
    MatMenuModule,
    CdkMenuModule
  ]
})
export class TabNavigationComponent implements OnInit, OnDestroy {
  public locations: LocationNodeModel[] = [];
  public active?: LocationNodeModel;
  private subscription!: Subscription;

  public constructor(private readonly locationService: LocationService) {
  }

  public ngOnInit(): void {
    this.subscription = this.locationService.current()
      .subscribe(location => this.updateLocation(location));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public openContextMenu(event: Event, trigger: MatMenuTrigger): void {
    event.preventDefault();
    trigger.openMenu();
  }

  public closeTab(location: LocationNodeModel): void {
    this.locations.splice(this.locations.indexOf(location), 1);
  }

  public closeOtherTabs(location: LocationNodeModel): void {
    this.locations = [location];
    this.active = location;
  }

  private updateLocation(location: LocationNodeModel) {
    // Skip root node
    if (!location.parent) {
      this.active = undefined;

      return;
    }

    // Set active
    this.active = location;

    // Skip if already exists
    if (this.locations.includes(location)) {
      return;
    }

    // Replace direct parent
    const index = this.locations.indexOf(location.parent);
    if (index !== -1) {
      this.locations[index] = location;

      return;
    }

    // Add new
    this.locations.push(location);
  }
}
