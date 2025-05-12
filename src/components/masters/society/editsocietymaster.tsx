
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Button, Form, CardHeader, Modal, Dropdown } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import DataTableExtensions from "react-data-table-component-extensions";
import Select from "react-select";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import stateCities from "../stateCity.json"
import { Link, useParams } from "react-router-dom";
// import { Uploader } from 'uploader';
// import { UploadButton } from 'react-uploader';
import { getSocietyDetailsApi, updateSocietyApi } from '../../../api/society-api';
import { CustomToastContainer, showToast } from '../../../common/services/toastServices';
import { handleApiError } from '../../../helpers/handle-api-error';
import DataTable from 'react-data-table-component';
import { getSinglePropertyDetailsApi, getWingPropertiesApi } from '../../../api/property-api';
import { getTowerWingsApi } from '../../../api/wing-api';
import { getSocietyTowersApi } from '../../../api/tower-api';
import { addNewCommiteeMemberApi, deleteCommiteeMemberApi, updateCommiteeMemberApi } from '../../../api/commitee-api';
import { getMemberDetailApi } from '../../../api/member-api';
// Define the types for the stateCities object
interface StateCities {
  [key: string]: string[]; // Index signature
}
interface OptionType {
  label: string;
  value: string;
}
const stateCitiesTyped: StateCities = stateCities;
export default function EditSocietyMaster() {
  const [currentSociety, setCurrentSociety] = useState({
    societyIdentifier: null,
    societyName: '',
    contactNumber: '',
    email: '',
    societyManager: '',
    address: '',
    country: null,
    state: null,
    pincode: '',
    billingFrequency: null,
    interestCalculationType: null,
    annualRateOfInterest: '',
    interestCalculationStartDate: '',
    city: null,
    registrationNumber: '',
    tanNumber: '',
    panNumber: '',
    signatory: '',
    hsnCode: '',
    gstin: '',
    designation: '',
    applicationType: '',
    propertyName: "",
    propertyIdentifier: "",
    wingName: "",
    wingIdentifier: "",
    towerName: "",
    towerIdentifier: "",
    accountDetails: [{
      bankName: '',
      accountNumber: '',
      branchName: '',
      ifscCode: '',
      chequeFavourable: '',
      paymentQrPath: '',
    }]
  });
  const [commiteeMemberData, setCommiteeMemberData] = useState<any[]>([]);
  const [singleCommiteeMemberData, setSingleCommiteeMemberData] = useState<any>(null);
  const [editCommiteeMember, setEditCommiteeMember] = useState(false);
  const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);
  const [towerOptions, setTowerOptions] = useState<any[]>([]);
  const [wingOptions, setWingOptions] = useState<any[]>([]);
  const [memberOptions, setMemberOptions] = useState<any[]>([]);
  const params = useParams()
  const identifier = params.identifier as string

  const columns = [
    {
      name: "S.no.",
      cell: (_: any, index: number) => index + 1,
      sortable: true,
      width: '60px'
    },
    {
      name: "Society",
      selector: (row: any) => row.societyName,
    },
    // {
    //   name: "Tower",
    //   selector: (row: any) => row.towerName,
    // },
    // {
    //   name: "Wing",
    //   selector: (row: any) => row.wingName,
    // },
    {
      name: "Property",
      selector: (row: any) => row.propertyName,
    },
    {
      name: "Approver",
      cell: (row: any) => (
        <div>
          <div>{row.fullName}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{row.contactNumber}</div>
        </div>
      ),
    },
    // {
    //   name: "Approver",
    //   selector: (row: any) => row.fullName,
    // },
    // {
    //   name: "Approver Contact",
    //   selector: (row: any) => row.contactNumber,
    // },
    {
      name: "Designation",
      selector: (row: any) => row.designation,
    },
    // {
    //   name: "Application Type",
    //   selector: (row: any) =>
    //     Array.isArray(row.applicationType)
    //       ? row.applicationType.map((opt: any) => opt.label || opt).join(", ")
    //       : row.applicationType,
    // },
    {
      name: "Application Type",
      cell: (row: any) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
          {Array.isArray(row.applicationType)
            ? row.applicationType.map((opt: any) => opt.label || opt).join(", ")
            : row.applicationType}
        </div>
      ),
      wrap: true, 
    },


    {
      name: "Actions",
      cell: (row: any) => (
        <div>
          <Dropdown >
            <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
              Action
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => { setSingleCommiteeMemberData(row), viewDemoShow("editCommiteeMember") }}>Edit</Dropdown.Item>

              <Dropdown.Item className='text-danger' onClick={() => handleDelete(row.committeeMemberIdentifier)}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>
      ),
    },
  ];
  const tableData = {
    columns,
    data: commiteeMemberData
  };
  useEffect(() => {
    fetchSocietyDetails()
  }, [])

  const fetchSocietyDetails = async () => {
    try {
      const response = await getSocietyDetailsApi(identifier)
      setCurrentSociety(response.data.data)
      setCommiteeMemberData(response.data.data?.committeeMembers)
    } catch (error: any) {
      const errorMessage = handleApiError(error)
      showToast('error', errorMessage)
    }
  }

  const countryOptions: any = [{ value: "India", label: "India" }]
  const calculationtype = [
    { value: "Bill Date", label: "Bill Date" },
    { value: "Due Date", label: "Due Date" },
  ]


  const designation = [
    { value: "Chairman", label: "Chairman " },
    { value: " Vice Chairman", label: " Vice Chairman" },
    { value: "Secretary", label: "Secretary " },
    { value: " Joint Secretary", label: " Joint Secretary" },
    { value: "Trader", label: "Trader " },
    { value: " Joint Trader", label: " Joint Trader" },
    { value: "Committee Member", label: "Committee Member " },
    { value: "Director", label: "Director" },
    { value: "Joint Director", label: "Joint Director " },
    { value: "Independent Advisor", label: "Independent Advisor" },
    { value: "Advisor", label: "Advisor " },
    { value: "Nominal Member", label: "Nominal Member" },
    { value: "Internal Auditor", label: "Internal Auditor " },
    { value: "Ordinary Member", label: "Ordinary Member " },
    { value: "Member", label: "Member " },
    { value: "Flat Owner", label: "Flat Owner " },
    { value: " Joint Owner", label: " Joint Owner " },
    { value: " CoOwner", label: " Co-Owner" },
  ]


  const applicationtype = [
    { value: "Gate Pass", label: "Gate Pass" },
    { value: "Flat Resale", label: "Flat Resale" },
    { value: "Celebration", label: "Celebration" },
    { value: "Club House", label: "Club House" },
    { value: "Play Area", label: "Play Area" },
    { value: "Food Court", label: "Food Court" },
    { value: "Banquet hall", label: "Banquet hall" },

  ]

  const billingfrequency = [
    { value: "Monthly", label: "Monthly " },
    { value: "Bi-monthly", label: "Bi-monthly " },
    { value: "Quarterly", label: "Quarterly" },
    { value: "Half-Yearly", label: "Half Yearly" },
    { value: "Yearly", label: "Yearly" },
  ]

  const [cityOptions, setCityOptions] = useState<any>([]);

  const stateOptions = Object.keys(stateCitiesTyped).map((state) => ({
    value: state,
    label: state,
  }));

  const handleStateChange = (selected: { value: string; label: string }) => {
    const cities = stateCitiesTyped[selected.value] || [];
    setCityOptions(cities.map((city) => ({ value: city, label: city })));
  };

  const handleSubmit = (values: any) => {
    const societyDataToUpdate = {
      societyName: values.societyName,
      societyManager: values.societyManager,
      email: values.email,
      contactNumber: values.contactNumber,
      address: values.address,
      country: values.country.value,
      state: values.state.value,
      city: values.city.value,
      pincode: values.pincode,
      interestCalculationType: values.interestCalculationType.value,
      billingFrequency: values.billingFrequency.value,
      annualRateOfInterest: values.annualRateOfInterest,
      interestCalculationStartDate: values.interestCalculationStartDate,
      registrationNumber: values.registrationNumber,
      tanNumber: values.tanNumber,
      panNumber: values.panNumber,
      signatory: values.signatory,
      hsnCode: values.hsnCode,
      gstin: values.gstin,
      bankName: values.bankName,
      accountNumber: values.accountNumber,
      branchName: values.branchName,
      ifscCode: values.ifscCode,
      chequeFavourable: values.chequeFavourable,
      paymentQrFile: values.paymentQrFile
    }

      ; (async () => {
        try {
          const response = await updateSocietyApi(societyDataToUpdate, currentSociety.societyIdentifier)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // window.location.href = "/society/societymaster"
            // Update specific society in the list
            // setSocietyData(prevData =>
            //   prevData.map(society =>
            //     society.societyIdentifier === currentSociety.societyIdentifier
            //       ? { ...society, ...data }
            //       : society
            //   )
            // );
          }
        } catch (error: any) {
          const errorMessage = handleApiError(error);
          showToast("error", errorMessage);
        }
      })()


  }
  useEffect(() => {
    fetchTowersForDropDown()
  }, [])

  const fetchPropertiesForDropDown = async (society: any) => {
    try {
      const response = await getWingPropertiesApi(society.value);
      const formattedData = response.data.data.map((item: any) => ({
        value: item.propertyIdentifier,
        label: item.propertyName ? item.propertyName : item.flatNumber,
      }));
      setPropertiesForDropDown(formattedData);
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }

  const fetchWingsForDropDown = async (society: any) => {
    try {
      const response = await getTowerWingsApi(society.value);
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

  const fetchPropertyDetails = async (property: any) => {
    try {
      const response = await getSinglePropertyDetailsApi(property.value);

      const formattedData = response.data.data?.propertyMembers?.map((item: any) => {
        const { firstName, middleName, lastName } = item.member;
        const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');


        return {
          value: item.memberIdentifier,
          label: fullName,
        };
      });

      setMemberOptions(formattedData);
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }
  };

  const fetchMemberDetails = async (member: any, setFieldValue: any) => {
    try {
      const response = await getMemberDetailApi(member.value);
      setFieldValue("approverContact", response.data.data?.mobileNumber)
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }
  };



  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "editCommiteeMember":
        setEditCommiteeMember(true);
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "editCommiteeMember":
        setEditCommiteeMember(false);
        setSingleCommiteeMemberData(null)
        break;


    }
  };

  const fetchTowersForDropDown = async () => {
    try {
      const response = await getSocietyTowersApi(identifier);
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

  const handleAdd = async (values: any, setFieldValue: any) => {
    const newMember = {
      societyName: values.societyName,
      societyIdentifier: identifier,
      towerIdentifier: values.tower?.value,
      towerName: values.tower?.label,
      wingIdentifier: values.wing?.value,
      wingName: values.wing?.label,
      propertyIdentifier: values.property?.value,
      propertyName: values.property?.label,
      fullName: values.approverName?.label,
      contactNumber: values.approverContact,
      designation: values.designation?.value,
      // applicationType: values.applicationType?.value,
      applicationType: values.applicationType.map((item: any) => item.value),
    };
    try {

      const response = await addNewCommiteeMemberApi(newMember)
      if (response.status === 200) {
        fetchSocietyDetails()
        setFieldValue("tower", { value: "", label: "" });
        setFieldValue("wing", { value: "", label: "" });
        setFieldValue("society", { value: "", label: "" });
        setFieldValue("property", { value: "", label: "" });
        setFieldValue("approverName", "");
        setFieldValue("approverContact", "");
        setFieldValue("designation", { value: "", label: "" });
        setFieldValue("applicationType", []);
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }
  };

  const handleDelete = async (indexToDelete: string) => {
    // setCommiteeMemberData((prevData: any) =>
    //   prevData.filter((_: any, index: number) => index !== indexToDelete)
    // );

    try {
      const response = await deleteCommiteeMemberApi(indexToDelete)
      if (response.status === 200) {
        showToast("success", response.data.message)
        fetchSocietyDetails()
      }
    } catch (error) {

    }
  };

  const handleCommiteeMemberUpdate = async (values: any) => {
    try {
      const newMember = {
        societyName: values.society?.label,
        societyIdentifier: identifier,
        towerIdentifier: values.tower?.value,
        towerName: values.tower?.label,
        wingIdentifier: values.wing?.value,
        wingName: values.wing?.label,
        propertyIdentifier: values.property?.value,
        propertyName: values.property?.label,
        fullName: values.approverName,
        contactNumber: values.approverContact,
        designation: values.designation?.value,
        applicationType: values.applicationType.map((item: any) => item.value),
      };

      const response = await updateCommiteeMemberApi(newMember, singleCommiteeMemberData.committeeMemberIdentifier)
      if (response.status === 201 || response.status === 200) {
        showToast("success", response.data.message);
        fetchSocietyDetails()
      }
      viewDemoClose("editCommiteeMember");
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }
  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}society/societymaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Edit Society Master</span>
        </div>
      </div>

      <Row>
        {currentSociety ? (
          <Formik
            enableReinitialize
            initialValues={{
              societyName: currentSociety?.societyName || "",
              contactNumber: currentSociety?.contactNumber || "",
              email: currentSociety?.email || "",
              societyManager: currentSociety?.societyManager || "",
              address: currentSociety?.address || "",
              country: { value: currentSociety?.country || "", label: currentSociety?.country || "" },
              state: { value: currentSociety?.state || "", label: currentSociety?.state || "" },
              city: { value: currentSociety?.city || "", label: currentSociety?.city || "" },
              pincode: currentSociety?.pincode || "",
              billingFrequency: { value: currentSociety?.billingFrequency || "", label: currentSociety.billingFrequency || "" },
              interestCalculationType: { value: currentSociety?.interestCalculationType || "", label: currentSociety?.interestCalculationType || "" },
              annualRateOfInterest: currentSociety?.annualRateOfInterest || "",
              interestCalculationStartDate: currentSociety?.interestCalculationStartDate?.split('T')[0] || "",
              registrationNumber: currentSociety?.registrationNumber,
              tanNumber: currentSociety?.tanNumber || "",
              panNumber: currentSociety?.panNumber || "",
              signatory: currentSociety?.signatory || "",
              hsnCode: currentSociety?.hsnCode || "",
              gstin: currentSociety?.gstin || "",
              bankName: currentSociety?.accountDetails[0]?.bankName || "",
              accountNumber: currentSociety?.accountDetails[0]?.accountNumber || "",
              branchName: currentSociety?.accountDetails[0]?.branchName || "",
              ifscCode: currentSociety?.accountDetails[0]?.ifscCode || "",
              chequeFavourable: currentSociety?.accountDetails[0]?.chequeFavourable || "",
              paymentQrFile: currentSociety?.accountDetails[0]?.paymentQrPath || "",
              fileName: currentSociety?.accountDetails[0]?.paymentQrPath || "",
              tower: { value: currentSociety?.towerIdentifier || "", label: currentSociety?.towerName || "" },
              wing: { value: currentSociety?.wingIdentifier || "", label: currentSociety?.wingName || "" },
              society: { value: identifier || "", label: currentSociety?.societyName || "" },
              property: currentSociety ? { label: currentSociety.propertyName, value: currentSociety.propertyIdentifier } : { label: "", value: "" },
              approverName: { label: "", value: "" },
              approverContact: "",
              designation: { value: currentSociety?.designation || "", label: currentSociety?.designation || "" },
              // applicationType: { value: currentSociety?.applicationType || "", label: currentSociety?.applicationType || "" },
              applicationType: []
            }
            }
            // validationSchema={validationScWhema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values, resetForm }) => {
              const getFileExtension = (fileName: string) => {
                if (!fileName) {
                  return '';
                }
                return fileName.split(".").pop()?.toLowerCase() || '';
              };
              const getFileName = (fileName: string) => {
                if (!fileName) {
                  return '';
                }
                return fileName?.split("/").pop() || '';
              };
              return (
                <FormikForm>
                  <Col xl={12}>
                    <Card>
                      <CardHeader className='border-bottom'>
                        <h5 className='card-title'>Basic Details</h5>
                      </CardHeader>
                      <Card.Body className='pt-3'>

                        <Row>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society Name <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="societyName"
                                placeholder="Society name"
                                className="form-control"
                              />
                              <ErrorMessage name="societyName" component="div" className="text-danger" />
                            </Form.Group>
                          </Col>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society Contact Number <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="contactNumber"
                                placeholder="Society number"
                                className="form-control"
                              />
                            </Form.Group>
                          </Col>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society Email <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="email"
                                placeholder="Society email"
                                className="form-control"
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society Manager <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="societyManager"
                                placeholder="Society Manager"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="address"
                                placeholder="Address"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Country <span className="text-danger">*</span></Form.Label>
                              <Select
                                options={countryOptions}
                                value={values.country}
                                onChange={(selected) => setFieldValue("country", selected)}
                                placeholder="Select Country"
                                classNamePrefix="Select2"
                              />
                              {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>



                          <Col xl={4}>
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
                              {/* <ErrorMessage name="state" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>City <span className="text-danger">*</span></Form.Label>
                              <Select
                                options={cityOptions}
                                value={values.city}
                                onChange={(selected) => setFieldValue("city", selected)}
                                placeholder="Select City"
                                classNamePrefix="Select2"
                              />
                              {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Pincode <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                className="form-control"
                              />
                            </Form.Group>
                          </Col>



                        </Row>

                      </Card.Body>
                    </Card>
                    <Card>
                      <CardHeader className='border-bottom'>
                        <h5 className='card-title'>Interest Details</h5>
                      </CardHeader>
                      <Card.Body className='pt-3'>

                        <Row>
                          <Col xl={3}>
                            <Form.Group className="form-group">
                              <Form.Label>Interest Calculation Type <span className="text-danger">*</span></Form.Label>
                              <Select
                                options={calculationtype}
                                name="interestCalculationType"
                                value={values.interestCalculationType}
                                placeholder="Select Type"
                                onChange={(selected) => setFieldValue("interestCalculationType", selected)}
                                classNamePrefix="Select2"
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={3}>
                            <Form.Group className="form-group">
                              <Form.Label>Annual Rate of Interest </Form.Label>
                              <Field
                                type="text"
                                name="annualRateOfInterest"
                                placeholder="0.00%"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>
                          <Col xl={3}>
                            <Form.Group className="form-group">
                              <Form.Label>Interest Calculation Start Date<span className="text-danger">*</span></Form.Label>
                              <Field
                                type="date"
                                name="interestCalculationStartDate"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                          <Col xl={3}>
                            <Form.Group className="form-group">
                              <Form.Label>Rate of Interest</Form.Label>
                              <p className='mb-0'>0.0000000000%</p>
                              <em className='tx-12 text-muted'>This field is calculated upon save</em>
                              {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={3}>
                            <Form.Group className="form-group">
                              <Form.Label>Billing Frequency <span className="text-danger">*</span></Form.Label>
                              <Select
                                options={billingfrequency}
                                value={values.billingFrequency}
                                onChange={(selected) => setFieldValue("billingFrequency", selected)}
                                name="billingFrequency"
                                placeholder="Select Billining"
                                classNamePrefix="Select2"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                        </Row>

                      </Card.Body>
                    </Card>

                    <Card>
                      <CardHeader className='border-bottom'>
                        <h5 className='card-title'>Society Document Details</h5>
                      </CardHeader>
                      <Card.Body className='pt-3'>

                        <Row>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society Registration Number <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="registrationNumber"
                                placeholder="Registration number"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>TAN number </Form.Label>
                              <Field
                                type="text"
                                name="tanNumber"
                                placeholder="TAN number"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>PAN No</Form.Label>
                              <Field
                                type="text"
                                name="panNumber"
                                placeholder="PAN number"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Signatory</Form.Label>
                              <Field
                                type="text"
                                name="signatory"
                                placeholder="Signatory"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>



                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>HSN Code </Form.Label>
                              <Field
                                type="text"
                                name="hsnCode"
                                placeholder="HSN code"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="state" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>GSTIN</Form.Label>
                              <Field
                                type="text"
                                name="gstin"
                                placeholder="GSTIN"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>






                        </Row>

                      </Card.Body>
                    </Card>

                    <Card>
                      <CardHeader className='border-bottom'>
                        <h5 className='card-title'>Society Account Details</h5>
                      </CardHeader>
                      <Card.Body className='pt-3'>

                        <Row>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society Bank Name</Form.Label>
                              <Field
                                type="text"
                                name="bankName"
                                placeholder="Bank name"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Account Number </Form.Label>
                              <Field
                                type="text"
                                name="accountNumber"
                                placeholder="Account number"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Branch Name</Form.Label>
                              <Field
                                type="text"
                                name="branchName"
                                placeholder="Branch name"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>IFSC Code</Form.Label>
                              <Field
                                type="text"
                                name="ifscCode"
                                placeholder="IFSC code"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>



                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Cheque Favourable </Form.Label>
                              <Field
                                type="text"
                                name="chequeFavourable"
                                placeholder="Cheque favourable"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="state" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society Payment QR Code</Form.Label>
                              <input
                                type="file"
                                className="form-control"
                                accept="application/pdf"
                                name="paymentQrFile"
                                onChange={(e: any) => setFieldValue("paymentQrFile", e.target.files[0])}
                              />
                              {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                            </Form.Group>
                            {values.fileName && (
                              <p
                                className="text-center pt-2"
                                style={{ cursor: "pointer", color: "blue" }}
                                onClick={() => {
                                  const fileExtension = getFileExtension(values.fileName);


                                  if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                    window.open(import.meta.env.VITE_STATIC_PATH + values.fileName, "_blank");
                                  } else {
                                    const link = document.createElement("a");
                                    link.href = import.meta.env.VITE_STATIC_PATH + values.fileName;
                                    link.download = values.fileName;
                                    link.click();
                                  }
                                }}
                              >
                                {getFileName(values.fileName)}
                              </p>
                            )}
                          </Col>






                        </Row>

                      </Card.Body>
                    </Card>

                    <Card>
                      <CardHeader className='border-bottom'>
                        <h5 className='card-title'>List of Committee Members</h5>
                      </CardHeader>
                      <Card.Body className='pt-3'>
                        <Row>
                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Society </Form.Label>
                              <Select
                                name='society'
                                placeholder="Select Society"
                                classNamePrefix="Select2"
                                onChange={(selected) => setFieldValue("society", selected)}
                                value={values.society}
                                isDisabled
                              />
                            </Form.Group>
                          </Col>



                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Tower </Form.Label>
                              <Select
                                options={towerOptions}
                                placeholder="Select Tower"
                                classNamePrefix="Select2"
                                name='tower'
                                onChange={(selected) => {
                                  fetchWingsForDropDown(selected);
                                  setFieldValue("wing", null);
                                  setFieldValue("property", null);
                                  setFieldValue("tower", selected);
                                }}
                                value={values.tower}
                              />
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Wing </Form.Label>
                              <Select
                                options={wingOptions}
                                placeholder="Select Wing"
                                classNamePrefix="Select2"
                                name='wing'
                                onChange={(selected) => {
                                  fetchPropertiesForDropDown(selected);
                                  setFieldValue("property", null);
                                  setFieldValue("wing", selected);
                                }}
                                value={values.wing}
                              />
                            </Form.Group>
                          </Col>
                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Property </Form.Label>
                              <Select
                                placeholder="Select property"
                                options={propertiesForDropDown}
                                classNamePrefix="Select2"
                                name='property'
                                onChange={(selected) => {
                                  setFieldValue("property", selected)
                                  fetchPropertyDetails(selected)
                                }}
                                value={values.property}
                              />
                            </Form.Group>
                          </Col>

                          {/* <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Flat </Form.Label>
                              <Select
                                placeholder="Select Flat"
                                classNamePrefix="Select2"
                                name='flat'
                              />
                            </Form.Group>
                          </Col> */}



                          {/* <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Approver Name</Form.Label>
                              <Field
                                type="text"
                                name="approverName"
                                placeholder="Approver Name"
                                className="form-control"
                                value={values.approverName}
                              />
                            </Form.Group>
                          </Col> */}
                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Approver Name </Form.Label>
                              <Select
                                options={memberOptions}
                                placeholder="Select Approver"
                                classNamePrefix="Select2"
                                name='approverName'
                                onChange={(selected) => {
                                  fetchMemberDetails(selected, setFieldValue)
                                  setFieldValue("approverName", selected);
                                }}
                                value={values.approverName}
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Approver Contact</Form.Label>
                              <Field
                                type="text"
                                name="approverContact"
                                placeholder="Contact"
                                className="form-control"
                                value={values.approverContact}
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Designation </Form.Label>
                              <Select
                                options={designation}
                                placeholder="Select Designation"
                                classNamePrefix="Select2"
                                name='designation'
                                onChange={(selected) => setFieldValue("designation", selected)}
                                value={values.designation}
                              />
                            </Form.Group>
                          </Col>



                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Application Type </Form.Label>
                              <Select<OptionType, true>
                                isMulti
                                options={applicationtype}
                                placeholder="Select Type"
                                classNamePrefix="Select2"
                                name='applicationType'
                                onChange={(selected) => setFieldValue("applicationType", selected)}
                                value={values.applicationType}
                              />
                            </Form.Group>
                          </Col>



                          <Col xl={12}>
                            <Form.Group className="form-group float-end pt-2">
                              <Button className="btn btn-default ms-2" type="button" onClick={() => resetForm()}>Clear </Button>
                              <Button className="btn btn-primary" type="button" onClick={() => handleAdd(values, setFieldValue)}>ADD </Button>
                            </Form.Group>
                          </Col>
                        </Row>
                        <hr />
                        {/* <table className='table mt-3'>
                          <thead>
                            <tr>
                              <th>S.no.</th>
                              <th>Society</th>
                              <th>Tower</th>
                              <th>Wing</th>
                              <th>Flat </th>
                              <th>Approver Name</th>
                              <th>Approver Contact</th>
                              <th>Designation</th>
                              <th>Application Type</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Association</td>
                              <td>Tower A</td>
                              <td>A</td>
                              <td>123</td>
                              <td>Sandeep Singh</td>
                              <td>-</td>
                              <td>Secretary</td>
                              <td>Flat Resale</td>
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
                          <div className='table-rasponsive'>
                            <DataTableExtensions {...tableData}>
                              <DataTable columns={columns} data={commiteeMemberData} pagination fixedHeader />
                            </DataTableExtensions>
                          </div>
                        </Col>

                      </Card.Body>
                    </Card>

                    <span className='float-end mb-5'>
                      <Button variant="default ms-3"> Cancel </Button>
                      <Button className="btn btn-primary" type="submit">Update </Button>
                    </span>
                  </Col>
                </FormikForm>
              )
            }}
          </Formik>
        ) : (
          <p>Loading society data...</p>
        )}
        <Modal show={editCommiteeMember} centered>
          <Modal.Header>
            <Modal.Title>Edit Commitee Member</Modal.Title>
            <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("editCommiteeMember"); }}>
              x
            </Button>
          </Modal.Header>
          <Formik
            enableReinitialize
            initialValues={{
              commiteeMemberId: singleCommiteeMemberData?.commiteeMemberId || "",
              tower: { value: singleCommiteeMemberData?.towerIdentifier || "", label: singleCommiteeMemberData?.towerName || "" },
              wing: { value: singleCommiteeMemberData?.wingIdentifier || "", label: singleCommiteeMemberData?.wingName || "" },
              society: { value: identifier || "", label: currentSociety?.societyName || "" },
              property: singleCommiteeMemberData ? { label: singleCommiteeMemberData.propertyName, value: singleCommiteeMemberData.propertyIdentifier } : { label: "", value: "" },
              approverName: singleCommiteeMemberData?.fullName || "",
              approverContact: singleCommiteeMemberData?.contactNumber || "",
              designation: { value: singleCommiteeMemberData?.designation || "", label: singleCommiteeMemberData?.designation || "" },
              // applicationType: { value: singleCommiteeMemberData?.applicationType || "", label: singleCommiteeMemberData?.applicationType || "" },
              applicationType: Array.isArray(singleCommiteeMemberData?.applicationType)
                ? singleCommiteeMemberData.applicationType.map((item: any) => ({ label: item, value: item }))
                : [],
            }}
            onSubmit={handleCommiteeMemberUpdate}
          >
            {({ setFieldValue, values }) => {
              return (
                <FormikForm>
                  <Modal.Body className='pt-1'>
                    <Row>
                      <Col xl={6}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Society </Form.Label>
                          <Select
                            name='society'
                            placeholder="Select Society"
                            classNamePrefix="Select2"
                            onChange={(selected) => setFieldValue("society", selected)}
                            value={values.society}
                            isDisabled
                          />
                        </Form.Group>
                      </Col>



                      <Col xl={6}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Tower </Form.Label>
                          <Select
                            options={towerOptions}
                            placeholder="Select Tower"
                            classNamePrefix="Select2"
                            name='tower'
                            onChange={(selected) => {
                              fetchWingsForDropDown(selected);
                              setFieldValue("wing", null);
                              setFieldValue("property", null);
                              setFieldValue("tower", selected);
                            }}
                            value={values.tower}
                          />
                        </Form.Group>
                      </Col>


                      <Col xl={6}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Wing </Form.Label>
                          <Select
                            options={wingOptions}
                            placeholder="Select Wing"
                            classNamePrefix="Select2"
                            name='wing'
                            onChange={(selected) => {
                              fetchPropertiesForDropDown(selected);
                              setFieldValue("property", null);
                              setFieldValue("wing", selected);
                            }}
                            value={values.wing}
                          />
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Property </Form.Label>
                          <Select
                            placeholder="Select property"
                            options={propertiesForDropDown}
                            classNamePrefix="Select2"
                            name='property'
                            onChange={(selected) => setFieldValue("property", selected)}
                            value={values.property}
                          />
                        </Form.Group>
                      </Col>

                      {/* <Col xl={6}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Flat </Form.Label>
                              <Select
                                placeholder="Select Flat"
                                classNamePrefix="Select2"
                                name='flat'
                              />
                            </Form.Group>
                          </Col> */}



                      <Col xl={6}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Approver Name</Form.Label>
                          <Field
                            type="text"
                            name="approverName"
                            placeholder="Approver Name"
                            className="form-control"
                            value={values.approverName}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Approver Contact</Form.Label>
                          <Field
                            type="text"
                            name="approverContact"
                            placeholder="Contact"
                            className="form-control"
                            value={values.approverContact}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Designation </Form.Label>
                          <Select
                            options={designation}
                            placeholder="Select Designation"
                            classNamePrefix="Select2"
                            name='designation'
                            onChange={(selected) => setFieldValue("designation", selected)}
                            value={values.designation}
                          />
                        </Form.Group>
                      </Col>



                      <Col xl={6}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Application Type </Form.Label>
                          <Select
                            isMulti
                            options={applicationtype}
                            placeholder="Select Type"
                            classNamePrefix="Select2"
                            name='applicationType'
                            onChange={(selected) => setFieldValue("applicationType", selected)}
                            value={values.applicationType}
                          />
                        </Form.Group>
                      </Col>





                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="default" onClick={() => { viewDemoClose("editCommiteeMember"); }}>
                      Close
                    </Button>
                    <Button variant="primary" type='submit' >
                      Save
                    </Button>

                  </Modal.Footer>
                </FormikForm>
              )
            }}
          </Formik>


        </Modal>
      </Row>
      <CustomToastContainer />

    </Fragment >
  );
}
