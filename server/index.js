import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import jobOfferRoutes from './routes/jobOffers.js';
import userRoutes from './routes/users.js';
import profileDetailsRoutes from './routes/profileDetails.js';
import { createServer } from 'http';
import * as io from "socket.io";

const app = express();


app.use(bodyParser.json({ limit: "30mb", exended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", exended: true }));
app.use(cors());
app.use('/jobOffers', jobOfferRoutes);      //added prefix /jobOffers to all routes in jobOffers
app.use('/user', userRoutes);
app.use('/profile', profileDetailsRoutes);
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";


const server=createServer();
const PORTSOCKET=4000;

const socketio=new io.Server(server,{
    cors: {
      origin: "*",
    },
  });

socketio.on('connection',(socket)=>{
  console.log(`Client ${socket.id} connected`);
      const {roomId}=socket.handshake.query;

      socket.join(roomId);
     
      socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        socketio.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
        console.log(data);
      });

      socket.on("disconnect", () => {
        socket.leave(roomId);
        console.log(`Client ${socket.id} disconnected!`);
      });
   
 });
 
    // socket.on('join',({normalId,jobOfferTitle},callback)=>{
        
    //   const{error,user}=addUser({id:socket.id,normalId,jobOfferTitle});
        
    //     if(error) return callback(error);
         
    //     socket.join(user.jobOfferTitle);//Serve per fare unire un utente a una specifica stanza
        
    //     socket.emit('message',{user:'admin',text:`${user.normalId} welcome to the room ${user.jobOfferTitle}!`}); //Creiamo di default un messaggio che viene stampato non appena l'utente si unisce alla stanza dove gli diamo il benvenuto
        
    //     socket.broadcast.to(user.jobOfferTitle).emit('message',{user:'admin',text:`${user.normalId} has joined!`}); //Manda un messaggio a tutti tranne che a quello specifico utente che quell'utente si è unito
      
    //     socketio.to(user.jobOfferTitle).emit('roomData',{jobOfferTitle:user.jobOfferTitle,users:getUsersInRoom(user.jobOfferTitle)})
         

    //     callback();//Non fa nulla se non va in error
  
 

//     //Eventi per gestire i messaggi degli utenti, li aspettiamo dal frontend
//     socket.on('sendMessage',(message,callback)=>{
//          //Cosa facciamo qui? Prendiamo l'utente che ha mandato il messaggio,lo prendiamo con socket.id che è una specifica istanza dell'utente
//          const user=getUser(socket.id);
//          //Ora mandiamo il messaggio mandato da quello specifico utente e il message viene dal frontend verso la stanza dell'utente e facciamo un emit
//           socketio.to(user.jobOfferTitle).emit('message',{user:user.normalId,text:message});
//          socketio.to(user.jobOfferTitle).emit('roomData',{jobOfferTitle:user.jobOfferTitle, users:getUsersInRoom(user.jobOfferTitle)});
//     });
//     //     const error=true;
//     //     if(error){
//     //         callback({error:'error'});
//     //     }
//     // });

//  socket.on('disconnected',()=>{
//      const user=removeUser(socket.id);
//      if(user){
//        socketio.to(user.jobOfferTitle).emit('message',{user:'admin',text:`${user.normalId} has left!`});
//      }
//  })
// });
server.listen(PORTSOCKET, () => {
  console.log(`Listening on port ${PORTSOCKET}`);
});
const CONNECTION_URL = 'mongodb+srv://user:password.mongodb@cluster0.gkpdn.mongodb.net/projectDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;      //heroku will auto populate the first opz

//connect to DB, use... is added to avoid terminal warnings
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))     //conn successfull
    .catch((error) => console.log(error.message));      //conn failed

mongoose.set('useFindAndModify', false);        //to avoid terminal warnings


// const router=express.Router();
// router.get('/',(req,res)=>{
//     res.send('Server is up and running');
// });

// const app=express();

// app.use(router);