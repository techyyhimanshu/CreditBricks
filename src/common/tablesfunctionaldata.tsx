import  { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { imagesData } from "./commonimages";
import { Button, ButtonGroup, Card, Col, Form, InputGroup, Modal, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { nanoid } from "nanoid";
// import DataTable from "react-data-table-component";
// import differenceBy from "lodash/differenceBy";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

//dashboard1
export const COLUMNS1:any = [
  {
    Header: "Purchase Date",
    accessor: "PurchaseDate",
    className: "text-center ",
  },
  {
    Header: "Client Name",
    accessor: "ClientName",
    className: "text-center ",
  },
  {
    Header: "Product ID",
    accessor: "ProductID",
    className: "text-center ",
  },
  {
    Header: "Product",
    accessor: "Product",
    className: "text-center ",
  },
  {
    Header: "Product Cost",
    accessor: "ProductCost",
    className: "text-center ",
  },
  {
    Header: "Payment Mode",
    accessor: "PaymentMode",
    className: "text-center ",
  },
  {
    Header: "Status",
    accessor: "Status",
    className: "text-center ",
  },
];

export const DATATABLE1 = [
  {
    PurchaseDate: "#01",
    ClientName: "Tiger Nixon",
    ProductID: "PRO12345",
    Product: "Mi LED Smart TV 4A 80",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-success">Delivered</span>,
    ProductCost: "$320,800",
    color: "badge badge-success",
  },
  {
    PurchaseDate: "#02",
    ClientName: "Garrett Winters",
    ProductID: "PRO8765",
    Product: "Thomson R9 122cm (48 inch) Full HD LED TV",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-primary">Add Cart</span>,
    ProductCost: "$170,750",
  },
  {
    PurchaseDate: "#03",
    ClientName: "Ashton Cox",
    ProductID: "PRO54321",
    Product: "Vu 80cm (32 inch) HD Ready LED TV",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-orange">Pending</span>,
    ProductCost: "$86,000",
  },
  {
    PurchaseDate: "#04",
    ClientName: "Cedric Kelly",
    ProductID: "PRO97654",
    Product: "Micromax 81cm (32 inch) HD Ready LED TV",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-secondary">Delivering</span>,
    ProductCost: "$433,060",
  },
  {
    PurchaseDate: "#05",
    ClientName: "Airi Satou",
    ProductID: "PRO4532",
    Product: "HP 200 Mouse &amp; Wireless Laptop Keyboard",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-danger">Shipped</span>,
    ProductCost: "$162,700",
  },
  {
    PurchaseDate: "#06",
    ClientName: "Brielle Williamson",
    ProductID: "PRO6789",
    Product: "Digisol DG-HR3400 Router ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-secondary">Delivering</span>,
    ProductCost: "$372,000",
  },
  {
    PurchaseDate: "#07",
    ClientName: "Herrod Chandler",
    ProductID: "PRO4567",
    Product: "Dell WM118 Wireless Optical Mouse",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-info">Add to Cart</span>,
    ProductCost: "$137,500",
  },
  {
    PurchaseDate: "#08",
    ClientName: "Rhona Davidson",
    ProductID: "PRO32156",
    Product: "Dell 16 inch Laptop Backpack ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-pink">Delivered</span>,
    ProductCost: "$327,900",
  },
  {
    PurchaseDate: "#09",
    ClientName: "Colleen Hurst",
    ProductID: "PRO35785",
    Product: "Mi LED Smart TV 4A 80",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-danger">Shipped</span>,
    ProductCost: "$205,500",
  },
  {
    PurchaseDate: "#10",
    ClientName: "Sonya Frost",
    ProductID: "PRO23409",
    Product: "Vu 80cm (32 inch) HD Ready LED TV",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-secondary">Delivering</span>,
    ProductCost: "$103,600",
  },
  {
    PurchaseDate: "#11",
    ClientName: "Jena Gaines",
    ProductID: "PRO12345",
    Product: "Digisol DG-HR3400 Router",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-success">Delivered</span>,
    ProductCost: "$90,560",
  },
  {
    PurchaseDate: "#12",
    ClientName: "Quinn Flynn",
    ProductID: "PRO64326",
    Product: "Dell 16 inch Laptop Backpack",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-info">Add to Cart</span>,
    ProductCost: "$342,000",
  },
  {
    PurchaseDate: "#13",
    ClientName: "Charde Marshall",
    ProductID: "PRO87563",
    Product: "Thomson R9 122cm (48 inch) Full HD LED TV",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-orange">Pending</span>,
    ProductCost: "$470,600",
  },
  {
    PurchaseDate: "#14",
    ClientName: "Haley Kennedy",
    ProductID: "PRO65439",
    Product: "Mi LED Smart TV 4A 80",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-orange">Pending</span>,
    ProductCost: "$313,500",
  },
  {
    PurchaseDate: "#15",
    ClientName: "Tatyana Fitzpatrick",
    ProductID: "PRO097254",
    Product: "Thomson R9 122cm (48 inch) Full HD LED TV",
    PaymentMode: "Cash on delivered ",
    Status: <span className="badge badge-info">Add to Cart</span>,
    ProductCost: "$385,750",
  },
  {
    PurchaseDate: "#16",
    ClientName: "Michael Silva",
    ProductID: "PRO45312",
    Product: "Mi LED Smart TV 4A 80",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-danger">Shipped</span>,
    ProductCost: "$198,500",
  },
  {
    PurchaseDate: "#17",
    ClientName: "Paul Byrd",
    ProductID: "PRO45674",
    Product: "Digisol DG-HR3400 Router",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-info">Add to Cart</span>,
    ProductCost: "$725,000",
  },
  {
    PurchaseDate: "#18",
    ClientName: "Gloria Little",
    ProductID: "PRO34653",
    Product: "Dell WM118 Wireless Optical Mouse",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-orange">Pending</span>,
    ProductCost: "$237,500",
  },
  {
    PurchaseDate: "#19",
    ClientName: "Bradley Greer",
    ProductID: "PRO24467",
    Product: "Dell 16 inch Laptop Backpack ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-orange">Pending</span>,
    ProductCost: "$132,000",
  },
  {
    PurchaseDate: "#20",
    ClientName: "Dai Rios",
    ProductID: "PRO35323",
    Product: "Vu 80cm (32 inch) HD Ready LED TV",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-info">Add to Cart</span>,
    ProductCost: "$217,500",
  },
  {
    PurchaseDate: "#21",
    ClientName: "Jenette Caldwell",
    ProductID: "PRO56793",
    Product: "HP 200 Mouse &amp; Wireless Laptop Keyboard",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-success">Delivered</span>,
    ProductCost: "$345,000",
  },
  {
    PurchaseDate: "#22",
    ClientName: "Yuri Berry",
    ProductID: "PRO32156",
    Product: "Dell 16 inch Laptop Backpack ",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-info">Add to Cart</span>,
    ProductCost: "$675,000",
  },
  {
    PurchaseDate: "#23",
    ClientName: "Caesar Vance",
    ProductID: "PRO4567",
    Product: "Thomson R9 122cm (48 inch) Full HD LED TV ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-orange">Pending</span>,
    ProductCost: "$106,450",
  },
  {
    PurchaseDate: "#24",
    ClientName: "Doris Wilder",
    ProductID: "PRO6789",
    Product: "Dell WM118 Wireless Optical Mouse",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-danger">Shipped</span>,
    ProductCost: "$85,600",
  },
  {
    PurchaseDate: "#25",
    ClientName: "Angelica Ramos",
    ProductID: "PRO4532",
    Product: "Digisol DG-HR3400 Router ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-success">Delivered</span>,
    ProductCost: "$1,200,000",
  },
  {
    PurchaseDate: "#26",
    ClientName: "Gavin Joyce",
    ProductID: "PRO97654",
    Product: "Dell WM118 Wireless Optical Mouse",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-success">Delivered</span>,
    ProductCost: "$92,575",
  },
  {
    PurchaseDate: "#27",
    ClientName: "Jennifer Chang",
    ProductID: "PRO45412",
    Product: "Thomson R9 122cm (48 inch) Full HD LED TV ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-danger">Shipped</span>,
    ProductCost: "$357,650",
  },
  {
    PurchaseDate: "#28",
    ClientName: "Brenden Wagner",
    ProductID: "PRO12345",
    Product: "Dell 16 inch Laptop Backpack",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-info">Add to Cart</span>,
    ProductCost: "$206,850",
  },
  {
    PurchaseDate: "#29",
    ClientName: "Fiona Green",
    ProductID: "PRO8765",
    Product: "Digisol DG-HR3400 Router ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-orange">Pending</span>,
    ProductCost: "$850,000",
  },
  {
    PurchaseDate: "#30",
    ClientName: "Shou Itou",
    ProductID: "PRO54321",
    Product: "Dell WM118 Wireless Optical Mouse",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-success">Delivered</span>,
    ProductCost: "$163,000",
  },
];

export const GlobalFilter = ({ filter, setFilter }:any) => {
  return (
    <span className="d-flex ms-auto">
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="form-control mb-4"
        placeholder="Search..."
      />
    </span>
  );
};
//end dashboard1

//dashboard2

export const COLUMNS2:any = [
  {
    Header: "Purchase Date",
    accessor: "PurchaseDate",
    className: "text-center ",
  },
  {
    Header: "Client Name",
    accessor: "ClientName",
    className: "text-center ",
  },
  {
    Header: "Product ID",
    accessor: "ProductID",
    className: "text-center ",
  },
  {
    Header: "Product",
    accessor: "Product",
    className: "text-center ",
  },
  {
    Header: "Product Cost",
    accessor: "ProductCost",
    className: "text-center ",
  },
  {
    Header: "Payment Mode",
    accessor: "PaymentMode",
    className: "text-center ",
  },
  {
    Header: "Status",
    accessor: "Status",
  },
  {
    Header: "ACTION",
    accessor: "Action",
    className: "text-center ",
  },
];

export const DATATABLE2 = [
  {
    PurchaseDate: "#01",
    ClientName: "Tiger Nixon",
    ProductID: "PRO12345",
    Product: "Mi LED Smart TV 4A 80",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-success-transparent">Delivered</span>,
    ProductCost: "$320,800",
    Action: (
      <span className="">
        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
          <Link to="#" className="btn btn-primary btn-sm rounded-11 me-2">
            <i>
              <svg
                className="table-edit"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
          <Link to="#" className="btn btn-danger btn-sm rounded-11">
            <i>
              <svg
                className="table-delete"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
      </span>
    ),
  },
  {
    PurchaseDate: "#02",
    ClientName: "Garrett Winters",
    ProductID: "PRO8765",
    Product: "Thomson R9 122cm (48 inch) Full HD LED TV",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-primary-transparent">Add Cart</span>,
    ProductCost: "$170,750",
    Action: (
      <span className="">
        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
          <Link to="#" className="btn btn-primary btn-sm rounded-11 me-2">
            <i>
              <svg
                className="table-edit"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
          <Link to="#" className="btn btn-danger btn-sm rounded-11">
            <i>
              <svg
                className="table-delete"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
      </span>
    ),
  },
  {
    PurchaseDate: "#03",
    ClientName: "Ashton Cox",
    ProductID: "PRO54321",
    Product: "Vu 80cm (32 inch) HD Ready LED TV",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-danger-transparent">Pending</span>,
    ProductCost: "$86,000",
    Action: (
      <span className="">
        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
          <Link to="#" className="btn btn-primary btn-sm rounded-11 me-2">
            <i>
              <svg
                className="table-edit"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
          <Link to="#" className="btn btn-danger btn-sm rounded-11">
            <i>
              <svg
                className="table-delete"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
      </span>
    ),
  },
  {
    PurchaseDate: "#04",
    ClientName: "Cedric Kelly",
    ProductID: "PRO97654",
    Product: "Micromax 81cm (32 inch) HD Ready LED TV",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-warning-transparent">Delivering</span>,
    ProductCost: "$433,060",
    Action: (
      <span className="">
        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
          <Link to="#" className="btn btn-primary btn-sm rounded-11 me-2">
            <i>
              <svg
                className="table-edit"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
          <Link to="#" className="btn btn-danger btn-sm rounded-11">
            <i>
              <svg
                className="table-delete"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
      </span>
    ),
  },
  {
    PurchaseDate: "#05",
    ClientName: "Airi Satou",
    ProductID: "PRO4532",
    Product: "HP 200 Mouse &amp; Wireless Laptop Keyboard",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-danger-transparent">Shipped</span>,
    ProductCost: "$162,700",
    Action: (
      <span className="">
        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
          <Link to="#" className="btn btn-primary btn-sm rounded-11 me-2">
            <i>
              <svg
                className="table-edit"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
          <Link to="#" className="btn btn-danger btn-sm rounded-11">
            <i>
              <svg
                className="table-delete"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
      </span>
    ),
  },
  {
    PurchaseDate: "#06",
    ClientName: "Brielle Williamson",
    ProductID: "PRO6789",
    Product: "Digisol DG-HR3400 Router ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-primary-transparent">Delivering</span>,
    ProductCost: "$372,000",
    Action: (
      <span className="">
        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
          <Link to="#" className="btn btn-primary btn-sm rounded-11 me-2">
            <i>
              <svg
                className="table-edit"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
          <Link to="#" className="btn btn-danger btn-sm rounded-11">
            <i>
              <svg
                className="table-delete"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
      </span>
    ),
  },
  {
    PurchaseDate: "#07",
    ClientName: "Herrod Chandler",
    ProductID: "PRO4567",
    Product: "Dell WM118 Wireless Optical Mouse",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-info-transparent">Add to Cart</span>,
    ProductCost: "$137,500",
    Action: (
      <span className="">
        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
          <Link to="#" className="btn btn-primary btn-sm rounded-11 me-2">
            <i>
              <svg
                className="table-edit"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
          <Link to="#" className="btn btn-danger btn-sm rounded-11">
            <i>
              <svg
                className="table-delete"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
      </span>
    ),
  },
  {
    PurchaseDate: "#08",
    ClientName: "Rhona Davidson",
    ProductID: "PRO32156",
    Product: "Dell 16 inch Laptop Backpack ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-pink-transparent">Delivered</span>,
    ProductCost: "$327,900",
    Action: (
      <span className="">
        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
          <Link to="#" className="btn btn-primary btn-sm rounded-11 me-2">
            <i>
              <svg
                className="table-edit"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
          <Link to="#" className="btn btn-danger btn-sm rounded-11">
            <i>
              <svg
                className="table-delete"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
      </span>
    ),
  },
  {
    PurchaseDate: "#09",
    ClientName: "Colleen Hurst",
    ProductID: "PRO35785",
    Product: "Mi LED Smart TV 4A 80",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-danger-transparent">Pending</span>,
    ProductCost: "$205,500",
    Action: (
      <span className="">
        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
          <Link to="#" className="btn btn-primary btn-sm rounded-11 me-2">
            <i>
              <svg
                className="table-edit"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
          <Link to="#" className="btn btn-danger btn-sm rounded-11">
            <i>
              <svg
                className="table-delete"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
      </span>
    ),
  },
  {
    PurchaseDate: "#10",
    ClientName: "Sonya Frost",
    ProductID: "PRO23409",
    Product: "Vu 80cm (32 inch) HD Ready LED TV",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-pink-transparent">Delivered</span>,
    ProductCost: "$103,600",
    Action: (
      <span className="">
        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
          <Link to="#" className="btn btn-primary btn-sm rounded-11 me-2">
            <i>
              <svg
                className="table-edit"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
          <Link to="#" className="btn btn-danger btn-sm rounded-11">
            <i>
              <svg
                className="table-delete"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
              </svg>
            </i>
          </Link>
        </OverlayTrigger>
      </span>
    ),
  },
];
//end dashboard2

//dashboard3
export const COLUMNS3:any = [
  {
    Header: "Purchase Date",
    accessor: "PurchaseDate",
    className: "text-center ",
  },
  {
    Header: "Client Name",
    accessor: "ClientName",
    className: "text-center ",
  },
  {
    Header: "Product ID",
    accessor: "ProductID",
    className: "text-center ",
  },
  {
    Header: "Product",
    accessor: "Product",
    className: "text-center ",
  },
  {
    Header: "Product Cost",
    accessor: "ProductCost",
    className: "text-center ",
  },
  {
    Header: "Payment Mode",
    accessor: "PaymentMode",
    className: "text-center ",
  },
  {
    Header: "Status",
    accessor: "Status",
    className: "text-center ",
  },
];

export const DATATABLE3 = [
  {
    PurchaseDate: "#01",
    ClientName: "Tiger Nixon",
    ProductID: "PRO12345",
    Product: "Mi LED Smart TV 4A 80",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-success">Delivered</span>,
    ProductCost: "$320,800",
    color: "badge badge-success",
  },
  {
    PurchaseDate: "#02",
    ClientName: "Garrett Winters",
    ProductID: "PRO8765",
    Product: "Thomson R9 122cm (48 inch) Full HD LED TV",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-primary">Add Cart</span>,
    ProductCost: "$170,750",
  },
  {
    PurchaseDate: "#03",
    ClientName: "Ashton Cox",
    ProductID: "PRO54321",
    Product: "Vu 80cm (32 inch) HD Ready LED TV",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-orange">Pending</span>,
    ProductCost: "$86,000",
  },
  {
    PurchaseDate: "#04",
    ClientName: "Cedric Kelly",
    ProductID: "PRO97654",
    Product: "Micromax 81cm (32 inch) HD Ready LED TV",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-secondary">Delivering</span>,
    ProductCost: "$433,060",
  },
  {
    PurchaseDate: "#05",
    ClientName: "Airi Satou",
    ProductID: "PRO4532",
    Product: "HP 200 Mouse &amp; Wireless Laptop Keyboard",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-danger">Shipped</span>,
    ProductCost: "$162,700",
  },
  {
    PurchaseDate: "#06",
    ClientName: "Brielle Williamson",
    ProductID: "PRO6789",
    Product: "Digisol DG-HR3400 Router ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-secondary">Delivering</span>,
    ProductCost: "$372,000",
  },
  {
    PurchaseDate: "#07",
    ClientName: "Herrod Chandler",
    ProductID: "PRO4567",
    Product: "Dell WM118 Wireless Optical Mouse",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-info">Add to Cart</span>,
    ProductCost: "$137,500",
  },
  {
    PurchaseDate: "#08",
    ClientName: "Rhona Davidson",
    ProductID: "PRO32156",
    Product: "Dell 16 inch Laptop Backpack ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-pink">Delivered</span>,
    ProductCost: "$327,900",
  },
  {
    PurchaseDate: "#09",
    ClientName: "Colleen Hurst",
    ProductID: "PRO35785",
    Product: "Mi LED Smart TV 4A 80",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-danger">Shipped</span>,
    ProductCost: "$205,500",
  },
  {
    PurchaseDate: "#10",
    ClientName: "Sonya Frost",
    ProductID: "PRO23409",
    Product: "Vu 80cm (32 inch) HD Ready LED TV",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-secondary">Delivering</span>,
    ProductCost: "$103,600",
  },
  {
    PurchaseDate: "#11",
    ClientName: "Jena Gaines",
    ProductID: "PRO12345",
    Product: "Digisol DG-HR3400 Router",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-success">Delivered</span>,
    ProductCost: "$90,560",
  },
  {
    PurchaseDate: "#12",
    ClientName: "Quinn Flynn",
    ProductID: "PRO64326",
    Product: "Dell 16 inch Laptop Backpack",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-info">Add to Cart</span>,
    ProductCost: "$342,000",
  },
  {
    PurchaseDate: "#13",
    ClientName: "Charde Marshall",
    ProductID: "PRO87563",
    Product: "Thomson R9 122cm (48 inch) Full HD LED TV",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-orange">Pending</span>,
    ProductCost: "$470,600",
  },
  {
    PurchaseDate: "#14",
    ClientName: "Haley Kennedy",
    ProductID: "PRO65439",
    Product: "Mi LED Smart TV 4A 80",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-orange">Pending</span>,
    ProductCost: "$313,500",
  },
  {
    PurchaseDate: "#15",
    ClientName: "Tatyana Fitzpatrick",
    ProductID: "PRO097254",
    Product: "Thomson R9 122cm (48 inch) Full HD LED TV",
    PaymentMode: "Cash on delivered ",
    Status: <span className="badge badge-info">Add to Cart</span>,
    ProductCost: "$385,750",
  },
  {
    PurchaseDate: "#16",
    ClientName: "Michael Silva",
    ProductID: "PRO45312",
    Product: "Mi LED Smart TV 4A 80",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-danger">Shipped</span>,
    ProductCost: "$198,500",
  },
  {
    PurchaseDate: "#17",
    ClientName: "Paul Byrd",
    ProductID: "PRO45674",
    Product: "Digisol DG-HR3400 Router",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-info">Add to Cart</span>,
    ProductCost: "$725,000",
  },
  {
    PurchaseDate: "#18",
    ClientName: "Gloria Little",
    ProductID: "PRO34653",
    Product: "Dell WM118 Wireless Optical Mouse",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-orange">Pending</span>,
    ProductCost: "$237,500",
  },
  {
    PurchaseDate: "#19",
    ClientName: "Bradley Greer",
    ProductID: "PRO24467",
    Product: "Dell 16 inch Laptop Backpack ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-orange">Pending</span>,
    ProductCost: "$132,000",
  },
  {
    PurchaseDate: "#20",
    ClientName: "Dai Rios",
    ProductID: "PRO35323",
    Product: "Vu 80cm (32 inch) HD Ready LED TV",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-info">Add to Cart</span>,
    ProductCost: "$217,500",
  },
  {
    PurchaseDate: "#21",
    ClientName: "Jenette Caldwell",
    ProductID: "PRO56793",
    Product: "HP 200 Mouse &amp; Wireless Laptop Keyboard",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-success">Delivered</span>,
    ProductCost: "$345,000",
  },
  {
    PurchaseDate: "#22",
    ClientName: "Yuri Berry",
    ProductID: "PRO32156",
    Product: "Dell 16 inch Laptop Backpack ",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-info">Add to Cart</span>,
    ProductCost: "$675,000",
  },
  {
    PurchaseDate: "#23",
    ClientName: "Caesar Vance",
    ProductID: "PRO4567",
    Product: "Thomson R9 122cm (48 inch) Full HD LED TV ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-orange">Pending</span>,
    ProductCost: "$106,450",
  },
  {
    PurchaseDate: "#24",
    ClientName: "Doris Wilder",
    ProductID: "PRO6789",
    Product: "Dell WM118 Wireless Optical Mouse",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-danger">Shipped</span>,
    ProductCost: "$85,600",
  },
  {
    PurchaseDate: "#25",
    ClientName: "Angelica Ramos",
    ProductID: "PRO4532",
    Product: "Digisol DG-HR3400 Router ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-success">Delivered</span>,
    ProductCost: "$1,200,000",
  },
  {
    PurchaseDate: "#26",
    ClientName: "Gavin Joyce",
    ProductID: "PRO97654",
    Product: "Dell WM118 Wireless Optical Mouse",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-success">Delivered</span>,
    ProductCost: "$92,575",
  },
  {
    PurchaseDate: "#27",
    ClientName: "Jennifer Chang",
    ProductID: "PRO45412",
    Product: "Thomson R9 122cm (48 inch) Full HD LED TV ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-danger">Shipped</span>,
    ProductCost: "$357,650",
  },
  {
    PurchaseDate: "#28",
    ClientName: "Brenden Wagner",
    ProductID: "PRO12345",
    Product: "Dell 16 inch Laptop Backpack",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-info">Add to Cart</span>,
    ProductCost: "$206,850",
  },
  {
    PurchaseDate: "#29",
    ClientName: "Fiona Green",
    ProductID: "PRO8765",
    Product: "Digisol DG-HR3400 Router ",
    PaymentMode: "Cash on delivered",
    Status: <span className="badge badge-orange">Pending</span>,
    ProductCost: "$850,000",
  },
  {
    PurchaseDate: "#30",
    ClientName: "Shou Itou",
    ProductID: "PRO54321",
    Product: "Dell WM118 Wireless Optical Mouse",
    PaymentMode: "Online Payment",
    Status: <span className="badge badge-success">Delivered</span>,
    ProductCost: "$163,000",
  },
];
//end dashboard3

//datatables
export const Savetable = () => {
    const [modalShow, setModalShow] = useState(false);
    const data = [
      {
        id: "1",
        sno: "1",
        Name: "Yonna",
        lastname: "Qond",
        position: "Financial Controller",
        email: "jacke123@gmail.com",
        salary: "$143,654",
      },
      {
        id: "2",
        sno: "2",
        Name: "Zonna",
        lastname: "Jond",
        position: "Accountant",
        email: "virginia456@gmail.com",
        salary: "$343,654",
      },
      {
        id: "3",
        sno: "3",
        Name: "Nonna",
        lastname: "Tond",
        position: "Chief Executive Officer",
        email: "jacobthomson@gmail.com",
        salary: "$743,654",
      },
      {
        id: "4",
        sno: "4",
        Name: "Bonna",
        lastname: "Oond",
        position: "Chief Operating Officer",
        email: "trevor@gmail.com",
        salary: "$643,654",
      },
      {
        id: "5",
        sno: "5",
        Name: "Honna",
        lastname: "Pond",
        position: "Data Coordinator",
        email: "kylie@gmail.com",
        salary: "$243,654",
      },
      {
        id: "6",
        sno: "6",
        Name: "Fonna",
        lastname: "Nond",
        position: "Developer",
        email: "jan@gmail.com",
        salary: "$543,654",
      },
      {
        id: "7",
        sno: "7",
        Name: "Aonna",
        lastname: "Xond",
        position: "Development lead",
        email: "trevor@gmail.com",
        salary: "$843,654",
      },
      {
        id: "8",
        sno: "8",
        Name: "Qonna",
        lastname: "Vond",
        position: "Director",
        email: "kylie@gmail.com",
        salary: "$843,654",
      },
      {
        id: "9",
        sno: "9",
        Name: "Jond",
        lastname: "Zonna",
        position: "Marketing Officer",
        email: "emily@gmail.com",
        salary: "$843,654",
      },
      {
        id: "10",
        sno: "10",
        Name: "Yonna",
        lastname: "Qond",
        position: "Financial Controller",
        email: "jan@gmail.com",
        salary: "$433,060",
      },
    ];
    const [contacts, setContacts] = useState(data);
    const [addFormData, setAddFormData] = useState({
      sno: "",
      Name: "",
      lastname: "",
      position: "",
      email: "",
      salary: "",
    });

    const [editFormData, setEditFormData] = useState({
      sno: "",
      Name: "",
      lastname: "",
      position: "",
      email: "",
      salary: "",
    });

    const [editContactId, setEditContactId] = useState(null);

    const handleAddFormChange = (event:any) => {
      event.preventDefault();

      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;

      const newFormData: any= { ...addFormData };
      newFormData[fieldName] = fieldValue;

      setAddFormData(newFormData);
    };

    const handleEditFormChange = (event:any) => {
      event.preventDefault();

      const fieldName: any= event.target.getAttribute("name");
      const fieldValue: any= event.target.value;

      const newFormData: any = { ...editFormData };
      newFormData[fieldName] = fieldValue;

      setEditFormData(newFormData);
    };

    const handleAddFormSubmit = (event:any) => {
      event.preventDefault();

      const newContact = {
        id: nanoid(),
        sno: addFormData.sno,
        Name: addFormData.Name,
        lastname: addFormData.lastname,
        position: addFormData.position,
        email: addFormData.email,
        salary: addFormData.salary,
      };

      const newContacts = [...contacts, newContact];
      setContacts(newContacts);
    };

    const handleEditFormSubmit = (event:any) => {
      event.preventDefault();

      const editedContact = {
        id: editContactId,
        sno: editFormData.sno,
        Name: editFormData.Name,
        lastname: editFormData.lastname,
        position: editFormData.position,
        email: editFormData.email,
        salary: editFormData.salary,
      };

      const newContacts: any= [...contacts];

      const index: any= contacts.findIndex((contact) => contact.id === editContactId);

      newContacts[index] = editedContact;

      setContacts(newContacts);
      setEditContactId(null);
    };

    const handleEditClick = (event:any, contact:any) => {
      event.preventDefault();
      setEditContactId(contact.id);

      const formValues = {
        sno: contact.sno,
        Name: contact.Name,
        lastname: contact.lastname,
        position: contact.position,
        email: contact.email,
        salary: contact.salary,
      };

      setEditFormData(formValues);
    };

    const handleCancelClick = () => {
      setEditContactId(null);
    };

    const handleDeleteClick = (contactId:any) => {
      const newContacts = [...contacts];

      const index = contacts.findIndex((contact) => contact.id === contactId);

      newContacts.splice(index, 1);

      setContacts(newContacts);
    };

    return (
      <div className="app-container">
        <Form onSubmit={handleEditFormSubmit}>
          <Button
            variant=""
            className="btn btn-primary mb-3"
            onClick={() => setModalShow(true)}
          >
            Add New Row
          </Button>
          <Table
            id="delete-datatable"
            className="table table-bordered text-nowrap border-bottom"
          >
            <thead>
              <tr>
                <th className="wd-5p text-center">S NO</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Position</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <Fragment key={contact.id}>
                  {editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </Table>
        </Form>

        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Add New Row
            </Modal.Title>
            <Button
              variant=""
              className="btn btn-close"
              onClick={() => setModalShow(false)}
            >
              x
            </Button>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddFormSubmit} className="">
              <Form.Control
                type="text"
                name="sno"
                required
                placeholder="S No..."
                onChange={handleAddFormChange}
                className="form-control mb-2 border"
              />
              <Form.Control
                type="text"
                name="Name"
                required
                placeholder="Enter a name..."
                onChange={handleAddFormChange}
                className="form-control mb-2 border"
              />
              <Form.Control
                type="text"
                name="lastname"
                required
                placeholder="Enter an lastname..."
                onChange={handleAddFormChange}
                className="form-control mb-2"
              />
              <Form.Control
                type="text"
                name="position"
                required
                placeholder="Position..."
                onChange={handleAddFormChange}
                className="form-control mb-2"
              />
              <Form.Control
                type="email"
                name="email"
                required
                placeholder="Enter an email..."
                onChange={handleAddFormChange}
                className="form-control mb-2"
              />
              <Form.Control
                type="salary"
                name="salary"
                required
                placeholder="Salary..."
                onChange={handleAddFormChange}
                className="form-control mb-2"
              />
              <Button
                variant=""
                className="btn btn-primary me-2 wd-100p "
                type="submit"
              >
                Add
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-primary wd-20p"
              onClick={() => setModalShow(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  const EditableRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
  }:any) => {
    return (
      <tr>
        <td>
          <Form.Control
            type="text"
            required
            placeholder="S NO"
            name="Sno"
            value={editFormData.sno}
            onChange={handleEditFormChange}
            className="border"
          ></Form.Control>
        </td>
        <td>
          <Form.Control
            type="text"
            required
            placeholder="Enter a name..."
            name="Name"
            value={editFormData.Name}
            onChange={handleEditFormChange}
            className="border"
          ></Form.Control>
        </td>
        <td>
          <Form.Control
            type="text"
            required
            placeholder="Enter an lastname..."
            name="lastname"
            value={editFormData.lastname}
            onChange={handleEditFormChange}
            className="border"
          ></Form.Control>
        </td>
        <td>
          <Form.Control
            type="text"
            required
            placeholder="Enter a phone number..."
            name="position"
            value={editFormData.position}
            onChange={handleEditFormChange}
            className="border"
          ></Form.Control>
        </td>
        <td>
          <Form.Control
            type="email"
            required
            placeholder="Enter an email..."
            name="email"
            value={editFormData.email}
            onChange={handleEditFormChange}
            className="border"
          ></Form.Control>
        </td>
        <td>
          <Form.Control
            type="salary"
            required
            placeholder="Salary..."
            name="salary"
            value={editFormData.salary}
            onChange={handleEditFormChange}
            className="border"
          ></Form.Control>
        </td>
        <td>
          <Button variant="" className="btn btn-primary me-1" type="submit">
            Save
          </Button>
          <Button
            variant=""
            className="btn btn-danger me-1"

            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </td>
      </tr>
    );
  };
  const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }:any) => {
    return (
      <tr>
        <td className="wd-5p text-center">{contact.sno}</td>
        <td>{contact.Name}</td>
        <td>{contact.lastname}</td>
        <td>{contact.position}</td>
        <td>{contact.email}</td>
        <td>{contact.salary}</td>
        <td>
          <Button
            variant=""
            className="btn btn-primary me-1"
            type="button"
            onClick={(event) => handleEditClick(event, contact)}
          >
            Edit
          </Button>
          <Button
            variant=""
            className="btn btn-danger me-1"
            type="button"
            onClick={() => handleDeleteClick(contact.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  };
//2

export const COLUMNS:any = [
  {
    Header: "Name",
    accessor: "Name",
    className: "wd-20p borderrigth",
  },
  {
    Header: "Position",
    accessor: "Position",
    className: "wd-25p borderrigth",
  },
  {
    Header: "Office",
    accessor: "Office",
    className: "wd-20p borderrigth",
  },
  {
    Header: "Age",
    accessor: "Age",
    className: "wd-15p borderrigth",
  },
  {
    Header: "Salary",
    accessor: "Salary",
    className: "wd-20p borderrigth",
  },
];
export const DATATABLE = [
  {
    Id: "1",
    Name: "Tiger Nixon",
    Position: "System Architect",
    Office: "Edinburgh",
    Age: "61",
    Salary: "$320,800",
  },
  {
    Id: "2",
    Name: "Garrett Winters",
    Position: "Accountant",
    Office: "Tokyo",
    Age: "63",
    Salary: "$170,750",
  },
  {
    Id: "3",
    Name: "Ashton Cox",
    Position: "Junior Technical Author",
    Office: "San Francisco",
    Age: "66",
    Salary: "$86,000",
  },
  {
    Id: "4",
    Name: "Cedric Kelly",
    Position: "Senior Javascript Developer",
    Office: "Edinburgh",
    Age: "22",
    Salary: "$433,060",
  },
  {
    Id: "5",
    Name: "Airi Satou",
    Position: "Accountant",
    Office: "Tokyo",
    Age: "33",
    Salary: "$162,700",
  },
  {
    Id: "6",
    Name: "Brielle Williamson",
    Position: "Integration Specialist",
    Office: "New York",
    Age: "61",
    Salary: "$372,000",
  },
  {
    Id: "7",
    Name: "Herrod Chandler",
    Position: "Sales Assistant",
    Office: "San Francisco",
    Age: "59",
    Salary: "$137,500",
  },
  {
    Id: "8",
    Name: "Rhona Davidson",
    Position: "Integration Specialist",
    Office: "Tokyo",
    Age: "55",
    Salary: "$327,900",
  },
  {
    Id: "9",
    Name: "Colleen Hurst",
    Position: "Javascript Developer",
    Office: "San Francisco",
    Age: "39",
    Salary: "$205,500",
  },
  {
    Id: "10",
    Name: "Sonya Frost",
    Position: "Software Engineer",
    Office: "Edinburgh",
    Age: "23",
    Salary: "$103,600",
  },
  {
    Id: "11",
    Name: "Jena Gaines",
    Position: "Office Manager",
    Office: "London",
    Age: "30",
    Salary: "$90,560",
  },
  {
    Id: "12",
    Name: "Quinn Flynn",
    Position: "Support Lead",
    Office: "Edinburgh",
    Age: "22",
    Salary: "$342,000",
  },
  {
    Id: "13",
    Name: "Charde Marshall",
    Position: "Regional Director",
    Office: "San Francisco",
    Age: "36",
    Salary: "$470,600",
  },
  {
    Id: "14",
    Name: "Haley Kennedy",
    Position: "Senior Marketing Designer",
    Office: "London",
    Age: "43",
    Salary: "$313,500",
  },
  {
    Id: "15",
    Name: "Tatyana Fitzpatrick",
    Position: "Regional Director",
    Office: "London",
    Age: "19",
    Salary: "$385,750",
  },
  {
    Id: "16",
    Name: "Michael Silva",
    Position: "Marketing Designer",
    Office: "London",
    Age: "66",
    Salary: "$198,500",
  },
  {
    Id: "17",
    Name: "Paul Byrd",
    Position: "Chief Financial Officer (CFO)",
    Office: "New York",
    Age: "64",
    Salary: "$725,000",
  },
  {
    Id: "18",
    Name: "Gloria Little",
    Position: "Systems Administrator",
    Office: "New York",
    Age: "59",
    Salary: "$237,500",
  },
  {
    Id: "19",
    Name: "Bradley Greer",
    Position: "Software Engineer",
    Office: "London",
    Age: "41",
    Salary: "$132,000",
  },
  {
    Id: "20",
    Name: "Dai Rios",
    Position: "Personnel Lead",
    Office: "Edinburgh",
    Age: "35",
    Salary: "$217,500",
  },
  {
    Id: "21",
    Name: "Jenette Caldwell",
    Position: "Development Lead",
    Office: "New York",
    Age: "30",
    Salary: "$345,000",
  },
  {
    Id: "22",
    Name: "Yuri Berry",
    Position: "Chief Marketing Officer (CMO)",
    Office: "New York",
    Age: "40",
    Salary: "$675,000",
  },
  {
    Id: "23",
    Name: "Caesar Vance",
    Position: "Pre-Sales Support",
    Office: "New York",
    Age: "21",
    Salary: "$106,450",
  },
  {
    Id: "24",
    Name: "Doris Wilder",
    Position: "Sales Assistant",
    Office: "Sidney",
    Age: "23",
    Salary: "$85,600",
  },
  {
    Id: "25",
    Name: "Angelica Ramos",
    Position: "Chief Executive Officer (CEO)",
    Office: "London",
    Age: "47",
    Salary: "$1,200,000",
  },
  {
    Id: "26",
    Name: "Gavin Joyce",
    Position: "Developer",
    Office: "Edinburgh",
    Age: "42",
    Salary: "$92,575",
  },
  {
    Id: "27",
    Name: "Jennifer Chang",
    Position: "Regional Director",
    Office: "Singapore",
    Age: "28",
    Salary: "$357,650",
  },
  {
    Id: "28",
    Name: "Brenden Wagner",
    Position: "Software Engineer",
    Office: "San Francisco",
    Age: "28",
    Salary: "$206,850",
  },
  {
    Id: "29",
    Name: "Fiona Green",
    Position: "Chief Operating Officer (COO)",
    Office: "San Francisco",
    Age: "48",
    Salary: "$850,000",
  },
  {
    Id: "30",
    Name: "Shou Itou",
    Position: "Regional Marketing",
    Office: "Tokyo",
    Age: "20",
    Salary: "$163,000",
  },
  {
    Id: "31",
    Name: "Michelle House",
    Position: "Integration Specialist",
    Office: "Sidney",
    Age: "37",
    Salary: "$95,400",
  },
  {
    Id: "32",
    Name: "Suki Burks",
    Position: "Developer",
    Office: "London",
    Age: "53",
    Salary: "$114,500",
  },
  {
    Id: "33",
    Name: "Prescott Bartlett",
    Position: "Technical Author",
    Office: "London",
    Age: "27",
    Salary: "$145,000",
  },
  {
    Id: "34",
    Name: "Gavin Cortez",
    Position: "Team Leader",
    Office: "San Francisco",
    Age: "22",
    Salary: "$235,500",
  },
  {
    Id: "35",
    Name: "Martena Mccray",
    Position: "Post-Sales support",
    Office: "Edinburgh",
    Age: "46",
    Salary: "$324,050",
  },
  {
    Id: "36",
    Name: "Unity Butler",
    Position: "Marketing Designer",
    Office: "San Francisco",
    Age: "47",
    Salary: "$85,675",
  },
  {
    Id: "37",
    Name: "Howard Hatfield",
    Position: "Office Manager",
    Office: "San Francisco",
    Age: "51",
    Salary: "$164,500",
  },
  {
    Id: "38",
    Name: "Hope Fuentes",
    Position: "Secretary",
    Office: "San Francisco",
    Age: "41",
    Salary: "$109,850",
  },
  {
    Id: "39",
    Name: "Vivian Harrell",
    Position: "Financial Controller",
    Office: "San Francisco",
    Age: "62",
    Salary: "$452,500",
  },
  {
    Id: "40",
    Name: "Timothy Mooney",
    Position: "Office Manager",
    Office: "London",
    Age: "37",
    Salary: "$136,200",
  },
  {
    Id: "41",
    Name: "Jackson Bradshaw",
    Position: "Director",
    Office: "New York",
    Age: "65",
    Salary: "$645,750",
  },
  {
    Id: "42",
    Name: "Olivia Liang",
    Position: "Support Engineer",
    Office: "Singapore",
    Age: "64",
    Salary: "$234,500",
  },
  {
    Id: "43",
    Name: "Bruno Nash",
    Position: "Software Engineer",
    Office: "London",
    Age: "38",
    Salary: "$163,500",
  },
  {
    Id: "44",
    Name: "Sakura Yamamoto",
    Position: "Support Engineer",
    Office: "Tokyo",
    Age: "37",
    Salary: "$139,575",
  },
  {
    Id: "45",
    Name: "Thor Walton",
    Position: "Developer",
    Office: "New York",
    Age: "61",
    Salary: "$98,540",
  },
  {
    Id: "46",
    Name: "Finn Camacho",
    Position: "Support Engineer",
    Office: "San Francisco",
    Age: "47",
    Salary: "$87,500",
  },
  {
    Id: "47",
    Name: "Serge Baldwin",
    Position: "Data Coordinator",
    Office: "Singapore",
    Age: "64",
    Salary: "$138,575",
  },
  {
    Id: "48",
    Name: "Zenaida Frank",
    Position: "Software Engineer",
    Office: "New York",
    Age: "63",
    Salary: "$125,250",
  },
  {
    Id: "49",
    Name: "Zorita Serrano",
    Position: "Software Engineer",
    Office: "San Francisco",
    Age: "56",
    Salary: "$115,000",
  },
  {
    Id: "50",
    Name: "Jennifer Acosta",
    Position: "Junior Javascript Developer",
    Office: "Edinburgh",
    Age: "43",
    Salary: "$75,650",
  },
  {
    Id: "51",
    Name: "Cara Stevens",
    Position: "Sales Assistant",
    Office: "New York",
    Age: "46",
    Salary: "$145,600",
  },
  {
    Id: "52",
    Name: "Hermione Butler",
    Position: "Regional Director",
    Office: "London",
    Age: "47",
    Salary: "$356,250",
  },
  {
    Id: "53",
    Name: "Lael Greer",
    Position: "Systems Administrator",
    Office: "London",
    Age: "21",
    Salary: "$103,500",
  },
  {
    Id: "54",
    Name: "Jonas Alexander",
    Position: "Developer",
    Office: "San Francisco",
    Age: "30",
    Salary: "$86,500",
  },
  {
    Id: "55",
    Name: "Shad Decker",
    Position: "Regional Director",
    Office: "Edinburgh",
    Age: "51",
    Salary: "$183,000",
  },
  {
    Id: "56",
    Name: "Michael Bruce",
    Position: "Javascript Developer",
    Office: "Singapore",
    Age: "29",
    Salary: "$183,000",
  },
  {
    Id: "57",
    Name: "Donna Snider",
    Position: "Customer Support",
    Office: "New York",
    Age: "27",
    Salary: "$112,000",
  },
  {
    Id: "58",
    Name: "Fiona Green",
    Position: "Chief Operating Officer (COO)",
    Office: "San Francisco",
    Age: "48",
    Salary: "$850,000",
  },
  {
    Id: "59",
    Name: "Shou Itou",
    Position: "Regional Marketing",
    Office: "Tokyo",
    Age: "20",
    Salary: "$163,000",
  },
  {
    Id: "60",
    Name: "Prescott Bartlett",
    Position: "Technical Author",
    Office: "London",
    Age: "27",
    Salary: "$145,000",
  },
];
export const TaskTable = () => {
  const tableInstance = useTable(
    {
      columns: COLUMNS,
      data: DATATABLE,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps, // table props from react-table
    headerGroups, // headerGroups, if your table has groupings
    getTableBodyProps, // table body props from react-table
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state,
    setGlobalFilter,
    page, // use, page or rows
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  }:any = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <div className="d-flex">
        <select
          className=" mb-4 selectpage border me-1"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()} className="table table-hover mb-0">
        <thead>
          {headerGroups.map((headerGroup:any) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
              {headerGroup.headers.map((column:any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={column.className} key={Math.random()}
                >
                  <span className="tabletitle">{column.render("Header")}</span>
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <i className="fa fa-angle-down"></i>
                      ) : (
                        <i className="fa fa-angle-up"></i>
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
          {page.map((row:any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={Math.random()}>
                {row.cells.map((cell:any) => {
                  return (
                    <td className="borderrigth" {...cell.getCellProps()} key={Math.random()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-block d-sm-flex mt-4 ">
        <span className="">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span className="ms-sm-auto ">
          <Button
            variant=""
            className="btn-default tablebutton me-2 d-sm-inline d-block my-1"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {" Previous "}
          </Button>
          <Button
            variant=""
            className="btn-default tablebutton me-2 my-1"
            onClick={() => {
              previousPage();
            }}
            disabled={!canPreviousPage}
          >
            {" << "}
          </Button>
          <Button
            variant=""
            className="btn-default tablebutton me-2 my-1"
            onClick={() => {
              previousPage();
            }}
            disabled={!canPreviousPage}
          >
            {" < "}
          </Button>
          <Button
            variant=""
            className="btn-default tablebutton me-2 my-1"
            onClick={() => {
              nextPage();
            }}
            disabled={!canNextPage}
          >
            {" > "}
          </Button>
          <Button
            variant=""
            className="btn-default tablebutton me-2 my-1"
            onClick={() => {
              nextPage();
            }}
            disabled={!canNextPage}
          >
            {" >> "}
          </Button>
          <Button
            variant=""
            className="btn-default tablebutton me-2 d-sm-inline d-block my-1"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {" Next "}
          </Button>
        </span>
      </div>
    </>
  );
};

//**** datatable ****//
export const COLUMNSS4 : any = [
  {
    Header: "FIRST NAME",
    accessor: "FNAME",
    className: "text-center wd-15p border-bottom-0",
  },
  {
    Header: "LAST NAME",
    accessor: "LNAME",
    className: "text-center wd-15p border-bottom-0 ",

  },
  {
    Header: "POSITION",
    accessor: "POSITION",
    className: "text-center wd-15p border-bottom-0 ",
  },
  {
    Header: "	START DATE",
    accessor: "START",
    className: "text-center wd-15p border-bottom-0 ",
  },
  {
    Header: "SALARY",
    accessor: "SALARY",
    className: "text-center wd-15p border-bottom-0 ",
  },
  {
    Header: "E-MAIL",
    accessor: "MAIL",
    className: "text-center wd-15p border-bottom-0 ",
  }

];

export const DATATABLE4 = [
  {
    FNAME: 'Bella',
    LNAME: 'Chloe',
    POSITION: 'System Developer',
    START: '2018/03/12',
    SALARY: '$654,765',
    MAIL: 'b.Chloe@datatables.net',
  },
  {
    FNAME: 'Donna',
    LNAME: 'Bond',
    POSITION: 'Account Manager',
    START: '2012/02/21',
    SALARY: '$543,654',
    MAIL: 'd.bond@datatables.net',
  },
  {
    FNAME: 'Harry',
    LNAME: 'Carr',
    POSITION: 'Technical Manager',
    START: '20011/02/87',
    SALARY: '$86,000',
    MAIL: 'h.carr@datatables.net',
  },
  {
    FNAME: 'Lucas',
    LNAME: 'Dyer',
    POSITION: 'Javascript Developer',
    START: '2014/08/23',
    SALARY: '$456,123',
    MAIL: 'l.dyer@datatables.net',
  },
  {
    FNAME: 'Karen',
    LNAME: 'Hill',
    POSITION: 'Sales Manager',
    START: '2010/7/14',
    SALARY: '$432,230',
    MAIL: 'k.hill@datatables.net',
  },
  {
    FNAME: 'Dominic',
    LNAME: 'Hudson',
    POSITION: 'Sales Assistant',
    START: '2015/10/16',
    SALARY: '$654,300',
    MAIL: 'd.hudson@datatables.net',
  },
  {
    FNAME: 'Herrod',
    LNAME: 'Chandler',
    POSITION: 'Integration Specialist',
    START: '2012/08/06',
    SALARY: '$137,500',
    MAIL: 'h.chandler@datatables.net',
  },
  {
    FNAME: 'Jonathan',
    LNAME: 'Ince',
    POSITION: 'junior Manager',
    START: '2012/11/23',
    SALARY: '$345,789',
    MAIL: 'j.ince@datatables.net',
  },
  {
    FNAME: "Leonard",
    LNAME: "Ellison",
    POSITION: "Junior Javascript Developer",
    START: "2010/03/19",
    SALARY: "$205,500",
    MAIL: "l.ellison@datatables.net",
  },
  {
    FNAME: "Madeleine",
    LNAME: "Lee",
    POSITION: "Software Developer",
    START: "20015/8/23",
    SALARY: "$456,890",
    MAIL: "m.lee@datatables.net",
  },
  {
    FNAME: "Karen",
    LNAME: "Miller",
    POSITION: "Office Director",
    START: "2012/9/25",
    SALARY: "$87,654",
    MAIL: "k.miller@datatables.net",
  },
  {
    FNAME: "Lisa",
    LNAME: "Smith",
    POSITION: "Support Lead",
    START: "2011/05/21",
    SALARY: "$342,000",
    MAIL: "l.simth@datatables.net",
  },
  {
    FNAME: "Morgan",
    LNAME: "Keith",
    POSITION: "Accountant",
    START: "2012/11/27",
    SALARY: "$675,245",
    MAIL: "m.keith@datatables.net",
  },
  {
    FNAME: "Nathan",
    LNAME: "Mills",
    POSITION: "Senior Marketing Designer",
    START: "2014/10/8",
    SALARY: "$765,980",
    MAIL: "n.mills@datatables.net",
  },
  {
    FNAME: "Ruth",
    LNAME: "May",
    POSITION: "office Manager",
    START: "2010/03/17",
    SALARY: "$654,765",
    MAIL: "r.may@datatables.net",
  },
  {
    FNAME: "Penelope",
    LNAME: "Ogden",
    POSITION: "Marketing Manager",
    START: "2013/5/22",
    SALARY: "$345,510",
    MAIL: "p.ogden@datatables.net",
  },
  {
    FNAME: "Sean",
    LNAME: "Piper",
    POSITION: "Financial Officer",
    START: "2014/06/11",
    SALARY: "$725,000",
    MAIL: "s.piper@datatables.net",
  },
  {
    FNAME: "Trevor",
    LNAME: "Ross",
    POSITION: "Systems Administrator",
    START: "2011/05/23",
    SALARY: "$237,500",
    MAIL: "t.ross@datatables.net",
  },
  {
    FNAME: "Vanessa",
    LNAME: "Robertson",
    POSITION: "Software Designer",
    START: "2014/6/23",
    SALARY: "$765,654",
    MAIL: "v.robertson@datatables.net",
  },
  {
    FNAME: "Una",
    LNAME: "Richard",
    POSITION: "Personnel Manager",
    START: "2014/5/22",
    SALARY: "$765,290",
    MAIL: "u.richard@datatables.net",
  },
  {
    FNAME: "Justin",
    LNAME: "Peters",
    POSITION: "Development lead",
    START: "2013/10/23",
    SALARY: "$765,654",
    MAIL: "j.peters@datatables.net",
  },
  {
    FNAME: "Adrian",
    LNAME: "Terry",
    POSITION: "Marketing Officer",
    START: "2013/04/21",
    SALARY: "$543,769",
    MAIL: "a.terry@datatables.net",
  },
  {
    FNAME: "Cameron",
    LNAME: "Watson",
    POSITION: "Sales Support",
    START: "2013/9/7",
    SALARY: "$675,876",
    MAIL: "c.watson@datatables.net",
  },
  {
    FNAME: "Evan",
    LNAME: "Terry",
    POSITION: "Sales Manager",
    START: "2013/10/26",
    SALARY: "$66,340",
    MAIL: "d.terry@datatables.net",
  },
  {
    FNAME: "Angelica",
    LNAME: "Ramos",
    POSITION: "Chief Executive Officer",
    START: "20017/10/15",
    SALARY: "$6,234,000",
    MAIL: "a.ramos@datatables.net",
  },
  {
    FNAME: "Connor",
    LNAME: "Johne",
    POSITION: "Web Developer",
    START: "2011/1/25",
    SALARY: "$92,575",
    MAIL: "C.johne@datatables.net",
  },
  {
    FNAME: "Jennifer",
    LNAME: "Chang",
    POSITION: "Regional Director",
    START: "2012/17/11",
    SALARY: "$546,890",
    MAIL: "j.chang@datatables.net",
  },
  {
    FNAME: "Brenden",
    LNAME: "Wagner",
    POSITION: "Software Engineer",
    START: "2013/07/14",
    SALARY: "$206,850",
    MAIL: "b.wagner@datatables.net",
  },
  {
    FNAME: "Fiona",
    LNAME: "Green",
    POSITION: "Chief Operating Officer",
    START: "2015/06/23",
    SALARY: "$345,789",
    MAIL: "f.green@datatables.net",
  },
  {
    FNAME: "Shou",
    LNAME: "Itou",
    POSITION: "Regional Marketing",
    START: "2013/07/19",
    SALARY: "$335,300",
    MAIL: "s.itou@datatables.net",
  },
  {
    FNAME: "Michelle",
    LNAME: "House",
    POSITION: "Integration Specialist",
    START: "2016/07/18",
    SALARY: "$76,890",
    MAIL: "m.house@datatables.net",
  },
];
export const Datatable = () => {

  const tableInstance: any= useTable(
    {
      columns: COLUMNSS4,
      data: DATATABLE4,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps, // table props from react-table
    headerGroups, // headerGroups, if your table has groupings
    getTableBodyProps, // table body props from react-table
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state,
    setGlobalFilter,
    page, // use, page or rows
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <Col lg={12} xl={12} >
        <InputGroup className="mb-2">
          <GlobalFilter1 filter={globalFilter} setFilter={setGlobalFilter} />
          <InputGroup.Text className="btn btn-primary">
            <i className="fa fa-search" aria-hidden="true"></i>
          </InputGroup.Text>
        </InputGroup>
        <Card>
          <Card.Header className="border-bottom-0 d-block d-sm-flex">
            <Card.Title>1 - 30 of 546 users</Card.Title>
            <div className="page-options ms-auto">
              <Form.Select className="form-control select2 w-100">
                <option value="asc">Latest</option>
                <option value="desc">Oldest</option>
              </Form.Select>
            </div>
          </Card.Header>
          <div className="e-table">
            <div className="table-responsive ">

              <div className="d-flex">
                <select
                  className="mb-6 table-border me-1"
                  value={pageSize}
                  // onClick={()=>{getRandomUppercaseChar()}}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {[10, 25, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>

              </div>
              <table
                {...getTableProps()}
                className="table table-bordered text-nowrap mb-0"
              >
                <thead>
                  {headerGroups.map((headerGroup:any) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
                      {headerGroup.headers.map((column:any) => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          className={column.className} key={Math.random()}
                        >
                          <span className="tabletitle">{column.render("Header")}</span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row:any) => {
                    prepareRow(row);
                    return (
                      <tr className="text-center" {...row.getRowProps()} key={Math.random()}>
                        {row.cells.map((cell:any) => {
                          return (
                            <td {...cell.getCellProps()} key={Math.random()}>{cell.render("Cell")}</td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="d-flex mt-4 align-items-center">
                <span className="">
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{" "}
                </span>
                <span className="ms-auto ps-2">
                  <Button
                    variant=""
                    className="btn-default tablebutton me-2 my-2"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    {" Previous "}
                  </Button>
                  <Button
                    variant=""
                    className="btn-default tablebutton me-2 my-2"
                    onClick={() => {
                      previousPage();
                    }}
                    disabled={!canPreviousPage}
                  >
                    {" << "}
                  </Button>
                  <Button
                    variant=""
                    className="btn-default tablebutton me-2 my-2"
                    onClick={() => {
                      previousPage();
                    }}
                    disabled={!canPreviousPage}
                  >
                    {" < "}
                  </Button>
                  <Button
                    variant=""
                    className="btn-default tablebutton me-2 my-2"
                    onClick={() => {
                      nextPage();
                    }}
                    disabled={!canNextPage}
                  >
                    {" > "}
                  </Button>
                  <Button
                    variant=""
                    className="btn-default tablebutton me-2 my-2"
                    onClick={() => {
                      nextPage();
                    }}
                    disabled={!canNextPage}
                  >
                    {" >> "}
                  </Button>
                  <Button
                    variant=""
                    className="btn-default tablebutton me-2 my-2"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    {" Next "}
                  </Button>
                </span>
              </div>
            </div>
          </div>
        </Card>

      </Col>

    </>
  );
};
const GlobalFilter1 = ({ filter, setFilter }:any) => {
  return (
    <input
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
      className="form-control"
      placeholder="Search..."
    />
  );
};

//
export const COLUMNS5 : any = [
  {
    Header: "S NO",
    accessor: "SNO",
    className: "text-center ",

  },
  {
    Header: "Photo",
    accessor: "PHOTO",
    className: "text-center ",

  },
  {
    Header: "Name",
    accessor: "NAME",
    className: "text-center ",
  },
  {
    Header: "Role",
    accessor: "ROLE",
    className: "text-center ",
  },
  {
    Header: "Last Active",
    accessor: "LAST",
    className: "text-center ",
  },
  {
    Header: "Country",
    accessor: "COUNTRY",
    className: "text-center ",
  },
  {
    Header: "Verification",
    accessor: "BADGE",
    className: "text-center ",
  },
  {
    Header: "Joined Date",
    accessor: "DATE",
    className: "text-center ",
  },
  {
    Header: "Action",
    accessor: "ACTION",
    className: "text-center ",
  },

];

export const DATATABLE5 = [
  {
    SNO: <Form.Check className='align-middle ' />,
    ACTION: <span className="text-center align-middle">
      <ButtonGroup size="sm" className='flex-nowrap' >
        <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
          <Button>Edit</Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
          <Button>
            <i className="fa fa-trash"></i>
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </span>,
    PHOTO: <img src={imagesData("female4")} className="avatar avatar-md br-7" alt="" />,
    NAME: "Adam Cotter",
    ROLE: "Architect",
    LAST: <span className="badge bg-light text-muted tx-13">20 days ago</span>,
    COUNTRY: "France",
    BADGE:<span className="badge font-weight-semibold bg-success-transparent text-success tx-11">Verified</span>,
    DATE: "	09 Dec 2017",

  },
  {
    SNO: <Form.Check className='align-middle ' />,
    ACTION: <span className="text-center align-middle">
      <ButtonGroup size="sm" className='flex-nowrap'>
        <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
          <Button>Edit</Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
          <Button>
            <i className="fa fa-trash"></i>
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </span>,
    PHOTO: <img src={imagesData('female7')} className="avatar avatar-md br-7" alt="" />,
    NAME: "Pauline Noble",
    ROLE: "Senior Javascript Developer",
    LAST: <span className="badge bg-light text-muted tx-13">36 mins ago</span>,
    COUNTRY: "Columbia",
    BADGE:<span className="badge font-weight-semibold bg-danger-transparent text-danger tx-11"> Not Verified</span>,
    DATE: "	26 Jan 2018",
  },
  {
    SNO: <Form.Check className='align-middle ' />,
    ACTION: <span className="text-center align-middle">
      <ButtonGroup size="sm" className='flex-nowrap' >
        <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
          <Button>Edit</Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
          <Button>
            <i className="fa fa-trash"></i>
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </span>,
    PHOTO: <img src={imagesData('female8')} className="avatar avatar-md br-7" alt="" />,
    NAME: "Sherilyn Metzel",
    ROLE: "Accountant",
    LAST:<span className="badge bg-light text-muted tx-13">11 hrs ago</span>,
    COUNTRY: "Spain",
    BADGE:<span className="badge font-weight-semibold bg-success-transparent text-success tx-11">Verified</span>,
    DATE: "	27 Jan 2018",

  },
  {
    SNO: <Form.Check className='align-middle ' />,
    ACTION: <span className="text-center align-middle">
      <ButtonGroup size="sm" className='flex-nowrap' >
        <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
          <Button>Edit</Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
          <Button>
            <i className="fa fa-trash"></i>
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </span>,
    PHOTO: <img src={imagesData('female9')} className="avatar avatar-md br-7" alt="" />,
    NAME: "Terrie Boaler",
    ROLE: "Integration Specialist",
    LAST:<span className="badge bg-light text-muted tx-13">21 hrs ago</span>,
    COUNTRY: "Bermuda",
    BADGE:<span className="badge font-weight-semibold bg-success-transparent text-success tx-11">Verified</span>,
    DATE: "	20 Jan 2018",
  },
  {
    SNO: <Form.Check className='align-middle ' />,
    ACTION: <span className="text-center align-middle">
      <ButtonGroup size="sm" className='flex-nowrap' >
        <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
          <Button>Edit</Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
          <Button>
            <i className="fa fa-trash"></i>
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </span>,
    PHOTO: <img src={imagesData('female11')} className="avatar avatar-md br-7" alt="" />,
    NAME: "Rutter Pude",
    ROLE: "Integration Specialist",
    LAST: <span className="badge bg-light text-muted tx-13">14 mins ago</span>,
    COUNTRY: "Portugal",
    BADGE:<span className="badge font-weight-semibold bg-success-transparent text-success tx-11">Verified</span>,
    DATE: "13 Jan 2018",

  },
  {
    SNO: <Form.Check className='align-middle ' />,
    ACTION: <span className="text-center align-middle">
      <ButtonGroup size="sm" className='flex-nowrap' >
        <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
          <Button>Edit</Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
          <Button>
            <i className="fa fa-trash"></i>
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </span>,
    PHOTO: <img src={imagesData('female4')} className="avatar avatar-md br-7" alt="" />,
    NAME: "Clifford Benjamin",
    ROLE: "Software Engineer",
    LAST:<span className="badge bg-light text-muted tx-13">19 hrs ago</span>,
    COUNTRY: "India",
    BADGE:<span className="badge font-weight-semibold bg-success-transparent text-success tx-11">Verified</span>,
    DATE: "25 Jan 2018",

  },
  {
    SNO: <Form.Check className='align-middle ' />,
    ACTION: <span className="text-center align-middle">
      <ButtonGroup size="sm" className='flex-nowrap' >
        <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
          <Button>Edit</Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
          <Button>
            <i className="fa fa-trash"></i>
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </span>,
    PHOTO: <img src={imagesData('female14')} className="avatar avatar-md br-7" alt="" />,
    NAME: "Thedric Romans",
    ROLE: "Office Manager",
    LAST: <span className="badge bg-light text-muted tx-13">15 days ago</span>,
    COUNTRY: "Romania",
    BADGE:<span className="badge font-weight-semibold bg-danger-transparent text-danger tx-11">Not Verified</span>,
    DATE: "	12 Jan 2018",
  },
  {
    SNO: <Form.Check className='align-middle ' />,
    ACTION: <span className="text-center align-middle">
      <ButtonGroup size="sm" className='flex-nowrap' >
        <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
          <Button>Edit</Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
          <Button>
            <i className="fa fa-trash"></i>
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </span>,
    PHOTO: <img src={imagesData('female15')} className="avatar avatar-md br-7" alt="" />,
    NAME: "Haily Carthew",
    ROLE: "Support Lead",
    LAST: <span className="badge bg-light text-muted tx-13">1 month ago</span>,
    COUNTRY: "Japan",
    BADGE:<span className="badge font-weight-semibold bg-success-transparent text-success tx-11">Verified</span>,
    DATE: "	27 Jan 2018",

  },
  {
    SNO: <Form.Check className='align-middle ' />,
    ACTION: <span className="text-center align-middle">
      <ButtonGroup size="sm" className='flex-nowrap' >
        <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
          <Button>Edit</Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
          <Button>
            <i className="fa fa-trash"></i>
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </span>,
    PHOTO: <img src={imagesData('female11')} className="avatar avatar-md br-7" alt="" />,
    NAME: "Dorothea Joicey",
    ROLE: "Regional Director",
    LAST:<span className="badge bg-light text-muted tx-13">2 days ago</span>,
    COUNTRY: "Mexico",
    BADGE:<span className="badge font-weight-semibold bg-success-transparent text-success tx-11">Verified</span>,
    DATE: "	12 Dec 2017",

  },
  {
    SNO: <Form.Check className='align-middle ' />,
    ACTION: <span className="text-center align-middle">
      <ButtonGroup size="sm" className='flex-nowrap' >
        <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
          <Button>Edit</Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
          <Button>
            <i className="fa fa-trash"></i>
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </span>,
    PHOTO: <img src={imagesData('female4')} className="avatar avatar-md br-7" alt="" />,
    NAME: "Mikaela Pinel",
    ROLE: "Senior Marketing Designer",
    LAST: <span className="badge bg-light text-muted tx-13">12 mins ago</span>,
    COUNTRY: "Italy",
    BADGE:<span className="badge font-weight-semibold bg-success-transparent text-success tx-11">Verified</span>,
    DATE: "10 Dec 2017",

  },
  {
    SNO: <Form.Check className='align-middle ' />,
    ACTION: <span className="text-center align-middle">
      <ButtonGroup size="sm" className='flex-nowrap' >
        <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
          <Button>Edit</Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
          <Button>
            <i className="fa fa-trash"></i>
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </span>,
    PHOTO: <img src={imagesData('female7')} className="avatar avatar-md br-7" alt="" />,
    NAME: "Donnell Farries",
    ROLE: "Front end Designer",
    LAST:<span className="badge bg-light text-muted tx-13">20 days ago</span>,
    COUNTRY: "Greece",
    BADGE:<span className="badge font-weight-semibold bg-success-transparent text-success tx-11">Verified</span>,
    DATE: "	03 Dec 2017",
  },
  {
    SNO: <Form.Check className='align-middle ' />,
    ACTION: <span className="text-center align-middle">
      <ButtonGroup size="sm" className='flex-nowrap' >
        <OverlayTrigger placement="top" overlay={<Tooltip >Edit</Tooltip>}>
          <Button>Edit</Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip >Delete</Tooltip>}>
          <Button>
            <i className="fa fa-trash"></i>
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </span>,
    PHOTO: <img src={imagesData('female15')} className="avatar avatar-md br-7" alt="" />,
    NAME: "Letizia Puncher",
    ROLE: "Junior Technical Author",
    LAST: <span className="badge bg-light text-muted tx-13">1 month ago</span>,
    COUNTRY: "Texas",
    BADGE:<span className="badge font-weight-semibold bg-success-transparent text-success tx-11">Verified</span>,
    DATE: "09 Dec 2017",
  },
];
const GlobalFilter2 = ({ filter, setFilter }:any) => {
  return (
    <input
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
      className="form-control"
      placeholder="Search..."
    />
  );
};
export const UserList = () => {

  const tableInstance: any= useTable(
    {
      columns: COLUMNS5,
      data: DATATABLE5,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps, // table props from react-table
    headerGroups, // headerGroups, if your table has groupings
    getTableBodyProps, // table body props from react-table
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state,
    setGlobalFilter,
    page, // use, page or rows
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
    <Row>
      <Col lg={12} xl={12} >
      <InputGroup className="mb-2">
          <GlobalFilter2 filter={globalFilter} setFilter={setGlobalFilter} />
          <InputGroup.Text className="btn btn-primary">
            <i className="fa fa-search" aria-hidden="true"></i>
          </InputGroup.Text>
        </InputGroup>
      <Card>
          <Card.Header className="border-bottom-0 p-4 d-flex justify-content-between">
            <Card.Title className="tx-13">1 - 30 of 546 users</Card.Title>
            <div className="d-flex">
                <select
                  className="mb-6 table-border me-1"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {[10, 25, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>

              </div>
          </Card.Header>
          <Card.Body>
          <div className="e-table pb-5">
            <div className="table-responsive ">
              <table
                {...getTableProps()}
                className="table table-bordered text-nowrap mb-0"
              >
                <thead>
                  {headerGroups.map((headerGroup:any) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
                      {headerGroup.headers.map((column:any) => (
                        <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          className={column.className} key={Math.random()}
                        >
                          <span className="tabletitle">{column.render("Header")}</span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row:any) => {
                    prepareRow(row);
                    return (
                      <tr className="text-center" {...row.getRowProps()} key={Math.random()}>
                        {row.cells.map((cell:any) => {
                          return (
                            <td {...cell.getCellProps()} key={Math.random()}>{cell.render("Cell")}</td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="d-flex mt-4 align-items-center">
                <span className="">
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{" "}
                </span>
                <span className="ms-auto ps-2">
                  <Button
                    variant=""
                    className="btn-default tablebutton me-2 my-2"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    {" Previous "}
                  </Button>
                  <Button
                    variant=""
                    className="btn-default tablebutton me-2 my-2"
                    onClick={() => {
                      previousPage();
                    }}
                    disabled={!canPreviousPage}
                  >
                    {" << "}
                  </Button>
                  <Button
                    variant=""
                    className="btn-default tablebutton me-2 my-2"
                    onClick={() => {
                      previousPage();
                    }}
                    disabled={!canPreviousPage}
                  >
                    {" < "}
                  </Button>
                  <Button
                    variant=""
                    className="btn-default tablebutton me-2 my-2"
                    onClick={() => {
                      nextPage();
                    }}
                    disabled={!canNextPage}
                  >
                    {" > "}
                  </Button>
                  <Button
                    variant=""
                    className="btn-default tablebutton me-2 my-2"
                    onClick={() => {
                      nextPage();
                    }}
                    disabled={!canNextPage}
                  >
                    {" >> "}
                  </Button>
                  <Button
                    variant=""
                    className="btn-default tablebutton me-2 my-2"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    {" Next "}
                  </Button>
                </span>
              </div>
            </div>
          </div>
          </Card.Body>

        </Card>

      </Col>
      </Row>

    </>
  );
};
