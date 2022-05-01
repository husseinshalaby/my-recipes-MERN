import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../App.css';
import {useLocation} from 'react-router-dom';
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';

function Form() {
    const link = '/api/recipes';
    const [itemName, setItemName] = useState('')
    const [itemIngredients, setItemIngredients] = useState('')
    const [recipe, setRecipe] = useState('')
    const [image, setImage] = useState('')
    const [editItemData, setEditItemData] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const location = useLocation()
    const [progress, setProgress] = useState(0)
    const [imageUploaded, setImageUploaded] = useState(false)
    useEffect(() =>{
        if(location.state){
            editItem(location.state.data)
        }
    }, [])

    useEffect(()=>{
        addItems()
    }, [imageUploaded])
    
    useEffect(() => {
        setItemName('');
        setItemIngredients('');
        setRecipe('');
        setImage('')
      }, [submitted])

    useEffect(() =>{
        if(editItemData){
            setItemName(editItemData.name ? editItemData.name : '')
            setItemIngredients(editItemData.ingredients ? editItemData.ingredients : '')
            setRecipe(editItemData.recipe ? editItemData.recipe : '')
            setImage(editItemData.image ? editItemData.image : '')
        }
    },[editItemData])


    const editItem  = (itemsData) =>{
        setEditItemData(itemsData);
    }

    const uploadFiles = (file) => {
        
        if (!file) return;
        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
          },
          (error) => console.log(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              setImage(downloadURL)
              setImageUploaded(true)
            //   addItems()
            console.log('image', image)
            });
          }
        );
      };
    const handleForm = (e) => {
        console.log('e',e)
        const file = e.target[3].files[0]
        uploadFiles(file);
        e.preventDefault();
    }
    async function addItems() {
        // console.log('e',e)
        // const file = e.target[3].files[0]
        // uploadFiles(file);
        // e.preventDefault();
        let formData = new FormData()
        formData.append('image', image)
        formData.append('name', itemName)
        formData.append('ingredients', itemIngredients)
        formData.append('recipe', recipe)
        setProgress(0)
        try {   
            if(!editItemData){
                setSubmitted(true)
                await axios.post(link, formData)
            }else{
                setSubmitted(true)
                await axios.patch(`/api/recipes/${editItemData._id}`, formData)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const insertItems = () =>{
        return <div className="Texteditor">
            <form 
            onSubmit={handleForm}
            >
                <div className="input-control">
                <label htmlFor="name" >
                    Title
                </label>
                    <input type="text" id="name" 
                        placeholder="Enter Name..."
                        className= 'input-text' 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)}
                        />
                </div>
                <div className="input-control">
                <label htmlFor="comment" >
                    Ingredients
                </label>
                    <textarea name="" id="comment" cols="20" rows="5" 
                        placeholder="Enter Ingredients..." 
                        className= 'input-text-area' 
                        value={itemIngredients}
                        onChange={(e) => setItemIngredients(e.target.value)}
                        ></textarea>
                </div>
                <div className="input-control">
                <label htmlFor="recipe" >
                    Recipe
                </label>
                    <textarea name="" id="recipe" cols="10" rows="5" 
                        placeholder="Enter Recipe..." 
                        className= 'input-text-area' 
                        value={recipe}
                        onChange={(e) => setRecipe(e.target.value)}
                        ></textarea>
                </div>
                <div className="input-control">
                <label htmlFor="image" className="custom-file-upload">
                    Image
                </label>
                    <input type="file" id="image" 
                        placeholder="Enter image..." 
                        className= 'image-input'
                        // onChange={(e) => setImage(e.target.files[0])}
                        />
                    <span>Uploading {progress}%</span>

                </div>
                <button  className="submit-btn">Add Item</button>
            </form>
        </div>
    }
    return (
        <>
            <FormStyled>
                <div className="content-container">
                    {insertItems()}                
                </div>
            </FormStyled>
        </>
    )
}


const FormStyled = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .Texteditor{
        width: 100%;
        padding-top: 4rem;
        form{
            padding-bottom: 5rem;
            .submit-btn{
                padding: .5rem 1.5rem;
                outline: none;
                cursor: pointer;
                background-color: #6BBE92;
                border: none;
                border-radius: 34px;
                color: white;
                filter: drop-shadow(0px 4px 28px rgba(0, 0, 0, 0.25));
            }
        }
    }
`;

export default Form;
