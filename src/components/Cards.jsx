import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Cards.css'
const Cards = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  function getData() {
    return axios.get('https://jsonplaceholder.typicode.com/users')
  }

  useEffect(() => {
    getData()
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error loading data</h1>

  return (


    <>
        <div className="searchbar">
            {/* <input type="text" placeholder="Search..." onChange={SearchUser} /> */}
        </div>

        <div className='containerStyle'>
      {data.map((u) => (
        <div key={u.id} className='cardStyle'>
          <h3>{u.name}</h3>
          <p><strong>Username:</strong> {u.username}</p>
          <p><strong>Email:</strong> {u.email}</p>
          <p><strong>Website:</strong> {u.website}</p>
          <p><strong>Company:</strong> {u.company?.name}</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default Cards
