import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import 'suneditor/dist/css/suneditor.min.css';
import { handleApiError } from '../../helpers/handle-api-error';
import { CustomToastContainer, showToast } from '../../common/services/toastServices';
import { createAnnouncementApi, deleteAnnouncementApi, getAllAnnouncementApi, updateAnnouncementApi } from '../../api/announcement-api';
import AnnouncementViewModal from '../../common/modals/announcementViewModal';
import AnnouncementModal from '../../common/modals/announcementModal';
import TestLoader from '../../layout/layoutcomponent/testloader';
import { useSelector } from 'react-redux';
import { RootState } from '../../common/store/store';
// import { getAllSocietyApi } from '../../api/society-api';
// import Select from "react-select";
// import { imagesData } from "../../common/commonimages";
// import SunEditor from 'suneditor-react';
// import { Formik, Form as FormikForm } from 'formik';
// import { getSocietyTowersApi } from '../../api/tower-api';
// import { getTowerWingsApi } from '../../api/wing-api';
// import { getWingPropertiesApi } from '../../api/property-api';

export default function Announcements() {
  const [addannouncement, setaddannouncement] = useState(false);
  const [viewannouncement, setviewannouncement] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [announcementData, setAnnouncementData] = useState<any>([]);
  const [singleAnnouncementData, setSingleAnnouncementData] = useState<any>(null);
    const { society } = useSelector((state: RootState) => state.auth)
  // const [societyData, setSocietyData] = useState<any[]>([]);
  // const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);
  // const [towerOptions, setTowerOptions] = useState<any[]>([]);
  // const [wingOptions, setWingOptions] = useState<any[]>([]);


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
          <span className='text-info cursor' onClick={() => { viewDemoShow("viewannouncement"), setSingleAnnouncementData(row) }}>{row.announcementName}</span>
        )
      },
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
      cell: (row: any) => (
        <Dropdown >
          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
            Action
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => { setSingleAnnouncementData(row), viewDemoShow("addannouncement"), setEditing(true) }}>Edit </Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => { handleDelete(row) }}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];


  const fetchAllAnnouncement = async () => {
    try {
      const response = await getAllAnnouncementApi(society.value)
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
          towerIdentifier: announcement?.tower?.towerIdentifier,
          towerName: announcement?.tower?.towerName,
          wingIdentifier: announcement?.wing?.wingIdentifier,
          wingName: announcement?.wing?.wingName,
          propertyIdentifier: announcement?.property?.propertyIdentifier,
          propertyName: announcement?.property?.propertyName,
          announcementFilePath: announcement?.announcementFilePath
        }
      ));
      setAnnouncementData(formattedData);
    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = (row: any) => {
    ; (async () => {
      try {

        const response = await deleteAnnouncementApi(row.announcementIdentifier)
        if (response.status === 200) {
          showToast("success", response.data.message)
          setAnnouncementData((prevData: any) => prevData.filter((society: any) => society.announcementIdentifier !== row.announcementIdentifier))
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    })()
  }


  useEffect(() => {

    fetchAllAnnouncement();
  }, [society])

  

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

    if (values?.tower?.value) {
      formattedData.towerIdentifier = values.tower.value
    }
    if (values?.wing?.value) {
      formattedData.wingIdentifier = values.wing.value
    }
    if (values?.property?.value) {
      formattedData.propertyIdentifier = values.property.value
    }

    if (values.file) {
      formattedData.announcementFile = values.file
    }
    try {
      let response;
      if (editing) {
        response = await updateAnnouncementApi(formattedData, singleAnnouncementData?.announcementIdentifier)
      } else {
        response = await createAnnouncementApi(formattedData)
      }

      if (response.status === 200 || response.status === 201) {
        viewDemoClose("addannouncement")
        showToast("success", response.data.message)
        fetchAllAnnouncement()
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    } finally {
      setSingleAnnouncementData(null)
    }
    viewDemoClose("addannouncement")
  }

  const handleClose = () => {
    viewDemoClose("addannouncement")
    setSingleAnnouncementData(null)
  }

  const handleViewClose = () => {
    viewDemoClose("viewannouncement")
    setSingleAnnouncementData(null)
  }

  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Announcements</span>
        </div>

        <div className="right-content">
          <span className='float-end btn btn-primary btn-sm' onClick={() => viewDemoShow("addannouncement")}><i className="bi bi-plus"></i> Add Announcement</span>
          {/* <Modal show={addannouncement} size="lg" >
            <Modal.Header>
              <Modal.Title>Announcement</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addannouncement"), setSingleAnnouncementData(null) }}>
                x
              </Button>
            </Modal.Header>
            <Formik
              enableReinitialize
              initialValues={{
                society: singleAnnouncementData ? { label: singleAnnouncementData.societyName, value: singleAnnouncementData.societyIdentifier } : { label: "", value: "" },
                property: singleAnnouncementData ? { label: singleAnnouncementData.propertyName, value: singleAnnouncementData.propertyIdentifier } : { label: "", value: "" },
                wing: singleAnnouncementData ? { label: singleAnnouncementData.wingName, value: singleAnnouncementData.wingIdentifier } : { label: "", value: "" },
                tower: singleAnnouncementData ? { label: singleAnnouncementData.towerName, value: singleAnnouncementData.towerIdentifier } : { label: "", value: "" },
                announcementName: singleAnnouncementData?.announcementName || "",
                message: singleAnnouncementData?.message || "",
                startDate: singleAnnouncementData?.startDate || "",
                validDate: singleAnnouncementData?.validDate || "",
                file: null,
                fileName: singleAnnouncementData?.announcementFilePath || null,
              }}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, setFieldValue }) => {
                useEffect(() => {
                  if (values.society && values.society.value) {
                    fetchTowersForDropDown(values.society);
                  }
                }, [values.society]);

                useEffect(() => {
                  if (values.tower && values.tower.value) {
                    fetchWingsForDropDown(values.tower);
                  }
                }, [values.tower]);

                useEffect(() => {
                  if (values.wing && values.wing.value) {
                    fetchPropertiesForDropDown(values.wing);
                  }
                }, [values.wing]);
                useEffect(() => {
                  if (singleAnnouncementData?.message) {
                    setFieldValue("message", singleAnnouncementData?.message)
                  }
                }, [singleAnnouncementData])

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
                    <Modal.Body className='pt-2'>
                      <Row>
                        <Col xl={6}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Society</Form.Label>
                            <Select
                              options={societyData}
                              name='society'
                              placeholder="Select Society"
                              classNamePrefix="Select2"
                              value={values.society}
                              onChange={(selected) => {
                                fetchTowersForDropDown(selected);
                                setFieldValue("tower", null);
                                setFieldValue("wing", null);
                                setFieldValue("property", null);
                                setFieldValue("society", selected);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col xl={6}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Tower</Form.Label>
                            <Select
                              options={towerOptions}
                              name='tower'
                              placeholder="Select type"
                              classNamePrefix="Select2"
                              value={values.tower}
                              onChange={(selected) => {
                                fetchWingsForDropDown(selected);
                                setFieldValue("wing", null);
                                setFieldValue("property", null);
                                setFieldValue("tower", selected);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col xl={6}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Wing</Form.Label>
                            <Select
                              options={wingOptions}
                              name='wing'
                              placeholder="Select type"
                              classNamePrefix="Select2"
                              value={values.wing}
                              onChange={(selected) => {
                                fetchPropertiesForDropDown(selected);
                                setFieldValue("property", null);
                                setFieldValue("wing", selected);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col xl={6}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Property</Form.Label>
                            <Select
                              options={propertiesForDropDown}
                              name='property'
                              placeholder="Select type"
                              classNamePrefix="Select2"
                              value={values.property}
                              onChange={(option) => setFieldValue("property", option)}
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
                      <Button variant="default" onClick={() => { viewDemoClose("addannouncement"), setSingleAnnouncementData(null) }}>
                        Close
                      </Button>
                      <Button variant="primary" type='submit'>
                        {editing ? "Update" : "Save"}
                      </Button>

                    </Modal.Footer>
                  </FormikForm>
                )
              }}
            </Formik>

          </Modal> */}
          {
           addannouncement&& (singleAnnouncementData   ? <AnnouncementModal show={addannouncement} onClose={handleClose} editing={editing} initialVals={singleAnnouncementData} onSave={handleSubmit} /> : <AnnouncementModal show={addannouncement} onClose={handleClose} editing={editing} onSave={handleSubmit} />)
          }
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
                    progressPending={isLoading}
                    progressComponent={<TestLoader />}


                  />
                </DataTableExtensions>
              </div>
              {/* <Modal show={viewannouncement} >
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
                              <p className='tx-16 tx-semibold'>{singleAnnouncementData?.societyName || "N/A"}</p>
                            </Col>
                          </Row>
                        </CardBody>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={12}>
                              <p className='mb-0 text-muted'>Announcement Name </p>
                              <p className='tx-15 tx-semibold'>{singleAnnouncementData?.announcementName || "N/A"}</p>
                              <p className='mb-0 text-muted'>Message</p>
                              <p className='tx-14 mb-2' dangerouslySetInnerHTML={{ __html: singleAnnouncementData?.message || "N/A" }} />
                            </Col>

                          </Row>
                        </CardBody>
                        <CardBody className='p-2'>
                          <Row>
                            <Col xl={6}>
                              <p className='mb-0 text-muted'>Satrt Date</p>
                              <p className='tx-15 tx-semibold'>{singleAnnouncementData?.startDate || "N/A"}</p>
                            </Col>
                            <Col xl={6} className='text-end'>
                              <p className='mb-0 text-muted'>Valid Date</p>
                              <p className='tx-15 tx-semibold'>{singleAnnouncementData?.validDate || "N/A"}</p>
                            </Col>
                          </Row>

                        </CardBody>

                      </Card>
                      <Card className='box-shadow'>
                        <CardBody className='p-2'>
                          <p className='tx-15 pb-1 pt-1 border-bottom tx-semibold'>Attachments</p>
                          <Row>
                            
                            <Col xl={12}>
                              {singleAnnouncementData?.announcementFilePath ? (
                                (() => {
                                  const filePath = singleAnnouncementData?.announcementFilePath;
                                  const fileExtension = filePath.split('.').pop().toLowerCase();

                                  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'].includes(fileExtension);

                                  if (isImage) {
                                    return (
                                      <>
                                        <img
                                          alt="Attachment"
                                          className="w-100 rounded-2"
                                          crossOrigin="anonymous"
                                          style={{ cursor: 'pointer' }}
                                          src={import.meta.env.VITE_STATIC_PATH + filePath}
                                          onClick={() => window.open(import.meta.env.VITE_STATIC_PATH + filePath, '_blank')}
                                        />
                                        <p className="text-center pt-2">{filePath.split('/').pop()}</p>
                                      </>
                                    );
                                  } else {
                                    return (
                                      <>
                                        <p
                                          className="text-center pt-2"
                                          style={{ cursor: 'pointer', color: 'blue' }}
                                          onClick={() => {
                                            const fileUrl = import.meta.env.VITE_STATIC_PATH + filePath;
                                            const isPDF = fileExtension === 'pdf';
                                            const isExcel = fileExtension === 'xls' || fileExtension === 'xlsx';

                                            if (isPDF || isExcel) {
                                              window.open(fileUrl, '_blank'); 
                                            } else {
                                              const link = document.createElement('a');
                                              link.href = fileUrl;
                                              link.download = filePath.split('/').pop(); 
                                              link.click(); 
                                            }
                                          }}
                                        >
                                          {filePath.split('/').pop()}
                                        </p>
                                      </>
                                    );
                                  }
                                })()
                              ) : (
                                <p className="w-100 rounded-2" style={{ height: "100px", backgroundColor: "lightgray", textAlign: "center", verticalAlign: "middle", lineHeight: "100px" }}>
                                  No Attachment
                                </p>
                              )}
                            </Col>

                          </Row>

                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Modal.Body>

              </Modal> */}

              {
                viewannouncement && singleAnnouncementData && <AnnouncementViewModal show={viewannouncement} onClose={handleViewClose} initialVals={singleAnnouncementData} />
              }


            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CustomToastContainer />
    </Fragment >
  );
}
