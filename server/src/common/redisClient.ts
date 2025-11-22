import { createClient } from 'redis';

// Crear y conectar el cliente Redis una vez en tu archivo principal
const redisClient = createClient();

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

(async () => {
  await redisClient.connect(); // Conectar al iniciar la aplicación
  console.log('Connected to Redis');
})();

export { redisClient }; // Exporta el cliente para usarlo en otras partes de tu aplicación
