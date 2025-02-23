const { queries } = require("@testing-library/react");

const customers = {
    schema: 'customers',
    info: [
        {
            table: 'customers',
            columns: [
                {
                    name: 'id',
                    type: 'SERIAL PRIMARY KEY'
                },
                {
                    name: 'firstName',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'lastName',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'email',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'phone',
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
                getCustomerByEmail: `SELECT * FROM customers.customers WHERE deleted_at is null and email = $email`,
                getCustomerById: `SELECT * FROM customers.customers WHERE deleted_at is null and id = $id`,
                getAllCustomers: 'SELECT * FROM customers.customers where deleted_at is null ',
                createCustomer: `INSERT INTO customers.customers (firstName, lastName, email, phone) VALUES ($firstName, $lastName, $email, $phone)`,
                deleteCustomer: `UPDATE customers.customers SET deleted_at = CURRENT_TIMESTAMP WHERE id = $id`
            }
        },
        {
            table: 'addresses',
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
                    name: 'type',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'address1',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'address2',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'city',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'state',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'zip',
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
            queries: {
                getAddressesByCustomerId: `SELECT * FROM customers.addresses WHERE deleted_at is null and customerId = $customerId`,
                getAllAddresses: `SELECT * FROM CUSTOMERS.ADDRESSES WHERE DELETED_AT IS NULL`,
                createAddress: `INSERT INTO customers.addresses (customerId, type, address1, address2, city, state, zip) VALUES ('$customerId', '$type', '$address1', '$address2', '$city', '$state', '$zip')`,
                deleteAddress: `UPDATE customers.addresses SET deleted_at = CURRENT_TIMESTAMP WHERE id = ${id}`
            }
        },
        {
            table: 'pets',
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
                    name: 'name',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'type',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'breed',
                    type: 'VARCHAR(250) NOT NULL'
                },
                {
                    name: 'age',
                    type: 'INTEGER NOT NULL'
                },
                {
                    name: 'weight',
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
        }
    ],
    queries: {
        getPetsByCustomerId: `SELECT * FROM customers.pets WHERE deleted_at is null and customerId = '$customerId'`,
        getPetsById: `SELECT * FROM customers.pets WHERE deleted_at is null and id = $id`,
        getAllPets: 'SELECT * FROM customers.pets where  deleted_at is null',
        createPet: `INSERT INTO customers.pets (customerId, name, type, breed, age, weight) VALUES ('$customerId', '$name', '$type', '$breed', '$age', '$weight')`,
        deletePet: `UPDATE customers.pets SET deleted_at = CURRENT_TIMESTAMP WHERE id = $id`
    }
}

module.exports = customers;
// Now that we have the schema for the customers table, we can create the table in the database.