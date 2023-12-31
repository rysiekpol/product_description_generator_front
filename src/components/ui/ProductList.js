import React from 'react';
import ProductImageSlider from './ProductImageSlider';
import ProductDescription from './ProductDescription';
import Pagination from './Pagination';
import { deleteProduct } from '../../services/deleteProducts';

const ProductList = ({ products, handleAddDescription, setCurrentProduct, setCurrentDescription, setShowUpdateForm, setShowShareForm, setShowTranslationForm, prevPage, nextPage, setCurrentPage, fetchData }) => {
    return (            
        <div className="container mt-5 justify-content-center w-50">
            {products.map((product, index) => (
                <div className="card mb-4 mt-5" key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>

                        <button
                            className="link-primary link-button ml-2"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentProduct(product);
                                setShowShareForm(true);
                                }}>
                            Share
                        </button>

                        <button
                            href="#"
                            className="link-primary link-button"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentProduct(product);
                                setShowUpdateForm(true);
                            }}>
                            &nbsp;Update
                        </button>

                        <button
                            className="link-danger link-button ml-2"
                            onClick={() => {deleteProduct(product.id, fetchData);}}>
                            &nbsp;Delete
                        </button>

                        {/* Image Grid */}
                        <ProductImageSlider images={product.images} />

                        <p className="card-text">
                            <ProductDescription
                                descriptions={product.descriptions}
                                onAddDescription={() => handleAddDescription(product.id)}
                                productId={product.id}  
                                fetchData={fetchData}
                            />
                        </p>

                        {product.descriptions.length > 0 ? (     
                        <button
                            className="link-primary link-button ml-2"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentDescription(product.descriptions[0]);
                                setShowTranslationForm(true);
                            }}>
                            Translate description
                        </button>
                        ) : null
                        }

                    </div>
                </div>
            ))}

            <Pagination
                prevPage={prevPage}
                nextPage={nextPage}
                onPrevious={() => setCurrentPage(prevPage)}
                onNext={() => setCurrentPage(nextPage)}
            />
        </div>
    );
};

export default ProductList;
