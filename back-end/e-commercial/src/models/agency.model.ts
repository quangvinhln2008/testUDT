import {Entity, model, property, hasMany} from '@loopback/repository';
import {Agenybilling} from './agenybilling.model';

@model()
export class Agency extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  agencyId?: string;

  @property({
    type: 'string',
    required: true,
  })
  agencyName: string;

  @property({
    type: 'string',
    required: true,
  })
  agencyEmail: string;

  @property({
    type: 'string',
    required: true,
  })
  agencyAddress: string;

  @property({
    type: 'string',
    required: true,
  })
  agencyPhone: string;

  @property({
    type: 'string',
  })
  agencyGender?: string;

  @hasMany(() => Agenybilling)
  agenybillings: Agenybilling[];

  constructor(data?: Partial<Agency>) {
    super(data);
  }
}

export interface AgencyRelations {
  // describe navigational properties here
}

export type AgencyWithRelations = Agency & AgencyRelations;
