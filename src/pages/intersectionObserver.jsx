import { useData } from '../useData';
import Card from '../card';
import { useRef, useEffect } from 'react';

const IntersectionOserverSample = () => {
    const {items, isLoading, isError, fetchMoreData} = useData();
    const observerTarget = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && !isLoading) {
                console.log('call fetch data')
                fetchMoreData();
            }
          },
          { threshold: 1.0 }
        );
      
        if (observerTarget.current) {
          observer.observe(observerTarget.current);
        }
      
        return () => {
          if (observerTarget.current) {
            observer.unobserve(observerTarget.current);
          }
        };
    // wrong example https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/
    //   }, [fetchMoreData, isLoading]);
      }, [fetchMoreData, isLoading]);

    return (
        <>
            {items.map((item) => {
                return <Card key={item.id} {...item}/>
            })}
            {isLoading ? <h2>Loading...</h2> : null}
            {isError ? <h2>Error during getting data</h2> : null}
            <div ref={observerTarget}>i</div>
        </>
    )
}

export default IntersectionOserverSample;