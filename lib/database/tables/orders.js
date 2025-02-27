const orders = {
    schema: 'orders',
    info: [
        {
            table: 'orders',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'customerId',
                    type: 'INTEGER NOT NULL'
                },
                {
                    name: 'statusId',
                    type: 'INTEGER NOT NULL'
                },
                {
                    name: 'total',
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
            table: 'orderItems',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'orderId',
                    type: 'INTEGER NOT NULL'
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
            table: 'orderStatus',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'orderId',
                    type: 'INTEGER NOT NULL'
                },
                {
                    name: 'statusId',
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

export default orders;