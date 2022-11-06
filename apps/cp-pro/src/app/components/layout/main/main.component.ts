import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { DynamicContentDirective } from '../../../directives/dynamic-content.directive';
import { LocationNodeModel } from '../../../models';
import { LocationService } from '../../../services';

@Component({
  selector: 'cp-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [
    AsyncPipe,
    NgIf,
    MatIconModule,
    DynamicContentDirective
  ]
})
export class MainComponent {
  public location$: Observable<LocationNodeModel> = this.locationService.current();

  public constructor(private readonly locationService: LocationService) {
  }
}
