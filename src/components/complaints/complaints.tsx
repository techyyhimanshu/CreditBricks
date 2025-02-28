
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Button, Form, Dropdown, Modal, CardHeader, CardBody } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Link } from "react-router-dom";
import { addNewComplaintApi, getAllComplainCategoriesApi, getAllComplaintsApi, getAllPropertiesForDropdownApi } from '../../api/complaint-api';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { showToast, CustomToastContainer } from '../../common/services/toastServices';
import { handleApiError } from '../../helpers/handle-api-error';

export default function Complaints() {

  const [addcomplaint, setcomplaints] = useState(false);
  const [complaintview, setcomplaintview] = useState(false);
  const [assign, setassign] = useState(false);
  const [complaintData, setComplaintData] = useState([]);
  const [filtersss, setFilters] = useState({
    propertyIdentifier: "",
    categoryId: null,
    status: "",
    priority: "",
  });
  const [complaintToView, setComplaintToView] = useState({
    id: "",
    name: "",
    status: "",
    description: "",
    priority: "",
    createdAt: "",
    issueFilePath: "",
    category: {
      name: ""
    },
    property: {
      propertyName: ""
    },
  });
  const [complaintCategoriesData, setComplaintCategoriesData] = useState([]);
  const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);


  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "addcomplaint":
        setcomplaints(true);
        break;

      case "complaintview":
        setcomplaintview(true);
        break;

      case "assign":
        setassign(true);
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addcomplaint":
        setcomplaints(false);
        break;

      case "complaintview":
        setcomplaintview(false);
        break;

      case "assign":
        setassign(false);
        break;

    }
  };

  const status = [
    { value: "", label: "All" },
    { value: "In-Progress", label: "In-Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Verified", label: "Verified" },
    { value: "Completed", label: "Completed" },
  ]

  const property = [
    { value: "", label: "All" }, // Adding 'All' option at the beginning
    ...propertiesForDropDown.map((property: any) => ({
      value: property.propertyIdentifier,
      label: property.propertyName
    }))
  ];


  const complainttype = [
    { value: "", label: "All" },
    ...complaintCategoriesData.map((category: any) => {
      return {
        value: category.id,
        label: category.name
      }
    })
  ]

  const priority = [
    { value: "", label: "All" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" }
  ]

  const assigntoname = [
    { value: "1", label: "Surender Sharma" },
    { value: "2", label: "Purnima Verma" },
    { value: "3", label: "Himanshu Bansal" }
  ]
  useEffect(() => {

    fetchAllComplaints();
    fetchAllPropertiesForDropDown()
    fetchAllComplaintCategories()
  }, []);
  const fetchAllComplaints = async () => {
    try {
      const response = await getAllComplaintsApi()
      if (response.status === 200) {
        setComplaintData(response.data.data);
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }
  }
  const fetchAllComplaintCategories = async () => {
    try {

      const response = await getAllComplainCategoriesApi()
      if (response.status === 200) {
        setComplaintCategoriesData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching complaint categories:", error);
    }
  }

  const fetchAllPropertiesForDropDown = async () => {
    try {
      const response = await getAllPropertiesForDropdownApi()
      if (response.status === 200) {
        setPropertiesForDropDown(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  }
  const handleSubmit = async (values: any) => {
    console.log(values)
    const formattedData = {
      propertyIdentifier: values.property.value,
      categoryId: values.complaintCategory.value,
      description: values.complaintDescription,
      priority: values.priority.value,
      complaintFile: values.complaintFile
    }
    try {
      const response = await addNewComplaintApi(formattedData)
      if (response.status === 200) {
        showToast("success", response.data.message)
        fetchAllComplaints()
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
    viewDemoClose("addcomplaint")
  }
  const handleFilterChange = async (name: string, value: any) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value
    }));

    // Wait for state update before using new filters
    const updatedFilters = { filters: { ...filtersss, [name]: value }, };

    try {
      const response = await getAllComplaintsApi(updatedFilters); // Pass filters correctly
      if (response.status === 200) {
        setComplaintData(response.data.data);
      }
      console.log(updatedFilters); // Debugging filter values
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }
  };

  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> Complaints</span>
        </div>
        <div className="right-content">
          <span className='float-end btn btn-primary btn-sm' onClick={() => {
            viewDemoShow("addcomplaint")
            fetchAllComplaintCategories()
            fetchAllPropertiesForDropDown()
          }}><i className="bi bi-plus"></i> Add Complaint</span>
          <Modal show={addcomplaint} centered>
            <Modal.Header>
              <Modal.Title>Complaint</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addcomplaint"); }}>
                x
              </Button>
            </Modal.Header>
            <Formik initialValues={{
              property: { value: "", label: "" },
              complaintCategory: { value: "", label: "" },
              complaintDescription: "",
              priority: { value: "", label: "" },
              complaintFile: null
            }}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <FormikForm>
                  <Modal.Body className='pt-1'>
                    <Row>
                      <Col xl={12}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Complaint ID</Form.Label>
                          <input type="text"
                            className='form-control'
                            placeholder=''
                            disabled />
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Property</Form.Label>
                          <Select
                            options={property}
                            name="property"
                            onChange={(selected) => setFieldValue("property", selected)}
                            placeholder="Select property"
                            classNamePrefix="Select2"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Complaint Category</Form.Label>
                          <Select
                            options={complainttype}
                            name='complaintCategory'
                            onChange={(selected) => setFieldValue("complaintCategory", selected)}
                            placeholder="Select service"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Priority </Form.Label>
                          <Select
                            options={priority}
                            name='priority'
                            onChange={(selected) => setFieldValue("priority", selected)}
                            placeholder="Select priority"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>
                      <Col xl={12}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Description</Form.Label>
                          <Field type="text" name='complaintDescription' className='form-control'
                            as="textarea" placeholder='Description'></Field>
                        </Form.Group>
                      </Col>
                      <Col xl={12}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Upload Photo</Form.Label>
                          <input type="file"
                            name="complaintFile"
                            onChange={(e: any) => setFieldValue("complaintFile", e.target.files[0])}
                            className='form-control' />
                        </Form.Group>
                      </Col>


                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="default" onClick={() => { viewDemoClose("addcomplaint"); }}>
                      Close
                    </Button>
                    <Button variant="primary" type='submit' >
                      Save
                    </Button>

                  </Modal.Footer>
                </FormikForm>
              )}
            </Formik>


          </Modal>

          <Modal show={complaintview} centered>
            <Modal.Header>
              <Modal.Title>Complaint View</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("complaintview"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xl={3}>
                  {complaintToView.issueFilePath ? <img
                    alt="" className='w-100 rounded-2'
                    src={import.meta.env.VITE_STATIC_PATH + complaintToView.issueFilePath}
                  /> : <p className='w-100 rounded-2' style={{ height: "100px", backgroundColor: "lightgray", textAlign: "center", verticalAlign: "middle", lineHeight: "100px" }}>No image</p>}
                </Col>
                <Col xl={8} className='p-0'>
                  <p className='tx-16 mb-0 mt-2 tx-semibold'>{complaintToView.id}</p>
                  <p className='mb-1 tx-16 '>{complaintToView.property.propertyName}</p>

                </Col>
              </Row>
              <hr />
              <Row>
                <Col xl={6}>
                  <p className='mb-0 text-muted'>Complaint Category</p>
                  <p className='tx-15 tx-semibold'>{complaintToView.category.name}s</p>
                </Col>
                <Col xl={6} className='text-end'>
                  <p className='mb-0 text-muted'>Priority</p>
                  {complaintToView.priority === "high" ? <p className='tx-15 text-danger tx-semibold'>High</p> :
                    complaintToView.priority === "medium" ? <p className='tx-15 text-warning tx-semibold'>Medium</p> :
                      <p className='tx-15 text-success tx-semibold'>Low</p>}


                </Col>
                <Col xl={12} className='mt-2'>
                  <p>{complaintToView.description}</p>
                  <span className='text-muted'><i className='bi bi-calendar-fill'></i>&nbsp; {complaintToView.createdAt}</span>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xl={6}>
                  <p className='mb-0 text-muted'>Assign To</p>
                  <p className='tx-15 mb-1 tx-semibold'>Neeraj Singh</p>
                  <p>+91 9876543212</p>
                </Col>
                <Col xl={6} className='text-end'>
                  <p className='mb-0 text-muted'>Status</p>
                  <p className='tx-15 tx-semibold'><i className='bi bi-check-circle text-success tx-18'></i>&nbsp; {complaintToView.status}</p>

                </Col>

              </Row>
            </Modal.Body>

          </Modal>

          <Modal show={assign} centered>
            <Modal.Header>
              <Modal.Title>Assign To</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("assign"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xl={12} className='bg-light pb-2'>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Assign To</Form.Label>
                    <Select
                      options={assigntoname}
                      placeholder="Select name"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("assign"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("assign"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

        </div>
      </div>

      <Row>
        <Col xl={12}>

          <Card className='m-0'>
            <CardHeader className='pb-0'>
              <h3 className='card-title'> Filter</h3>
            </CardHeader>
            <Card.Body className='pt-0 pb-1'>
              <Row>
                <Col xl={3}>
                  <Form.Group className="form-group">
                    <Form.Label>Property</Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      onChange={(selected) => { handleFilterChange("propertyIdentifier", selected?.value) }}
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={3}>
                  <Form.Group className="form-group">
                    <Form.Label>Complaint Category</Form.Label>
                    <Select
                      options={complainttype}
                      onChange={(selected) => { handleFilterChange("categoryId", selected?.value) }}
                      placeholder="Select service"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={2}>
                  <Form.Group className="form-group">
                    <Form.Label>Priority </Form.Label>
                    <Select
                      options={priority}
                      onChange={(selected) => { handleFilterChange("priority", selected?.value) }}
                      placeholder="Select priority"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={2}>
                  <Form.Group className="form-group">
                    <Form.Label>Status </Form.Label>
                    <Select
                      options={status}
                      onChange={(selected) => { handleFilterChange("status", selected?.value) }}
                      placeholder="Select status"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={2} className='pt-1'>
                  <Form.Group className="form-group pt-4">
                    {/* <Button className="btn btn-default" type="button">Search </Button> */}
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className='mt-3'>
            <CardHeader>
              <h3 className='card-title'>   List of Compliants</h3>
            </CardHeader>
            <Card.Body className='pt-0'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>S.no.</th>
                    <th>Complaint Id</th>
                    <th>Property</th>
                    <th>Complaint Category</th>
                    <th>Assign To</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th className='text-center'>Priority</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaintData.map((item: any, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td><span onClick={() => {
                          setComplaintToView(item);
                          viewDemoShow("complaintview")
                          console.log(complaintToView)
                        }} className='text-info cursor'>{item.id}</span></td>
                        <td>{item.property?.propertyName}</td>
                        <td>{item.category.name}</td>
                        <td>Neeraj Singh</td>
                        <td>{item.createdAt}</td>
                        <td>{item.status}</td>
                        {/* <td> <Dropdown >
                          <Dropdown.Toggle className='btn-sm text-primary tx-16 bg-none p-1 border-0 bg-light' id="dropdown-basic">
                            <span className='tx-14'>  In Process</span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>Pending</Dropdown.Item>
                            <Dropdown.Item>Verified</Dropdown.Item>
                            <Dropdown.Item>Completed</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        </td> */}
                        {
                          item.priority === "high" ? <td className='text-center'><span className='badge badge-danger'>High</span></td> :
                            item.priority === "medium" ? <td className='text-center'><span className='badge badge-warning'>Medium</span></td> :
                              <td className='text-center'><span className='badge badge-success'>Low</span></td>
                        }
                        <td><Dropdown >
                          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                            Action
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => viewDemoShow("addcomplaint")}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => viewDemoShow("assign")}>Assign To</Dropdown.Item>
                            <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown></td>
                      </tr>
                    )
                  })}


                </tbody>
              </table>

            </Card.Body>
          </Card>

        </Col>

      </Row>
      < CustomToastContainer />

    </Fragment >
  );
}
