import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
   try{
    const {message} = req.body;
    const {id: receiverId} = req.params;
    const senderId = req.user._id;

    let conservation = await Conversation.findOne({
        participants: {$all: [senderId, receiverId]},
    })

    if(!conservation){
        conservation = await Conversation.create({
            participants: [senderId, receiverId],
        })
    }

    const newMessage = new Message({
        senderId,
        receiverId ,
        message,
    })

    if(newMessage){
        conservation.messages.push(newMessage._id);
    }
    //SOCKET IO FUNC WILL GO HERE
    
    // await conservation.save();
    // await newMessage.save();

    await Promise.all([conservation.save(), newMessage.save()]);

    res.status(201).json(newMessage);

   } catch(error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error:"Internal server error"});
   } 
}