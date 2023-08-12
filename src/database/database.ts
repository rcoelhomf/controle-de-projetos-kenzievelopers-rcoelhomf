import { Client, ClientConfig } from 'pg'
import 'dotenv/config'

export const databaseConfig = (): ClientConfig => {
    if (process.env.NODE_ENV === 'test') {
        return {
            user: process.env.DB_TEST_USER!,
            password: process.env.DB_TEST_PASSWORD!,
            database: process.env.DB_TEST!,
            host: process.env.DB_TEST_HOST!,
            port: Number(process.env.DB_TEST_PORT!),
        }
    }
    return {
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB!,
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT!),
    }
}
export const client: Client = new Client(databaseConfig())

export const startDatabase = async () => {
    await client.connect()
    console.log('Database connected.')
}
