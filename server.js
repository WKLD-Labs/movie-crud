const express = require('express');
const cors = require('cors');
const config = require('dotenv');
const app = express();
const port = 5500;
const movieRoute = require('./app/routes/movie.route');

const db = require('./app/models');
db.sequelize.sync().then(() => {
    console.log('Database synced successfully');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/movies', movieRoute);
app.get('/', (req, res) => {
    res.send('Hello Continous Deployment!!');
});
app.listen(port, () => console.log(`App listening on port http://localhost:${port}!`) )