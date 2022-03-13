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
  Agency,
  Agenybilling,
} from '../models';
import {AgencyRepository} from '../repositories';

export class AgencyAgenybillingController {
  constructor(
    @repository(AgencyRepository) protected agencyRepository: AgencyRepository,
  ) { }

  @get('/agencies/{id}/agenybillings', {
    responses: {
      '200': {
        description: 'Array of Agency has many Agenybilling',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Agenybilling)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Agenybilling>,
  ): Promise<Agenybilling[]> {
    return this.agencyRepository.agenybillings(id).find(filter);
  }

  @post('/agencies/{id}/agenybillings', {
    responses: {
      '200': {
        description: 'Agency model instance',
        content: {'application/json': {schema: getModelSchemaRef(Agenybilling)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Agency.prototype.agencyId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agenybilling, {
            title: 'NewAgenybillingInAgency',
            exclude: ['agencyBillingId'],
            optional: ['agencyId']
          }),
        },
      },
    }) agenybilling: Omit<Agenybilling, 'agencyBillingId'>,
  ): Promise<Agenybilling> {
    return this.agencyRepository.agenybillings(id).create(agenybilling);
  }

  @patch('/agencies/{id}/agenybillings', {
    responses: {
      '200': {
        description: 'Agency.Agenybilling PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Agenybilling, {partial: true}),
        },
      },
    })
    agenybilling: Partial<Agenybilling>,
    @param.query.object('where', getWhereSchemaFor(Agenybilling)) where?: Where<Agenybilling>,
  ): Promise<Count> {
    return this.agencyRepository.agenybillings(id).patch(agenybilling, where);
  }

  @del('/agencies/{id}/agenybillings', {
    responses: {
      '200': {
        description: 'Agency.Agenybilling DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Agenybilling)) where?: Where<Agenybilling>,
  ): Promise<Count> {
    return this.agencyRepository.agenybillings(id).delete(where);
  }
}
