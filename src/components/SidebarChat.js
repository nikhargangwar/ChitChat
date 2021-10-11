import { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import React from 'react';
import './SidebarChat.css';
import db from "./firebase";
import { Link } from 'react-router-dom';

function SidebarChat({  id, name, addNewChat }) {


    const [seed, setSeed] = useState("");
    const [messages,setMessages] =useState([]);
    
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    useEffect(()=>{
        if(id)
        {
            db.collection("Room").doc(id)
            .collection("messages")
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc)=>
            doc.data())))
        }
    },[id]);

    const createChat = () => {

        const roomName = prompt("Enter the name of the room");

        if (roomName) {
            db.collection('Room').add({

                name: roomName
            })
        }
    }


    return !addNewChat ? (
        <Link to={`/rooms/${id}`} >
        <div className="sidebarChat">     
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebar_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.name}:{" " + messages[0]?.message}</p>
                </div>
        </div>
        </Link>
    ) : (
        <div onClick={createChat}
            className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
