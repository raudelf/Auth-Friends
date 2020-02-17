import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Loader from 'react-loader-spinner';


const Login = (props) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const [loading, setLoading] = useState();

    const [errorMssg, setErrorMssg] = useState({
        message: '',
        error: false
    });

    const handleChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleLogin = e => {
        e.preventDefault();
        setErrorMssg({...errorMssg, message: '', error: false});
        setLoading(true);
        setTimeout(() => {
            axiosWithAuth()
        .post('/login', credentials)
        .then(res => {
            localStorage.setItem('token', res.data.payload);
            props.history.push('/protected');
            setLoading(false);
            console.log('Data: ', res);
        })
        .catch(err => {
            console.log('Invalid Login: ', err);
            setLoading(false);
            localStorage.removeItem('token');
            setErrorMssg({ ...errorMssg, message: 'Invalid Login', error: true });
        });
        }, 2000)
    }

    return (
        <div>
        {loading ? (<div><Loader type='Circles' color='#ffffff' /></div>) : (
            <form className='formContainer' onSubmit={handleLogin}>
            <h2>Log In</h2>
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
        )}
        {errorMssg ? (<h3 className='errorMssg'>{errorMssg.message}</h3>) : (<div></div>)} 
        </div>
    )
}

export default Login;