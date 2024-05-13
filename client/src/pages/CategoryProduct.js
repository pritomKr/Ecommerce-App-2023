import React,{useState,useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryProduct = () => {
    const navigate = useNavigate();
    const params= useParams();
    const [products,setProducts] = useState([]);
    const [category,setCategory] = useState([]);

    useEffect(() => {
        if(params?.slug) getProductByCat();
        // eslint-disable-next-line
    },[params?.slug]);

    const getProductByCat = async() => {
        try {
            const {data} = await axios.get(`http://localhost:8080/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Layout>
        <div className="container">
            <h4 className='text-center'>Category - {category?.name}</h4>
            <h6 className='text-center'>{products?.length} result found</h6>
            <div className="row">
                <div className="d-flex flex-wrap">
                {products?.map(p=>(
                        <div className="card m-2" style={{width: '18rem',height:'25rem'}} >
                            <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top h-50" alt={p.name} />
                            <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0,30)}</p>
                            <p className="card-text">$ {p.price}</p>
                            <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                            <button class="btn btn-secondary ms-1">ADD TO CART</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct