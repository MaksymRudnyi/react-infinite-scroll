import React, { useState, useEffect } from "react";
import axios from 'axios';

export const useData = (limit = 20) => {
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchMoreData = (page) => {
        setIsLoading(true);
        setIsError(false);

        axios
            .get(`https://openlibrary.org/search.json?q=*&offset=${page * limit - limit}&limit=${limit}&fields=title,author_name,first_publish_year,cover_i,number_of_pages_median,ratings_average,first_sentence`)
            .then((res) => {
                setItems((prevItems) => [...prevItems, ...res.data.docs]);

                res.data.length > 0 ? setHasMore(true) : setHasMore(false);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                setIsError(true)
            });
    };

    return {
        isError, 
        isLoading,
        items,
        fetchMoreData
    }
}