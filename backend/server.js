import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/users', (req, res) => {
    res.send(data.users);
});

app.get('/api/booking', (req, res) => {
    res.send(data.booking);
});

app.get('/', (req, res) =>{
    res.send('Server is up and running');
});

app.listen(5000, () => {
    console.log('Serve at http://localhost:5000')
});