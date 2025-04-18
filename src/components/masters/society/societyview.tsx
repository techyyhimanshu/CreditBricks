
import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card,  Dropdown, Tabs, Tab, FormLabel} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getAnnouncementsOfSocietyApi, getNoticesOfSocietyApi, getSocietyDetailsApi, getTowersOfSocietyApi, getWingsOfSocietyApi } from '../../../api/society-api';
import { CustomToastContainer, showToast } from '../../../common/services/toastServices';
import { deletePropertyApi } from '../../../api/property-api';
import { handleApiError } from '../../../helpers/handle-api-error';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import NoticeModal from '../../../common/modals/noticeModal';
import { deleteNoticeApi, updateNoticeApi } from '../../../api/notice-api';
import NoticeViewModal from '../../../common/modals/noticeViewModal';
import AnnouncementModal from '../../../common/modals/announcementModal';
import AnnouncementViewModal from '../../../common/modals/announcementViewModal';
import { deleteAnnouncementApi, updateAnnouncementApi } from '../../../api/announcement-api';
import WingModal from '../../../common/modals/wingModal';
import { deleteWingApi, updateWingApi } from '../../../api/wing-api';
import TowerModal from '../../../common/modals/towerModal';
import { deleteTowerApi, updateTowerApi } from '../../../api/tower-api';
import TestLoader from '../../../layout/layoutcomponent/testloader';
import ChargeMasterModal from '../../../common/modals/chargeMasterModal';
import { addChargeMasterApi, deleteChargeMasterApi, getChargeDetailsApi, getChargesOfSocietyApi, updateChargeMasterApi } from '../../../api/chargemaster-api';
import ChargeViewModal from '../../../common/modals/chargeViewModal';

