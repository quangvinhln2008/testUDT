import {Entity, model, property} from '@loopback/repository';

@model()
export class Customer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  customerId: string;

  @property({
    type: 'string',
    required: true,
  })
  customerName: string;

  @property({
    type: 'string',
    required: true,
  })
  customerEmail: string;

  @property({
    type: 'string',
    required: true,
  })
  customerPassword: string;

  @property({
    type: 'string',
    required: true,
  })
  customerAddress: string;

  @property({
    type: 'string',
    required: true,
  })
  customerPhone: string;

  @property({
    type: 'string',
  })
  customerGender?: string;


  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
