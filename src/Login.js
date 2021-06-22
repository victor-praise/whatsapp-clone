import React from 'react';
import { Button } from '@material-ui/core';
import './login.css'
import { auth, provider } from './firebase';
import { useStateValue } from './stateProvider';
import { actionTypes } from './reducer';

export function Login(props) {
    const [{}, dispatch] = useStateValue();
    
  const signIn = () => {

    // calls google authentication
        auth.signInWithPopup(provider).then(
            result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
                
            }
        ).catch(
            error => {
                alert(error.message)
            }
        )
    }
    return (
        <div className="login">
            <div className="login_container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="" />
                <div className="login_text">
                    <h1>Sign in to Whatsapp</h1>
                </div>
                <Button type="submit" onClick={signIn}>Sign in With Google</Button>
            </div>
        </div>
    )
}
