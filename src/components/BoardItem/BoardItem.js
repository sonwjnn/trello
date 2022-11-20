import React from 'react'
import './BoardItem.scss'
import Task from 'components/Task/Task'
function BoardItem() {
  return (
    <div className="board-item">
      <header>Header</header>
      <ul className="tasks">
        <Task />
        <li className="task">123</li>
        <li className="task">123</li>
        <li className="task">123</li>
        <li className="task">123</li>
      </ul>
      <footer>Footer</footer>
    </div>
  )
}

export default BoardItem
