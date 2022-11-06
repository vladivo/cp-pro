import { FlatTreeControl } from '@angular/cdk/tree';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { LinkDirective } from '../../../directives';
import { FlatNodeModel, LocationNodeModel } from '../../../models';

@Component({
  selector: 'cp-tree-navigation',
  standalone: true,
  templateUrl: './tree-navigation.component.html',
  styleUrls: ['./tree-navigation.component.scss'],
  imports: [
    MatTreeModule,
    MatIconModule,
    NgIf,
    MatButtonModule,
    LinkDirective,
    NgTemplateOutlet,
  ]
})
export class TreeNavigationComponent implements OnInit, OnChanges {
  @Input() public root?: LocationNodeModel;
  public treeControl!: FlatTreeControl<FlatNodeModel>;
  public treeFlattener!: MatTreeFlattener<LocationNodeModel, FlatNodeModel>;
  public dataSource!: MatTreeFlatDataSource<LocationNodeModel, FlatNodeModel>;

  public ngOnInit(): void {
    this.treeControl = new FlatTreeControl(
      node => node.level,
      node => node.expandable,
    );

    this.treeFlattener = new MatTreeFlattener(
      this.transformer.bind(this),
      node => node.level,
      node => node.expandable,
      node => node.children,
    );

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.root?.children ?? [];
  }

  public ngOnChanges(): void {
    if (this.dataSource) {
      this.dataSource.data = this.root?.children ?? [];
      this.treeControl.expandAll();
    }
  }

  public hasChild = (_: number, node: FlatNodeModel) => node.expandable;

  private transformer(node: LocationNodeModel, level: number): FlatNodeModel {
    return {
      location: node,
      expandable: Boolean(node.children?.length),
      level: level,
    };
  }
}
