import React, { useContext } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import TokenContext from '../context/TokenContext'; 
import UpdateProduct from '../components/form/UpdateProductForm';
import ShareForm from '../components/form/ShareForm';
import TranslationForm from '../components/form/TranslationForm';
import ProductList from '../components/ui/ProductList';
import { handleAddDescription } from '../utils/descriptionUtils';
import { useProductOperations } from '../hooks/useProductOperations';

const Products = () => {
    const { isTokenChecked } = useContext(TokenContext);
    const productOps = useProductOperations(1, isTokenChecked);

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
            )}
        </div>
    );
};

export default Products;
