import React from 'react'

const Item = () => {
  return (
    <div className= 'todo-item'>
      <input type = "checkbox" text-decoration-line: 'line-through' onChange={() =>  props.completed(props.id)}/>
      <p className = 'ml-1'> {props.item}</p>
</div>

export default Item;
