import React from 'react'
import { Alert, Container, Row, Col, Table } from 'react-bootstrap';
import {useSelector } from 'react-redux';
import "./CartPage.css"
import { useDecreaseCartProductMutation, useIncreaseCartProductMutation, useRemoveFromCartMutation } from '../services/appApi'

function CartPage() {
    const user = useSelector((state)=>state.user)
    const products = useSelector((state)=>state.products)
    const userCartObj = user.cart;
    let cart = products.filter((product)=>userCartObj[product._id] != null)
    const [increaseCart] = useIncreaseCartProductMutation()
    const [decreaseCart] = useDecreaseCartProductMutation()
    const [removeCart,{isLoading}] = useRemoveFromCartMutation()

   function handleDecrease(product){
     const quantity = user.cart.count
     if(quantity == 0)return alert("can't proceed")
     decreaseCart(product)
   }

  return (
    <Container style={{minHeight:'95vh'}} className='cart-container'>
      <Row>
        <Col md={7}>
          <h1 className='pt-2 h3'>Shopping Cart</h1>
          {cart.length == 0 ? (
            <Alert variant='info'>Shopping Cart is empty. add products to your cart</Alert>
            ):(
              <div>Payment here</div>
          )}
       </Col>
       <Col md={5}>
          <Table>
             <thead>
               <tr>
                 <th>&nbsp;</th>
                 <th>Product</th>
                 <th>Price</th>
                 <th>Quantity</th>
                 <th>Subtotal</th>
               </tr>
             </thead>
             <tbody>
              {
                cart.map((item)=>(
                  <tr>
                    <td>&nbsp;</td>
                    <td>
                      {!isLoading && <i className="fa fa-times" style={{ marginRight: 10, cursor: "pointer" }} onClick={()=>removeCart({ productId: item._id, price: item.price, userId: user._id })}></i>}
                      <img src={item.pictures[0].url} style={{width:100,height:100,objectFit:"cover"}}/>
                    </td>
                    <td>${item.price}</td>
                    <td className="quantity-indicator">
                       <i className="fa fa-minus-circle" onClick={()=>handleDecrease({ productId: item._id, price: item.price, userId: user._id })}></i>
                        <span>{user.cart[item._id]}</span>
                       <i className="fa fa-plus-circle" onClick={()=>increaseCart({ productId: item._id, price: item.price, userId: user._id })}></i>
                    </td>
                    <td>${item.price * user.cart[item._id]}</td>
                  </tr>
                ))
              }
             </tbody>
          </Table>
          <div className="h4 pt-4">Total: ${user.cart.total}</div>
       </Col>
      </Row>
    </Container>
  )
}

export default CartPage
