import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Loader from 'react-loader-spinner';

const FriendsList = props => {

    const [friendsList, setFriendsList] = useState([]);

    const [loading, setLoading] = useState();

    const [hidden, setHidden] = useState(false)

    const [newFriend, setNewFriend] = useState({
        id: Date.now(),
        name: '',
        age: '',
        email: ''
    })
    
    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
            .get('/friends')
            .then(res => {
                console.log(res)
                setLoading(false)
                setFriendsList(res.data)
            })
            .catch(err => {
                console.log('Error Fetching Friends: ', err);
            });
    }, [setFriendsList])

    const toggleForm = e => {
        e.preventDefault();
        setHidden(!hidden);
    }

    const handleSubmit = e => {
        setHidden(!hidden);
        axiosWithAuth()
            .post('/friends', newFriend)
            .then(data => {
                console.log('Successfully Submitted a New Friend: ', data);
                setNewFriend({...newFriend,
                name: '',
                age: '',
                email: ''
                })
            })
    }

    const handleChanges = e => {
        setNewFriend({ ...newFriend, [e.target.name] : e.target.value})
    }

    return (
        <>
            <h2>Friends List</h2>
            <div className='formContainer'>
                <button className='addFriend btn' onClick={toggleForm}>
                    Add a Friend
                </button>
                <form className={`friendForm${!hidden ? (' hidden') : ('')}`} onSubmit={handleSubmit}>
                    <input 
                    name='name'
                    type='text'
                    placeholder='Full Name'
                    onChange={handleChanges}
                    value={newFriend.name}
                    />
                    <input 
                    name='age'
                    type='text'
                    placeholder='Age'
                    onChange={handleChanges}
                    value={newFriend.age}
                    />
                    <input 
                    name='email'
                    type='text'
                    placeholder='Email'
                    onChange={handleChanges}
                    value={newFriend.email}
                    />
                    <button className='submit btn' type='submit'>Submit</button>
                </form>
            </div>
            {loading ? (<div><h3>Loading Friends</h3><Loader type='MutatingDots' color='green'/></div>) : (
                <div className='friendsContainer'>
                    {friendsList.map((friend, index) => {
                        return (
                            <div key={index} className='friendBox'>
                                <h3>{friend.name}</h3>
                                <p>Age: {friend.age}</p>
                                <p>Email: <a href={`mailto:${friend.email}`}>{friend.email}</a></p>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default FriendsList;