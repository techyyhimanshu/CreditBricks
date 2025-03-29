
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Accordion, Button, Form, Dropdown, FormControl, Modal } from "react-bootstrap";
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
import { deleteVehicleApi, getTenantApi, updateTenantApi, updateVehicleApi } from '../../api/tenant-api';
interface StateCities {
  [key: string]: string[]; // Index signature
}
const stateCitiesTyped: StateCities = stateCities;
export default function UpdateTenant() {
  const [societyOptions, setSocietyOptions] = useState([]);
  const [editVehicle, setEditVehicle] = useState(false);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState<any>([]);
  const [currentTenant, setCurrentTenant] = useState<any>(null);
  const [vehicleFormData, setVehicleFormData] = useState<any>({
    vehicleType: null,
    vehicleNumber: "",
    vehicleRC: null as File | null,
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [vehicleData, setVehicleData] = useState<Row[]>([]);
  const [singleVehicleData, setSingleVehicleData] = useState<any>(null);
  const params = useParams()
  const identifier = params.identifier as string


  useEffect(() => {
    const fetchTenantDetails = async () => {
      try {
        const response = await getTenantApi(identifier)
        setCurrentTenant(response.data.data)
        setVehicleData(response?.data?.data?.tenantVehicles || [])
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
      cell: (_: any, index: number) => index + 1,
      sortable: true,
    },
    {
      name: "Vehicle Type",
      selector: (row: any) => row.vehicleType,
    },
    {
      name: "Vehicle Number",
      selector: (row: any) => row.vehicleNumber,
    },
    {
      name: 'Vehicle RC',
      cell: (row: any) =>
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
      cell: (row: any, index: number) => (
        <div>
          <button className="btn btn-light btn-sm" type="button"
            onClick={() => { setSingleVehicleData(row), viewDemoShow("editVehicle") }}
          >Edit</button>
          <button className="btn bg-info-transparent ms-2 btn-sm" type="button"
            onClick={() => handleDelete(index, row)}>Delete</button>
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

  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "editVehicle":
        setEditVehicle(true);
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "editVehicle":
        setEditVehicle(false);
        setSingleVehicleData(null)
        break;


    }
  };
  const handleAddNewVehicle = () => {

    if (editingIndex !== null) {
      // Update existing row
      const updatedData = [...vehicleData];
      updatedData[editingIndex] = { ...vehicleFormData, id: editingIndex + 1 };
      setVehicleData(updatedData);
      setEditingIndex(null);
    } else {
      handleVehicleUpdate(vehicleFormData)
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
      setVehicleFormData((prevState: any) => ({
        ...prevState,
        vehicleRC: e.target.files![0]
      }));
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setVehicleFormData((prevState: any) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  const handleVehicleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVehicleFormData((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDelete = async (index: number, row: any) => {
    try {
      const response = await deleteVehicleApi(identifier, row.vehicleId)
      if (response.status === 200) {
        showToast("success", response.data.message)
        setVehicleData(prevState => prevState.filter((_, i) => i !== index));
      }
    } catch (error) {

    }

  };

  const handleVehicleUpdate = async (values: any) => {
    try {
      const formData = new FormData();

      const vehicleDetails = {
        vehicleNumber: values.vehicleNumber,
        vehicleType: values.vehicleType.value || values.vehicleType,
      }
      Object.entries(vehicleDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (values.vehicleRc || values.vehicleRC) {
        formData.append("vehicleRCFile", values.vehicleRc || values.vehicleRC)
      }
      if (values.vehicleId) {
        formData.append("vehicleId", values.vehicleId)
      }

      const response = await updateVehicleApi(formData, identifier)
      if (response.status === 201 || response.status === 200) {
        showToast("success", response.data.message);

      }
      viewDemoClose("editVehicle");
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }
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
          society: { value: currentTenant?.society?.societyIdentifier || "", label: currentTenant?.society?.societyName || "" },
          property: { value: currentTenant?.property?.propertyIdentifier || "", label: currentTenant?.property?.propertyName || "" },
          firstName: currentTenant?.firstName || "",
          middleName: currentTenant?.middleName || "",
          lastName: currentTenant?.lastName || "",
          mobileNumber: currentTenant?.mobileNumber || "",
          alternateMobileNumber: currentTenant?.alternateMobileNumber || "",
          email: currentTenant?.email || "",
          gender: { value: currentTenant?.gender || "", label: currentTenant?.gender || "" },
          age: currentTenant?.age || "",
          dateOfBirth: currentTenant?.dateOfBirth || "",
          anniversary: currentTenant?.anniversary || "",
          address: currentTenant?.address || "",
          country: { value: currentTenant?.country || "", label: currentTenant?.country || "" },
          state: { value: currentTenant?.state || "", label: currentTenant?.state || "" },
          city: { value: currentTenant?.city || "", label: currentTenant?.city || "" },
          pincode: currentTenant?.pincode || "",
          familyMembers: currentTenant?.familyMembers || "",
          havePet: { value: currentTenant?.havePet || "", label: currentTenant?.havePet === true ? "Yes" : currentTenant?.havePet === false ? "No" : "" },
          aadharNumber: currentTenant?.aadharNumber || "",
          rentRegistrationId: currentTenant?.property?.rentRegistrationId || "",
          rentAgreementStartDate: currentTenant?.property?.rentAgreementStartDate || "",
          rentAgreementEndDate: currentTenant?.property?.rentAgreementEndDate || "",
          monthlyRent: currentTenant?.property?.monthlyRent || "",
          depositAmount: currentTenant?.property?.depositAmount || "",
          dueAmount: currentTenant?.property?.dueAmount || "",
          rentAgreementFile: "",
          rentAgreementFileName: currentTenant?.property?.rentAgreementFile,
          policeVerificationFileName: currentTenant?.property?.policeVerificationFile,
          policeVerificationFile: "",

        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => {
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
                                value={values.society}
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
                                value={values.property}
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
                                value={values.gender}
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
                                value={values.country}
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>State</Form.Label>
                              <Select
                                options={stateOptions}
                                onChange={(selected: any) => {
                                  setFieldValue("state", selected);
                                  handleStateChange({
                                    value: selected.value,
                                    label: selected.label
                                  });
                                }}
                                placeholder="Select state"
                                classNamePrefix="Select2"
                                value={values.state}
                              />
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group mb-1">
                              <Form.Label>City</Form.Label>
                              <Select
                                options={cityOptions}
                                onChange={(selected) => {
                                  setFieldValue("city", selected);
                                }}
                                placeholder="Select city"
                                classNamePrefix="Select2"
                                value={values.city}
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
                                value={values.havePet}
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
                            {values.rentAgreementFileName && (
                              <p
                                className="text-center pt-2"
                                style={{ cursor: "pointer", color: "blue" }}
                                onClick={() => {
                                  const fileExtension = getFileExtension(values.rentAgreementFileName);


                                  // If it's a PDF, image, or Excel file, open in new tab
                                  if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                    window.open(import.meta.env.VITE_STATIC_PATH + values.rentAgreementFileName, "_blank");
                                  } else {
                                    // For other files, trigger download
                                    const link = document.createElement("a");
                                    link.href = import.meta.env.VITE_STATIC_PATH + values.rentAgreementFileName;
                                    link.download = values.rentAgreementFileName;
                                    link.click();
                                  }
                                }}
                              >
                                {getFileName(values.rentAgreementFileName)}
                              </p>
                            )}
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
                            {values.policeVerificationFileName && (
                              <p
                                className="text-center pt-2"
                                style={{ cursor: "pointer", color: "blue" }}
                                onClick={() => {
                                  const fileExtension = getFileExtension(values.policeVerificationFileName);


                                  // If it's a PDF, image, or Excel file, open in new tab
                                  if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                    window.open(import.meta.env.VITE_STATIC_PATH + values.policeVerificationFileName, "_blank");
                                  } else {
                                    // For other files, trigger download
                                    const link = document.createElement("a");
                                    link.href = import.meta.env.VITE_STATIC_PATH + values.policeVerificationFileName;
                                    link.download = values.policeVerificationFileName;
                                    link.click();
                                  }
                                }}
                              >
                                {getFileName(values.policeVerificationFileName)}
                              </p>
                            )}
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
          )
        }}
      </Formik>
      <Modal show={editVehicle} centered>
        <Modal.Header>
          <Modal.Title>Edit Vehicle Details</Modal.Title>
          <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("editVehicle"); }}>
            x
          </Button>
        </Modal.Header>
        <Formik
          enableReinitialize
          initialValues={{
            vehicleId: singleVehicleData?.vehicleId || "",
            vehicleNumber: singleVehicleData?.vehicleNumber || "",
            vehicleType: singleVehicleData ? { label: singleVehicleData.vehicleType, value: singleVehicleData.vehicleType } : { label: "", value: "" },
            vehicleRc: null,
            fileName: singleVehicleData?.vehicleRcFilePath || ""
          }}
          onSubmit={handleVehicleUpdate}
        >
          {({ setFieldValue, values }) => {
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
                <Modal.Body className='pt-1'>
                  <Row>
                    <Col xl={12}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Vehicle No.</Form.Label>
                        <input type="text"
                          className='form-control'
                          name='vehicleNumber'
                          placeholder='vehicle number'
                          value={values.vehicleNumber}
                          disabled />
                      </Form.Group>
                    </Col>


                    <Col xl={12}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Vehicle Type</Form.Label>
                        <Select
                          options={vehicletype}
                          value={values.vehicleType}
                          name="vehicleType"
                          onChange={(selected) => setFieldValue("vehicleType", selected)}
                          placeholder="Select property"
                          classNamePrefix="Select2"
                        />
                      </Form.Group>
                    </Col>

                    {/* <Col xl={6}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Complaint Category</Form.Label>
                        <Select
                          options={complainttype}
                          value={values.complaintCategory}
                          name='complaintCategory'
                          onChange={(selected) => setFieldValue("complaintCategory", selected)}
                          placeholder="Select service"
                          classNamePrefix="Select2"
                        />
                      </Form.Group>
                    </Col> */}


                    <Col xl={12}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Vehicle RC</Form.Label>
                        <input type="file"
                          name="vehicleRc"
                          onChange={(e: any) => setFieldValue("vehicleRc", e.target.files[0])}
                          className='form-control' />
                      </Form.Group>
                      {values.fileName && (
                        <p
                          className="text-center pt-2"
                          style={{ cursor: "pointer", color: "blue" }}
                          onClick={() => {
                            const fileExtension = getFileExtension(values.fileName);


                            // If it's a PDF, image, or Excel file, open in new tab
                            if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                              window.open(import.meta.env.VITE_STATIC_PATH + values.fileName, "_blank");
                            } else {
                              // For other files, trigger download
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
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="default" onClick={() => { viewDemoClose("editVehicle"); }}>
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
      <CustomToastContainer />
    </Fragment >
  );
}
