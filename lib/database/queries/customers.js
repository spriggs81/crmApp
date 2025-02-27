const customers = {
    // Related to customers.customers table
    getCustomerByEmail: `SELECT * FROM customers.customers WHERE deleted_at is null and email = '$email'`,
    getCustomerById: `SELECT * FROM customers.customers WHERE deleted_at is null and id = $id`,
    getAllCustomers: 'SELECT * FROM customers.customers where deleted_at is null ',
    createCustomer: `INSERT INTO customers.customers (firstName, lastName, email, phone) VALUES ($firstName, $lastName, $email, $phone)`,
    deleteCustomer: `UPDATE customers.customers SET deleted_at = CURRENT_TIMESTAMP WHERE id = $id`,
    
    // Related to the customers.addresses table
    getAddressesByCustomerId: `SELECT * FROM customers.addresses WHERE deleted_at is null and customerId = $customerId`,
    getAllAddresses: `SELECT * FROM CUSTOMERS.ADDRESSES WHERE DELETED_AT IS NULL`,
    createAddress: `INSERT INTO customers.addresses (customerId, type, address1, address2, city, state, zip) VALUES ('$customerId', '$type', '$address1', '$address2', '$city', '$state', '$zip')`,
    deleteAddress: `UPDATE customers.addresses SET deleted_at = CURRENT_TIMESTAMP WHERE id = ${id}`,

    // Related to the customers.pets table
    getPetsByCustomerId: `SELECT * FROM customers.pets WHERE deleted_at is null and customerId = '$customerId'`,
    getPetsById: `SELECT * FROM customers.pets WHERE deleted_at is null and id = $id`,
    getAllPets: 'SELECT * FROM customers.pets where  deleted_at is null',
    createPet: `INSERT INTO customers.pets (customerId, name, type, breed, age, weight) VALUES ('$customerId', '$name', '$type', '$breed', '$age', '$weight')`,
    deletePet: `UPDATE customers.pets SET deleted_at = CURRENT_TIMESTAMP WHERE id = $id`
}

export default customers;