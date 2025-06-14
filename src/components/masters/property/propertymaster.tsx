
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown, Modal, Button, Form } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import { Link, useLocation } from "react-router-dom";
import { deletePropertyApi, getAllPropertyApi } from '../../../api/property-api';
import { handleApiError } from '../../../helpers/handle-api-error';
import { showToast, CustomToastContainer } from '../../../common/services/toastServices';
import TestLoader from '../../../layout/layoutcomponent/testloader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/store/store';

export default function PropertyMaster() {
  const [bulkupload, setbulkupload] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
  const location = useLocation()
  const wingIdentifier = location.state ;
  const { society } = useSelector((state: RootState) => state.auth)

  type Row = {
    sno: number;
    propertyName: string;
    memberName: string;
    propertyIdentifier: string;
    societyIdentifier: string;
    memberIdentifier: string;
    societyName: string;
    flatRegistrationNumber: string;
    flatNumber: string;
    wingIdentifier: number;
    wingName: string;
    status: string;
    floorNumber: string;
    narration: string;
    monthlyRent: string;
    area: string;
    consumerElectricityNumber: string;
    gasConnectionNumber: string;
    intercomNumber: string;
    monthlyMaintenance: string;
    monthlyMaintenanceUpto: string;
    monthlyPaidArrears: string;
    monthlyPaidArrearsUpto: string;
    rentAggrementEndDate: string;
    rentAggrementStartDate: string;
    dateOfAgreement: string;
    dateOfRegistration: string;
    dealType: string;
  };

  const columns = [
    {
      name: 'S.No.',
      selector: (row: Row) => row.sno,
      sortable: true,

    },

    {
      name: 'Property Name',
      cell: (row: Row) => (
        <Link to={`${import.meta.env.BASE_URL}property/propertyview/${row.propertyIdentifier}`}
          state={{ propertyData: row }} className='text-info'>{row.propertyName}</Link>
      ),
      sortable: true,
    },
    {
      name: 'Member Name',
      cell: (row: Row) => (
        <Link to={`${import.meta.env.BASE_URL}members/membersProfile/${row.memberIdentifier}`} className='text-info'>{row.memberName}</Link>
      ),
      sortable: true,
    },
    {
      name: 'Society',
      cell: (row: Row) => (
        <Link to={`${import.meta.env.BASE_URL}society/societyview/${row.societyIdentifier}`} className='text-info'>{row.societyName}</Link>
      ),
      sortable: true,
    },
    {
      name: 'Flat No.',
      selector: (row: Row) => row.flatNumber,
      sortable: true,
    },
    {
      name: 'Wing',
      selector: (row: Row) => row.wingName,
      sortable: true,
    },

    {
      name: 'Action',
      sortable: true,
      cell: (row: Row) => (
        <Dropdown >
          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
            Action
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item><Link to={`${import.meta.env.BASE_URL}property/editpropertymaster/${row.propertyIdentifier}`}>Edit</Link></Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleDelete(row.propertyIdentifier)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ]
  const [propertydata, setPropertydata] = useState<any>([]);


  const tableData = {
    columns,
    data: propertydata
  };

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

  const handleDelete = async (propertyIdentifier: string) => {
    try {
      const response = await deletePropertyApi(propertyIdentifier)
      if (response.status === 200) {
        showToast("success", response.data.message)
        // Remove the society from the table
        setPropertydata(propertydata.filter((item: any) => item.propertyIdentifier !== propertyIdentifier));
      }
    } catch (error: any) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }



  useEffect(() => {
    const fetchAllProperty = async () => {
      try {
        let response;
        if(wingIdentifier){
          response = await getAllPropertyApi(wingIdentifier)
        }else{
          response = await getAllPropertyApi(undefined,society.value)
        }
        const data = response.data.data
        const formattedData = data.map((property: any, index: number) => (
          {
            sno: index + 1,
            propertyName: property.propertyName,
            propertyIdentifier: property.propertyIdentifier,
            memberName: property.propertyMembers.length > 0 ? property.propertyMembers[0].member.firstName + " " + property.propertyMembers[0].member.lastName : 'Not available',
            societyName: property.societyName,
            societyIdentifier: property.societyIdentifier,
            memberIdentifier: property.propertyMembers.length > 0 ? property.propertyMembers[0].memberIdentifier : "",
            flatRegistrationNumber: property.flatRegistrationNumber,
            flatNumber: property.flatNumber,
            wingName: property?.wing?.wingName || "",
            status: property.status,
            floorNumber: property.floorNumber,
            narration: property.narration,
            monthlyRent: property.monthlyRent,
            area: property.area,
            consumerElectricityNumber: property.consumerElectricityNumber,
            gasConnectionNumber: property.gasConnectionNumber,
            dateOfAgreement: property.dateOfAgreement,
            dateOfRegistration: property.dateOfRegistration,
            dealType: property.dealType,
            intercomNumber: property.intercomNumber,
            monthlyMaintenance: property.monthlyMaintenance,
            monthlyMaintenanceUpto: property.monthlyMaintenanceUpto,
            monthlyPaidArrears: property.monthlyPaidArrears,
            monthlyPaidArrearsUpto: property.monthlyPaidArrearsUpto,
            rentAggrementEndDate: property.rentAggrementEndDate,
            rentAggrementStartDate: property.rentAggrementStartDate,
            rentRegistrationId: property.rentRegistrationId
          }
        ));
        setPropertydata(formattedData);
      } catch (error) {
        console.log(error)
        handleApiError(error)
      } finally{
        setIsLoading(false)
      }
    }
    fetchAllProperty();
  }, [society])
  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Property Master</span>
        </div>

        <div className="right-content">
          <Link to={`${import.meta.env.BASE_URL}property/addpropertymaster`} className="btn btn-primary p-1 pe-2 ps-2 me-1"><i className="bi bi-plus"></i> Add Property</Link>
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
                    data={propertydata}
                    pagination
                    keyField="id"
                    progressPending={isLoading}
                    progressComponent={<TestLoader />}
                  />
                </DataTableExtensions>
              </div>



            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CustomToastContainer />
    </Fragment >
  );
}
