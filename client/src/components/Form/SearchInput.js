import React from 'react';
import { useSearch } from '../../context/SearchCon';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [values,setValues] =useSearch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const {data} = await axios.get(`http://localhost:8080/api/v1/product/search/${values.keyword}`);
            setValues({...values,results: data});
            navigate('/search');
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <div>
        <form className="d-flex mx-4 mt-1" role="search" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e) => setValues({...values, keyword: e.target.value})} />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    </div>
  )
}

export default SearchInput