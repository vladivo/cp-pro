export interface NavigationItemModel {
  name: string;
  label: string;
  icon?: string;
}

export interface NavigationNodeModel extends NavigationItemModel {
  children?: NavigationNodeModel[];
}

export interface LocationNodeModel extends NavigationItemModel {
  url: string;
  parent?: LocationNodeModel;
  children?: LocationNodeModel[];
}

export interface FlatNodeModel {
  location: LocationNodeModel;
  level: number;
  expandable: boolean;
}
