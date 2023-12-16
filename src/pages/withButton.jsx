import { useData } from "../useData";
import { useState, useEffect } from "react";
import Card from '../card';

const WithButton = () => {
    const [page, setPage] = useState(1);
    const { items, fetchMoreData, isLoading} = useData(20);

    useEffect(() => {
        fetchMoreData(page)
    }, [page])

    return (
        <>
            {items.map((item) => <Card key={item.id} {...item}/>)}
            {isLoading ? 'Loading...' : null}
            {!isLoading ? <button onClick={() => setPage(page + 1)}>Load more.</button> : null}
        </>
    )
}

export default WithButton;