import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import document from '../img/document.svg';
import deleteIcon from '../img/delete.svg';
import edit from '../img/edit.svg';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Navigate, useNavigate} from 'react-router-dom';
import '../App.css'

function Recipe({items}) {
  const link = '/api/recipes';
  const[item, setItem] = useState({})
  const [toHome, setToHome] = useState(false)
  let {id} = useParams();

useEffect(() =>{
    items.some(element => {
        if (element._id === id) {
          setItem(element)
        }
      });
}, [items])

const deleteItem = async () =>{
    try {
        await axios.delete(`/api/recipes/${item._id}`)
        console.log('deleted')
        setToHome(true)
    } catch (error) {
        console.log('error', error)
    }
    
}
const navigate = useNavigate()
const handleEditItem = (item) => {
    navigate('/form',{
        state: {
            data: item 
        }
    })
}
    if (toHome === true) {
        return <Navigate to='/'/>
    }
    // const renderImage =() => {
    //     if(!item.image) return null
    //     if (item.image){
    //         const Image = require(`../img/${item.image}`) 
    //         return (
    //             <img src={Image} className='image'/> 
    //         )
    //     }
    // }
    return (

        <RecipeStyled>
            <div className="icon-document">
                <img src={document} alt="" />
            </div>
            <div className="text-con">
                <div className="left-text">
                    <h3>Title</h3>
                    <p>{item.name}</p>
                </div>
                <div className="right-text">
                    <h3>Ingredients</h3>
                    <p>{item.ingredients}</p>
                </div>
                <div className="left-text">
                        <h3>Recipe</h3>
                        <p>{item.recipe}</p>
                    </div>
                    {/* <div className="right-text">
                        <h3>Image</h3>
                        {renderImage()}
                </div> */}
            </div>
            <div className="edit" onClick={() => handleEditItem(item)}>
                <img src={edit} alt="" />
            </div>
            <div className="delete" onClick={()=>deleteItem(item)}>
                <img src={deleteIcon} alt="" />
            </div>
        </RecipeStyled>
    )
}

const RecipeStyled = styled.div`
    // background-color: #4F6877;
    padding: 1rem;
    // margin: .8rem 0;
    // width: 100%;
    background-color: #fff;
    margin: 0.8rem auto;
    width: 95%;
    border-radius: 30px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    color: white;
    &:last-child{
        margin-bottom: 1rem;
    }
    h3{
        color: #6BBE92;
    }
    .icon-document, .edit, .delete{
        background-color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        img{
            cursor: pointer;
        }
    }
    .text-con{
        flex: 3;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding: 0 3rem;
        .right-text{
            flex: 2;
        }
        .left-text{
            padding-right: 4rem;
        }
    }
    .edit{
        margin-right: 1rem;
    }
`;

export default Recipe;
