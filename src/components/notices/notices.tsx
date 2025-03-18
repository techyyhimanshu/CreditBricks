import { Fragment, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown, Modal, Form, Button, CardBody } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import { imagesData } from "../../common/commonimages";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

export default function Notices() {



  const columns = [
    {
      name: 'S.No',
      selector: row => row.sno,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Society',
      selector: row => row.society,
      sortable: true,
    },
    {
      name: 'Notice Type',
      cell: (row: Row) => (
        <span className='text-info cursor' onClick={() => viewDemoShow("viewnotice")}>General Notice</span>
      ),
      sortable: true,
    },

    {
      name: 'Notice Subject',
      selector: row => row.noticesubject,
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: row => row.startdt,
      sortable: true,
    },
    {
      name: 'Valid Date',
      selector: row => row.validdt,
      sortable: true,
    },
    {
      name: 'Like & Dislike',
      cell: (row: Row) => (
        <span className='cursor'><span className='text-success'>12 <i className="fa fa-thumbs-up"></i></span> <span className="ms-2 text-muted">5 <i className="fa fa-thumbs-down"></i></span> </span>
      ),
      sortable: true,
    },


    {
      name: 'Action',
      sortable: true,
      cell: () => (
        <Dropdown >
          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
            Action
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => viewDemoShow("addnotices")}>Edit </Dropdown.Item>
            <Dropdown.Item className='text-danger' >Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];

  const data = [
    {
      sno: 1,
      society:'',
      noticetype: '',
      noticesubject: 'Society Meeting',
      startdt: '12/03/2025 12:30 pm',
      validdt: '20/03/2025 12:30 pm',
      action: ''

    },
    {
      sno: 2,
      society:'',
      noticetype: '',
      noticesubject: 'Society Meeting',
      startdt: '12/03/2025 12:30 pm',
      validdt: '20/03/2025 12:30 pm',
      action: ''
    },
    {
      sno: 3,
      society:'',
      noticetype: '',
      noticesubject: 'Society Meeting',
      startdt: '12/03/2025 12:30 pm',
      validdt: '20/03/2025 12:30 pm',
      action: ''

    },
    {
      sno: 4,
      society:'',
      noticetype: '',
      noticesubject: 'Society Meeting',
      startdt: '12/03/2025 12:30 pm',
      validdt: '20/03/2025 12:30 pm',
      action: ''
    }
  ]


  const [addnotices, setaddnotices] = useState(false);
  const [viewnotice, setviewnotice] = useState(false);

  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "addnotices":
        setaddnotices(true);
        break;

      case "viewnotice":
        setviewnotice(true);
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addnotices":
        setaddnotices(false);
        break;

      case "viewnotice":
        setviewnotice(false);
        break;

    }
  };



  const tableData = {
    columns,
    data
  };

  const noticetype = [
    { value: "1", label: "General Notice" },
  ]

  const society = [
    { value: "1", label: "Mohan Areca Co-Op Housing Society Limited" },
  ]


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
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addnotices"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body className='pt-2'>
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
                    <Form.Label>Notice Type</Form.Label>
                    <Select
                      options={noticetype}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Notice Subject</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Subject'></Form.Control>
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
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addnotices"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addnotices"); }}>
                Save
              </Button>

            </Modal.Footer>
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
                    data={data}
                    pagination


                  />
                </DataTableExtensions>
              </div>
              <Modal show={viewnotice} >
                <Modal.Header>
                  <Modal.Title>Notice Details</Modal.Title>
                  <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("viewnotice"); }}>
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
                          <p className='tx-16 tx-semibold'>Mohan Areca Co-Op Housing Society Limited</p>
                          </Col>
                         </Row>
                        </CardBody>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={12}>
                            <p className='mb-0 text-muted'>Notice Type</p>
                            <p className='tx-15 tx-semibold'>General Notice</p>
                            </Col>
                           </Row>
                        </CardBody>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={12}>
                              <p className='mb-0 text-muted'>Notice Subject
                              <span className='cursor float-end'><span className='text-success'>12 <i className="fa fa-thumbs-up"></i></span> <span className="ms-2 text-muted">5 <i className="fa fa-thumbs-down"></i></span> </span>
                              </p>
                              <p className='tx-15 tx-semibold'>Society Meeting</p>
                              <p className='mb-0 text-muted'>Message</p>
                              <p className='tx-14'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                            </Col>

                          </Row>
                        </CardBody>
                        <CardBody className='p-2'>
                          <Row>
                            <Col xl={6}>
                            <p className='mb-0 text-muted'>Satrt Date</p>
                            <p className='tx-15 tx-semibold'>12/03/2025,12:30pm</p>
                            </Col>
                            <Col xl={6}  className='text-end'>
                            <p className='mb-0 text-muted'>Valid Date</p>
                            <p className='tx-15 tx-semibold'>20/03/2025, 12:30pm</p>
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

    </Fragment >
  );
}