export default function SocietyView() {
  const [singleSocietyData, setSingleSocietydata] = useState<any>([])
  const [propertyData, setPropertyData] = useState<any>([])
  const [noticeData, setNoticeData] = useState<any>([])
  const [singleNoticedata, setSingleNoticeData] = useState<any>(null);
  const [singleWingdata, setSingleWingData] = useState<any>(null);
  const [singleTowerdata, setSingleTowerData] = useState<any>(null);
  const [addnotices, setaddnotices] = useState(false);
  const [addwing, setaddwing] = useState(false);
  const [addtower, setaddtower] = useState(false);
  const [viewnotice, setviewnotice] = useState(false);
  const [announcementData, setAnnouncementData] = useState<any>([])
  const [towerData, setTowerData] = useState<any>([])
  const [wingData, setWingData] = useState<any>([])
  const [singleAnnouncementData, setSingleAnnouncementData] = useState<any>(null);
  const [chargeData, setChargeData] = useState<any>([])
  const [singleChargeData, setSingleChargeData] = useState<any>(null);
  const [addannouncement, setaddannouncement] = useState(false);
  const [viewannouncement, setviewannouncement] = useState(false);
  const [viewcharge, setviewcharge] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams()
  const identifier = params.identifier as string

  const columns = [
    {
      name: 'S.No',
      cell: (_: any, index: number) => index + 1,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Notice Subject',
      cell: (row: any) => (
        <span className='text-info cursor' onClick={() => { viewDemoShow("viewnotice"), setSingleNoticeData(row) }}>{row.noticeSubject}</span>
      ),
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: (row: any) => row.startDate,
      sortable: true,
    },
    {
      name: 'Valid Date',
      selector: (row: any) => row.validDate,
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
              setSingleNoticeData(row);
              viewDemoShow("addnotices")
            }}>Edit</Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleNoticeDelete(row)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];
  const propertyColumns = [
    {
      name: 'S.No.',
      selector: (row: any) => row.sno,
      sortable: true,

    },

    {
      name: 'Property Name',
      cell: (row: any) => (
        <Link to={`${import.meta.env.BASE_URL}property/propertyview/${row.propertyIdentifier}`}
          state={{ propertyData: row }} className='text-info'>{row.propertyName}</Link>
      ),
      sortable: true,
    },
    {
      name: 'Wing',
      selector: (row: any) => row.wingName,
      sortable: true,
    },
    {
      name: 'Member Name',
      cell: (row: any) => (
        <Link to={`${import.meta.env.BASE_URL}members/membersProfile/${row.memberIdentifier}`} className='text-info'>{row.memberName}</Link>
      ),
      sortable: true,
    },
    {
      name: 'Area(sq.ft)',
      selector: (row: any) => row.area,
      sortable: true,
    },
    {
      name: 'Narration',
      selector: (row: any) => row.narration,
      sortable: true,
    },
    {
      name: 'Tenant',
      cell: (row: any) => {
        const tenantName = row.tenantName;
        const tenantIdentifier = row.tenantIdentifier;

        return tenantName ? (
          <Link to={`${import.meta.env.BASE_URL}tenant/tenantview/${tenantIdentifier}`} className='text-info'>
            {tenantName}
          </Link>
        ) : (
          <span>N/A</span>
        );
      },
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
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
            <Dropdown.Item><Link to={`${import.meta.env.BASE_URL}property/editpropertymaster/${row.propertyIdentifier}`}>Edit</Link></Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleDelete(row.propertyIdentifier)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ]
  const announcementColumns = [
    {
      name: 'S.No',
      cell: (_: any, index: number) => index + 1,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Announcement Name',
      cell: (row: any) => {
        return (
          <span className='text-info cursor' onClick={() => { viewDemoShow("viewannouncement"), setSingleAnnouncementData(row) }}>{row.announcementName}</span>
        )
      },
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: (row: any) => row.startDate,
      sortable: true,
    },
    {
      name: 'Valid Date',
      selector: (row: any) => row.validDate,
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
              setSingleAnnouncementData(row);
              viewDemoShow("addannouncement")
            }}>Edit</Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleAnnouncementDelete(row)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];

  const chargeMasterColumns = [
    {
      name: 'S.No',
      cell: (_: any, index: number) => index + 1,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Charge Number',
      selector: (row: any) => row.chargeNumber,
      sortable: true,
    },
    {
      name: 'Charge Name',
      cell: (row: any) => {
        return (
          <span className='text-info cursor' onClick={() => { fetchSingleChargeData(row.chargeNumber, "viewcharge") }}>{row.chargeName}</span>
        )
      },
      sortable: true,
    },
    {
      name: 'Charge Type',
      selector: (row: any) => row.chargeType,
      sortable: true,
    },
    {
      name: 'Charge Master Type',
      selector: (row: any) => row.chargeMasterType,
      sortable: true,
    },
    {
      name: 'Billing Type',
      selector: (row: any) => row.billingType,
      sortable: true,
    },
    {
      name: 'Due Date',
      selector: (row: any) => row.dueDate,
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: (row: any) => row.startDate,
      sortable: true,
    },
    {
      name: 'End Date',
      selector: (row: any) => row.endDate,
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
              setEditing(true)
              fetchSingleChargeData(row.chargeNumber, "addcharge")
            }}>Edit</Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleChargeDelete(row)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];
  const towerColumns = [
    {
      name: 'S.No',
      cell: (_: any, index: number) => index + 1,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Tower Name',
      cell: (row: any) => {
        return (
          <span >{row.towerName}</span>
        )
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
            <Dropdown.Item onClick={() => { setSingleTowerData(row), viewDemoShow("addtower") }}>Edit</Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleTowerDelete(row.towerIdentifier)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];
  const wingColumns = [
    {
      name: 'S.No',
      cell: (_: any, index: number) => index + 1,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Wing Name',
      cell: (row: any) => {
        return (
          <span >{row.wingName}</span>
        )
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
            <Dropdown.Item onClick={() => { setSingleWingData(row), viewDemoShow("addwing") }}>Edit</Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleWingDelete(row)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];

  const tableData = {
    columns,
    data: noticeData
  };
  const propertyTableData = {
    columns: propertyColumns,
    data: propertyData
  };
  const announcementTableData = {
    columns: announcementColumns,
    data: announcementData
  };
  const towerTableData = {
    columns: towerColumns,
    data: towerData
  };
  const wingTableData = {
    columns: wingColumns,
    data: wingData
  };

  const chargeTableData = {
    columns: chargeMasterColumns,
    data: chargeData
  };

  useEffect(() => {
    if (singleSocietyData?.properties) {
      const formattedData = singleSocietyData?.properties.map((property: any, index: number) => (
        {
          sno: index + 1,
          propertyName: property.propertyName,
          propertyIdentifier: property.propertyIdentifier,
          memberName: `${property?.member?.firstName || ""} ${property?.member?.middleName || ""} ${property?.member?.lastName || ""}`,
          societyName: property.societyName,
          societyIdentifier: property.societyIdentifier,
          tenantName: `${property?.tenant?.firstName || ""} ${property?.tenant?.middleName || ""} ${property?.tenant?.lastName || ""}`,
          tenantIdentifier: property.tenantIdentifier,
          memberIdentifier: property?.member?.memberIdentifier || "",
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

      setPropertyData(formattedData);
    }

  }, [singleSocietyData])

  const fetchSocietyData = async () => {
    try {
      const response = await getSocietyDetailsApi(identifier)
      setSingleSocietydata(response?.data?.data || [])
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }

  const fetchNoticeData = async () => {
    try {
      const response = await getNoticesOfSocietyApi(identifier)
      // setNoticeData(response?.data?.data || [])
      const data = response.data.data
      const formattedData = data.map((notice: any, index: number) => (
        {
          sno: index + 1,
          noticeType: notice.noticeType,
          noticeSubject: notice.noticeSubject,
          message: notice.message,
          startDate: notice.startDate,
          validDate: notice.validDate,
          societyIdentifier: notice?.society?.societyIdentifier,
          societyName: notice?.society?.societyName,
          towerIdentifier: notice?.tower?.towerIdentifier,
          towerName: notice?.tower?.towerName,
          wingIdentifier: notice?.wing?.wingIdentifier,
          wingName: notice?.wing?.wingName,
          propertyIdentifier: notice?.property?.propertyIdentifier,
          propertyName: notice?.property?.propertyName,
          noticeIdentifier: notice.noticeIdentifier,
          noticeFilePath: notice.noticeFilePath
        }
      ));
      setNoticeData(formattedData);
    } catch (error) {

    }
  }
  const fetchTowersData = async () => {
    try {
      const response = await getTowersOfSocietyApi(identifier)
      // setNoticeData(response?.data?.data || [])
      const data = response.data.data
      const formattedData = data.map((notice: any, index: number) => (
        {
          sno: index + 1,
          towerId: notice.towerId,
          towerName: notice.towerName,
          towerIdentifier: notice.towerIdentifier,
          societyIdentifier: notice.societyIdentifier,
          societyName: notice.societyName
        }
      ));
      setTowerData(formattedData);
    } catch (error) {

    }
  }
  const fetchWingsData = async () => {
    try {
      const response = await getWingsOfSocietyApi(identifier)
      // setNoticeData(response?.data?.data || [])
      const data = response.data.data
      const formattedData = data.map((notice: any, index: number) => (
        {
          sno: index + 1,
          wingId: notice?.wingId || "",
          wingIdentifier: notice?.wingIdentifier || "",
          wingName: notice?.wingName || "",
          towerIdentifier: notice?.towerIdentifier || "",
          towerName: notice?.towerName || "",
          societyIdentifier: notice?.societyIdentifier || "",
          societyName: notice?.societyName || "",
          ownerName: notice?.ownerName || ""
        }
      ));
      setWingData(formattedData);
    } catch (error) {

    }
  }
  const fetchAnnouncementData = async () => {
    try {
      const response = await getAnnouncementsOfSocietyApi(identifier)
      // setAnnouncementData(response?.data?.data || [])
      const data = response.data.data
      const formattedData = data.map((announcement: any, index: number) => (
        {
          sno: index + 1,
          announcementName: announcement.announcementName,
          announcementIdentifier: announcement.announcementIdentifier,
          message: announcement.message,
          startDate: announcement.startDate,
          validDate: announcement.validDate,
          societyIdentifier: announcement?.society?.societyIdentifier,
          societyName: announcement?.society?.societyName,
          towerIdentifier: announcement?.tower?.towerIdentifier,
          towerName: announcement?.tower?.towerName,
          wingIdentifier: announcement?.wing?.wingIdentifier,
          wingName: announcement?.wing?.wingName,
          propertyIdentifier: announcement?.property?.propertyIdentifier,
          propertyName: announcement?.property?.propertyName,
          announcementFilePath: announcement?.announcementFilePath
        }
      ));
      setAnnouncementData(formattedData);
    } catch (error) {

    }
  }
  const fetchChargeData = async () => {
    try {
      const response = await getChargesOfSocietyApi(identifier)
      const data = response.data.data
      const formattedData = data.map((charge: any, index: number) => (
        {
          sno: index + 1,
          chargeName: charge.chargeName,
          chargeNumber: charge.chargeNumber,
          chargeType: charge.chargeType,
          chargeMasterType: charge.chargeMasterType,
          billingType: charge.billingType,
          startDate: charge.startDate,
          endDate: charge.endDate,
          dueDate: charge.dueDate,
        }
      ));
      setChargeData(formattedData);
    } catch (error) {

    }
  }

  const fetchSingleChargeData = async (id: string, type: string) => {
    try {
      const response = await getChargeDetailsApi(id)
      const data = response.data.data
      setSingleChargeData(data);
    } catch (error) {

    } finally {
      viewDemoShow(type)
    }
  }

  useEffect(() => {

    if (identifier) {
      fetchSocietyData()
      fetchNoticeData()
      fetchAnnouncementData()
      fetchTowersData()
      fetchWingsData()
      fetchChargeData()
    }
  }, [])

  const [addcharge, setaddcharge] = useState(false);
  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "addcharge":
        setaddcharge(true);
        break;
      case "addnotices":
        setaddnotices(true);
        break;
      case "viewnotice":
        setviewnotice(true);
        break;
      case "addannouncement":
        setaddannouncement(true);
        break;
      case "addwing":
        setaddwing(true);
        break;
      case "addtower":
        setaddtower(true);
        break;
      case "viewannouncement":
        setviewannouncement(true);
        break;
      case "viewcharge":
        setviewcharge(true);
        break;


    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addcharge":
        setaddcharge(false);
        setEditing(false)
        break;

      case "addnotices":
        setaddnotices(false);
        break;
      case "addwing":
        setaddwing(false);
        break;
      case "addtower":
        setaddtower(false);
        break;
      case "viewnotice":
        setviewnotice(false);
        break;
      case "addannouncement":
        setaddannouncement(false);
        break;

      case "viewannouncement":
        setviewannouncement(false);
        break;
      case "viewcharge":
        setviewcharge(false);
        setEditing(false)
        break;

    }
  };

  const handleDelete = async (propertyIdentifier: string) => {
    try {
      const response = await deletePropertyApi(propertyIdentifier)
      if (response.status === 200) {
        showToast("success", response.data.message)
      }
    } catch (error: any) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }

  const handleNoticeSubmit = async (values: any) => {
    const formattedData: any = {
      noticeSubject: values.subject,
      societyIdentifier: values.society.value,
      message: values.message,
      startDate: values.startDate,
      validDate: values.validDate,
      noticeType: values.noticeType.value
    }
    if (values?.tower?.value) {
      formattedData.towerIdentifier = values.tower.value
    }
    if (values?.wing?.value) {
      formattedData.wingIdentifier = values.wing.value
    }
    if (values?.property?.value) {
      formattedData.propertyIdentifier = values.property.value
    }

    if (values.file) {
      formattedData.noticeFile = values.file
    }
    try {
      const response = await updateNoticeApi(formattedData, singleNoticedata?.noticeIdentifier)

      if (response.status === 200) {
        viewDemoClose("addnotices");
        showToast("success", response.data.message)
        fetchNoticeData()
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    } finally {
      setSingleNoticeData(null)
    }
    viewDemoClose("addnotices")
  }

  const handleAnnouncementSubmit = async (values: any) => {
    const formattedData: any = {
      announcementName: values.announcementName,
      societyIdentifier: values.society.value,
      message: values.message,
      startDate: values.startDate,
      validDate: values.validDate,
    }

    if (values?.tower?.value) {
      formattedData.towerIdentifier = values.tower.value
    }
    if (values?.wing?.value) {
      formattedData.wingIdentifier = values.wing.value
    }
    if (values?.property?.value) {
      formattedData.propertyIdentifier = values.property.value
    }

    if (values.file) {
      formattedData.announcementFile = values.file
    }
    try {
      const response = await updateAnnouncementApi(formattedData, singleAnnouncementData?.announcementIdentifier)

      if (response.status === 200 || response.status === 201) {
        viewDemoClose("addannouncement")
        showToast("success", response.data.message)
        fetchAnnouncementData()
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    } finally {
      setSingleAnnouncementData(null)
    }
    viewDemoClose("addannouncement")
  }

  const handleWingSubmit = (values: any) => {
    const data = {
      wingName: values.wingName,
      towerIdentifier: values.tower?.value,
      towerName: values.tower?.label,
      societyIdentifier: values.society.value,
      societyName: values.society.label,
    }

      ; (async () => {
        try {
          const response = await updateWingApi(data, singleWingdata.wingIdentifier)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // Update specific tower in the list
            setWingData((prevData: any) =>
              prevData.map((wing: any) =>
                wing.wingIdentifier === singleWingdata.wingIdentifier
                  ? { ...wing, ...data }
                  : wing
              )
            );
            setaddwing(false)
          }
        } catch (error: any) {
          const errorMessage = handleApiError(error);
          showToast("error", errorMessage);
        } finally {
          setaddwing(false)
        }
      })()




  }

  const handleTowerSubmit = (values: any) => {
    const data = {
      towerName: values.towerName,
      ownerName: values.ownerName,
      societyIdentifier: values.society.value,
      societyName: values.society.label,
    }

      ; (async () => {
        try {
          const response = await updateTowerApi(data, singleTowerdata.towerIdentifier)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // Update specific tower in the list
            setTowerData((prevData: any) =>
              prevData.map((tower: any) =>
                tower.towerIdentifier === singleTowerdata.towerIdentifier
                  ? { ...tower, ...data }
                  : tower
              )
            );
            setaddtower(false)
          }
        } catch (error: any) {
          const errorMessage = handleApiError(error);
          showToast("error", errorMessage);
        } finally {
          setaddtower(false)
        }
      })()

  }

  const handleChargeMasterSubmit = async (values: any) => {
    try {

      const keyMapping: any = {
        societyName: 'societyIdentifier',
        tower: 'towerIdentifier',
        wing: 'wingIdentifier',
        property: 'propertyIdentifier',
      };


      const requestBody: any = {};

      Object.keys(values).forEach((key) => {
        const field = values[key];

        if (key === 'interestApplicable') {
          if (field && field.value === 'Yes') {
            requestBody[key] = true;
          } else if (field && field.value === 'No') {
            requestBody[key] = false;
          }
          return;
        }

        if (field && typeof field === 'object' ) {
          if (field.value !== '' && field.value !== null) {
            // requestBody[key] = field.value;
            const newKey = keyMapping[key] || key;
            requestBody[newKey] = field.value;
          }
        } else {
          if (field !== '' && field !== null) {
            requestBody[key] = field;
          }
        }
      });
      let response;
      if (editing) {
        response = await updateChargeMasterApi(requestBody, singleChargeData?.chargeNumber)
      } else {
        response = await addChargeMasterApi(requestBody)
      }
      if (response.status === 200) {
        viewDemoClose("addcharge");
        showToast("success", response.data.message)
        fetchChargeData()
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }

  const handleNoticeClose = () => {
    viewDemoClose("addnotices")
    setSingleNoticeData(null)
  }

  const handleNoticeViewClose = () => {
    viewDemoClose("viewnotice")
    setSingleNoticeData(null)
  }

  const handleChargeViewClose = () => {
    viewDemoClose("viewcharge")
    setSingleChargeData(null)
  }

  const handleAnnouncementClose = () => {
    viewDemoClose("addannouncement")
    setSingleAnnouncementData(null)
  }

  const handleAnnouncementViewClose = () => {
    viewDemoClose("viewannouncement")
    setSingleAnnouncementData(null)
  }

  const handleWingClose = () => {
    viewDemoClose("addwing")
    setSingleWingData(null)
  }
  const handleTowerClose = () => {
    viewDemoClose("addtower")
    setSingleTowerData(null)
  }

  const handleChargeMasterClose = () => {
    viewDemoClose("addcharge")
  }

  const handleNoticeDelete = (row: any) => {
    ; (async () => {
      try {

        const response = await deleteNoticeApi(row.noticeIdentifier)
        if (response.status === 200) {
          showToast("success", response.data.message)
          fetchNoticeData()
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    })()
  }

  // type Row = {
  //   societyIdentifier: string;
  //   sno: number;
  //   societyName: string;
  //   address: string;
  //   country: string;
  //   state: string;
  //   city: string;
  //   registrationNumber: string;
  //   tanNumber: string;
  //   panNumber: string;
  //   signatory: string;
  //   hsnCode: string;
  //   gstin: string;
  //   bankName: string;
  //   accountNumber: string;
  //   branchName: string;
  //   ifscCode: string;
  //   chequeFavourable: string;
  // };

  const handleWingDelete = (data: any) => {
    ; (async () => {
      try {
        const response = await deleteWingApi(data.wingIdentifier)
        if (response.status === 200) {
          showToast("success", response.data.message)
          // Remove the tower from the table
          setWingData((prevData: any) => prevData.filter((wing: any) => wing.wingIdentifier !== data.wingIdentifier))
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    })()
  }

  const handleTowerDelete = (towerIdentifier: string) => {
    ; (async () => {
      try {
        const response = await deleteTowerApi(towerIdentifier)
        if (response.status === 200) {
          showToast("success", response.data.message)
          // Remove the tower from the table
          setTowerData((prevData: any) => prevData.filter((tower: any) => tower.towerIdentifier !== towerIdentifier))
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    })()
  }

  const handleAnnouncementDelete = (row: any) => {
    ; (async () => {
      try {

        const response = await deleteAnnouncementApi(row.announcementIdentifier)
        if (response.status === 200) {
          showToast("success", response.data.message)
          fetchAnnouncementData()
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    })()
  }

  const handleChargeDelete = (row: any) => {
    ; (async () => {
      try {

        const response = await deleteChargeMasterApi(row.chargeNumber)
        if (response.status === 200) {
          showToast("success", response.data.message)
          fetchChargeData()
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    })()
  }


  return (
    <>
      {
        isLoading ? <TestLoader /> :
          <Fragment>
            <div className="breadcrumb-header justify-content-between">
              <div className="left-content">
                <span className="main-content-title mg-b-0 mg-b-lg-1 text-capitalize"> <Link to={`${import.meta.env.BASE_URL}society/societymaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> {singleSocietyData?.societyName || "N/A"}
                  <Link to={`${import.meta.env.BASE_URL}society/editsocietymaster/${identifier}`} className='tx-16 btn btn-primary ms-2 btn-sm tx-normal ' title="Edit"><i className='bi bi-pencil ms-1'></i></Link></span>
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
                            <Col xl={8}>
                              <Card className='m-3'>
                                <Card.Body>
                                  <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Personal Details</h5>
                                  <Row>
                                    <Col xl={12}>
                                      <FormLabel>Society Name</FormLabel>
                                      <p className='tx-15'>{singleSocietyData?.societyName || "N/A"}</p>
                                    </Col>


                                    <Col xl={4}>
                                      <FormLabel>Society Contact Number</FormLabel>
                                      <p className='tx-15'>{singleSocietyData?.contactNumber || "N/A"}</p>
                                    </Col>

                                    <Col xl={4}>
                                      <FormLabel>Society Email</FormLabel>
                                      <p className='tx-15'>{singleSocietyData?.email || "N/A"}</p>
                                    </Col>

                                    <Col xl={4}>
                                      <FormLabel>Society Manager</FormLabel>
                                      <p className='tx-15'>{singleSocietyData?.societyManager || "N/A"}</p>
                                    </Col>


                                    <Col xl={4}>
                                      <FormLabel>Address</FormLabel>
                                      <p className='tx-15'>{singleSocietyData?.address || "N/A"}</p>
                                    </Col>



                                    <Col xl={4}>
                                      <FormLabel>Country</FormLabel>
                                      <p className='tx-15 col-sm-11 p-0'>{singleSocietyData?.country || "N/A"}</p>
                                    </Col>

                                    <Col xl={4}>
                                      <FormLabel>State</FormLabel>
                                      <p className='tx-1 p-0'>{singleSocietyData?.state || "N/A"}</p>
                                    </Col>

                                    <Col xl={4}>
                                      <FormLabel>City</FormLabel>
                                      <p className='tx-15'>{singleSocietyData?.city || "N/A"}</p>
                                    </Col>

                                    <Col xl={4}>
                                      <FormLabel>Pincode</FormLabel>
                                      <p className='tx-15'>{singleSocietyData?.pincode || "N/A"}</p>
                                    </Col>


                                  </Row>
                                </Card.Body>
                              </Card>

                              <Card className='m-3'>
                                <Card.Body>
                                  <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Interest Details</h5>
                                  <Row>
                                    <Col xl={4}>
                                      <FormLabel>Interest Calculation Type</FormLabel>
                                      <p className='tx-15'>{singleSocietyData?.interestCalculationType || "N/A"}</p>
                                    </Col>


                                    <Col xl={4}>
                                      <FormLabel>Annual Rate of Interest</FormLabel>
                                      <p className='tx-15'>{singleSocietyData?.annualRateOfInterest || "N/A"}</p>
                                    </Col>

                                    <Col xl={4}>
                                      <FormLabel>Rate of Interest</FormLabel>
                                      <p className='tx-15'>{singleSocietyData?.rateOfInterest || "N/A"}</p>
                                    </Col>


                                  </Row>
                                </Card.Body>
                              </Card>

                              <Card className='m-3'>
                                <Card.Body>
                                  <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">List of Committee Members</h5>

                                  <table className='table mt-3'>
                                    <thead>
                                      <tr>
                                        <th>S.no.</th>
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
                                        <td className='align-top'>1</td>
                                        <td className='align-top'>Association</td>
                                        <td className='align-top'>Tower A</td>
                                        <td className='align-top'>A</td>
                                        <td className='align-top'>123</td>
                                        <td>Sandeep Singh<br /><span className='text-muted'>9876543212</span></td>
                                        <td className='align-top'>Secretary</td>
                                        <td className='align-top'>Flat Resale</td>
                                      </tr>
                                      <tr>
                                        <td className='align-top'>2</td>
                                        <td className='align-top'>Association</td>
                                        <td className='align-top'>Tower A</td>
                                        <td className='align-top'>A</td>
                                        <td className='align-top'>123</td>
                                        <td>Sandeep Singh<br /><span className='text-muted'>9876543212</span></td>
                                        <td className='align-top'>Secretary</td>
                                        <td className='align-top'>Flat Resale</td>
                                      </tr>
                                      <tr>
                                        <td className='align-top'>3</td>
                                        <td className='align-top'>Association</td>
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
                            <Col xl={4} className='p-0 pe-3'>


                              <Card className='mt-3'>
                                <Card.Body>
                                  <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Society Document Details</h5>
                                  <Row>
                                    <Col xl={5} className='mb-1 tx-12'>Registration Number</Col>
                                    <Col xl={7} className='tx-semibold mb-2 tx-14 text-primary'>{singleSocietyData?.registrationNumber || "N/A"}</Col>
                                    <Col xl={5} className='mb-1 tx-12'>TAN number</Col>
                                    <Col xl={7} className='tx-semibold tx-12'>{singleSocietyData?.tanNumber || "N/A"}</Col>
                                    <Col xl={5} className='mb-1 tx-12'>PAN No</Col>
                                    <Col xl={7} className='tx-semibold tx-12'>{singleSocietyData?.panNumber || "N/A"}</Col>
                                    <Col xl={5} className='mb-1 tx-12'>Signatory</Col>
                                    <Col xl={7} className='tx-semibold tx-12'>{singleSocietyData?.signatory || "N/A"}</Col>
                                    <Col xl={5} className='mb-1 tx-12'>HSN Code</Col>
                                    <Col xl={7} className='tx-semibold tx-12'>{singleSocietyData?.hsnCode || "N/A"}</Col>
                                    <Col xl={5} className='mb-1 tx-12'>GSTIN</Col>
                                    <Col xl={7} className='tx-semibold tx-12'>{singleSocietyData?.gstin || "N/A"}</Col>
                                  </Row>
                                </Card.Body>
                              </Card>



                              <Card>
                                <Card.Body>
                                  <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Society Accounts Details</h5>
                                  {/* <Row>
                              <Col xl={5} className='mb-1 tx-12'>Society Bank Name</Col>
                              <Col xl={7} className='tx-semibold tx-12'>Union Bank of India</Col>
                              <Col xl={5} className='mb-1 tx-12'>Account Number</Col>
                              <Col xl={7} className='tx-semibold tx-12'>532463874983753975</Col>
                              <Col xl={5} className='mb-1 tx-12'>Branch Name</Col>
                              <Col xl={7} className='tx-semibold tx-12'>-</Col>
                              <Col xl={5} className='mb-1 tx-12 '>IFSC Code</Col>
                              <Col xl={7} className='tx-semibold tx-12'>UBIN0826812</Col>
                              <Col xl={5} className='mb-1 tx-12'>Cheque Favourable</Col>
                              <Col xl={7} className='tx-semibold tx-12'>Mohan Areca Co Op HSG Soc Ltd</Col>
                              <Col xl={12} className='mt-2 tx-12'>
                                <img src='https://static.wixstatic.com/media/794e6d_d0eb1012228446ba8436ac24a1f5ad00~mv2.jpeg/v1/fill/w_440,h_380,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/Union%20Bank%20QR%20Code.jpeg' />
                              </Col>
                            </Row> */}
                                  {singleSocietyData?.accountDetails?.length > 0 ? (
                                    singleSocietyData?.accountDetails.map((account: any, index: number) => (
                                      <div key={account.accountId}>
                                        <Row className="mt-2">
                                          {/* Bank Name */}
                                          <Col xl={5} className='mb-1 tx-12'>Society Bank Name</Col>
                                          <Col xl={7} className='tx-semibold tx-12'>
                                            {account?.bankName || "N/A"}
                                          </Col>
                                        </Row>

                                        <Row className="mt-2">
                                          {/* Account Number */}
                                          <Col xl={5} className='mb-1 tx-12'>Account Number</Col>
                                          <Col xl={7} className='tx-semibold tx-12'>
                                            {account?.accountNumber || "N/A"}
                                          </Col>
                                        </Row>

                                        <Row className="mt-2">
                                          {/* Branch Name */}
                                          <Col xl={5} className='mb-1 tx-12'>Branch Name</Col>
                                          <Col xl={7} className='tx-semibold tx-12'>
                                            {account?.branchName || "N/A"}
                                          </Col>
                                        </Row>

                                        <Row className="mt-2">
                                          {/* IFSC Code */}
                                          <Col xl={5} className='mb-1 tx-12 '>IFSC Code</Col>
                                          <Col xl={7} className='tx-semibold tx-12'>
                                            {account?.ifscCode || "N/A"}
                                          </Col>
                                        </Row>

                                        <Row className="mt-2">
                                          {/* Cheque Favourable */}
                                          <Col xl={5} className='mb-1 tx-12'>Cheque Favourable</Col>
                                          <Col xl={7} className='tx-semibold tx-12'>
                                            {account?.chequeFavourable || "N/A"}
                                          </Col>
                                        </Row>

                                        <Row className="mt-2">
                                          {/* QR Code Image */}
                                          <Col xl={5} className='mb-1 tx-12'>Society Payment QR Code</Col>
                                          <Col xl={6} className='mt-2 tx-12'>

                                            <img crossOrigin="anonymous" src={account?.paymentQrPath ? import.meta.env.VITE_STATIC_PATH + account?.paymentQrPath : 'https://static.wixstatic.com/media/794e6d_d0eb1012228446ba8436ac24a1f5ad00~mv2.jpeg/v1/fill/w_440,h_380,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/Union%20Bank%20QR%20Code.jpeg'} alt="QR Code" />
                                          </Col>
                                        </Row>

                                        {/* Add a little space between the accounts */}
                                        {index < singleSocietyData.accountDetails.length - 1 && <hr />}
                                      </div>
                                    ))
                                  ) : (
                                    <p>No account details available.</p>
                                  )}
                                </Card.Body>
                              </Card>

                              <Card>
                                <Card.Body>
                                  <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Terms and Conditions</h5>
                                  <Row>
                                    <Col xl={12} className='mb-1 tx-12 text-justify'><ol className='ps-2'><li className='mb-1'>Interest will be charged at 1.75% p.m. after the due date.</li>
                                      <li className='mb-1'>The cheque should be drawn in favor of CreditBricks Society. </li>
                                      <li className='mb-1'>No claim in respect of this bill will be entertained unless notified in writing within 10 days from the date of this bill.</li>
                                      <li className='mb-1'>If the dues are not cleared within 90 days, then the member shall be termed as a defaulter, and appropriate action will be taken by the society against the defaulters as per the Bylaws</li>
                                      <li className='mb-1'>In case of no response on the payment for a prolonged period the membership from the society can be terminated and expulsion procedure can be initiated.</li> <li>The penalty charges do not create any right in your favor.</li>
                                      <li className='mb-1'>Society reserves the right to enhance the penalty in case of continuing default and misuse.</li></ol></Col>

                                  </Row>

                                </Card.Body>
                              </Card>

                            </Col>
                          </Row>

                        </div>
                      </Tab>
                      <Tab eventKey="Properties" title="Properties">
                        <div className="tabs-menu-body main-content-body-right">

                          <Card className='m-3 mb-5'>
                            <Card.Body>
                              <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Properties Details</h5>
                              <div className='p-0 mt-4'>

                                <DataTableExtensions {...propertyTableData}>
                                  <DataTable
                                    columns={propertyColumns}
                                    data={propertyData}
                                    pagination


                                  />
                                </DataTableExtensions>
                              </div>
                            </Card.Body>
                          </Card>



                        </div>
                      </Tab>

                      <Tab eventKey="Parking" title="Parking">
                        <div className="tabs-menu-body main-content-body-right">

                          <Card className='m-3 mb-5'>
                            <Card.Body>
                              <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Parking Details</h5>
                              <div className='p-0 mt-4'>
                                <table className='table'>
                                  <thead>
                                    <tr>
                                      <th>S.No.</th>
                                      <th>Parking Number</th>
                                      <th>Property</th>
                                      <th>Member</th>
                                      <th>Parking Vehicle Type</th>
                                      <th>Status</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>1</td>
                                      <td>CRP 101</td>
                                      <td>CR 101</td>
                                      <td>Tests society Member</td>
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
                                      <td>CR 103</td>
                                      <td>Tests society Member</td>
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
                              </div>
                            </Card.Body>
                          </Card>



                        </div>
                      </Tab>
                      <Tab eventKey="Charge Master" title="Charge Master">
                        <div className="tabs-menu-body main-content-body-right">

                          <Card className='m-3 mb-5'>
                            <Card.Body>
                              <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Charge Master
                                <span className='float-end btn btn-primary btn-sm' onClick={() => viewDemoShow("addcharge")}>+ Charge Master</span>
                              </h5>

                              {/* {
                                <ChargeMasterModal show={addcharge} onClose={handleChargeMasterClose} editing={false} onSave={handleChargeMasterSubmit} />
                              } */}
                              {
                                singleChargeData && addcharge ? <ChargeMasterModal show={addcharge} onClose={handleChargeMasterClose} editing={editing} initialVals={singleChargeData} onSave={handleChargeMasterSubmit} /> : <ChargeMasterModal show={addcharge} onClose={handleChargeMasterClose} editing={editing} onSave={handleChargeMasterSubmit} />
                              }

                              <div className='p-0 mt-4'>
                                <div className="table-responsive ">
                                  <DataTableExtensions {...chargeTableData}>
                                    <DataTable
                                      columns={chargeMasterColumns}
                                      data={chargeData}
                                      pagination


                                    />
                                  </DataTableExtensions>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>



                        </div>

                      </Tab>
                      <Tab eventKey="Accounts" title={<Link to={`${import.meta.env.BASE_URL}accounts/accounts`} className='p-0' >Accounts</Link>} >

                      </Tab>
                      <Tab eventKey="Notices" title="Notices">
                        <div className="tabs-menu-body main-content-body-right">

                          <Card className='m-3 mb-5'>
                            <Card.Body>
                              <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Notices</h5>
                              <div className='p-0 mt-4'>

                                <div className="table-responsive ">
                                  <DataTableExtensions {...tableData}>
                                    <DataTable
                                      columns={columns}
                                      data={noticeData}
                                      pagination


                                    />
                                  </DataTableExtensions>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>



                        </div>
                      </Tab>
                      <Tab eventKey="Annoucements" title="Annoucements">
                        <div className="tabs-menu-body main-content-body-right">

                          <Card className='m-3 mb-5'>
                            <Card.Body>
                              <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Annoucements</h5>
                              <div className='p-0 mt-4'>

                                <div className="table-responsive ">
                                  <DataTableExtensions {...announcementTableData}>
                                    <DataTable
                                      columns={columns}
                                      data={announcementData}
                                      pagination


                                    />
                                  </DataTableExtensions>
                                </div>
                              </div>

                            </Card.Body>
                          </Card>



                        </div>
                      </Tab>

                      <Tab eventKey="Tower" title="Tower">
                        <Card className='m-3 mb-5'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Tower Details</h5>
                            <div className='p-0 mt-4'>
                              <div className="table-responsive ">
                                <DataTableExtensions {...towerTableData}>
                                  <DataTable
                                    columns={towerColumns}
                                    data={towerData}
                                    pagination


                                  />
                                </DataTableExtensions>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Tab>
                      <Tab eventKey="Wing" title="Wing">
                        <Card className='m-3 mb-5'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Wing Details</h5>
                            <div className='p-0 mt-4'>
                              <div className="table-responsive ">
                                <DataTableExtensions {...wingTableData}>
                                  <DataTable
                                    columns={wingColumns}
                                    data={wingData}
                                    pagination


                                  />
                                </DataTableExtensions>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>


                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </Col>

            </Row>
            {
              singleNoticedata && addnotices && <NoticeModal show={addnotices} onClose={handleNoticeClose} editing={true} initialVals={singleNoticedata} onSave={handleNoticeSubmit} />
            }
            {
              viewnotice && singleNoticedata && <NoticeViewModal show={viewnotice} onClose={handleNoticeViewClose} initialVals={singleNoticedata} />
            }
            {
              singleAnnouncementData && addannouncement && <AnnouncementModal show={addannouncement} onClose={handleAnnouncementClose} editing={true} initialVals={singleAnnouncementData} onSave={handleAnnouncementSubmit} />
            }
            {
              viewannouncement && singleAnnouncementData && <AnnouncementViewModal show={viewannouncement} onClose={handleAnnouncementViewClose} initialVals={singleAnnouncementData} />
            }
            {
              viewcharge && singleChargeData && <ChargeViewModal show={viewcharge} onClose={handleChargeViewClose} initialVals={singleChargeData} />
            }
            {
              singleWingdata && addwing && <WingModal show={addwing} onClose={handleWingClose} editing={true} initialVals={singleWingdata} onSave={handleWingSubmit} />
            }

            {
              singleTowerdata && addtower && <TowerModal show={addtower} onClose={handleTowerClose} editing={true} initialVals={singleTowerdata} onSave={handleTowerSubmit} />
            }

            <CustomToastContainer />
          </Fragment >
      }
    </>
  );
}
