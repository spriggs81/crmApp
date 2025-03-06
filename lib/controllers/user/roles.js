import userQueries from '../../database/queries/users.js'
import runQuery from '../../database/db.js'
import { isNumber, isString } from '../../functions/_functions.js'

export const createUserRole = (userId, roleId) => {
    return new Promise(async (resolve, reject) => {
        userId = isString(userId) ? userId : false
        roleId = isNumber(roleId) ? roleId : false
        if(userId && roleId){
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
        if(!userId || !roleId){
            const message = !userId && !roleId
                            ? 'Missing UserId and RoleId'
                            : !userId && roleId
                            ? 'Missing UserId'
                            : 'Missing RoleId';
            reject(message)
        }
    })
}

export const getUserRole = (userId) => {
    return new Promise(async (resolve, reject) => {
        userId = isString(userId) ? userId : false
        if(userId){
            try {
                const query = userQueries.getRoleByUserId
                            .replace('$userId', userId)
                const role = await runQuery(query)
                resolve(role)
            } catch (error) {
                reject(err.message)
            }
        }
        if(!userId){
            reject('Missing UserId')
        }
    })
}

export const updateUserRole = (userId, roleId) => {
    return new Promise(async (resolve, reject) => {
        userId = isString(userId) ? userId : false
        roleId = isNumber(roleId) ? roleId : false
        if(userId && roleId){
            // change to get the user's role
            const userRole = await getUserRole(userId)
            const isSingle = userRole.length === 1 ? true : false;
            const areMultiple = !isSingle && userRole.length > 1 ? true : false
            if(isSingle && !areMultiple){
                const newRoleProvided = userRole[0].roleid !== roleId 
                        ? roleId : false;
                // add role using function here
                if(newRoleProvided){
                    await createUserRole(userId, roleId)
                    .then(await deleteUserRole(userRole[0].id))
                    .then((data) => resolve('User Role Should be Updated'))
                    .catch((err) => reject(err.message))
                }
                if(!newRoleProvided){
                    reject(`There is no change in the user's role`)
                }
            }
            if(!isSingle || areMultiple){
                const errorMessage = !isSingle && !areMultiple
                                    ? 'No User Role Found'
                                    : 'Multiple Users Found';
                reject(errorMessage)
            }
        }
        if(!roleId || !userId){
            const message = !roleId && !userId ? 'Missing UserId and RoleId'
                            : !roleId && userId ? 'Missing RoleId'
                            : 'missing userId'
            reject(message)
        }
        
    })
}

export const deleteUserRole = (id) => {
    return new Promise(async (resolve, reject) => {
        id = isNumber(id) ? id : false
        if(id){
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
        if(!id){
            reject('Missing Id')
        }
    })
}