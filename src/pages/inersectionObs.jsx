import { useData } from "../useData";
import { useState, useEffect,useRef } from "react";
import Card from '../card';

const IntersectionObs = () => {
    const triggerRef = useRef(null)

    const {items, fetchMoreData, isLoading} = useData(10);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading) {
                fetchMoreData()
            }
        }, { threshold: 1.0});

        if (triggerRef.current) {
            observer.observe(triggerRef.current)
        }

        return () => {
            if (triggerRef.current) {
                observer.unobserve(triggerRef.current)
            }
        }
    }, [fetchMoreData, isLoading]);

    return (
        <>
            {items.map((item) => <Card key={item.id} {...item}/>)}
            {isLoading ? 'Loading...' : null}

            <div id="trigger" ref={triggerRef}>go.</div>
        </>
    )
}

export default IntersectionObs;