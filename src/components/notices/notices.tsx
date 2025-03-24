import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown, Modal, Form, Button, CardBody } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
// import { imagesData } from "../../common/commonimages";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { createNoticeApi, deleteNoticeApi, getAllNoticeApi, updateNoticeApi } from '../../api/notice-api';
import { handleApiError } from '../../helpers/handle-api-error';
import { getAllSocietyApi } from '../../api/society-api';
import { CustomToastContainer, showToast } from '../../common/services/toastServices';
import { Formik, Form as FormikForm } from 'formik';

export default function Notices() {
  const [societyData, setSocietyData] = useState<any[]>([]);
  const [noticedata, setNoticedata] = useState<any>([]);
  const [singleNoticedata, setSingleNoticeData] = useState<any>(null);
  const [addnotices, setaddnotices] = useState(false);
  const [viewnotice, setviewnotice] = useState(false);
  const [editing, setEditing] = useState(false);

  const columns = [
    {
      name: 'S.No',
      selector: (row: any) => row.sno,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Society',
      selector: (row: any) => row.societyName,
      sortable: true,
    },
    {
      name: 'Notice Type',
      cell: (row: any) => (
        <span className='text-info cursor' onClick={() => { viewDemoShow("viewnotice"), setSingleNoticeData(row) }}>{row.noticeType}</span>
      ),
      sortable: true,
    },

    {
      name: 'Notice Subject',
      selector: (row: any) => row.noticeSubject,
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
      name: 'Like & Dislike',
      cell: () => (
        <span className='cursor'><span className='text-success'>12 <i className="fa fa-thumbs-up"></i></span> <span className="ms-2 text-muted">5 <i className="fa fa-thumbs-down"></i></span> </span>
      ),
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
            <Dropdown.Item onClick={() => {
              setSingleNoticeData(row);
              viewDemoShow("addnotices")
              setEditing(true)
            }}>Edit </Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleDelete(row)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];

  const fetchAllNotice = async () => {
    try {
      const response = await getAllNoticeApi()
      const data = response.data.data
      const formattedData = data.map((notice: any, index: number) => (
        {
          sno: index + 1,
          noticeType: notice.noticeType,
          noticeSubject: notice.noticeSubject,
          message: notice.message,
          startDate: notice.startDate,
          validDate: notice.validDate,
          societyIdentifier: notice?.society?.societyIdentifier,
          societyName: notice?.society?.societyName,
          noticeIdentifier: notice.noticeIdentifier,
          noticeFilePath: notice.noticeFilePath
        }
      ));
      setNoticedata(formattedData);
    } catch (error) {
      console.log(error)
      handleApiError(error)
    }
  }



  useEffect(() => {

    fetchAllNotice();
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
      case "addnotices":
        setaddnotices(true);
        break;

      case "viewnotice":
        setviewnotice(true);
        setEditing(false)
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addnotices":
        setaddnotices(false);
        setEditing(false)
        break;

      case "viewnotice":
        setviewnotice(false);
        setEditing(false)
        break;

    }
  };


  const tableData = {
    columns,
    data: noticedata
  };

  const noticetype = [
    { value: "General Notice", label: "General Notice" },
  ]

  const handleDelete = (row: any) => {
    console.log(row)
      ; (async () => {
        try {

          const response = await deleteNoticeApi(row.noticeIdentifier)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // Remove the society from the table
            setNoticedata((prevData: any) => prevData.filter((society: any) => society.noticeIdentifier !== row.noticeIdentifier))
          }
        } catch (error: any) {
          const errorMessage = handleApiError(error)
          showToast("error", errorMessage)
        }
      })()
  }


  const handleSubmit = async (values: any) => {
    const formattedData: any = {
      noticeSubject: values.subject,
      societyIdentifier: values.society.value,
      message: values.message,
      startDate: values.startDate,
      validDate: values.validDate,
      noticeType: values.noticeType.value
    }

    if (values.file) {
      formattedData.noticeFile = values.file
    }
    try {
      let response;
      if (editing) {
        response = await updateNoticeApi(formattedData, singleNoticedata?.noticeIdentifier)
      } else {
        response = await createNoticeApi(formattedData)
      }
      if (response.status === 200) {
        viewDemoClose("addnotices");
        showToast("success", response.data.message)
        fetchAllNotice()
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    } finally {
      setSingleNoticeData(null)
    }
    viewDemoClose("addnotices")
  }

  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Notices</span>
        </div>

        <div className="right-content">
          <span className='float-end btn btn-primary btn-sm' onClick={() => viewDemoShow("addnotices")}><i className="bi bi-plus"></i> Add Notices</span>
          <Modal show={addnotices} size="lg">
            <Modal.Header>
              <Modal.Title>Notices</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addnotices"), setSingleNoticeData(null) }}>
                x
              </Button>
            </Modal.Header>
            <Formik
              enableReinitialize
              initialValues={{
                society: singleNoticedata ? { label: singleNoticedata.societyName, value: singleNoticedata.societyIdentifier } : { label: "", value: "" },
                noticeType: singleNoticedata ? { label: singleNoticedata.noticeType, value: singleNoticedata.noticeType } : { label: "", value: "" },
                subject: singleNoticedata?.noticeSubject || "",
                message: singleNoticedata?.message || "",
                startDate: singleNoticedata?.startDate || "",
                validDate: singleNoticedata?.validDate || "",
                file: null,
                fileName: singleNoticedata?.noticeFilePath || null,
              }}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, setFieldValue }) => {
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
                        {/* Society */}
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

                        {/* Notice Type */}
                        <Col xl={6}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Notice Type</Form.Label>
                            <Select
                              options={noticetype}
                              name='noticeType'
                              placeholder="Select type"
                              classNamePrefix="Select2"
                              value={values.noticeType}
                              onChange={(option) => setFieldValue("noticeType", option)}
                            />
                          </Form.Group>
                        </Col>

                        {/* Notice Subject */}
                        <Col xl={12}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>Notice Subject</Form.Label>
                            <Form.Control
                              type="text"
                              className="form-control"
                              name="subject"
                              value={values.subject}
                              onChange={handleChange}
                              placeholder="Subject"
                            />
                          </Form.Group>
                        </Col>

                        {/* Message (SunEditor) */}
                        <Col xl={12}>
                          <Form.Group className="form-group mb-1">
                            <Form.Label>
                              Message <span className="text-danger">*</span>
                            </Form.Label>
                            <SunEditor
                              defaultValue={values.message}
                              onChange={(content) => setFieldValue("message", content)} // Update Formik value
                            />
                          </Form.Group>
                        </Col>

                        {/* Start Date */}
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

                        {/* Valid Date */}
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

                        {/* File Upload */}
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
                      <Button variant="default" onClick={() => { viewDemoClose("addnotices"), setSingleNoticeData(null) }}>
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

          </Modal>
        </div>
      </div>

      <Row>
        <Col xl={12}>
          <Card>
            <Card.Body>

              <div className="table-responsive ">
                {
                  noticedata && <DataTableExtensions {...tableData}>
                    <DataTable
                      columns={columns}
                      data={noticedata}
                      pagination


                    />
                  </DataTableExtensions>
                }
              </div>
              <Modal show={viewnotice} >
                <Modal.Header>
                  <Modal.Title>Notice Details</Modal.Title>
                  <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("viewnotice"); setSingleNoticeData(null) }}>
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
                              <p className='tx-16 tx-semibold'>{singleNoticedata?.societyName || "N/A"}</p>
                            </Col>
                          </Row>
                        </CardBody>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={12}>
                              <p className='mb-0 text-muted'>Notice Type</p>
                              <p className='tx-15 tx-semibold'>{singleNoticedata?.noticeType || "N/A"}</p>
                            </Col>
                          </Row>
                        </CardBody>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={12}>
                              <p className='mb-0 text-muted'>Notice Subject
                                <span className='cursor float-end'><span className='text-success'>12 <i className="fa fa-thumbs-up"></i></span> <span className="ms-2 text-muted">5 <i className="fa fa-thumbs-down"></i></span> </span>
                              </p>
                              <p className='tx-15 tx-semibold'>{singleNoticedata?.noticeSubject || "N/A"}</p>
                              <p className='mb-0 text-muted'>Message</p>
                              {/* <p className='tx-14'>{singleNoticedata?.message||"N/A"}</p> */}
                              <p className='tx-14' dangerouslySetInnerHTML={{ __html: singleNoticedata?.message || "N/A" }} />
                            </Col>

                          </Row>
                        </CardBody>
                        <CardBody className='p-2'>
                          <Row>
                            <Col xl={6}>
                              <p className='mb-0 text-muted'>Satrt Date</p>
                              <p className='tx-15 tx-semibold'>{singleNoticedata?.startDate || "N/A"}</p>
                            </Col>
                            <Col xl={6} className='text-end'>
                              <p className='mb-0 text-muted'>Valid Date</p>
                              <p className='tx-15 tx-semibold'>{singleNoticedata?.validDate || "N/A"}</p>
                            </Col>
                          </Row>

                        </CardBody>

                      </Card>
                      <Card className='box-shadow'>
                        <CardBody className='p-2'>
                          <p className='tx-15 pb-1 pt-1 border-bottom tx-semibold'>Attachments</p>
                          <Row>
                            {/* <Col xl={12}>
                              {singleNoticedata?.noticeFilePath ? <img
                                alt="" className='w-100 rounded-2'
                                crossOrigin="anonymous"
                                src={import.meta.env.VITE_STATIC_PATH + singleNoticedata?.noticeFilePath}
                              /> : <p className='w-100 rounded-2' style={{ height: "100px", backgroundColor: "lightgray", textAlign: "center", verticalAlign: "middle", lineHeight: "100px" }}>No image</p>}
                            </Col> */}
                            <Col xl={12}>
                              {singleNoticedata?.noticeFilePath ? (
                                // Determine the file extension
                                (() => {
                                  const filePath = singleNoticedata?.noticeFilePath;
                                  const fileExtension = filePath.split('.').pop().toLowerCase();

                                  // Check if the file is an image
                                  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'].includes(fileExtension);

                                  if (isImage) {
                                    // If it's an image, show the image tag
                                    return (
                                      <>
                                        <img
                                          alt="Attachment"
                                          className="w-100 rounded-2"
                                          crossOrigin="anonymous"
                                          src={import.meta.env.VITE_STATIC_PATH + filePath}
                                          style={{ cursor: 'pointer'}}
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
                                            // Check file extension for handling download or open in new tab
                                            const isPDF = fileExtension === 'pdf';
                                            const isExcel = fileExtension === 'xls' || fileExtension === 'xlsx';

                                            if (isPDF || isExcel) {
                                              window.open(fileUrl, '_blank'); // Open in new tab
                                            } else {
                                              // Trigger file download if it's not PDF or Excel
                                              const link = document.createElement('a');
                                              link.href = fileUrl;
                                              link.download = filePath.split('/').pop(); // Name the downloaded file
                                              link.click(); // Trigger the download
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

              </Modal>


            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CustomToastContainer />
    </Fragment >
  );
}
