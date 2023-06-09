import express from "express";

import { createEvent,
         updateEvent  ,
         deleteEvent,
         getEvent,
         getEvents,
         countByClub} from "../controllers/event.js";
import Event from "../models/Event.js";

const router =express.Router();

//create
router.post("/", createEvent);

//update
router.put("/:id",updateEvent );

    
//DELETE
router.delete("/:id",deleteEvent)

   
//GET
router.get("/find/:id",getEvent);

    
///GET ALL

router.get("/",getEvents);
router.get("/countByClub",countByClub );
   

export default router