import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
// import Select from "react-select";
// import { imagesData } from "../../common/commonimages";
// import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { createNoticeApi, deleteNoticeApi, getAllNoticeApi, updateNoticeApi } from '../../api/notice-api';
import { handleApiError } from '../../helpers/handle-api-error';
import { CustomToastContainer, showToast } from '../../common/services/toastServices';
// import { Formik, Form as FormikForm } from 'formik';

import NoticeModal from '../../common/modals/noticeModal';
import NoticeViewModal from '../../common/modals/noticeViewModal';
import TestLoader from '../../layout/layoutcomponent/testloader';
import { useSelector } from 'react-redux';
import { RootState } from '../../common/store/store';

export default function Notices() {
  const [noticedata, setNoticeData] = useState<any>([]);
  const [singleNoticedata, setSingleNoticeData] = useState<any>(null);
  const [addnotices, setaddnotices] = useState(false);
  const [viewnotice, setviewnotice] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const { society } = useSelector((state: RootState) => state.auth)

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
      const response = await getAllNoticeApi(society.value)
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
          towerIdentifier: notice?.tower?.towerIdentifier,
          towerName: notice?.tower?.towerName,
          wingIdentifier: notice?.wing?.wingIdentifier,
          wingName: notice?.wing?.wingName,
          propertyIdentifier: notice?.property?.propertyIdentifier,
          propertyName: notice?.property?.propertyName,
          noticeIdentifier: notice.noticeIdentifier,
          noticeFilePath: notice.noticeFilePath
        }
      ));
      setNoticeData(formattedData);
    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {

    fetchAllNotice();
  }, [society])

  
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

  // const noticetype = [
  //   { value: "General Notice", label: "General Notice" },
  // ]

  const handleDelete = (row: any) => {
      ; (async () => {
        try {

          const response = await deleteNoticeApi(row.noticeIdentifier)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // Remove the society from the table
            setNoticeData((prevData: any) => prevData.filter((society: any) => society.noticeIdentifier !== row.noticeIdentifier))
          }
        } catch (error: any) {
          const errorMessage = handleApiError(error)
          showToast("error", errorMessage)
        }
      })()
  }

  // const fetchPropertiesForDropDown = async (society: any) => {
  //   try {
  //     const response = await getWingPropertiesApi(society.value);
  //     const formattedData = response.data.data.map((item: any) => ({
  //       value: item.propertyIdentifier,
  //       label: item.propertyName ? item.propertyName : item.flatNumber,
  //     }));
  //     setPropertiesForDropDown(formattedData);
  //   } catch (error) {
  //     const errorMessage = handleApiError(error)
  //     showToast("error", errorMessage)
  //   }
  // }

  // const fetchWingsForDropDown = async (society: any) => {
  //   try {
  //     const response = await getTowerWingsApi(society.value);
  //     const formattedData = response.data.data.map((item: any) => ({
  //       value: item.wingIdentifier,
  //       label: item.wingName,
  //     }));

  //     setWingOptions(formattedData);
  //   } catch (error) {
  //     const errorMessage = handleApiError(error)
  //     showToast("error", errorMessage)
  //   }
  // }

  // const fetchTowersForDropDown = async (society: any) => {
  //   try {
  //     const response = await getSocietyTowersApi(society.value);
  //     const formattedData = response.data.data.map((item: any) => ({
  //       value: item.towerIdentifier,
  //       label: item.towerName,
  //     }));
  //     setTowerOptions(formattedData);
  //   } catch (error) {
  //     const errorMessage = handleApiError(error)
  //     showToast("error", errorMessage)
  //   }
  // }


  const handleSubmit = async (values: any) => {
    const formattedData: any = {
      noticeSubject: values.subject,
      societyIdentifier: values.society.value,
      message: values.message,
      startDate: values.startDate,
      validDate: values.validDate,
      noticeType: values.noticeType.value
    }
    if(values?.tower?.value){
      formattedData.towerIdentifier=values.tower.value
    }
    if(values?.wing?.value){
      formattedData.wingIdentifier=values.wing.value
    }
    if(values?.property?.value){
      formattedData.propertyIdentifier=values.property.value
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

  const handleClose=()=>{
    viewDemoClose("addnotices")
    setSingleNoticeData(null)
  }

  const handleViewClose=()=>{
    viewDemoClose("viewnotice")
    setSingleNoticeData(null)
  }

  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Notices</span>
        </div>

        <div className="right-content">
          <span className='float-end btn btn-primary btn-sm' onClick={() => viewDemoShow("addnotices")}><i className="bi bi-plus"></i> Add Notices</span>
          {/* <Modal show={addnotices} size="lg">
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
                property: singleNoticedata ? { label: singleNoticedata.propertyName, value: singleNoticedata.propertyIdentifier } : { label: "", value: "" },
                wing: singleNoticedata ? { label: singleNoticedata.wingName, value: singleNoticedata.wingIdentifier } : { label: "", value: "" },
                tower: singleNoticedata ? { label: singleNoticedata.towerName, value: singleNoticedata.towerIdentifier } : { label: "", value: "" },
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
                              placeholder="Select type"
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

          </Modal> */}
          {
            addnotices&&(singleNoticedata?<NoticeModal show={addnotices} onClose={handleClose} editing={editing} initialVals={singleNoticedata} onSave={handleSubmit}/>:<NoticeModal show={addnotices} onClose={handleClose} editing={editing} onSave={handleSubmit}/>)
          }
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
                      progressPending={isLoading}
                      progressComponent={<TestLoader />}


                    />
                  </DataTableExtensions>
                }
              </div>
              {/* <Modal show={viewnotice} >
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
                            <Col xl={12}>
                              {singleNoticedata?.noticeFilePath ? (
                                (() => {
                                  const filePath = singleNoticedata?.noticeFilePath;
                                  const fileExtension = filePath.split('.').pop().toLowerCase();

                                  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'].includes(fileExtension);

                                  if (isImage) {
                                    return (
                                      <>
                                        <img
                                          alt="Attachment"
                                          className="w-100 rounded-2"
                                          crossOrigin="anonymous"
                                          src={import.meta.env.VITE_STATIC_PATH + filePath}
                                          style={{ cursor: 'pointer' }}
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
                viewnotice&&singleNoticedata&&<NoticeViewModal show={viewnotice} onClose={handleViewClose} initialVals={singleNoticedata}/>
              }


            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CustomToastContainer />
    </Fragment >
  );
}
