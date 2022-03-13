import {Entity, Model, model, property, hasMany} from '@loopback/repository';
import {Product} from './product.model';
import {Cartdetail} from './cartdetail.model';

@model()
export class Cart extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  cartId?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isPay?: boolean;

  @property({
    type: 'string',
  })
  belongTo?: string;

  @hasMany(() => Product, {through: {model: () => Cartdetail}})
  products: Product[];

  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

export interface CartRelations {
  // describe navigational properties here
}

export type CartWithRelations = Cart & CartRelations;
