import {Entity, model, property, hasMany} from '@loopback/repository';
import {Product} from './product.model';
import {Agencybillingdetail} from './agencybillingdetail.model';

@model()
export class Agenybilling extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  agencyBillingId?: string;

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
  })
  agencyId?: string;

  @hasMany(() => Product, {through: {model: () => Agencybillingdetail}})
  products: Product[];

  constructor(data?: Partial<Agenybilling>) {
    super(data);
  }
}

export interface AgenybillingRelations {
  // describe navigational properties here
}

export type AgenybillingWithRelations = Agenybilling & AgenybillingRelations;
