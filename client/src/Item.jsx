import React from 'react'

const Item = (props) => {
  return (
    <div className= 'todo-item'>
      <input type = "checkbox" textDecoration: 'line-through' onChange={() =>  props.completed(props.id)}/>
      <p className = 'ml-1'> {props.item}</p>
</div>

export default Item;
