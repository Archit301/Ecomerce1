import mongoose from "mongoose";

const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    avatar:{
        type:Array
    },
    author:{
        type:String,
        required:true
    },
   date:{
    type: Date,
     required: true,
     default: Date.now 
    },
    summary:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

},{timestamps:true})


const Blog=mongoose.model('Blog',blogSchema)
export default Blog