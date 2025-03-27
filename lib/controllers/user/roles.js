// Dependencies
import userQueries from '../../database/queries/users.js'
import runQuery from '../../database/db.js'
import { isNumber, isString, missingError } from '../../functions/_functions.js'

// Creates a User's Role
// Required: userId(String)  |  roleId(Number)
export const createUserRole = (userId, roleId) => {
    return new Promise(async (resolve, reject) => {
        userId = isString(userId) ? userId : false
        roleId = isNumber(roleId) ? roleId : false
        const errorMesaage = missingError({userId: userId, roleId: roleId})
        if(!errorMesaage){
            try {
                const query = userQueries.addRoleToUser
                            .replace('$userId', userId)
                            .replace('$roleId', roleId)

                const createdRole = await runQuery(query)
                resolve(createdRole)
            } catch (err) {
                reject(err.message)
            }
        }
        if(errorMesaage){
            reject(errorMesaage)
        }
    })
}

// Gets User's Role
// Required: userId(String)
export const getUserRole = (userId) => {
    return new Promise(async (resolve, reject) => {
        userId = isString(userId) ? userId : false
        const errorMesaage = missingError({userId: userId})
        if(!errorMesaage){
            try {
                const query = userQueries.getRoleByUserId
                            .replace('$userId', userId)
                const role = await runQuery(query)
                resolve(role)
            } catch (error) {
                reject(err.message)
            }
        }
        if(errorMesaage){
            reject(errorMesaage)
        }
    })
}

// Updates a User's Role and Deleted The Old User's Role
// Required: userId(String)  |  roleId(Number)
export const updateUserRole = (userId, roleId) => {
    return new Promise(async (resolve, reject) => {
        userId = isString(userId) ? userId : false
        roleId = isNumber(roleId) ? roleId : false
        const errorMesaage = missingError({userId: userId, roleId: roleId})
        if(!errorMesaage){
            // change to get the user's role
            const userRole = await getUserRole(userId)
            const isSingle = userRole.length === 1 ? true : false;
            const areMultiple = !isSingle && userRole.length > 1 ? true : false
            if(isSingle && !areMultiple){
                const newRoleProvided = userRole[0].roleid !== roleId 
                        ? roleId : false;
                // add role using function here
                if(newRoleProvided){
                    await deleteUserRole(userRole[0].id)
                    .then(async () => await createUserRole(userId, roleId))
                    .then(() => resolve('User Role Should be Updated'))
                }
                if(!newRoleProvided){
                    reject(`There is no change in the user's role`)
                }
            }
            if(!isSingle || areMultiple){
                const errorMessage2 = !isSingle && !areMultiple
                                    ? 'No User Role Found'
                                    : 'Multiple Users Found';
                reject(errorMessage2)
            }
        }
        if(errorMesaage){
            reject(errorMesaage)
        }
        
    })
}

// Deletes the User's Role
// Required: id(Number)
export const deleteUserRole = (id) => {
    return new Promise(async (resolve, reject) => {
        id = isNumber(id) ? id : false
        const errorMesaage = missingError({id: id})
        if(!errorMesaage){
            try {
                const tableDataQuery = userQueries.getUserRoleByTableId
                                        .replace('$tableId', id)
                const tableData = await runQuery(tableDataQuery)
                if(tableData.length > 0 && tableData[0].deleted_at === null){
                    const query = userQueries.deleteUserRole
                                    .replace('$id', id)
                    const role = await runQuery(query)
                    resolve(role)
                }
                if(tableData.length === 0 || tableData[0].deleted_at !== null){
                    reject('No Active Roles Found')
                }
            } catch (err) {
                reject(err.message)
            }
        }
        if(errorMesaage){
            reject(errorMesaage)
        }
    })
}