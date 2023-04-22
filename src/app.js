//configure environment variables
const config = require('config');

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');


//mongo db connect & start listening for requests
mongoose.connect( config.DB_URI , { useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        const port = config.PORT || 3000;
      app.listen(port);
      console.log(`Server running @ ${port}`);
    })
    .catch(err => {
        console.log(err);
    });

//routes
const apiRoutes = require('./routes/apiRoutes');

//express app
const app = new express();

// Swagger Setup
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Kagaba | API',
            version: '1.0.0',
            description: 'An API that allows users to obtain existing information of blogs and projects',
            termsOfService: 'https://kagaba-etienne.cyclic.app/terms-of-service',
            contact: {
                name: 'Kagaba',
                url: 'https://kagaba-etienne.cyclic.app',
                email: 'kagabaetienne365@gmail.com'
            },
            license:{
                name: 'Kagaba License',
                url: 'https://kagaba-etienne.cyclic.app'
            }
        },
        servers: [
            {
                url: 'https://kagaba-etienne.cyclic.app'
            }
        ]
    },
    apis: ['docs/*.yml']
};
const specs = swaggerJsDoc(options);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs));

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//don't show the log when it is test
if(config.NODE_ENV !== 'test') {
    //use morgan to log at command line
    app.use(morgan('dev'));
}
app.use(cookieParser());

//auth routes
app.get('/', (req, res) => {
    res.status(200).send({
        message: "Welcome to KAGABA | API"
    });
});
app.use(apiRoutes);

module.exports = app; // For testing