const { queries } = require("@testing-library/react");

const logs = {
    schema: 'logs',
    info: [
        {
            table: 'logins',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'user_id',
                    type: 'INTEGER NULL'
                },
                {
                    name: 'email',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'status',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'reason',
                    type: 'VARCHAR(250) NULL'
                },
                {
                    name: 'created_at',
                    type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
                },
                {
                    name: 'deleted_at',
                    type: 'TIMESTAMP NULL'
                }
            ],
            queries: {
                getLoginsByUserId: `select * from logs.logins where userId = '$userId'`,
                getAllLogins: `select * from logs.logins`,
                getLast7LoginsByEmail: `select * from logs.logins where email = '$email' order by created_at desc limit 7`,
                createLogins: `INSERT INTO LOGS.LOGINS (userId, ,email, status, reason) VALUES ('$userId', 'email', '$status', '$reason')`
            }
        },
        {
            table: 'actions',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'user_id',
                    type: 'INTEGER NOT NULL'
                },
                {
                    name: 'action',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'status',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'created_at',
                    type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
                },
                {
                    name: 'deleted_at',
                    type: 'TIMESTAMP NULL'
                }
            ],
            queries: [
                
            ]
        },
        {
            table: 'errors',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'user_id',
                    type: 'INTEGER NOT NULL'
                },
                {
                    name: 'action',
                    type: 'VARCHAR(250) NOT NULL'
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
        }
    ]
}

module.exports = logs;