import React from 'react'
import { useState } from 'react'

const AddTodo() = (props) => {
  const [item, setItem]  = useState("")
  
  const handleChange =  (e) =>{
    setItem(e.target.value)
  }
  
  const handleChange =  (e) => {
    e.preventDefault()
    props.item
  }
  
  return (
    <form method= 'post' onSubmit=(handleSubmit)>
      <input type= "text" name="text" value = {item} onChange= {handleChange} placeholder= "Enter your task"/>
      <button type = 'submit'> Add </button>
    </form>
    )
  }
export fault  AddTodo
