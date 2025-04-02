
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown, Modal, Button, Form } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import { deleteVendorApi, getAllVendorApi } from '../../../api/vendor-api';
import { handleApiError } from '../../../helpers/handle-api-error';
import { CustomToastContainer, showToast } from '../../../common/services/toastServices';
import TestLoader from '../../../layout/layoutcomponent/testloader';




export default function VendorMaster() {
  const [vendorData, setVendordata] = useState<any>([]);
  const [bulkupload, setbulkupload] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      name: 'S.no',
      selector: (row: any) => row.sno,
      sortable: true,
      width: '76px'
    },
    {
      name: 'Vendor Name',
      cell: (row: any) => <Link to={`${import.meta.env.BASE_URL}vendor/vendorview/${row.vendorIdentifier}`} className="text-info">{row.vendorName}</Link>,
      sortable: true,
    },
    {
      name: 'Product',
      selector: (row: any) => row.product,
      sortable: true,
    },

    {
      name: 'Service Type',
      selector: (row: any) => row.serviceType,
      sortable: true,
      width: "110px"
    },

    {
      name: 'Frequency',
      selector: (row: any) => row.frequency,
      sortable: true,
      width: "130px"
    },

    {
      name: 'Contact Person Name',
      selector: (row: any) => row.contactPersonName,
      sortable: true,
    },


    {
      name: 'Contact Person Number',
      selector: (row: any) => row.contactPersonNumber,
      sortable: true,
    },


    {
      name: 'Action',
      sortable: true,
      cell: (row: any) => <Dropdown>
        <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
          Action
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item><Link to={`${import.meta.env.BASE_URL}vendor/editvendor/${row.vendorIdentifier}`}>Edit</Link></Dropdown.Item>
          <Dropdown.Item className='text-danger' onClick={() => handleDelete(row)}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    },
  ];

  const tableData = {
    columns,
    data: vendorData
  };

  useEffect(() => {
    const fetchAllProperty = async () => {
      try {
        const response = await getAllVendorApi()
        const data = response.data.data
        const formattedData = data.map((property: any, index: number) => (
          {
            sno: index + 1,
            vendorName: property.vendorName,
            vendorAddress: property.vendorAddress,
            gstin: property.gstin,
            pan: property.pan,
            product: property.product,
            serviceType: property.serviceType,
            frequency: property.frequency,
            contractStartDate: property.contractStartDate,
            contractEndDate: property.contractEndDate,
            totalPeriodCalculation: property.totalPeriodCalculation,
            contactPersonName: property.contactPersonName,
            contactPersonNumber: property.contactPersonNumber,
            contactValue: property.contactValue,
            bankName: property.bankName,
            branchName: property.branchName,
            ifsc: property.ifsc,
            accountNumber: property.accountNumber,
            vendorIdentifier: property.vendorIdentifier,

          }
        ));
        setVendordata(formattedData);
      } catch (error) {
        console.log(error)
        handleApiError(error)
      } finally{
        setIsLoading(false)
      }
    }
    fetchAllProperty();
  }, [])

  const viewDemoShow = (modal: any) => {
    switch (modal) {

      case "bulkupload":
        setbulkupload(true);
        break;
      case "downloadFormat":
        setDownloadFormat(true);
        break;


    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {

      case "bulkupload":
        setbulkupload(false);
        break;
      case "downloadFormat":
        setDownloadFormat(false);
        break;

    }
  };

  const handleDelete = (row: any) => {
    ; (async () => {
      try {

        const response = await deleteVendorApi(row.vendorIdentifier)
        if (response.status === 200) {
          showToast("success", response.data.message)
          setVendordata((prevData: any) => prevData.filter((society: any) => society.vendorIdentifier !== row.vendorIdentifier))
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    })()
  }


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> Vendor Master</span>
        </div>
        <div className="right-content">
          <Link to={`${import.meta.env.BASE_URL}vendor/addvendormaster`} className="btn btn-primary p-1 pe-2 ps-2 me-1"><i className="bi bi-plus"></i> Add Vendor</Link>
          <button type="button" className="btn btn-default p-1 pe-2 ps-2 me-1" onClick={() => viewDemoShow("bulkupload")}><i className="bi bi-upload"></i> Bulk Upload</button>
          <button type="button" className="btn btn-default p-1 pe-2 ps-2 me-1" onClick={() => viewDemoShow("downloadFormat")}><i className="bi bi-download"></i> Download Format</button>

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

          <Modal centered show={downloadFormat}>
            <Modal.Header>
              <Modal.Title>Download Bulk Upload Format</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => viewDemoClose("downloadFormat")}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>
              <div>
                <p><strong>Instructions:</strong></p>
                <ul>
                  <li><strong>Download the Example File:</strong> Click the link provided to download the example CSV file.</li>
                  <li><strong>Prepare Your Data:</strong> Open the downloaded CSV file in a spreadsheet program (like Excel or Google Sheets) and enter your data, ensuring that each column corresponds to the appropriate header.</li>
                  <li><strong>Save the File:</strong> Save the spreadsheet as a CSV (Comma Separated Values) file.</li>
                  <li><strong>Upload the File:</strong> Navigate to the bulk upload section within the system and upload the prepared CSV file.</li>
                </ul>

                <Button variant="primary" >
                  Download File
                </Button>
              </div>
            </Modal.Body>
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
                    data={vendorData}
                    pagination
                    progressPending={isLoading}
                    progressComponent={<TestLoader />}


                  />
                </DataTableExtensions>
              </div>

            </Card.Body>
          </Card>

        </Col>

      </Row>
      < CustomToastContainer />

    </Fragment >
  );
}