import React,{useState,useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import {Checkbox,Radio} from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartCon';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [cart,setCart] = useCart();
  const [products,setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([]);
  const [total,setTotal] =useState(0);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(false);

  const navigate=useNavigate();


  //get all categories
  const getAllCategory = async()=>{
    try {
        const {data} = await axios.get('http://localhost:8080/api/v1/category/get-category');
        if(data?.success){
            setCategories(data?.category);
        }
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
      getAllCategory();
      getTotal();
  },[]);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

    // getTotal count
    const getTotal = async() => {
      try {
        const {data} = await axios.get('http://localhost:8080/api/v1/product/product-count');
        setTotal(data?.total);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      if(page === 1) return;
      loadMore();
      // eslint-disable-next-line
    },[page]);

    const loadMore = async() => {
      try {
        setLoading(true);
        const {data} = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
        setLoading(false);
        setProducts([...products, ...data.products]);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

  // filter by cat
  const handleFilter = (value,id) => {
    let all = [...checked];
    if(value){
      all.push(id);
    }else{
      all=all.filter((c)=> c!== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if(!checked.length || !radio.length) getAllProducts();
     // eslint-disable-next-line
  },[checked.length,radio.length]);

  useEffect(()=>{
    if(checked.length || radio.length) filterProduct();
     // eslint-disable-next-line
  },[checked,radio]);

  //get filtered product
  const filterProduct = async() => {
    try {
      const {data} = await axios.post('http://localhost:8080/api/v1/product/product-filter',{checked,radio});
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products -Best Offers"}>
        <div className="row mt-3">
          <div className="col-md-2 mx-2">
            <h4 className='text-center h5'>Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map(c => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked,c._id)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}
            <h4 className='text-center h5 mt-3'>Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={e => setRadio(e.target.value)}>
                {Prices?.map(p => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button className='btn btn-danger mt-3' onClick={() => window.location.reload()}>RESET FILTERS</button>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className='text-center'>All Products</h1>
            <div className="d-flex flex-wrap">
            {products?.map(p=>(
                      <div className="card m-2" style={{width: '17rem',height:'23rem'}} >
                        <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top h-50" alt={p.name} />
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">{p.description.substring(0,30)}</p>
                          <p className="card-text">$ {p.price}</p>
                          <button class="btn btn-primary ms-1" style={{width: '7rem',height:'2rem',fontSize:'14px'}} onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                          <button class="btn btn-secondary ms-1" style={{width: '7rem',height:'2rem',fontSize:'14px'}} onClick={() => {setCart([...cart,p]);
                          localStorage.setItem('cart',JSON.stringify([...cart,p]));
                          toast.success('Item Added to Cart')}}>ADD TO CART</button>
                        </div>
                      </div>
                ))}
            </div>
            <div className='m-2 p-3'>
            {products && products.length < total && (<button className='btn btn-warning' onClick={(e) => {e.preventDefault();setPage(page+1);}}>{loading ? "Loading..." : "Loadmore"}</button>)}
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default HomePage