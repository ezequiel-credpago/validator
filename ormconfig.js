const baseDir = process.env.NODE_ENV === 'production' ? 'build' : 'src';
module.exports = {
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [baseDir + '/entity/**/*.{ts,js}'],
    migrations: [baseDir + '/migration/**/*.{ts,js}'],
    subscribers: [baseDir + '/subscriber/**/*.{ts,js}'],
    cli: {
        entitiesDir: baseDir + '/entity',
        migrationsDir: baseDir + '/migration',
        subscribersDir: baseDir + '/subscriber',
    }
};
