export type EntityActionType = 'create' | 'read' | 'update' | 'delete';

export interface EntityBaseModel {
  type: string;
  id: string;
}

export interface ProjectEntityModel extends EntityBaseModel {
  type: 'project';
  company: string,
  sector: string,
  subsector: string,
  country: string,
  description?: string,
  description2?: string,
}

export interface ProjectPositionModel extends EntityBaseModel {
  type: 'projectposition',
  typ: string,
  posnumber: string,
  pnr: string,
  miete: string,
  zuposition: string,
  lv: string,
  lvposition: string,
  ca: string,
  menge: string,
  einheit: string,
  gvh: string,
  zeiteinheit: string,
  kurztext: string,
  description: string,
}

export type EntityFormModel<T extends EntityBaseModel> = Pick<T, Exclude<keyof T, keyof EntityBaseModel>>;

export type EntityDialogData = {
  entity?: ProjectEntityModel,
  readonly?: boolean,
}
