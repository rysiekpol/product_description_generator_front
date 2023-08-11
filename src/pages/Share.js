import React, { useState, useEffect } from 'react';

const ShareScreen = () => {
    const [shares, setShares] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost/my-shares/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setShares(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>My Shares</h1>
            <ul>
                {shares.map((share, index) => (
                    <li key={index}>{share.name}</li> // Assuming each share object has a name property
                ))}
            </ul>
        </div>
    );
}

export default ShareScreen;
