import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EntityFormModel, ProjectEntityModel } from '../../../../models';
import { ContentBaseComponent } from '../../content-base.component';
import { ProjectPositionEntityContentComponent } from '../project-position/project-position-entity-content.component';

@Component({
  selector: 'cp-project-entity-content',
  standalone: true,
  templateUrl: './project-entity-content.component.html',
  styleUrls: ['./project-entity-content.component.scss'],
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    ProjectPositionEntityContentComponent
  ]
})
export class ProjectEntityContentComponent extends ContentBaseComponent implements OnInit {
  @Input() public entity?: ProjectEntityModel;
  @Input() public action!: 'view' | 'edit';
  @Output() public values: EventEmitter<EntityFormModel<ProjectEntityModel>> = new EventEmitter();
  public form!: UntypedFormGroup;

  public ngOnInit(): void {
    this.form = new UntypedFormGroup({
      company: new FormControl<string>(
        this.entity?.company ?? '',
        {nonNullable: true, validators: Validators.required}
      ),
      sector: new FormControl<string>(
        this.entity?.sector ?? '',
        {nonNullable: true, validators: Validators.required}
      ),
      subsector: new FormControl<string>(
        this.entity?.subsector ?? '',
        {nonNullable: true, validators: Validators.required}
      ),
      country: new FormControl<string>(
        this.entity?.country ?? '',
        {nonNullable: true, validators: Validators.required}
      ),
      description: new FormControl<string>(
        this.entity?.description ?? '',
        {nonNullable: true}
      ),
    });

    if (this.action === 'view') {
      this.form.disable();
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.values.emit(this.form.value);
    }
  }
}
