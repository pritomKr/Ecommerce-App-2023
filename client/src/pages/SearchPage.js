import React from 'react';
import { useSearch } from '../context/SearchCon';
import Layout from './../components/Layout/Layout';


const SearchPage = () => {
    // eslint-disable-next-line
    const [values,setValues] = useSearch();
  return (
    <Layout>
        <div className="container">
            <div className="text-center">
                <h1>Search Results</h1>
                <h6>{values?.results.length <1 ? 'No Product Found' : `Found ${values.results.length}` }</h6>
                <div className="d-flex flex-wrap mt-4">
                    {values?.results.map(p=>(
                        <div className="card m-2" style={{width: '18rem',height:'25rem'}} key={p._id} >
                            <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top h-50" alt={p.name} />
                            <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0,30)}</p>
                            <p className="card-text">$ {p.price}</p>
                            <button class="btn btn-primary ms-1">More Details</button>
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

export default SearchPage