import React, { useEffect, useState, useContext, useCallback } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import TokenContext from '../context/TokenContext';  // Adjust the path accordingly.
import UpdateProduct from '../components/form/UpdateProductForm';  // Adjust the path if needed
import { fetchProducts } from '../services/fetchProducts';
import ProductList from '../components/ui/ProductList';
import { handleAddDescription } from '../utils/descriptionUtils';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const { isTokenChecked } = useContext(TokenContext);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const fetchData = useCallback(async () => {
    try {
        const data = await fetchProducts(currentPage);
        setProducts(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
    } catch (error) {
        console.error(error);
    }
}, [currentPage]);

  useEffect(() => {
    if (!isTokenChecked) return;
    fetchData();
  }, [currentPage, isTokenChecked, fetchData]);

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
        <ProductList 
            products={products}
            handleAddDescription={handleAddDescription}
            setCurrentProduct={setCurrentProduct}
            setShowUpdateForm={setShowUpdateForm}
            prevPage={prevPage}
            nextPage={nextPage}
            setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Products;