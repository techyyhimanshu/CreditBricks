
import { Fragment, useEffect, useState } from 'react';
import { Modal, Button, Tab, Tabs } from "react-bootstrap";
// import { deleteUserApi, getAllUserApi } from '../../api/member-api';
import { CustomToastContainer, showToast } from '../../common/services/toastServices';
import "react-datepicker/dist/react-datepicker.css";
import PersonalInfo from './UserTabs/personalinfo-tab';
import Document from './UserTabs/document-tab';
import Properties from './UserTabs/properties-tab';
import Loan from './UserTabs/loan-tab';
import Parking from './UserTabs/parking-tab';
import Cookies from "js-cookie"
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import { deleteUserApi, getAllUserApi } from '../../api/user-api';
import { handleApiError } from '../../helpers/handle-api-error';
// const columns = [
//   {
//     name: 'First Name',
//     selector: row => row.Fname,
//     sortable: true,
//   },
//   {
//     name: 'Last Name',
//     selector: row => row.Lname,
//     sortable: true,
//   },
//   {
//     name: 'Mobile No',
//     selector: row => row.mobileno,
//     sortable: true,
//   },

//   {
//     name: 'Email Id',
//     selector: row => row.emailid,
//     sortable: true,
//   },
//   {
//     name: 'Status',
//     selector: row => row.status,
//     sortable: true,
//   },

//   {
//     name: 'Action',
//     sortable: true,
//     cell: () => <div><button type="button" className="btn btn-light btn-sm">Edit</button><button type="button" className="btn bg-info-transparent ms-2 btn-sm">Delete</button></div>,

//   },
// ];

// const data = [
//   {
//     id: 1,
//     Fname: 'Member',
//     Lname: 'Member',
//     mobileno: '',
//     emailid: '',
//     status: 'Active'


//   },
//   {
//     id: 2,
//     Fname: 'Member',
//     Lname: 'Member',
//     mobileno: '',
//     emailid: '',
//     status: 'Active'
//   },
//   {
//     id: 3,
//     Fname: 'Member',
//     Lname: 'Member',
//     mobileno: '',
//     emailid: '',
//     status: 'Active'
//   },
//   {
//     id: 4,
//     Fname: 'Member',
//     Lname: 'Member',
//     mobileno: '',
//     emailid: '',
//     status: 'Active'
//   },
//   {
//     id: 5,
//     Fname: 'Member',
//     Lname: 'Member',
//     mobileno: '',
//     emailid: '',
//     status: 'Active'
//   },
//   {
//     id: 6,
//     Fname: 'Member',
//     Lname: 'Member',
//     mobileno: '',
//     emailid: '',
//     status: 'Active'
//   },
//   {
//     id: 7,
//     Fname: 'Member',
//     Lname: 'Member',
//     mobileno: '',
//     emailid: '',
//     status: 'Active'
//   },
//   {
//     id: 8,
//     Fname: 'Member',
//     Lname: 'Member',
//     mobileno: '',
//     emailid: '',
//     status: 'Active'
//   },
// ]


