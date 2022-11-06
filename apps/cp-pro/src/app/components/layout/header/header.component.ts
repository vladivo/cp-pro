import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LinkDirective } from '../../../directives';
import { TabNavigationComponent, UserNavigationComponent } from '../../navigation';

@Component({
  selector: 'cp-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    TabNavigationComponent,
    UserNavigationComponent,
    LinkDirective,
  ]
})
export class HeaderComponent {
}
