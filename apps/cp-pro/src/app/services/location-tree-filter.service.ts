import { Injectable } from '@angular/core';
import { LocationNodeModel } from '../models';

@Injectable({providedIn: 'root'})
export class LocationTreeFilterService {
  public filter(node: LocationNodeModel, filter: string): LocationNodeModel | undefined {
    if (filter === '') {
      return node;
    }

    const matcher = new RegExp(`(${filter})`, 'i');

    return this.filterSingle(node, matcher);
  }

  private filterSingle(node: LocationNodeModel, matcher: RegExp): LocationNodeModel | undefined {
    const children = this.filterMultiple(matcher, node.children);

    return children?.length || this.isMatch(node, matcher)
           ? {...node, children}
           : undefined;
  }

  private filterMultiple(matcher: RegExp, nodes?: LocationNodeModel[]): LocationNodeModel[] | undefined {
    return nodes?.map(child => this.filterSingle(child, matcher))
      .filter(child => child !== undefined) as LocationNodeModel[];
  }

  private isMatch(node: LocationNodeModel, matcher: RegExp): boolean {
    return Boolean(node.label.match(matcher));
  }
}
