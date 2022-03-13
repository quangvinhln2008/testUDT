import {Entity, model, property} from '@loopback/repository';

@model()
export class Agencybillingdetail extends Entity {
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
    mongodb:{dataType:'ObjectId'}
  })
  agenybillingId?: string;

  @property({
    type: 'string',
  })
  productId?: string;

  constructor(data?: Partial<Agencybillingdetail>) {
    super(data);
  }
}

export interface AgencybillingdetailRelations {
  // describe navigational properties here
}

export type AgencybillingdetailWithRelations = Agencybillingdetail & AgencybillingdetailRelations;
