import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import {Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useCreateProductMutation } from '../services/appApi'
import "./NewProduct.css"
import axios from '../axios'

function NewProduct() {
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("")
  const [images,setImages] = useState([])
  const [imgToRemove,setImgToRemove] = useState(null)
  const navigate = useNavigate()
  const [createProduct,{error,isLoading,isError,isSuccess}] = useCreateProductMutation()
  
  function handleRemoveImg(imgObj){
    setImgToRemove(imgObj.public_id)
    axios.delete(`/images/${imgObj.public_id}/`)
    .then((res)=>{
      setImgToRemove(null)
      setImages((prev)=>prev.filter((img)=>img.public_id !== imgObj.public_id))
    })
    .catch((e)=>console.log(e))
  }

  function handleSubmit(e){
    e.preventDefault()
    if(!name || !description || !price || !category || !images.length){
      return alert("Please fill out all the fields")
    }
    createProduct({name, description, price, category, images})
    .then(({data})=>{
      if(data.length > 0){
        setTimeout(()=>{
         navigate("/")
        },1500)
      }
    })
  }

  function showWidget(){
    let widget = window.cloudinary.createUploadWidget(
        {
            cloudName:"dmecowooi",
            uploadPreset:"x2e4ixxa"
        },
        (error, result) => {
          if (!error && result.event === "success") {
              console.log(result.info.url); 
              setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
          }
      }
    )
    widget.open()
  }
  return (
    <Container>
      <Row>
        <Col md={6} className='new-product__form--container'>
        <Form style={{width:"100%"}} onSubmit={handleSubmit}>
              <h1 className='mt-4'>Create a Product</h1>
              {isSuccess && <Alert variant='success'>Product created with success</Alert>}
              {isError && <Alert variant='danger'>{error.data}</Alert>}
              <Form.Group className='mb-3'>
                <Form.Label>Product name</Form.Label>
                <Form.Control type='text' placeholder='enter product name' value={name} onChange={(e)=>setName(e.target.value)} required/>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Product description</Form.Label>
                <Form.Control as='textarea' placeholder='Product description' value={description} onChange={(e)=>setDescription(e.target.value)} required/>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Price</Form.Label>
                <Form.Control type='number' placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} required/>
              </Form.Group>

              <Form.Group className='mb-3' onChange={(e)=>setCategory(e.target.value)}>
                <Form.Label>Category</Form.Label>
                 <Form.Select>
                    <option disabled selected>
                       -- Select one --
                    </option>
                    <option value="technology">
                       technology
                    </option>
                    <option value="tablets">
                       tablets
                    </option>
                    <option value="phones">
                       phones
                    </option>
                    <option value="laptops">
                       laptops
                    </option>
                 </Form.Select>
              </Form.Group>

              <Form.Group>
                <Button type='button' onClick={showWidget}>Upload Image</Button>
                <div className='images-preview-container'>
                  {
                    images.map((image)=>(
                        <div className='image-preview'>
                          <img src={image.url}/>
                        { imgToRemove != image.public_id && <i className="fa fa-times-circle" onClick={()=>handleRemoveImg(image)}></i>}
                        </div>
                    ))
                  }
                </div>
              </Form.Group>

              <Form.Group>
                <Button type='submit' disabled={isLoading || isSuccess}>
                  Create Product
                </Button>
              </Form.Group>
            </Form>
        </Col>
        <Col md={6} className='new-product__image--container'></Col>
      </Row>
    </Container>
  )
}

export default NewProduct
