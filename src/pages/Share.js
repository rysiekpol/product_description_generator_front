import React, { useState, useEffect } from 'react';
import { myShares } from '../services/mySharesService';
import ProductShareList from '../components/ui/ProductShareList';

const ShareScreen = () => {
    const [shares, setShares] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function getShares(){
            const result = await myShares();
            if (result.success) {
                setShares(result.data.results);
                setNextPage(result.data.next);
                setPrevPage(result.data.previous);
                setLoading(false);
            }else{
                setError(result.error);
                setLoading(false);
            }
        }
        getShares();
    }, [currentPage]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <ProductShareList 
                products={shares}
                prevPage={prevPage}
                nextPage={nextPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default ShareScreen;
