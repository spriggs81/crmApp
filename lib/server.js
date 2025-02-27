import express from 'express';
const app = express();
import users from './routes/users.js'

app.use('/users', users);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});