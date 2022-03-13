import {Entity, Model, model, property} from '@loopback/repository';

@model()
export class Cartdetail extends Entity {
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
  cartId?: string;

  @property({
    type: 'string',
  })
  productId?: string;

  constructor(data?: Partial<Cartdetail>) {
    super(data);
  }
}

export interface CartdetailRelations {
  // describe navigational properties here
}

export type CartdetailWithRelations = Cartdetail & CartdetailRelations;
