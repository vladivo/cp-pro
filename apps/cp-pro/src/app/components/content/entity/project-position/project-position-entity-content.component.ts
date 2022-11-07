import { NgIf } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProjectPositionFixture } from '../../../../fixtures/project-position.fixture';
import { ProjectPositionModel } from '../../../../models';
import { SearchFieldComponent } from '../../../common';
import { ContentBaseComponent } from '../../content-base.component';

@Component({
  selector: 'cp-project-position-entity-content',
  standalone: true,
  templateUrl: './project-position-entity-content.component.html',
  styleUrls: ['./project-position-entity-content.component.scss'],
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    MatIconModule,
    SearchFieldComponent,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class ProjectPositionEntityContentComponent extends ContentBaseComponent implements AfterViewInit {
  public displayedColumns: string[] = ['id', 'projectid', 'posnumber', 'description'];
  @ViewChild(MatSort) public sort!: MatSort;
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  private entities: ProjectPositionModel[] = ProjectPositionFixture;
  public dataSource: MatTableDataSource<ProjectPositionModel> = new MatTableDataSource(this.entities);

  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
