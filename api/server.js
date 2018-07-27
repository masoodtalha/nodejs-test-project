const express = require('express');
const bodyparser = require('body-parser');
const dbHelper = require('./helpers/db/connectionHelper');
const routes = require('./routes/routes');
const cors = require('cors');

const app = express();


dbHelper.DBConnectMongoose()
  .then(() => {
    // configure app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(bodyparser.json({ limit: '10mb' }));
    app.use(cors());
    routes.assignRoutes(app);

    app.listen(5000);

    console.log('Server listening on port 5000');
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
