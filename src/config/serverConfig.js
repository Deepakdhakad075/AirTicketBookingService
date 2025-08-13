const dotenv = require('dotenv')
dotenv.config();

module.exports={
    PORT : process.env.PORT,
    GetFlightURL:process.env.GetFlightURL
}
