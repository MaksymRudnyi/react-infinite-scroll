import { useData } from "../useData";
import { useState, useEffect } from "react";
import Card from '../card';

const CalcHeight = () => {
    const [page, setPage] = useState(1);

    const {items, fetchMoreData, isLoading} = useData(10);

    useEffect(() => {
        fetchMoreData(page);
        setPage(page + 1)
    }, []);

    const handleScroll = () => {
        if ((window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 20) || isLoading) {
            return null;
        }

        fetchMoreData(page);
        setPage(page + 1);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll)
    }, [isLoading])

    return (
        <>
            {items.map((item) => <Card key={item.id} {...item}/>)}
            {isLoading ? 'Loading...' : null}
        </>
    )
}

export default CalcHeight;