import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import edit from '../images/Edit.png'
import delet from '../images/Delete.png'
import AddModal from '../components/AddModal';
import DeleteModal from '../components/DeleteModal';
import EditModal from '../components/EditModal';

function Home() {
  const [user, setUser] = useState([]);
  const [singleUser, setSingleUser] = useState(null);

  const navigate = useNavigate();

  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    axios.get('https://mitramas-test.herokuapp.com/customers', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(data => {
        setUser(data.data.data);
      })
      .catch(() => {
        navigate('/login')
      })
  }, [navigate]);

  if (user.length === 0) {
    return (
      <h1>Now Loading</h1>
    )
  }

  const closeAdd = () => {
    setShowAdd(false);
    setShowDelete(false);
    setShowEdit(false);
    setSingleUser(null);
    axios.get('https://mitramas-test.herokuapp.com/customers', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(data => {
        setUser(data.data.data);
      })
  }

  const handleSearch = (input) => {
    if (input.length === 0) {
      setFilterData([]);
    } else {
      const filter = user.filter(el => {
        if (el.name.toLowerCase().indexOf(input.toLowerCase()) > -1) {
          return true;
        } else {
          return false;
        }
      });

      setFilterData(filter);
    }
  }

  const dataPosts = () => {
    if (filterData.length > 0) {
      return filterData;
    } else {
      return user;
    }
  }

  return (
    <div>
      <div className='container mx-auto'>
        <h1 className='text-end cursor-pointer' onClick={() => {
          localStorage.clear();
          navigate('/login')
        }}>Logout</h1>
        <div className='flex justify-between items-center my-4'>
          <h1 className='font-bold text-4xl text-slate-700'>Data Users</h1>
          <div>
            <input type="text" placeholder='Search...' className='border mr-5 rounded-md py-1 px-4' onChange={(e) => handleSearch(e.target.value)} />
            <button className='btn-primary py-2 px-5' onClick={() => setShowAdd(true)}>Add User</button>
          </div>
        </div>
        <table className='table-auto border-collapse border border-slate-400'>
          <thead>
            <tr>
              <th className='border border-slate-300 py-3 px-6'>Name</th>
              <th className='border border-slate-300 py-3 px-6'>Country</th>
              <th className='border border-slate-300 py-3 px-6'>Address</th>
              <th className='border border-slate-300 py-3 px-6'>Job</th>
              <th className='border border-slate-300 py-3 px-6'>Phone Number</th>
              <th className='border border-slate-300 py-3 px-6'>Status</th>
              <th className='border border-slate-300 py-3 px-6'>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataPosts().sort((a,b) => a.name.localeCompare(b.name)).map((el, i) => (
              <tr key={i}>
                <td className='border border-slate-300 py-3 px-6'>{el.name}</td>
                <td className='border border-slate-300 py-3 px-6'>{el.country}</td>
                <td className='border border-slate-300 py-3 px-6'>{el.address}</td>
                <td className='border border-slate-300 py-3 px-6'>{el.job_title}</td>
                <td className='border border-slate-300 py-3 px-6'>{el.phone_number}</td>
                <td className='border border-slate-300 py-3 px-6'>{el.status ? 'Active' : 'Inactive'}</td>
                <td className='border border-slate-300 py-3 px-6'>
                  <div className='flex items-center gap-2'>
                    <img src={edit} alt="Edit" className='cursor-pointer' onClick={() => {
                      setShowEdit(true);
                      setSingleUser(el);
                    }} />
                    <img src={delet} alt="Delete" className='cursor-pointer' onClick={() => {
                      setShowDelete(true);
                      setSingleUser(el);
                    }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      {showAdd && <AddModal closeAdd={closeAdd} />}
      {showDelete && <DeleteModal closeAdd={closeAdd} singleUser={singleUser} />}
      {showEdit && <EditModal closeAdd={closeAdd} singleUser={singleUser} />}
    </div>
  )
}

export default Home