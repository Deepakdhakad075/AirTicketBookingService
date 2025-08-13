const BookingRepository = require("../repository/booking-repository");
const {GetFlightURL} = require('../config/serverConfig')
const axios = require('axios');
const { ServiceError } = require("../utils/errors");
class BookingService  {
     constructor(){
        this.bookingRepository = new BookingRepository();
     }

     async createBooking(data){
      try{
         
        const flightId = data.flightId;
        let getFlightUrl = `${GetFlightURL}/api/v1/flight/${flightId}` ;
       
        const flight = await axios.get(getFlightUrl);

         const response = flight.data.data;
         let  priceOfTheFlight = response.price;
         if(data.noOfSeats > response.totalSeats){
            throw new ServiceError("Something went wrong in the Booking Process","insufficient seats in the flight");
         }

         let totalCost  = priceOfTheFlight*(data.noOfSeats||1);
       
         const bookingPayload = {...data,totalCost};
         const booking = await this.bookingRepository.create(bookingPayload);
         
            let updateFlightURL  = `${GetFlightURL}/api/v1/flight/${flightId}` ;
            console.log(updateFlightURL,"updateFlighturl");
            let updatedSeats = response.totalSeats-(data.noOfSeats||1);
            console.log(updatedSeats);
           await axios.patch(updateFlightURL,{totalSeats:updatedSeats });
             const finalBooking = await this.bookingRepository.update(booking.id,{
               status:"Booked"
             })
        return finalBooking;

      }
      catch(error){
         if(error.name == 'RepositoryError' || error.name == 'ValidationError'){
            throw error;
         }
         throw new ServiceError();
      }
     }
}


module.exports = BookingService