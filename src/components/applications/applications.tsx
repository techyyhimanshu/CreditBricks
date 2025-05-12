
import { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Col, Row, Card, Button, Form, Dropdown, Modal, CardHeader, Tabs, Tab, InputGroup } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { showToast, CustomToastContainer } from '../../common/services/toastServices';
import { imagesData } from "../../common/commonimages";
import Accordion from 'react-bootstrap/Accordion';
import EventModal from '../../common/modals/eventModal';
import { createNewDocumentSubmissionApi, createNewEnquiryApi, createNewEventApi, createNewGatePassApi, createNewOtherApplicationApi, deleteApplicationApi, getAllApplicationApi, getApplicationDetailsApi, updateDocumentSubmissionApi, updateEnquiryApi, updateEventApi, updateGatePassApi, updateOtherApplicationApi } from '../../api/application-api';
import { handleApiError } from '../../helpers/handle-api-error';
import TestLoader from '../../layout/layoutcomponent/testloader';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import GatePassModal from '../../common/modals/gatePassModal';
import OtherApplicationModal from '../../common/modals/otherApplicationModal';
import { ViewGatePassData } from '../../common/services/database';


export default function Applications() {

  const [addapplication, setapplication] = useState(false);
  const [addgatepass, setaddgatepass] = useState(false);
  const [addchangeinname, setaddchangeinname] = useState(false);
  const [addcontactupdate, setaddcontactupdate] = useState(false);
  const [addparking, setaddparking] = useState(false);
  const [addflateresale, setaddflateresale] = useState(false);
  const [flateresaleuploadreciept, setflateresaleuploadreciept] = useState(false);
  const [Uploadloanclosure, setUploadloanclosure] = useState(false);
  const [addinteriorwork, setaddinteriorwork] = useState(false);
  const [addcelebration, setaddcelebration] = useState(false);
  const [addtheater, setaddtheater] = useState(false);
  const [addbanquethall, setaddbanquethall] = useState(false);
  const [addswimmingpool, setaddswimmingpool] = useState(false);
  const [addclubhouse, setaddclubhouse] = useState(false);
  const [addplayarea, setaddplayarea] = useState(false);
  const [addturfarea, setaddturfarea] = useState(false);
  const [addrentagreement, setaddrentagreement] = useState(false);
  const [addsharecerificate, setaddsharecerificate] = useState(false);

  const [termsconditionsview, settermsconditionsview] = useState(false);
  const [gatepassview, setgatepassview] = useState(false);
  const [celebrationview, setcelebrationview] = useState(false);
  const [banquethallview, setbanquethallview] = useState(false);
  const [clubhouseview, setclubhouseview] = useState(false);
  const [playareaview, setplayareaview] = useState(false);
  const [foodcourtview, setfoodcourtview] = useState(false);
  const [otherapplicationview, setotherapplicationview] = useState(false);
  const [addnomination, setaddnomination] = useState(false);
  const [addbadminton, setaddbadminton] = useState(false);
  const [addfoodcourt, setaddfoodcourt] = useState(false);
  const [applicationData, setApplicationData] = useState<any[]>([])
  const [addothers, setothers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [singleBanquetHallData, setSingleBanquetHallData] = useState(null);
  const [singleCelebrationData, setSingleCelebrationData] = useState(null);
  const [singleClubhouseData, setSingleClubhouseData] = useState(null);
  const [singlePlayAreaData, setSinglePlayAreaData] = useState(null);
  const [singleFoodCourtData, setSingleFoodCourtData] = useState(null);
  const [singleContactUpdateData, setSingleContactUpdateData] = useState(null);
  const [singleSwimmingPoolData, setSingleSwimmingPoolData] = useState(null);
  const [singleParkingData, setSingleParkingData] = useState(null);
  const [singleOthersData, setSingleOthersData] = useState(null);
  const [singleInteriorData, setSingleInteriorData] = useState(null);
  const [singleGatePassData, setSingleGatePassData] = useState(null);
  const [viewGatePassData, setViewGatePassData] = useState<ViewGatePassData | null>(null);
  const [singleChangeInNameData, setSingleChangeInNameData] = useState(null);
  const [singleFlatResaleData, setSingleFlatResaleData] = useState(null);

  const columns = [
    {
      name: 'S.No',
      selector: (row: any) => row.sno,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Application Id',
      cell: (row: any) => (
        <span className='text-info cursor' onClick={() => {
          fetchEventDetailsForView(row.id)
        }}
        >{row.id}</span>
      ),
      sortable: true,
    },
    {
      name: 'Property',
      cell: (row: any) => {
        return (
          <span>{row.propertyName}</span>
        )
      },
      sortable: true,
    },

    // {
    //   name: 'Member',
    //   selector: (row: any) => row.categoryName,
    //   sortable: true,
    // },
    {
      name: 'Society',
      selector: (row: any) => row.societyName,
      sortable: true,
    },
    {
      name: 'Application Category',
      selector: (row: any) => row.applicationType,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      sortable: true,
    },
    {
      name: 'Date & Time',
      selector: (row: any) => row.date,
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
              fetchEventDetails(row.id);
            }}>Edit</Dropdown.Item>

            <Dropdown.Item className='text-danger' onClick={() => handleDelete(row.id)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];

  const tableData = {
    columns,
    data: applicationData
  };

  useEffect(() => {
    fetchAllApplications();
  }, []);

  const fetchAllApplications = async () => {
    try {
      const response = await getAllApplicationApi()
      if (response.status === 200) {
        const formattedData = response.data.data.map((complaint: any, index: number) => {
          return {
            sno: index + 1,
            id: complaint?.applicationIdentifier || "",
            societyName: complaint?.societyName || "",
            propertyName: complaint?.propertyName || "",
            applicationType: complaint?.applicationType || "",
            status: complaint?.approvedStatus || "",
            date: `${complaint?.date}, ${complaint?.time}` || "",
            subCategory: complaint?.subCategory?.name || "",
          }
        })
        setApplicationData(formattedData);
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    } finally {
      setIsLoading(false)
    }
  }

  const fetchEventDetails = async (id: string) => {
    const prefix = id.split('-')[0];
    setIsLoading(true);

    try {
      const response = await getApplicationDetailsApi(id);

      if (response.status === 200) {
        const data = response.data.data;

        switch (prefix) {
          case "BH":
            setSingleBanquetHallData(data);
            viewDemoShow("addbanquethall");
            break;

          case "CB":
            setSingleCelebrationData(data);
            viewDemoShow("addcelebration");
            break;

          case "CH":
            setSingleClubhouseData(data);
            viewDemoShow("addclubhouse");
            break;

          case "PA":
            setSinglePlayAreaData(data);
            viewDemoShow("addplayarea");
            break;

          case "FC":
            setSingleFoodCourtData(data);
            viewDemoShow("addfoodcourt");
            break;

          case "CP":
            setSingleContactUpdateData(data);
            viewDemoShow("addcontactupdate");
            break;

          case "SW":
            setSingleSwimmingPoolData(data);
            viewDemoShow("addswimmingpool");
            break;

          case "PK":
            setSingleParkingData(data);
            viewDemoShow("addparking");
            break;

          case "OD":
          case "OE":
          case "OO":
            setSingleOthersData(data);
            viewDemoShow("addothers");
            break;

          case "IN":
            setSingleInteriorData(data);
            viewDemoShow("addinterior");
            break;

          case "GP":
            setSingleGatePassData(data);
            viewDemoShow("addgatepass");
            break;

          case "NC":
            setSingleChangeInNameData(data);
            viewDemoShow("addchangeinname");
            break;

          case "FR":
            setSingleFlatResaleData(data);
            viewDemoShow("addflatresale");
            break;

          default:
            console.warn(`Unhandled application type: ${prefix}`);
            break;
        }
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEventDetailsForView = async (id: string) => {
    const prefix = id.split('-')[0];
    setIsLoading(true);

    try {
      const response = await getApplicationDetailsApi(id);

      if (response.status === 200) {
        const data = response.data.data;

        switch (prefix) {
          case "BH":
            setSingleBanquetHallData(data);
            viewDemoShow("banquethallview");
            break;

          case "CB":
            setSingleCelebrationData(data);
            viewDemoShow("celebrationview");
            break;

          case "CH":
            setSingleClubhouseData(data);
            viewDemoShow("clubhouseview");
            break;

          case "PA":
            setSinglePlayAreaData(data);
            viewDemoShow("playareaview");
            break;

          case "FC":
            setSingleFoodCourtData(data);
            viewDemoShow("foodcourtview");
            break;

          case "CP":
            setSingleContactUpdateData(data);
            viewDemoShow("viewcontactupdate");
            break;

          case "SW":
            setSingleSwimmingPoolData(data);
            viewDemoShow("viewswimmingpool");
            break;

          case "PK":
            setSingleParkingData(data);
            viewDemoShow("viewparking");
            break;

          case "OD":
          case "OE":
          case "OO":
            setSingleOthersData(data);
            viewDemoShow("otherapplicationview");
            break;

          case "IN":
            setSingleInteriorData(data);
            viewDemoShow("viewinterior");
            break;

          case "GP":
            setViewGatePassData(data);
            viewDemoShow("gatepassview");
            break;

          case "NC":
            setSingleChangeInNameData(data);
            viewDemoShow("viewchangeinname");
            break;

          case "FR":
            setSingleFlatResaleData(data);
            viewDemoShow("viewflatresale");
            break;

          default:
            console.warn(`Unhandled application type: ${prefix}`);
            break;
        }
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  const handleEventSave = async (values: any, modal: string, editing: boolean) => {
    try {
      let response;
      const payload = { ...values };

      const eventIdentifier = payload.eventIdentifier;
      if (eventIdentifier) {
        delete payload.eventIdentifier;
      }
      if (editing) {
        response = await updateEventApi(payload, eventIdentifier || "")
      } else {
        response = await createNewEventApi(payload)
      }
      if (response.status === 200 || response.status === 201) {
        showToast("success", response.data.message)
        fetchAllApplications()
      }

    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    } finally {
      viewDemoClose(modal)
    }
  }
  const handleGatePassSave = async (values: any, editing: boolean) => {
    try {
      let response;
      if (editing) {
        response = await updateGatePassApi(values, values?.gatePassNumber || "")
      } else {
        response = await createNewGatePassApi(values)
      }
      if (response.status === 200 || response.status === 201) {
        showToast("success", response.data.message)
        fetchAllApplications()
      }

    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    } finally {
      viewDemoClose("addgatepass")
    }
  }
  const handleOtherApplicationSave = async (values: any, tab: string, editing: boolean) => {
    try {
      let response;

      if (tab === "documentSubmission") {
        if (editing) {
          response = await updateDocumentSubmissionApi(values, values.id);
        } else {
          response = await createNewDocumentSubmissionApi(values);
        }
      } else if (tab === "enquiry") {
        if (editing) {
          response = await updateEnquiryApi(values, values.id);
        } else {
          response = await createNewEnquiryApi(values);
        }

      } else if (tab === "other") {
        if (editing) {
          response = await updateOtherApplicationApi(values, values.id);
        } else {
          response = await createNewOtherApplicationApi(values);
        }
      } else {
        showToast("error", "Unknown tab selected");
      }
      if (response.status === 200 || response.status === 201) {
        showToast("success", response.data.message)
        fetchAllApplications()
      }

    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    } finally {
      viewDemoClose("addothers")
    }
  }

  const handleDelete = (id: string) => {
    ; (async () => {
      try {

        const response = await deleteApplicationApi(id)
        if (response.status === 200) {
          showToast("success", response.data.message)
          setApplicationData((prevData: any) => prevData.filter((society: any) => society.id !== id))
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    })()
  }

  const viewDemoShow = (modal: any) => {
    switch (modal) {

      case "addothers":
        setothers(true);
        setapplication(false);
        break;

      case "addfoodcourt":
        setaddfoodcourt(true);
        setapplication(false);
        break;

      case "addbadminton":
        setaddbadminton(true);
        setapplication(false);
        break;

      case "addnomination":
        setaddnomination(true);
        setapplication(false);
        break;

      case "gatepassview":
        setgatepassview(true);
        break;
      case "celebrationview":
        setcelebrationview(true);
        break;
      case "banquethallview":
        setbanquethallview(true);
        break;
      case "foodcourtview":
        setfoodcourtview(true);
        break;
      case "playareaview":
        setplayareaview(true);
        break;
      case "clubhouseview":
        setclubhouseview(true);
        break;

      case "otherapplicationview":
        setotherapplicationview(true);
        break;

      case "termsconditionsview":
        settermsconditionsview(true);
        break;

      case "addapplication":
        setapplication(true);
        break;

      case "addgatepass":
        setaddgatepass(true);
        setapplication(false);
        break;

      case "addchangeinname":
        setaddchangeinname(true);
        setapplication(false);
        break;

      case "addcontactupdate":
        setaddcontactupdate(true);
        setapplication(false);
        break;

      case "addparking":
        setaddparking(true);
        setapplication(false);
        break;

      case "addflateresale":
        setaddflateresale(true);
        setapplication(false);
        break;


      case "flateresaleuploadreciept": Uploadloanclosure
        setflateresaleuploadreciept(true);
        setapplication(false);
        break;

      case "Uploadloanclosure":
        setUploadloanclosure(true);
        setapplication(false);
        break;

      case "addinteriorwork":
        setaddinteriorwork(true);
        setapplication(false);
        break;

      case "addcelebration":
        setaddcelebration(true);
        setapplication(false);
        break;

      case "addtheater":
        setaddtheater(true);
        setapplication(false);
        break;

      case "addbanquethall":
        setaddbanquethall(true);
        setapplication(false);
        break;

      case "addswimmingpool":
        setaddswimmingpool(true);
        setapplication(false);
        break;

      case "addclubhouse":
        setaddclubhouse(true);
        setapplication(false);
        break;

      case "addplayarea":
        setaddplayarea(true);
        setapplication(false);
        break;

      case "addturfarea":
        setaddturfarea(true);
        setapplication(false);
        break;

      case "addrentagreement":
        setaddrentagreement(true);
        setapplication(false);
        break;

      case "addsharecerificate":
        setaddsharecerificate(true);
        setapplication(false);
        break;
    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {

      case "addothers":
        setothers(false);
        setSingleOthersData(null)
        break;

      case "addfoodcourt":
        setaddfoodcourt(false);
        setSingleFoodCourtData(null)
        break;

      case "addbadminton":
        setaddbadminton(false);
        break;

      case "addnomination":
        setaddnomination(false);
        break;

      case "gatepassview":
        setgatepassview(false);
        setViewGatePassData(null)
        break;

      case "celebrationview":
        setcelebrationview(false);
        setSingleCelebrationData(null)
        break;
      case "clubhouseview":
        setclubhouseview(false);
        setSingleClubhouseData(null)
        break;
      case "banquethallview":
        setbanquethallview(false);
        setSingleBanquetHallData(null)
        break;
      case "playareaview":
        setplayareaview(false);
        setSinglePlayAreaData(null)
        break;
      case "foodcourtview":
        setfoodcourtview(false);
        setSingleFoodCourtData(null)
        break;
      case "otherapplicationview":
        setotherapplicationview(false);
        setSingleOthersData(null)
        break;

      case "termsconditionsview":
        settermsconditionsview(false);
        break;

      case "addapplication":
        setapplication(false);
        break;

      case "addgatepass":
        setaddgatepass(false);
        setSingleGatePassData(null)
        break;

      case "addchangeinname":
        setaddchangeinname(false);
        break;

      case "addcontactupdate":
        setaddcontactupdate(false);
        break;

      case "addparking":
        setaddparking(false);
        break;


      case "addflateresale":
        setaddflateresale(false);
        break;

      case "flateresaleuploadreciept":
        setflateresaleuploadreciept(false);
        break;

      case "Uploadloanclosure":
        setUploadloanclosure(false);
        break;

      case "addinteriorwork":
        setaddinteriorwork(false);
        break;

      case "addcelebration":
        setaddcelebration(false);
        setSingleCelebrationData(null)
        break;

      case "addtheater":
        setaddtheater(false);
        break;

      case "addbanquethall":
        setaddbanquethall(false);
        setSingleBanquetHallData(null);
        break;

      case "addswimmingpool":
        setaddswimmingpool(false);
        break;

      case "addclubhouse":
        setaddclubhouse(false),
          setSingleClubhouseData(null);
        break;

      case "addplayarea":
        setaddplayarea(false);
        setSinglePlayAreaData(null)
        break;

      case "addturfarea":
        setaddturfarea(false);
        break;

      case "addrentagreement":
        setaddrentagreement(false);
        break;

      case "addsharecerificate":
        setaddsharecerificate(false);
        break;

    }
  };


  const showname = [
    { value: "1", label: "Show 1" },
    { value: "2", label: "Show 2" },
    { value: "3", label: "Show 3" },
  ]



  const duration = [
    { value: "1", label: "1hr" },
    { value: "2", label: "2hrs" },
    { value: "3", label: "3hrs" },
  ]


  const medicaldiseases = [
    { value: "1", label: "Yes" },
    { value: "2", label: "No" },
  ]

  const gender = [
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
  ]


  const status = [
    { value: "", label: "All" },
    { value: "In-Progress", label: "In-Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Completed", label: "Completed" },
  ]

  const property = [
    { value: "1", label: "A101" },
    { value: "2", label: "A102" },

  ];

  const member = [
    { value: "1", label: "Test Member 1" },
    { value: "2", label: "Test Member 2" },

  ];

  const applicationtype = [
    { value: "1", label: "All" },
    { value: "2", label: "Gate Pass" },
    { value: "3", label: "Change In Name" },
    { value: "4", label: "Contact Update" },
    { value: "5", label: "Parking" },
    { value: "6", label: "Flat Resale" },
    { value: "7", label: "Interior Work" },
    { value: "8", label: "Celebration" },
    { value: "9", label: "Theater" },
    { value: "10", label: "Banquet Hall" },
    { value: "11", label: "Club House" },
    { value: "12", label: "Swimming Pool" },
    { value: "13", label: "Play Area" },
    { value: "14", label: "Turf Area" },
    { value: "15", label: "Rent Agreement" },
    { value: "16", label: "Share Certificate" },
    { value: "17", label: "Nomination" },
    { value: "18", label: "Badminton Count" },
    { value: "19", label: "Food Court" },
    { value: "20", label: "Others" },
  ]

  const society = [
    { value: "1", label: "Mohan Areca Co-Op Housing Society Limited" },
    { value: "2", label: "SKA MetroVilla Society Limited" },
  ]

  const relation = [
    { value: "1", label: "Self" },
    { value: "2", label: "Spouse" },
    { value: "3", label: "Son" },
    { value: "4", label: "Daughter" },
    { value: "5", label: "Father" },
    { value: "6", label: "Mother" },
    { value: "7", label: "Brother" },
    { value: "8", label: "Sister" },
    { value: "9", label: "Self" },
    { value: "10", label: "In Laws" },
    { value: "11", label: "Self" },
    { value: "12", label: "Distant Relative" },
    { value: "13", label: "Self" },
    { value: "14", label: "Friend" },
  ]

  const vehicletype = [
    { value: "1", label: "2W" },
    { value: "2", label: "4W" },
    { value: "3", label: "Tempo" },
    { value: "4", label: "3W" },
    { value: "5", label: "Mini Van" },
    { value: "6", label: "Voivo" },
  ]

  const worktype = [
    { value: "1", label: "Extension" },
    { value: "2", label: "Leakage" },
    { value: "3", label: "Fabrication" },
    { value: "4", label: "Electrical" },
  ]

  const interiorcategory = [
    { value: "1", label: "Living Room" },
    { value: "2", label: "Kitchen" },
    { value: "3", label: "Bedroom" },
    { value: "4", label: "Master Bedroom" },
    { value: "5", label: "Bathroom" },
    { value: "6", label: "Dry Area" },
    { value: "7", label: "Balcony" },
    { value: "8", label: "Open Terrace" },
    { value: "9", label: "Lawn" },

  ]

  const sportactivity = [
    { value: "1", label: "Football" },
    { value: "2", label: "Cricket" },
    { value: "3", label: "Hockey" },
    { value: "2", label: "Badminton" },
    { value: "3", label: "Volley Ball" },
    { value: "2", label: "Basketball" },
    { value: "3", label: "Other" },
  ]

  const flattype = [
    { value: "1", label: "1BHK" },
    { value: "2", label: "2BHK" },

  ];

  const handleBanquetClose = () => {
    viewDemoClose("addbanquethall");
  }
  const handleGatePassClose = () => {
    viewDemoClose("addgatepass");
  }
  const handleClubHouseClose = () => {
    viewDemoClose("addclubhouse");
  }
  const handleFoodCourtClose = () => {
    viewDemoClose("addfoodcourt");
  }
  const handleOtherApplicationClose = () => {
    viewDemoClose("addothers");
    setSingleOthersData(null)
  }
  const handlePlayAreaClose = () => {
    viewDemoClose("addplayarea");
  }
  const handleCelebrationClose = () => {
    viewDemoClose("addcelebration");
  }
  const handleCelebrationViewClose = () => {
    viewDemoClose("celebrationview");
  }
  const handleClubHouseViewClose = () => {
    viewDemoClose("clubhouseview");
  }
  const handleBanquetHallViewClose = () => {
    viewDemoClose("banquethallview");
  }
  const handleFoodCourtViewClose = () => {
    viewDemoClose("foodcourtview");
  }
  const handlePlayAreaViewClose = () => {
    viewDemoClose("playareaview");
  }
  const handleOtherApplicationViewClose = () => {
    viewDemoClose("otherapplicationview");
  }


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> Applications</span>
        </div>
        <div className="right-content">
          <span className='float-end btn btn-primary p-1 pe-2 ps-2 me-1' onClick={() => { viewDemoShow("addapplication"); }}><i className="bi bi-plus"></i> Add Applications</span>

          {/* Add Application Modal   */}

          <Modal show={addapplication} size="lg" centered>
            <Modal.Header>
              <Modal.Title>Applications</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addapplication"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addgatepass"); }}>
                    <img alt="" src={imagesData('gatepass')} />
                    <p>  Gate Pass</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox selected' onClick={() => { viewDemoShow("addchangeinname"); }}>
                    <img alt="" src={imagesData('changename')} />
                    <p>  Change In Name</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addcontactupdate"); }}>
                    <img alt="" src={imagesData('conatctupdate')} />
                    <p> Contact Update</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addparking"); }}>
                    <img alt="" src={imagesData('parking')} />
                    <p> Parking</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addflateresale"); }}>
                    <img alt="" src={imagesData('flatresale')} />
                    <p>Flat Resale</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addinteriorwork"); }}>
                    <img alt="" src={imagesData('interiorwork')} />
                    <p>Interior Work</p>
                  </div>
                </Col>


                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addcelebration"); }}>
                    <img alt="" src={imagesData('celebration')} />
                    <p> Celebration</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addtheater"); }}>
                    <img alt="" src={imagesData('theater')} />
                    <p>Theater</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addbanquethall"); }}>
                    <img alt="" src={imagesData('banquethall')} />
                    <p>Banquet Hall</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addclubhouse"); }}>
                    <img alt="" src={imagesData('clubhouse')} />
                    <p>Club House</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addswimmingpool"); }}>
                    <img alt="" src={imagesData('swimmingpool')} />
                    <p> Swimming Pool</p>
                  </div>
                </Col>
                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addplayarea"); }}>
                    <img alt="" src={imagesData('playarea')} />
                    <p> Play Area</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addturfarea"); }}>
                    <img alt="" src={imagesData('turfarea')} />
                    <p>Turf Area</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addrentagreement"); }}>
                    <img alt="" src={imagesData('rentagreement')} />
                    <p>Rent Agreement</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addsharecerificate"); }}>
                    <img alt="" src={imagesData('sharecertificate')} />
                    <p> Share Certificate</p>
                  </div>
                </Col>
                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow('addnomination'); }}>
                    <img alt="" src={imagesData('nomination')} />
                    <p> Nomination</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow('addbadminton'); }}>
                    <img alt="" src={imagesData('badminton')} />
                    <p>Badminton Court</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow('addfoodcourt'); }}>
                    <img alt="" src={imagesData('foodcourt')} />
                    <p>Food Court</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow('addothers'); }}>
                    <img alt="" src={imagesData('others')} />
                    <p> Others</p>
                  </div>
                </Col>


              </Row>
            </Modal.Body>

          </Modal>

          {
            addgatepass && (singleGatePassData ? <GatePassModal show={addgatepass} initialVals={singleGatePassData} onSave={handleGatePassSave} onClose={handleGatePassClose} editing={true} /> : <GatePassModal show={addgatepass} onSave={handleGatePassSave} onClose={handleGatePassClose} editing={false} />)
          }

          {/* gate pass view modal */}
          <Modal show={gatepassview} size='xl' centered>
            <Modal.Header>
              <Modal.Title>Gate Pass Details</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("gatepassview"); }}>
                x
              </Button>
            </Modal.Header>

            {/* <Modal.Body>
              <Tabs
                defaultActiveKey="Tab 01"
                id="uncontrolled-tab-example"
                className="panel-tabs main-nav-line bd-b-1"
                transition={false}
              >

                <Tab eventKey="Tab 01" title="Details">
                  <Row>
                    <Col xl={8}>
                      <Card className='box-shadow border mt-3 border-primary'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Basic Information</h5>
                          <Row>
                            <Col xl={12} className='mb-2'>
                              <Form.Label>Society</Form.Label>
                              <Link to={`${import.meta.env.BASE_URL}society/societyview`} className='tx-14 text-info'>Credit Bricks PVt Ltd</Link>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Property</Form.Label>
                              <Link to={`${import.meta.env.BASE_URL}property/propertyview`} className='tx-14 text-info'>A101</Link>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Gate Type</Form.Label>
                              <p className='tx-14'>Inward</p>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Member</Form.Label>
                              <p className='tx-14'>Test Member 1</p>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Category</Form.Label>
                              <p className='tx-14 col-sm-11 p-0'>Tenant</p>
                            </Col>
                            <Col xl={4} className='mb-2'>
                              <Form.Label>Sub Category</Form.Label>
                              <p className='tx-14 col-sm-11 p-0'>Tenant Shifting In</p>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Tenant Name</Form.Label>
                              <p className='tx-14 col-sm-11 p-0'>Ajay Sharma</p>
                            </Col>




                            <Col xl={4} className='mb-2'>
                              <Form.Label>Gate Pass Number</Form.Label>
                              <p className='tx-14'>-</p>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Entry Date & Time</Form.Label>
                              <p className='tx-14 col-sm-11 p-0'>10/21/2023, 12:00 PM</p>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Exit Date & Time</Form.Label>
                              <p className='tx-14'>10/23/2023, 12:00 PM </p>
                            </Col>

                          </Row>
                        </Card.Body>
                      </Card>

                      <Card className='box-shadow border border-primary mb-2'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Approval Details</h5>

                          <table className='table mt-3'>
                            <thead>
                              <tr>
                                <th>Society</th>
                                <th>Tower</th>
                                <th>Wing</th>
                                <th>Flat </th>
                                <th>Approver</th>
                                <th>Designation</th>
                                <th>Application Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className='align-top'>-</td>
                                <td className='align-top'>Tower A</td>
                                <td className='align-top'>A</td>
                                <td className='align-top'>123</td>
                                <td>Sandeep Singh<br /><span className='text-muted'>9876543212</span></td>
                                <td className='align-top'>Secretary</td>
                                <td className='align-top'>Flat Resale</td>
                              </tr>


                            </tbody>
                          </table>

                        </Card.Body>
                      </Card>

                      <p className='ps-2'>Powered by <strong>CreditBricks</strong></p>
                    </Col>

                    <Col xl={4}>
                      <Card className='box-shadow border mt-3 border-primary'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Vehicle and Driver Details</h5>
                          <Row>
                            <Col xl={5} className='mb-1 tx-12'>Driver Name</Col>
                            <Col xl={7} className='tx-semibold tx-14'>Rakesh Kumar</Col>
                            <Col xl={5} className='mb-1 tx-12'>Driver Contact </Col>
                            <Col xl={7} className='tx-semibold tx-12'>9876543212</Col>
                            <Col xl={5} className='mb-1 tx-12'>Vehicle Number</Col>
                            <Col xl={7} className='tx-semibold tx-12'>HR4A7986</Col>
                            <Col xl={5} className='mb-1 tx-12'>Vehicle Model</Col>
                            <Col xl={7} className='tx-semibold tx-12'>-</Col>
                            <Col xl={5} className='mb-1 tx-12'>Vehicle Nature</Col>
                            <Col xl={7} className='tx-semibold tx-12'>Visitor Parking</Col>
                            <Col xl={5} className='mb-1 tx-12'>Vehicle Type</Col>
                            <Col xl={7} className='tx-semibold tx-12'>SUV</Col>
                          </Row>
                        </Card.Body>
                      </Card>

                      <Card className='box-shadow border border-primary'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Contact Person Details</h5>
                          <Row>
                            <Col xl={5} className='mb-1 tx-12'>Contact Person</Col>
                            <Col xl={7} className='tx-semibold tx-14'>Anisha Bansal</Col>
                            <Col xl={5} className='mb-1 tx-12'>Contact Number </Col>
                            <Col xl={7} className='tx-semibold tx-12'>8800654786</Col>
                            <Col xl={5} className='mb-1 tx-12'>Remarks</Col>
                            <Col xl={7} className='tx-semibold tx-12'>-</Col>

                          </Row>
                        </Card.Body>
                      </Card>


                      <Card className='box-shadow border border-primary'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Application Description</h5>
                          <Row>
                            <Col xl={12} className='mb-1 tx-12'>Purpose</Col>
                            <Col xl={12} className='tx-semibold tx-14'>-</Col>
                            <Col xl={12} className='mb-1 tx-12'>Description </Col>
                            <Col xl={12} className='tx-semibold tx-12'>-</Col>

                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>

                  </Row>
                </Tab>
                <Tab eventKey="ApprovalHistory" title="Approval History">

                  <div className="table-responsive min-height500">
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th>Step Name</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>	Assigned To</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Approval level 2</td>
                          <td>4/21/2023, 3:06 PM</td>
                          <td>Rejected</td>
                          <td>	Sarjerao Shinde</td>
                        </tr>

                        <tr>
                          <td>Approval level 1</td>
                          <td>4/21/2023, 3:02 PM</td>
                          <td>Approved</td>
                          <td>System Admin</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Tab>


              </Tabs>


            </Modal.Body> */}
            <Modal.Body>
              <Tabs
                defaultActiveKey="Tab 01"
                id="uncontrolled-tab-example"
                className="panel-tabs main-nav-line bd-b-1"
                transition={false}
              >

                <Tab eventKey="Tab 01" title="Details">
                  <Row>
                    <Col xl={8}>
                      <Card className='box-shadow border mt-3 border-primary'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Basic Information</h5>
                          <Row>
                            <Col xl={12} className='mb-2'>
                              <Form.Label>Society</Form.Label>
                              <Link to={`${import.meta.env.BASE_URL}society/societyview`} className='tx-14 text-info'>{viewGatePassData?.societyIdentifier || ""}</Link>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Property</Form.Label>
                              <Link to={`${import.meta.env.BASE_URL}property/propertyview`} className='tx-14 text-info'>{viewGatePassData?.propertyIdentifier || ""}</Link>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Gate Type</Form.Label>
                              <p className='tx-14'>{viewGatePassData?.gateType || ""}</p>
                            </Col>
                            <Col xl={4} className='mb-2'>
                              <Form.Label>Category</Form.Label>
                              <p className='tx-14 col-sm-11 p-0'>{viewGatePassData?.category || ""}</p>
                            </Col>
                            <Col xl={4} className='mb-2'>
                              <Form.Label>Tenant Name</Form.Label>
                              <p className='tx-14 col-sm-11 p-0'>{viewGatePassData?.tenantName || ""}</p>
                            </Col>
                            <Col xl={4} className='mb-2'>
                              <Form.Label>Sub Category</Form.Label>
                              <p className='tx-14 col-sm-11 p-0'>{viewGatePassData?.subCategory || ""}</p>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Member</Form.Label>
                              <p className='tx-14'>{viewGatePassData?.userIdentifier || ""}</p>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Gate Pass Number</Form.Label>
                              <p className='tx-14'>{viewGatePassData?.gatePassNumber || ""}</p>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Entry Date & Time</Form.Label>
                              <p className='tx-14 col-sm-11 p-0'>{viewGatePassData?.entryTime || ""}</p>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Exit Date & Time</Form.Label>
                              <p className='tx-14'>{viewGatePassData?.exitTime || ""}</p>
                            </Col>

                          </Row>
                        </Card.Body>
                      </Card>

                      <Card className='box-shadow border border-primary'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Approval Details</h5>

                          <table className='table mt-3'>
                            <thead>
                              <tr>
                                <th>Society</th>
                                <th>Tower</th>
                                <th>Wing</th>
                                <th>Flat </th>
                                <th>Approver</th>
                                <th>Designation</th>
                                <th>Application Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className='align-top'>-</td>
                                <td className='align-top'>Tower A</td>
                                <td className='align-top'>A</td>
                                <td className='align-top'>123</td>
                                <td>Sandeep Singh<br /><span className='text-muted'>9876543212</span></td>
                                <td className='align-top'>Secretary</td>
                                <td className='align-top'>Flat Resale</td>
                              </tr>


                            </tbody>
                          </table>

                        </Card.Body>
                      </Card>
                    </Col>

                    <Col xl={4}>
                      <Card className='box-shadow border mt-3 border-primary'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Vehicle and Driver Details</h5>
                          <Row>
                            <Col xl={5} className='mb-1 tx-12'>Driver Name</Col>
                            <Col xl={7} className='tx-semibold tx-14'>{viewGatePassData?.driverName || ""}</Col>
                            <Col xl={5} className='mb-1 tx-12'>Driver Contact </Col>
                            <Col xl={7} className='tx-semibold tx-12'>{viewGatePassData?.driverMobileNumber || ""}</Col>
                            <Col xl={5} className='mb-1 tx-12'>Vehicle Number</Col>
                            <Col xl={7} className='tx-semibold tx-12'>{viewGatePassData?.vehicleNumber || ""}</Col>
                            <Col xl={5} className='mb-1 tx-12'>Vehicle Model</Col>
                            <Col xl={7} className='tx-semibold tx-12'>{viewGatePassData?.vehicleModel || ""}</Col>
                            <Col xl={5} className='mb-1 tx-12'>Vehicle Nature</Col>
                            <Col xl={7} className='tx-semibold tx-12'>{viewGatePassData?.vehicleNature || ""}</Col>
                            <Col xl={5} className='mb-1 tx-12'>Vehicle Type</Col>
                            <Col xl={7} className='tx-semibold tx-12'>{viewGatePassData?.vehicleType || ""}</Col>
                          </Row>
                        </Card.Body>
                      </Card>

                      <Card className='box-shadow border border-primary'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Contact Person Details</h5>
                          <Row>
                            <Col xl={5} className='mb-1 tx-12'>Contact Person</Col>
                            <Col xl={7} className='tx-semibold tx-14'>{viewGatePassData?.contactPersonName || ""}</Col>
                            <Col xl={5} className='mb-1 tx-12'>Contact Number </Col>
                            <Col xl={7} className='tx-semibold tx-12'>{viewGatePassData?.contactPersonNumber || ""}</Col>
                            <Col xl={5} className='mb-1 tx-12'>Remarks</Col>
                            <Col xl={7} className='tx-semibold tx-12'>{viewGatePassData?.remarks || ""}</Col>

                          </Row>
                        </Card.Body>
                      </Card>


                      <Card className='box-shadow border border-primary'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Application Description</h5>
                          <Row>
                            <Col xl={12} className='mb-1 tx-12'>Purpose</Col>
                            <Col xl={12} className='tx-semibold tx-14'>{viewGatePassData?.purpose || ""}</Col>
                            <Col xl={12} className='mb-1 tx-12'>Description </Col>
                            <Col xl={12} className='tx-semibold tx-12'>{viewGatePassData?.description || ""}</Col>

                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>

                  </Row>
                </Tab>
                <Tab eventKey="ApprovalHistory" title="Approval History">

                  <div className="table-responsive min-height500">
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th>Step Name</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>	Assigned To</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Approval level 2</td>
                          <td>4/21/2023, 3:06 PM</td>
                          <td>Rejected</td>
                          <td>	Sarjerao Shinde</td>
                        </tr>

                        <tr>
                          <td>Approval level 1</td>
                          <td>4/21/2023, 3:02 PM</td>
                          <td>Approved</td>
                          <td>System Admin</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Tab>


              </Tabs>


            </Modal.Body>
          </Modal>

          {/* Terms & condition modal */}
          <Modal show={termsconditionsview} centered>
            <Modal.Header>
              <Modal.Title>Terms & Conditions</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("termsconditionsview"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Col xl={12} className='mb-1 tx-12 text-justify'><ol className='ps-2'><li className='mb-1'>Interest will be charged at 1.75% p.m. after the due date.</li>
                <li className='mb-1'>The cheque should be drawn in favor of CreditBricks Society. </li>
                <li className='mb-1'>No claim in respect of this bill will be entertained unless notified in writing within 10 days from the date of this bill.</li>
                <li className='mb-1'>If the dues are not cleared within 90 days, then the member shall be termed as a defaulter, and appropriate action will be taken by the society against the defaulters as per the Bylaws</li>
                <li className='mb-1'>In case of no response on the payment for a prolonged period the membership from the society can be terminated and expulsion procedure can be initiated.</li> <li>The penalty charges do not create any right in your favor.</li>
                <li className='mb-1'>Society reserves the right to enhance the penalty in case of continuing default and misuse.</li></ol></Col>

            </Modal.Body>
          </Modal>



          {/* Add Change In Name */}
          <Modal show={addchangeinname} centered size='lg'>
            <Modal.Header>
              <Modal.Title>Change In Name</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addchangeinname"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xl="6">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society </Form.Label>
                    <Select
                      options={society}
                      placeholder="Select society"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="6">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property </Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl="12">
                  <table className='table border mt-3 bg-white'>
                    <thead>
                      <tr>
                        <th>Owner Type</th>
                        <th>Old Name</th>
                        <th>New Name</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Owner</td>
                        <td>Suneel Singh</td>
                        <td>
                          <Form.Control
                            type="text"
                            disabled
                            placeholder="New Name"
                            className="form-control"
                          ></Form.Control></td>
                        <td><i className='bi bi-pencil text-primary cursor'></i></td>
                      </tr>

                      <tr>
                        <td>Co-Owner</td>
                        <td>Vishal Singh</td>
                        <td>
                          <Form.Control
                            type="text"
                            disabled
                            placeholder="New Name"
                            className="form-control"
                          ></Form.Control></td>
                        <td><i className='bi bi-pencil text-primary cursor'></i></td>
                      </tr>

                    </tbody>
                  </table>
                </Col>

              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addchangeinname"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addchangeinname"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Contact Update */}
          <Modal show={addcontactupdate} size="lg" centered>
            <Modal.Header>
              <Modal.Title>Contact Update</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addcontactupdate"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society </Form.Label>
                    <Select
                      options={society}
                      placeholder="Select Society"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property </Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>
                <Col xl="6">
                  <Form.Group className="form-group">
                    <Form.Label>Member Name</Form.Label>

                    <Select
                      options={member}
                      placeholder="Select member"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl="6">
                  <Form.Group className="form-group">
                    <Form.Label>Old Number </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Old Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl="6"></Col>
                <hr className='w-100 m-0' />
                <Col xl="6">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>New Number </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="New Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Contact Person Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    ></Form.Control>

                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Relation</Form.Label>
                    <Select
                      options={relation}
                      placeholder="Select relation"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl="6"></Col>
                <hr className='w-100 m-0' />
                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Alternative Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Contact Person Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Relation</Form.Label>
                    <Select
                      options={relation}
                      placeholder="Select relation"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <hr className='w-100 m-0' />
                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addcontactupdate"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addcontactupdate"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>


          {/* Add Parking */}
          <Modal show={addparking} size="xl" centered>
            <Modal.Header>
              <Modal.Title>Parking</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addparking"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society </Form.Label>
                    <Select
                      options={society}
                      placeholder="Select Society"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property </Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>
                <Col xl="4">
                  <Form.Group className="form-group">
                    <Form.Label>Vehicle Type </Form.Label>
                    <Select
                      options={vehicletype}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="4">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vehicle Registration Number </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>RC Issue Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="dd/mm/yyy"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>RC Expiry Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="dd/mm/yyy"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vehicle RC Copy <small className='text-muted float-end'>Upload size : Max 2MB</small></Form.Label>
                    <Form.Control
                      type="file"
                      placeholder=""
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vehicle Owner Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Relation</Form.Label>
                    <Select
                      options={relation}
                      placeholder="Select relation"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={12}>
                  <Form.Group className="form-group float-end">
                    <Button type="button" className='btn btn-default'>+ Add More Vehicle</Button>
                  </Form.Group>
                </Col>

                <Col xl="12">
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Vehicle Type</th>
                        <th>Registration Number</th>
                        <th>Rc Issue Dt</th>
                        <th>RC Expiry Dt</th>
                        <th>RC Copy</th>
                        <th>Owner Name</th>
                        <th>Relation</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2W</td>
                        <td></td>
                        <td>12/12/2020</td>
                        <td>12/122030</td>
                        <td><img alt="" src={imagesData('pdficon')} className='wd-50' /></td>
                        <td>Maahi Sharma</td>
                        <th>Self</th>
                        <td><i className='fa fa-trash text-danger cursor'></i></td>
                      </tr>
                    </tbody>
                  </table>
                </Col>

              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addparking"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addparking"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Flat Resale */}
          <Modal show={addflateresale} size="xl" centered>
            <Modal.Header>
              <Modal.Title>Flat Resale</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addflateresale"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='bg-light'>
              <Row>
                <Col xl={5}>
                  <Col xl={12} className='bg-white p-3 border rounded-3'>
                    <Row>
                      <Col xl={12}>
                        <p className='mb-2 tx-bold'>To share your payment receipt, kindly click on the "Yes" option</p>
                        <hr className='w-100 m-0' />
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Share Transfer Documents Submitted</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="transferdocument" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="transferdocument" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="transferdocument" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Do you currently process the original share certificate?</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="proccesscertificate" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="proccesscertificate" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="proccesscertificate" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Is there an existing home loan on your property?</Form.Label>
                          <Row>
                            <Col lg={3} >

                              <Form.Check type="radio" label="Yes" name="existinghomeloanproperty" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="existinghomeloanproperty" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="existinghomeloanproperty" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Have you fully settled your home loan?</Form.Label>
                          <Row>
                            <Col lg={3} >

                              <Form.Check type="radio" label="Yes" name="fullysettledhomeloan" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="fullysettledhomeloan" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="fullysettledhomeloan" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>


                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Share Transfer Premium Paid</Form.Label>
                          <Row>
                            <Col lg={3} >

                              <Form.Check type="radio" label="Yes" name="transferpremiumpaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="transferpremiumpaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="transferpremiumpaid" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>


                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Share Transfer Fees Paid</Form.Label>
                          <Row>
                            <Col lg={3} >

                              <Form.Check type="radio" label="Yes" name="transferfeespaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="transferfeespaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="transferfeespaid" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>


                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Membership Fee Paid</Form.Label>
                          <Row>
                            <Col lg={3} >

                              <Form.Check type="radio" label="Yes" name="membershipfeepaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="membershipfeepaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="membershipfeepaid" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Entrance Fee Paid</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="entrancefeepaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="entrancefeepaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="entrancefeepaid" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>


                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Other Charges Paid</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="otherchargepaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="otherchargepaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="otherchargepaid" />
                            </Col>
                            <Col xl={12} className='pt-2'>
                              <Form.Control
                                type="text"
                                placeholder="Other Charges"
                                className="form-control"
                              ></Form.Control>
                            </Col>
                          </Row>

                        </Form.Group>
                      </Col>


                    </Row>
                  </Col>
                </Col>

                <Col xl={7}>
                  <Col xl={12} className='bg-white p-3 border rounded-3'>
                    <Row>
                      <Col xl={12}>
                        <p className='mb-2 tx-bold'>Documents</p>
                        <hr className='w-100 m-0' />
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Sale Agreement Copy</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="transferdocument" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="transferdocument" />
                            </Col>
                            <Col lg={6}>
                              <small className='text-muted float-end'>Size : Max 2MB</small>
                            </Col>
                            <Col xl={12} className='mt-1'>
                              <Form.Control
                                type="file"
                                placeholder=""
                                className="form-control"
                              ></Form.Control>
                            </Col>

                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Flat Registration Certificate</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="transferdocument" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="transferdocument" />
                            </Col>
                            <Col lg={6}>
                              <small className='text-muted float-end'>Size : Max 2MB</small>
                            </Col>
                            <Col xl={12} className='mt-1'>
                              <Form.Control
                                type="file"
                                placeholder=""
                                className="form-control"
                              ></Form.Control>
                            </Col>

                          </Row>
                        </Form.Group>
                      </Col>


                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Home Loan Sanction Letter</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="transferdocument" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="transferdocument" />
                            </Col>
                            <Col lg={6}>
                              <small className='text-muted float-end'>Size : Max 2MB</small>
                            </Col>
                            <Col xl={12} className='mt-1'>
                              <Form.Control
                                type="file"
                                placeholder=""
                                className="form-control"
                              ></Form.Control>
                            </Col>

                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Old Owner Home Loan Closure Letter</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="transferdocument" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="transferdocument" />
                            </Col>
                            <Col lg={6}>
                              <small className='text-muted float-end'>Size : Max 2MB</small>
                            </Col>
                            <Col xl={12} className='mt-1'>
                              <Form.Control
                                type="file"
                                placeholder=""
                                className="form-control"
                              ></Form.Control>
                            </Col>

                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Upload Reciept
                            <small className='text-muted float-end'>Size : Max 2MB</small>
                          </Form.Label>
                          <Row>
                            <Col xl={12} className='mt-1'>
                              <Form.Control
                                type="file"
                                placeholder=""
                                className="form-control"
                              ></Form.Control>
                            </Col>

                          </Row>
                        </Form.Group>
                      </Col>


                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Upload loan Closure Letter
                            <small className='text-muted float-end'>Size : Max 2MB</small>
                          </Form.Label>
                          <Row>
                            <Col xl={12} className='mt-1'>
                              <Form.Control
                                type="file"
                                placeholder=""
                                className="form-control"
                              ></Form.Control>
                            </Col>

                          </Row>
                        </Form.Group>
                      </Col>


                    </Row>
                  </Col>

                  <Col xl={12} className='bg-white p-3 border rounded-3 mt-3'>
                    <Row>
                      <Col xl={12}>
                        <p className='mb-2 tx-bold'>Joint Holder</p>
                        <hr className='w-100 m-0' />
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Joint Holder</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="jointholder" checked />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="jointholder" />
                            </Col>


                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0 mt-0">
                          <Form.Label>Owner Name <small className='text-muted tx-bold'>(As per Agreement)</small></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            className="form-control"
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Co-owner Name <small className='text-muted tx-bold'>(As per Agreement)</small>

                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            className="form-control"
                          ></Form.Control>
                          <small className='float-end text-black tx-bold cursor mt-1'>+ Add</small>
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Flat Registration ID </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="ID"
                            className="form-control"
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Flat Registration Copy </Form.Label>
                          <Form.Control
                            type="file"
                            placeholder=""
                            className="form-control"
                          ></Form.Control>
                        </Form.Group>
                      </Col>



                    </Row>
                  </Col>
                </Col>

              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addflateresale"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addflateresale"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>


          {/* Flate Resale upload reciept */}
          {/* <Modal show={flateresaleuploadreciept} centered>
            <Modal.Header>
              <Modal.Title>Upload Reciept</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("flateresaleuploadreciept"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Form.Group className="form-group mb-0">
                <Form.Label>Upload <small className='text-muted float-end'>Upload Size : 2MB</small> </Form.Label>
                <Form.Control
                  type="file"
                  placeholder=""
                  className="form-control"
                ></Form.Control>
              </Form.Group>
              <Col xl={12} className='bg-light p-2 mt-2'>
                <span className='tx-semibold'>recieptfile.pdf</span>
                <i className='fa fa-trash text-danger float-end cursor'></i>
              </Col>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("flateresaleuploadreciept"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("flateresaleuploadreciept"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal> */}

          {/* Upload loan closure*/}
          {/* <Modal show={Uploadloanclosure} centered>
            <Modal.Header>
              <Modal.Title>Upload loan Closure Letter</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("Uploadloanclosure"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Form.Group className="form-group mb-0">
                <Form.Label>Upload <small className='text-muted float-end'>Upload Size : 2MB</small> </Form.Label>
                <Form.Control
                  type="file"
                  placeholder=""
                  className="form-control"
                ></Form.Control>
              </Form.Group>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("Uploadloanclosure"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("Uploadloanclosure"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal> */}

          {/* Add Interior Work */}
          <Modal show={addinteriorwork} size='lg' centered>
            <Modal.Header>
              <Modal.Title>Interior Work</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addinteriorwork"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='pt-1'>
              <Row>
                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society </Form.Label>
                    <Select
                      options={society}
                      placeholder="Select Society"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property </Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>
                <Col xl="6">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Work Type </Form.Label>
                    <Select
                      options={worktype}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="6">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Category </Form.Label>
                    <Select
                      options={interiorcategory}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Work Description
                      <small className='text-muted float-end'>max 250 character</small>
                    </Form.Label>
                    <textarea className="form-control" placeholder='Eg. Scope of work, job details, work summary' ></textarea>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vendor Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vendor Contact Details</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vehicle Owner Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={6}></Col>
                <Col xl={6}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Is the written request filed with the Society Office?</Form.Label>
                    <Row>
                      <Col lg={3}>

                        <Form.Check type="radio" label="Yes" name="transferdocument" />
                      </Col>
                      <Col lg={3}>

                        <Form.Check type="radio" label="No" name="transferdocument" />
                      </Col>

                    </Row>
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Did the tenant undertake this work?</Form.Label>
                    <Row>
                      <Col lg={3}>

                        <Form.Check type="radio" label="Yes" name="transferdocument" />
                      </Col>
                      <Col lg={3}>

                        <Form.Check type="radio" label="No" name="transferdocument" />
                      </Col>

                    </Row>
                  </Form.Group>
                </Col>
                <Col xl={12}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Does the work include elements such as columns,
                      beams, flooring, and ceilings?</Form.Label>
                    <Row>
                      <Col lg={3}>

                        <Form.Check type="radio" label="Yes" name="transferdocument" />
                      </Col>
                      <Col lg={3}>

                        <Form.Check type="radio" label="No" name="transferdocument" />
                      </Col>

                    </Row>
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group">
                    <Form.Label>Remarks
                      <small className='text-muted float-end'>max 250 Character</small>
                    </Form.Label>
                    <textarea className="form-control" placeholder='Remarks'></textarea>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col lg={12} className='tx-bold'>

                  <Form.Check type="checkbox" label="Terms and Conditions" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addinteriorwork"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addinteriorwork"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add celebration */}

          {addcelebration && (singleCelebrationData ? <EventModal show={addcelebration} initialVals={singleCelebrationData} onSave={handleEventSave} onClose={handleCelebrationClose} editing={true} name="Celebration" modal="addcelebration" /> : <EventModal show={addcelebration} onSave={handleEventSave} onClose={handleCelebrationClose} editing={false} name="Celebration" modal="addcelebration" />)}
          {
            celebrationview && <EventModal show={celebrationview} initialVals={singleCelebrationData} onClose={handleCelebrationViewClose} editing={false} name="Celebration" modal="addcelebration" />
          }

          {/* Add theater */}
          <Modal show={addtheater} centered>
            <Modal.Header>
              <Modal.Title>Theater</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addtheater"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='pt-1'>
              <Row>

                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society </Form.Label>
                    <Select
                      options={society}
                      placeholder="Select Society"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property </Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>
                <Col xl="12">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>No of Participants</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Show</Form.Label>
                    <Select
                      options={showname}
                      placeholder="Select show"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Show Timing</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder=""
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>





                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label clas>Do you have passes for all the participants?</Form.Label>
                    <Row>

                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="Yes" name="participants" />
                      </Col>
                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="No" name="participants" />
                      </Col>

                    </Row>

                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group">
                    <Form.Label>Remarks
                      <small className='text-muted float-end'>max 250 Character</small>
                    </Form.Label>
                    <textarea className="form-control" placeholder='Remarks'></textarea>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col lg={12} className='tx-bold'>

                  <Form.Check type="checkbox" label="Terms and Conditions" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addtheater"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addtheater"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>


          {addbanquethall && (singleBanquetHallData ? <EventModal show={addbanquethall} onClose={handleBanquetClose} editing={true} initialVals={singleBanquetHallData} onSave={handleEventSave} eventVenue="Banquet Hall" name="Banquet hall" modal="addbanquethall" /> : <EventModal show={addbanquethall} onSave={handleEventSave} onClose={handleBanquetClose} editing={false} eventVenue="Banquet Hall" name="Banquet hall" modal="addbanquethall" />)}

          {
            banquethallview && <EventModal show={banquethallview} initialVals={singleBanquetHallData} onClose={handleBanquetHallViewClose} editing={false} name="Banquet hall" modal="addbanquethall" />
          }
          {/* {addbanquethall && <EventModal show={addbanquethall} onSave={handleEventSave} onClose={handleBanquetClose} editing={false} eventVenue="Banquet Hall" name="Banquet hall" modal="addbanquethall" />} */}
          {/* Add Club House */}

          {addclubhouse && (singleClubhouseData ? <EventModal show={addclubhouse} onSave={handleEventSave} onClose={handleClubHouseClose} initialVals={singleClubhouseData} editing={true} eventVenue="Club House" name="Club House" modal="addclubhouse" /> : <EventModal show={addclubhouse} onSave={handleEventSave} onClose={handleClubHouseClose} editing={false} eventVenue="Club House" name="Club House" modal="addclubhouse" />)}

          {
            clubhouseview && <EventModal show={clubhouseview} initialVals={singleClubhouseData} onClose={handleClubHouseViewClose} editing={false} name="Club House" modal="addclubhouse" />
          }
          {/* Add Swimming pool */}
          <Modal show={addswimmingpool} centered size='xl'>
            <Modal.Header>
              <Modal.Title>Swimming Pool</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addswimmingpool"); }}>
                x
              </Button>
            </Modal.Header>


            <Modal.Body className='pt-0'>
              <Row>

                <Col xl="6">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society </Form.Label>
                    <Select
                      options={society}
                      placeholder="Select society"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="6">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property </Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <div className='bg-light w-100 mb-2 mt-2'>
                  <Row>
                    <Col xl="4">
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Name of Participant</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          className="form-control"
                        ></Form.Control>
                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                      </Form.Group>
                    </Col>

                    <Col xl="4">
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Age"
                          className="form-control"
                        ></Form.Control>
                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                      </Form.Group>
                    </Col>

                    <Col xl="4">
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Gender</Form.Label>
                        <Select
                          options={gender}
                          placeholder="Select Gender"
                          classNamePrefix="Select2"
                        />
                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                      </Form.Group>
                    </Col>

                    <Col xl="4">
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Medical Diseases</Form.Label>
                        <Select
                          options={medicaldiseases}
                          placeholder="Select Diseases"
                          classNamePrefix="Select2"
                        />
                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                      </Form.Group>
                    </Col>

                    <Col xl="4">
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Name of the Diseases</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Diseases"
                          className="form-control"
                        ></Form.Control>
                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                      </Form.Group>
                    </Col>

                    <Col xl="2">
                      <Form.Label className='pb-1'></Form.Label>
                      <Button type='button' className='btn btn-primary mt-3'>
                        + Add
                      </Button>
                    </Col>
                    <Col xl="12">
                      <table className='table border mt-3 bg-white'>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Medical Diseases</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Vishal Sharma</td>
                            <td>35</td>
                            <td>Male</td>
                            <td>No</td>
                            <td><i className='bi bi-trash text-danger cursor'></i></td>
                          </tr>
                          <tr>
                            <td>Surbhi Sharma</td>
                            <td>32</td>
                            <td>Female</td>
                            <td>No</td>
                            <td><i className='bi bi-trash text-danger cursor'></i></td>
                          </tr>
                          <tr>
                            <td>Shikha Sharma</td>
                            <td>13</td>
                            <td>Female</td>
                            <td>Yes, Skin Allergy </td>
                            <td><i className='bi bi-trash text-danger cursor'></i></td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                  </Row>
                </div>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Pool Date & Timing</Form.Label>
                    <InputGroup className="input-group w-100 datetimepicker-2">

                      <Form.Control
                        className="form-control"
                        id="datetime-local"
                        type="datetime-local"
                        defaultValue="2020-01-16T14:22"

                      />
                    </InputGroup>

                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={4}>

                  <Form.Group className="form-group mb-1">
                    <Form.Label>Duration</Form.Label>
                    <Select
                      options={duration}
                      placeholder="Select duration"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={12}>
                  <Form.Group className="form-group">
                    <Form.Label>Remarks
                      <small className='text-muted float-end'>max 250 Character</small>
                    </Form.Label>
                    <textarea className="form-control" placeholder='Remarks'></textarea>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>

                </Col>




                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label clas>Do you have passes for all the participants?</Form.Label>
                    <Row>

                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="Yes" name="participants" />
                      </Col>
                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="No" name="participants" />
                      </Col>

                    </Row>

                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label clas>Do you have swimming costume for all the
                      participants?</Form.Label>
                    <Row>

                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="Yes" name="participants" />
                      </Col>
                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="No" name="participants" />
                      </Col>

                    </Row>

                  </Form.Group>
                </Col>





                <Col lg={12} className='tx-bold mt-2'>

                  <Form.Check type="checkbox" label="Terms and Conditions" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addswimmingpool"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addswimmingpool"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>


          {/* Add Play Area */}

          {addplayarea && (singlePlayAreaData ? <EventModal show={addplayarea} modal="addplayarea" initialVals={singlePlayAreaData} onSave={handleEventSave} onClose={handlePlayAreaClose} editing={true} eventVenue="Play Area" name="Play Area" /> : <EventModal show={addplayarea} modal="addplayarea" onSave={handleEventSave} onClose={handlePlayAreaClose} editing={false} eventVenue="Play Area" name="Play Area" />)}

          {
            playareaview && <EventModal show={playareaview} initialVals={singlePlayAreaData} onClose={handlePlayAreaViewClose} editing={false} name="Play Area" modal="addplayarea" />
          }

          {/* Add Turf Area */}
          <Modal show={addturfarea} centered>
            <Modal.Header>
              <Modal.Title>Turf Area</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addturfarea"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='pt-1'>
              <Row>
                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society </Form.Label>
                    <Select
                      options={society}
                      placeholder="Select Society"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property </Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl="12">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>No of Participants</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>



                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Sport Activity</Form.Label>
                    <Select
                      options={sportactivity}
                      placeholder="Select activity"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Date & Timing</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder=""
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={12}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label clas>Do you have passes for all the participants?</Form.Label>
                    <Row>

                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="Yes" name="participants" />
                      </Col>
                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="No" name="participants" />
                      </Col>

                    </Row>

                  </Form.Group>
                </Col>


                <Col xl={12}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label clas>Do you have game resources for all the participants?</Form.Label>
                    <Row>

                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="Yes" name="participants" />
                      </Col>
                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="No" name="participants" />
                      </Col>

                    </Row>

                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group">
                    <Form.Label>Remarks
                      <small className='text-muted float-end'>max 250 Character</small>
                    </Form.Label>
                    <textarea className="form-control" placeholder='Remarks'></textarea>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col lg={12} className='tx-bold'>

                  <Form.Check type="checkbox" label="Terms and Conditions" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addturfarea"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addturfarea"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Rent Agreement */}
          <Modal show={addrentagreement} size='lg' centered>
            <Modal.Header>
              <Modal.Title>Rent Agreement</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addrentagreement"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xl="6">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Flat Type</Form.Label>
                    <Select
                      options={flattype}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="6">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Property Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="2 BHK Apartment, Fully Furnished, etc."
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Monthly Rent</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter amount"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Deposit Amount</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter amount"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Mode of Payment</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., Bank Transfer, Cash, etc."
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Due Date of Rent Payment</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., 1st of every month"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label clas>Electricity</Form.Label>
                    <Row>

                      <Col lg={4} className='mt-2'>

                        <Form.Check type="radio" label="Tenant" name="Electricity" />
                      </Col>
                      <Col lg={4} className='mt-2'>

                        <Form.Check type="radio" label="Owner" name="Electricity" />
                      </Col>

                    </Row>


                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label clas>Water Charges</Form.Label>
                    <Row>

                      <Col lg={4} className='mt-2'>

                        <Form.Check type="radio" label="Tenant" name="WaterCharges" />
                      </Col>
                      <Col lg={4} className='mt-2'>

                        <Form.Check type="radio" label="Owner" name="WaterCharges" />
                      </Col>

                    </Row>


                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label clas>Maintenance Charges</Form.Label>
                    <Row>

                      <Col lg={4} className='mt-2'>

                        <Form.Check type="radio" label="Tenant" name="MaintenanceCharges" />
                      </Col>
                      <Col lg={4} className='mt-2'>

                        <Form.Check type="radio" label="Owner" name="MaintenanceCharges" />
                      </Col>

                    </Row>


                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Other Charges <small className='text-muted'>(Specify if Any)</small></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Other charges"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={12}>
                  <strong>If the renewal is for the same tenant</strong>
                </Col>
                <Col xl={4}>
                  <Form.Group className="form-group mt-3">
                    <Form.Label>Name of the Tenant</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mt-3">
                    <Form.Label>Tenant Contact Details</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="details"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mt-3">
                    <Form.Label>Parking Details</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="details"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addrentagreement"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addrentagreement"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Share Certificate */}
          <Modal show={addsharecerificate} size='lg' centered>
            <Modal.Header>
              <Modal.Title>Share Certificate</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addsharecerificate"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>


                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Have the following documents been submitted to
                      the society office?</Form.Label>

                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Flat Agreement Copy</Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="FlatAgreementCopy" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="FlatAgreementCopy" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="FlatAgreementCopy" />
                      </Col>

                    </Row>

                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Home Loan Sanction Letter</Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="homeloansanctionletter" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="homeloansanctionletter" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="homeloansanctionletter" />
                      </Col>

                    </Row>


                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Flat Registration Details </Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="flatregistrationdetails" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="flatregistrationdetails" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="flatregistrationdetails" />
                      </Col>

                    </Row>


                  </Form.Group>
                </Col>


                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Applicable only to flat resale transactions</Form.Label>

                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Flat Agreement Copy</Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="FlatAgreementCopy1" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="FlatAgreementCopy1" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="FlatAgreementCopy1" />
                      </Col>

                    </Row>

                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Home Loan Sanction Letter</Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="homeloansanctionletter1" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="homeloansanctionletter1" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="homeloansanctionletter1" />
                      </Col>

                    </Row>


                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Flat Registration Details </Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="flatregistrationdetails1" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="flatregistrationdetails1" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="flatregistrationdetails1" />
                      </Col>

                    </Row>


                  </Form.Group>
                </Col>


                <Col xl={12}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Applicable only to rented flats</Form.Label>

                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Rent Agreement Copy</Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="RentAgreementCopy" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="RentAgreementCopy" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="RentAgreementCopy" />
                      </Col>

                    </Row>

                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Police Verification</Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="PoliceVerification" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="PoliceVerification" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="PoliceVerification" />
                      </Col>

                    </Row>

                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Maintenance Outstanding</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addsharecerificate"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addsharecerificate"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Nomination */}
          <Modal show={addnomination} size='lg' centered>
            <Modal.Header>
              <Modal.Title>Nomination</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addnomination"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body className='bg-light'>
              <Accordion defaultActiveKey="basicinfo">
                <Accordion.Item eventKey="basicinfo">
                  <Accordion.Header>Owner Details</Accordion.Header>
                  <Accordion.Body className='p-2'>
                    <Row>
                      <Col xl="6">
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Society </Form.Label>
                          <Select
                            options={society}
                            placeholder="Select society"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl="6">
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Property </Form.Label>
                          <Select
                            options={property}
                            placeholder="Select property"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>
                      <Col xl="6">
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Name</Form.Label>
                          <Select
                            options={member}
                            placeholder="Select name"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl="6">
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Name of the Nominee</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter name"
                            className="form-control"
                          ></Form.Control>
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group">
                          <Form.Label>Permanent Address of the Nominee
                            <small className='text-muted float-end'>max 250 Character</small>
                          </Form.Label>
                          <textarea className="form-control" placeholder='Address'></textarea>
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>


                      <Col xl="6">
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Relationship with the Nominatore</Form.Label>
                          <Select
                            options={relation}
                            placeholder="Select relation"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Share of each Nominee <small className='text-muted'>(in Percentage)</small></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="12%"
                            className="form-control"
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Date of Birth of Nominee if the Nominee is a Minor</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="%"
                            className="form-control"
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                    </Row>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="approvaldetails">
                  <Accordion.Header>Co-owner Details</Accordion.Header>
                  <Accordion.Body className='p-2'>
                    <Row>
                      <Col xl="6">
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Society </Form.Label>
                          <Select
                            options={society}
                            placeholder="Select society"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl="6">
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Property </Form.Label>
                          <Select
                            options={property}
                            placeholder="Select property"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>
                      <Col xl="6">
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Name</Form.Label>
                          <Select
                            options={member}
                            placeholder="Select name"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl="6">
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Name of the Nominee</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter name"
                            className="form-control"
                          ></Form.Control>
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group">
                          <Form.Label>Permanent Address of the Nominee
                            <small className='text-muted float-end'>max 250 Character</small>
                          </Form.Label>
                          <textarea className="form-control" placeholder='Address'></textarea>
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>


                      <Col xl="6">
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Relationship with the Nominatore</Form.Label>
                          <Select
                            options={relation}
                            placeholder="Select relation"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Share of each Nominee <small className='text-muted'>(in Percentage)</small></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="12%"
                            className="form-control"
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Date of Birth of Nominee if the Nominee is a Minor</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="%"
                            className="form-control"
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                    </Row>
                  </Accordion.Body>
                </Accordion.Item>

              </Accordion>

              <Col xl={12} className='p-0'>
                <label><input type="checkbox" className='float-start m-2' /><b className='float-start mt-1 cursor' onClick={() => { viewDemoShow("termsconditionsview"); }}> Terms & Conditions</b></label>
              </Col>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addnomination"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addnomination"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Badminton */}
          <Modal show={addbadminton} centered>
            <Modal.Header>
              <Modal.Title>Badminton Court</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addbadminton"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='pt-1'>
              <Row>

                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society </Form.Label>
                    <Select
                      options={society}
                      placeholder="Select Society"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property </Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>
                <Col xl="12">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>No of Participants</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Date & Timing</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder=""
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>





                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label clas>Do you have passes for all the participants?</Form.Label>
                    <Row>

                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="Yes" name="participants" />
                      </Col>
                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="No" name="participants" />
                      </Col>

                    </Row>

                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label clas>Do you have game resources for all the participants?</Form.Label>
                    <Row>

                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="Yes" name="participants" />
                      </Col>
                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="No" name="participants" />
                      </Col>

                    </Row>

                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group">
                    <Form.Label>Remarks
                      <small className='text-muted float-end'>max 250 Character</small>
                    </Form.Label>
                    <textarea className="form-control" placeholder='Remarks'></textarea>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col lg={12} className='tx-bold'>

                  <Form.Check type="checkbox" label="Terms and Conditions" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addbadminton"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addbadminton"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Food Court */}


          {addfoodcourt && (singleFoodCourtData ? <EventModal modal="addfoodcourt" show={addfoodcourt} onSave={handleEventSave} initialVals={singleFoodCourtData} onClose={handleFoodCourtClose} editing={true} eventVenue="Food Court" name="Food Court" /> : <EventModal modal="addfoodcourt" show={addfoodcourt} onSave={handleEventSave} onClose={handleFoodCourtClose} editing={false} eventVenue="Food Court" name="Food Court" />)}

          {
            foodcourtview && <EventModal show={foodcourtview} initialVals={singleFoodCourtData} onClose={handleFoodCourtViewClose} editing={false} name="Food Court" modal="addfoodcourt" />
          }

          {/* Add Others */}
          {/* <Modal show={addothers} size='xl' centered>
            <Modal.Header>
              <Modal.Title>Others</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addothers"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='bg-light'>
              <div className="tab-menu-heading tabs-style-4 ps-3">
                <div className="tabs-menu ">

                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="TabStyle01"
                  >
                    <Row>
                      <Col sm={3} className='p-0'>
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item>
                            <Nav.Link eventKey="TabStyle01" className='rounded-0'>
                              {" "}
                              Document Submission
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="TabStyle02" className='rounded-0'>
                              {" "}
                              Enquiry
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="TabStyle03" className='rounded-0'>
                              {" "}
                              Others
                            </Nav.Link>
                          </Nav.Item>

                        </Nav>
                      </Col>
                      <Col sm={9} className='p-0'>
                        <Tab.Content className="tabs-style-4 card ps-4 pb-5 rounded-0">
                          <Tab.Pane eventKey="TabStyle01">
                            <div
                              className="panel-body tabs-menu-body"
                              id="tab21"
                            >
                              <Row>
                                <Col xl={6}>
                                  <Form.Group className="form-groupx">
                                    <Form.Label className='tx-16'>Society </Form.Label>
                                    <Select
                                      options={society}
                                      placeholder="Select society"
                                      classNamePrefix="Select2"
                                    />
                                  </Form.Group>
                                </Col>

                                <Col xl={6}>
                                  <Form.Group className="form-group">
                                    <Form.Label className='tx-16'>Property </Form.Label>
                                    <Select
                                      options={property}
                                      placeholder="Select property"
                                      classNamePrefix="Select2"
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Form.Group className="form-group">

                                <Form.Label className='tx-16'>Document Submission</Form.Label>
                                <Select
                                  options={documentsubmission}
                                  placeholder="Select submission"
                                  classNamePrefix="Select2"
                                />
                              </Form.Group>

                              <Form.Group className="form-group">
                                <Form.Label className='tx-16'>Upload <small className='float-end text-muted'>Upload Size : Max 2MB </small></Form.Label>
                                <Form.Control className="form-control" type="file" />
                              </Form.Group>

                              <Form.Group className="form-group">
                                <Form.Label className='tx-16'>Comments <small className='float-end text-muted'>Max 250 Char </small></Form.Label>
                                <Form.Control as="textarea" className="form-control" placeholder="Textarea" rows={3}></Form.Control>
                              </Form.Group>


                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="TabStyle02">
                            <div
                              className="panel-body tabs-menu-body"
                              id="tab22"
                            >
                              <Row>
                                <Col xl={6}>
                                  <Form.Group className="form-group">
                                    <Form.Label className='tx-16'>Society </Form.Label>
                                    <Select
                                      options={society}
                                      placeholder="Select society"
                                      classNamePrefix="Select2"
                                    />
                                  </Form.Group>
                                </Col>

                                <Col xl={6}>
                                  <Form.Group className="form-group">
                                    <Form.Label className='tx-16'>Property </Form.Label>
                                    <Select
                                      options={property}
                                      placeholder="Select property"
                                      classNamePrefix="Select2"
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Form.Group className="form-group">

                                <Form.Label className='tx-16'>Enquiry</Form.Label>
                                <Select
                                  options={enquiry}
                                  placeholder="Select enquiry"
                                  classNamePrefix="Select2"
                                />


                              </Form.Group>

                              <Form.Group className="form-group">
                                <Form.Label className='tx-16'>Upload <small className='float-end text-muted'>Upload Size : Max 2MB </small></Form.Label>
                                <Form.Control className="form-control" type="file" />
                              </Form.Group>

                              <Form.Group className="form-group">
                                <Form.Label className='tx-16'>Comments <small className='float-end text-muted'>Max 250 Char </small></Form.Label>
                                <Form.Control as="textarea" className="form-control" placeholder="Textarea" rows={3}></Form.Control>
                              </Form.Group>

                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="TabStyle03">
                            <div
                              className="panel-body tabs-menu-body"
                              id="tab23"
                            >
                              <Row>
                                <Col xl={6}>
                                  <Form.Group className="form-group mb-1">
                                    <Form.Label className='tx-16'>Society </Form.Label>
                                    <Select
                                      options={society}
                                      placeholder="Select society"
                                      classNamePrefix="Select2"
                                    />
                                  </Form.Group>
                                </Col>

                                <Col xl={6}>
                                  <Form.Group className="form-group mb-1">
                                    <Form.Label className='tx-16'>Property </Form.Label>
                                    <Select
                                      options={property}
                                      placeholder="Select property"
                                      classNamePrefix="Select2"
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Form.Group>

                                <Form.Label className='tx-16'>Type</Form.Label>
                                <Row>
                                  <Col xl={12}>
                                    <Select
                                      options={otherstype}
                                      placeholder="Select"
                                      classNamePrefix="Select2"
                                    />
                                  </Col>


                                  <Col xl={12}>
                                    <Form.Group className='mt-4'>
                                      <Form.Label className='tx-16'>Upload <small className='float-end text-muted'>Upload Size : Max 2MB </small></Form.Label>
                                      <Form.Control className="form-control" type="file" />
                                    </Form.Group>
                                  </Col>


                                  <Col xl={12}>
                                    <Form.Group className='mt-4'>
                                      <Form.Label className='tx-16'>Comments <small className='float-end text-muted'>Max 250 Char </small></Form.Label>
                                      <Form.Control as="textarea" className="form-control" placeholder="Textarea" rows={3}></Form.Control>
                                    </Form.Group>
                                  </Col>
                                </Row>









                              </Form.Group>
                            </div>
                          </Tab.Pane>

                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addothers"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addothers"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal> */}
          {addothers && (singleOthersData ? <OtherApplicationModal initialVals={singleOthersData} show={addothers} onSave={handleOtherApplicationSave} onClose={handleOtherApplicationClose} editing={true} /> : <OtherApplicationModal show={addothers} onSave={handleOtherApplicationSave} onClose={handleOtherApplicationClose} editing={false} />)}
          {
            otherapplicationview && <OtherApplicationModal show={otherapplicationview} initialVals={singleOthersData} onClose={handleOtherApplicationViewClose} editing={false} />
          }
        </div>
      </div>

      <Row>
        <Col xl={12}>

          <Card className='m-0'>
            <CardHeader className='pb-0'>
              <h3 className='card-title'> Filter</h3>
            </CardHeader>
            <Card.Body className='pt-0 pb-1'>
              <Row>
                <Col xl={3}>
                  <Form.Group className="form-group">
                    <Form.Label>Property</Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={3}>
                  <Form.Group className="form-group">
                    <Form.Label>Application Category</Form.Label>
                    <Select
                      options={applicationtype}
                      placeholder="Select application"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={3}>
                  <Form.Group className="form-group">
                    <Form.Label>Status </Form.Label>
                    <Select
                      options={status}
                      placeholder="Select status"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={2} className='pt-1'>
                  <Form.Group className="form-group pt-4">
                    {/* <Button className="btn btn-default" type="button">Search </Button> */}
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className='mt-3'>
            <CardHeader>
              <h3 className='card-title float-start'>   List of Apllications </h3>
              <Link to={`${import.meta.env.BASE_URL}eventbooking/eventbooking`} className='float-end btn btn-primary p-1 pe-2 ps-2 me-1'><i className='bi bi-calendar'></i>&nbsp; Event Calendar</Link>
            </CardHeader>
            <Card.Body className='pt-0'>
              {/* <table className='table'>
                <thead>
                  <tr>
                    <th>S.no.</th>
                    <th>Application Id</th>
                    <th>Property</th>
                    <th>Member</th>
                    <th>Society</th>
                    <th>Application Category</th>
                    <th>Status</th>
                    <th>Date & Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td><span onClick={() => { viewDemoShow("gatepassview"); }} className='text-info cursor'>AP-00012</span></td>
                    <td><Link to={``} className='text-info'>A101</Link></td>
                    <td><Link to={``} className='text-info'>Test CreditBricks Society</Link></td>
                    <td>Tests society Member</td>
                    <td>Gate Pass</td>
                    <td>Level 2 Rejected</td>
                    <td>02/3/2025</td>
                    <td><Dropdown >
                      <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                        Action
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item >Edit</Dropdown.Item>
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
                    data={applicationData}
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


{/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */ }
{/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */ }