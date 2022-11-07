import { NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProjectsFixture } from '../../../fixtures/projects.fixture';
import { EntityFormModel, ProjectEntityModel } from '../../../models';
import { SearchFieldComponent } from '../../common';
import { ContentBaseComponent } from '../content-base.component';
import { ProjectEntityContentComponent } from '../entity/project/project-entity-content.component';

@Component({
  selector: 'cp-overview-content',
  standalone: true,
  templateUrl: './entity-list-content.component.html',
  styleUrls: ['./entity-list-content.component.scss'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SearchFieldComponent,
    MatButtonModule,
    MatIconModule,
    NgTemplateOutlet,
    MatDialogModule,
    ProjectEntityContentComponent,
    NgIf,
    MatFormFieldModule
  ]
})
export class EntityListContentComponent extends ContentBaseComponent implements AfterViewInit {
  public displayedColumns: string[] = ['id', 'company', 'sector', 'subsector', 'country', 'actions'];
  @ViewChild(MatSort) public sort!: MatSort;
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  public currentEntity?: ProjectEntityModel;
  public currentAction?: 'view' | 'edit';
  private entities: ProjectEntityModel[] = ProjectsFixture;
  public dataSource: MatTableDataSource<ProjectEntityModel> = new MatTableDataSource(this.entities);

  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public create(): void {
    this.currentAction = 'edit';
  }

  public view(entity: ProjectEntityModel): void {
    this.currentEntity = entity;
    this.currentAction = 'view';
  }

  public edit(entity: ProjectEntityModel): void {
    this.currentEntity = entity;
    this.currentAction = 'edit';
  }

  public delete(entity: ProjectEntityModel): void {
    const index = this.entities.indexOf(entity);
    this.entities.splice(index, 1);
    this.dataSource.data = this.entities;
  }

  private processDialogResult(entity?: ProjectEntityModel, result?: EntityFormModel<ProjectEntityModel>): void {
    if (!result) {
      return;
    }

    if (entity) {
      this.entities[this.entities.indexOf(entity)] = {...entity, ...result};
      this.dataSource.data = Array.from(this.entities);
    } else {
      this.entities.unshift({
        type: 'project',
        id: new Date().toISOString(),
        ...result,
      });
    }

    this.dataSource.data = this.entities;
  }
}
