var express = require('express');
var router = express.Router();

const User = require('../models/userModel')
const Post = require('../models/postModel')
const passport = require('passport')
const localStrategy = require('passport-local')

passport.use(new localStrategy(User.authenticate()))

router.get('/',isLoggedIn, async function(req, res, next) {
  const posts = await req.user.populate('posts')
  // res.json(posts.posts)
  res.render('index',{user:req.user,post:posts.posts});
});

router.get('/login',(req,res)=>{
  res.render('login')
})

router.get('/register',(req,res)=>{
  res.render('register')
})

router.get('/createPost',isLoggedIn,(req,res)=>{
  res.render('create')
})

router.get('/logout',(req,res)=>{
  req.logout(()=>{
    res.redirect('/login')
  })
})

router.post('/register',async(req,res)=>{
  try{
    const {name,username,email,password} = req.body
    await User.register({name,username,email},password)
    res.redirect('/login')
  }catch(err){
    res.send(err)
  }
})

router.post('/login',passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/login'
}),(req,res)=>{})

router.post('/createPost',async(req,res)=>{
  try{
    const {title,description,image} = req.body
    const newPost = await new Post({
      title,
      description,
      image,
      userCreated:req.user._id
    })

    req.user.posts.push(newPost._id)
    await newPost.save()
    await req.user.save()
    res.redirect('/')
  }catch(err){
    res.send(err)
  }
})




function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    next()
  }else{
    res.redirect('/login')
  }
}




module.exports = router;
