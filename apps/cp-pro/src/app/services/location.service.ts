import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationFixture } from '../fixtures';
import { LocationNodeModel } from '../models';
import { LocationTreeBuilderService } from './location-tree-builder.service';

@Injectable({providedIn: 'root'})
export class LocationService {
  private readonly root$: BehaviorSubject<LocationNodeModel>;
  private readonly current$: BehaviorSubject<LocationNodeModel>;

  public constructor(locationTreeBuilder: LocationTreeBuilderService) {
    this.root$ = new BehaviorSubject(locationTreeBuilder.build(NavigationFixture));
    this.current$ = new BehaviorSubject<LocationNodeModel>(this.root$.getValue());
  }

  public tree(): Observable<LocationNodeModel> {
    return this.root$.asObservable();
  }

  public current(): Observable<LocationNodeModel> {
    return this.current$.asObservable();
  }

  public navigate(url: string): void {
    this.current$.next(this.findNodeByUrl(url));
  }

  private findNodeByUrl(url: string): LocationNodeModel {
    let location: LocationNodeModel = this.root$.getValue();

    if (url === '/') {
      return location;
    }

    const segments = url.split('/');
    segments.shift();
    segments.forEach(segment => {
      location = location.children?.find(child => child.name === segment) as LocationNodeModel;
    });

    return location;
  }
}
