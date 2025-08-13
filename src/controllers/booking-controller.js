const { BookingService } = require("../services");
const bookingService = new BookingService();
 const createBooking =async(req,res)=>{
       try{
         const response = await  bookingService.createBooking(req.body);
          res.status(201).json(
            {
                message:"booking created successfully",
                data:response
            }
          )
       }
       catch(error){
              console.log(error.message,"error in controller");
             res.status(500).json({
                message:error.message
             }
             )
       }
 }

 module.exports={
    createBooking
 }