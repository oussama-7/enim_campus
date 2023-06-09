import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import './shop.css';


export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };
  return (
    <Form className="d-flex flex-column flex-md-row align-items-md-center search-container" onSubmit={submitHandler}>
  <div className='search-container'>
    <FormControl className='overflow'
      type="text"
      name="q"
      id="q"
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Recherche"
      aria-label="Recherche"
      aria-describedby="button-search"
    />
    
  </div>
  <div>
  <Button
    style={{
      border: 'none',
      backgroundColor: 'transparent',
      padding: 0,
      cursor: 'pointer',
      outline: 'none',
      marginLeft : '10px'
    }}
    variant="outline-primary"
    type="submit"
    id="button-search"
  >
    <i className="fas fa-search"></i>
  </Button>
  </div>

 
</Form>

  );
}
