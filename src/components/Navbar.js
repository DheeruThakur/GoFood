import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar(props) {

  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();

  const clickHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic fw-bold" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {
                localStorage.getItem("authToken") ?
                  <li className="nav-item">
                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">MyOrders</Link>
                  </li>
                  : ""
              }
            </ul>
            {
              localStorage.getItem("authToken") ?
                <div>
                  <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                    My Cart {" "}
                    {
                      data.length ? <Badge pill bg='danger'>{data.length}</Badge> : null
                    }

                    {/* {
                      cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : "" //// ye andar likhne pr code kaam kyu nahi kr raha

                    } */}
                  </div>
                  {
                    cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""

                  }
                  <div className="btn bg-white text-danger mx-2" onClick={clickHandler}>
                    Logout
                  </div>
                </div>
                :
                <div className='d-flex'>
                  <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                  <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
