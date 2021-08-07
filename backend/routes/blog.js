const express = require('express');

const Blog = require('../models/blog');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file-process');

const router = express.Router();

// get blog from client then save to database
router.post("", checkAuth, extractFile, (request, response, next)=>{
  const blog = new Blog({
    title: request.body.title,
    content: request.body.content,
    creator: request.userData.userID
  });

  blog.save().then(createdBlog=>{
    response.status(201).json({
      message: "Blog added successfully to database",
      blog:{
        ...createdBlog,
        id: createdBlog._id,
      }
    });
  });
});

// retrieve data from database
router.get("",(request, response, next)=>{
  const pageSize = +request.query.pageSize;
  const currPage = +request.query.currPage;
  const blogQuery = Blog.find();
  let fetchedBlog;
  if (pageSize && currPage){
    blogQuery.skip(pageSize*(currPage-1))
             .limit(pageSize);
  }
  blogQuery.then(documents =>{
    fetchedBlog=documents;
    return Blog.countDocuments();
  })
  .then(count =>{
    response.status(200).json({
      message: "blog fetched successfully",
      blogs: fetchedBlog,
      totalBlogs:count
    });
  });
});

router.get("/:id", (req,res,next)=>{
  Blog.findById(req.params.id).then(blog=>{
    if (blog){
      res.status(200).json(blog);
    }else{
      res.status(404).json({message:"blog not found!"});
    }
  });
});

// put to replace old blog with new one
router.put("/:id",checkAuth,extractFile,(req, res, next)=>{
  const blog = new Blog({
    _id: req.body.id,
    title:req.body.title,
    content: req.body.content,
    creator: req.userData.userID
  });
  Blog.updateOne({_id: req.params.id, creator: req.userData.userID},blog).then(result=>{
    if (result.nModified >0){
      res.status(200).json({message: "Successful updated blog"});
    }else{
      res.status(401).json({message: "Not Authorized to perform action"});
    }
  });
});

// delete blog with certain id
router.delete("/:id",checkAuth, (request, response, next)=>{
  Blog.deleteOne({_id: request.params.id, creator: request.userData.userID}).then(result=>{
    if (result.n >0){
      response.status(200).json({message: "blog deleted"});
    }else{
      response.status(401).json({message: "Not Authorized to perform action"});
    }
  });
});

module.exports = router;
