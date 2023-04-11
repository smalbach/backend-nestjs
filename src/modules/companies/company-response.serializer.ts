import { Company } from './entities/company.entity';

const productResponseSerializer = (product: Company) => {
  delete product.deletedAt;
};

export default productResponseSerializer;
