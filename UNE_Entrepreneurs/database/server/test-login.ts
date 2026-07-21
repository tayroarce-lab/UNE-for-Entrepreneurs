import { User } from './src/models/user.model';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db_une_entrepreneurs', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

async function run() {
  try {
    User.initialize(sequelize);
    const user = await User.findOne({ where: { email: 'admin@une.cr' } });
    console.log('User found:', user?.toJSON());
    console.log('Password raw value:', user?.password);
    console.log('Is password string?', typeof user?.password);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

run();
