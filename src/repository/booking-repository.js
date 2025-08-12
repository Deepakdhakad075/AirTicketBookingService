const { StatusCodes } = require('http-status-codes')
const {Booking} = require('../models/index')
const { ValidationError, AppError } = require('../utils/errors')

class BookingRepository {
    async create(data){
        try{

        }
        catch(error){
          if(error.name == 'SequelizeValidationError'){
            throw new ValidationError
          }
          throw new AppError(
            'Repository layer Error',
            'Cannot Create Booking',
            'there have some issue in create booking',
            StatusCodes.INTERNAL_SERVER_ERROR
          )
        }
    }
}