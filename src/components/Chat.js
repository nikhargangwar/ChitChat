import { Avatar, IconButton } from '@material-ui/core';
import React from 'react';
import './Chat.css';
import { useState, useEffect } from 'react';
import MoreVert from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import db from './firebase';
import { useParams } from 'react-router';
import firebase from "firebase";
import { useStateValue } from '../StateProvider';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages,setMessages]=useState([]);
    const [{user},dispatch] =useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('Room').doc(roomId)
            .onSnapshot((snapshot) => 
                setRoomName(snapshot.data()
                .name)              
            );
        db.collection("Room")
        .doc(roomId)
        .collection("messages")
        .orderBy('timestamp','asc')
        .onSnapshot((snapshot)=>
            setMessages(snapshot
                .docs.map((doc) => doc.data()))
        );

        }
   
    }, [roomId]);


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('Room').doc(roomId).collection("messages").add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput("");
    }

    return (
        <div className="Chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Seen 
                        {" " + new Date(
                            messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                        </p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>


            </div>

            <div className="chat_body">
                {messages.map((message) =>(

                     //below statement states if the condition is true then p tag will have both className - chat_message and chat_received else only chat_message 

               <p className={`chat_message ${message.name==user.displayName && "chat_receiver"}`}>
                <span className="chat_name">{message.name} </span>
                {message.message}
            
                <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
            </p>

                ))}
               
            </div>

            <div className="chat_footer">
                <InsertEmoticonIcon />

                <form >
                    <input placeholder="Type a message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text" />
                    <button onClick={sendMessage}
                        type="submit">Send a message</button>
                </form>

                <MicIcon />
            </div>

        </div >
    )
}

export default Chat;
