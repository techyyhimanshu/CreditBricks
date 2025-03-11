
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Button, Form, Dropdown, Modal, CardHeader } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { addNewComplaintApi, assignComplaintToVendorApi, getAllComplainCategoriesApi, getAllComplaintsApi, getAllPropertiesForDropdownApi } from '../../api/complaint-api';
import { Formik, Form as FormikForm, Field } from 'formik';
import { showToast, CustomToastContainer } from '../../common/services/toastServices';
import { handleApiError } from '../../helpers/handle-api-error';
import { getVendorForDropDownApi } from '../../api/vendor-api';
import { imagesData } from "../../common/commonimages";

export default function Applications() {

  const [addapplication, setapplication] = useState(false);

  const [complaintData, setComplaintData] = useState([
    {
      id: "",
      complaintId: "",
      categoryName: "",
      propertyName: "",
      contactPersonName: "",
      createdAt: "",
      status: "",
      priority: ""
    }
  ]);

  const [vendorData, setVendorData] = useState([]);
  const [filtersss, setFilters] = useState({
    propertyIdentifier: "",
    categoryId: null,
    status: "",
    priority: "",
  });

  const [complaintCategoriesData, setComplaintCategoriesData] = useState([]);
  const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);
  const [complaintIdToAssign, setComplaintIdToAssign] = useState({
    id: "",
    contactPersonName: ""
  });


  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "addapplication":
        setapplication(true);
        break;


    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addapplication":
        setapplication(false);
        break;


    }
  };

  const status = [
    { value: "", label: "All" },
    { value: "In-Progress", label: "In-Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Completed", label: "Completed" },
  ]

  const property = [
    { value: "1", label: "A101" },
    { value: "2", label: "A102" },

  ];


  const applicationtype = [
    { value: "1", label: "All" },
    { value: "2", label: "Gate Pass" },
    { value: "3", label: "Change In Name" },
    { value: "4", label: "Contact Update" },
    { value: "5", label: "Parking" },
    { value: "6", label: "Flat Resale" },
    { value: "7", label: "Interior Work" },
    { value: "8", label: "Celebration" },
    { value: "9", label: "Theater" },
    { value: "10", label: "Banquet Hall" },
    { value: "11", label: "Club House" },
    { value: "12", label: "Swimming Pool" },
    { value: "13", label: "Play Area" },
    { value: "14", label: "Turf Area" },
    { value: "15", label: "Rent Agreement" },
    { value: "16", label: "Share Certificate" },
    { value: "17", label: "Nomination" },
    { value: "18", label: "Badminton Count" },
    { value: "19", label: "Food Court" },
    { value: "20", label: "Others" },
  ]



  const assigntoname = vendorData.map((vendor: any) => {
    return {
      value: vendor.vendorIdentifier,
      label: vendor.contactPersonName
    }
  })
  useEffect(() => {

    fetchAllComplaints();
    fetchAllPropertiesForDropDown()
    fetchAllComplaintCategories()
  }, []);
  const fetchAllComplaints = async () => {
    try {
      const response = await getAllComplaintsApi()
      if (response.status === 200) {
        const formattedData = response.data.data.map((complaint: any) => {
          return {
            id: complaint.id,
            categoryName: complaint.category.name,
            propertyName: complaint.property.propertyName,
            contactPersonName: complaint.complaintAllocation?.vendor.contactPersonName,
            createdAt: complaint.createdAt,
            status: complaint.status,
            priority: complaint.priority,
          }
        })
        setComplaintData(formattedData);
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
  const fetchAllVendorForDropDown = async () => {
    try {
      const response = await getVendorForDropDownApi()
      if (response.status === 200) {
        setVendorData(response.data.data);
      }
    } catch (error: any) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage);
    }
  }
  const handleSubmit = async (values: any) => {
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
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }
  };



  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> Applications</span>
        </div>
        <div className="right-content">
          <span className='float-end btn btn-primary btn-sm' onClick={() => { viewDemoShow("addapplication"); }}><i className="bi bi-plus"></i> Add Applications</span>
          <Modal show={addapplication} size="lg" centered>
            <Modal.Header>
              <Modal.Title>Applications</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addapplication"); }}>
                x
              </Button>
            </Modal.Header>

                  <Modal.Body>
<Row>
  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('gatepass')} />
  <p>  Gate Pass</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox selected'>
      <img alt="" src={imagesData('changename')} />
  <p>  Change In Name</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('conatctupdate')} />
  <p> Contact Update</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('parking')} />
  <p> Parking</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('flatresale')} />
  <p>Flat Resale</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('interiorwork')} />
  <p>Interior Work</p>
  </div>
  </Col>


  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('celebration')} />
  <p> Celebration</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('theater')} />
  <p>Theater</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('banquethall')} />
  <p>Banquet Hall</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('clubhouse')} />
  <p>Club House</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('swimmingpool')} />
  <p> Swimming Pool</p>
  </div>
  </Col>
  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('playarea')} />
  <p> Play Area</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('turfarea')} />
  <p>Turf Area</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('rentagreement')} />
  <p>Rent Agreement</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('sharecertificate')} />
  <p> Share Certificate</p>
  </div>
  </Col>
  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('nomination')} />
  <p> Nomination</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('badminton')} />
  <p>Badminton Count</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('foodcourt')} />
  <p>Food Court</p>
  </div>
  </Col>

  <Col xl={3}>
  <div className='applicationbox'>
      <img alt="" src={imagesData('others')} />
  <p> Others</p>
  </div>
  </Col>


</Row>
                  </Modal.Body>

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
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={3}>
                  <Form.Group className="form-group">
                    <Form.Label>Application Category</Form.Label>
                    <Select
                      options={applicationtype}
                      placeholder="Select application"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={3}>
                  <Form.Group className="form-group">
                    <Form.Label>Status </Form.Label>
                    <Select
                      options={status}
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
              <h3 className='card-title'>   List of Apllications</h3>
            </CardHeader>
            <Card.Body className='pt-0'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>S.no.</th>
                    <th>Application Id</th>
                    <th>Property</th>
                    <th>Application Category</th>
                    <th>Assign To</th>
                    <th>Date & Time</th>
                    <th>Status</th>
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
                        }} className='text-info cursor'>{item.id}</span></td>
                        <td>{item.propertyName}</td>
                        <td>{item.categoryName}</td>
                        <td>
                          {item.contactPersonName || "-"}
                        </td>

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

                        <td><Dropdown >
                          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                            Action
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => viewDemoShow("addcomplaint")}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                              setComplaintIdToAssign(item)
                              viewDemoShow("assign")
                              fetchAllVendorForDropDown()
                            }
                            }>Assign To</Dropdown.Item>
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
