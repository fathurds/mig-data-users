import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    const loginHandler = () => {
        const body = {
            email,
            password
        }

        setIsLoading(true);

        axios.post('https://mitramas-test.herokuapp.com/auth/login', body)
            .then(data => {
                localStorage.setItem('token', data.data.access_token);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                setMessage('Wrong Email or Password')
            })

        setIsLoading(false);
    }

    return (
        <div className='flex justify-center items-center h-96'>
            <div className="border w-96 rounded-lg p-5">
                <h1 className='text-center text-4xl mb-5'>MIG</h1>
                {message && (
                    <div className='bg-red-300 border-red-500 flex justify-center rounded-md mb-3 py-2'>
                        <h3 className='text-red-800'>{message}</h3>
                    </div>
                )}
                <input type="text" placeholder='E-mail' className='border w-full rounded-md py-1 px-3 mb-5 focus:outline-blue-400' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' className='border w-full rounded-md py-1 px-3 mb-5 focus:outline-blue-400' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='w-full btn-primary' disabled={isLoading} onClick={() => loginHandler()}>Login</button>
            </div>
        </div>
    )
}

export default Login