const express=require("express")
const app=express()
const mongoose=require('mongoose')
const Post=require('./model/post')
const cors=require('cors');
const port= process.env.PORT || 5000;

// const upload=require('./multer')
// const path=require('path');
const dotenv = require('dotenv')
// const cloudinary=require('./cloudinary');
dotenv.config();
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         const filenameArr=file.originalname.split(".");
      
//       cb(null, file.fieldname + '-' + Date.now()+"." +filenameArr[filenameArr.length-1]);
//     }
//   })
  
//   const upload = multer({ storage: storage })



async function connectDB(){
    
    try {
       await  mongoose.connect('mongodb+srv://Dnyanesh:Dnyanesh45@instaclone-c.iwayt.mongodb.net/?retryWrites=true&w=majority');
    } catch (error) {
        console.log(error);
        throw error("Database connection failed");
    }
}


async function main(){

    await connectDB();
    app.use(cors());
    app.use(express.json());
    // app.use("/uploads",express.static(path.join(__dirname, 'uploads')));

    
    // app.get('/',(req,res)=>{
    //     res.send('Welcome to instaclone');
    // })
    
    // app.get('/api/v1/posts',async (req,res)=>{
    //     const posts=await Post.find()
    //      res.send(
    //         posts
    //     )
    // })



    // app.get('/api/v1/posts/:index',async (req,res)=>{
    //     const image=await Post.findOne({_id:mongoose.Types.ObjectId(req.params.index)});
    //     console.log(image);
    //      res.send(
    //         image
    //     )
    // })
    

    // app.post('/api/v1/posts',upload.single('image'),async (req,res)=>{
    //     try {
    //         const { redirectURL } = req.body;
    //     console.log(req.body,req.file);
    //     const {author,location,description}=req.body;
    //     // const image=req.file.path;
    //     const result=await cloudinary.uploader.upload(req.file.path);
    //     let image=result.secure_url;
    //     // const posts=await Post.create({author,location,description,image});
    //     res.status(201).redirect(redirectURL);
            
    //     } catch (error) {
    //         console.log(error);
    //     }
        
    // })
    //routes
    app.use('/', require('./routes/posts'));

    app.listen(port ,(err)=>{
        console.log(`Server started at ${port}`);
    })




} // main end
main();