import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { LinkDirective } from '../../../directives';
import { LocationNodeModel } from '../../../models';
import { LocationService } from '../../../services';
import { ContentBaseComponent } from '../content-base.component';

@Component({
  selector: 'cp-category-content',
  standalone: true,
  templateUrl: './category-content.component.html',
  styleUrls: ['./category-content.component.scss'],
  imports: [
    NgIf,
    AsyncPipe,
    MatIconModule,
    LinkDirective,
    NgForOf,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ]
})
export class CategoryContentComponent extends ContentBaseComponent {
  public location$: Observable<LocationNodeModel> = this.locationService.current();

  public constructor(private readonly locationService: LocationService) {
    super();
  }
}
