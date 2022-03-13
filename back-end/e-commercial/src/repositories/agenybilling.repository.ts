import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Agenybilling, AgenybillingRelations, Product, Agencybillingdetail} from '../models';
import {AgencybillingdetailRepository} from './agencybillingdetail.repository';
import {ProductRepository} from './product.repository';

export class AgenybillingRepository extends DefaultCrudRepository<
  Agenybilling,
  typeof Agenybilling.prototype.agencyBillingId,
  AgenybillingRelations
> {

  public readonly products: HasManyThroughRepositoryFactory<Product, typeof Product.prototype.productId,
          Agencybillingdetail,
          typeof Agenybilling.prototype.agencyBillingId
        >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AgencybillingdetailRepository') protected agencybillingdetailRepositoryGetter: Getter<AgencybillingdetailRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Agenybilling, dataSource);
    this.products = this.createHasManyThroughRepositoryFactoryFor('products', productRepositoryGetter, agencybillingdetailRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
