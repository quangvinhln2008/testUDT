import {Entity, model, property} from '@loopback/repository';

@model()
export class Customerbillingdetail extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  qualities: number;

  @property({
    type: 'string',
    required: true,
  })
  unitPrice: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
  })
  customerbillingId?: string;

  @property({
    type: 'string',
  })
  productId?: string;

  constructor(data?: Partial<Customerbillingdetail>) {
    super(data);
  }
}

export interface CustomerbillingdetailRelations {
  // describe navigational properties here
}

export type CustomerbillingdetailWithRelations = Customerbillingdetail & CustomerbillingdetailRelations;
