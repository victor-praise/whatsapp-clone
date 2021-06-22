import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import db from './firebase';
import { Link } from 'react-router-dom';
import './sidebarchat.css';

export function Sidebarchat({ addNewChat, name, id }) {

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState("")
   
    useEffect(() => {

        // gets last message from database and displays it
        if (id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {

        // creates new chat and stores to firebase
        const roomName = prompt('please enter name for chat');

        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            })
        }

    }

    return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
    </Link>
     


    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h3 className="add-new-chat-title">Add New Chat</h3>
        </div>
    );
}
