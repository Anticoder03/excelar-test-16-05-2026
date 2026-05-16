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

  function getInitials(name) {
    if (!name) return ''
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  return (
    <>
      <div className="searchbar">
        {/* search input could go here */}
      </div>

      <div className="cards-container">
        {data.map((u) => (
          <article key={u.id} className="card">
            <div className="avatar">{getInitials(u.name)}</div>
            <div className="card-body">
              <h4 className="card-title">{u.name}</h4>
              <div className="meta-row">
                <p className="card-meta">{u.username}</p>
                <p className="card-meta">{u.email}</p>
              </div>
              <p className="card-meta">{u.address?.city} · {u.company?.name}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

export default Cards
