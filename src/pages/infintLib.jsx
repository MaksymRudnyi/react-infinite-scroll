import { useData } from "../useData";
import { useState, useEffect } from "react";
import Card from '../card';
import InfiniteScroll from 'react-infinite-scroll-component'

const InfiniteLib = () => {
    const { items, hasMore, fetchMoreData, isLoading } = useData(20);

    console.log('has more', hasMore)
    return (
        <InfiniteScroll
            dataLength={items.length} //This is important field to render the next data
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
              </p>
            }
        >
            {items.map((item) => <Card key={item.id} {...item}/>)}
        </InfiniteScroll>
    )
}

export default InfiniteLib;