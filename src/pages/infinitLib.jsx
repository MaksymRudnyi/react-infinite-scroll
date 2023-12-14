import InfiniteScroll from 'react-infinite-scroll-component';

import { useData } from '../useData';
import Card from '../card';
import { useState } from 'react';

const InfinitLib = () => {
    const [page, setPage] = useState(1);
    const {items, isLoading, isError, hasMore ,fetchMoreData} = useData(page);

    return (
        <>
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore} // Replace with a condition based on your data source
                loader={<p>Loading...</p>}
                endMessage={<p>No more data to load.</p>}
                >
                    {items.map(item => (
                        <Card key={item.id} {...item}/>
                    ))}
                </InfiniteScroll>
                {isError && <p>Error</p>}
        </>
    )
}

export default InfinitLib;