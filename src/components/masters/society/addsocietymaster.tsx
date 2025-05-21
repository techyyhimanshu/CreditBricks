
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Card, Row, Accordion, Button, Form, Dropdown, FormControl } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import stateCities from "../stateCity.json"
import { Link } from "react-router-dom";
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import * as Yup from 'yup';
import { addSocietyApi, updateSocietyApi } from '../../../api/society-api';
import { CustomToastContainer, showToast } from '../../../common/services/toastServices';
import { handleApiError } from '../../../helpers/handle-api-error';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import interestDetails from './societyTabs/interestDetails';
// Define the types for the stateCities object
interface StateCities {
  [key: string]: string[]; // Index signature
}
const uploader = Uploader({
  // Get production API keys from Upload.io
  apiKey: 'free'
});

const selectFieldValidation = (fieldLabel: string) =>
  Yup.object()
    .nullable()
    .test(fieldLabel, `${fieldLabel} is required`, function (val: any) {

      if (!val || typeof val !== 'object') return false;

      if (typeof val.value === 'undefined' || val.value === null || val.value === '') return false;

      return true;
    });

const validationSchema = Yup.object().shape({
  societyName: Yup.string().required('Society name is required'),
  contactNumber: Yup.string()
    .required('Contact number is required')
    .matches(/^\d{10}$/, 'Invalid Contact Number'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  societyManager: Yup.string().required('Society manager is required'),
  address: Yup.string().required('Address is required'),
  country: selectFieldValidation('Country'),
  state: selectFieldValidation('State'),
  city: selectFieldValidation('City'),
  pincode: Yup.string()
    .required('Pincode is required')
    .matches(/^\d+$/, 'Pincode must be a number'),

  billingFrequency: selectFieldValidation('Billing Frequency'),
  interestCalculationType: selectFieldValidation('Interest Calculation Type'),
  annualRateOfInterest: Yup.number()
    .typeError('Annual rate of interest must be a number')
    .required('Annual rate of interest is required')
    .positive("Invalid Rate of interest"),
  interestCalculationStartDate: Yup.date()
    .required('Interest calculation date is required'),

  registrationNumber: Yup.string().required('Registration number is required'),
  tanNumber: Yup.string().required('TAN number is required'),
  panNumber: Yup.string().required('PAN number is required'),
  signatory: Yup.string().required('Signatory is required'),
  hsnCode: Yup.string().required('HSN code is required'),
  gstin: Yup.string().required('GSTIN is required')
});

const stateCitiesTyped: StateCities = stateCities;
export default function AddSocietyMaster() {
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    branchName: "",
    ifscCode: "",
    chequeFavourable: "",
    paymentQrFile: null as File | null,
    isPreferred: false
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentSociety, setCurrentSociety] = useState({
    societyId: null,
    societyName: '',
    contactNumber: '',
    email: '',
    societyManager: '',
    address: '',
    country: null,
    state: null,
    city: null,
    pincode: '',
    billingFrequency: null,
    interestCalculationType: null,
    annualRateOfInterest: '',
    interestCalculationStartDate: '',
    registrationNumber: '',
    tanNumber: '',
    panNumber: '',
    signatory: '',
    hsnCode: '',
    gstin: '',
    bankName: '',
    accountNumber: '',
    branchName: '',
    ifscCode: '',
    chequeFavourable: '',
    paymentQrFile: null
  });
  const [societyData, setSocietyData] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const countryOptions: any = [{ value: "India", label: "India" }]

  const [cityOptions, setCityOptions] = useState<any>([]);
  const [bankData, setBankData] = useState<Row[]>([]);
  type Row = {
    id: number;
    isPreferred: boolean;
    bankName: string;
    accountNumber: string;
    branchName: string;
    ifscCode: string;
    chequeFavourable: string;
    paymentQrFile: File | null;
  };

  const columns = [
    {
      name: "S.no.",
      cell: (_: any, index: number) => index + 1,
      sortable: true,
    },
    {
      name: "Preferred",
      cell: (row: Row) => (
        row.isPreferred ? <i className='bi bi-check-circle text-success tx-20'></i> : ""
      ),
    },
    {
      name: "Bank Name",
      selector: (row: Row) => row.bankName,
    },
    {
      name: "Account Number",
      selector: (row: Row) => row.accountNumber,
    },
    {
      name: "IFSC Code",
      selector: (row: Row) => row.ifscCode,
    },
    {
      name: "Cheque Favourable",
      selector: (row: Row) => row.chequeFavourable,
    },
    {
      name: 'Payment QR',
      cell: (row: Row) =>
        row.paymentQrFile ? (
          <a href={URL.createObjectURL(row.paymentQrFile)} target="_blank" rel="noopener noreferrer">
            <i className="bi bi-image text-info"></i>
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
          <button className="btn bg-info-transparent ms-2 btn-sm" onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ),
    },
  ];

  const tableData = {
    columns,
    data: bankData
  };
  const calculationtype = [
    { value: "Bill Date", label: "Bill Date" },
    { value: "Due Date", label: "Due Date" },
  ]


  const billingfrequency = [
    { value: "Monthly", label: "Monthly " },
    { value: "Bi-monthly", label: "Bi-monthly " },
    { value: "Quarterly", label: "Quarterly" },
    { value: "Half-Yearly", label: "Half Yearly" },
    { value: "Yearly", label: "Yearly" },
  ]


  const stateOptions = Object.keys(stateCitiesTyped).map((state) => ({
    value: state,
    label: state,
  }));

  const handleStateChange = (selected: { value: string; label: string }) => {
    const cities = stateCitiesTyped[selected.value] || [];
    setCityOptions(cities.map((city) => ({ value: city, label: city })));
  };

  const handleSubmit = async (values: any) => {
    try {
      // Step 1: Rename paymentQrFile names
      const updatedBankData = bankData.map((bank, index) => {
        if (bank.paymentQrFile) {
          const oldFile = bank.paymentQrFile;
          const newFile = new File([oldFile], `${bank.accountNumber}.pdf`, { type: oldFile.type });
          return { ...bank, paymentQrFile: newFile };
        }
        return bank;
      });

      // Step 2: Create FormData
      const formData = new FormData();

      // Append society details
      const societyDetails = {
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
        gstin: values.gstin
      };

      Object.entries(societyDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Convert bank data to JSON (excluding files)
      const bankAccountsWithoutFiles = updatedBankData.map(({ paymentQrFile, ...rest }) => rest);
      formData.append("bankAccounts", JSON.stringify(bankAccountsWithoutFiles));

      // Append files separately
      updatedBankData.forEach((bank) => {
        if (bank.paymentQrFile instanceof File) {
          formData.append("paymentQrFiles", bank.paymentQrFile);
        }
      });


      // Step 3: API Call
      const response = await addSocietyApi(formData)
      if (response.status === 201 || response.status === 200) {
        showToast("success", response.data.message);
      }
    } catch (error) {
      handleApiError(error);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  const handleDelete = (index: number) => {
    setBankData(prevState => prevState.filter((_, i) => i !== index));
  };
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prevState => ({
        ...prevState,
        paymentQrFile: e.target.files![0]
      }));
    }
  };
  const resetForm = () => {
    setFormData({
      bankName: "",
      accountNumber: "",
      branchName: "",
      ifscCode: "",
      chequeFavourable: "",
      paymentQrFile: null,
      isPreferred: false
    });
  };
  const handleAddNewBank = () => {
    const requiredFields: { [key: string]: string } = {
      bankName: "Bank Name",
      accountNumber: "Account Number",
      branchName: "Branch Name",
      ifscCode: "IFSC Code",
      chequeFavourable: "Cheque Favourable Name",
      // Add file validation if needed
    };

    // Check for missing fields
    const missingField = Object.entries(requiredFields).find(
      ([key]) => !formData[key as keyof typeof formData]
    );

    if (missingField) {
      const [, fieldLabel] = missingField;
      showToast("error", `${fieldLabel} is required`);
      return;
    }

    // if (!formData.paymentQrFile) {
    //   showToast("error", "QR Code File is required");
    //   return;
    // }
    // const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg", "image/webp"];
    // const fileType = formData.paymentQrFile.type;

    // if (!allowedTypes.includes(fileType)) {
    //   showToast("error", "Only PDF and image formats (JPG, PNG, WEBP) are allowed");
    //   return;
    // }

    if (formData.paymentQrFile) {
      const allowedTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp"
      ];
      const fileType = formData.paymentQrFile.type;

      if (!allowedTypes.includes(fileType)) {
        showToast("error", "Only PDF and image formats (JPG, PNG, WEBP) are allowed");
        return;
      }
    }
    if (editingIndex !== null) {
      // Update existing row
      const updatedData = [...bankData];
      updatedData[editingIndex] = { ...formData, id: editingIndex + 1 };
      setBankData(updatedData);
      setEditingIndex(null);
    } else {
      // Add new row
      setBankData(prevState => [
        ...prevState,
        { ...formData, id: prevState.length + 1 }
      ]);
    }
    // resetForm();
  };
  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}society/societymaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Add Society Master</span>
        </div>
      </div>

      <Row>
        <Formik
          initialValues={{
            societyName: currentSociety?.societyName || "",
            contactNumber: currentSociety?.contactNumber || "",
            email: currentSociety?.email || "",
            societyManager: currentSociety?.societyManager || "",

            address: currentSociety?.address || "",

            country: { value: "", label: "" },

            state: { value: currentSociety.state, label: currentSociety.state },

            city: { value: currentSociety.city, label: currentSociety.city },
            pincode: currentSociety?.pincode,
            billingFrequency: { value: currentSociety.billingFrequency, label: currentSociety.billingFrequency },

            interestCalculationType: currentSociety?.interestCalculationType,

            annualRateOfInterest: currentSociety?.annualRateOfInterest,

            interestCalculationStartDate: currentSociety?.interestCalculationStartDate,

            registrationNumber: currentSociety?.registrationNumber,
            tanNumber: currentSociety?.tanNumber,
            panNumber: currentSociety?.panNumber,
            signatory: currentSociety?.signatory,
            hsnCode: currentSociety?.hsnCode,
            gstin: currentSociety?.gstin,

            bankName: currentSociety?.bankName,
            accountNumber: currentSociety?.accountNumber,
            branchName: currentSociety?.branchName,
            ifscCode: currentSociety?.ifscCode,
            chequeFavourable: currentSociety?.chequeFavourable,
            paymentQrFile: currentSociety?.paymentQrFile
          }
          }
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <FormikForm className='col-sm-12'>
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
                              <ErrorMessage name="contactNumber" component="div" className="text-danger" />
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
                              <ErrorMessage name="email" component="div" className="text-danger" />
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
                              <ErrorMessage name="societyManager" component="div" className="text-danger" />
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
                              <ErrorMessage name="address" component="div" className="text-danger" />
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

                              <ErrorMessage name="country" component="div" className="text-danger" />
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
                              <ErrorMessage name="state" component="div" className="text-danger" />
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
                              <ErrorMessage name="city" component="div" className="text-danger" />
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
                              <ErrorMessage name="pincode" component="div" className="text-danger" />
                            </Form.Group>
                          </Col>



                        </Row>

                      </Card.Body>
                    </Card>


                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="Interest Details" className="bg-white  mb-3">
                  <Accordion.Header className="borders">
                    Interest Details
                  </Accordion.Header>
                  <Accordion.Body className="borders p-0">
                    <Card className='m-0'>

                      <Card.Body className='pt-3'>

                        <Row>
                          <Col xl={3}>
                            <Form.Group className="form-group">
                              <Form.Label>Interest Calculation Type <span className="text-danger">*</span></Form.Label>
                              <Select
                                options={calculationtype}
                                name="interestCalculationType"
                                placeholder="Select Type"
                                onChange={(selected) => setFieldValue("interestCalculationType", selected)}
                                classNamePrefix="Select2"
                              />
                              <ErrorMessage name="interestCalculationType" component="div" className="text-danger" />
                            </Form.Group>
                          </Col>

                          <Col xl={3}>
                            <Form.Group className="form-group">
                              <Form.Label>Annual Rate of Interest <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="annualRateOfInterest"
                                placeholder="0.00%"
                                className="form-control"
                              />
                              <ErrorMessage name="annualRateOfInterest" component="div" className="text-danger" />
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
                              <ErrorMessage name="interestCalculationStartDate" component="div" className="text-danger" />
                            </Form.Group>
                          </Col>

                          <Col xl={3}>
                            <Form.Group className="form-group">
                              <Form.Label>Rate of Interest</Form.Label>
                              <p className='mb-0'>0.0000000000%</p>
                              <em className='tx-12 text-muted'>This field is calculated upon save</em>

                            </Form.Group>
                          </Col>


                          <Col xl={3}>
                            <Form.Group className="form-group">
                              <Form.Label>Billing Frequency <span className="text-danger">*</span></Form.Label>
                              <Select
                                options={billingfrequency}
                                name="billingFrequency"
                                onChange={(selected) => setFieldValue("billingFrequency", selected)}
                                placeholder="Select Billing"
                                classNamePrefix="Select2"
                              />
                              <ErrorMessage name="billingFrequency" component="div" className="text-danger" />
                            </Form.Group>
                          </Col>

                        </Row>

                      </Card.Body>
                    </Card>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="Society Document Details" className="bg-white  mb-3">
                  <Accordion.Header className="borders">
                    Society Document Details
                  </Accordion.Header>
                  <Accordion.Body className="borders p-0">
                    <Card className='m-0'>

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
                              <ErrorMessage name="registrationNumber" component="div" className="text-danger" />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>TAN number <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="tanNumber"
                                placeholder="TAN number"
                                className="form-control"
                              />
                              <ErrorMessage name="tanNumber" component="div" className="text-danger" />
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>PAN No <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="panNumber"
                                placeholder="PAN number"
                                className="form-control"
                              />
                              <ErrorMessage name="panNumber" component="div" className="text-danger" />
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Signatory <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="signatory"
                                placeholder="Signatory"
                                className="form-control"
                              />
                              <ErrorMessage name="signatory" component="div" className="text-danger" />
                            </Form.Group>
                          </Col>



                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>HSN Code <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="hsnCode"
                                placeholder="HSN code"
                                className="form-control"
                              />
                              <ErrorMessage name="hsnCode" component="div" className="text-danger" />
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>GSTIN <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="gstin"
                                placeholder="GSTIN"
                                className="form-control"
                              />
                              <ErrorMessage name="gstin" component="div" className="text-danger" />
                            </Form.Group>
                          </Col>






                        </Row>

                      </Card.Body>
                    </Card>
                  </Accordion.Body>
                </Accordion.Item>



                <Accordion.Item eventKey="Society Account Details" className="bg-white  mb-3">
                  <Accordion.Header className="borders">
                    Society Account Details
                  </Accordion.Header>
                  <Accordion.Body className="borders p-0">
                    <Card className="m-0">
                      <Card.Body className="pt-3">
                        <Row>
                          <Col xl={4}>
                            <Form.Group>
                              <Form.Label>Society Bank Name <span className="text-danger">*</span></Form.Label>
                              <input type="text" name="bankName" placeholder="Bank name" className="form-control" value={formData.bankName} onChange={handleInputChange} />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group>
                              <Form.Label>Account Number <span className="text-danger">*</span></Form.Label>
                              <input type="text" name="accountNumber" placeholder="Account number" className="form-control" value={formData.accountNumber} onChange={handleInputChange} />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group>
                              <Form.Label>Branch Name <span className="text-danger">*</span></Form.Label>
                              <input type="text" name="branchName" placeholder="Branch name" className="form-control" value={formData.branchName} onChange={handleInputChange} />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group>
                              <Form.Label>IFSC Code <span className="text-danger">*</span></Form.Label>
                              <input type="text" name="ifscCode" placeholder="IFSC code" className="form-control" value={formData.ifscCode} onChange={handleInputChange} />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group>
                              <Form.Label>Cheque Favourable <span className="text-danger">*</span></Form.Label>
                              <input type="text" name="chequeFavourable" placeholder="Cheque favourable" className="form-control" value={formData.chequeFavourable} onChange={handleInputChange} />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group>
                              <Form.Label>Society Payment QR Code <span className="text-danger">*</span></Form.Label>
                              <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group>
                              <div className="custom-checkbox custom-control mt-3">
                                <input type="checkbox" className="custom-control-input" id="checkbox-2" name="isPreferred" checked={formData.isPreferred} onChange={handleInputChange} />
                                <Form.Label htmlFor="checkbox-2" className="custom-control-label mt-1">Is Preferred Bank</Form.Label>
                              </div>
                            </Form.Group>
                          </Col>

                          <Col xl={8}>
                            <Button className="btn btn-primary float-end btn-sm mt-3" onClick={handleAddNewBank}>
                              {editingIndex !== null ? "Update" : "Add"}
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl={12}>
                            <DataTableExtensions {...tableData}>
                              <DataTable columns={columns} data={bankData} pagination fixedHeader />
                            </DataTableExtensions>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Accordion.Body>
                </Accordion.Item>

                {/* <Accordion.Item eventKey="Add Parent Scoiety" className="bg-white  mb-3">
                  <Accordion.Header className="borders">
                    List of Committee Members
                  </Accordion.Header>
                  <Accordion.Body className="borders p-0">
                    <Card className='m-0'>

                      <Card.Body className='pt-3'>
                        <Row>
                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Society </Form.Label>
                              <Select
                                options={society}
                                placeholder="Select Society"
                                classNamePrefix="Select2"
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Property </Form.Label>
                              <Select
                                options={property}
                                placeholder="Select property"
                                classNamePrefix="Select2"
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Tower </Form.Label>
                              <Select
                                options={wing}
                                placeholder="Select Tower"
                                classNamePrefix="Select2"
                              />
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Wing </Form.Label>
                              <Select
                                options={wing}
                                placeholder="Select Wing"
                                classNamePrefix="Select2"
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Flat </Form.Label>
                              <Select
                                options={flat}
                                placeholder="Select Flat"
                                classNamePrefix="Select2"
                              />
                            </Form.Group>
                          </Col>



                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Approver Name</Form.Label>
                              <Field
                                type="text"
                                name="approverName"
                                placeholder="Approver Name"
                                className="form-control"
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Approver Contact</Form.Label>
                              <Field
                                type="text"
                                name="contactdetails"
                                placeholder="Contact"
                                className="form-control"
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
                              />
                            </Form.Group>
                          </Col>



                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>Application Type </Form.Label>
                              <Select
                                options={applicationtype}
                                placeholder="Select Type"
                                classNamePrefix="Select2"
                              />
                            </Form.Group>
                          </Col>



                          <Col xl={12}>
                            <Form.Group className="form-group float-end pt-2">
                              <Button className="btn btn-default ms-2" type="button">Clear </Button>
                              <Button className="btn btn-primary" type="button">Save </Button>
                            </Form.Group>
                          </Col>
                        </Row>
                        <hr />
                        <table className='table mt-3'>
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
                        </table>

                      </Card.Body>
                    </Card>
                  </Accordion.Body>
                </Accordion.Item> */}


              </Accordion>

              <span className='float-end mb-5'>
                <Button variant="default ms-3"> Cancel </Button>
                <Button className="btn btn-primary" type="submit">Save </Button>
              </span>

            </FormikForm>
          )}
        </Formik>
        <CustomToastContainer />

      </Row>

    </Fragment >
  );
}


{/* <ErrorMessage name="country" component="div" className="text-danger" /> */ }

{/* <Col xl={4}>
                            <Form.Group className="form-group pt-2">

                             <Link to={`${import.meta.env.BASE_URL}society/addparentsociety`} className='btn btn-primary mt-4'>Add Parent</Link>
                            </Form.Group>
                          </Col> */}