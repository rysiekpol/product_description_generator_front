import React, { useState } from 'react';
import SearchBar from '../components/ui/SearchBar';
import { useDebounce } from 'usehooks-ts';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import UpdateProduct from '../components/form/UpdateProductForm';
import ShareForm from '../components/form/ShareForm';
import TranslationForm from '../components/form/TranslationForm';
import ProductList from '../components/ui/ProductList';
import { handleAddDescription } from '../utils/descriptionUtils';
import { useProductOperations } from '../hooks/useProductOperations';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedValue = useDebounce(searchTerm, 500);

    const productOps = useProductOperations(1, true, debouncedValue);

    return (
        <div>
            {productOps.showUpdateForm ? (
                <UpdateProduct
                    product={productOps.currentProduct}
                    onClose={() => {
                        productOps.setShowUpdateForm(false);
                        productOps.setCurrentProduct(null);
                    }}
                    refreshProducts={productOps.fetchData}
                />
            ) : productOps.showShareForm ? (
                <ShareForm 
                    productId={productOps.currentProduct.id}
                    onSubmit={productOps.handleShare}
                />
            ) : productOps.showTranslationForm ? (
                <TranslationForm 
                    descriptionId={productOps.currentDescription.id}
                    onSubmit={productOps.handleTranslate}
                />
            ) : (
                <>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <ProductList 
                        products={productOps.products}
                        handleAddDescription={handleAddDescription}
                        setCurrentProduct={productOps.setCurrentProduct}
                        setCurrentDescription={productOps.setCurrentDescription}
                        setShowUpdateForm={productOps.setShowUpdateForm}
                        setShowShareForm={productOps.setShowShareForm}
                        setShowTranslationForm={productOps.setShowTranslationForm}
                        prevPage={productOps.prevPage}
                        nextPage={productOps.nextPage}
                        setCurrentPage={productOps.setCurrentPage}
                        fetchData={productOps.fetchData}
                    />
                </>
            )}
        </div>
    );
};

export default Search;
