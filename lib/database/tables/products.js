const products = {
    schema: 'products',
    info: [
        {
            table: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'name',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'brand',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'category',
                    type: 'varchar(250) NOT NULL'
                },
                {
                    name: 'foodType',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'weight',
                    type: 'varchar(250) NOT NULL'
                },
                {
                    name: 'description',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'price',
                    type: 'DECIMAL(10, 2) NOT NULL'
                },
                {
                    name: 'created_at',
                    type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
                },
                {
                    name: 'deleted_at',
                    type: 'TIMESTAMP NULL'
                }
            ]
        },
        {
            table: 'inventory',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'productId',
                    type: 'INTEGER NOT NULL'
                },
                {
                    name: 'quantity',
                    type: 'INTEGER NOT NULL'
                },
                {
                    name: 'created_at',
                    type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
                },
                {
                    name: 'deleted_at',
                    type: 'TIMESTAMP NULL'
                }
            ]
        },
    ]
}

module.exports = products; 