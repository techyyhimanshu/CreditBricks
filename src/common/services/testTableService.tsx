import React, { ChangeEvent, useEffect, useState } from "react"
import { Button, Form, Table, Row, Col } from "react-bootstrap";
import { useTable, TableInstance, usePagination, useRowSelect, useSortBy, UseRowSelectInstanceProps } from "react-table"
import { Tableservice } from "./tableDataService"
import TableCheckBox from "../hooks/TableCheckBox"
import { Pagination } from "../hooks/Pagination"
import useDebounce from "../hooks/useDebounce";
import TestLoader from "../../layout/layoutcomponent/testloader";


interface dtData {
    id: number;
    name: string;
}
interface dtTableInstance extends TableInstance<dtData>, UseRowSelectInstanceProps<dtData> { }

interface ReactTableProps {
    columns: any,
    url: string,
    getdata: (arg: Array<object>) => void
    totalfilter?:object;
    transformData?: (data: any[]) => any[];
    userId?:string;
}

interface TableState {
    pages: number;
    totalRows: number;
    perPage: number;
    search: string;
    beingSearched: boolean;
    tableloader: boolean;
    data: any[]; // Adjust this based on your data type
    filtereddata: any[]; // Adjust this based on your data type
}


const TestTableService = (props: ReactTableProps): JSX.Element => {
    const { columns, url,  getdata, transformData,totalfilter,userId } = props
    const [userType, setUserType] = useState<string>("")

    useEffect(() => {
        const user = localStorage.getItem("userType")
        if (user) {
            setUserType(user)
        }
    }, [localStorage])

    const modifiedColumns = React.useMemo(() => {
        if (userType === "admin") {
            return [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }: any) => (
                        <TableCheckBox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }: any) => (
                        <TableCheckBox {...row.getToggleRowSelectedProps()} />
                    )
                },
                ...columns
            ];
        }
        return columns;
    }, [columns]);

    const [tableState, setTableState] = useState<TableState>({
        pages: 1,
        totalRows: 0,
        perPage: 10,
        search: "",
        beingSearched: false,
        tableloader: false,
        data: [],
        filtereddata: [],
    });


    const debounceSearch = useDebounce(tableState.search, 500)

    const { pages, totalRows, perPage, search, beingSearched, tableloader, data, filtereddata } = tableState;

    const Actions = (
        <>
            <div className="d-flex flex-row justify-content-between mb-2">
                <div className="flex-fill mt-2">
                    <span className="float-start">Rows per Page:</span>
                    <select className="form-controls form-control-sm col-1 float-start ms-2 mm-5"
                        value={perPage}
                        onChange={(e) => setTableState((prevState) => ({ ...prevState, perPage: Number(e.target.value) }))}
                    >
                        {[10, 15, 20, 25, 30].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-4 pe-0  float-end">
                    <Row className="m-0">
                        <Form.Control type="text" placeholder="Search here..." className="form-control col-sm-9"
                            value={search}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setTableState((prevState) => ({ ...prevState, beingSearched: true, search: e.target.value })) }} />
                        <Col xl={3}>
                            <Button className="btn btn-primary btn-sm w-100 h-33 tx-14" onClick={() => Tableservice.saveAsExcel(beingSearched ? filtereddata : data)}><i className="bi bi-file-earmark-excel"></i>&nbsp; Excel</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );

    useEffect(() => {
        setTableState((prevState: any) => ({ ...prevState, tableloader: true }));
        const fetchDataFunction = debounceSearch
            ? Tableservice.getSearchedData
            : Tableservice.getData;
        var str: any = {
            url: url,
            search: debounceSearch,
            pages: pages,
            perPage: perPage,
            filter: search,
            totalfilter,
            userId
        }
        fetchDataFunction(str)
            .then((res: any) => {
                const transformedData = transformData?transformData(res.data[Object.keys(res.data)[0]]):res.data[Object.keys(res.data)[0]];
                if (!beingSearched) {
                    setTableState((prevState) => ({
                        ...prevState,
                        tableloader: false,
                        totalRows:res.data.total,
                        data: transformedData,
                    }));
                } else {
                    setTableState((prevState) => ({
                        ...prevState,
                        data: [],
                        tableloader: false,
                        totalRows: res.data.total,
                        beingSearched: true,
                        filtereddata: transformedData,
                    }));
                }
            })
            .catch((err: any) => console.log(err));
    }, [beingSearched, pages, perPage, totalfilter, url, debounceSearch, setTableState]);

    //using react table and giving data to it
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
    } = useTable<any>(
        {
            columns: modifiedColumns,
            data: beingSearched ? filtereddata : data,
            initialState: {
                pageIndex: 0,
                pageSize: 10,
                globalFilter: '',
            },
            manualPagination: true,
            manualGlobalFilter: true,
        },
        useSortBy,
        usePagination,
        useRowSelect,
        // (hooks) => {
        //     hooks.visibleColumns.push((columns) => {
        //         return [
        //             {
        //                 id: "selection",
        //                 Header: ({ getToggleAllRowsSelectedProps }) => (
        //                     <TableCheckBox {...getToggleAllRowsSelectedProps()} />
        //                 ),
        //                 Cell: ({ row }) => (
        //                     <TableCheckBox {...row.getToggleRowSelectedProps()} />
        //                 )
        //             },
        //             ...columns
        //         ]
        //     })
        // }
    ) as dtTableInstance;

    const changingpage = (val: number) => {
        setTableState((prevState) => ({ ...prevState, pages: val }));
    }

    //getting row selected and mapping thorough array of object and passing data to parent(page)
    useEffect(() => {
        const selectedRowData = selectedFlatRows?.map((el: { original: any }) => el.original)
        getdata(selectedRowData);
    }, [selectedFlatRows])

    return (
        <div className="table-responsive">
            <div className="headers">
                {Actions}
            </div>
            {
                tableloader && <div className="text-center mt-5 mb-5"><TestLoader/></div>
            }
            {
                !data.length && !filtereddata.length && !tableloader && <h3 className="errormsg">There are no records to display</h3>
            }
            {
                !tableloader && (data.length !== 0 || filtereddata.length !== 0) && <div className="table">
                    <Table
                        id="delete-datatable"
                        className="table table-bordered table-striped table-hover mb-0 text-md-nowrap table" {...getTableProps()} >
                        <thead>
                            {headerGroups.map((headerGroup: any) => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
                                    {headerGroup.headers.map((column: any) => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            className={column.className} key={Math.random()}
                                        >
                                            <span className="tabletitle">{column.render("Header")}</span>
                                            <span>
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <span>&darr;</span>
                                                    ) : (
                                                        <span>&uarr;</span>
                                                    )
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row: any) => {
                                prepareRow(row);
                                const rowProps = row.getRowProps();
                                const { key, ...restRowProps } = rowProps;
                                return (
                                    <tr key={key} {...restRowProps}>
                                        {row.cells.map((cell: any) => {
                                            const cellProps = cell.getCellProps();
                                            const { key: cellKey, ...restCellProps } = cellProps;
                                            return (
                                                <td key={cellKey} {...restCellProps}> {cell.isGrouped ? (
                                                    <>
                                                        <span {...row.getToggleRowExpandedProps()}>
                                                            {row.isExpanded ? '👇' : '👉'}
                                                        </span>{' '}
                                                        {cell.render('Cell')} ({row.subRows.length})
                                                    </>
                                                ) : cell.isAggregated ? (
                                                    cell.render('Aggregated')
                                                ) : cell.isPlaceholder ? null : (
                                                    cell.render('Cell')
                                                )}</td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            }
            {
                (data.length !== 0 || filtereddata.length !== 0) && <Pagination pages={pages} totalRows={totalRows} perPage={perPage} changingpage={changingpage} />
            }
        </div>
    )
}

export default TestTableService;


