import React from 'react';
import ProductImageSlider from './ProductImageSlider';
import ProductDescription from './ProductDescription';
import Pagination from './Pagination';
import { deleteProduct } from '../../services/deleteProducts';

const ProductList = ({ products, prevPage, nextPage, setCurrentPage }) => {
    return (            
        <div className="container mt-5 justify-content-center w-50">
            {products.map((product, index) => (
                <div className="card mb-4 mt-5" key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        {/* Image Grid */}
                        <ProductImageSlider images={product.images} />

                        <p className="card-text">
                        <div>
                            {product.descriptions.map((desc, i) => (
                            <span key={i}>{desc.description}</span>
                            ))}
                        </div>
                        </p>
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
