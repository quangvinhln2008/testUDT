import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Customer, CustomerRelations, Cart, Customerbilling} from '../models';
import {CartRepository} from './cart.repository';
import {CustomerbillingRepository} from './customerbilling.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.customerId,
  CustomerRelations
> {

  public readonly carts: HasManyRepositoryFactory<Cart, typeof Customer.prototype.customerId>;

  public readonly customerbillings: HasManyRepositoryFactory<Customerbilling, typeof Customer.prototype.customerId>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CartRepository') protected cartRepositoryGetter: Getter<CartRepository>, @repository.getter('CustomerbillingRepository') protected customerbillingRepositoryGetter: Getter<CustomerbillingRepository>,
  ) {
    super(Customer, dataSource);
    this.customerbillings = this.createHasManyRepositoryFactoryFor('customerbillings', customerbillingRepositoryGetter,);
    this.registerInclusionResolver('customerbillings', this.customerbillings.inclusionResolver);
    this.carts = this.createHasManyRepositoryFactoryFor('carts', cartRepositoryGetter,);
    this.registerInclusionResolver('carts', this.carts.inclusionResolver);
  }
}
