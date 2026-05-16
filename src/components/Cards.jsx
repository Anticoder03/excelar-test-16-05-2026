import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Cards.css'
import { FaUserCircle } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
const Cards = () => {
  const [data, setData] = useState([])
  const [allData, setAllData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  function getData() {
    return axios.get('https://jsonplaceholder.typicode.com/users')
  }

  useEffect(() => {
    getData()
      .then((res) => {
        setData(res.data)
        setAllData(res.data)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error loading data</h1>



  function avatarStyle(name, id) {
    // deterministic color selection based on id
    const palettes = [
      ['#60a5fa', '#a78bfa'],
      ['#f97316', '#fb7185'],
      ['#34d399', '#06b6d4'],
      ['#f59e0b', '#ef4444'],
      ['#7c3aed', '#06b6d4'],
    ]
    const p = palettes[id % palettes.length]
    return { background: `linear-gradient(135deg, ${p[0]} 0%, ${p[1]} 100%)` }
  }

  function SearchUser(e) {
    const val = e.target.value
    setSearch(val)
    const q = val.trim().toLowerCase()
    if (!q) {
      setData(allData)
      return
    }
    const filtered = allData.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    )
    setData(filtered)
  }

  return (
    <div className="root-dark">
      <div className="cards-wrap">
        <div className="searchbar">
          <div className="search-input">
            <FiSearch className="search-icon" />
            <input
              value={search}
              onChange={SearchUser}
              placeholder="Search by name, username, email..."
            />
          </div>
        </div>

        <div className="cards-container">
          {data.map((u) => (
            <article key={u.id} className="card">
              <div className="avatar" style={avatarStyle(u.name, u.id)}>
                <FaUserCircle className="user-icon" />
              </div>
              <div className="card-body">
                <h4 className="card-title">{u.name}</h4>
                <div className="meta-row">
                  <p className="card-meta">{u.username}</p>
                  <p className="card-meta">{u.email}</p>
                </div>
                <p className="card-subtle">{u.website} · {u.company?.name}</p>
                <div className="card-actions">
                  <a className="btn btn-primary" href={`https://${u.website}`} target="_blank" rel="noreferrer">Visit</a>
                  <a className="btn btn-ghost" href={`mailto:${u.email}`}>Email</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cards
