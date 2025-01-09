import { useEffect, useState } from "react";

interface Props {
    pages: number;
    totalRows: number;
    perPage: number;
    changingpage: any
}

export const Pagination = (props: Props) => {
    const { pages, totalRows, perPage, changingpage } = props
    const [val, setVal] = useState(pages)
    const maxDisplayPages = 3; // Adjust the maximum number of pages to display

    //handle page number on pressing enter

    useEffect(()=>{
        setVal(pages)
    },[pages])
    const handlepagechange = (e: any) => {
        if (e.key === "Enter") {
            if (val <= Math.ceil(totalRows / perPage)) {
                setVal(e.target.value);
                changingpage(val);
            }
        }
    }
    const changingpages = (e: any) => {
        changingpage(e);
        setVal(e);
    }
    const getPageNumbers = () => {
        const currentPage = pages;
        const totalPages = Math.ceil(totalRows / perPage);

        if (totalPages <= maxDisplayPages) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }

        const halfMaxDisplayPages = Math.floor(maxDisplayPages / 2);
        let startPage = currentPage - halfMaxDisplayPages;
        let endPage = currentPage + halfMaxDisplayPages;

        if (startPage < 1) {
            startPage = 1;
            endPage = maxDisplayPages;
        }

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = totalPages - maxDisplayPages + 1;
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };

    return (
        <div className="paginationbutton">
            <div className="float-start mt-2">
                <span>Showing page {pages} of {Math.ceil(totalRows / perPage)}</span>
            </div>
            <ul className="pagination pagination-md justify-content-end">
                <li className="page-item"><button  className={pages === 1 ? 'btn btn-light btn-sm' : 'btn btn-light btn-sm'} disabled={pages === 1} onClick={() => changingpages(1)}>&laquo;</button></li>
                <li className="page-item"><button className="btn btn-light btn-sm me-1 " disabled={pages === 1} onClick={() => changingpages(pages - 1)}>&lsaquo;</button></li>
                <li className="col-13 mt-1 flaot-start">
                    <span className="float-start ">Page</span>
                    <input className="form-control mt-minus5 form-control-sm mm-5 col-5 me-1 float-start"
                        type="text"
                        value={val}
                        onChange={e => {
                            const pageNo = e.target.value ? Number(e.target.value) : 1;
                            setVal(pageNo);
                        }} onKeyDown={handlepagechange} />
                    <span className="float-start">of {Math.ceil(totalRows / perPage)}</span>
                </li>
                {getPageNumbers().map((pageNumber, index) => (
                    <li key={index} className={pageNumber === pages ? 'page-item me-1 active' : 'page-item me-1'} >
                        <button className="btn btn-light btn-sm" onClick={() => changingpage(pageNumber)}>{pageNumber}</button>
                    </li>
                ))}
                <li className="page-item"><button className="btn btn-light btn-sm me-1" disabled={pages >= (Math.ceil(totalRows / perPage))}  onClick={() => changingpage(pages + maxDisplayPages)}>...</button></li>
                <li className="page-item"><button className="btn btn-light btn-sm me-1" disabled={pages === (Math.ceil(totalRows / perPage))} onClick={() => changingpages(pages + 1)}>&rsaquo;</button></li>
                <li className="page-item"><button className="btn btn-light btn-sm" disabled={pages === (Math.ceil(totalRows / perPage))} onClick={() => changingpages(Math.ceil(totalRows / perPage))}>&raquo;</button></li>
            </ul>
        </div>
    )
}