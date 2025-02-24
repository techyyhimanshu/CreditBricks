
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Accordion, Button, Form, Modal, FormControl } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
// import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import stateCities from "../stateCity.json"
import { Link } from "react-router-dom";
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import { getAllSocietyApi, getTowersOfSocietyApi, getWingsOfSocietyApi } from '../../../api/society-api';
import { handleApiError } from '../../../helpers/handle-api-error';
import { showToast, CustomToastContainer } from '../../../common/services/toastServices';
import { getAllWingApi } from '../../../api/wing-api';
import { Formik, Form as FormikForm, ErrorMessage, Field } from 'formik';
import { geTenantForDropDownApi, getMemberForDropDownApi } from '../../../api/user-api';
import { addPropertyApi } from '../../../api/property-api';
// Define the types for the stateCities object
interface StateCities {
  [key: string]: string[]; // Index signature
}
const uploader = Uploader({
  // Get production API keys from Upload.io
  apiKey: 'free'
});
const stateCitiesTyped: StateCities = stateCities;
export default function AddPropertyMaster() {
  const [currentProperty, setCurrentProperty] = useState({
    propertyId: null,
    propertyName: '',
    status: null,
    narration: null,
    area: "",
    societyIdentifier: "",
    societyName: "",
    towerIdentifier: null,
    towerName: null,
    wingIdentifier: null,
    wingName: null,
    flatNumber: "",
    floorNumber: "",
    dealType: null,
    flatRegistrationNumber: '',
    dateOfAgreement: "",
    dateOfRegistration: "",
    memberName: null,
    memberIdentifier: null,
    tenantName: null,
    tenantIdentifier: null,
    rentAgreementStartDate: "",
    rentAgreementEndDate: "",
    monthlyRent: "",
    rentRegistrationId: "",
    rentAgreementFile: null,
    policeVerificationDocFile: null,
    intercomNumber: "",
    consumerElectricityNumber: "",
    gasConnectionNumber: "",
    monthlyPaidMaintenance: "",
    monthlyPaidMaintenanceUpto: "",
    monthlyPaidArrears: "",
    monthlyPaidArrearsUpto: "",
  });
  const [societyData, setSocietyData] = useState<any[]>([]);
  const [towerOptions, setTowerOptions] = useState<any[]>([]);
  const [wingOptions, setWingOptions] = useState<any[]>([]);
  const [tenantOptions, setTenantOptions] = useState<any[]>([]);
  const [memberOptions, setMemberOptions] = useState<any[]>([]);

  const societyname: any = [{ value: "1", label: "Select Society" }]

  const propertystatus = [
    { value: "Sold", label: "Sold" },
    { value: "Unsold", label: "Unsold" },
    { value: "Blocked by Management", label: "Blocked by Management" },
    { value: "Refuge", label: "Refuge" },
  ]

  const narration = [
    { value: "1 BHK", label: "1 BHK" },
    { value: "1.5 BHK", label: "1.5 BHK" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "2.5 BHK", label: "2.5 BHK" },
    { value: "1 RK", label: "1 RK" },
    { value: "3 BHK", label: "3 BHK" },
    { value: "3.5 BHK", label: "3.5 BHK" },
    { value: "4 BHK", label: "4 BHK" },
    { value: "Shop", label: "Shop" },
    { value: "Duplex", label: "Duplex" },
    { value: "Villa", label: "Villa" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Basement", label: "Basement" },
    { value: "Gala", label: "Gala" },
    { value: "Garage", label: "Garage" },
    { value: "Godown", label: "Godown" },
    { value: "Independent House", label: "Independent House" },
    { value: "Industrial Gala", label: "Industrial Gala" },
    { value: "Office", label: "Office" },
    { value: "Stall", label: "Stall" },
  ];


  const dealtype = [
    { value: "Self Occupied", label: "Self Occupied" },
    { value: "Rented", label: "Rented" },
    { value: "Sell", label: "Sell" },
    { value: "Rent", label: "Rent" },
    { value: "Lease", label: "Lease" },

  ]

  const societyOptions = societyData?.map((society) => ({
    value: society.societyIdentifier,
    label: society.societyName
  }))
  useEffect(() => {
    (async () => {
      await fetchSocietiesForDropDown();
      // await fetchTenantsForDropDown();
      await fetchMembersForDropDown();
    })()
  }, [])
  const [flatsoldmodalshow, setflatsoldmodal] = useState(false);
  const fetchSocietiesForDropDown = async () => {
    try {
      const response = await getAllSocietyApi();
      const formattedData = response.data.data.map((item: any) => ({
        societyIdentifier: item.societyIdentifier,
        societyName: item.societyName,
      }));
      setSocietyData(formattedData);
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }
  const fetchWingsForDropDown = async (society: any) => {
    try {
      const response = await getWingsOfSocietyApi(society.value);
      const formattedData = response.data.data.map((item: any) => ({
        value: item.wingIdentifier,
        label: item.wingName,
      }));

      setWingOptions(formattedData);
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }
  const fetchTowersForDropDown = async (society: any) => {
    try {
      const response = await getTowersOfSocietyApi(society.value);
      const formattedData = response.data.data.map((item: any) => ({
        value: item.towerIdentifier,
        label: item.towerName,
      }));
      setTowerOptions(formattedData);
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }
  const fetchMembersForDropDown = async () => {
    try {
      const response = await getMemberForDropDownApi();
      const formattedData = response.data.data.map((item: any) => ({
        value: item.identifier,
        label: `${item.firstName} ${item.middleName} ${item.lastName}`,
      }));
      setMemberOptions(formattedData);
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }
  const viewDemoShow = (modal: any) => {
    switch (modal) {

      case "flatsoldmodalshow":
        setflatsoldmodal(true);
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {

      case "flatsoldmodalshow":
        setflatsoldmodal(false);
        break;

    }
  };
  const handleSubmit = async (values: any) => {
    const formattedData = {
      propertyName: values.propertyName,
      status: values.status.value,
      narration: values.narration.value,
      area: values.area,
      societyIdentifier: values.society.value,
      towerIdentifier: values.tower.value,
      wingIdentifier: values.wing.value,
      flatNumber: values.flatNumber,
      floorNumber: values.floorNumber,
      dealType: values.dealType.value,
      flatRegistrationNumber: values.flatRegistrationNumber,
      dateOfAgreement: values.dateOfAgreement,
      dateOfRegistration: values.dateOfRegistration,
      memberIdentifier: values.member.value,
      tenantIdentifier: values.tenant.value,
      rentAgreementStartDate: values.rentAgreementStartDate,
      rentAgreementEndDate: values.rentAgreementEndDate,
      monthlyRent: values.monthlyRent,
      rentRegistrationId: values.rentRegistrationId,
      rentAgreementFile: values.rentAgreementFile,
      policeVerificationDocFile: values.policeVerificationDocFile,
      intercomNumber: values.intercomNumber,
      consumerElectricityNumber: values.consumerElectricityNumber,
      gasConnectionNumber: values.gasConnectionNumber,
      monthlyPaidMaintenance: values.monthlyPaidMaintenance,
      monthlyPaidMaintenanceUpto: values.monthlyPaidMaintenanceUpto,
      monthlyPaidArrears: values.monthlyPaidArrears,
      monthlyPaidArrearsUpto: values.monthlyPaidArrearsUpto
    }

    const response = await addPropertyApi(formattedData)
    if (response.status === 201 || response.status === 200) {
      showToast("success", "Property added successfully")
    }
  }

  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}property/propertymaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Add Property Master</span>
        </div>
      </div>
      <Formik
        initialValues={{
          propertyName: currentProperty?.propertyName,
          status: currentProperty?.status,

          narration: { value: currentProperty?.narration, label: currentProperty?.narration },

          area: currentProperty?.area,

          society: { value: currentProperty?.societyIdentifier, label: currentProperty?.societyName },

          tower: { value: currentProperty?.towerIdentifier, label: currentProperty?.towerName },

          wing: { value: currentProperty?.wingIdentifier, label: currentProperty?.wingName },

          flatNumber: currentProperty?.flatNumber,

          floorNumber: currentProperty?.floorNumber,

          dealType: currentProperty?.dealType,

          flatRegistrationNumber: currentProperty?.flatRegistrationNumber,

          dateOfAgreement: currentProperty?.dateOfAgreement,

          dateOfRegistration: currentProperty?.dateOfRegistration,

          member: { value: currentProperty?.memberIdentifier, label: currentProperty?.memberName },

          tenant: { value: currentProperty?.tenantIdentifier, label: currentProperty?.tenantName },

          rentAgreementStartDate: currentProperty?.rentAgreementStartDate,

          rentAgreementEndDate: currentProperty?.rentAgreementEndDate,

          monthlyRent: currentProperty?.monthlyRent,

          rentRegistrationId: currentProperty?.rentRegistrationId,

          rentAgreementFile: currentProperty?.rentAgreementFile,

          policeVerificationDocFile: currentProperty?.policeVerificationDocFile,

          intercomNumber: currentProperty?.intercomNumber,

          consumerElectricityNumber: currentProperty?.consumerElectricityNumber,

          gasConnectionNumber: currentProperty?.gasConnectionNumber,

          monthlyPaidMaintenance: currentProperty?.monthlyPaidMaintenance,

          monthlyPaidMaintenanceUpto: currentProperty?.monthlyPaidMaintenanceUpto,

          monthlyPaidArrears: currentProperty?.monthlyPaidArrears,

          monthlyPaidArrearsUpto: currentProperty?.monthlyPaidArrearsUpto,

        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <FormikForm>

            <Row>
              <Col xl={12}>

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
                              <Form.Group className="form-group">
                                <Form.Label>Property Name <span className="text-danger">*</span></Form.Label>
                                <Field
                                  type="text"
                                  name="propertyName"
                                  placeholder="Property name"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            {/* <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Owner <span className="text-danger">*</span></Form.Label>
                                <FormControl
                                  type="text"
                                  name="ownername"
                                  placeholder="Owner name"
                                  className="form-control"
                                />
                               
                              </Form.Group>
                            </Col> */}


                            {/* <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Ledger Name <span className="text-danger">*</span></Form.Label>
                                <FormControl
                                  type="text"
                                  name="ledgername"
                                  placeholder="Ledger Name"
                                  className="form-control"
                                />

                              </Form.Group>
                            </Col> */}


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Status <span className="text-danger">*</span></Form.Label>
                                <Select
                                  options={propertystatus}
                                  name='status'
                                  onChange={(selected) => setFieldValue("status", selected)}
                                  placeholder="Select Status"
                                  classNamePrefix="Select2"
                                />
                                {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Narration <span className="text-danger">*</span></Form.Label>
                                <Select
                                  options={narration}
                                  name="narration"
                                  onChange={(selected) => setFieldValue("narration", selected)}
                                  placeholder="Select narration"
                                  classNamePrefix="Select2"
                                />
                                {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Area(sq.ft.) <span className="text-danger">*</span></Form.Label>
                                <Field
                                  type="text"
                                  name="area"
                                  placeholder="Area"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Society <span className="text-danger">*</span></Form.Label>
                                <Select
                                  options={societyOptions}
                                  name='society'
                                  onChange={(selected) => {
                                    setFieldValue("society", selected)
                                    setFieldValue("tower", null); // Reset tower selection
                                    fetchTowersForDropDown(selected);
                                    fetchWingsForDropDown(selected);
                                  }}
                                  placeholder="Select Society"
                                  classNamePrefix="Select2"
                                />

                              </Form.Group>
                            </Col>
                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Tower</Form.Label>
                                <Select
                                  options={towerOptions}
                                  name='tower'
                                  onChange={(selected) => setFieldValue("tower", selected)}
                                  placeholder="Select tower"
                                  classNamePrefix="Select2"
                                />
                                {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>



                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Wing <span className="text-danger">*</span></Form.Label>
                                <Select
                                  options={wingOptions}
                                  name='wing'
                                  onChange={(selected) => setFieldValue("wing", selected)}
                                  placeholder="Select wing"
                                  classNamePrefix="Select2"
                                />
                                {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Flat No. <span className="text-danger">*</span></Form.Label>
                                <Field
                                  type="text"
                                  name="flatNumber"
                                  placeholder="Flat no"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Floor No.</Form.Label>
                                <Field
                                  type="text"
                                  name="floorNumber"
                                  placeholder="Floor no"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Deal Type</Form.Label>
                                <Select
                                  options={dealtype}
                                  name="dealType"
                                  onChange={(selected) => setFieldValue("dealType", selected)}
                                  placeholder="Select Type"
                                  classNamePrefix="Select2"
                                />
                                {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>



                            {/* <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Designation</Form.Label>
                          <FormControl
                            type="text"
                            name="designation"
                            placeholder="Designation"
                            className="form-control"
                          />
                        </Form.Group>
                      </Col> */}

                          </Row>

                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="Owner Details" className="bg-white  mb-3">
                    <Accordion.Header className="borders">
                      Owner Details
                    </Accordion.Header>
                    <Accordion.Body className="borders p-0">
                      <Card className='m-0'>

                        <Card.Body className='pt-3'>

                          <Row>
                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Member</Form.Label>
                                <Select
                                  options={memberOptions}
                                  name="member"
                                  onChange={(selected) => setFieldValue("member", selected)}
                                  placeholder="Select Member"
                                  classNamePrefix="Select2"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Co Owner </Form.Label>
                                <FormControl
                                  type="text"
                                  name="coOwner"
                                  placeholder="Co Owner"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Third Owner</Form.Label>
                                <FormControl
                                  type="text"
                                  name="thirdOwner"
                                  placeholder="Third Owner"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Fourth Owner</Form.Label>
                                <FormControl
                                  type="text"
                                  name="fourthOwner"
                                  placeholder="Fourth Owner"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>



                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Fifth Owner</Form.Label>
                                <FormControl
                                  type="text"
                                  name="fifthOwner"
                                  placeholder="Fifth Owner"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="state" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Previous Owner</Form.Label>
                                <FormControl
                                  type="text"
                                  name="previousOwner"
                                  placeholder="Previous Owner"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>






                          </Row>

                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="Registration Details" className="bg-white  mb-3">
                    <Accordion.Header className="borders">
                      Registration Details
                    </Accordion.Header>
                    <Accordion.Body className="borders p-0">
                      <Card className='m-0'>

                        <Card.Body className='pt-3'>

                          <Row>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Flat Registration Number</Form.Label>
                                <Field
                                  type="text"
                                  name="flatRegistrationNumber"
                                  placeholder="Flat Registration Number"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Date of Agreement </Form.Label>
                                <Field
                                  type="date"
                                  name="dateOfAgreement"
                                  placeholder="Date of Agreement"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Date of Registration</Form.Label>
                                <Field
                                  type="date"
                                  name="dateOfRegistration"
                                  placeholder="Date of Registration"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>




                          </Row>

                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>




                  <Accordion.Item eventKey="Address Details" className="bg-white  mb-3">
                    <Accordion.Header className="borders">
                      Address Details
                    </Accordion.Header>
                    <Accordion.Body className="borders p-0">
                      <Card className='m-0'>

                        <Card.Body className='pt-3'>

                          <Row>
                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Address line 1</Form.Label>
                                <Field
                                  type="text"
                                  disabled
                                  name="address"
                                  placeholder="Opp Mohan Palms"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Address line 2</Form.Label>
                                <Field
                                  type="text"
                                  disabled
                                  name="address"
                                  placeholder="Shirgaon"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Address line 3</Form.Label>
                                <Field
                                  type="text"
                                  disabled
                                  name="address"
                                  placeholder="Badlapur East"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>City </Form.Label>
                                <Field
                                  type="text"
                                  name="city"
                                  disabled
                                  placeholder="Thane"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>State </Form.Label>
                                <Field
                                  type="text"
                                  name="city"
                                  disabled
                                  placeholder="Maharashtra"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Pincode </Form.Label>
                                <Field
                                  type="text"
                                  name="city"
                                  disabled
                                  placeholder="421503"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                          </Row>

                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="Other Details" className="bg-white  mb-3">
                    <Accordion.Header className="borders" id="Portfolio">
                      Other Details
                    </Accordion.Header>
                    <Accordion.Body className="borders p-0">
                      <Card className='m-0'>

                        <Card.Body className='pt-3'>
                          <Row>
                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Intercom Number </Form.Label>
                                <Field
                                  type="text"
                                  name="intercomNumber"
                                  placeholder="Intercom Number"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Consumer Electricity Number </Form.Label>
                                <Field
                                  type="text"
                                  name="consumerElectricityNumber"
                                  placeholder="Consumer Electricity Number"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Gas Connection Number </Form.Label>
                                <Field
                                  type="text"
                                  name="gasConnectionNumber"
                                  placeholder="Gas Connection Number"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="Already Paid Details" className="bg-white  mb-3">
                    <Accordion.Header className="borders" id="Portfolio">
                      Already Paid Details
                    </Accordion.Header>
                    <Accordion.Body className="borders p-0">
                      <Card className='m-0'>

                        <Card.Body className='pt-3'>
                          <Row>
                            <Col xl={3}>
                              <Form.Group className="form-group">
                                <Form.Label>
                                  Monthly Paid Maintenance to Builder</Form.Label>
                                <Field
                                  type="text"
                                  name="monthlyPaidMaintenance"
                                  placeholder="Monthly Paid Maintenance to Builder"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={3}>
                              <Form.Group className="form-group">
                                <Form.Label>
                                  Monthly Paid Maintenance to Builder Upto</Form.Label>
                                <Field
                                  type="date"
                                  name="monthlyPaidMaintenanceUpto"
                                  placeholder="Monthly Paid Maintenance to Builder Upto"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={3}>
                              <Form.Group className="form-group">
                                <Form.Label>
                                  Monthly Paid Arrears</Form.Label>
                                <Field
                                  type="text"
                                  name="monthlyPaidArrears"
                                  placeholder="Monthly Paid Arrears"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={3}>
                              <Form.Group className="form-group">
                                <Form.Label>
                                  Monthly Paid Arrears Upto</Form.Label>
                                <Field
                                  type="date"
                                  name="monthlyPaidArrearsUpto"
                                  placeholder="Monthly Paid Arrears Upto"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>

                </Accordion>
                <span className='float-end mb-5'>
                  <Button variant="default ms-3"> Cancel </Button>
                  <Button className="btn btn-primary" type="submit">Save </Button>
                </span>
              </Col>
            </Row >
          </FormikForm>
        )}
      </Formik>
      <Button variant="success" onClick={() => viewDemoShow("flatsoldmodalshow")}> Flat Sold </Button>
      <Modal centered show={flatsoldmodalshow}>
        <Modal.Header>
          <Modal.Title>Flat Sold</Modal.Title>
          <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("flatsoldmodalshow"); }}>
            x
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="form-group">
            <Form.Label>Owner Name</Form.Label>
            <FormControl
              type="text"
              name="ownername"
              placeholder="Owner name"
              className="form-control"
            />
          </Form.Group>


          <Form.Group className="form-group">
            <Form.Label>Owner Mobile Number</Form.Label>
            <FormControl
              type="text"
              name="ownernumber"
              placeholder="Owner number"
              className="form-control"
            />
          </Form.Group>


          <Form.Group className="form-group">
            <Form.Label>Owner Email</Form.Label>
            <FormControl
              type="text"
              name="owneremail"
              placeholder="Owner email"
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Owner Address</Form.Label>
            <FormControl
              type="text"
              name="owneraddress"
              placeholder="Owner address"
              className="form-control"
            />
          </Form.Group>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={() => { viewDemoClose("flatsoldmodalshow"); }}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { viewDemoClose("flatsoldmodalshow"); }}>
            Save
          </Button>

        </Modal.Footer>
      </Modal>
      <CustomToastContainer />
    </Fragment >
  );
}
