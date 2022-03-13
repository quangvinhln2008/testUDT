import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Customer, CustomerRelations, Cart} from '../models';
import {CartRepository} from './cart.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.customerId,
  CustomerRelations
> {

  public readonly carts: HasManyRepositoryFactory<Cart, typeof Customer.prototype.customerId>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CartRepository') protected cartRepositoryGetter: Getter<CartRepository>,
  ) {
    super(Customer, dataSource);
    this.carts = this.createHasManyRepositoryFactoryFor('carts', cartRepositoryGetter,);
    this.registerInclusionResolver('carts', this.carts.inclusionResolver);
  }
}
