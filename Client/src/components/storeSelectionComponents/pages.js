import React, { useState, useEffect } from "react";

function Pages(props) {
    const [prevPage, setPrevPage] = useState(0)
    const [nextPage, setNextPage] = useState(2)

    useEffect (() => {
        setPrevPage(parseInt(props.currentPage, 10) - 1)
        
        setNextPage(parseInt(props.currentPage, 10) + 1)
    }, [props.currentPage])
    
    return (
        <div>
            <ul className="pagination flex justify-center">
                <li className={`page-item select-none ${prevPage <= 0 ? 'disabled' : ''}`}>
                    <button className="page-link text-black" onClick={props.back}>&laquo;</button>
                </li>
                <li className="page-item">
                    <button className={`page-link select-none text-black`} onClick={props.changePage}>
                        {(props.currentPage > 2) ? prevPage : 1}
                    </button>
                </li>
                <li className="page-item">
                    <button className={`page-link select-none text-black`} onClick={props.changePage}>
                        {props.currentPage > 2 ? props.currentPage : 2}
                    </button>
                </li>
                <li className="page-item">
                    <button className={`page-link select-none text-black ${(nextPage > props.maxPage || 3 > props.maxPage) ? 'disabled' : '' }`} onClick={props.changePage}>
                        {(props.currentPage > 2) ? nextPage : 3}
                    </button>
                </li>
                <li className={`page-item select-none ${nextPage > props.maxPage ? 'disabled' : ''}`}>
                    <button className="page-link text-black" onClick={props.front}>&raquo;</button>
                </li>
            </ul>
        </div>
    );
}

export default Pages;
