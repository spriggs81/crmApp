import { isNumber, isString, missingError } from '../../functions/_functions.js'
import userQueries from '../../database/queries/users.js'
import runQuery from '../../database/db.js'

// Creates the User Manager using the following
// Required: UserId(String)  |  managerId(Integer)
export const createManager = (userId, managerId) => {
    return new Promise(async (resolve, reject) => {
        userId = isString(userId) ? userId.trim() : false
        managerId = isNumber(managerId) ? managerId : false
        const errorMessage = missingError({userId: userId, managerId: managerId})
        if(!errorMessage){
            try {
                const query = userQueries.addUserManager
                            .replace('$userId', userId)
                            .replace('$managerId', managerId)
                await runQuery(query)
                .then(({ command, count,rows }) => {
                    if(command === 'INSERT'){
                        if(count === 1) resolve('User Manager Added')
                        if(count === 0) reject('Nothing was inserted')
                        if(count > 1) reject('Multiple Managers Inserts Created')
                    }
                    if(command !== 'INSERT'){ 
                        reject(`There was an query ran with errors:\n
                        command: ${ command }, \n
                        count: ${ count }, \n
                        rows: ${ rows }`)
                    }
                })
            } catch (err) {
                reject(err)
            }     
        }
        if(errorMessage){
            reject(errorMessage)
        }
    })
}

// Gets a User's Manager Information
// Required: userId(String)
export const getUserManager = (userId) => {
    return new Promise(async (resolve, reject) => {
        userId = isString(userId) ? userId.trim() : false
        const errorMessage = missingError({userId: userId})
        if(!errorMessage){
            try {
                const query = userQueries.getUserManagerById
                        .replace('$userId', userId)
                await runQuery(query)
                .then(({command, count, rows}) => {
                    if(command === 'SELECT'){
                        if(count === 0) reject('No User Manager Found')
                        if(count === 1) resolve(rows)
                        if(count > 1) reject('Multiple Managers Found')
                    }
                    if(command !== 'SELECT'){ 
                        reject(`There was an query ran with errors:\n
                        command: ${ command }, \n
                        count: ${ count }, \n
                        rows: ${ rows }`)
                    }
                })
            } catch (err) {
                reject(err)
            }
        }
        if(errorMessage) reject(errorMessage)
    })
}

// Creates the User Manager using the following
// Required: UserId(String)  |  managerId(Integer)
export const updateUserManager = (userId, managerId) => {
    return new Promise(async (resolve, reject) => {
        userId = isString(userId) ? userId.trim() : false
         managerId = isNumber(managerId) ? managerId : false
         const errorMessage = missingError({userId: userId, managerId: managerId})
         if(!errorMessage){
            try {
                const manager = await getUserManager(userId)
                if(manager[0].managerid !== managerId){
                    await deleteUserManager(manager[0].id)
                    .then(async (results) => {
                        if(results === 'User Manager Deleted'){
                            await createManager(manager[0].userid, managerId)
                            .then((result) => {
                                if(result === 'User Manager Added') resolve('User Manager Updated')
                                if(result !== 'User Manager Added') reject('Problem Updating Manager')
                            })
                        }
                    })
                }
                if(manager[0].managerid === managerId) reject(`There's no change in the user's manager`)
            } catch (err) {
                reject(err)
            }
         }
         if(errorMessage) reject(errorMessage)
    })
}

export const deleteUserManager = (tableId) => {
    return new Promise(async (resolve, reject) => {
        tableId = isNumber(tableId) ? tableId : false
        const errorMessage = missingError({tableId: tableId})
        if(!errorMessage){
            try {
                const managerQuery = userQueries.getUserManagerByTableId
                                .replace('$tableId', tableId)
                await runQuery(managerQuery)
                .then(async ({count}) =>{
                    if(count === 1){
                        const deleteQuery = userQueries.deleteUserManager
                                            .replace('$tableId', tableId)
                        await runQuery(deleteQuery)
                        .then(({command, count, rows}) => {
                            if(command === 'UPDATE'){
                                if(count === 0) reject('No Manager Deleted')
                                if(count === 1) resolve('User Manager Deleted')
                                if(count > 1) reject('Multiple Managers updated')
                            }
                            if(command !== 'UPDATE'){ 
                                reject(`There was an query ran with errors:\n
                                command: ${ command }, \n
                                count: ${ count }, \n
                                rows: ${ rows }`)
                            }
                        })
                    }  
                })
            } catch (err) {
                reject(err)
            }
        }
        if(errorMessage) reject(errorMessage)
    })
}


updateUserManager('ududehnujd', 26)
.then((man) => console.log('man: ',man))
.catch((err) => console.log('My Error: ', err))