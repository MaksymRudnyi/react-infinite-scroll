import { useData } from '../useData';
import Card from '../card';
import { useState } from 'react';
import { useEffect } from 'react';

const ManualCalc = () => {
    const [page, setPage] = useState(1);
    const { items, isLoading, isError, fetchMoreData } = useData(page);

    const handleScroll = () => {
        if ((window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 20) || isLoading) {
            return;
        }
        fetchMoreData(page);
        setPage(page + 1)
    };

    useEffect(() => {
        fetchMoreData(page);
        setPage(page + 1)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    return (
        <>
            {items.map((item) => {
                return <Card key={item.id} {...item} />
            })}
            {isLoading ? <h2>Loading...</h2> : null}
            {isError ? <h2>Error during getting data</h2> : null}
        </>
    )
}

export default ManualCalc;