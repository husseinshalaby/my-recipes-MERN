import React, {useEffect} from 'react';
import styled from 'styled-components';
import document from '../img/document.svg';
import deleteIcon from '../img/delete.svg';
import edit from '../img/edit.svg';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Card,Button } from 'react-bootstrap';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Item({item, getList, editItem, update}) {
    const Image = require(`../img/${item.image ? item.image: '2.png'}`) 
    useEffect(()=>{
        Aos.init({ duration: 1000});
      },[])
    const deleteItem = async () =>{
        try {
            await axios.delete(`http://localhost:5000/api/recipes/${item._id}`)
            getList();
        } catch (error) {
            console.log(error)
        }
      
    }
    const renderUpdateButton = () => {
        if (update === false  ) return null
        return (
            <div className="edit" onClick={() => editItem(item)}>
                <img src={edit} alt="" />
            </div>
        )
    }
    // if (item.image){
        return (
        //     <div>
        //     <Card className = 'card'>
        //       <Link className = "itemName"to={`/list/${item._id}`}><div id='card-img'><Card.Img variant="top" src={Image} /></div></Link>
        //       <Card.Body>
        //         <Link className = "itemName" to={`/list/${item._id}`}><Card.Title>{item.name}</Card.Title></Link>
        //         <Card.Text>
        //           {item.ingredients}
        //         </Card.Text>
        //         <br/>
        //       </Card.Body>
        //     </Card>
        //   </div>
            <ItemStyled  data-aos ='fade-up'>
                <Link className = "itemName" to={`/list/${item._id}`}>
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
                        <div className="right-text">
                            <h3>Image</h3>
                            <img src={Image ? Image: deleteIcon} className='image'/> 
                        </div>
                    </div>
                </Link>
                { renderUpdateButton()}
                <div className="delete" onClick={deleteItem}>
                    <img src={deleteIcon} alt="" />
                </div>
            </ItemStyled>
        )
    // }
 
}

const ItemStyled = styled.div`
    background-color: #fefefe;
    
    padding: 1rem;
    margin: .8rem .1rem;
    width: 33%;
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

export default Item;