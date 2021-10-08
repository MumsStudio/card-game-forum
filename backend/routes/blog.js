const express = require('express');

const BlogController = require("../controller/blogs")

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file-process');

const router = express.Router();

// add new blog
router.post("", checkAuth, extractFile, BlogController.addBlog);
// retrieve all blogs
router.get("",BlogController.fetchAllBlogs);
// retrieve one blog
router.get("/:id", BlogController.fetchOneBlog);
// Update one blog
router.put("/:id",checkAuth,extractFile, BlogController.updateBlog);
// Delete one blog
router.delete("/:id",checkAuth, BlogController.deleteBlog);

module.exports = router;
