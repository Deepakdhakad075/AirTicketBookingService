const { StatusCodes } = require('http-status-codes')
const {Booking} = require('../models/index')
const { ValidationError, AppError } = require('../utils/errors')

class BookingRepository {
    async create(data){
        try{
            const response = await Booking.create(data);
            return response
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

   async update(bookingId,data){
      try{
        const booking = await Booking.findByPk(bookingId);
        if(data.status){
          booking.status = data.status
        }
        await booking.save();
         return booking;
      } catch (error) { 
        throw new AppError(
          'RepositoryError',
          'Cannot Update Booking',
          'there was some issue in updating a Booking,please try again later',
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      }
    }
}


module.exports=BookingRepository