import { Injectable } from '@angular/core';
import { LocationNodeModel, NavigationNodeModel } from '../models';

@Injectable({providedIn: 'root'})
export class LocationTreeBuilderService {
  public build(navigation: NavigationNodeModel): LocationNodeModel {
    return this.buildRecursively(navigation);
  }

  private buildRecursively(node: NavigationNodeModel, parent?: LocationNodeModel): LocationNodeModel {
    const url = parent ? `${parent.url}/${node.name}` : '';

    const location: LocationNodeModel = {
      url,
      parent,
      name: node.name,
      label: node.label,
      icon: node.icon,
    };

    location.children = node.children?.map(
      childNode => this.buildRecursively(childNode, location),
    );

    return location;
  }
}
