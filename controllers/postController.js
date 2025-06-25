const Post = require("../models/postModel");

exports.createPost = async(req,res) => {
      try{
            // console.log("fetching data.................");

            const {title , body} = req.body ; 
            const post = new Post({ title , body , }) ;
            const savedPost = await post.save() ;  
            
            // console.log("fetched and save");


            res.json({
                  post : savedPost , 
            });
      }
      catch(err)
      {
            return res.status(400).json({
                  error  : "error while creating post", 
            });
      }
};



//need some more testing after writing like controllers
exports.getAllPosts = async(req,res) => {
      try{
            const posts = await Post.find().populate("likes").populate("comments").exec() ;

            res.json({
                  posts ,
            })
      }
      catch(err)
      {
            return res.status(400).json({
                  err : "error while fetching posts", 
            });
      }
};