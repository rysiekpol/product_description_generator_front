export const translateText = async (descriptionId, languages) => {
    try {
        const response = await fetch(`http://localhost/translate/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description_id: descriptionId, languages: languages }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return { success: true };
    } catch (error) {
        console.error('There was a problem with the translation operation:', error.message);
        return { success: false, error: error.message };
    }
};
