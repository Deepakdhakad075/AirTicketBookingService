const express = require('express')
const {PORT} = require('./config/serverConfig')
const port = PORT ||3002 ;
const app = express();
const apiRautes = require('./routes/index');
const db = require('./models/index')
const setupAndStartServer = () =>{
  
    app.use(express.json()); // parse application/json
    app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

    app.use('/api',apiRautes)

    app.listen(port , ()=>{
        console.log(`App is running on port ${port}`);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }
    })
}

setupAndStartServer();