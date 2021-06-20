import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import db from './firebase';
import './sidebarchat.css'

export function Sidebarchat({ addNewChat, name }) {

    const [seed, setSeed] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        const roomName = prompt('please enter name for chat');

        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            })
        }

    }

    return !addNewChat ? (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat_info">
                <h2>{name}</h2>
                <p>sssssss</p>
            </div>
        </div>


    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h3 className="add-new-chat-title">Add New Chat</h3>
        </div>
    );
}
