import { app } from './app';
import { config } from './config';
import { connectDatabase } from './config/prisma';

async function bootstrap() {
  await connectDatabase();

  const server = app.listen(config.port, () => {
    console.log(`
🚀 ========================================================
   SWACHHSETU REST API SERVICE
   Environment:  ${config.nodeEnv}
   Port:         ${config.port}
   Base URL:     http://localhost:${config.port}/api/v1
   Swagger Docs: http://localhost:${config.port}/api-docs
========================================================
    `);
  });

  const shutdown = async () => {
    console.log('Stopping SwachhSetu API service gracefully...');
    server.close(() => {
      console.log('HTTP service stopped.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

bootstrap();

