import { Fragment, useEffect,  useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown, Modal, Form, Button, CardBody } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { imagesData } from "../../common/commonimages";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { handleApiError } from '../../helpers/handle-api-error';
import { getAllSocietyApi } from '../../api/society-api';
import { CustomToastContainer, showToast } from '../../common/services/toastServices';
import { createAnnouncementApi, getAllAnnouncementApi } from '../../api/announcement-api';
import { Formik, Form as FormikForm } from 'formik';

export default function Announcements() {
  const [addannouncement, setaddannouncement] = useState(false);
  const [viewannouncement, setviewannouncement] = useState(false);
  const [editing, setEditing] = useState(false);
  const [societyData, setSocietyData] = useState<any[]>([]);
  const [announcementData, setAnnouncementData] = useState<any>([]);
  const [singleAnnouncementData, setSingleAnnouncementData] = useState<any>(null);


  const columns = [
    {
      name: 'S.No',
      selector: (row: any) => row.sno,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Society',
      cell: (row: any) => (
        <span>{row.societyName}</span>
      ),
      sortable: true,
    },
    {
      name: 'Announcement Name',
      cell: (row: any) => {
      return (
        <span className='text-info cursor' onClick={() => {viewDemoShow("viewannouncement"), setSingleAnnouncementData(row)}}>{row.announcementName}</span>
      )},
      sortable: true,
    },

    {
      name: 'Start Date',
      selector: (row: any) => row.startDate,
      sortable: true,
    },
    {
      name: 'Valid Date',
      selector: (row: any) => row.validDate,
      sortable: true,
    },

    {
      name: 'Action',
      sortable: true,
      cell: (row:any) => (
        <Dropdown >
          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
            Action
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {setSingleAnnouncementData(row),viewDemoShow("addannouncement"),setEditing(true)}}>Edit </Dropdown.Item>
            <Dropdown.Item className='text-danger' >Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];


  const fetchAllAnnouncement = async () => {
    try {
      const response = await getAllAnnouncementApi()
      const data = response.data.data
      const formattedData = data.map((announcement: any, index: number) => (
        {
          sno: index + 1,
          announcementName: announcement.announcementName,
          announcementIdentifier: announcement.announcementIdentifier,
          message: announcement.message,
          startDate: announcement.startDate,
          validDate: announcement.validDate,
          societyIdentifier: announcement?.society?.societyIdentifier,
          societyName: announcement?.society?.societyName,
        }
      ));
      setAnnouncementData(formattedData);
    } catch (error) {
      console.log(error)
      handleApiError(error)
    }
  }

  // const handleDelete = (row: any) => {
  //     ; (async () => {
  //       try {
  
  //         const response = await deleteAnnouncementApi(row.announcementIdentifier)
  //         if (response.status === 200) {
  //           showToast("success", response.data.message)
  //           setAnnouncementData((prevData:any) => prevData.filter((society:any) => society.announcementIdentifier !== row.announcementIdentifier))
  //         }
  //       } catch (error: any) {
  //         const errorMessage = handleApiError(error)
  //         showToast("error", errorMessage)
  //       }
  //     })()
  //   }


  useEffect(() => {

    fetchAllAnnouncement();
    fetchSocietiesForDropDown()
  }, [])

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




  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "addannouncement":
        setaddannouncement(true);
        break;

      case "viewannouncement":
        setviewannouncement(true);
        setEditing(false)
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addannouncement":
        setaddannouncement(false);
        setEditing(true)
        break;

      case "viewannouncement":
        setviewannouncement(false);
        break;

    }
  };



  const tableData = {
    columns,
    data: announcementData
  };


