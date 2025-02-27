import pkg  from 'pg'
import { database } from '../configuration.js'

const { Pool } = pkg
const pool = new Pool({
    user: database.user,
    password: database.password,
    host: database.host,
    port: database.port,
    database: database.database,
    ssl: database.ssl
})

const client = await pool.connect()

const runQuery = async (query) => {
    query = query.length > 0 ? query : false
    if(!query) {
        throw new Error('Query is required')
    }
    try {
        const res = await client.query(query)
        console.log('query completed')
        return res.rows
    } catch (err) {
        client.release()
        throw err
    }
}

export default runQuery