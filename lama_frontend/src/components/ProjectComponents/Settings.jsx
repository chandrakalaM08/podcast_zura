import React, { useState } from 'react'

import axios from "axios"
import Toast from '../Toast';
const Settings = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [apiStatus, setApiStatus] = useState(null)
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log("inside settings loggedin user", loggedInUser._id)
    const email = loggedInUser.email;
    const id = loggedInUser._id
    const token = localStorage.getItem('token');
    const [username, setUsername] = useState(loggedInUser.username || '');

    // Function to handle editing username

    const handleEditAndUpdateUsername = async () => {
        try {
            // Make a request to update the username only when in edit mode

            const response = await axios.patch(
                `${apiUrl}/user/update`,
                { id, newUsername: username },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setApiStatus({ message: 'Username updated successfully', success: true })
            setUsername(response.data.updatedUser.username);
            localStorage.setItem("loggedInUser", JSON.stringify(response.data.updatedUser))
            setTimeout(() => {
                setApiStatus(null);
            }, 1000);
        } catch (error) {
            console.error('Error updating username:', error.message);
            setApiStatus({ message: 'Username updation failed', success: false });
        }
    };



    return (
        <div className='w-screen mt-20 ml-14'>
            <h1 className='text-purple-700 text-4xl font-bold ml-80'>
                Account Settings
            </h1>
            <div className='flex w-9/12 justify-center items-center gap-8 mt-8'>
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=''
                    className='rounded-full h-28 w-28 ml-72' />

                <label> User Name
                    <br />
                    <input onChange={(e) => setUsername(e.target.value)}
                        type='text' value={username} className='border border-gray-400 rounded-sm py-1 w-72' />
                    <button className="bg-purple-700 text-white rounded-md py-1 px-2 ml-2" onClick={() => {
                        handleEditAndUpdateUsername()
                    }}>
                        Save
                    </button>
                </label>
                <label> Email
                    <br />
                    <input type='email' value={email} disabled className='border border-gray-400 bg-gray-100 rounded-sm py-1 w-72' />
                </label>
            </div>

            {/* Subscription */}
            <div className='mt-6 ml-80'>
                <h1 className='text-purple-700 text-4xl font-bold mb-6'>
                    Subscriptions
                </h1>
                <div
                    className='flex w-11/12 bg-purple-800 text-white py-5 px-6 justify-between rounded-md items-center '>
                    <h1 className='font-medium text-lg'>
                        You are currently on the <span className='font-bold'>Ques AI Basic Plan!</span>
                    </h1>
                    <button className='bg-white text-purple-700 font-medium px-4 py-2 rounded-md ml-4'>Upgrade</button>
                </div>
                <h3 className='text-red-600 underline font-medium mt-4'>Cancel Subscription</h3>

            </div>
            {apiStatus && (
                <Toast message={apiStatus.message} success={apiStatus.success} />
            )}
        </div>
    )
}

export default Settings