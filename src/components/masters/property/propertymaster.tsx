
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import { Link } from "react-router-dom";
import { deletePropertyApi, getAllPropertyApi } from '../../../api/property-api';
import { handleApiError } from '../../../helpers/handle-api-error';
import { showToast, CustomToastContainer } from '../../../common/services/toastServices';

export default function PropertyMaster() {

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
        const response = await getAllPropertyApi()
        const data = response.data.data
        const formattedData = data.map((property: any, index: number) => (
          {
            sno: index + 1,
            propertyName: property.propertyName,
            propertyIdentifier: property.propertyIdentifier,
            memberName: property.propertyMembers.length > 0 ? property.propertyMembers[0].member.firstName + " " + property.propertyMembers[0].member.lastName : 'Not available',
            societyName: property.societyName,
            societyIdentifier: property.societyIdentifier,
            memberIdentifier: property.propertyMembers.length > 0 ? property.propertyMembers[0].memberIdentifier:"",
            flatRegistrationNumber: property.flatRegistrationNumber,
            flatNumber: property.flatNumber,
            wingName: property?.wing?.wingName||"",
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
      }
    }
    fetchAllProperty();
  }, [])
  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Property Master</span>
        </div>

        <div className="right-content">
          <Link to={`${import.meta.env.BASE_URL}property/addpropertymaster`} className="btn btn-primary p-1 pe-2 ps-2 me-1"><i className="bi bi-plus"></i> Add Property</Link>

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
