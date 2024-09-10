import Blog from "../models/blog_model.js"




export const create=async(req,res,next)=>{
    const date = new Date(req.body.date);
    if (isNaN(date.getTime())) {
        // If date parsing fails, send a 400 error with a message
        return res.status(400).json({ message: 'Invalid date format. Please use "YYYY-MM-DD".' });
      }
    req.body.date=date
  try {
    const blog=await new Blog(req.body)
    await blog.save();
    res.status(200).json("blog created successfully")
  } catch (error) {
    next(error)
  }
}

export const updateblog=async(req,res)=>{
    try {
        const updateblog=await Blog.findByIdAndUpdate(id,req.body,{new:true})
          res.status(200).json("blog updated successfully")
    } catch (error) {
        
    }
}

export const deleteblog=async(req,res,next)=>{
    const {id}=req.params
    try {
        const blog=await Blog.deleteOne({id})
        res.status(200).json("blog deleted successfully")
    } catch (error) {
     next(error)   
    }
}


export const getlatestblog=async (req,res,next)=>{
    try {
        const blog=await Blog.find()
                            .sort({createdAt:-1})
                            .limit(6);
   res.status(200).json(blog)
    } catch (error) {
        next(error)
    }
}

export const getblogbyid=async(req,res)=>{
    const {id}=req.params
try {
    const blog=await Blog.findById(id)
    res.status(200).json(blog)
} catch (error) {
    next(error)
}
}