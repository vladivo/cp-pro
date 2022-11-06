import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'cp-search-field',
  standalone: true,
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SearchFieldComponent {
  public value = '';
  @Output() public search: EventEmitter<string> = new EventEmitter();
}
