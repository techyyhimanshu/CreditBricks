
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import { Link } from "react-router-dom";

export default function PropertyMaster() {



  const columns = [
    {
      name: 'S.No.',
      selector: (row: Row) => row.sno,
      sortable: true,

    },

    {
      name: 'Property Name',
      cell: (row: Row) => (
        <Link to={`${import.meta.env.BASE_URL}property/propertyview`} className='text-info'>A101</Link>
      ),
      sortable: true,
    },
    {
      name: 'Member Name',
      cell: (row: Row) => (
        <Link to={``} className='text-info'>Mr. Vinod Kunar</Link>
      ),
      sortable: true,
    },
    {
      name: 'Society',
      cell: (row: Row) => (
        <Link to={``} className='text-info'>Mohan Areca Co-Op Housing Society Limited</Link>
      ),
      sortable: true,
    },
    {
      name: 'Flat No.',
      selector: (row: Row) => row.flatno,
      sortable: true,
    },
    {
      name: 'Wing',
      cell: (row: Row) => (
        <Link to={``} className='text-info'>A</Link>
      ),
      sortable: true,
    },

    {
      name: 'Action',
      sortable: true,
      cell: (row: Row) => (
        <Dropdown >
        <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
         Action
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
</Dropdown.Menu>
      </Dropdown>
      ),
    },
  ]

  const propertydata = [

    {
      id: 1,
      sno: '1',
      flatno: '101'

    },
    {
      id: 2,
      sno: '2',
      flatno: '101'

    },
    {
      id: 3,
      sno: '3',
      flatno: '101'

    },

  ]

  const tableData = {
    columns,
    data: propertydata
  };






  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Property Master</span>
        </div>

        <div className="right-content">
<Link to={`${import.meta.env.BASE_URL}property/addpropertymaster`} className="btn btn-primary p-1 pe-2 ps-2 me-1"><i className="bi bi-plus"></i> Add Property</Link>

        </div>
      </div>

      <Row>
        <Col xl={12}>
          <Card>
            <Card.Body>

              <div className="table-responsive ">
                <DataTableExtensions {...tableData}>
                  <DataTable
                    columns={columns}
                    data={propertydata}
                    pagination
                    keyField="id"
                  />
                </DataTableExtensions>
              </div>



            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Fragment >
  );
}
