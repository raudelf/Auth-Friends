import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const handleChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h2>Log In</h2>
            <form className='formContainer'>
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