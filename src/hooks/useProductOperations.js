import { useState, useCallback, useEffect } from 'react';
import { fetchProducts } from '../services/fetchProducts';
import { shareProduct } from '../services/shareProduct';
import { showToast } from '../utils/toastUtils';
import { translateText } from '../services/translateText';

export const useProductOperations = (initialPage = 1, isTokenChecked = true, searchTerm = "") => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [currentDescription, setCurrentDescription] = useState(null);
    const [showShareForm, setShowShareForm] = useState(false);
    const [showTranslationForm, setShowTranslationForm] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const data = searchTerm ? await fetchProducts(searchTerm, currentPage) : await fetchProducts(currentPage);
            setProducts(data.results);
            setNextPage(data.next);
            setPrevPage(data.previous);
        } catch (error) {
            console.error(error);
        }
    }, [searchTerm, currentPage]);

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
        if (!isTokenChecked) return;
        fetchData();
    }, [currentPage, isTokenChecked, fetchData]);

    return {
        products,
        currentPage,
        nextPage,
        prevPage,
        showUpdateForm,
        currentProduct,
        currentDescription,
        showShareForm,
        showTranslationForm,
        setCurrentPage,
        setShowUpdateForm,
        setCurrentProduct,
        setCurrentDescription,
        setShowShareForm,
        setShowTranslationForm,
        handleShare,
        handleTranslate
    };
}
