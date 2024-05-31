import { Link } from 'react-router-dom'
import { Row,Col } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import categories from "../categories";
import "./Home.css";

function Home() {
  return (
    <div>
         <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png"/>
       <div className="featured-products-container container mt-4">
          <h2>Last Products</h2>
          {/* products here */}
          <div>
            <Link to='/category/all' style={{textAlign:"right",display:"block",textDecoration:"none"}}>
              See More{">> "}
            </Link>
          </div> 
       </div>
       {/* sales banner */}
       <div className="sale_banner--container mt-4">
          <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png sale"/>
       </div>
       <div className="recent-products-container container mt-4">
         <h2>Categories</h2>
         <Row>
         {categories.map((category) => (
                <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
                  <Col md={4}>
                      <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                            {category.name}
                      </div>
                  </Col>
                </LinkContainer>
            ))}
         </Row>
       </div>
    </div>
  )
}

export default Home
