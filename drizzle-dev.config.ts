import * as dotenv  from "dotenv";
import { defineConfig } from 'drizzle-kit';

const NODE_ENV = process.env.NODE_ENV;
console.log('NODE_ENV', NODE_ENV);
const isLocalEnv = NODE_ENV === 'development';
dotenv.config({ // because of that correct read of env
  path: isLocalEnv ? '.env.local' : '.env.production',
});

// carrega .env apenas no host
// no container docker carrega a partir da opção environment
// do docker-compose.yaml
//dotenv.config(); 

const DATABASE_URL = process.env.DATABASE_URL;
if (isLocalEnv) {
  console.log('DATABASE_URL', DATABASE_URL);
}

if (!DATABASE_URL) {
  throw new Error(
    'Cannot read environment, probably DATABASE_URL was not setted',
  );
}
export default defineConfig({
  out: './drizzle',
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
