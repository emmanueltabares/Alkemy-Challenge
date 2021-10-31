const Server = require('./services/server');
const env = require('dotenv').config();
require('./db/db');

const PORT = 8080;

Server.listen(PORT, () => {
    console.log(`Server up in port: ${PORT}`);
})

