import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'cp-user-navigation',
  standalone: true,
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.scss'],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ]
})
export class UserNavigationComponent {
}
