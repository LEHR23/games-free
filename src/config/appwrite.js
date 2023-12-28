import { Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint(import.meta.env.API_ENDPOINT)
  .setProject(import.meta.env.PROJECT_ID)

const databases = new Databases(client);

export {
  databases
}