export default function Users() {
  const [activeTab, setActiveTab] = useState("Personal")

  const [completedTabs, setCompletedTabs] = useState({
    Personal: false,
    Document: false,
    Properties: false,
    Loan: false,
    Parking: false
  });
  const [disabledTab, setDisabledTab] = useState({
    Personal: false,
    Document: true,
    Properties: true,
    Loan: true,
    Parking: true
  });
  const [users, setUsers] = useState<any[]>([])

  type Row = {
    username: number;
    sno: number;
    firstName: string;
    lastName: string;
    phone: string;
    personEmail: string;
    personBirthdate: string;
    personGenderIdentity: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    alternatePhone: string;
    anniversary: string;
    recordType: string;
    memberType: string;

  };

  const columns = [
    {
      name: 'S.No.',
      selector: (row: Row) => row.sno,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: (row: Row) => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: (row: Row) => row.lastName,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row: Row) => row.phone,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: Row) => row.personEmail,
      sortable: true,
    },

    {
      name: 'Action',
      sortable: true,
      cell: (row: Row) => (
        <div>
          <button type="button" className="btn btn-light btn-sm"
          //  onClick={() => openEditModal(row)}
          >Edit</button>
          <button type="button" className="btn bg-info-transparent ms-2 btn-sm"
            onClick={() => handleDelete(row)}
          >Delete</button>
        </div>
      ),
    },
  ]

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUserApi()
        const formattedData = response.data.data.map((member: any, index: number) => ({
          sno: index + 1,
          username: member.username,
          firstName: member.firstName,
          lastName: member.lastName,
          salutation: member.salutation,
          phone: member.phone,
          personEmail: member.personEmail,
          personBirthdate: member.personBirthdate,
          personGenderIdentity: member.personGenderIdentity,
          country: member.country,
          state: member.state,
          city: member.city,
          address: member.address,
          zipcode: member.zipCode
        }))
        setUsers(formattedData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers()
  }, [])

  const [select, setSelect] = useState(false);


  const tableData = {
    columns,
    data: users
  };
  // const openAddModal = () => {
  //   setIsEditing(false);
  //   currentUser.username = "";
  //   currentUser.firstName = "";
  //   currentUser.lastName = "";
  //   currentUser.personGenderIdentity = "";
  //   currentUser.personBirthdate = "";
  //   currentUser.personEmail = "";
  //   currentUser.phone = "";
  //   currentUser.country = "";
  //   currentUser.state = "";
  //   currentUser.city = "";
  //   currentUser.zipcode = "";
  //   setShowModal(true);
  // };

  // const openEditModal = (member: any) => {
  //   console.log(member.personBirthdate
  //   )
  //   console.log("USER", member)
  //   setIsEditing(true);
  //   setCurrentUser(member);
  //   setShowModal(true);
  // };
  const handleDelete = (data: any) => {
    console.log(data)
      ; (async () => {
        try {
          const response = await deleteUserApi(data.username)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // Remove the member from the table
            setUsers(prevData => prevData.filter(member => member.username !== data.username))
          }
        } catch (error: any) {
          const errorMessage = handleApiError(error)
          showToast("error", errorMessage)
        }
      })()
  }

  const viewDemoShow = (modal: any) => {
    switch (modal) {

      case "select":
        setSelect(true);
        break;


    }
  };

  const viewDemoClose = (modal: any) => {
    Cookies.remove('username')
    switch (modal) {

      case "select":
        setSelect(false);
        break;
    }
  };

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey); // Change the active tab
  };

  const renderFooter = (customFooter: React.ReactNode) => {
    return (
      <Modal.Footer>
        {customFooter}
      </Modal.Footer>
    );
  };


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Member Master</span>

        </div>

        <div className="right-content">


          <button type="button" className="btn btn-primary p-1 pe-2 ps-2 me-1" onClick={() => viewDemoShow("select")}><i className="bi bi-plus"></i> Add Member</button>
          <Modal show={select} onHide={() => { viewDemoClose("select"); }} centered size='xl' >
            <Modal.Header>
              <Modal.Title>Add Member</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("select"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body className='usertab pb-0'>
              <Tabs
                activeKey={activeTab || "Personal"}
                onSelect={(key: any) => setActiveTab(key)}
                id="uncontrolled-tab-example"
                className="panel-tabs main-nav-line bd-b-1"
                transition={false}
              >
                <Tab disabled={disabledTab.Personal} eventKey="Personal" title={
                  <>
                    Personal {completedTabs.Personal && <i className="bi bi-check-circle-fill"></i>}
                  </>
                } className='pt-1'>
                  <PersonalInfo setCompletedTabs={setCompletedTabs} handleTabChange={handleTabChange} setDisabledTab={setDisabledTab} renderFooter={renderFooter} />
                </Tab>

                <Tab disabled={disabledTab.Document} eventKey="Document" title={
                  <>
                    Document {completedTabs.Document && <i className="bi bi-check-circle-fill"></i>}
                  </>
                }>
                  <Document setCompletedTabs={setCompletedTabs} handleTabChange={handleTabChange} setDisabledTab={setDisabledTab} renderFooter={renderFooter} />
                </Tab>

                <Tab disabled={disabledTab.Properties} eventKey="Properties" title={
                  <>
                    Properties {completedTabs.Properties && <i className="bi bi-check-circle-fill"></i>}
                  </>
                } className='pt-2'>

                  <Properties setCompletedTabs={setCompletedTabs} handleTabChange={handleTabChange} setDisabledTab={setDisabledTab} renderFooter={renderFooter} />
                </Tab>

                <Tab disabled={disabledTab.Loan} eventKey="Loan" title={
                  <>
                    Loan {completedTabs.Loan && <i className="bi bi-check-circle-fill"></i>}
                  </>
                } className='pt-2'>
                  <Loan setCompletedTabs={setCompletedTabs} handleTabChange={handleTabChange} setDisabledTab={setDisabledTab} renderFooter={renderFooter} />
                </Tab>

                <Tab disabled={disabledTab.Parking} eventKey="Parking" title="Parking" className='pt-2'>
                  <Parking setCompletedTabs={setCompletedTabs} handleTabChange={handleTabChange} setDisabledTab={setDisabledTab} renderFooter={renderFooter} />

                </Tab>


              </Tabs>
            </Modal.Body>
            <CustomToastContainer />
          </Modal>

        </div>

      </div>
      <div
        className="table-responsive"
      >
        <DataTableExtensions {...tableData}>
          <DataTable
            columns={columns}
            data={users}
            fixedHeader
            highlightOnHover
            pagination
            keyField="id"
          />
        </DataTableExtensions>
      </div>
    </Fragment>
  )

}
