import React, { useCallback, useState } from 'react';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

// Assuming you have a function to fetch more data (fetchMoreData) and a Card component
import { useData } from '../useData';
import Card from '../Card';
import useCellMeasurer from '../useCellMeasurer'

const LazyInfiniteScroll = () => {
  const { items, fetchMoreData, isLoading, hasMore } = useData();
  const cellMeasurerProps = useCellMeasurer({ items });
  const isItemLoaded = useCallback((index) => !hasMore || index < items.length, [hasMore, items.length]);

  const loadMoreItems = useCallback((startIndex, stopIndex) => {
    // Adjust the range based on your API pagination
    if (isLoading || !hasMore) {
      return Promise.resolve();
    }

    return fetchMoreData();
  }, [fetchMoreData, isLoading, hasMore]);

  const Row = ({ index, style }) => {
    if (!isItemLoaded(index)) {
      // You can return a loading indicator here
      return <div style={style}>Loading...</div>;
    }

    const item = items[index];
    return <Card key={item.id} style={style} {...item} />;
  };

  const itemCount = hasMore ? items.length + 1 : items.length;
  

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={600} // Adjust the height of the list as needed
          onItemsRendered={onItemsRendered}
          ref={ref}
          width={'100%'}
          {...cellMeasurerProps}
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  );
};

export default LazyInfiniteScroll;
