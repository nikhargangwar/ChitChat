import { Button } from '@material-ui/core'
import React from 'react'
import { actionTypes } from '../Reducer';
import { useStateValue } from '../StateProvider';
import { auth, provider } from './firebase'
import './Login.css'

function Login() {
    const [{},dispatch] = useStateValue();

    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            })
        })
        .catch((error)=>alert(error.message));
    };

    
    return (
        <div className="login">
            <div className="login_container">
                {/* <img src="C:\nikhar\Yash\projects\Whatsapp_clone\whatsapp-clone\public\images (6).jpeg" alt="Logo" /> */}
                <div className="login_text">
                    <h1>Sign in to ChitChat</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
