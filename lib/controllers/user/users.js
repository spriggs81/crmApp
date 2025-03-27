import { isString, hash, createId, isNumber, verifyHash, missingError } from "../../functions/_functions.js";
import userQueries from '../../database/queries/users.js';
import runQuery from "../../database/db.js";

export const createUser = (email, password, userId = undefined, isHashed = false) => {
    return new Promise(async (resolve, reject) => {
        email = isString(email) ? email.trim() : false
        const hashedPassword = isString(password)  && !isHashed ? await hash(password) : isString(password)  && isHashed ? password : false
        const errorMessage = missingError({
            email: email,
            password: hashedPassword
        })
        if (!errorMessage) {
            try {
                userId = userId ? userId : createId()
                const query =   userQueries.createUser
                                .replace('$userId', userId)
                                .replace('$email',email)
                                .replace('$hashedPassword',hashedPassword)
                await runQuery(query)
                .then(({command, count, rows}) => {
                    if(command === 'INSERT' && count === 1){
                        resolve('User Created')
                    } else {
                        reject(`There was an query ran with errors:\n
                                command: ${ command }, \n
                                count: ${ count }, \n
                                rows: ${ rows }`)
                    }
                })
                
                
            } catch (error) {
                reject(new Error(error))
            }
        }
        if(errorMessage) reject(errorMessage)
    })
}

export const getUserByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        email = isString(email) ? email : false;
        const errorMessagge = missingError({email: email})
        if(!errorMessagge) {
            try {
                const query = userQueries.getUserByEmail.replace('$email', email)
                await runQuery(query)
                .then(({command, count, rows}) => {
                    if(command === 'SELECT' && count > 0){
                        resolve(rows)
                    } else {
                        reject('No User In Database')
                    }
                })
            } catch (err) {
                reject(err.message)
            } 
        }
        if(errorMessagge) reject(errorMessagge)
    })
}

export const getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        id = isString(id) ? id : false;
        const errorMessage = missingError({id: id})
        if(!errorMessage) {
            try {
                const query = userQueries.getUserById.replace('$userId', id)
                await runQuery(query)
                .then(({command, count, rows}) => {
                    if(command === 'SELECT' && count > 0){
                        resolve(rows)
                    } else {
                        reject('No User In The Database')
                    }
                })
            } catch (err) {
                reject(err.message)
            } 
        }
        if(errorMessage) reject(errorMessage)
    })
}

export const updateUserById = (id, email, password) => {
    return new Promise(async (resolve, reject) => {
        id = isString(id) ? id : false
        email = isString(email) ? email : false
        password = isString(password) ? password : false
        const errorMessage = missingError({id: id, email: email, password: password})
        if(!errorMessage) {
            try {
                const user = await getUserById(id)
                const newEmail = user[0].email.toLowerCase() !== email.toLowerCase()
                const passwordsMatch = await verifyHash(password, user[0].hashedpassword)
                const checkedPassword = passwordsMatch ? user[0].hashedpassword : password
                if(newEmail || !passwordsMatch){
                    const checkedEmail = !newEmail ? user[0].email : email
                    await deleteUser(user[0].id)
                    .then(async () => {
                        createUser(checkedEmail, checkedPassword, id, passwordsMatch)
                    })
                    .then(() => resolve('User Updated'))
                }
                if(!newEmail && passwordsMatch){
                    reject('No New Data was Provided')
                }
            } catch (err) {
                reject(err)
            }
        }
        if(errorMessage) reject(errorMessage)
    })
}

export const deleteUser = (id) => {
    return new Promise(async (resolve, reject) =>{
        id = isNumber(id) ? id : false
        const errorMessage = missingError({id: id})
        if(errorMessage) {
            try {
                const userQuery = userQueries.getUserByTableId.replace('$tableId', id)
                const user = await runQuery(userQuery)
                const isValid = user.count === 1 && user.rows[0].deleted_at === null ? true : false;
                if(isValid){
                    const query = userQueries.deleteUser.replace('$id', id)
                    const deletedUser = await runQuery(query)
                    resolve(deletedUser)
                }
                if(!isValid) reject('Record already deleted')
            } catch (error) {
                reject(new Error(error.message))
            }
        }
        if(errorMessage) reject(errorMessage)
    })
}