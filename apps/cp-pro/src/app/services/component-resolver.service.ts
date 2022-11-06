import { Injectable, Type } from '@angular/core';
import { ContentComponent, ContentComponentMap, ContentType } from '../components';
import { LocationNodeModel } from '../models';

@Injectable({providedIn: 'root'})
export class ComponentResolverService {
  private readonly map = ContentComponentMap;

  public getConstructor(location: LocationNodeModel): Type<ContentComponent> {
    return this.map[this.getType(location)];
  }

  private getType(location: LocationNodeModel): ContentType {
    if (!location.parent) {
      return 'home';
    }

    if (location.children) {
      return 'category';
    }

    return 'search';
  }
}
