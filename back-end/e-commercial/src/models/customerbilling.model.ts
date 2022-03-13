import {Entity, model, property, hasMany} from '@loopback/repository';
import {Product} from './product.model';
import {Customerbillingdetail} from './customerbillingdetail.model';

@model()
export class Customerbilling extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  customerBillingId?: string;

  @property({
    type: 'date',
    required: true,
  })
  dateBilling: string;

  @property({
    type: 'string',
    required: true,
  })
  billingStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  paymentStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  shippingStatus: string;

  @property({
    type: 'string',
  })
  belongTo?: string;

  @hasMany(() => Product, {through: {model: () => Customerbillingdetail}})
  products: Product[];

  constructor(data?: Partial<Customerbilling>) {
    super(data);
  }
}

export interface CustomerbillingRelations {
  // describe navigational properties here
}

export type CustomerbillingWithRelations = Customerbilling & CustomerbillingRelations;
