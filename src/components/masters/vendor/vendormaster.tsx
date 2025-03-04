
import { Fragment} from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";

const columns = [
  {
    name: 'S.no',
    selector: row => row.sno,
    sortable: true,
    width: '76px'
  },
  {
    name: 'Vendor Name',
    cell: () => <Link to={`${import.meta.env.BASE_URL}vendor/vendorview`} className="text-info">Himanshu Bansal </Link>,
    sortable: true,
  },
  {
    name: 'Product',
    selector: row => row.product,
    sortable: true,
  },

  {
    name: 'Service Type',
    selector: row => row.servicetype,
    sortable: true,
    width:"110px"
  },

  {
    name: 'Frequency',
    selector: row => row.frequency,
    sortable: true,
    width:"130px"
  },

  {
    name: 'Contact Person Name',
    selector: row => row.contactpersonname,
    sortable: true,
  },


  {
    name: 'Contact Person Number',
    selector: row => row.contactpersonnumber,
    sortable: true,
  },


  {
    name: 'Action',
    sortable: true,
    cell: () => <Dropdown>
    <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
     Action
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item>Edit</Dropdown.Item>
      <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
</Dropdown.Menu>
  </Dropdown>,
  },
];

const data = [
  {
    id: 1,
    sno: '1',
    name: '',
    product: 'Lift',
    servicetype: 'AMC',
    frequency: 'Quarterly',
    contactpersonname: 'Rakesh Kumar',
    contactpersonnumber: '9876543212',

  },
  {
    id: 2,
    sno: '2',
    name: '',
    product: 'Lift',
    servicetype: 'AMC',
    frequency: 'Quarterly',
    contactpersonname: 'Rakesh Kumar',
    contactpersonnumber: '9876543212',

  },
  {
    id: 3,
    sno: '3',
    name: '',
    product: '',
    servicetype: '',
    frequency: '',
    contactpersonname: '',
    contactpersonnumber: '',


  },
  {
    id: 4,
    sno: '4',
    name: '',
    product: '',
    servicetype: '',
    frequency: '',
    contactpersonname: '',
    contactpersonnumber: '',

  }

]

export default function VendorMaster() {

  const tableData = {
    columns,
    data,

  };


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> Vendor Master</span>
        </div>
        <div className="right-content">
        <Link to={`${import.meta.env.BASE_URL}vendor/addvendormaster`} className='float-end btn btn-primary btn-sm'><i className="bi bi-plus"></i> Add Vendor</Link>


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
                        data={data}
                        pagination


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