import { useState, useEffect } from 'react';

const Fetchdata = (url) => {
    const [blogs, setBlogs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isErr, setIsErr] = useState(false);

    useEffect(() => {
        const cleanup = new AbortController();
        const fetchData = async () => {
            try {
                const res = await fetch(url, { signal: cleanup.signal });
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await res.json();
                setIsLoading(false);
                setBlogs(data);
                setIsErr(false);
            } catch (err) {
                if(err.name === 'AbortError') {
                    return;
                }
                setIsLoading(false);
                setIsErr(true);
                console.log(err.message);
            }
        };
        fetchData();
        return () => cleanup.abort();
    }, [url]);

    return { blogs, isLoading, isErr };
};

export default Fetchdata;
