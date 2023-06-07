import React, { useState, useEffect } from 'react'
import { db } from './../../firebase'
import { push, ref, set, onValue, remove } from 'firebase/database'
import { useContext } from 'react'
import { AuthContext } from './../../context/AuthContext'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import './table.scss'

const AddDataForm = () => {
  const { currentUser } = useContext(AuthContext)

  const [userName, setUserName] = useState(currentUser.displayName)
  const [email, setEmail] = useState(currentUser.email)
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')

  const handleChange = e => {
    e.preventDefault()
  }

  const writeToDatabase = () => {
    if (address === '' || phoneNumber === '') {
      // Display an error message or prevent submission
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
    <div>
      <h1>Table</h1>
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

      <button onClick={writeToDatabase}>Submit</button>

      {error && <p>{error}</p>}
    </div>
  )
}

const BasicTable = () => {
  const [rows, setRows] = useState([])

  const handleDelete = uuid => {
    remove(ref(db, `/${uuid}`))
  }

  useEffect(() => {
    const fetchData = async () => {
      const dataRef = ref(db)
      const snapshot = await onValue(dataRef, snapshot => {
        const data = snapshot.val()
        if (data) {
          const updatedRows = Object.values(data)
          setRows(updatedRows)
        } else {
          setRows([])
        }
      })
    }

    fetchData()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Delete Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.uuid}>
              <TableCell sx={{ width: '50px' }}>{index + 1}.</TableCell>
              <TableCell sx={{ width: '150px' }}>{row.username}</TableCell>
              <TableCell sx={{ width: '150px' }}>{row.email}</TableCell>

              <TableCell sx={{ width: '150px' }}>{row.address}</TableCell>
              <TableCell sx={{ width: '150px' }}>{row.phoneNumber}</TableCell>
              <TableCell sx={{ width: '150px' }}>
                <button
                  onClick={() => handleDelete(row.uuid)}
                  className='deleteButton'
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const TableComponent = () => {
  return (
    <div>
      <BasicTable />
    </div>
  )
}

export default TableComponent
