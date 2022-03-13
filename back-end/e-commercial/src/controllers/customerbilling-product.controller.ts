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
Customerbilling,
Customerbillingdetail,
Product,
} from '../models';
import {CustomerbillingRepository} from '../repositories';

export class CustomerbillingProductController {
  constructor(
    @repository(CustomerbillingRepository) protected customerbillingRepository: CustomerbillingRepository,
  ) { }

  @get('/customerbillings/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Customerbilling has many Product through Customerbillingdetail',
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
    return this.customerbillingRepository.products(id).find(filter);
  }

  @post('/customerbillings/{id}/products', {
    responses: {
      '200': {
        description: 'create a Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Customerbilling.prototype.customerBillingId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInCustomerbilling',
            exclude: ['productId'],
          }),
        },
      },
    }) product: Omit<Product, 'productId'>,
  ): Promise<Product> {
    return this.customerbillingRepository.products(id).create(product);
  }

  @patch('/customerbillings/{id}/products', {
    responses: {
      '200': {
        description: 'Customerbilling.Product PATCH success count',
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
    return this.customerbillingRepository.products(id).patch(product, where);
  }

  @del('/customerbillings/{id}/products', {
    responses: {
      '200': {
        description: 'Customerbilling.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.customerbillingRepository.products(id).delete(where);
  }
}
