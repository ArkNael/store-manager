import mysql from 'serverless-mysql'

export const conn = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
})

export async function query({ query, values }) {
    try {
        const results = await conn.query(query, values)
        await conn.end()
        return results
    } catch (error) {
        return { error }
    }
}
  