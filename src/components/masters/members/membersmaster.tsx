
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import { Link } from "react-router-dom";
import { handleApiError } from '../../../helpers/handle-api-error';
import { getAllMemberOrTenantsApi } from '../../../api/user-api';

export default function MembersMaster() {


  type Row = {
    sno: number;
    memberIdentifier: string;
    memberName: string;
    memberType: string;
    mobileNumber: string;

  };


  const columns = [
    {
      name: 'S.No.',
      selector: (row: Row) => row.sno,
      sortable: true,

    },

    {
      name: 'Member Name',
      cell: (row: Row) => (
        <Link to={`${import.meta.env.BASE_URL}members/membersProfile`} className='text-info'>{row.memberName}</Link>
      ),
      sortable: true,
    },
    {
      name: 'Member Type',
      selector: (row: Row) => row.memberType,
      sortable: true,
    },
    {
      name: 'Mobile No.',
      selector: (row: Row) => row.mobileNumber,
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
            <Dropdown.Item>Edit</Dropdown.Item>
            <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ]
  const [memberData, setMemberData] = useState([])
  const tableData = {
    columns,
    data: memberData
  };



  useEffect(() => {
    const fetchAllProperty = async () => {
      try {
        const memberResponse = await getAllMemberOrTenantsApi()
        const memberData = memberResponse.data.data
        console.log(memberData)
        const formattedData = memberData.map((member: any, index: number) => (
          {
            sno: index + 1,
            memberName: `${member.firstName} ${member.lastName}`,
            memberType: member.role,
            mobileNumber: member.personMobilePhone
          }
        ));
        setMemberData(formattedData);
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
          <span className="main-content-title mg-b-0 mg-b-lg-1">Members Master</span>
        </div>

        <div className="right-content">
          <Link to={`${import.meta.env.BASE_URL}members/addmembers`} className="btn btn-primary p-1 pe-2 ps-2 me-1"><i className="bi bi-plus"></i> Add Member</Link>

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
                    data={memberData}
                    pagination
                    keyField="id"
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
