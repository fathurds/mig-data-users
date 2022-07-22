import axios from 'axios'
import React from 'react'

function DeleteModal({ closeAdd, singleUser }) {
    const handleDelete = () => {
        axios.delete('https://mitramas-test.herokuapp.com/customers', {
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: {
                id: singleUser.id
            }
        })
            .then(data => {
                closeAdd();
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className='absolute bg-black bg-opacity-50 flex justify-center items-center inset-0'>
            <div className='bg-slate-200 py-2 px-3 rounded-lg shadow-xl w-[380px]'>
                <h1 className='text-center text-xl font-semibold mb-4'>Delete User</h1>
                <h1 className='text-3xl text-center'>Are you sure?</h1>
                <h3 className='text-lg text-center mb-3'>You won't be able to revert this!</h3>
                <div className='flex justify-center gap-3 mb-3'>
                    <button className='bg-red-500 text-white py-2 px-3 rounded-lg hover:opacity-80' onClick={() => handleDelete()}>Yes, delete it</button>
                    <button className='bg-blue-500 text-white py-2 px-3 rounded-lg hover:opacity-80' onClick={() => closeAdd()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal