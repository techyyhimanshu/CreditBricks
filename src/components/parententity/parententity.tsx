
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Button, Form, Dropdown, CardHeader, Modal } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Formik, Form as FormikForm, ErrorMessage } from 'formik';
import { Link } from "react-router-dom";
import { deleteParentEntityApi, getAllParentEntityApi } from '../../api/parentEntity-api';
import { CustomToastContainer, showToast } from '../../common/services/toastServices';
import { handleApiError } from '../../helpers/handle-api-error';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import TestLoader from '../../layout/layoutcomponent/testloader';



export default function ParentEntity() {
  const [parentSocietyData, setParentSocietyData] = useState<any[]>([]);
  const [viewData, setViewData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSocietyView, setShowSocietyView] = useState(false);


  const columns = [
    {
      name: 'S.No',
      selector: (row: any) => row.sno,
      sortable: true,
      width: '80px'
    },

    {
      name: 'Parent Name',
      selector: (row: any) => (
        <span
          style={{ cursor: 'pointer', color: '#0d6efd' }}
          onClick={() => {
            setViewData(row);
            setShowSocietyView(true);
          }}
        >
          {row.parentSocietyName}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Society Address',
      selector: (row: any) => row.address,
      sortable: true,
    },
    {
      name: 'Contact Number',
      selector: (row: any) => row.parentContactNumber,
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
            <Dropdown.Item ><Link to={`${import.meta.env.BASE_URL}parententity/editparententity/${row.id}`}
            >Edit</Link> </Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleDelete(row.id)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];

  useEffect(() => {

    fetchAllParentSociety();
  }, []);

  const fetchAllParentSociety = async () => {
    try {
      const response = await getAllParentEntityApi()
      if (response.status === 200) {
        const formattedData = response.data.data.map((item: any, index: number) => {
          return {
            sno: index + 1,
            id: item?.parentSocietyIdentifier || "",
            parentSocietyName: item?.parentSocietyName || "",
            address: item?.address || "",
            parentContactNumber: item?.parentContactNumber || "",
            email: item?.email || "",
            managerName: item?.managerName || "",
            gstin: item?.gstin || "",
            panNumber: item?.panNumber || "",
            tanNumber: item?.tanNumber || "",
            bankName: item?.sociertyBankName || "",
            accountNumber: item?.accountNumber || "",
            branchName: item?.branchName || "",
            ifscCode: item?.ifscCode || "",
            billingFrequency: item?.billingFrequency || "",
            interestRate: item?.annualRateOfInterest || "",
            calculationType: item?.interestCalculationType || "",
            children: item?.children || [],
            committeeMembers: item?.committeeMembers || [],
            createdAt: item?.createdAt || "",
          }
        })
        setParentSocietyData(formattedData);
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    } finally {
      setIsLoading(false)
    }
  }

  const tableData = {
    columns,
    data: parentSocietyData
  };

  const handleDelete = (id: string) => {
    ; (async () => {
      try {

        const response = await deleteParentEntityApi(id)
        if (response.status === 200) {
          showToast("success", response.data.message)
          setParentSocietyData((prevData: any) => prevData.filter((society: any) => society.id !== id))
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    })()
  }


  const society = [
    { value: "1", label: "Society" },
    { value: "2", label: "Association" },
  ]
  const parent = [
    { value: "1", label: "Tower123" },


  ]



  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> Parent Entity</span>
        </div>
        <div className="right-content">
        <Link to={`${import.meta.env.BASE_URL}parententity/addparententity`} className="btn btn-primary p-1 pe-2 ps-2 me-1"><i className="bi bi-plus"></i> Add Parent</Link>
                </div>
      </div>

      <Row>
        <Formik
          initialValues={{
            society: { value: "", label: "" }
          }
          }
          onSubmit={(values) => console.log(values)}
        // validationSchema={validationScWhema}

        >
          {({ setFieldValue, values }) => (
            <FormikForm className='col-sm-12'>

              <Card className='m-0'>
                <CardHeader>
                  <h3 className='card-title'>Add Parent Entity</h3>

                </CardHeader>
                <Card.Body className='pt-0 pb-1'>
                  <Row>
                    <Col xl={4}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Society Name or Registraion Number </Form.Label>
                        <Select
                          options={society}
                          name='society'
                          value={values.society}
                          placeholder="Select Society"
                          classNamePrefix="Select2"
                        />
                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                      </Form.Group>
                    </Col>

                    <Col xl={4}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Society Address</Form.Label>
                        <Select
                          options={society}
                          placeholder="Select address"
                          classNamePrefix="Select2"
                        />
                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                      </Form.Group>
                    </Col>

                    <Col xl={4}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Parent Entity </Form.Label>
                        <Select
                          options={parent}
                          placeholder="Select parent"
                          classNamePrefix="Select2"
                        />
                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                      </Form.Group>
                    </Col>


                    <Col xl={12}>
                      <Form.Group className="form-group float-end pt-2">
                        <Button className="btn btn-default ms-2" type="button">Clear </Button>
                        <Button className="btn btn-primary" type="button">Save </Button>

                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card className='mt-3'>
                <CardHeader>
                  <h3 className='card-title'>   List</h3>
                </CardHeader>
                <Card.Body className='pt-0'>
                  {/* <table className='table'>
                    <thead>
                      <tr>
                        <th>S.no.</th>
                        <th>Soceity Name </th>
                        <th>Society Address</th>
                        <th>Parent</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Society</td>
                        <td>-</td>
                        <td>Tower123</td>
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
                  <div className="table-responsive ">
                    <DataTableExtensions {...tableData}>
                      <DataTable
                        columns={columns}
                        data={parentSocietyData}
                        pagination
                        progressPending={isLoading}
                        progressComponent={<TestLoader />}


                      />
                    </DataTableExtensions>
                  </div>

                </Card.Body>
              </Card>



            </FormikForm>
          )}
        </Formik>
        <Modal show={showSocietyView} size='xl' centered>
          <Modal.Header>
            <Modal.Title>Parent Society Details</Modal.Title>
            <Button variant="" className="btn btn-close" onClick={() => setShowSocietyView(false)}>
              x
            </Button>
          </Modal.Header>

          <Modal.Body>

            <Row>
              <Col xl={8}>
                {/* Basic Information */}
                <Card className='box-shadow border border-primary'>
                  <Card.Body>
                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Basic Information</h5>
                    <Row>
                      <Col xl={12} className='mb-2'>
                        <Form.Label>Society Name</Form.Label>
                        <p className='tx-14'>{viewData?.parentSocietyName || "-"}</p>
                      </Col>
                      <Col xl={4} className='mb-2'>
                        <Form.Label>Manager Name</Form.Label>
                        <p className='tx-14'>{viewData?.managerName || "-"}</p>
                      </Col>
                      <Col xl={4} className='mb-2'>
                        <Form.Label>Contact Number</Form.Label>
                        <p className='tx-14'>{viewData?.parentContactNumber || "-"}</p>
                      </Col>
                      <Col xl={4} className='mb-2'>
                        <Form.Label>Email</Form.Label>
                        <p className='tx-14'>{viewData?.email || "-"}</p>
                      </Col>
                      <Col xl={4} className='mb-2'>
                        <Form.Label>Address</Form.Label>
                        <p className='tx-14'>{viewData?.address || "-"}</p>
                      </Col>
                      <Col xl={4} className='mb-2'>
                        <Form.Label>Billing Frequency</Form.Label>
                        <p className='tx-14'>{viewData?.billingFrequency || "-"}</p>
                      </Col>
                      <Col xl={4} className='mb-2'>
                        <Form.Label>Interest Rate</Form.Label>
                        <p className='tx-14'>{viewData?.interestRate || "-"}%</p>
                      </Col>
                      <Col xl={4} className='mb-2'>
                        <Form.Label>Calculation Type</Form.Label>
                        <p className='tx-14'>{viewData?.calculationType || "-"}</p>
                      </Col>
                      <Col xl={12} className='mb-2'>
                        <Form.Label>Children Societies</Form.Label>
                        <p className='tx-14'>
                          {(viewData?.children || [])
                            .map((child: any) => child.societyIdentifier)
                            .join(", ") || "-"}
                        </p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>


              </Col>

              <Col xl={4}>
                {/* Banking Info */}
                <Card className='box-shadow border border-primary'>
                  <Card.Body>
                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Bank Details</h5>
                    <Row>
                      <Col xl={6} className='mb-2'>Bank Name</Col>
                      <Col xl={6} className='tx-semibold'>{viewData?.bankName || "-"}</Col>
                      <Col xl={6} className='mb-2'>Branch</Col>
                      <Col xl={6} className='tx-semibold'>{viewData?.branchName || "-"}</Col>
                      <Col xl={6} className='mb-2'>Account No.</Col>
                      <Col xl={6} className='tx-semibold'>{viewData?.accountNumber || "-"}</Col>
                      <Col xl={6} className='mb-2'>IFSC Code</Col>
                      <Col xl={6} className='tx-semibold'>{viewData?.ifscCode || "-"}</Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* GST and Tax Details */}
                <Card className='box-shadow border mt-3 border-primary'>
                  <Card.Body>
                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Tax Details</h5>
                    <Row>
                      <Col xl={6} className='mb-2'>GSTIN</Col>
                      <Col xl={6} className='tx-semibold'>{viewData?.gstin || "-"}</Col>
                      <Col xl={6} className='mb-2'>PAN</Col>
                      <Col xl={6} className='tx-semibold'>{viewData?.panNumber || "-"}</Col>
                      <Col xl={6} className='mb-2'>TAN</Col>
                      <Col xl={6} className='tx-semibold'>{viewData?.tanNumber || "-"}</Col>
                      <Col xl={6} className='mb-0'></Col>
                      <Col xl={6} className='tx-semibold'><br></br></Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col xl={12}>
                 {/* Committee Members Table */}
                 <Card className='box-shadow border border-primary'>
                  <Card.Body>
                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Committee Members</h5>
                    <div className='table-responsive'>
                      <table className='table table-bordered'>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Designation</th>
                            <th>Tower</th>
                            <th>Wing</th>
                            <th>Property</th>
                            <th>Application Types</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(viewData?.committeeMembers || []).map((member: any, idx: number) => (
                            <tr key={idx}>
                              <td>{member.fullName}</td>
                              <td>{member.contactNumber}</td>
                              <td>{member.designation}</td>
                              <td>{member.towerIdentifier}</td>
                              <td>{member.wingIdentifier}</td>
                              <td>{member.propertyIdentifier}</td>
                              <td>{(member.applicationType || []).join(", ")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

          </Modal.Body>
        </Modal>

      </Row>
      < CustomToastContainer />

    </Fragment >
  );
}
