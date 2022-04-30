import '../App.css';
import { useState } from 'react';
import React, { useEffect, } from 'react'
import Item from './Item';
import axios from 'axios';

const List = ({list, getList}) => {

  // const [items, setItems] = useState([]);
  const link = 'http://localhost:5000/api/recipes';
  const [items, setItems] = useState([]);

  async function getList(){
    try {
      const data = await axios.get(link);
      setItems(data.data.crud)
      console.log('data', data)
    } catch (error) {
      console.log('error', error)
    }

  }
  useEffect(() =>{
    getList();
}, [])
  // useEffect(() =>{
  //   setItems(list)
  //   console.log('list', list)
  // }, [])

  const renderItem = () => {
    console.log('items', items)

    return items.map((item, i) =>{
      return (
        <Item key={i} item={item} getList={getList} update={false}/>
      )
    })
  }

  return (
    <div className='list'>
      {renderItem()}
    </div>
  )
}

export default List