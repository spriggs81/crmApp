const logQueries = {
    // Related to logs.logins table
    getLoginsByUserId: `select * from logs.logins where user_id = '$userId' order by created_at desc`,
    getLoginsByEmail: `select * from logs.logins where email = '$email' order by created_at desc`,
    getAllLogins: `select * from logs.logins order by created_at desc`,
    getLast7LoginsByEmail: `select * from logs.logins where email = '$email' order by created_at desc limit 7`,
    createLogins: `INSERT INTO LOGS.LOGINS (userId, ,email, status, reason) VALUES ('$userId', 'email', '$status', '$reason')`,

    // Related to logs.actions table
    getActionsByAnId: `select * from logs.actions where function_id = '$functionId' order by created_at desc`,
    getAllActions: `select * from logs.actions order by created_at desc`,
    createActions: `insert into logs.actions (function_name, function_id, data, status) values ('$functionName', '$functionId', '$data', '$status')`,

    // Related to logs.errors table
    createError: `insert into logs.errors (user_id, data, error) values ('$userId', '$data', '$error')`,
    getErrorById: `select * from logs.errors where user_id = '$userId' order by created_at desc`,
    getAllErrors: `select * from logs.errors order by created_at desc`

}

export default logQueries;