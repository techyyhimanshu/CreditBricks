
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import { getAllVendorApi } from '../../../api/vendor-api';
import { handleApiError } from '../../../helpers/handle-api-error';

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
    cell: () => <Dropdown>
      <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
        Action
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>,
  },
];


export default function VendorMaster() {
  const [vendorData, setVendordata] = useState<any>([]);

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
      }
    }
    fetchAllProperty();
  }, [])


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> Vendor Master</span>
        </div>
        <div className="right-content">
          <Link to={`${import.meta.env.BASE_URL}vendor/addvendormaster`} className='float-end btn btn-primary btn-sm'><i className="bi bi-plus"></i> Add Vendor</Link>


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


                  />
                </DataTableExtensions>
              </div>

            </Card.Body>
          </Card>

        </Col>

      </Row>


    </Fragment >
  );
}