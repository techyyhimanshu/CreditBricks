
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Button, Form, Dropdown, Modal, CardHeader } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { addNewComplaintApi, assignComplaintToVendorApi, deleteComplaintApi, getAllComplainCategoriesApi, getAllComplaintsApi, updateComplaintApi, updateComplaintStatusApi } from '../../api/complaint-api';
import { Formik, Form as FormikForm, Field } from 'formik';
import { showToast, CustomToastContainer } from '../../common/services/toastServices';
import { handleApiError } from '../../helpers/handle-api-error';
import { getVendorForDropDownApi } from '../../api/vendor-api';
import { getAllSocietyApi, getPropertiesOfSocietyApi } from '../../api/society-api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"

export default function Complaints() {

  const [addcomplaint, setcomplaints] = useState(false);
  const [complaintview, setcomplaintview] = useState(false);
  const [assign, setassign] = useState(false);
  const [societyData, setSocietyData] = useState<any[]>([]);
  const [complaintData, setComplaintData] = useState([
    {
      id: "",
      complaintId: "",
      categoryName: "",
      propertyName: "",
      societyName: "",
      contactPersonName: "",
      createdAt: "",
      status: "",
      priority: ""
    }
  ]);
  const [selectedVendor, setSelectedVendor] = useState({
    value: '',
    label: ''
  });
  const [vendorData, setVendorData] = useState([]);
  const [filtersss, setFilters] = useState({
    propertyIdentifier: "",
    societyIdentifier: "",
    categoryId: null,
    status: "",
    priority: "",
  });

  // const [complaintToView, setComplaintToView] = useState({
  //   id: "",
  //   categoryName: "",
  //   status: "",
  //   description: "",
  //   priority: "",
  //   createdAt: "",
  //   issueFilePath: "",
  //   subCategory: "",
  //   contactPersonName: "",
  //   contactPersonNumber: "",
  //   propertyName:""
  // });
  const [complaintToView, setComplaintToView] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [complaintCategoriesData, setComplaintCategoriesData] = useState([]);
  const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);
  const [complaintIdToAssign, setComplaintIdToAssign] = useState({
    id: "",
    contactPersonName: ""
  });

  const columns = [
    {
      name: 'S.No',
      selector: (row: any) => row.sno,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Complaint Id',
      cell: (row: any) => (
        <span className='text-info cursor' onClick={() => { viewDemoShow("complaintview"), setComplaintToView(row) }}>{row.id}</span>
      ),
      sortable: true,
    },
    {
      name: 'Property',
      cell: (row: any) => {
        return (
          <span>{row.propertyName}</span>
        )
      },
      sortable: true,
    },

    {
      name: 'Complaint Category',
      selector: (row: any) => row.categoryName,
      sortable: true,
    },
    {
      name: 'Assign To',
      selector: (row: any) => row.contactPersonName,
      sortable: true,
    },
    {
      name: 'Date & Time',
      selector: (row: any) => row.createdAt,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      sortable: true,
    },
    {
      name: 'Priority',
      cell: (row: any) => {
        if (row.priority === 'high') {
          return <td className='text-center'><span className='badge badge-danger'>High</span></td>;
        } else if (row.priority === 'medium') {
          return <td className='text-center'><span className='badge badge-warning'>Medium</span></td>;
        } else {
          return <td className='text-center'><span className='badge badge-success'>Low</span></td>;
        }
      },
      sortable: true,
    },

    {
      name: 'Action',
      sortable: true,
      cell: (row: any) => (
        <Dropdown >
          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
            Action
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => { setComplaintToView(row), setEditing(true), viewDemoShow("addcomplaint") }}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={() => {
              setComplaintIdToAssign(row)
              viewDemoShow("assign")
              fetchAllVendorForDropDown()
            }
            }>Assign To</Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleDelete(row.id)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];

  const tableData = {
    columns,
    data: complaintData
  };


  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "addcomplaint":
        setcomplaints(true);
        break;

      case "complaintview":
        setcomplaintview(true);
        setEditing(false)
        break;

      case "assign":
        setassign(true);
        setEditing(false)
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addcomplaint":
        setcomplaints(false);
        setComplaintToView(null)
        setEditing(false)
        setPropertiesForDropDown([])
        break;

      case "complaintview":
        setcomplaintview(false);
        setComplaintToView(null)
        setEditing(false)
        break;

      case "assign":
        setassign(false);
        setComplaintToView(null)
        setEditing(false)
        break;

    }
  };

  const status = [
    { value: "", label: "All" },
    { value: "In-Progress", label: "In-Progress" },
    { value: "pending", label: "Pending" },
    { value: "verified", label: "Verified" },
    { value: "completed", label: "Completed" },
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

  const assigntoname = vendorData.map((vendor: any) => {
    return {
      value: vendor.vendorIdentifier,
      label: vendor.contactPersonName
    }
  })

  useEffect(() => {

    fetchAllComplaints();
    fetchAllComplaintCategories()
    fetchSocietiesForDropDown()
  }, []);

  useEffect(() => {
    if (filtersss.societyIdentifier) {
      fetchPropertiesOfSocietyForDropdown(filtersss.societyIdentifier)
    }

  }, [filtersss?.societyIdentifier])

  const fetchAllComplaints = async () => {
    try {
      const response = await getAllComplaintsApi()
      if (response.status === 200) {
        const formattedData = response.data.data.map((complaint: any, index: number) => {
          return {
            sno: index + 1,
            id: complaint?.id || "",
            categoryName: complaint?.category?.name || "",
            categoryId: complaint?.category?.id || "",
            propertyName: complaint?.property?.propertyName || "",
            propertyIdentifier: complaint?.property?.propertyIdentifier || "",
            societyIdentifier: complaint?.society?.societyIdentifier || "",
            societyName: complaint?.society?.societyName || "",
            contactPersonName: complaint?.complaintAllocation?.vendor?.contactPersonName || "",
            contactPersonNumber: complaint?.complaintAllocation?.vendor?.contactPersonNumber || "",
            createdAt: complaint?.createdAt || "",
            status: complaint?.status || "",
            priority: complaint?.priority || "",
            description: complaint?.description || "",
            issueFilePath: complaint?.issueFilePath || "",
            subCategory: complaint?.subCategory?.name || "",
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

  // const fetchAllPropertiesForDropDown = async () => {
  //   try {
  //     const response = await getAllPropertiesForDropdownApi()
  //     if (response.status === 200) {
  //       setPropertiesForDropDown(response.data.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching properties:", error);
  //   }
  // }
  const fetchPropertiesOfSocietyForDropdown = async (identifier: string) => {
    try {
      const response = await getPropertiesOfSocietyApi(identifier)

      if (response.status === 200) {
        setPropertiesForDropDown(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  }

  const fetchSocietiesForDropDown = async () => {
    try {
      const response = await getAllSocietyApi();
      const formattedData = response.data.data.map((item: any) => ({
        value: item.societyIdentifier,
        label: item.societyName,
      }));
      setSocietyData(formattedData);
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
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
    const formattedData: any = {
      propertyIdentifier: values.property.value || "",
      societyIdentifier: values.society.value || "",
      categoryId: values.complaintCategory.value || "",
      description: values.complaintDescription || "",
      priority: values.priority.value || "",
    }
    if (values.complaintFile) {
      formattedData.complaintFile = values.complaintFile
    }
    try {
      let response;
      if (editing) {
        response = await updateComplaintApi(formattedData, complaintToView?.id)
      } else {
        response = await await addNewComplaintApi(formattedData)
      }

      if (response.status === 200 || response.status === 201) {
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

    const updatedFilters = { filters: { ...filtersss, [name]: value }, };

    try {
      const response = await getAllComplaintsApi(updatedFilters); // Pass filters correctly
      if (response.status === 200) {
        const formattedData = response.data.data.map((complaint: any, index: number) => {
          return {
            sno: index + 1,
            id: complaint?.id || "",
            categoryName: complaint?.category?.name || "",
            categoryId: complaint?.category?.id || "",
            propertyName: complaint?.property?.propertyName || "",
            propertyIdentifier: complaint?.property?.propertyIdentifier || "",
            societyIdentifier: complaint?.property?.societyIdentifier || "",
            societyName: complaint?.property?.societyName || "",
            contactPersonName: complaint?.complaintAllocation?.vendor?.contactPersonName || "",
            contactPersonNumber: complaint?.complaintAllocation?.vendor?.contactPersonNumber || "",
            createdAt: complaint?.createdAt || "",
            status: complaint?.status || "",
            priority: complaint?.priority || "",
            description: complaint?.description || "",
            issueFilePath: complaint?.issueFilePath || "",
            subCategory: complaint?.subCategory?.name || "",
          }
        })
        setComplaintData(formattedData);
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }
  };


  const handleVendorAssignment = async () => {
    const formattedData = {
      complaintId: complaintIdToAssign.id,
      vendorIdentifier: selectedVendor.value
    };
    try {
      const response = await assignComplaintToVendorApi(formattedData);
      if (response.status === 200) {
        showToast("success", response.data.message);
      }

      setComplaintData(prevData =>
        prevData.map(complaint =>
          complaint.id === complaintIdToAssign.id
            ? { ...complaint, contactPersonName: selectedVendor.label }
            : complaint
        )
      );

      viewDemoClose("assigncomplaint");
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }
  };

  const handleDelete = (id: string) => {
    ; (async () => {
      try {

        const response = await deleteComplaintApi(id)
        if (response.status === 200) {
          showToast("success", response.data.message)
          setComplaintData((prevData: any) => prevData.filter((society: any) => society.id !== id))
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    })()
  }

  const handleUpdateStatus = async (values: any, id: string) => {
    const data = {
      status: values.status.value,
      remarks: values.remarks
    }
    try {
      const response = await updateComplaintStatusApi(data, id);
      if (response.status === 200) {
        showToast("success", response.data.message);
      }
      viewDemoClose("complaintview")

      // setComplaintData(prevData =>
      //   prevData.map(complaint =>
      //     complaint.id === complaintToView.id
      //       ? { ...complaint, contactPersonName: selectedVendor.label }
      //       : complaint
      //   )
      // );
    } catch (error) {

    }
    // viewDemoClose("complaintview")
  }

  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> Complaints</span>
        </div>
        <div className="right-content">
          <span className='float-end btn btn-primary btn-sm' onClick={() => {
            viewDemoShow("addcomplaint")

          }}><i className="bi bi-plus"></i> Add Complaint</span>
          <Modal show={addcomplaint} centered>
            <Modal.Header>
              <Modal.Title>Complaint</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addcomplaint"); }}>
                x
              </Button>
            </Modal.Header>
            <Formik
              enableReinitialize
              initialValues={{
                id: complaintToView?.id || "",
                property: complaintToView ? { label: complaintToView.propertyName, value: complaintToView.propertyIdentifier } : { label: "", value: "" },
                society: complaintToView ? { label: complaintToView.societyName, value: complaintToView.societyIdentifier } : { label: "", value: "" },
                complaintCategory: complaintToView ? { label: complaintToView.categoryName, value: complaintToView.categoryId } : { label: "", value: "" },
                complaintDescription: complaintToView?.description || "",
                priority: complaintToView ? { label: complaintToView.priority, value: complaintToView.priority } : { label: "", value: "" },
                complaintFile: null,
                fileName: complaintToView?.issueFilePath
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
                    <Modal.Body className='pt-1'>
                      <Row>
                        <Col xl={12}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Complaint ID</Form.Label>
                            <input type="text"
                              className='form-control'
                              placeholder=''
                              value={values.id}
                              disabled />
                          </Form.Group>
                        </Col>

                        <Col xl={12}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Society</Form.Label>
                            <Select
                              options={societyData}
                              value={values.society}
                              name="society"
                              onChange={(selected) => {
                                fetchPropertiesOfSocietyForDropdown(selected?.value);
                                setFieldValue("society", selected);
                                setFieldValue("property", null);
                              }}
                              placeholder="Select society"
                              classNamePrefix="Select2"
                            />
                          </Form.Group>
                        </Col>

                        <Col xl={12}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Property</Form.Label>
                            <Select
                              options={property}
                              value={values.property}
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
                              value={values.complaintCategory}
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
                              value={values.priority}
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
                            <Field type="text" name='complaintDescription' value={values.complaintDescription} className='form-control'
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
                      <Button variant="default" onClick={() => { viewDemoClose("addcomplaint"); }}>
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
                  {complaintToView?.issueFilePath ? <img
                    alt="" className='w-100 rounded-2'
                    crossOrigin="anonymous"
                    src={import.meta.env.VITE_STATIC_PATH + complaintToView?.issueFilePath}
                    style={{ cursor: 'pointer' }}
                    onClick={() => window.open(import.meta.env.VITE_STATIC_PATH + complaintToView?.issueFilePath, '_blank')}
                  /> : <p className='w-100 rounded-2' style={{ height: "100px", backgroundColor: "lightgray", textAlign: "center", verticalAlign: "middle", lineHeight: "100px" }}>No image</p>}
                </Col>
                <Col xl={8} className='p-0'>
                  <p className='tx-16 mb-0 mt-2 tx-semibold'>Complaint ID : {complaintToView?.id}</p>
                  <p className='mb-3 tx-16 '>{complaintToView?.propertyName}</p>
                  <span className='text-muted'><i className='bi bi-calendar-fill'></i>&nbsp; {complaintToView?.createdAt}</span>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xl={6}>
                  <p className='mb-0 text-muted'>Complaint Category</p>
                  <p className='tx-15 tx-semibold'>{complaintToView?.categoryName}s</p>
                </Col>
                <Col xl={6} className='text-end'>
                  <p className='mb-0 text-muted'>Priority</p>
                  {complaintToView?.priority === "high" ? <p className='tx-15 text-danger tx-semibold'>High</p> :
                    complaintToView?.priority === "medium" ? <p className='tx-15 text-warning tx-semibold'>Medium</p> :
                      <p className='tx-15 text-success tx-semibold'>Low</p>}


                </Col>
                <Col xl={12}>
                  <p className='mb-0'>{complaintToView?.description}</p>

                </Col>
              </Row>
              <hr />
              <Row>
                <Col xl={6}>
                  <p className="mb-0 text-muted">Assign To</p>
                  <p className="tx-15 mb-1 tx-semibold">
                    {complaintToView?.contactPersonName}
                  </p>
                  <p>{complaintToView?.contactPersonNumber}</p>
                </Col>

                {/* <Col xl={6} className='text-end'>
                  <p className='mb-0 text-muted'>Status</p>
                  <p className='tx-15 tx-semibold'><i className='bi bi-check-circle text-success tx-18'></i>&nbsp; {complaintToView?.status}</p>

                </Col> */}

              </Row>
              <hr className='mt-2 mb-1' />
              <Row>
                {/* <Col xl={12}>
                  <Form.Label className='float-start'>Update Status</Form.Label>
                  <Dropdown className='profile-user border-0'>
                    <Dropdown.Toggle variant="">
                      <strong>In Process</strong>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item className="dropdown-item" href="/">In-Process </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item" href="/">Pending </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item" href="/">Verified </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item" href="/">Closed </Dropdown.Item>

                    </Dropdown.Menu>
                  </Dropdown>
                  <p className="mb-0 text-muted">Complaint Remarks</p>
                  <textarea className='form-control' placeholder='Remarks'></textarea>
                </Col> */}
                <Col xl={12}>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      status: { label: complaintToView?.status || '', value: complaintToView?.status || '' },
                      remarks: complaintToView?.remarks || '',
                    }}
                    onSubmit={(values) => handleUpdateStatus(values, complaintToView?.id)}
                  >
                    {({ setFieldValue, values, submitForm }) => (
                      <Form>
                        <Form.Group className="form-group mb-1">
                          <Row>
                            <Col xl={3}>
                              <Form.Label className='float-start'>Update Status</Form.Label>
                            </Col>
                            <Col xl={12}>
                              <Select
                                options={status}
                                value={values.status}
                                name="status"
                                onChange={(selected) => setFieldValue('status', selected)}
                                placeholder="Select status"
                                classNamePrefix="Select2"
                                className='profile-user border-0'
                              />
                            </Col>
                          </Row>


                        </Form.Group>



                        <Form.Label className='float-start'>Complaint Remarks</Form.Label>
                        <textarea
                          className="form-control"
                          placeholder="Remarks"
                          name="remarks"
                          value={values.remarks}
                          onChange={(e) => setFieldValue('remarks', e.target.value)}
                        />


                        <span className='float-end mt-3'>
                          <Button type="button" className="btn btn-default ms-2" onClick={() => viewDemoClose('complaintview')}>
                            Close
                          </Button>
                          <Button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => submitForm()}
                          >
                            Save
                          </Button>
                        </span>
                      </Form>
                    )}
                  </Formik>
                </Col>

              </Row>
            </Modal.Body>
            {/* <Modal.Footer>
              <Button type='button' className='btn btn-default' onClick={() => { viewDemoClose("complaintview"); }}>Close</Button>
              <Button type='button' className='btn btn-primary' onClick={() => { handleUpdateStatus(complaintToView.id) }}>Save</Button>
            </Modal.Footer> */}
          </Modal>

          <Modal show={assign} centered>
            <Modal.Header>
              <Modal.Title>Assign To</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => {
                viewDemoClose("assign");

              }}>
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
                      // isSearchable={true}
                      value={selectedVendor}
                      onChange={(selected: any) => setSelectedVendor(selected)}
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
              <Button variant="primary" onClick={() => {
                handleVendorAssignment();
                viewDemoClose("assign");
              }}>
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
                    <Form.Label>Society</Form.Label>
                    <Select
                      options={societyData}
                      placeholder="Select society"
                      onChange={(selected) => { handleFilterChange("societyIdentifier", selected?.value) }}
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
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

                <Col xl={3}>
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

                <Col xl={3}>
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
              <div className="table-responsive ">
                <DataTableExtensions {...tableData}>
                  <DataTable
                    columns={columns}
                    data={complaintData}
                    pagination


                  />
                </DataTableExtensions>
              </div>
              {/* <table className='table'>
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
                        }} className='text-info cursor'>{item.id}</span></td>
                        <td>{item.propertyName}</td>
                        <td>{item.categoryName}</td>
                        <td>
                          {item.contactPersonName || "-"}
                        </td>

                        <td>{item.createdAt}</td>
                        <td>{item.status}</td>

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
                            <Dropdown.Item onClick={() => { setComplaintToView(item), setEditing(true), viewDemoShow("addcomplaint") }}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                              setComplaintIdToAssign(item)
                              viewDemoShow("assign")
                              fetchAllVendorForDropDown()
                            }
                            }>Assign To</Dropdown.Item>
                            <Dropdown.Item className='text-danger' onClick={() => handleDelete(item.id)}>Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown></td>
                      </tr>
                    )
                  })}


                </tbody>
              </table> */}

            </Card.Body>
          </Card>

        </Col>

      </Row>
      < CustomToastContainer />

    </Fragment >
  );
}
