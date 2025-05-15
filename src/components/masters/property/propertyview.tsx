
import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, Tabs, Tab, FormLabel, Tooltip, Dropdown, OverlayTrigger, Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPropertComplaintsApi, getPropertLoansApi, getSinglePropertyDetailsApi } from '../../../api/property-api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import { CustomToastContainer, showToast } from '../../../common/services/toastServices';
import LoanModal from '../../../common/modals/loanModal';
import LoanViewModal from '../../../common/modals/loanViewModal';
import ComplaintModal from '../../../common/modals/complaintModal';
import ComplaintViewModal from '../../../common/modals/complaintViewModal';
import { deleteComplaintApi, updateComplaintApi, updateComplaintStatusApi } from '../../../api/complaint-api';
import { handleApiError } from '../../../helpers/handle-api-error';
import { deleteLoanApi, updateLoanApi } from '../../../api/loan-api';
import TestLoader from '../../../layout/layoutcomponent/testloader';
import { imagesData } from '../../../common/commonimages';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/store/store';
import { getPropertiesOfSocietyApi } from '../../../api/society-api';
import { createNewDocumentSubmissionApi, createNewEnquiryApi, createNewGatePassApi, createNewOtherApplicationApi, deleteApplicationApi, getAllApplicationApi, getApplicationDetailsApi, updateDocumentSubmissionApi, updateEnquiryApi, updateEventApi, updateGatePassApi, updateOtherApplicationApi } from '../../../api/application-api';
import { ViewGatePassData } from '../../../common/services/database';
import GatePassModal from '../../../common/modals/gatePassModal';
import FlatResaleModal from '../../../common/modals/flatResaleModal';
import EventModal from '../../../common/modals/eventModal';
import OtherApplicationModal from '../../../common/modals/otherApplicationModal';


