import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './chat.css'
export function Chat(props) {

    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        setInput("");
        console.log(input);

    }


    return (
        <>
            <div className="chat">
                <div className="chat__header">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div className="chat__headerInfo">
                        <h3>Room Name</h3>
                        <p>Last Seen at .....</p>
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

                    <p className={`chat__message ${true && "chat__receiver"}`}>
                        <span className="chat__name">
                            victor praise
                        </span>
                        Hey Guys
                        <span className="chat__timestamp">
                            3:52pm
                        </span>
                    </p>

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
