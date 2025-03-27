import users from './tables/users.js'
import settings from './tables/settings.js'
import logs from './tables/logs.js'
import customers from './tables/customers.js'
import orders from './tables/orders.js'
import products from './tables/products.js'
import runQuery from './db.js'

const schemas = [
    users,
    settings,
    logs,
    customers,
    orders,
    products
]

export const createDb = async () => {
    return new Promise((resolve, reject) => {
        try {
            schemas.map(async (schema) => {
                let tableQuery = ''
                const schemaQuery = 'CREATE SCHEMA IF NOT EXISTS ' + schema.schema + ';'
                const tables = schema.info
                tables.map(tableData => {
                    const table = tableData.table
                    const columns = tableData.columns
                    tableQuery += `CREATE TABLE IF NOT EXISTS ${schema.schema}.${table} (`
                    columns.map((column, index) => {
                        tableQuery += `${column.name} ${column.type}`
                        if(index < columns.length - 1) {
                            tableQuery += ', '
                        }
                    })
                    tableQuery += ');\n'
                })
                const query = schemaQuery + '\n' + tableQuery
                await runQuery(query.replaceAll('\n', ' '))
                .then((tableInfo) => {
                    console.log('table info: ',tableInfo)
                })
            })
        } catch (err) {
            reject(new Error(err.message))
        } finally {
            resolve('Database Completed')
        }
    })
}