import axios from 'axios';
import React, { useState } from 'react'

function AddModal({ closeAdd }) {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [job, setJob] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState(null);

    const [showStatus, setShowStatus] = useState(false);

    const handleAdd = () => {
        const body = {
            name,
            address,
            country,
            phone_number: phone,
            job_title: job,
            status
        }
        axios.post('https://mitramas-test.herokuapp.com/customers', body, {
            headers: {
                Authorization: localStorage.getItem('token')
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
                <div className='flex justify-between items-center px-4 mb-5 mt-2'>
                    <div></div>
                    <h1 className='text-center text-xl font-semibold'>Add User</h1>
                    <h1 className='cursor-pointer' onClick={() => closeAdd()}>X</h1>
                </div>
                <input type="text" className='w-full border rounded-md py-1 px-3 focus:outline-blue-500 mb-3' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />

                <input type="text" className='w-full border rounded-md py-1 px-3 focus:outline-blue-500 mb-3' placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} />

                <textarea rows='3' className='w-full border rounded-md py-1 px-3 focus:outline-blue-500 mb-3' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />

                <input type="text" className='w-full border rounded-md py-1 px-3 focus:outline-blue-500 mb-3' placeholder='Job' value={job} onChange={(e) => setJob(e.target.value)} />

                <input type="tel" className='w-full border rounded-md py-1 px-3 focus:outline-blue-500 mb-3' placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} />

                <button className='border bg-white w-full rounded-lg mb-3 py-1 px-3 text-left flex justify-between' onClick={() => setShowStatus(!showStatus)}>
                    <h4 className={status === null ? 'opacity-50' : ''}>{status === null ? 'Status' : status === false ? 'Inactive' : 'Active'}</h4>
                    <h4 className='font-bold'>-</h4>
                </button>
                <div className={`bg-white absolute w-[356px] -mt-5 py-1 ${showStatus ? '' : 'hidden'}`}>
                    <h4 className='cursor-pointer px-3 hover:bg-blue-500 hover:text-white' onClick={() => {
                        setShowStatus(false);
                        setStatus(true);
                    }}>Active</h4>
                    <h4 className='cursor-pointer px-3 hover:bg-blue-500 hover:text-white' onClick={() => {
                        setShowStatus(false);
                        setStatus(false);
                    }}>Inactive</h4>
                </div>

                <button className='w-full bg-blue-500 text-white py-2 rounded-lg hover:opacity-80 disabled:opacity-80' onClick={() => handleAdd()}>Submit</button>
            </div>
        </div>
    )
}

export default AddModal