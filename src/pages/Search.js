import React, { useEffect, useState, useCallback } from 'react';
import SearchBar from '../components/ui/SearchBar';
import { fetchProducts  } from '../services/searchProducts';
import { useDebounce } from 'usehooks-ts'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import UpdateProduct from '../components/form/UpdateProductForm';
import ShareForm from '../components/form/ShareForm';
import TranslationForm from '../components/form/TranslationForm';
import ProductList from '../components/ui/ProductList';
import { handleAddDescription } from '../utils/descriptionUtils';
import { shareProduct } from '../services/shareProduct';
import { showToast } from '../utils/toastUtils';
import { translateText } from '../services/translateText';


const Search = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentDescription, setCurrentDescription] = useState(null);
  const [showShareForm, setShowShareForm] = useState(false);
  const [showTranslationForm, setShowTranslationForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedValue = useDebounce(searchTerm, 500)

  const fetchData = useCallback(async () => {
    if (debouncedValue !== ""){
    try {
        const data = await fetchProducts(debouncedValue, currentPage);
        setProducts(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
    } catch (error) {
        console.error(error);
    }
  }
  }, [debouncedValue, currentPage]);

  const handleShare = async (data, e) => {
    const result = await shareProduct(data.productid, data.email, data.sharetime);
    if (result.success) {
      showToast('Product shared', 'success');
      console.log('Product shared:', result.data);
    } else {
      console.error('Failed to share product:', result.error);
    }
    setShowShareForm(false);
    setCurrentProduct(null);
  };

  const handleTranslate = async (data, e) => {
    const result = await translateText(data.descriptionid, data.languages);
    if (result.success) {
      showToast('Translations will be sent to your email!', 'success');
    } else {
      console.error('Failed to translate text:', result.error);
    }
    setShowTranslationForm(false);
    setCurrentDescription(null);
  };

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
      ) : showShareForm ? (
        <ShareForm 
          productId={currentProduct.id}
          onSubmit={handleShare}
        />
      ) : showTranslationForm ? (
        <TranslationForm 
          descriptionId={currentDescription.id}
          onSubmit={handleTranslate}
        />
      ) : (
        <>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ProductList 
            products={products}
            handleAddDescription={handleAddDescription}
            setCurrentProduct={setCurrentProduct}
            setCurrentDescription={setCurrentDescription}
            setShowUpdateForm={setShowUpdateForm}
            setShowShareForm={setShowShareForm}
            setShowTranslationForm={setShowTranslationForm}
            prevPage={prevPage}
            nextPage={nextPage}
            setCurrentPage={setCurrentPage}
            fetchData={fetchData}
        />
        </>
      )}
    </div>
  );
};

export default Search;
