import { Factory, Seeder } from 'typeorm-seeding';

import { Connection } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import users from './data/users.json';

export default class CreateAdmin1 implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countUsers = await connection
      .createQueryBuilder()
      .select()
      .from(User, 'User')
      .getCount();

    if (countUsers === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(users)
        .execute();
    }
  }
}
