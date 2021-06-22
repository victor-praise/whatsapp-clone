import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './chat.css'
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './stateProvider';
import firebase from 'firebase';

export function Chat(props) {

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const [room, setRoom] = useState('');
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [{ user }] = useStateValue();
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])


    useEffect(() => {
        if (roomId) {

            // gets the room name fomr the database
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoom(snapshot.data().name)
            ));

            // pulls all the messages from the database

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        // adds user's message to the db and displays it
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");


    }


    return (
        <>
            <div className="chat">
                <div className="chat__header">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div className="chat__headerInfo">
                        <h3>{room}</h3>
                        <p>  Last seen {" "}
                            {new Date(
                                messages[messages.length - 1]?.timestamp?.toDate()
                            ).toUTCString()}</p>
                    </div>
                    <div className="`chat__headerRight`">
                        <IconButton>
                            <SearchOutlined />
                        </IconButton>
                        <IconButton>
                            <AttachFileIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </div>
                <div className="chat__body">
                    {messages.map(message => (
                        <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                            <span className="chat__name">
                                {message.name}
                            </span>
                            {message.message}
                            <span className="chat__timestamp">
                                {new Date(message.timestamp?.toDate()).toUTCString()}
                            </span>
                        </p>
                    ))}


                </div>
                <div className="chat__footer">
                    <InsertEmoticonIcon />
                    <form>
                        <input type="text" placeholder="Type a message" value={input} onChange={
                            e => {
                                setInput(e.target.value)
                            }
                        } />
                        <button onClick={sendMessage}> Send a message</button>
                    </form>
                    <MicIcon />
                </div>
            </div>

        </>
    )
}
