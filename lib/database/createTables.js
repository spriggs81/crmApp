import users from './tables/users.js'
import settings from './tables/settings.js'
import logs from './tables/logs.js'
import customers from './tables/customers.js'
import orders from './tables/orders.js'
import products from './tables/products.js'
import { runQuery } from './db.js'

export const tables = [
    users,
    settings,
    logs,
    customers,
    orders,
    products
]

const createDb = async () => {
        try {
            tables.map(async (mainTableData) => {
                let tableQuery = ''
                const schemaQuery = 'CREATE SCHEMA IF NOT EXISTS ' + mainTableData.schema + ';'
                const info = mainTableData.info
                info.map(tabeData => {
                    const table = tabeData.table
                    const columns = tabeData.columns
                    tableQuery += `CREATE TABLE IF NOT EXISTS ${mainTableData.schema}.${table} (`
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
            })
    } catch (err) {
        console.error(err)
    } 
}

module.exports = createDb;