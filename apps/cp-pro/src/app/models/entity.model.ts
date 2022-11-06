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
}

export type EntityFormModel<T extends EntityBaseModel> = Pick<T, Exclude<keyof T, keyof EntityBaseModel>>;

export type EntityDialogData = {
  entity?: ProjectEntityModel,
  readonly?: boolean,
}
