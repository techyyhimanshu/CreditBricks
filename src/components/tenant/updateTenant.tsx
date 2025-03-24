
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Accordion, Button, Form, Dropdown, FormControl } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import DataTableExtensions from "react-data-table-component-extensions";
import Select from "react-select";
import { Link, useParams } from "react-router-dom";
import { imagesData } from "../../common/commonimages";
import { getAllSocietyApi, getPropertiesOfSocietyApi } from '../../api/society-api';
import { showToast, CustomToastContainer } from '../../common/services/toastServices';
import { handleApiError } from '../../helpers/handle-api-error';
import stateCities from "../../components/masters/stateCity.json"
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import DataTable from 'react-data-table-component';
import { getTenantApi, updateTenantApi } from '../../api/tenant-api';
interface StateCities {
  [key: string]: string[]; // Index signature
}
const stateCitiesTyped: StateCities = stateCities;
export default function UpdateTenant() {
  const [societyOptions, setSocietyOptions] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState<any>([]);
  const [currentTenant, setCurrentTenant] = useState<any>(null);
  const [vehicleFormData, setVehicleFormData] = useState({
    vehicleType: null,
    vehicleNumber: "",
    vehicleRC: null as File | null,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [vehicleData, setVehicleData] = useState<Row[]>([]);
  const params = useParams()
  const identifier = params.identifier as string

  useEffect(() => {
    const fetchTenantDetails = async () => {
      try {
        const response = await getTenantApi(identifier)
        setCurrentTenant(response.data.data)
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast('error', errorMessage)
      }
    }
    fetchTenantDetails()
  }, [])

  const vehicletype = [
    { value: "2Wheeler", label: "2 Wheeler" },
    { value: "4Wheeler", label: "4 Wheeler" },
  ]

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ]


  const state = [
    { value: "Delhi", label: "Delhi" },
  ]

  const city = [
    { value: "Delhi", label: "Delhi" },
  ]

  const pet = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ]

  const country = [
    { value: "India", label: "India" },
  ]
  type Row = {
    sno: number;
    vehicleType: boolean;
    vehicleNumber: string;
    vehicleRC: File | null;
  };
  const columns = [
    {
      name: "S.no.",
      selector: (_: Row, index: number) => index + 1, // Serial number fix
      sortable: true,
    },
    {
      name: "Vehicle Type",
      selector: (row: Row) => row.vehicleType,
    },
    {
      name: "Vehicle Number",
      selector: (row: Row) => row.vehicleNumber,
    },
    {
      name: 'Vehicle RC',
      cell: (row: Row) =>
        row.vehicleRC ? (
          <a href={URL.createObjectURL(row.vehicleRC)} target="_blank" rel="noopener noreferrer">
            <img className='wd-50' src={imagesData('pdficon')} alt="" />
          </a>
        ) : (
          'No File'
        ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
    {
      name: "Actions",
      cell: (row: Row, index: number) => (
        <div>
          <button className="btn btn-light btn-sm"
          //  onClick={() => handleEdit(index)}
          >Edit</button>
          <button className="btn bg-info-transparent ms-2 btn-sm"
            onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ),
    },
  ];
  const tableData = {
    columns,
    data: vehicleData
  };
  const stateOptions = Object.keys(stateCitiesTyped).map((state) => ({
    value: state,
    label: state,
  }));
  const handleStateChange = (selected: { value: string; label: string }) => {
    const cities = stateCitiesTyped[selected.value] || [];
    setCityOptions(cities.map((city) => ({ value: city, label: city })));
  };
  useEffect(() => {
    fetchSocietiesForDropDown()
  }, [])
  const fetchSocietiesForDropDown = async () => {
    try {
      const response = await getAllSocietyApi();
      const formattedData = response.data.data.map((item: any) => ({
        value: item.societyIdentifier,
        label: item.societyName,
      }));
      setSocietyOptions(formattedData);
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }
  const fetchPropertiesForDropDown = async (society: any) => {
    try {
      const response = await getPropertiesOfSocietyApi(society.value);
      const formattedData = response.data.data.map((item: any) => ({
        value: item.propertyIdentifier,
        label: item.propertyName ? item.propertyName : item.flatNumber,
      }));
      setPropertyOptions(formattedData);
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }
  const handleAddNewVehicle = () => {

    if (editingIndex !== null) {
      // Update existing row
      const updatedData = [...vehicleData];
      updatedData[editingIndex] = { ...vehicleFormData, id: editingIndex + 1 };
      setVehicleData(updatedData);
      setEditingIndex(null);
    } else {
      // Add new row
      setVehicleData((prevState: any) => [
        ...prevState,
        { ...vehicleFormData, id: prevState.length + 1 }
      ]);
    }
    // // resetForm();
  };
  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();

      const tenantDetails = {
        societyIdentifier: values.society.value,
        propertyIdentifier: values.property.value,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        mobileNumber: values.mobileNumber,
        alternateMobileNumber: values.alternateMobileNumber,
        email: values.email,
        gender: values.gender.value,
        age: values.age,
        dateOfBirth: values.dateOfBirth,
        anniversary: values.anniversary,
        address: values.address,
        country: values.country.value,
        state: values.state.value,
        city: values.city.value,
        pincode: values.pincode,
        havePet: values.havePet.value,
        familyMembers: values.familyMembers,
        aadharNumber: values.aadharNumber,
        rentRegistrationId: values.rentRegistrationId,
        rentAgreementStartDate: values.rentAgreementStartDate,
        rentAgreementEndDate: values.rentAgreementEndDate,
        monthlyRent: values.monthlyRent,
        depositAmount: values.depositAmount,
        dueAmount: values.dueAmount,
        rentAgreementFile: values.rentAgreementFile,
        policeVerificationFile: values.policeVerificationFile
      }
      Object.entries(tenantDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Convert vehicles data to JSON (excluding files)
      const vehiclesWithoutFiles = vehicleData.map(({ vehicleRC, ...rest }) => rest);

      formData.append("vehicleData", JSON.stringify(vehiclesWithoutFiles));

      // Append files separately
      vehicleData.forEach((vehicle) => {
        if (vehicle.vehicleRC instanceof File) {
          formData.append("vehicleRCFiles", vehicle.vehicleRC);
        }
      });
      // Step 3: API Call
      const response = await updateTenantApi(formData, identifier);
      if (response.status === 201 || response.status === 200) {
        showToast("success", response.data.message);
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files.length > 0) {
      setVehicleFormData(prevState => ({
        ...prevState,
        vehicleRC: e.target.files![0]
      }));
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setVehicleFormData(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVehicleFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleDelete = (index: number) => {
    setVehicleData(prevState => prevState.filter((_, i) => i !== index));
  };
  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}tenant/tenant`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Update Tenant</span>
        </div>
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          society: { value: currentTenant?.country, label: currentTenant?.country },
          property: { value: "", label: "" },
          firstName: currentTenant?.firstName || "",
          middleName: currentTenant?.middleName || "",
          lastName: currentTenant?.lastName || "",
          mobileNumber: currentTenant?.mobileNumber || "",
          alternateMobileNumber: currentTenant?.alternateMobileNumber || "",
          email: currentTenant?.email || "",
          gender: { value: "", label: "" },
          age: currentTenant?.age || "",
          dateOfBirth: currentTenant?.dateOfBirth || "",
          anniversary: currentTenant?.anniversary || "",
          address: currentTenant?.address || "",
          country: { value: "", label: "" },
          state: { value: "", label: "" },
          city: { value: "", label: "" },
          pincode: currentTenant?.pincode || "",
          familyMembers: currentTenant?.familyMembers || "",
          havePet: { value: "", label: "" },
          aadharNumber: currentTenant?.aadharNumber || "",
          rentRegistrationId: currentTenant?.rentRegistrationId || "",
          rentAgreementStartDate: currentTenant?.rentAgreementStartDate || "",
          rentAgreementEndDate: currentTenant?.rentAgreementEndDate || "",
          monthlyRent: currentTenant?.monthlyRent || "",
          depositAmount: currentTenant?.depositAmount || "",
          dueAmount: currentTenant?.dueAmount || "",
          rentAgreementFile: "",
          policeVerificationFile: "",

        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <FormikForm>
            <Accordion defaultActiveKey="Basic Details">

              <Accordion.Item eventKey="Basic Details" className="bg-white mb-3">
                <Accordion.Header className="borders ">
                  Basic Details
                </Accordion.Header>
                <Accordion.Body className="borders p-0">
                  <Card className='m-0'>

                    <Card.Body className='pt-3'>

                      <Row>
                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Society<span className="text-danger">*</span></Form.Label>
                            <Select
                              options={societyOptions}
                              onChange={(selected) => {
                                fetchPropertiesForDropDown(selected);
                                setFieldValue("society", selected);
                              }}
                              placeholder="Select society"
                              classNamePrefix="Select2"
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Property<span className="text-danger">*</span></Form.Label>
                            <Select
                              options={propertyOptions}
                              onChange={(selected) => {
                                setFieldValue("property", selected);
                              }}
                              placeholder="Select property"
                              classNamePrefix="Select2"
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>First Name<span className="text-danger">*</span></Form.Label>
                            <Field
                              type="text"
                              name="firstName"
                              className='form-control'
                              placeholder='Tenant name'
                            ></Field>
                          </Form.Group>
                        </Col>
                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Middle Name</Form.Label>
                            <Field
                              type="text"
                              name="middleName"
                              className='form-control'
                              placeholder='Tenant name'
                            ></Field>
                          </Form.Group>
                        </Col>
                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Last Name<span className="text-danger">*</span></Form.Label>
                            <Field
                              type="text"
                              name="lastName"
                              className='form-control'
                              placeholder='Tenant name'
                            ></Field>
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Mobile </Form.Label>
                            <Field
                              type="text"
                              name="mobileNumber"
                              className='form-control' placeholder='Mobile'
                            ></Field>
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Alternative Mobile</Form.Label>
                            <Field
                              type="text"
                              name="alternateMobileNumber"
                              className='form-control' placeholder='Alternative mobile'
                            ></Field>
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label> Email</Form.Label>
                            <Field
                              type="text"
                              name="email"
                              className='form-control' placeholder='Email'
                            ></Field>
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Gender<span className="text-danger">*</span></Form.Label>
                            <Select
                              options={genderOptions}
                              onChange={(selected) => setFieldValue("gender", selected)}
                              placeholder="Select gender"
                              classNamePrefix="Select2"
                            />
                          </Form.Group>
                        </Col>
                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Age</Form.Label>
                            <Field
                              type="text"
                              name="age"
                              className='form-control'
                              placeholder='Age'
                            ></Field>
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Field
                              type="date"
                              name="dateOfBirth"
                              className='form-control'
                              placeholder=''
                            ></Field>
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Anniversary</Form.Label>
                            <Field
                              type="date"
                              name="anniversary"
                              className='form-control'
                              placeholder=''></Field>
                          </Form.Group>
                        </Col>



                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Address</Form.Label>
                            <Field
                              type="text"
                              name="address"
                              className='form-control' placeholder='Address'
                            ></Field>
                          </Form.Group>
                        </Col>


                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Country</Form.Label>
                            <Select
                              options={country}
                              onChange={(selected) => {
                                setFieldValue("country", selected);
                              }}
                              placeholder="Select country"
                              classNamePrefix="Select2"
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>State</Form.Label>
                            <Select
                              options={state}
                              onChange={(selected) => {
                                setFieldValue("state", selected);
                              }}
                              placeholder="Select state"
                              classNamePrefix="Select2"
                            />
                          </Form.Group>
                        </Col>


                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>City</Form.Label>
                            <Select
                              options={city}
                              onChange={(selected) => {
                                setFieldValue("city", selected);
                              }}
                              placeholder="Select city"
                              classNamePrefix="Select2"
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Pincode</Form.Label>
                            <Field
                              type="text"
                              name="pincode"
                              className='form-control' placeholder='Pincode'
                            ></Field>
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Family Members</Form.Label>
                            <Field
                              type="number"
                              name="familyMembers"
                              className='form-control'
                              placeholder='ex: 2,3'
                            ></Field>
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Have a Pet?</Form.Label>
                            <Select
                              options={pet}
                              onChange={(selected) => {
                                setFieldValue("havePet", selected);
                              }}
                              placeholder="Select"
                              classNamePrefix="Select2"
                            />
                          </Form.Group>
                        </Col>



                        <Col xl={4}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Aadhar Number</Form.Label>
                            <Field
                              type="text"
                              name="aadharNumber"
                              className='form-control' placeholder='Aadhar Number'
                            ></Field>
                          </Form.Group>
                        </Col>




                      </Row>

                    </Card.Body>
                  </Card>


                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="Tenant Details" className="bg-white  mb-3">
                <Accordion.Header className="borders">
                  Rent Agreement Details
                </Accordion.Header>
                <Accordion.Body className="borders p-0">
                  <Card className='m-0'>

                    <Card.Body className='pt-3'>

                      <Row>
                        <Col xl={4}>
                          <Form.Group className="form-group">
                            <Form.Label>Rent Registration ID</Form.Label>

                            <Field
                              type="text"
                              name="rentRegistrationId"
                              placeholder="id"
                              className="form-control"
                            />
                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group">
                            <Form.Label>Rent Agreement Start Date</Form.Label>

                            <Field
                              type="date"
                              name="rentAgreementStartDate"
                              placeholder=""
                              className="form-control"
                            />
                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                          </Form.Group>
                        </Col>


                        <Col xl={4}>
                          <Form.Group className="form-group">
                            <Form.Label>Rent Agreement End Date</Form.Label>
                            <Field
                              type="date"
                              name="rentAgreementEndDate"
                              placeholder=""
                              className="form-control"
                            />
                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group">
                            <Form.Label>Monthly Rent</Form.Label>
                            <Field
                              type="text"
                              name="monthlyRent"
                              placeholder="0"
                              className="form-control"
                            />
                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                          </Form.Group>
                        </Col>


                        <Col xl={4}>
                          <Form.Group className="form-group">
                            <Form.Label>Due Amount</Form.Label>
                            <Field
                              type="text"
                              name="dueAmount"
                              placeholder="0"
                              className="form-control"
                            />
                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                          </Form.Group>
                        </Col>


                        <Col xl={4}>
                          <Form.Group className="form-group">
                            <Form.Label>Deposit Amount</Form.Label>
                            <Field
                              type="text"
                              name="depositAmount"
                              placeholder="0"
                              className="form-control"
                            />
                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                          </Form.Group>
                        </Col>


                        <Col xl={4}>
                          <Form.Group className="form-group">
                            <Form.Label>Upload Rent Agreement   <small className='text-muted float-end'>Upload Size : Max 2MB</small></Form.Label>
                            <input
                              type="file"
                              className="form-control"
                              name="rentAgreementFile"
                              onChange={(e: any) => setFieldValue("rentAgreementFile", e.target.files[0])}
                            />

                          </Form.Group>
                        </Col>

                        <Col xl={4}>
                          <Form.Group className="form-group">
                            <Form.Label>Police Verification Document   <small className='text-muted float-end'>Upload Size : Max 2MB</small></Form.Label>
                            <input
                              type="file"
                              className="form-control"
                              name="policeVerificationFile"
                              onChange={(e: any) => setFieldValue("policeVerificationFile", e.target.files[0])}
                            />

                          </Form.Group>
                        </Col>

                      </Row>

                    </Card.Body>
                  </Card>
                </Accordion.Body>
              </Accordion.Item>


              <Accordion.Item eventKey="Add Parent Scoiety" className="bg-white  mb-3">
                <Accordion.Header className="borders">
                  Vehicle Details
                </Accordion.Header>
                <Accordion.Body className="borders p-0">
                  <Card className='m-0'>

                    <Card.Body className='pt-3'>
                      <Row>
                        <Col xl={4}>
                          <Form.Group className="form-group">
                            <Form.Label>Vehicle Type </Form.Label>
                            <select
                              name="vehicleType"
                              // value={vehicleFormData.vehicleType}
                              onChange={handleVehicleTypeChange}
                              className="form-control"
                            >
                              <option value="2Wheeler">2 Wheeler</option>
                              <option value="4Wheeler">4 Wheeler</option>
                            </select>

                          </Form.Group>
                        </Col>



                        <Col xl={4}>
                          <Form.Group className="form-group">
                            <Form.Label>Vehicle No.</Form.Label>
                            <input
                              type="text"
                              name="vehicleNumber"
                              value={vehicleFormData.vehicleNumber}
                              placeholder="Vehicle number"
                              className="form-control"
                              onChange={handleInputChange}
                            />

                          </Form.Group>
                        </Col>
                        <Col xl={4}>
                          <Form.Group className="form-group">
                            <Form.Label>Vehicle RC Copy  <small className='text-muted float-end'>Upload Size : Max 2MB</small></Form.Label>
                            <input
                              type="file"
                              name="vehicleRC"
                              onChange={handleFileChange}
                              className="form-control" />
                          </Form.Group>
                        </Col>


                        <Col xl={12}>
                          <Form.Group className="form-group">
                            <Button className="btn btn-primary float-end mb-3" type="button" onClick={handleAddNewVehicle} >Add </Button>
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* <table className='table'>
                        <thead>
                          <tr>
                            <th>S.no.</th>
                            <th>Vehicle Type </th>
                            <th>Vehicle No</th>
                            <th>Document</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>2 Wheeler</td>
                            <td>A2B5678</td>
                            <td> <img alt="" className='wd-50' src={imagesData('pdficon')} /></td>
                            <td><Dropdown >
                              <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                Action
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>Edit</Dropdown.Item>
                                <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown></td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>4 Wheeler</td>
                            <td>A2B5678</td>
                            <td> <img alt="" className='wd-50' src={imagesData('pdficon')} /></td>
                            <td><Dropdown >
                              <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                Action
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>Edit</Dropdown.Item>
                                <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown></td>
                          </tr>

                        </tbody>
                      </table> */}
                      <Col xl={12}>
                        <DataTableExtensions {...tableData}>
                          <DataTable columns={columns} data={vehicleData} pagination fixedHeader />
                        </DataTableExtensions>
                      </Col>
                    </Card.Body>
                  </Card>
                </Accordion.Body>
              </Accordion.Item>
              <span className='float-end mb-5'>
                <Button variant="default ms-3"> Cancel </Button>
                <Button className="btn btn-primary" type="submit">Save </Button>
              </span>

            </Accordion>
          </FormikForm>
        )}
      </Formik>
      <CustomToastContainer />
    </Fragment >
  );
}
