import React from 'react';
import {NavLink,Link} from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import { useAuth } from '../../context/Auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/CartCon';
import { Badge } from 'antd';

 

const Header = () => {
  const [cart] = useCart();
  const [auth,setAuth]=useAuth();
  const categories = useCategory();
  const handleLogout=()=>{
    setAuth({
      ...auth,user:null,token:""
    });
    localStorage.removeItem('auth');
    toast.success('Logged out Successfully')
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link to="/" className="navbar-brand"><MdOutlineShoppingCart /> Ecommerce App</Link>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchInput />
            <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to={"/"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to={"/categories"}>All Categories</Link></li>
                {categories?.map(c=>(
                  <li><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
                ))}
              </ul>
            </li>
            {
              !auth.user ? (
                <>
                  <li className="nav-item">
                  <NavLink to="/register" className="nav-link">Register</NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li>
                </>
              ):(
                <>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" role="button" to={"/"} data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name}
                    </Link>
                    <ul className="dropdown-menu">
                      <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item" >Dashboard</NavLink></li>
                      <li className="nav-item">
                      <NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )
            }
            <li className="nav-item">
            <Badge count={cart?.length} showZero>
              <NavLink to="/cart" className="nav-link mt-1">Cart</NavLink>
            </Badge>
            </li>
        </ul>
        </div>
    </div>
    </nav>

    </>
  );
}

export default Header