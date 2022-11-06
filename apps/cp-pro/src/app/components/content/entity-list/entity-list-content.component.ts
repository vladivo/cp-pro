import { Dialog } from '@angular/cdk/dialog';
import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProjectsFixture } from '../../../fixtures/projects.fixture';
import { EntityActionType, EntityDialogData, EntityFormModel, ProjectEntityModel } from '../../../models';
import { SearchFieldComponent } from '../../common';
import { ContentBaseComponent } from '../content-base.component';
import { EntityContentComponent } from '../entity/entity-content.component';

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
    MatDialogModule
  ]
})
export class EntityListContentComponent extends ContentBaseComponent implements AfterViewInit {
  public displayedColumns: string[] = ['id', 'company', 'sector', 'subsector', 'country', 'actions'];
  public columnsToDisplayWithExpand: string[] = [...this.displayedColumns, 'expand'];
  public expandedElement: ProjectEntityModel | null = null;
  @ViewChild(MatSort) public sort!: MatSort;
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  private entities: ProjectEntityModel[] = ProjectsFixture;
  public dataSource: MatTableDataSource<ProjectEntityModel> = new MatTableDataSource(this.entities);

  public constructor(private readonly dialog: Dialog) {
    super();
  }

  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public onAction(entity: ProjectEntityModel, action: EntityActionType): void {
    switch (action) {
      case 'read':
        break;
    }
  }

  public create(): void {
    this.openDialog({readonly: false});
  }

  public view(entity: ProjectEntityModel): void {
    this.openDialog({entity, readonly: true});
  }

  public edit(entity: ProjectEntityModel): void {
    this.openDialog({entity, readonly: false});
  }

  public delete(entity: ProjectEntityModel): void {
    const index = this.entities.indexOf(entity);
    this.entities.splice(index, 1);
    this.dataSource.data = this.entities;
  }

  private openDialog(data: EntityDialogData): void {
    const dialogRef = this.dialog.open<EntityFormModel<ProjectEntityModel>>(EntityContentComponent, {data});
    dialogRef.closed.subscribe(result => this.processDialogResult(data.entity, result));
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
