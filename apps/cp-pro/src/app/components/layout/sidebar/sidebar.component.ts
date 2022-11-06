import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatestWith, map, Observable } from 'rxjs';
import { LocationNodeModel } from '../../../models';
import { LocationService, LocationTreeFilterService } from '../../../services';
import { SearchFieldComponent } from '../../common';
import { TreeNavigationComponent } from '../../navigation';

@Component({
  selector: 'cp-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    SearchFieldComponent,
    NgIf,
    AsyncPipe,
    TreeNavigationComponent,
  ]
})
export class SidebarComponent implements OnInit {
  public filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public tree$!: Observable<LocationNodeModel | undefined>;

  public constructor(
    public readonly locationService: LocationService,
    private readonly filterService: LocationTreeFilterService,
  ) {
  }

  public ngOnInit(): void {
    this.tree$ = this.filter$.pipe(
      combineLatestWith(this.locationService.tree()),
      map(([filter, tree]) => this.filterService.filter(tree, filter)),
    );
  }
}
