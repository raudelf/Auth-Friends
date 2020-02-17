import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const handleChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleLogin = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('/login', credentials)
        .then(res => {
            localStorage.setItem('token', res.data.payload);
            props.history.push('/protected');
            console.log('Data: ', res)
        })
        .catch(err => {
            console.log('Invalid Login: ', err);
        });
    }

    return (
        <div>
            <h2>Log In</h2>
            <form className='formContainer' onSubmit={handleLogin}>
                <input 
                type='text'
                name='username'
                placeholder='Username'
                value={credentials.username}
                onChange={handleChange}
                />
                <input 
                type='password'
                name='password'
                placeholder='Password'
                value={credentials.password}
                onChange={handleChange}
                />
                <button>Log In</button>
            </form>
        </div>
    )
}

export default Login;