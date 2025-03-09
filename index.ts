import { Client } from 'pg';
import { QueryService } from './services/queries';
import { InsertService } from './services/inserts';
import { UpdateService } from './services/updates';
import { DeleteService } from './services/deletes';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
};

async function main() {
  const client = new Client(dbConfig);
  const queryService = new QueryService(client);
  const insertService = new InsertService(client);
  const updateService = new UpdateService(client);
  const deleteService = new DeleteService(client);

  try {
    await client.connect();
    
    const departments = await queryService.getAllDepartments();
    console.log('All Departments:', departments);

    await insertService.addDepartment('New Department');
    console.log('Added new department');

    await updateService.updateEmployeeRole(1, 2);
    console.log('Updated employee role');

    await deleteService.deleteEmployee(3);
    console.log('Deleted employee');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

main();