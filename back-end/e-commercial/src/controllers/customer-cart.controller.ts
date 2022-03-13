import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Customer,
  Cart,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerCartController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/carts', {
    responses: {
      '200': {
        description: 'Array of Customer has many Cart',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cart)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cart>,
  ): Promise<Cart[]> {
    return this.customerRepository.carts(id).find(filter);
  }

  @post('/customers/{id}/carts', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cart)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Customer.prototype.customerId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {
            title: 'NewCartInCustomer',
            exclude: ['cartId'],
            optional: ['belongTo']
          }),
        },
      },
    }) cart: Omit<Cart, 'cartId'>,
  ): Promise<Cart> {
    return this.customerRepository.carts(id).create(cart);
  }

  @patch('/customers/{id}/carts', {
    responses: {
      '200': {
        description: 'Customer.Cart PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {partial: true}),
        },
      },
    })
    cart: Partial<Cart>,
    @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<Count> {
    return this.customerRepository.carts(id).patch(cart, where);
  }

  @del('/customers/{id}/carts', {
    responses: {
      '200': {
        description: 'Customer.Cart DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<Count> {
    return this.customerRepository.carts(id).delete(where);
  }
}
