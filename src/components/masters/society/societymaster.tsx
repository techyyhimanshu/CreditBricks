
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Modal, Button, Form, Dropdown } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addSocietyApi, deleteSocietyApi, getAllSocietyApi, updateSocietyApi } from '../../../api/society-api';
import { showToast, CustomToastContainer } from '../../../common/services/toastServices';
import stateCities from "../stateCity.json"
import { handleApiError } from '../../../helpers/handle-api-error';
import { Link } from "react-router-dom";
// Define the types for the stateCities object
interface StateCities {
  [key: string]: string[]; // Index signature
}
const stateCitiesTyped: StateCities = stateCities;
export default function SocietyMaster() {
  const [showModal, setShowModal] = useState(false);
  const [bulkupload, setbulkupload] = useState(false);
  const [societyData, setSocietyData] = useState<any[]>([]);
  const [currentSociety, ] = useState({
    societyIdentifier: '',
    societyName: '',
    address: '',
    country: null,
    state: null,
    city: null
  });


  const [isEditing, ] = useState(false);
  type Row = {
    societyIdentifier: string;
    sno: number;
    societyName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    registrationNumber: string;
    tanNumber: string;
    panNumber: string;
    signatory: string;
    hsnCode: string;
    gstin: string;
    bankName: string;
    accountNumber: string;
    branchName: string;
    ifscCode: string;
    chequeFavourable: string;
  };

  const columns = [
    {
      name: 'S.No.',
      selector: (row: Row) => row.sno,
      sortable: true,
    },
    {
      name: 'Society Name',
      // selector: (row: Row) => row.societyName,
      cell: (row: Row) => (
        <Link to={`${import.meta.env.BASE_URL}society/societyview/${row.societyIdentifier}`}
          state={{ propertyData: row }} className='text-info'>{row.societyName}</Link>
      ),
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row: Row) => row.address,
      sortable: true,
    },
    {
      name: 'Country',
      selector: (row: Row) => row.country,
      sortable: true,
    },
    {
      name: 'State',
      selector: (row: Row) => row.state,
      sortable: true,
    },
    {
      name: 'City',
      selector: (row: Row) => row.city,
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
            <Dropdown.Item><Link to={`${import.meta.env.BASE_URL}society/editsocietymaster/${row.societyIdentifier}`}
            >Edit</Link> </Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleDelete(row)} >Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ]
  const tableData = {
    columns,
    data: societyData
  };
  const countryOptions: any = [{ value: "India", label: "India" }]

  const stateOptions = Object.keys(stateCitiesTyped).map((state) => ({
    value: state,
    label: state,
  }));

  const [cityOptions, setCityOptions] = useState<any>([]);
  const validationSchema = Yup.object({
    societyName: Yup.string().required('Society name is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.object().nullable().required('Country is required'),
    state: Yup.object().nullable().required('State is required'),
    city: Yup.object().nullable().required('City is required'),
    // zipcode: Yup.string().required('Zipcode is required'),
  })

  useEffect(() => {
    const fetchSocietyData = async () => {
      try {
        const response = await getAllSocietyApi();
        const formattedData = response.data.data.map((item: any, index: number) => ({
          societyIdentifier: item.societyIdentifier,
          sno: index + 1,
          societyName: item.societyName,
          societyManager: item.societyManager,
          address: item.address,
          country: item.country,
          state: item.state,
          city: item.city,
          registrationNumber: item.registrationNumber,
          tanNumber: item.tanNumber,
          panNumber: item.panNumber,
          signatory: item.signatory,
          hsnCode: item.hsnCode,
          gstin: item.gstin,
          bankName: item.bankName,
          accountNumber: item.accountNumber,
          branchName: item.branchName,
          ifscCode: item.ifscCode,
          chequeFavourable: item.chequeFavourable
        }));
        setSocietyData(formattedData);
      } catch (error) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    };

    fetchSocietyData();
  }, []);


  const handleStateChange = (selected: { value: string; label: string }) => {
    const cities = stateCitiesTyped[selected.value] || [];
    setCityOptions(cities.map((city) => ({ value: city, label: city })));
  };

  const handleSubmit = (values: any) => {
    const data = {
      societyName: values.societyName,
      address: values.address,
      country: values.country.value,
      state: values.state.value,
      city: values.city.value,
    }
    if (isEditing) {
      ; (async () => {
        try {
          const response = await updateSocietyApi(data, currentSociety.societyIdentifier)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // Update specific society in the list
            setSocietyData(prevData =>
              prevData.map(society =>
                society.societyIdentifier === currentSociety.societyIdentifier
                  ? { ...society, ...data }
                  : society
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
      // Call API to add new society
      ; (async () => {
        try {
          const response = await addSocietyApi(data)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // Add the new society to the table
            const newSociety = {
              sno: societyData.length + 1,
              societyIdentifier: response.data.data.societyIdentifier,
              ...response.data.data
            }
            setSocietyData(prevData => [...prevData, newSociety]);
            setShowModal(false)
          }
        } catch (error: any) {
          const errorMessage = handleApiError(error);
          showToast("error", errorMessage);
        }
      })()
    }


  }
  const handleDelete = (row: any) => {
    ; (async () => {
      try {

        const response = await deleteSocietyApi(row.societyIdentifier)
        if (response.status === 200) {
          showToast("success", response.data.message)
          // Remove the society from the table
          setSocietyData(prevData => prevData.filter(society => society.societyIdentifier !== row.societyIdentifier))
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    })()
  }


  const viewDemoShow = (modal: any) => {
    switch (modal) {

      case "bulkupload":
        setbulkupload(true);
        break;


    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {

      case "bulkupload":
        setbulkupload(false);
        break;


    }
  };


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Society Master</span>
        </div>

        <div className="right-content">
          <Link to={`${import.meta.env.BASE_URL}society/addsocietymaster`} className="btn btn-primary p-1 pe-2 ps-2 me-1"><i className="bi bi-plus"></i> Add Society</Link>

          <button type="button" className="btn btn-default p-1 pe-2 ps-2 me-1" onClick={() => viewDemoShow("bulkupload")}><i className="bi bi-upload"></i> Bulk Upload</button>
          <Modal centered show={bulkupload}>
            <Modal.Header>
              <Modal.Title>Bulk Upload</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => viewDemoClose("bulkupload")}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>

              <p>Browse or Drop the file</p>
              <Form.Group className="form-group">
                <div className='textnone'>
                  <input type='file' className='fileupload' />
                  <p>Drag & Drop your file here or click</p>
                </div>


              </Form.Group>


            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("bulkupload"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("bulkupload"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          <Modal show={showModal} size="lg" onHide={() => setShowModal(false)} centered>
            <Formik
              initialValues={{
                societyIdentifier: null,
                societyName: currentSociety?.societyName || "",
                address: currentSociety?.address || "",

                country: { value: currentSociety.country, label: currentSociety.country }, // Update this
                state: { value: currentSociety.state, label: currentSociety.state },
                city: { value: currentSociety.city, label: currentSociety.city }
              }
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values }) => (
                <FormikForm>
                  <Modal.Header>
                    <Modal.Title>{isEditing ? "Edit Society" : "Add Society"}</Modal.Title>
                    <Button variant="" className="btn-close" onClick={() => setShowModal(false)}>
                      x
                    </Button>
                  </Modal.Header>
                  <Modal.Body>
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
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="default" onClick={() => setShowModal(false)}>
                      Close
                    </Button>
                    <button className="btn btn-primary" type="submit">
                      {isEditing ? "Save Changes" : "Add Society"}
                    </button>
                  </Modal.Footer>
                </FormikForm>
              )}
            </Formik>
          </Modal>

          <CustomToastContainer />

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
                    data={societyData}
                    pagination
                    keyField="societyIdentifier"
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
