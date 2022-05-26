const router = require('express').Router();
const cloudinary = require('../cloudinary');
const upload = require('../multer');
// const Post=require('./model/post');
// const { json } = require('express');
const dotenv = require('dotenv')
dotenv.config();
const Post=require('../model/post')


router.post('/api/v1/posts', upload.single('image'), async(req, res) => {
  try {
    // upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // console.log(req.body)
    const { redirectURL } = req.body;
    console.log(req.body);
    // create new post
    let post = new Post ({
      image: result.secure_url,
      author: req.body.author,
      location: req.body.location,
      description: req.body.description,
      cloudinary_id: result.public_id
    });

    // save post 
    await post.save();
    // res.json(post);
    res.status(201).redirect(redirectURL)

  } catch(e) {
    console.log(e)
  }
});

router.get('/api/v1/posts', async(req, res) => {
  try {
    let post = await Post.find();
    res.json(post);
  } catch(e) {
    console.log(e)
  }
});

module.exports = router;