const handleSubmit = async (values: any) => {
    const formattedData: any = {
      announcementName: values.announcementName,
      societyIdentifier: values.society.value,
      message: values.message,
      startDate: values.startDate,
      validDate: values.validDate,
    }

    if (values.file) {
      formattedData.announcementFile = values.file
    }
    try {
      let response;
      if(editing){
        // response = await updateAnnouncementApi(formattedData)
      }else{
        response = await createAnnouncementApi(formattedData)
      }
      
      if (response.status === 200||response.status === 201) {
        viewDemoClose("addannouncement")
        showToast("success", response.data.message)
        fetchAllAnnouncement()
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    } finally{
      setSingleAnnouncementData(null)
    }
    viewDemoClose("addcomplaint")
  }

  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Announcements</span>
        </div>

        <div className="right-content">
          <span className='float-end btn btn-primary btn-sm' onClick={() => viewDemoShow("addannouncement")}><i className="bi bi-plus"></i> Add Announcement</span>
          <Modal show={addannouncement} size="lg" >
            <Modal.Header>
              <Modal.Title>Announcement</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addannouncement"),setSingleAnnouncementData(null) }}>
                x
              </Button>
            </Modal.Header>
            {/* <Modal.Body className='pt-2'>
              <Row>
              <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society</Form.Label>
                    <Select
                      options={society}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>


                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Announcement Name</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Name'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Message<span className="text-danger">*</span></Form.Label>
                    <SunEditor />
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Start Date </Form.Label>
                    <Form.Control type="date" className='form-control' placeholder=''></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Valud Date</Form.Label>
                    <Form.Control type="date" className='form-control' placeholder=''></Form.Control>
                  </Form.Group>
                </Col>
                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Upload <small className='float-end text-muted'>Max size : 2MB</small> </Form.Label>
                    <Form.Control type="file" className='form-control' placeholder=''></Form.Control>
                  </Form.Group>
                </Col>


              </Row>
            </Modal.Body> */}
            <Formik
              enableReinitialize
              initialValues={{
                society: singleAnnouncementData?{label:singleAnnouncementData.societyName,value:singleAnnouncementData.societyIdentifier}:{ label: "", value: "" },
                announcementName: singleAnnouncementData?.announcementName||"",
                message: singleAnnouncementData?.message||"",
                startDate: singleAnnouncementData?.startDate||"",
                validDate: singleAnnouncementData?.validDate||"",
                file: null,
              }}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, setFieldValue }) => {
                useEffect(()=>{
                  if(singleAnnouncementData?.message){
                    setFieldValue("message",singleAnnouncementData?.message)
                  }
                },[singleAnnouncementData])
                return (
                <FormikForm>
                  <Modal.Body className='pt-2'>
                    <Row>
                      <Col xl={6}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Society</Form.Label>
                          <Select
                            options={societyData}
                            name='society'
                            placeholder="Select type"
                            classNamePrefix="Select2"
                            value={values.society} // Bind Formik value
                            onChange={(option) => setFieldValue("society", option)} // Update Formik value
                          />
                        </Form.Group>
                      </Col>

                      

                      <Col xl={6}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Announcement Name</Form.Label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            name="announcementName"
                            value={values.announcementName}
                            onChange={handleChange}
                            placeholder="Announcement name"
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>
                            Message <span className="text-danger">*</span>
                          </Form.Label>
                          <SunEditor
                          defaultValue={values.message}
                            onChange={(content) => setFieldValue("message", content)}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Start Date</Form.Label>
                          <Form.Control
                            type="date"
                            name="startDate"
                            value={values.startDate}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Valid Date</Form.Label>
                          <Form.Control
                            type="date"
                            name="validDate"
                            value={values.validDate}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-1">
                          <Form.Label>
                            Upload <small className="float-end text-muted">Max size : 2MB</small>
                          </Form.Label>
                          <Form.Control
                            type="file"
                            name="file"
                            onChange={(event: any) =>
                              setFieldValue("file", event.currentTarget.files[0])
                            }
                          />
                        </Form.Group>
                      </Col>


                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="default" onClick={() => { viewDemoClose("addannouncement"),setSingleAnnouncementData(null) }}>
                      Close
                    </Button>
                    <Button variant="primary" type='submit'>
                      {editing?"Update":"Save"}
                    </Button>

                  </Modal.Footer>
                </FormikForm>
              )}}
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
                    data={announcementData}
                    pagination


                  />
                </DataTableExtensions>
              </div>
              <Modal show={viewannouncement} >
                <Modal.Header>
                  <Modal.Title>Announcement Details</Modal.Title>
                  <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("viewannouncement"); setSingleAnnouncementData(null) }}>
                    x
                  </Button>
                </Modal.Header>
                <Modal.Body className='bg-light'>
                  <Row>
                    <Col xl={12}>
                      <Card className='box-shadow'>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={12}>
                              <p className='mb-0 text-muted'>Society</p>
                              <p className='tx-16 tx-semibold'>{singleAnnouncementData?.societyName||"N/A"}</p>
                            </Col>
                          </Row>
                        </CardBody>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={12}>
                              <p className='mb-0 text-muted'>Announcement Name </p>
                              <p className='tx-15 tx-semibold'>{singleAnnouncementData?.announcementName||"N/A"}</p>
                              <p className='mb-0 text-muted'>Message</p>
                              <p className='tx-14 mb-2' dangerouslySetInnerHTML={{ __html: singleAnnouncementData?.message || "N/A" }} />
                            </Col>

                          </Row>
                        </CardBody>
                        <CardBody className='p-2'>
                          <Row>
                            <Col xl={6}>
                              <p className='mb-0 text-muted'>Satrt Date</p>
                              <p className='tx-15 tx-semibold'>{singleAnnouncementData?.startDate||"N/A"}</p>
                            </Col>
                            <Col xl={6} className='text-end'>
                              <p className='mb-0 text-muted'>Valid Date</p>
                              <p className='tx-15 tx-semibold'>{singleAnnouncementData?.validDate||"N/A"}</p>
                            </Col>
                          </Row>

                        </CardBody>

                      </Card>
                      <Card className='box-shadow'>
                        <CardBody className='p-2'>
                          <p className='tx-15 pb-1 pt-1 border-bottom tx-semibold'>Attachments</p>
                          <Row>
                            <Col xl={12}>
                              <img className='wd-100p'
                                alt=""
                                src={imagesData('female1')}
                              />


                            </Col>

                          </Row>

                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Modal.Body>

              </Modal>


            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CustomToastContainer />
    </Fragment >
  );
}
