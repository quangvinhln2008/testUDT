import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Agency, AgencyRelations, Agenybilling} from '../models';
import {AgenybillingRepository} from './agenybilling.repository';

export class AgencyRepository extends DefaultCrudRepository<
  Agency,
  typeof Agency.prototype.agencyId,
  AgencyRelations
> {

  public readonly agenybillings: HasManyRepositoryFactory<Agenybilling, typeof Agency.prototype.agencyId>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AgenybillingRepository') protected agenybillingRepositoryGetter: Getter<AgenybillingRepository>,
  ) {
    super(Agency, dataSource);
    this.agenybillings = this.createHasManyRepositoryFactoryFor('agenybillings', agenybillingRepositoryGetter,);
    this.registerInclusionResolver('agenybillings', this.agenybillings.inclusionResolver);
  }
}