export default function PropertyView() {
  const [singlePropertyData, setSinglePropertydata] = useState<any>([])
  const [propertyOptions, setPropertyOptions] = useState<any>([])
  const [complaintData, setComplaintData] = useState<any>([])
  const [singleComplaintData, setSingleComplaintData] = useState<any>(null);
  const [addcomplaint, setaddcomplaint] = useState(false);
  const [viewcomplaint, setviewcomplaint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loanData, setLoanData] = useState<any>([])
  //application states
  const [, settermsconditionsview] = useState(false);
  const [gatepassview, setgatepassview] = useState(false);
  const [celebrationview, setcelebrationview] = useState(false);
  const [banquethallview, setbanquethallview] = useState(false);
  const [clubhouseview, setclubhouseview] = useState(false);
  const [flatresaleview, setflatresaleview] = useState(false);
  const [playareaview, setplayareaview] = useState(false);
  const [foodcourtview, setfoodcourtview] = useState(false);
  const [otherapplicationview, setotherapplicationview] = useState(false);
  const [, setaddnomination] = useState(false);
  const [, setaddbadminton] = useState(false);
  const [addfoodcourt, setaddfoodcourt] = useState(false);
  const [addothers, setothers] = useState(false);
  const [applicationData, setApplicationData] = useState<any[]>([])
  const [singleLoandata, setSingleLoanData] = useState<any>(null);
  const [addloans, setaddloans] = useState(false);
  const [viewloan, setviewloan] = useState(false);
  const [documentstatus, setdocumentstatus] = useState(false);
  const [addgatepass, setaddgatepass] = useState(false);
  const [, setaddchangeinname] = useState(false);
  const [, setaddcontactupdate] = useState(false);
  const [, setaddparking] = useState(false);
  const [addflateresale, setaddflateresale] = useState(false);
  const [, setflateresaleuploadreciept] = useState(false);
  const [, setUploadloanclosure] = useState(false);
  const [, setaddinteriorwork] = useState(false);
  const [addcelebration, setaddcelebration] = useState(false);
  const [, setaddtheater] = useState(false);
  const [addbanquethall, setaddbanquethall] = useState(false);
  const [, setaddswimmingpool] = useState(false);
  const [addclubhouse, setaddclubhouse] = useState(false);
  const [addplayarea, setaddplayarea] = useState(false);
  const [, setaddturfarea] = useState(false);
  const [, setaddrentagreement] = useState(false);
  const [, setaddsharecerificate] = useState(false);
  const [singleBanquetHallData, setSingleBanquetHallData] = useState(null);
  const [singleCelebrationData, setSingleCelebrationData] = useState(null);
  const [singleClubhouseData, setSingleClubhouseData] = useState(null);
  const [singlePlayAreaData, setSinglePlayAreaData] = useState(null);
  const [singleFoodCourtData, setSingleFoodCourtData] = useState(null);
  const [, setSingleContactUpdateData] = useState(null);
  const [, setSingleSwimmingPoolData] = useState(null);
  const [, setSingleParkingData] = useState(null);
  const [singleOthersData, setSingleOthersData] = useState(null);
  const [, setSingleInteriorData] = useState(null);
  const [singleGatePassData, setSingleGatePassData] = useState(null);
  const [viewGatePassData, setViewGatePassData] = useState<ViewGatePassData | null>(null);
  const [, setSingleChangeInNameData] = useState(null);
  const [singleFlatResaleData, setSingleFlatResaleData] = useState(null);
  const navigate = useNavigate();
  const params = useParams()
  const identifier = params.identifier as string
  const { society } = useSelector((state: RootState) => state.auth)
  // const location = useLocation();
  // const propertyData = location.state?.propertyData;
  // if (!propertyData) {
  //   return <p>No property data available.</p>;
  // }

  const [documentview, setdocumentview] = useState(false);

  const complaintColumns = [
    {
      name: 'S.No',
      cell: (_: any, index: number) => index + 1,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Complaint ID',
      cell: (row: any) => (
        <span className='text-info cursor' onClick={() => { viewDemoShow("viewcomplaint"), setSingleComplaintData(row) }}>{row.id}</span>
      ),
      sortable: true,
    },
    {
      name: 'Created At',
      selector: (row: any) => row.createdAt,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row: any) => row.description,
      sortable: true,
    },
    {
      name: 'Priority',
      cell: (row: any) => {
        if (row.priority === 'high') {
          return <td className='text-center'><span className='badge badge-danger'>High</span></td>;
        } else if (row.priority === 'medium') {
          return <td className='text-center'><span className='badge badge-warning'>Medium</span></td>;
        } else {
          return <td className='text-center'><span className='badge badge-success'>Low</span></td>;
        }
      },
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
            <Dropdown.Item onClick={() => { setSingleComplaintData(row), viewDemoShow("addcomplaint") }}>Edit</Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleComplaintDelete(row.id)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];

  const loanColumns = [
    {
      name: 'S.No',
      selector: (row: any) => row.sno,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Loan Number',
      cell: (row: any) => (
        <span className='text-info cursor' onClick={() => { setSingleLoanData(row), viewDemoShow("viewloan") }}>{row.loanNumber}</span>
      ),
      sortable: true,
    },

    {
      name: 'Member',
      selector: (row: any) => row.memberType,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row: any) => row.fullName,
      sortable: true,
    },
    {
      name: 'Loan Type',
      selector: (row: any) => row.type,
      sortable: true,
    },


    {
      name: 'Loan Period',
      selector: (row: any) => row.period,
      sortable: true,
    },
    {
      name: 'Loan Amount',
      selector: (row: any) => row.amount,
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
            <Dropdown.Item onClick={() => { setSingleLoanData(row), viewDemoShow("addloans") }}>Edit </Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleLoanDelete(row)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];

  const applicationColumns = [
    {
      name: 'S.No',
      selector: (row: any) => row.sno,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Application Id',
      cell: (row: any) => (
        <span className='text-info cursor'
          onClick={() => {
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
            <Dropdown.Item
              onClick={() => {
                fetchEventDetails(row.id);
              }}
            >Edit</Dropdown.Item>

            <Dropdown.Item className='text-danger' onClick={() => handleApplicationDelete(row.id)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];

  const tableData = {
    columns: complaintColumns,
    data: complaintData
  };
  const loanTableData = {
    columns: loanColumns,
    data: loanData
  };

  const applicationTableData = {
    columns: applicationColumns,
    data: applicationData
  };

  const fetchPropertyOptions = async () => {
    try {
      const response = await getPropertiesOfSocietyApi(society.value)
      const data = response?.data?.data
      // const formattedData = data.map((property: any) => ({
      //   value: property.propertyIdentifier,
      //   label: property.propertyName
      // }))
      setPropertyOptions(data)
    } catch (error) {

    }
  }

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await getSinglePropertyDetailsApi(identifier)
        setSinglePropertydata(response?.data?.data || [])
      } catch (error) {

      } finally {
        setIsLoading(false)
      }
    }
    if (identifier) {
      fetchPropertyData()
      fetchPropertyOptions()
      fetchComplaintData()
      fetchLoanData()
      fetchApplicationData()
    }
  }, [identifier])

  const handlePropertyChange = (newIdentifier: string) => {
    navigate(`/property/propertyview/${newIdentifier}`);
  };

  const fetchApplicationData = async () => {
    try {
      const response = await getAllApplicationApi(undefined, identifier)
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

  const fetchComplaintData = async () => {
    try {
      const response = await getPropertComplaintsApi(identifier)
      const formattedData = response.data.data.map((complaint: any, index: number) => {
        return {
          sno: index + 1,
          id: complaint?.id || "",
          categoryName: complaint?.category?.name || "",
          categoryId: complaint?.category?.id || "",
          propertyName: complaint?.property?.propertyName || "",
          propertyIdentifier: complaint?.property?.propertyIdentifier || "",
          societyIdentifier: complaint?.society?.societyIdentifier || "",
          societyName: complaint?.society?.societyName || "",
          contactPersonName: complaint?.complaintAllocation?.vendor?.contactPersonName || "",
          contactPersonNumber: complaint?.complaintAllocation?.vendor?.contactPersonNumber || "",
          createdAt: complaint?.createdAt || "",
          status: complaint?.status || "",
          remarks: complaint?.remarks || "",
          priority: complaint?.priority || "",
          description: complaint?.description || "",
          issueFilePath: complaint?.issueFilePath || "",
          subCategory: complaint?.subCategory?.name || "",
        }
      })
      setComplaintData(formattedData || []);

    } catch (error) {

    }
  }
  const fetchLoanData = async () => {
    try {
      const response = await getPropertLoansApi(identifier)
      const formattedData = response.data.data.map((complaint: any, index: number) => {
        return {
          sno: index + 1,
          loanIdentifier: complaint?.loanIdentifier || "",
          type: complaint?.type || "",
          memberType: complaint?.memberType || "",
          fullName: complaint?.fullName || "",
          loanNumber: complaint?.loanNumber || "",
          period: complaint?.period || "",
          amount: complaint?.amount || "",
          monthlyEmi: complaint?.monthlyEmi || "",
          startDate: complaint?.startDate || "",
          endDate: complaint?.endDate || "",
          propertyIdentifier: complaint?.propertyIdentifier || "",
          propertyName: complaint?.propertyName || "",
          bankName: complaint?.bankName || "",
          bankAddress: complaint?.bankAddress || "",
          loanFilePath: complaint?.loanFilePath || "",
        }
      })
      setLoanData(formattedData);
    } catch (error) {

    }
  }

  const viewDemoShow = (modal: any) => {
    switch (modal) {

      case "documentstatus":
        setdocumentstatus(true);
        break;

      case "addcomplaint":
        setaddcomplaint(true);
        break;

      case "documentview":
        setdocumentview(true);
        break;


      case "addloans":
        setaddloans(true);
        break;
      case "viewcomplaint":
        setviewcomplaint(true);
        break;
      case "viewloan":
        setviewloan(true);
        break;

      case "addothers":
        setothers(true);

        break;

      case "addfoodcourt":
        setaddfoodcourt(true);

        break;

      case "addbadminton":
        setaddbadminton(true);

        break;

      case "addnomination":
        setaddnomination(true);

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
      case "flatresaleview":
        setflatresaleview(true);
        break;

      case "addgatepass":
        setaddgatepass(true);

        break;

      case "addchangeinname":
        setaddchangeinname(true);

        break;

      case "addcontactupdate":
        setaddcontactupdate(true);

        break;

      case "addparking":
        setaddparking(true);

        break;

      case "addflateresale":
        setaddflateresale(true);

        break;


      case "flateresaleuploadreciept":
        setflateresaleuploadreciept(true);

        break;

      case "Uploadloanclosure":
        setUploadloanclosure(true);

        break;

      case "addinteriorwork":
        setaddinteriorwork(true);

        break;

      case "addcelebration":
        setaddcelebration(true);

        break;

      case "addtheater":
        setaddtheater(true);

        break;

      case "addbanquethall":
        setaddbanquethall(true);

        break;

      case "addswimmingpool":
        setaddswimmingpool(true);

        break;

      case "addclubhouse":
        setaddclubhouse(true);

        break;

      case "addplayarea":
        setaddplayarea(true);

        break;

      case "addturfarea":
        setaddturfarea(true);

        break;

      case "addrentagreement":
        setaddrentagreement(true);

        break;

      case "addsharecerificate":
        setaddsharecerificate(true);

        break;


    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {

      case "documentstatus":
        setdocumentstatus(false);
        break;

      case "addcomplaint":
        setaddcomplaint(false);
        break;

      case "documentview":
        setdocumentview(false);
        break;


      case "addloans":
        setaddloans(false);
        break;
      case "viewcomplaint":
        setviewcomplaint(false);
        break;
      case "viewloan":
        setviewloan(false);
        break;

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
      case "flatresaleview":
        setflatresaleview(false);
        setSingleFlatResaleData(null)
        break;

      case "termsconditionsview":
        settermsconditionsview(false);
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
        setSingleFlatResaleData(null)
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

  const handleLoanSubmit = async (values: any) => {
    const formattedData: any = {
      noticeSubject: values.subject,
      type: values.type.value,
      memberType: values.memberType.value,
      period: values.period.value,
      fullName: values.fullName,
      loanNumber: values.loanNumber,
      amount: values.amount,
      monthlyEmi: values.monthlyEmi,
      startDate: values.startDate,
      endDate: values.endDate,
      bankName: values.bankName,
      bankAddress: values.bankAddress,
    }
    // if (values?.tower?.value) {
    //   formattedData.towerIdentifier = values.tower.value
    // }
    // if (values?.wing?.value) {
    //   formattedData.wingIdentifier = values.wing.value
    // }
    if (values?.property?.value) {
      formattedData.propertyIdentifier = values.property.value
    }

    if (values.file) {
      formattedData.loanFile = values.file
    }
    try {
      let response;

      response = await updateLoanApi(formattedData, singleLoandata?.loanIdentifier)

      if (response.status === 200) {
        viewDemoClose("addloan");
        showToast("success", response.data.message)
        fetchLoanData()
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    } finally {
      setSingleLoanData(null)
    }
    viewDemoClose("addloan")
  }

  const handleComplaintSubmit = async (values: any) => {
    const formattedData: any = {
      propertyIdentifier: values?.property?.value || "",
      societyIdentifier: values?.society?.value || "",
      categoryId: values?.complaintCategory?.value || "",
      description: values.complaintDescription || "",
      priority: values?.priority?.value || "",
    }
    if (values.complaintFile) {
      formattedData.complaintFile = values.complaintFile
    }
    try {
      let response;

      response = await updateComplaintApi(formattedData, singleComplaintData?.id)


      if (response.status === 200 || response.status === 201) {
        showToast("success", response.data.message)
        fetchComplaintData()
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
    viewDemoClose("addcomplaint")
  }

  const fetchEventDetails = async (id: string) => {
    const prefix = id.split('-')[0];

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
            viewDemoShow("addflateresale");
            break;

          default:
            console.warn(`Unhandled application type: ${prefix}`);
            break;
        }
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }
  };

  const fetchEventDetailsForView = async (id: string) => {
    const prefix = id.split('-')[0];

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
            viewDemoShow("flatresaleview");
            break;

          default:
            console.warn(`Unhandled application type: ${prefix}`);
            break;
        }
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
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
      }
      if (response.status === 200 || response.status === 201) {
        showToast("success", response.data.message)
        fetchApplicationData()
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
        fetchApplicationData()
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
        fetchApplicationData()
      }

    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    } finally {
      viewDemoClose("addothers")
    }
  }

  const handleFlatResaleSave = async (values: any, editing: boolean) => {
    try {
      console.log(values)
      // let response;

      // if (editing) {
      //   response = await updateOtherApplicationApi(values, values.id);
      // } else {
      //   response = await createNewOtherApplicationApi(values);
      // }

      // if (response.status === 200 || response.status === 201) {
      //   showToast("success", response.data.message)
      //   fetchAllApplications()
      // }

    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    } finally {
      // viewDemoClose("addflateresale")
    }
  }

  const handleApplicationDelete = (id: string) => {
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

  const handleLoanClose = () => {
    viewDemoClose("addloans")
    setSingleLoanData(null)
  }

  const handleLoanViewClose = () => {
    viewDemoClose("viewloan")
    setSingleLoanData(null)
  }

  const handleComplaintClose = () => {
    viewDemoClose("addcomplaint")
    setSingleComplaintData(null)
  }

  const handleComplaintViewClose = () => {
    viewDemoClose("viewcomplaint")
    setSingleComplaintData(null)
  }

  const handleLoanDelete = (row: any) => {
    ; (async () => {
      try {

        const response = await deleteLoanApi(row.loanIdentifier)
        if (response.status === 200) {
          showToast("success", response.data.message)
          // setLoanData((prevData: any) => prevData.filter((society: any) => society.loanIdentifier !== row.loanIdentifier))
          fetchLoanData()
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    })()
  }

  const handleComplaintDelete = (id: string) => {
    ; (async () => {
      try {

        const response = await deleteComplaintApi(id)
        if (response.status === 200) {
          showToast("success", response.data.message)
          // setComplaintData((prevData: any) => prevData.filter((society: any) => society.id !== id))
          fetchComplaintData()
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    })()
  }

  const handleComplaintStatusUpdate = async (values: any, id: string) => {
    const data = {
      status: values.status.value,
      remarks: values.remarks
    }
    try {
      const response = await updateComplaintStatusApi(data, id);
      if (response.status === 200) {
        showToast("success", response.data.message);
        fetchComplaintData()
      }
      viewDemoClose("viewcomplaint")
    } catch (error) {

    }
    viewDemoClose("viewcomplaint")
  }

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
  const handleFlatResaleClose = () => {
    viewDemoClose("addflateresale");
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
  const handleFlatResaleViewClose = () => {
    viewDemoClose("flatresaleview");
  }

  return (
    <>
      {
        isLoading ? <TestLoader /> : <Fragment>
          <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
              <span className="main-content-title mg-b-0 mg-b-lg-1">
                <Link to={`${import.meta.env.BASE_URL}property/propertymaster`} className="p-1 pe-2 ps-2 me-1 float-start"><i className='bi bi-arrow-left'></i> </Link>
                <span className="dropdown nav-item w-auto headericon float-start">
                  <Dropdown>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>Switch Your Property</Tooltip>}>
                      <Dropdown.Toggle
                        className="new nav-link profile-user d-flex text-primary"

                        variant=""
                      >
                        <strong className='tx-24'>{singlePropertyData?.propertyName || "N/A"}</strong>
                      </Dropdown.Toggle>
                    </OverlayTrigger>
                    {/* <Dropdown.Menu className="property_select">

                      <Dropdown.Item className="dropdown-item" href="/">
                        <i className="far fa-building me-2"></i> Property A
                      </Dropdown.Item>

                      <Dropdown.Item className="dropdown-item" href="/">
                        <i className="far fa-building me-2"></i> Property B
                      </Dropdown.Item>
                    </Dropdown.Menu> */}
                    <Dropdown.Menu className="property_select" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {propertyOptions?.map((property: any) => (
                        <Dropdown.Item
                          key={property.identifier}
                          className="dropdown-item"
                          onClick={() => handlePropertyChange(property?.propertyIdentifier)}
                        >
                          <i className="far fa-building me-2"></i> {property?.propertyName}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
              </span>
            </div>
          </div>


          <Row>
            <Col xl={12} className='ps-0 pe-0'>

              <div className="tab-menu-heading">
                <div className="tabs-menu1">
                  <Tabs defaultActiveKey="Details" className="panel-tabs bd_bottom main-nav-line bd-b-0 mb-1">
                    <Tab eventKey="Details" title="Details">
                      <div className="tabs-menu-body main-content-body-right" id="Details">
                        <Row>
                          <Col xl={4}>
                            <Card className='m-3 mb-5'>
                              <Card.Body>
                                <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Basic Details</h5>
                                <Row>
                                  <Col xl={12}>
                                    <FormLabel>Society</FormLabel>
                                    <p className='tx-14 tx-semibold col-sm-11 p-0'>{singlePropertyData?.society?.societyName || "N/A"}</p>
                                  </Col>

                                  <Col xl={12}>
                                    <FormLabel>Ledger Name</FormLabel>
                                    <p className='tx-14 tx-semibold col-sm-11 p-0'>{singlePropertyData?.ledgerName || "N/A"}</p>
                                  </Col>

                                  <Col xl={6}>
                                    <FormLabel>Property Name</FormLabel>
                                    <p className='tx-14 tx-semibold'>{singlePropertyData?.propertyName || "N/A"}</p>
                                  </Col>

                                  <Col xl={6}>
                                    <FormLabel>Owner</FormLabel>
                                    <p className='tx-14 tx-semibold'>
                                      {
                                        singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 1)
                                          ? `${singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 1)?.member?.firstName} ${singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 1)?.member?.lastName}`
                                          : "N/A"
                                      }</p>
                                  </Col>



                                  <Col xl={6}>
                                    <FormLabel>Status</FormLabel>
                                    <p className='tx-14 tx-semibold'>{singlePropertyData?.status || "N/A"}</p>
                                  </Col>



                                  <Col xl={6}>
                                    <FormLabel>Tower</FormLabel>
                                    <p className='tx-14 tx-semibold'>{singlePropertyData?.tower?.towerName || "N/A"}</p>
                                  </Col>

                                  <Col xl={6}>
                                    <FormLabel>Area(sq.ft.)</FormLabel>
                                    <p className='tx-14 tx-semibold'>{singlePropertyData?.area || "N/A"}</p>
                                  </Col>

                                  <Col xl={6}>
                                    <FormLabel>Wing</FormLabel>
                                    <p className='tx-14 tx-semibold'>{singlePropertyData?.wing?.wingName || "N/A"}</p>
                                  </Col>

                                  <Col xl={6}>
                                    <FormLabel>Flat No.</FormLabel>
                                    <p className='tx-14 tx-semibold'>{singlePropertyData?.flatNumber || "N/A"}</p>
                                  </Col>

                                  <Col xl={6}>
                                    <FormLabel>Deal Type</FormLabel>
                                    <p className='tx-14 tx-semibold'>{singlePropertyData?.dealType || "N/A"}</p>
                                  </Col>

                                  <Col xl={6}>
                                    <FormLabel>Floor No.</FormLabel>
                                    <p className='tx-14 tx-semibold'>{singlePropertyData?.floorNumber || "N/A"}</p>
                                  </Col>

                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col xl={8} className='p-0'>
                            <Row>
                              <Col xl={6}>

                                <Card className='mt-3'>
                                  <Card.Body>
                                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Registration Details</h5>
                                    <Row>
                                      <Col xl={6} className='mb-1 tx-12'>Flat Registration Number</Col>
                                      <Col xl={6} className='tx-14 tx-semibold'>{singlePropertyData?.flatRegistrationNumber || "N/A"}</Col>
                                      <Col xl={6} className='mb-1 tx-12'>Date of Agreement</Col>
                                      <Col xl={6} className='tx-14 tx-semibold'>{singlePropertyData?.dateOfAgreement || "N/A"}</Col>
                                      <Col xl={6} className='mb-1 tx-12'>Date of Registration</Col>
                                      <Col xl={6} className='tx-14 tx-semibold'>{singlePropertyData?.dateOfRegistration || "N/A"}</Col>

                                    </Row>
                                  </Card.Body>
                                </Card>



                                <Card>
                                  <Card.Body>
                                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Address Details</h5>
                                    <Row>
                                      <Col xl={6} className='mb-1 tx-12'>Address line 1</Col>
                                      <Col xl={6} className='tx-14 tx-semibold'>{singlePropertyData?.society?.address || "N/A"}</Col>
                                      <Col xl={6} className='mb-1 tx-12'>Address line 2</Col>
                                      <Col xl={6} className='tx-14 tx-semibold'>{singlePropertyData?.society?.addressLine2 || "N/A"}</Col>
                                      <Col xl={6} className='mb-1 tx-12'>Address line 3</Col>
                                      <Col xl={6} className='tx-14 tx-semibold'>{singlePropertyData?.society?.addressLine3 || "N/A"}</Col>
                                      <Col xl={6} className='mb-1 tx-12'>City</Col>
                                      <Col xl={6} className='tx-14 tx-semibold'>{singlePropertyData?.society?.city || "N/A"}</Col>
                                      <Col xl={6} className='mb-1 tx-12'>State</Col>
                                      <Col xl={6} className='tx-14 tx-semibold'>{singlePropertyData?.society?.state || "N/A"}</Col>
                                      <Col xl={6} className='mb-1 tx-12'>Pincode</Col>
                                      <Col xl={6} className='tx-14 tx-semibold'>{singlePropertyData?.society?.pincode || "N/A"}</Col>
                                    </Row>
                                  </Card.Body>
                                </Card>





                              </Col>
                              <Col xl={6} className='padding-right40'>
                                <Card className='mt-3'>
                                  <Card.Body>
                                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Other Details</h5>
                                    <Row>
                                      <Col xl={7} className='mb-1 tx-12'>Intercom Number</Col>
                                      <Col xl={5} className='tx-14 tx-semibold'>{singlePropertyData?.intercomNumber || "N/A"}</Col>
                                      <Col xl={7} className='mb-1 tx-12'>Gas Connection Number</Col>
                                      <Col xl={5} className='tx-14 tx-semibold'>{singlePropertyData?.gasConnectionNumber || "N/A"}</Col>
                                      <Col xl={7} className='mb-1 tx-12'>Consumer Electricity Number</Col>
                                      <Col xl={5} className='tx-14 tx-semibold'>{singlePropertyData?.electricityNumber || "N/A"}</Col>

                                    </Row>
                                  </Card.Body>
                                </Card>

                                <Card>
                                  <Card.Body>
                                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Owner Details</h5>
                                    {/* <Row>
      <Col xl={6} className='mb-1 tx-12'>Member Name</Col>
      <Col xl={6} className='tx-semibold'><Link to={``} className='text-info'> {propertyData.memberName}</Link></Col>
      <Col xl={6} className='mb-1 tx-12'>Co Owner</Col>
      <Col xl={6} className='tx-semibold'>-</Col>
      <Col xl={6} className='mb-1 tx-12'>Third Owner</Col>
      <Col xl={6} className='tx-semibold'>-</Col>
      <Col xl={6} className='mb-1 tx-12'>Fourth Owner</Col>
      <Col xl={6} className='tx-semibold'>-</Col>
      <Col xl={6} className='mb-1 tx-12'>Fifth Owner</Col>
      <Col xl={6} className='tx-semibold'>-</Col>
      <Col xl={6} className='mb-1 tx-12'>Previous Owner</Col>
      <Col xl={6} className='tx-semibold'>-</Col>
    </Row> */}
                                    <Row>
                                      {/* Member Name */}
                                      <Col xl={5} className='mb-1 tx-12'>Member Name</Col>
                                      <Col xl={7} className='tx-14 tx-semibold'>
                                        {
                                          singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 1)
                                            ? <Link to={`${import.meta.env.BASE_URL}members/membersProfile/${singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 1)?.memberIdentifier}`} className='text-info'>
                                              {singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 1)?.member?.firstName}
                                              {singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 1)?.member?.lastName}
                                            </Link>
                                            : 'N/A'
                                        }
                                      </Col>

                                      {/* Co-Owner */}
                                      <Col xl={5} className='mb-1 tx-12'>Co Owner</Col>
                                      <Col xl={7} className='tx-14 tx-semibold'>
                                        {
                                          singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 2)
                                            ? singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 2)?.member?.firstName + ' ' + singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 2)?.member?.lastName
                                            : 'N/A'
                                        }
                                      </Col>

                                      {/* Third Owner */}
                                      <Col xl={5} className='mb-1 tx-12'>Third Owner</Col>
                                      <Col xl={7} className='tx-14 tx-semibold'>
                                        {
                                          singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 3)
                                            ? singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 3)?.member?.firstName + ' ' + singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 3)?.member?.lastName
                                            : 'N/A'
                                        }
                                      </Col>

                                      {/* Fourth Owner */}
                                      <Col xl={5} className='mb-1 tx-12'>Fourth Owner</Col>
                                      <Col xl={7} className='tx-14 tx-semibold'>
                                        {
                                          singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 4)
                                            ? singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 4)?.member?.firstName + ' ' + singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 4)?.member?.lastName
                                            : 'N/A'
                                        }
                                      </Col>

                                      {/* Fifth Owner */}
                                      <Col xl={5} className='mb-1 tx-12'>Fifth Owner</Col>
                                      <Col xl={7} className='tx-14 tx-semibold'>
                                        {
                                          singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 5)
                                            ? singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 5)?.member?.firstName + ' ' + singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 5)?.member?.lastName
                                            : 'N/A'
                                        }
                                      </Col>

                                      {/* Previous Owner */}
                                      <Col xl={5} className='mb-1 tx-12'>Previous Owner</Col>
                                      <Col xl={7} className='tx-14 tx-semibold'>
                                        {
                                          singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 6)
                                            ? singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 6)?.member?.firstName + ' ' + singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 6)?.member?.lastName
                                            : 'N/A'
                                        }
                                      </Col>
                                    </Row>
                                  </Card.Body>
                                </Card>









                              </Col>
                              <Col xl={12} className='padding-right40'>
                                <Card>
                                  <Card.Body>
                                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Already Paid Details</h5>
                                    <Row>
                                      <Col xl={6} className='mb-1 tx-12'>Monthly Paid Maintenance to Builder</Col>
                                      <Col xl={6} className='tx-14 tx-semibold'>{singlePropertyData?.monthlyMaintenance || "N/A"}</Col>
                                      <Col xl={6} className='mb-1 tx-12'>Monthly Paid Maintenance to Builder Upto</Col>
                                      <Col xl={6} className='tx-14 tx-semibold'>{singlePropertyData?.monthlyMaintenanceUpto || "N/A"}</Col>
                                      <Col xl={6} className='mb-1 tx-12'>Monthly Paid Arrears</Col>
                                      <Col xl={6} className='tx-14 tx-semibold'>{singlePropertyData?.monthlyPaidArrears || "N/A"}</Col>
                                      <Col xl={6} className='mb-1 tx-12'>Monthly Paid Arrears Upto</Col>
                                      <Col xl={6} className='tx-14 tx-semibold'>{singlePropertyData?.monthlyPaidArrearsUpto || "N/A"}</Col>
                                    </Row>
                                  </Card.Body>
                                </Card>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Tab>
                    <Tab eventKey="Parking" title="Parking">
                      <div className="tabs-menu-body main-content-body-right">

                        <Card className='m-3 mb-5'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Parking Details</h5>

                            <table className='table'>
                              <thead>
                                <tr>
                                  <th>S.No.</th>
                                  <th>Parking Number</th>
                                  <th>Society Name</th>
                                  <th>Parking Type</th>
                                  <th>Parking Vehicle Type</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>1</td>
                                  <td>CRP 101</td>
                                  <td>Test CreditBricks Society</td>
                                  <td>Stilt</td>
                                  <td>4 Wheeler</td>
                                  <td>Allocated</td>
                                  <td><Dropdown >
                                    <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                      Action
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item><Link to={``}>Edit</Link></Dropdown.Item>
                                      <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown></td>
                                </tr>
                                <tr>
                                  <td>2</td>
                                  <td>CRP 103</td>
                                  <td>Test CreditBricks Society</td>
                                  <td>Open</td>
                                  <td>2 Wheeler</td>
                                  <td>Allocated</td>
                                  <td><Dropdown >
                                    <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                      Action
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item><Link to={``}>Edit</Link></Dropdown.Item>
                                      <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown></td>
                                </tr>
                              </tbody>
                            </table>
                            {/* N/A */}

                          </Card.Body>
                        </Card>



                      </div>
                    </Tab>
                    <Tab eventKey="Loan" title="Loan">
                      <div className="tabs-menu-body main-content-body-right">

                        <Card className='m-3 mb-5'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Loan</h5>


                            <div className="table-responsive ">
                              <DataTableExtensions {...loanTableData}>
                                <DataTable
                                  columns={loanColumns}
                                  data={loanData}
                                  pagination


                                />
                              </DataTableExtensions>
                            </div>
                            {/* N/A */}

                          </Card.Body>
                        </Card>



                      </div>

                    </Tab>
                    <Tab eventKey="Accounts" title="Accounts">

                    </Tab>


                    <Tab eventKey="Applications" title="Applications">
                      <div className="tabs-menu-body main-content-body-right">

                        <Card className='m-3 mb-5'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Applications</h5>
                            <div className="table-responsive ">
                              <DataTableExtensions {...applicationTableData}>
                                <DataTable
                                  columns={applicationColumns}
                                  data={applicationData}
                                  pagination


                                />
                              </DataTableExtensions>
                            </div>

                          </Card.Body>
                        </Card>



                      </div>
                    </Tab>

                    <Tab eventKey="Complaints" title="Complaints">
                      <div className="tabs-menu-body main-content-body-right">

                        <Card className='m-3 mb-5'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Complaints</h5>

                            {/* <table className='table'>
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Complaints Number</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>CS-0005</td>
                              <td><Dropdown >
                                <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                  Action
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item><Link to={``}>Edit</Link></Dropdown.Item>
                                  <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown></td>
                            </tr>

                          </tbody>
                        </table> */}
                            <div className="table-responsive ">
                              <DataTableExtensions {...tableData}>
                                <DataTable
                                  columns={complaintColumns}
                                  data={complaintData}
                                  pagination


                                />
                              </DataTableExtensions>
                            </div>
                            {/* N/A */}

                          </Card.Body>
                        </Card>



                      </div>
                    </Tab>

                    <Tab eventKey="Transfer Property" title={<Link state={true} to={`${import.meta.env.BASE_URL}property/editpropertymaster/${identifier}`} className='p-0' >Transfer Property</Link>}>

                    </Tab>

                    <Tab eventKey="Documents" title="Documents">
                      <div className="tabs-menu-body main-content-body-right">
                        <Card className='m-3'>
                          <Card.Body className='p-3'>
                            <Col sm={12} className='propertydocument mt-2 mb-3 p-0'>
                              <Row>

                                <Col sm={4} className='pt-1'>Owner : <strong>Kunalpal</strong>
                                </Col>
                                <Col sm={8}>
                                  <button type="button" className="btn btn-primary float-end" onClick={() => viewDemoShow("documentstatus")}>Document Status</button>
                                </Col>
                                <Modal show={documentstatus} centered>

                                  <Modal.Header>
                                    <Modal.Title>Document Status</Modal.Title>
                                    <Button variant="" className="btn-close" onClick={() => viewDemoClose("documentstatus")}>
                                      x
                                    </Button>
                                  </Modal.Header>
                                  <Modal.Body className='p-4'>
                                    <Row>

                                      <Col xl={12}>
                                        <Form.Group className="form-group">
                                          <Form.Label>Flat Agreement Copy Submitted </Form.Label>
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
                                          <Form.Label>Index 2/Flat Registration Certificate Submitted</Form.Label>
                                          <Row>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="Yes" name="flatregistration" />
                                            </Col>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="No" name="flatregistration" />
                                            </Col>

                                          </Row>
                                        </Form.Group>
                                      </Col>


                                      <Col xl={12}>
                                        <Form.Group className="form-group">
                                          <Form.Label>Home Loan Sanction Letter Submitted</Form.Label>
                                          <Row>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="Yes" name="homeloansanction" />
                                            </Col>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="No" name="homeloansanction" />
                                            </Col>

                                          </Row>
                                        </Form.Group>
                                      </Col>

                                      <Col xl={12}>
                                        <Form.Group className="form-group">
                                          <Form.Label>Home Loan Closure Letter Submitted </Form.Label>
                                          <Row>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="Yes" name="homeloanclosure" />
                                            </Col>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="No" name="homeloanclosure" />
                                            </Col>

                                          </Row>
                                        </Form.Group>
                                      </Col>





                                    </Row>

                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="default" onClick={() => viewDemoClose("documentstatus")}>
                                      Close
                                    </Button>
                                    <button className="btn btn-primary" type="submit">Save</button>
                                  </Modal.Footer>

                                </Modal>
                              </Row>
                            </Col>

                            <Row>
                              <Col xl={12}>
                                <table className='table table-border table-striped border document_property_table'>
                                  <thead>
                                    <tr>
                                      <th>S.No</th>
                                      <th>Document Name</th>
                                      <th>File Name</th>
                                      <th>File Type</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>1</td>
                                      <td>Flat Agreement Copy</td>
                                      <td>PropertyA_Flatagreement.pdf</td>
                                      <td><img src={imagesData('pdficon')} className='document_img' /> </td>
                                      <td>
                                        <Dropdown >
                                          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                            Action
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { viewDemoShow("documentview"); }}>View </Dropdown.Item>
                                            <Dropdown.Item>Download</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>2</td>
                                      <td>Index 2/Flat Registration Certificate</td>
                                      <td>PropertyA_index.pdf</td>
                                      <td><img src={imagesData('pdficon')} className='document_img' /> </td>
                                      <td>
                                        <Dropdown >
                                          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                            Action
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { viewDemoShow("documentview"); }}>View </Dropdown.Item>
                                            <Dropdown.Item>Download</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>3</td>
                                      <td>Home Loan Sanction Letter</td>
                                      <td>PropertyA_HomeLoan.pdf</td>
                                      <td><img src={imagesData('pdficon')} className='document_img' /> </td>
                                      <td>
                                        <Dropdown >
                                          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                            Action
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { viewDemoShow("documentview"); }}>View </Dropdown.Item>
                                            <Dropdown.Item>Download</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>4</td>
                                      <td>Home Loan Closure Letter</td>
                                      <td>PropertyA_HomeLoanClosure.pdf</td>
                                      <td><img src={imagesData('pdficon')} className='document_img' /> </td>
                                      <td>
                                        <Dropdown >
                                          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                            Action
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { viewDemoShow("documentview"); }}>View </Dropdown.Item>
                                            <Dropdown.Item>Download</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </td>
                                    </tr>

                                  </tbody>
                                </table>

                              </Col>

                            </Row>
                          </Card.Body></Card>

                        <Card className='m-3'>
                          <Card.Body className='p-3'>
                            <Col sm={12} className='propertydocument mt-2 mb-3 p-0'>
                              <Row>

                                <Col sm={4} className='pt-1'>Last Owner : <strong>Rajiv Kumar Singh</strong>
                                </Col>

                                <Modal show={documentstatus} centered>

                                  <Modal.Header>
                                    <Modal.Title>Document Status</Modal.Title>
                                    <Button variant="" className="btn-close" onClick={() => viewDemoClose("documentstatus")}>
                                      x
                                    </Button>
                                  </Modal.Header>
                                  <Modal.Body className='p-4'>
                                    <Row>

                                      <Col xl={12}>
                                        <Form.Group className="form-group">
                                          <Form.Label>Flat Agreement Copy Submitted </Form.Label>
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
                                          <Form.Label>Index 2/Flat Registration Certificate Submitted</Form.Label>
                                          <Row>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="Yes" name="flatregistration" />
                                            </Col>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="No" name="flatregistration" />
                                            </Col>

                                          </Row>
                                        </Form.Group>
                                      </Col>


                                      <Col xl={12}>
                                        <Form.Group className="form-group">
                                          <Form.Label>Home Loan Sanction Letter Submitted</Form.Label>
                                          <Row>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="Yes" name="homeloansanction" />
                                            </Col>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="No" name="homeloansanction" />
                                            </Col>

                                          </Row>
                                        </Form.Group>
                                      </Col>

                                      <Col xl={12}>
                                        <Form.Group className="form-group">
                                          <Form.Label>Home Loan Closure Letter Submitted </Form.Label>
                                          <Row>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="Yes" name="homeloanclosure" />
                                            </Col>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="No" name="homeloanclosure" />
                                            </Col>

                                          </Row>
                                        </Form.Group>
                                      </Col>





                                    </Row>

                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="default" onClick={() => viewDemoClose("documentstatus")}>
                                      Close
                                    </Button>
                                    <button className="btn btn-primary" type="submit">Save</button>
                                  </Modal.Footer>

                                </Modal>
                              </Row>
                            </Col>

                            <Row>
                              <Col xl={12}>
                                <table className='table table-border table-striped border document_property_table'>
                                  <thead>
                                    <tr>
                                      <th>S.No</th>
                                      <th>Document Name</th>
                                      <th>File Name</th>
                                      <th>File Type</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>1</td>
                                      <td>Flat Agreement Copy</td>
                                      <td>PropertyA_Flatagreement.pdf</td>
                                      <td><img src={imagesData('pdficon')} className='document_img' /> </td>
                                      <td>
                                        <Dropdown >
                                          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                            Action
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { viewDemoShow("documentview"); }}>View </Dropdown.Item>
                                            <Dropdown.Item>Download</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>2</td>
                                      <td>Index 2/Flat Registration Certificate</td>
                                      <td>PropertyA_index.pdf</td>
                                      <td><img src={imagesData('pdficon')} className='document_img' /> </td>
                                      <td>
                                        <Dropdown >
                                          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                            Action
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { viewDemoShow("documentview"); }}>View </Dropdown.Item>
                                            <Dropdown.Item>Download</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>3</td>
                                      <td>Home Loan Sanction Letter</td>
                                      <td>PropertyA_HomeLoan.pdf</td>
                                      <td><img src={imagesData('pdficon')} className='document_img' /> </td>
                                      <td>
                                        <Dropdown >
                                          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                            Action
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { viewDemoShow("documentview"); }}>View </Dropdown.Item>
                                            <Dropdown.Item>Download</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>4</td>
                                      <td>Home Loan Closure Letter</td>
                                      <td>PropertyA_HomeLoanClosure.pdf</td>
                                      <td><img src={imagesData('pdficon')} className='document_img' /> </td>
                                      <td>
                                        <Dropdown >
                                          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                            Action
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { viewDemoShow("documentview"); }}>View </Dropdown.Item>
                                            <Dropdown.Item>Download</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </td>
                                    </tr>

                                  </tbody>
                                </table>

                              </Col>

                            </Row>
                          </Card.Body></Card>

                        <Card className='m-3'>
                          <Card.Body className='p-3'>
                            <Col sm={12} className='propertydocument mt-2 mb-3 p-0'>
                              <Row>

                                <Col sm={4} className='pt-1'>Third Owner : <strong>Prateek Sharma</strong>
                                </Col>

                                <Modal show={documentstatus} centered>

                                  <Modal.Header>
                                    <Modal.Title>Document Status</Modal.Title>
                                    <Button variant="" className="btn-close" onClick={() => viewDemoClose("documentstatus")}>
                                      x
                                    </Button>
                                  </Modal.Header>
                                  <Modal.Body className='p-4'>
                                    <Row>

                                      <Col xl={12}>
                                        <Form.Group className="form-group">
                                          <Form.Label>Flat Agreement Copy Submitted </Form.Label>
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
                                          <Form.Label>Index 2/Flat Registration Certificate Submitted</Form.Label>
                                          <Row>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="Yes" name="flatregistration" />
                                            </Col>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="No" name="flatregistration" />
                                            </Col>

                                          </Row>
                                        </Form.Group>
                                      </Col>


                                      <Col xl={12}>
                                        <Form.Group className="form-group">
                                          <Form.Label>Home Loan Sanction Letter Submitted</Form.Label>
                                          <Row>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="Yes" name="homeloansanction" />
                                            </Col>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="No" name="homeloansanction" />
                                            </Col>

                                          </Row>
                                        </Form.Group>
                                      </Col>

                                      <Col xl={12}>
                                        <Form.Group className="form-group">
                                          <Form.Label>Home Loan Closure Letter Submitted </Form.Label>
                                          <Row>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="Yes" name="homeloanclosure" />
                                            </Col>
                                            <Col lg={3}>

                                              <Form.Check type="radio" label="No" name="homeloanclosure" />
                                            </Col>

                                          </Row>
                                        </Form.Group>
                                      </Col>





                                    </Row>

                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="default" onClick={() => viewDemoClose("documentstatus")}>
                                      Close
                                    </Button>
                                    <button className="btn btn-primary" type="submit">Save</button>
                                  </Modal.Footer>

                                </Modal>
                              </Row>
                            </Col>

                            <Row>
                              <Col xl={12}>
                                <table className='table table-border table-striped border document_property_table'>
                                  <thead>
                                    <tr>
                                      <th>S.No</th>
                                      <th>Document Name</th>
                                      <th>File Name</th>
                                      <th>File Type</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>1</td>
                                      <td>Flat Agreement Copy</td>
                                      <td>PropertyA_Flatagreement.pdf</td>
                                      <td><img src={imagesData('pdficon')} className='document_img' /> </td>
                                      <td>
                                        <Dropdown >
                                          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                            Action
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { viewDemoShow("documentview"); }}>View </Dropdown.Item>
                                            <Dropdown.Item>Download</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>2</td>
                                      <td>Index 2/Flat Registration Certificate</td>
                                      <td>PropertyA_index.pdf</td>
                                      <td><img src={imagesData('pdficon')} className='document_img' /> </td>
                                      <td>
                                        <Dropdown >
                                          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                            Action
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { viewDemoShow("documentview"); }}>View </Dropdown.Item>
                                            <Dropdown.Item>Download</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>3</td>
                                      <td>Home Loan Sanction Letter</td>
                                      <td>PropertyA_HomeLoan.pdf</td>
                                      <td><img src={imagesData('pdficon')} className='document_img' /> </td>
                                      <td>
                                        <Dropdown >
                                          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                            Action
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { viewDemoShow("documentview"); }}>View </Dropdown.Item>
                                            <Dropdown.Item>Download</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>4</td>
                                      <td>Home Loan Closure Letter</td>
                                      <td>PropertyA_HomeLoanClosure.pdf</td>
                                      <td><img src={imagesData('pdficon')} className='document_img' /> </td>
                                      <td>
                                        <Dropdown >
                                          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                            Action
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { viewDemoShow("documentview"); }}>View </Dropdown.Item>
                                            <Dropdown.Item>Download</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </td>
                                    </tr>

                                  </tbody>
                                </table>

                              </Col>

                            </Row>
                          </Card.Body></Card>
                      </div>
                    </Tab>

                  </Tabs>
                </div>
              </div>
            </Col>


          </Row>
          {
            singleLoandata && addloans && <LoanModal show={addloans} onClose={handleLoanClose} editing={true} initialVals={singleLoandata} onSave={handleLoanSubmit} />
          }
          {
            viewloan && singleLoandata && <LoanViewModal show={viewloan} onClose={handleLoanViewClose} initialVals={singleLoandata} />
          }
          {
            singleComplaintData && addcomplaint && <ComplaintModal show={addcomplaint} onClose={handleComplaintClose} editing={true} initialVals={singleComplaintData} onSave={handleComplaintSubmit} />
          }
          {
            viewcomplaint && singleComplaintData && <ComplaintViewModal show={viewcomplaint} onClose={handleComplaintViewClose} initialVals={singleComplaintData} onSave={handleComplaintStatusUpdate} />
          }
          {
            addgatepass && singleGatePassData && <GatePassModal show={addgatepass} initialVals={singleGatePassData} onSave={handleGatePassSave} onClose={handleGatePassClose} editing={true} />
          }
          {addflateresale && singleFlatResaleData && <FlatResaleModal show={addflateresale} initialVals={singleFlatResaleData} onSave={handleFlatResaleSave} onClose={handleFlatResaleClose} editing={true} />}

          {
            flatresaleview && <FlatResaleModal show={flatresaleview} initialVals={singleFlatResaleData} onClose={handleFlatResaleViewClose} editing={false} />
          }
          {addcelebration && singleCelebrationData && <EventModal show={addcelebration} initialVals={singleCelebrationData} onSave={handleEventSave} onClose={handleCelebrationClose} editing={true} name="Celebration" modal="addcelebration" />}
          {
            celebrationview && <EventModal show={celebrationview} initialVals={singleCelebrationData} onClose={handleCelebrationViewClose} editing={false} name="Celebration" modal="addcelebration" />
          }
          {addbanquethall && singleBanquetHallData && <EventModal show={addbanquethall} onClose={handleBanquetClose} editing={true} initialVals={singleBanquetHallData} onSave={handleEventSave} eventVenue="Banquet Hall" name="Banquet Hall" modal="addbanquethall" />}

          {
            banquethallview && <EventModal show={banquethallview} initialVals={singleBanquetHallData} onClose={handleBanquetHallViewClose} editing={false} name="Banquet Hall" modal="addbanquethall" />
          }
          {addclubhouse && singleClubhouseData && <EventModal show={addclubhouse} onSave={handleEventSave} onClose={handleClubHouseClose} initialVals={singleClubhouseData} editing={true} eventVenue="Club House" name="Club House" modal="addclubhouse" />}

          {
            clubhouseview && <EventModal show={clubhouseview} initialVals={singleClubhouseData} onClose={handleClubHouseViewClose} editing={false} name="Club House" modal="addclubhouse" />
          }
          {addplayarea && singlePlayAreaData && <EventModal show={addplayarea} modal="addplayarea" initialVals={singlePlayAreaData} onSave={handleEventSave} onClose={handlePlayAreaClose} editing={true} eventVenue="Play Area" name="Play Area" />}

          {
            playareaview && <EventModal show={playareaview} initialVals={singlePlayAreaData} onClose={handlePlayAreaViewClose} editing={false} name="Play Area" modal="addplayarea" />
          }
          {addfoodcourt && singleFoodCourtData && <EventModal modal="addfoodcourt" show={addfoodcourt} onSave={handleEventSave} initialVals={singleFoodCourtData} onClose={handleFoodCourtClose} editing={true} eventVenue="Food Court" name="Food Court" />}

          {
            foodcourtview && <EventModal show={foodcourtview} initialVals={singleFoodCourtData} onClose={handleFoodCourtViewClose} editing={false} name="Food Court" modal="addfoodcourt" />
          }

          {addothers && singleOthersData && <OtherApplicationModal initialVals={singleOthersData} show={addothers} onSave={handleOtherApplicationSave} onClose={handleOtherApplicationClose} editing={true} />}
          {
            otherapplicationview && <OtherApplicationModal show={otherapplicationview} initialVals={singleOthersData} onClose={handleOtherApplicationViewClose} editing={false} />
          }
          <CustomToastContainer />

          {/* Document View */}
          <Modal show={documentview} size="xl" centered>
            <Modal.Header>
              <Modal.Title>Document</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("documentview"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>

              <iframe className='iframeDocument'
                src={imagesData('pdfinvoice')}  >
              </iframe>
            </Modal.Body>

          </Modal>

          <Modal show={gatepassview} size='xl' centered>
            <Modal.Header>
              <Modal.Title>Gate Pass Details</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("gatepassview"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>
              <Tabs
                defaultActiveKey="Tab 01"
                id="uncontrolled-tab-example"
                className="panel-tabs main-nav-line bd-b-"
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

                      <Card className='box-shadow border border-primary mb-0'>
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
              Powered by <img src={imagesData('logo')} className="wd-100p ms-1" />

            </Modal.Body>
          </Modal>

        </Fragment >
      }
    </>
  );
}
