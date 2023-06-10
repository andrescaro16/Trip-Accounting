import { useEffect, useState } from 'react';


function useFetchData(url, method = "GET", data = null){
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method,
                    headers: {
                        "Authorization": `Bearer ${process.env.REACT_APP_STRAPI_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: data ? JSON.stringify(data) : null,
                };
                const res = await fetch(url, options);
                const json = await res.json();
                setResult(json);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(true);
                setLoading(false);
            }
        };

        fetchData();

    }, [ url, method, data ]);

    return {
        result,
        loading,
        error,
    };
}

export { useFetchData };