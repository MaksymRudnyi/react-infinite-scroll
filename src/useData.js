import React, { useState, useEffect } from "react";
import axios from 'axios';

const LIMIT = 20;

export const useData = () => {
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [offset, setOffset] = useState(0)

    const fetchMoreData = () => {
        setIsLoading(true);
        setIsError(false);

        axios
            .get(`https://openlibrary.org/search.json?q=lord&offset=${offset}&limit=${LIMIT}&fields=title,author_name,first_publish_year,cover_i,number_of_pages_median,ratings_average,first_sentence`)
            .then((res) => {
                setItems((prevItems) => [...prevItems, ...res.data.docs]);

                res.data.docs.length > 0 ? setHasMore(true) : setHasMore(false);
                setIsLoading(false)
                setOffset(offset + LIMIT)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                setIsError(true)
            });
    };

    const reset = () => {
        setOffset(0);
        setItems([]);
        setIsLoading(false);
        setIsError(false);
        setHasMore(true)
    }

    return {
        isError, 
        isLoading,
        items,
        hasMore,
        fetchMoreData,
        reset
    }
}