const express=require("express")
const {NoteModel}=require("../model/note.model")
const noteRouter=express.Router()
const jwt=require("jsonwebtoken")

// noteRouter.get("/",async (req,res)=>{
//         try{
//         const note=await NoteModel.find()
//         res.status(200).send(note)

//         }catch(err){
//             res.status(400).send({"msg":"error"})

//             console.log(err);
//         }
// })
noteRouter.get("/",async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,'pranay')
  
        try{
            if(decoded){
                const notes=await NoteModel.find({"userID":decoded.userID})
                res.status(200).send(notes)
            }
       

        }catch(err){
            res.status(400).send({"msg":"error"})

            
        }
})
noteRouter.post("/add",async (req,res)=>{
    try{
        const note=new NoteModel(req.body)
    
        await note.save()
        
        res.status(200).send({"msg":"A new note has been added"})
    }catch(err){
        res.status(400).send({"msg":"error"})
        console.log(err);
    }
})

// noteRouter.patch("/update/:id",async (req,res)=>{
//     const id= req.params.id;
//     const playload=req.body;

//     try{
       
//         await NoteModel.findByIdAndUpdate({_id:id},playload)
//         res.send({"msg":"notes has been update"})

//     }catch(err){
//         res.send(err);
//     }

// })


noteRouter.get("delete/:id",async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,'pranay')
  
        try{
            if(decoded){
                 const id= req.params.id;
                 const playload=req.body;
                const notes=await NoteModel.findByIdAndDelete(req.body.id)
                res.send(await notes.save())
            }
       

        }catch(err){
            res.status(400).send({"msg":"error"})

            
        }
})





// noteRouter.delete("/delete/:id",async (req,res)=>{
//     try{
//         const id= req.params.id;
//         await NoteModel.findByIdAndDelete({_id:id})
//         res.send({"msg":"notes has been delete"})

//     }catch(err){
//         res.send(err);
//     }
// })

module.exports={
    noteRouter
}
