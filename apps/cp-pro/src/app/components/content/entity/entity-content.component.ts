import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { JsonPipe, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectEntityModel } from '../../../models';
import { SearchFieldComponent } from '../../common';
import { ContentBaseComponent } from '../content-base.component';

@Component({
  selector: 'cp-entity-content',
  standalone: true,
  templateUrl: './entity-content.component.html',
  styleUrls: ['./entity-content.component.scss'],
  imports: [
    JsonPipe,
    MatDialogModule,
    MatButtonModule,
    SearchFieldComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf
  ]
})
export class EntityContentComponent extends ContentBaseComponent {
  public form: UntypedFormGroup = new UntypedFormGroup({
    company: new FormControl<string>(
      this.data.entity?.company ?? '',
      {nonNullable: true, validators: Validators.required}
    ),
    sector: new FormControl<string>(
      this.data.entity?.sector ?? '',
      {nonNullable: true, validators: Validators.required}
    ),
    subsector: new FormControl<string>(
      this.data.entity?.subsector ?? '',
      {nonNullable: true, validators: Validators.required}
    ),
    country: new FormControl<string>(
      this.data.entity?.country ?? '',
      {nonNullable: true, validators: Validators.required}
    ),
    description: new FormControl<string>(
      this.data.entity?.description ?? '',
      {nonNullable: true}
    ),
  });

  public constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: { entity?: ProjectEntityModel, readonly: boolean }) {
    super();

    if (data.readonly) {
      this.form.disable();
    }
  }
}
