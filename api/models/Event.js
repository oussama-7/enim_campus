import mongoose from 'mongoose';
const EventSchema = new mongoose.Schema({

name:{
    type: String,
    required : true
},

city:{
    type: String,
    required : true
},

club:{
    type: String,
    required : true
},

date:{
    type: String,
    required : true
},

photos:{
    type: [String],
},
desc:{
    type: [String],
    required:true
},
title:{
    type: [String],
    required:true
},
rating:{
    type:Number,
    min:0,
    max:5
},
featured:{
    type:Boolean,
    default:false,
},

});
export default mongoose.model("Event",EventSchema)