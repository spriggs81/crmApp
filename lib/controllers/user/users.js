import { isString, hash, createId, isNumber } from "../../functions/_functions.js";
import userQueries from '../../database/queries/users.js';
import runQuery from "../../database/db.js";

export const createUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        email = isString(email) ? email.trim() : false
        if(!email) {
            reject(new Error('Missing Email'))
        }
        const hashedPassword = isString(password) ? hash(password) : false
        if(!hashedPassword) {
            reject(new Error('Missing Password'))
        }
        if(email && hashedPassword) {
            try {
                const userId = createId()
                const query = userQueries.createUser.replace('$userId', userId).replace('$email',email).replace('$hashedPassword',hashedPassword)
                resolve(await runQuery(query))
            } catch (error) {
                reject(new Error(error))
            }
        }
    })
}

export const getUserByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        email = isString(email) ? email : false;
        if(!email) {
            reject('Missing Email')
        }
        if(email) {
            try {
                const query = userQueries.getUserByEmail.replace('$email', email)
                const userInfo = await runQuery(query)
                resolve(userInfo)
            } catch (error) {
                reject(new Error(error))
            } 
        }
    })
}

export const getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        id = isString(id) ? id : false;
        if(!id) {
            reject(new Error('Missing userId'))
        }
        if(id) {
            try {
                const query = userQueries.getUserById.replace('$userId', id)
                const userInfo = await runQuery(query)
                resolve(userInfo)
            } catch (error) {
                reject(new Error(error.message))
            } 
        }
    })
}

export const updateUser = (id, email, password) => {
    return new Promise(async (resolve, reject) => {
        id = isString(id) ? id : false
        email = isString(email) ? email : false
        password = isString(password) ? password : false
        if(id && email && password) {
            const user = await getUserById(id)
            const isSingle = user.length === 1 ? true : false;
            const areMultiple = !isSingle && user.length > 1 ? true : false
            if(isSingle && !areMultiple){
                const savingEmail = user[0].email === email 
                        ? user[0].email : email;
                const savingHashedPassword = user[0].hashedPassword === hash(password) 
                                    ? user[0].hashedPassword : hash(password)
                const query = userQueries.createUser
                            .replace('$userId', user[0].userid)
                            .replace('$email', savingEmail)
                            .replace('$hashedPassword', savingHashedPassword)
                const data = await runQuery(query)
                deleteUser(user[0].id)
                .then((data) => resolve('Record Should be Updated'))
                .catch((err) => reject(err.message))
            }
            if(!isSingle || areMultiple){
                const errorMessage = !isSingle && !areMultiple
                                    ? 'No User in the Array'
                                    : 'Multiple Users Found';
                reject(errorMessage)
            }
             
        }
        if(!id || !email || !password){
            const message = !id && !email && !password ? 'Missing Id, Email and Password'
                            : !id && !email && password ? 'Missing Id and Email'
                            : !id && email && !password ? 'Missing Id and Password'
                            : id && !email && !password ? 'Missing Email and Password'
                            : !id && email && password ? 'Missing Id'
                            : id && !email && password ? 'Missing Email'
                            : 'missing Password'
            reject(message)
        }
    })
}

export const deleteUser = (id) => {
    return new Promise(async (resolve, reject) =>{
        id = isNumber(id) ? id : false
        if(!id) {
            reject(new Error('Missing Id'))
        }
        if(id) {
            try {
                const userQuery = userQueries.getUserByTableId.replace('$tableId', id)
                const user = await runQuery(userQuery)
                const isValid = user.length === 1 && user[0].deleted_at === null ? true : false;
                if(isValid){
                    const query = userQueries.deleteUser.replace('$id', id)
                    const deletedUser = await runQuery(query)
                    resolve(deletedUser)
                }
                if(!isValid){
                    reject('Record already deleted')
                }
            } catch (error) {
                reject(new Error(error.message))
            }
        }
    })
}