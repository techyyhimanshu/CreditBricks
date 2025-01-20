
import { Fragment, useEffect, useState } from 'react';
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



import { addUserApi, deleteUserApi, getAllUserApi, updateUserApi } from '../../api/user-api';
import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import { showToast } from '../../common/services/toastServices';
import { handleApiError } from '../../helpers/handle-api-error';
import stateCities from "./stateCity.json"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface StateCities {
  [key: string]: string[]; // Index signature
}
const stateCitiesTyped: StateCities = stateCities;


export default function Users() {

  const [users, setUsers] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState({
    personId: '',
    firstName: '',
    lastName: '',
    role: '',
    phone: '',
    personEmail: '',
    personBirthdate: '',
    personGenderIdentity: '',
    address: '',
    country: '',
    state: '',
    city: '',
  })
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const stateOptions = Object.keys(stateCitiesTyped).map((state) => ({
    value: state,
    label: state,
  }));

  const [cityOptions, setCityOptions] = useState<any>([]);

  type Row = {
    personId: number;
    sno: number;
    firstName: string;
    lastName: string;
    role: string;
    phone: string;
    personEmail: string;
    personBirthdate: string;
    personGenderIdentity: string;
    address: string;
    country: string;
    state: string;
    city: string;
  };

  const columns = [
    {
      name: 'S.No.',
      selector: (row: Row) => row.sno,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: (row: Row) => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row: Row) => row.lastName,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row: Row) => row.phone,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: Row) => row.personEmail,
      sortable: true,
    },
    {
      name: 'Role',
      selector: (row: Row) => row.role,
      sortable: true,
    },

    {
      name: 'Action',
      sortable: true,
      cell: (row: Row) => (
        <div>
          <button type="button" className="btn btn-light btn-sm" onClick={() => openEditModal(row)} >Edit</button>
          <button type="button" className="btn bg-info-transparent ms-2 btn-sm" onClick={() => handleDelete(row)} >Delete</button>
        </div>
      ),
    },
  ]

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUserApi()
        const formattedData = response.data.data.map((user: any, index: number) => ({
          sno: index + 1,
          id: user.PersonId,
          firstName: user.firstName,
          lastName: user.lastName,
          salutation: user.salutation,
          role: user.type,
          phone: user.phone,
          personEmail: user.personEmail,
          personBirthdate: user.personBirthdate,
          personGenderIdentity: user.personGenderIdentity,
          country: user.country,
          state: user.state,
          city: user.current_City__c,
          address: user.address__c

        }))
        setUsers(formattedData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers()
  }, [])
  const countryoption = [
    { value: "India", label: "India" },

  ];


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
    data: users
  };



  const roletype = [
    { value: "Super Admin", label: "Super Admin" },
    { value: "Admin", label: "Admin" }
  ];
  const gender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" }
  ];
  const openAddModal = () => {
    setIsEditing(false);
    currentUser.firstName = "";
    currentUser.lastName = "";
    currentUser.personEmail = "";
    currentUser.phone = "";
    currentUser.country = "";
    currentUser.state = "";
    currentUser.city = "";
    currentUser.role = "";
    setShowModal(true);
  };

  const openEditModal = (user: any) => {
    setIsEditing(true);
    setCurrentUser(user);
    setShowModal(true);
  };
  const handleStateChange = (selected: { value: string; label: string }) => {
    const cities = stateCitiesTyped[selected.value] || [];
    setCityOptions(cities.map((city) => ({ value: city, label: city })));
  };
  const handleSubmit = (values: any) => {
    console.log(values)
    const data = {
      salutation: values.gender.male === "Male" ? "Mr" : "Ms",
      personId: values.personId,
      firstName: values.firstName,
      lastName: values.lastName,
      type: values.role.value,
      phone: values.phone,
      personEmail: values.personEmail,
      personBirthdate: values.dob.toISOString().split("T")[0],
      personGenderIdentity: values.gender.value,
      country: values.country.value,
      state: values.state.value,
      city: values.city.value,
    }
    if (isEditing) {
      ; (async () => {
        try {
          const response = await updateUserApi(data, currentUser.personId)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // Update specific user in the list
            setUsers(prevData =>
              prevData.map(user =>
                user.personId === currentUser.personId
                  ? { ...user, ...data }
                  : user
              )
            );
            setShowModal(false)
          }
        } catch (error: any) {
          const errorMessage = handleApiError(error);
          showToast("error", errorMessage);
        }
      })()
    } else {
      // Call API to add new user
      ; (async () => {
        try {
          const response = await addUserApi(data)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // Add the new user to the table
            const newUser = {
              sno: users.length + 1,
              id: response.data.data.userId,
              ...response.data.data
            }
            setUsers(prevData => [...prevData, newUser]);
            setShowModal(false)
          }
        } catch (error: any) {
          const errorMessage = handleApiError(error);
          showToast("error", errorMessage);
        }
      })()
    }



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

  }
  const handleDelete = (data: any) => {
    console.log(data)
      ; (async () => {
        try {
          const response = await deleteUserApi(data.personId)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // Remove the user from the table
            setUsers(prevData => prevData.filter(user => user.personId !== data.personId))
          }
        } catch (error: any) {
          const errorMessage = handleApiError(error)
          showToast("error", errorMessage)
        }
      })()
  }



  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">User Master</span>
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

          <button type="button" className="btn btn-primary p-1 pe-2 ps-2 me-1" onClick={() => openAddModal()}><i className="bi bi-plus"></i> Add User</button>
          <Modal show={showModal} onHide={() => setShowModal(false)} centered size='lg' >
            <Formik
              initialValues={{
                personId: null,
                firstName: currentUser?.firstName || "",
                lastName: currentUser?.lastName || "",
                personEmail: currentUser?.personEmail || "",
                phone: currentUser?.phone || "",
                dob: null,
                role: currentUser?.role || "",
                country: { value: currentUser.country, label: currentUser.country }, // Update this
                state: { value: currentUser.state, label: currentUser.state },
                city: { value: currentUser.city, label: currentUser.city }
              }
              }
              // validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values, touched, errors }) => (
                <FormikForm>
                  <Modal.Header>
                    <Modal.Title>{isEditing ? "Edit User" : "Add User"}</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={() => setShowModal(false)}>
                      x
                    </Button>
                  </Modal.Header>
                  <Modal.Body>
                    <Row>

                      <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>UserName <span className="text-danger">*</span></Form.Label>
                          <Field
                            type='text'
                            placeholder='UserName'
                            className='form-control'
                            name="personId"
                          />
                        </Form.Group>
                      </Col>

                      {/* <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                          <Form.Control type='password' placeholder='First Name' className='form-control'></Form.Control>
                        </Form.Group>
                      </Col> */}


                      <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                          <Field
                            type='text'
                            placeholder='First Name'
                            className='form-control'
                            name="firstName"
                          />

                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                          <Field
                            type='text'
                            placeholder='Last Name'
                            className='form-control'
                            name="lastName"
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>Gender<span className="text-danger">*</span></Form.Label>
                          <div className="SlectBox">
                            <Select
                              options={gender}
                              placeholder="Select Gender"
                              onChange={(selected) => setFieldValue('gender', selected)}
                              // classNamePrefix="selectform"
                              classNamePrefix='Select2' className="multi-select"
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>
                            DOB<span className="text-danger">*</span>
                          </Form.Label>
                          <div className="datepicker-wrapper">
                            <ReactDatePicker
                              selected={values.dob}
                              onChange={(date) => setFieldValue("dob", date)}
                              dateFormat="yyyy-MM-dd"
                              placeholderText="Select DOB"
                              className="form-control"
                              showYearDropdown
                              yearDropdownItemNumber={100}
                              scrollableYearDropdown
                            />
                          </div>
                          {touched.dob && errors.dob && (
                            <div className="text-danger">{errors.dob}</div>
                          )}
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>Roles<span className="text-danger">*</span></Form.Label>
                          <div className="SlectBox">
                            <Select
                              options={roletype}
                              placeholder="Select Roles"
                              onChange={(selected) => setFieldValue('role', selected)}
                              // classNamePrefix="selectform"
                              classNamePrefix='Select2' className="multi-select"
                            />
                          </div>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                          <Field
                            type='text'
                            placeholder='Email'
                            className='form-control'
                            name="personEmail"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>Phone. <span className="text-danger">*</span></Form.Label>
                          <Field
                            type='text'
                            placeholder='Phone'
                            className='form-control'
                            name="phone"
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>Country <span className="text-danger">*</span></Form.Label>

                          <div className=" SlectBox">
                            <Select
                              options={countryoption}
                              placeholder="Country"
                              onChange={(selected) => setFieldValue('country', selected)}
                              // classNamePrefix="selectform"
                              classNamePrefix='Select2' className="multi-select"
                            />
                          </div>

                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>State <span className="text-danger">*</span></Form.Label>
                          <Select
                            options={stateOptions}
                            value={values.state}
                            onChange={(selected: any) => {
                              setFieldValue('state', selected);
                              handleStateChange({
                                value: selected.value,
                                label: selected.label
                              });
                            }}
                            placeholder="Select State"
                            classNamePrefix="Select2"
                          />
                          <ErrorMessage name="state" component="div" className="text-danger" />
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>City <span className="text-danger">*</span></Form.Label>
                          <Select
                            options={cityOptions}
                            value={values.city}
                            onChange={(selected) => setFieldValue("city", selected)}
                            placeholder="Select City"
                            classNamePrefix="Select2"
                          />
                          <ErrorMessage name="city" component="div" className="text-danger" />
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>Zipcode <span className="text-danger">*</span></Form.Label>
                          <Field
                            type='text'
                            placeholder='Zipcode'
                            className='form-control'
                            name="zip"
                          />
                        </Form.Group>

                      </Col>

                    </Row>


                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="default" onClick={() => setShowModal(false)}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      {isEditing ? "Save changes" : "Save"}
                    </Button>

                  </Modal.Footer>
                </FormikForm>
              )}
            </Formik>


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
                    data={users}
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
