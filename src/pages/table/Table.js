import React, { useState } from 'react'
import { db } from './../../firebase'
import { push, ref, set } from 'firebase/database'
import { useContext } from 'react'
import { AuthContext } from './../../context/AuthContext'
import BasicTable from './BasicTable'
import './table.scss'
import Navbar from './../../components/navbar/Navbar'
import Footer from './../../components/footer/Footer'

const Table = () => {
  const { currentUser } = useContext(AuthContext)

  // Define state variables for input fields
  const [userName, setUserName] = useState(currentUser.displayName)
  const [email, setEmail] = useState(currentUser.email)
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleChange = e => {
    e.preventDefault()
    // Handle input field changes here if needed
  }

  console.log(userName)
  console.log(email)
  console.log(address)
  console.log(phoneNumber)

  const writeToDatabase = () => {
    if (address === '' || phoneNumber === '') {
      window.alert('Please fill all the fields')
      return
    }

    // Push new data to the Firebase Realtime Database
    const newTodoRef = push(ref(db))
    const newTodoKey = newTodoRef.key

    set(ref(db, `/${newTodoKey}`), {
      username: userName,
      email,
      address,
      phoneNumber,
      uuid: newTodoKey
    })

    // Reset the input fields after writing to the database
    setUserName(currentUser.displayName)
    setEmail(currentUser.email)
    setAddress('')
    setPhoneNumber('')
  }

  return (
    <div>
      <Navbar />
      <div className='table'>
        <div className='fullSize'>
          <h1>Contact Table</h1>

          <input
            onChange={handleChange}
            value={userName}
            type='text'
            placeholder='Username'
            disabled
          />

          <input
            onChange={handleChange}
            value={email}
            type='email'
            placeholder='Email'
            disabled
          />

          <input
            onChange={e => setAddress(e.target.value)}
            value={address}
            type='text'
            placeholder='Address'
          />

          <input
            onChange={e => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            type='number'
            placeholder='Phone Number'
          />

          <button className='submit' onClick={writeToDatabase}>
            Submit
          </button>
          <br />
          <br />

          {/* Render the BasicTable component */}
          <BasicTable />
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Table
