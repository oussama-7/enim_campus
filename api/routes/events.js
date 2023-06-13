import express from "express";

import { 
    countEvents,
    createEvent,
         updateEvent  ,
         deleteEvent,
         getEvent,
         getEvents,
         countByClub} from "../controllers/event.js";
         import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';       
import Event from "../models/Event.js";

const router =express.Router();
router.get("/countEvents",verifyAdmin,countEvents)
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
