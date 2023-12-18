import { useData } from "../useData";
import { useState, useEffect, useCallback } from "react";
import Card from '../card';
import InfiniteLoader from 'react-window-infinite-loader'
import { VariableSizeList as List } from "react-window";

const Virtual = () => {
    const { items, hasMore, isLoading, fetchMoreData } = useData(20);
    const isItemLoaded = useCallback((index) => index < items.length || !hasMore, [hasMore, items.length])

    const loadMoreItems = () => {
        if (isLoading || !hasMore) {
            return Promise.resolve();
        }
        return fetchMoreData();
    }

    const Row = ({ index, style }) => {
        if (!isItemLoaded(index)) {
          // You can return a loading indicator here
          return <div style={style}>Loading...</div>;
        }
    
        const item = items[index];
        return <Card key={item.id} style={style} {...item} />;
      };

    return (
        <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={items.length + 1}
            loadMoreItems={loadMoreItems}
        >
            {({onItemsRendered, ref}) => (
                <List
                    height={800}
                    itemCount={items.length + 1}
                    itemSize={() => 350}
                    onItemsRendered={onItemsRendered}
                    width={'100%'}
                    ref={ref}
                >
                    {Row}
                </List>
            )}
            

        </InfiniteLoader>
    )
}

export default Virtual;