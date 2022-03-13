import {Entity, model, property} from '@loopback/repository';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  productId: string;

  @property({
    type: 'string',
    required: true,
  })
  productName: string;

  @property({
    type: 'number',
    required: true,
  })
  produtPrice: number;

  @property({
    type: 'string',
    required: true,
  })
  productUnit: string;

  @property({
    type: 'string',
  })
  productDecription?: string;

  @property({
    type: 'string',
  })
  categoryId?: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
