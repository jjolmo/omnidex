/* eslint-disable n/no-process-env */


export default {
  NodeEnv: (process.env.NODE_ENV ?? ''),
  Port: (process.env.PORT ?? 0),
  MysqlUser: (process.env.MYSQL_USER ?? ''),
  MysqlPassword: (process.env.MYSQL_PASSWORD ?? ''),
  MysqlDatabase: (process.env.MYSQL_DB ?? ''),
  MysqlHost: (process.env.MYSQL_HOST ?? ''),
  AdminPassword: (process.env.MAESTRO_SECRET ?? ''),
  DXLegendsPath: (process.env.DXLEGENDS_PATH ?? ''),
  GameExecutable: (process.env.GAME_EXECUTABLE ?? ''),
  DXLegendsDevPath: (process.env.DXLEGENDS_DEV_PATH ?? ''),
  ServerAddress: (process.env.SERVER_ADDRESS ?? ''),
  UniversePort: (process.env.UNIVERSE_PORT ?? ''),
  LandPort: (process.env.LAND_PORT ?? ''),
  LandSecret: (process.env.LAND_SECRET ?? ''),
  InfluxUser: (process.env.INFLUX_LOCAL_USER ?? ''),
  InfluxPassword: (process.env.INFLUX_LOCAL_PASSWORD ?? ''),
  MaestroUrl: (process.env.MAESTRO_URL ?? ''), // from which local dockerized games will grab data
  CookieProps: {
    Key: 'ExpressGeneratorTs',
    Secret: (process.env.COOKIE_SECRET ?? ''),
    // Casing to match express cookie options
    Options: {
      httpOnly: true,
      signed: true,
      path: (process.env.COOKIE_PATH ?? ''),
      maxAge: Number(process.env.COOKIE_EXP ?? 0),
      domain: (process.env.COOKIE_DOMAIN ?? ''),
      secure: (process.env.SECURE_COOKIE === 'true'),
    },
  },
} as const;