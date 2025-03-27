// Dependencies 
import { isNumber, isString, missingError } from '../../functions/_functions.js'
import userQueries from '../../database/queries/users.js'
import runQuery from '../../database/db.js'

// Creates the User Information using the following
// Required: UserId(String)  |  firstName(String)  |  LastName(String)  |  Phone(String)
export const createUserInfo = (userId, firstName, lastName, phone) => {
    return new Promise(async (resolve, reject) => {
        userId = isString(userId) ? userId.trim() : false
        firstName = isString(firstName) ? firstName.trim() : false
        lastName = isString(lastName) ? lastName.trim() : false
        phone = isString(phone) && phone.length === 10 ? phone : false
        const errorMessage = missingError({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            phone: phone
        })
        if(!errorMessage){
            try{
                const infoQuery = userQueries.addUserInfo
                                .replace('$userId', userId)
                                .replace('$firstName', firstName)
                                .replace('$lastName', lastName)
                                .replace('$phone', phone)

                await runQuery(query)
                .then(({command, count, rows}) => {
                    if(command === 'INSERT' && count === 1){
                        resolve('User Info Created')
                    } else {
                        reject(`There was an query ran with errors:\n 
                                command: ${ command }, \n
                                count: ${ count }, \n
                                rows: ${ rows }`)
                    }
                })
            }
            catch(err){
                reject(err.message)
            }
        }
        if(errorMessage){
            reject(errorMessage)
        }
    })
}

// Gets a User's Information
// Required: userId(String)
export const getUserInfoByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        userId = isString(userId) ? userId.trim() : false
        const errorMessage = missingError({userId: userId})
        if(!errorMessage){
            try {
                const infoQuery = userQueries.getInfoByUserId
                                .replace('$userId', userId)
                const info = await runQuery(infoQuery)
                if(info.length > 0){
                    resolve(info)
                }
                if(info.length === 0){
                    reject('No User Info Found')
                }
            } catch (err) {
                reject(err.message)
            }
        }
        if(errorMessage){
            reject(errorMessage)
        }
    })
}

// Updates the User's Information and Deletes the old information
// Required: UserId(String)  |  firstName(String)  |  LastName(String)  |  Phone(String)
export const updateUserInfo = (userId, firstName, lastName, phone) => {
    return new Promise(async (resolve, reject) => {
        userId = isString(userId) ? userId.trim() : false
        firstName = isString(firstName) ? firstName.trim() : false
        lastName = isString(lastName) ? lastName.trim() : false
        phone = isString(phone) && phone.length === 10 ? phone : false
        const errorMessage = missingError({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            phone: phone
        })
        if(!errorMessage){
            try {
                const currentInfo = await getUserInfoByUserId(userId)
                if(currentInfo.length > 0){
                    firstName = currentInfo[0].firstname.toLowerCase() === firstName.toLowerCase() ? false : firstName
                    lastName = currentInfo[0].lastname.toLowerCase() === lastName.toLowerCase() ? false : lastName
                    phone = currentInfo[0].phone === phone ? false : phone
                    if(!firstName && !lastName && !phone){
                        reject('No New User Info To Update!')
                    }
                    if(firstName || lastName || phone){
                        const checkedFirst = !firstName ? currentInfo[0].firstname : firstName
                        const checkedLast = !lastName ? currentInfo[0].lastname : lastName
                        const checkedPhone = !phone ? currentInfo[0].phone : phone
                        await deleteUserInfo(currentInfo[0].id)
                        .then(async () => await createUserInfo(userId, checkedFirst, checkedLast, checkedPhone))
                        .then(() => resolve('Update Completed'))
                    
                    }
    
                }
                if(currentInfo === 0){
                    reject('No User Info Found!')
                }
            } catch (err) {
                reject(err.message)
            }
        }
        if(errorMessage){
            reject(errorMessage)
        }
    })
}

// Delete a User Information using the table Id number as a number
// Required: tableId(Number)
export const deleteUserInfo = (tableId) => {
    return new Promise(async (resolve, reject) => {
        tableId = isNumber(tableId) ? tableId : false
        const errorMessage = missingError({id: tableId})
        if(!errorMessage){
            try {
                const infoQuery = userQueries.deleteUserInfo
                                .replace('$tableId', tableId)
                const info = await runQuery(infoQuery)
                resolve('Info Deleted')
            } catch (err) {
                reject(err.message)
            }
        }
        if(errorMessage){
            reject(errorMessage)
        }
    })
}