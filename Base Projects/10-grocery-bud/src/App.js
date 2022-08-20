import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  return []
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'danger', 'please enter value')
    } else if (name && isEditing) {
      showAlert(true, 'success', 'Edited item')
      setList(
        list.map((item) => {
          if (item.id === editId) return { ...item, title: name }
          return item
        })
      )
      setName('')
      setEditId(null)
      setIsEditing(false)
    } else {
      showAlert(true, 'success', 'item added to the list')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show: show, msg: msg, type: type })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  const editItem = (id) => {
    const item = list.find((i) => i.id === id)
    setEditId(item.id)
    setName(item.title)
    setIsEditing(true)
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    const newItems = list.filter((i) => i.id !== id)
    setList(newItems)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  })

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} editItem={editItem} removeItem={removeItem} />
          <button className='clear-btn' onClick={clearList}>
            Clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
