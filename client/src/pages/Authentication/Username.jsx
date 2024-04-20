import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from './assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../../helper/validate'
import { useAuthStore } from '../../store/store'


import styles from '../../styles/Username.module.css';

export default function Username() {
  const [role,setRole]=useState(0);




  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      username : ''
    },
    validate : usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/password')
    }
  })

  const handleRoleChange = e => {
    setRole(e.target.value); // Convert value to integer
    console.log(role);
  };



  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>


          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello Again!</h4>


            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                  <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">

                  <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />

                  <input
                className={styles.textbox}
                type="number"
                placeholder='Role'
                value={role}
                onChange={handleRoleChange}
              />

                  <button className={styles.btn} type='submit'>Let's Go</button>
              </div>
              
              <div className="textbox flex flex-col items-center gap-6 my-3">
                <div id='signInDiv'></div>

         

              </div>

           

              <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  
  )
}
