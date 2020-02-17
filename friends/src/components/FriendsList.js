import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const FriendsList = props => {

    const [friendsList, setFriendsList] = useState([]);
    
    useEffect(() => {
        axiosWithAuth()
            .get('/friends')
            .then(res => {
                console.log(res);
                setFriendsList(res.data)
            })
            .catch(err => {
                console.log('Error Fetching Friends: ', err);
            });
    }, [])


    return (
        <>
            <h2>Friends List</h2>
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
        </>
    )
}

export default FriendsList;