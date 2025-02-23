import pkg  from 'pg'
const { Pool } = pkg
const pool = new Pool({
    user: 'crmAppUser',
    password: 'WhyMeFriend23',
    host: 'localhost',
    port: 5432,
    database: 'crmdb',
    ssl: false 
})

const client = await pool.connect()

export const runQuery = async (query) => {
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