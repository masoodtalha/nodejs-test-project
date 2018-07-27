const express = require('express');
const bodyparser = require('body-parser');
const dbHelper = require('./helpers/db/connectionHelper');
const routes = require('./routes/routes');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();


dbHelper.DBConnectMongoose()
  .then(() => {
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(bodyparser.json({ limit: '10mb' }));
    app.use(cors());
    routes.assignRoutes(app);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.listen(5000); // start the app on the port specified, port can be taken from config file

    console.log('Server listening on port 5000');
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
