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

  const [userName, setUserName] = useState(currentUser.displayName)
  const [email, setEmail] = useState(currentUser.email)
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleChange = e => {
    // Prevent changing the username and email values
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

    const newTodoRef = push(ref(db)) // Generate a unique key with push()
    const newTodoKey = newTodoRef.key // Get the generated key

    set(ref(db, `/${newTodoKey}`), {
      username: userName,
      email,
      address,
      phoneNumber,
      uuid: newTodoKey
    })

    // Prevent changing the username and email values
    setUserName(currentUser.displayName) // Update the username when the function is called
    setEmail(currentUser.email) // Update the email when the function is called

    // Reset the additional fields
    setAddress('')
    setPhoneNumber('')
  }

  return (
    <div className='table'>
      <Navbar />
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
          type='tel'
          placeholder='Phone Number'
        />

        <button className='submit' onClick={writeToDatabase}>
          Submit
        </button>
        <br />
        <br />
        <BasicTable />
      </div>

      <Footer />
    </div>
  )
}

export default Table
