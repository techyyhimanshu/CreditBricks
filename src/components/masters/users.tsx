import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, Modal, Button, Form, } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
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
