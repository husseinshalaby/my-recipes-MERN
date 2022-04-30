import Home from './Components/Home';
import Header from './Components/Header';
import Form from './Components/Form';
import { BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom';
import List from './Components/List';
import Recipe from './Components/Recipe';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
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

  return (

     <Router>
          <Header />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form items ={items} getList= {getList}/>} />
          <Route path="/list" element={<List list={items} getList = {getList} />} />
          <Route
              path="*"
              element={<Navigate to="/" replace />}
          />
          <Route path="/list/:id" element={<Recipe items ={items} getList= {getList}/>} />
          </Routes>
      
      </Router> 
  );
}

export default App;
