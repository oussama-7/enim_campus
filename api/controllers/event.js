import Event from "../models/Event.js";

//create event
export const createEvent = async(req,res,next)=>{
  
    const newEvent = new Event(req.body)
    try{
        const savedEvent = await newEvent.save()
        res.status(200).json(savedEvent)

    }catch(err){
        next(err)
    }
}

//updateEvent
export const updateEvent = async(req,res,next)=>{
    try{
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id,{$set : req.body},{new :true})
        res.status(200).json(updatedEvent)

    }catch(err){
        next(err)
    }
};

export const deleteEvent = async(req,res,next)=>{
    try{
        await Event.findByIdAndDelete( req.params.id );
        res.status(200).json("deletedEvent")

    }catch(err){
        next(err)  
    }
};

///getEvent
export const getEvent = async(req,res,next)=>{
    try{
        const event = await Event.findById( req.params.id );
        res.status(200).json(event)
    }catch(err){
        next(err) 
    }
};

///getEvents
export const getEvents = async(req,res,next)=>{
    try{
        const events = await Event.find(req.query);
        res.status(200).json(events);

    }catch(err){
        next(err);
    }
};
///countByClub
export const countByClub = async(req,res,next)=>{
   const clubs =req.query.clubs.split(",")
    try{
        const list = await Promise.all(clubs.map(club=>{
           return Event.countDocuments({club:club})
        }))
        res.status(200).json(list);

    }catch(err){
        next(err);
    }
};

export const countEvents = async (req, res, next) => {
    try {
      const eventsCount = await Event.countDocuments();
     
      res.status(200).json(
        {count: eventsCount },
      );
    } catch (err) {
      next(err);
    }
  };
