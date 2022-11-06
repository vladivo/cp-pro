import { Type } from '@angular/core';
import { CategoryContentComponent } from './category/category-content.component';
import { EntityListContentComponent } from './entity-list/entity-list-content.component';
import { HomeContentComponent } from './home/home-content.component';

export const ContentTypeNames = ['category', 'home', 'search'] as const;
export type ContentType = typeof ContentTypeNames[number];

export type ContentComponent =
  | CategoryContentComponent
  | HomeContentComponent
  | EntityListContentComponent

export const ContentComponentMap: Record<ContentType, Type<ContentComponent>> = {
  category: CategoryContentComponent,
  home: HomeContentComponent,
  search: EntityListContentComponent,
};
