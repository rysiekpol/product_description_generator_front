import React, { useEffect, useState, useCallback } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import UpdateProduct from '../components/form/UpdateProductForm';
import ProductList from '../components/ui/ProductList';
import SearchBar from '../components/ui/SearchBar';
import { fetchProducts  } from '../services/searchProducts';
import { handleAddDescription } from '../utils/descriptionUtils';



const Search = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const fetchData = useCallback(async () => {
    try {
        const data = await fetchProducts(searchTerm, currentPage);
        setProducts(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
    } catch (error) {
        console.error(error);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
      fetchData();
  }, [fetchData]);

  return (
    <div>
      {showUpdateForm ? (
        <UpdateProduct
          product={currentProduct} 
          onClose={() => {
            setShowUpdateForm(false);
            setCurrentProduct(null);
          }} 
          refreshProducts={fetchData}
        />
      ) : (
        <>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ProductList 
            products={products}
            handleAddDescription={handleAddDescription}
            setCurrentProduct={setCurrentProduct}
            setShowUpdateForm={setShowUpdateForm}
            prevPage={prevPage}
            nextPage={nextPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Search;
