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
  Customerbilling,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerCustomerbillingController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/customerbillings', {
    responses: {
      '200': {
        description: 'Array of Customer has many Customerbilling',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customerbilling)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Customerbilling>,
  ): Promise<Customerbilling[]> {
    return this.customerRepository.customerbillings(id).find(filter);
  }

  @post('/customers/{id}/customerbillings', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Customerbilling)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Customer.prototype.customerId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customerbilling, {
            title: 'NewCustomerbillingInCustomer',
            exclude: ['customerBillingId'],
            optional: ['belongTo']
          }),
        },
      },
    }) customerbilling: Omit<Customerbilling, 'customerBillingId'>,
  ): Promise<Customerbilling> {
    return this.customerRepository.customerbillings(id).create(customerbilling);
  }

  @patch('/customers/{id}/customerbillings', {
    responses: {
      '200': {
        description: 'Customer.Customerbilling PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customerbilling, {partial: true}),
        },
      },
    })
    customerbilling: Partial<Customerbilling>,
    @param.query.object('where', getWhereSchemaFor(Customerbilling)) where?: Where<Customerbilling>,
  ): Promise<Count> {
    return this.customerRepository.customerbillings(id).patch(customerbilling, where);
  }

  @del('/customers/{id}/customerbillings', {
    responses: {
      '200': {
        description: 'Customer.Customerbilling DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Customerbilling)) where?: Where<Customerbilling>,
  ): Promise<Count> {
    return this.customerRepository.customerbillings(id).delete(where);
  }
}
