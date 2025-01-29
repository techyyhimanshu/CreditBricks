import { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { Col, Row, Card, Modal, Button, Form, Tab, Tabs } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { imagesData } from "../../common/commonimages";


const columns = [
  {
    name: 'First Name',
    selector: row => row.Fname,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.Lname,
    sortable: true,
  },
  {
    name: 'Mobile No',
    selector: row => row.mobileno,
    sortable: true,
  },

  {
    name: 'Email Id',
    selector: row => row.emailid,
    sortable: true,
  },

  {
    name: 'Roles',
    selector: row => row.roles,
    sortable: true,
  },

  {
    name: 'Status',
    selector: row => row.status,
    sortable: true,
  },

  {
    name: 'Action',
    sortable: true,
    cell: () => <div><button type="button" className="btn btn-light btn-sm">Edit</button><button type="button" className="btn bg-info-transparent ms-2 btn-sm">Delete</button></div>,

  },
];

const data = [
  {
    id: 1,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'SuperAdmin',
    status: 'Active'


  },
  {
    id: 2,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'Admin',
    status: 'Active'
  },
  {
    id: 3,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'SuperAdmin',
    status: 'Active'
  },
  {
    id: 4,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'SuperAdmin',
    status: 'Active'
  },
  {
    id: 5,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'SuperAdmin',
    status: 'Active'
  },
  {
    id: 6,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'SuperAdmin',
    status: 'Active'
  },
  {
    id: 7,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'SuperAdmin',
    status: 'Active'
  },
  {
    id: 8,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'SuperAdmin',
    status: 'Active'
  },
]



export default function Users() {


  const countryoption = [
    { value: "1", label: "India" },

  ];

  const stateoption = [
    { value: "1", label: "Delhi" },

  ];

  const cityoption = [
    { value: "1", label: "Delhi" },

  ];
  const Recordtype = [
    { value: "1", label: "Member" },

  ];


  const [select, setSelect] = useState(false);

  const tableData = {
    columns,
    data
  };



  const viewDemoShow = (modal: any) => {
    switch (modal) {

      case "select":
        setSelect(true);
        break;


    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {

      case "select":
        setSelect(false);
        break;
    }
  };


  const roletype = [
    { value: "1", label: "Super Admin" },
    { value: "2", label: "Admin" }
  ];


  const membertype = [
    { value: "1", label: "Club" },
    { value: "2", label: "Swimming Pull" }
  ];

  const narration = [
    { value: "1", label: "2BHK" },
    { value: "2", label: "3BHK" }
  ];

  const propertystatus = [
    { value: "1", label: "Occupied" },
    { value: "2", label: "Unoccupied" }
  ];

  const loantype = [
    { value: "1", label: "Home" },
    { value: "2", label: "Vehicle" }
  ];

  const vehicletype = [
    { value: "1", label: "2W" },
    { value: "2", label: "4W" }
  ];


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Flat Master</span>
        </div>

        <div className="right-content">

          <button type="button" className="btn btn-primary p-1 pe-2 ps-2 me-1" onClick={() => viewDemoShow("select")}><i className="bi bi-plus"></i> Add User</button>
          <Modal show={select} centered size='xl' >
            <Modal.Header>
              <Modal.Title>Add User</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("select"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body className='usertab pb-0'>
            <Tabs
                defaultActiveKey="Personal"
                id="uncontrolled-tab-example"
                className="panel-tabs main-nav-line bd-b-1"
                transition={false}
              >

                <Tab eventKey="Personal" title="Personal" className='pt-1'>


<Row>
<Col xl={4}>
<Form.Group className="form-group">
  <Form.Label>UserName <span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='Username' className='form-control'></Form.Control>
</Form.Group>
</Col>
<Col xl={4}>
<Form.Group className="form-group">
  <Form.Label>Password<span className="text-danger">*</span></Form.Label>
  <Form.Control type='password' placeholder='First Name' className='form-control'></Form.Control>
</Form.Group>
</Col>
<Col xl={4}></Col>
<Col xl={4}>
  <Form.Group className="form-group">
  <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='First Name' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={4}>
  <Form.Group className="form-group">
  <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='Last Name' className='form-control'></Form.Control>
</Form.Group>
  </Col>



  <Col xl={4}>
  <Form.Group className="form-group">
  <Form.Label>Email <span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='Email' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={4}>
  <Form.Group className="form-group">
  <Form.Label>Mobile No. <span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='Mobileno' className='form-control'></Form.Control>
</Form.Group>
  </Col>
  <Col xl={4}>
  <Form.Group className="form-group">
  <Form.Label>Alternative Mobile No. <span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='Mobileno' className='form-control'></Form.Control>
</Form.Group>
  </Col>
  <Col xl={4}>
  <Form.Group className="form-group">
  <Form.Label>Date of Birth <span className="text-danger">*</span></Form.Label>
  <Form.Control type='date' placeholder='dd/mm/yyyy' className='form-control'></Form.Control>
</Form.Group>
  </Col>
  <Col xl={4}>
  <Form.Group className="form-group">
  <Form.Label>Anniversary <span className="text-danger">*</span></Form.Label>
  <Form.Control type='date' placeholder='dd/mm/yyyy' className='form-control'></Form.Control>
</Form.Group>
  </Col>
  <Col xl={4}>
  <Form.Group className="form-group">
  <Form.Label>Record Type<span className="text-danger">*</span></Form.Label>
  <div className="SlectBox">
      <Select
         options={Recordtype}
        placeholder="Select Type"
        // classNamePrefix="selectform"
        classNamePrefix='Select2' className="multi-select"
      />
    </div>
</Form.Group>
  </Col>

  <Col xl={4}>
  <Form.Group className="form-group">
  <Form.Label>Member Type<span className="text-danger">*</span></Form.Label>
  <div className="SlectBox">
      <Select
         options={membertype}
        placeholder="Select type"
        // classNamePrefix="selectform"
        classNamePrefix='Select2' className="multi-select"
      />
    </div>
</Form.Group>
  </Col>
  <Col xl={4}>
  <Form.Group className="form-group">
  <Form.Label>Country <span className="text-danger">*</span></Form.Label>

  <div className=" SlectBox">
      <Select
         options={countryoption}
        placeholder="Country"
        // classNamePrefix="selectform"
        classNamePrefix='Select2' className="multi-select"
      />
    </div>

</Form.Group>
</Col>
<Col xl={4}>
<Form.Group className="form-group">
  <Form.Label>State <span className="text-danger">*</span></Form.Label>
  <div className=" SlectBox">
      <Select
         options={stateoption}
        placeholder="State"
        // classNamePrefix="selectform"
        classNamePrefix='Select2' className="multi-select"
      />
    </div>
</Form.Group>
</Col>
<Col xl={4}>
<Form.Group className="form-group">
  <Form.Label>City <span className="text-danger">*</span></Form.Label>
  <div className=" SlectBox">
      <Select
         options={cityoption}
        placeholder="City"
        // classNamePrefix="selectform"
        classNamePrefix='Select2' className="multi-select"
      />
    </div>
</Form.Group>
</Col>
<Col xl={4}>
<Form.Group className="form-group">
  <Form.Label>Zipcode <span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='Zipcode' className='form-control'></Form.Control>
</Form.Group>

</Col>

<Col xl={4}>
  <Form.Group className="form-group">
  <Form.Label>Address<span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='Mobileno' className='form-control'></Form.Control>
</Form.Group>
  </Col>
  <Col xl={4}>
<Form.Group className="form-group">
  <Form.Label>Roles<span className="text-danger">*</span></Form.Label>
  <div className="SlectBox">
      <Select
         options={roletype}
        placeholder="Select Roles"
        // classNamePrefix="selectform"
        classNamePrefix='Select2' className="multi-select"
      />
    </div>
</Form.Group>
</Col>
</Row>



                </Tab>
                <Tab eventKey="Document" title="Document">
                <Row>
<Col xl={6}>
<Form.Group className="form-group">
  <Form.Label>Aadhar No <span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='Aadhar No' className='form-control'></Form.Control>
</Form.Group>
</Col>

<Col xl={6}>
<Form.Group className="form-group">
  <Form.Label>Pan No.<span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='Pan No' className='form-control'></Form.Control>
</Form.Group>
</Col>

<Col xl={6}>
  <Form.Group className="form-group">
  <Form.Label>Passport No. <span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='Passport No.' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={6}>
  <Form.Group className="form-group">
  <Form.Label>GSTIN No. (Member) <span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='GSTIN No. (Member)' className='form-control'></Form.Control>
</Form.Group>
  </Col>



</Row>
                </Tab>

                <Tab eventKey="Properties" title="Properties" className='pt-2'>

                <Row>
<Col xl={3}>
<Form.Group className="form-group">
  <Form.Label>Property Name<span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='Property Name' className='form-control'></Form.Control>
</Form.Group>
</Col>

<Col xl={3}>
<Form.Group className="form-group">
  <Form.Label>Owner Name<span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='owner name' className='form-control'></Form.Control>
</Form.Group>
</Col>

<Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>Narration<span className="text-danger">*</span></Form.Label>
  <div className="SlectBox">
      <Select
         options={narration}
        placeholder="Select Type"
        // classNamePrefix="selectform"
        classNamePrefix='Select2' className="multi-select"
      />
    </div>
</Form.Group>
  </Col>

  <Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>Status <span className="text-danger">*</span></Form.Label>
  <div className="SlectBox">
      <Select
         options={propertystatus}
        placeholder="Select status"
        // classNamePrefix="selectform"
        classNamePrefix='Select2' className="multi-select"
      />
    </div>
</Form.Group>
  </Col>

  <Col xl={12}>
  <Form.Group className="form-group">
  <Button className='btn btn-promary btn-sm float-end'>+ Add</Button>
</Form.Group>
  </Col>



</Row>

<Row>
  <Col xl={12}>
  <table className='table table-bordered mt-3'>
    <thead>
      <tr>
        <th>S.no.</th>
        <th>Property Name</th>
        <th>Owner Name</th>
        <th>Narration</th>
        <th>Status</th>
        <th className='text-center'>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>A-204</td>
        <td>Vinod Kumar </td>
        <td>2BHK</td>
        <td>Ouccupied</td>
        <td align='center'><i className='bi bi-trash text-danger cursor'></i></td>
      </tr>
      <tr>
        <td>2</td>
        <td>A-204</td>
        <td>Vinod Kumar </td>
        <td>2BHK</td>
        <td>Ouccupied</td>
        <td align='center'><i className='bi bi-trash text-danger cursor'></i></td>
      </tr>
    </tbody>
  </table>
  </Col>
</Row>
                </Tab>

                <Tab eventKey="Loan" title="Loan" className='pt-2'>

                <Row>
<Col xl={3}>
<Form.Group className="form-group">
  <Form.Label>Loan Type<span className="text-danger">*</span></Form.Label>
  <div className="SlectBox">
      <Select
         options={loantype}
        placeholder="Select Type"
        // classNamePrefix="selectform"
        classNamePrefix='Select2' className="multi-select"
      />
    </div>
</Form.Group>
</Col>

<Col xl={3}>
<Form.Group className="form-group">
  <Form.Label>Loan Number<span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='loan number' className='form-control'></Form.Control>
</Form.Group>
</Col>

<Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>Loan Period (in yrs)<span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='10' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>Loan Amount<span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='loan amount' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>Start Date<span className="text-danger">*</span></Form.Label>
  <Form.Control type='date' placeholder='dd/mm/yyyy' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>End Date<span className="text-danger">*</span></Form.Label>
  <Form.Control type='date' placeholder='dd/mm/yyyy' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>Monthly EMI<span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='monthly emi' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>Bank Name<span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='bank name' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={6}>
  <Form.Group className="form-group">
  <Form.Label>Bank Address<span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='address' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>Loan Scan Copy <span className="text-danger">*</span> <span className='float-end text-muted tx-10 tx-normal'>Upload size: Max 2 MB</span></Form.Label>
  <Form.Control type='file' placeholder='' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label></Form.Label>
  <Button className='btn btn-promary btn-sm mt-4'>+ Add</Button>
</Form.Group>
  </Col>



</Row>

<Row>
  <Col xl={12}>
  <table className='table table-bordered mt-3'>
    <thead>
      <tr>
        <th>S.no.</th>
        <th>Loan Type</th>
        <th>Loan Number</th>
        <th>Loan Period</th>
        <th>Loan Amount</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Monthly EMI</th>
        <th>Bank Name</th>
        <th>Bank Address</th>
        <th>Upload File</th>
        <th className='text-center'>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Vehicle</td>
        <td>4657686797898</td>
        <td>10yrs</td>
        <td>80,000</td>
        <td>12/12/2024</td>
        <td>12/12/2023</td>
        <td>7,000</td>
        <td>HDFC Bank</td>
        <td>Sector 21, Noida Uttar Pradesh 201102</td>
        <td><img src={imagesData('pdficon')} className="wd-50"/></td>
        <td align='center'><i className='bi bi-trash text-danger cursor'></i></td>
      </tr>
      <tr>
        <td>2</td>
        <td>Home</td>
        <td>4657686797898</td>
        <td>10yrs</td>
        <td>80,000</td>
        <td>12/12/2024</td>
        <td>12/12/2023</td>
        <td>7,000</td>
        <td>HDFC Bank</td>
        <td>Sector 21, Noida Uttar Pradesh 201102</td>
        <td><img src={imagesData('pdficon')} className="wd-50"/></td>
        <td align='center'><i className='bi bi-trash text-danger cursor'></i></td>
      </tr>
    </tbody>
  </table>
  </Col>
</Row>
 </Tab>

 <Tab eventKey="Parking" title="Parking" className='pt-2'>

 <Row>


<Col xl={3}>
<Form.Group className="form-group">
  <Form.Label>Vehicle Type<span className="text-danger">*</span></Form.Label>
  <div className="SlectBox">
      <Select
         options={vehicletype}
        placeholder="Select type"
        // classNamePrefix="selectform"
        classNamePrefix='Select2' className="multi-select"
      />
    </div>
</Form.Group>
</Col>

<Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>Vehicle Number<span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='vehicle number' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>Vehicle Owner Name<span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='owner name' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>DL Number<span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='owner name' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>DL Issue Date<span className="text-danger">*</span></Form.Label>
  <Form.Control type='date' placeholder='dd/mm/yyyy' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>DL Expiry Date<span className="text-danger">*</span></Form.Label>
  <Form.Control type='date' placeholder='dd/mm/yyyy' className='form-control'></Form.Control>
</Form.Group>
  </Col>

  <Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label>Parking Number<span className="text-danger">*</span></Form.Label>
  <Form.Control type='text' placeholder='parking number' className='form-control'></Form.Control>
</Form.Group>
  </Col>




  <Col xl={3}>
  <Form.Group className="form-group">
  <Form.Label></Form.Label>
  <Button className='btn btn-promary btn-sm mt-4'>+ Add</Button>
</Form.Group>
  </Col>



</Row>

<Row>
  <Col xl={12}>
  <table className='table table-bordered mt-3'>
    <thead>
      <tr>
        <th>S.no.</th>
        <th>Vehicle Type</th>
        <th>Vehicle Number</th>
        <th>Vehicle Owner Name</th>
        <th>DL Number</th>
        <th>DL Issue Date</th>
        <th>DL Expiry Date</th>
        <th>Parking Number</th>
         <th className='text-center'>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>4 Wheelr</td>
        <td>UP2A9876</td>
        <td>Rahul Sharma</td>
        <td>345464564</td>
        <td>12/12/2024</td>
        <td>12/12/2034</td>
        <td>234</td>
       <td align='center'><i className='bi bi-trash text-danger cursor'></i></td>
      </tr>
      <tr>
        <td>2</td>
        <td>4 Wheelr</td>
        <td>UP2A9876</td>
        <td>Rahul Sharma</td>
        <td>345464564</td>
        <td>12/12/2024</td>
        <td>12/12/2034</td>
        <td>234</td>
        <td align='center'><i className='bi bi-trash text-danger cursor'></i></td>
      </tr>
    </tbody>
  </table>
  </Col>
</Row>
 </Tab>


              </Tabs>




            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("select"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoShow("select"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>
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


    </Fragment>
  );
}