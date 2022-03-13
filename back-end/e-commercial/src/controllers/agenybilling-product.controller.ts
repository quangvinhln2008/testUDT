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
Agenybilling,
Agencybillingdetail,
Product,
} from '../models';
import {AgenybillingRepository} from '../repositories';

export class AgenybillingProductController {
  constructor(
    @repository(AgenybillingRepository) protected agenybillingRepository: AgenybillingRepository,
  ) { }

  @get('/agenybillings/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Agenybilling has many Product through Agencybillingdetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product[]> {
    return this.agenybillingRepository.products(id).find(filter);
  }

  @post('/agenybillings/{id}/products', {
    responses: {
      '200': {
        description: 'create a Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Agenybilling.prototype.agencyBillingId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInAgenybilling',
            exclude: ['productId'],
          }),
        },
      },
    }) product: Omit<Product, 'productId'>,
  ): Promise<Product> {
    return this.agenybillingRepository.products(id).create(product);
  }

  @patch('/agenybillings/{id}/products', {
    responses: {
      '200': {
        description: 'Agenybilling.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.agenybillingRepository.products(id).patch(product, where);
  }

  @del('/agenybillings/{id}/products', {
    responses: {
      '200': {
        description: 'Agenybilling.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.agenybillingRepository.products(id).delete(where);
  }
}
