import React from 'react'
import './App.scss'
import AppBar from 'components/AppBar/AppBar'
import Board from 'components/Board/Board'
function App() {
  return (
    <div className='Trello'>
      <AppBar />
      <Board />
    </div>
  )
}

export default App
