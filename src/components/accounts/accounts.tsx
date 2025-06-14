import { Fragment, useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { Col, Row, Card, Modal, Button, Form, Tabs, Tab, Dropdown, ButtonGroup, FormLabel, FormGroup, ProgressBar } from "react-bootstrap";
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { imagesData } from "../../common/commonimages";
import { generateInvoiceApi, getAllInvoicesApi, getAllOnlineSelfPaymentApi, getAllPaymentLogsApi, getAllReceiptsApi } from '../../api/account-api';
import { handleApiError } from '../../helpers/handle-api-error';
import TestLoader from '../../layout/layoutcomponent/testloader';
import { createCashPaymentApi, createChequePaymentApi, createNewOnlineSelfPaymentApi, getInvoicePaymentOutstandingApi, sendOTPApi, verifyPaymentApi } from '../../api/payment-api';
import { showToast, CustomToastContainer } from '../../common/services/toastServices';
import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import { numberToWords } from "amount-to-words";
import { getAllPropertiesForDropdownApi } from '../../api/complaint-api';
import { useSelector } from 'react-redux';
import { RootState } from '../../common/store/store';
import * as Yup from 'yup';
import { getSocietyDetailsApi, getTowersOfSocietyApi, getWingsOfSocietyApi } from '../../api/society-api';
import { getWingsOfTowerApi } from '../../api/tower-api';
import { getPropertiesOfWing } from '../../api/wing-api';
import { getSinglePropertyDetailsApi } from '../../api/property-api';
export default function Accounts() {
  const [accountdata, setAccountdata] = useState<any>([]);
  const [paynow, setpaynow] = useState(false);
  const [cash, setcash] = useState(false);
  const [cheque, setcheque] = useState(false);
  const [otpverify, setotpverify] = useState(false);
  const [sendOTP, setSendOTP] = useState(false);
  const [onlineself, setonlineself] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInvoiceProcessing, setIsInvoiceProcessing] = useState(false);
  const [isInvoicePayment, setIsInvoicePayment] = useState(true);
  const [disabledProcessInvoiceSelectOptions, setDisabledProcessInvoiceSelectOptions] = useState(true);
  const [disabledDueDateField, setDisabledDueDateField] = useState(true);
  const [invoiceToPay, setInvoiceToPay] = useState<any>({})
  const denominationsList = [
    { value: 500, count: 0, total: 0 },
    { value: 200, count: 0, total: 0 },
    { value: 100, count: 0, total: 0 },
    { value: 50, count: 0, total: 0 },
    { value: 20, count: 0, total: 0 },
    { value: 10, count: 0, total: 0 },
    { value: 5, count: 0, total: 0 },
    { value: 2, count: 0, total: 0 },
    { value: 1, count: 0, total: 0 },
  ]
  const [denominations, setDenominations] = useState(denominationsList);
  const [cashview, setcashview] = useState(false);
  const [chequeview, setchequeview] = useState(false);
  const [receiptData, setReceiptData] = useState([]);
  const [mobile, setMobile] = useState('');
  const [receiptDate, setReceiptDate] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  const propertyoption = [
    { value: "1", label: "A101" },
    { value: "2", label: "A102" },
    { value: "3", label: "A103" }
  ];

  const paymentmode = [
    { value: "NEFT", label: "NEFT" },
    { value: "IMPS", label: "IMPS" },
    { value: "Gpay", label: "Gpay" },
    { value: "Phonepe", label: "Phonepe" },
    { value: "CRED", label: "CRED" }
  ];

  const paymenttype = [
    { value: "1", label: "Cash" },
    { value: "2", label: "Cheque" }
  ];

  const invoicetype = [
    { value: "Maintenance", label: "Maintenance" },
    { value: "Additional Bill", label: "Additional Bill" }
  ];

  const propertytype = [
    { value: "All", label: "All" },
    { value: "Sold", label: "Sold" },
    { value: "Unsold", label: "Unsold" },
    { value: "Blocked by Management", label: "Blocked by Management" },
    { value: "Refuge", label: "Refuge" }
  ];

  const societyoption = [
    { value: "1", label: "testname" },
    { value: "2", label: "CreditBricks Pvt Ltd" }
  ];

  const [select, setSelect] = useState(false);
  const [exportshow, setExport] = useState(false);
  const [processinvoice, setprocessinvoice] = useState(false);
  const [unprocessinvoice, setunprocessinvoice] = useState(false);

  const [receiptadd, setReceiptadd] = useState(false);
  const [receiptexportshow, setExportreceipt] = useState(false);
  const [cashViewData, setCashViewData] = useState<any>({});
  const [chequeViewData, setChequeViewData] = useState<any>({});
  const [paymentLogData, setPaymentLogData] = useState<any>([]);
  const [onlineSelfData, setOnlineSelfData] = useState<any>([]);
  const [transactionData, setTransactionData] = useState<any>([]);
  const [towers, setTowers] = useState<any>([]);
  const [wings, setWings] = useState<any>([]);
  const [properties, setProperties] = useState<any>([]);
  const [propertyInfo, setPropertyInfo] = useState<any>({});
  const [interestCalculationStartDate, setInterestCalculationStartDate] = useState<any>("");

  const [invoicePaymentOutstanding, setInvoicePaymentOutstanding] = useState<any>([]);
  const [propertyData, setPropertyData] = useState<any>([]);
  const [filtersss, setFilters] = useState({
    propertyIdentifier: "",
    fromDate: "",
    toDate: "",
    invoiceNumber: "",
    amountInFigures: "",
  });
  const { society } = useSelector((state: RootState) => state.auth)

  const columns = [
    {
      name: 'S.no',
      selector: (row: any) => row.sno,
      sortable: true,
      width: '50px'
    },
    {
      name: 'Name',
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: 'Inv No',
      selector: (row: any) => row.invoiceNumber,
      sortable: true,
    },

    {
      name: 'Property',
      cell: (row: any) => (
        <Link to={`${import.meta.env.BASE_URL}property/propertyview/${row.propertyIdentifier}`} className='text-info'>{row.propertyName || ""}</Link>
      ),
      sortable: true,
    },

    {
      name: 'Inv Type',
      selector: (row: any) => row.type,
      sortable: true,

    },

    {
      name: 'Inv Dt',
      selector: (row: any) => row.invoiceCreatedDate,
      sortable: true,
    },


    {
      name: 'Due Dt',
      selector: (row: any) => row.dueDate,
      sortable: true,
    },

    {
      name: 'Total Amt',
      selector: (row: any) => row.totalAmount,
      sortable: true,
    },

    {
      name: 'Total Paid Amt',
      selector: (row: any) => row.totalPaidAmount,
      sortable: true,
    },

    {
      name: 'Total Outstanding',
      selector: (row: any) => row.totalOutstanding,
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row: any) => (
        <span className={` ${row.status === 'Unpaid' ? 'badge badge-danger' : 'badge badge-success'}`}>
          {row.status}
        </span>
      ),
      sortable: true,

    },

    {
      name: 'Action',
      position: 'fixed',
      sortable: true,
      cell: (row: any) => <Dropdown>
        <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
          Action
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
          {row.status === 'Unpaid' || row.status === 'Partially Paid' ? <Dropdown.Item onClick={() => {
            setIsInvoicePayment(true);
            setInvoiceToPay(row); // this updates the state
            fetchInvoicePaymentOutstanding(row.invoiceNumber); // use row directly
            viewDemoShow("paynow");
          }}>Pay Now</Dropdown.Item> : ""}
          <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    },
  ];
  const columnsReceipt = [
    {
      name: 'S.no',
      selector: (row: any) => row.sno,
      sortable: true,
      width: '50px'
    },
    {
      name: 'Receipt No',
      selector: (row: any) => row.receiptNumber,
      sortable: true,
    },

    {
      name: 'Property',
      cell: (row: any) => (
        <Link to={`${import.meta.env.BASE_URL}property/propertyview/${row.propertyIdentifier}`} className='text-info'>{row.propertyName || ""}</Link>
      ),
      sortable: true,
    },

    {
      name: 'Receipt Type',
      selector: (row: any) => row.receiptType,
      sortable: true,

    },

    {
      name: 'Total Amount Paid',
      selector: (row: any) => row.totalAmountPaid,
      sortable: true,
    },

    {
      name: 'On Account Balance',
      selector: (row: any) => row.onAccountBalance,
      sortable: true,
    },

    {
      name: 'Payment Mode',
      cell: (row: any) => (
        row.paymentMode === "Cash" ?
          <Link to={"#"} onClick={() => {
            setCashViewData(row.cashData);
            viewDemoShow("cashview");
          }} className='text-info'>{row.paymentMode}</Link> :
          <Link to={"#"} onClick={() => {
            setChequeViewData(row.chequeData);
            viewDemoShow("chequeview");
          }} className='text-info'>{row.paymentMode}</Link>
      ),
    },
    {
      name: 'Date',
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: 'Created Date',
      selector: (row: any) => row.createdDate,
      sortable: true,
    },
  ]
  const columnsPaymentLog = [
    {
      name: 'S.no',
      selector: (row: any) => row.sno,
      sortable: true,
      width: '60px'
    },
    {
      name: 'Date',
      selector: (row: any) => row.date,
      sortable: true,
      width: '170px'
    },

    {
      name: 'Property',
      cell: (row: any) => (
        <Link to={`${import.meta.env.BASE_URL}property/propertyview/${row.propertyIdentifier}`} className='text-info'>Property A</Link>
      ),
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row: any) => row.amount,
      sortable: true,
    },

    {
      name: 'Cheque No',
      selector: (row: any) => row.chequeNumber ? row.chequeNumber : "-",
      sortable: true,

    },

    {
      name: 'Payment Method',
      selector: (row: any) => row.paymentMethod,
      sortable: true,
    },

    {
      name: 'Remarks  ',
      selector: (row: any) => "-",
      sortable: true,
    },
    {
      name: 'Status',
      // selector: (row: any) => (
      //   <span className={` ${row.status === 'Pending' ? 'badge badge-warning' : 'badge badge-success'}`}>
      //     {row.status}
      //   </span>
      // ),

      cell: (row: any) => {
        return (
          row.paymentMethod === "Cash" ? <span className={` ${row.status === 'Pending' ? 'badge badge-warning' : 'badge badge-success'}`}>
            {row.status}
          </span> :
            <Dropdown>
              <Dropdown.Toggle variant="" className='p-0'>
                <strong className="text-danger">Uncleared </strong>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="dropdown-item text-success" href="">Cleared </Dropdown.Item>
                <Dropdown.Item className="dropdown-item text-danger" href="">Uncleared</Dropdown.Item><Dropdown.Item className="dropdown-item" href="">Bounce</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>)
      },
      // cell: (row: any) => (
      //   {

      //   }
      //   // <Dropdown>
      //   //   <Dropdown.Toggle variant="" className='p-0'>
      //   //     <strong className="text-danger">Uncleared </strong>
      //   //   </Dropdown.Toggle>
      //   //   <Dropdown.Menu>
      //   //     <Dropdown.Item className="dropdown-item text-success" href="">Cleared </Dropdown.Item>
      //   //     <Dropdown.Item className="dropdown-item text-danger" href="">Uncleared</Dropdown.Item><Dropdown.Item className="dropdown-item" href="">Bounce</Dropdown.Item>
      //   //   </Dropdown.Menu>
      //   // </Dropdown>
      // ),

      sortable: true,
      width: '130px'
    },
    {
      name: 'Action',
      cell: (row: any) => (
        row.status === "Pending" ? <Button type="button" className='btn btn-sm btn-dark' onClick={
          () => {
            setIsInvoicePayment(false);
            setTransactionData(row)
            viewDemoShow("sendOTP");
          }
        }><i className='bo bi-check-circle'></i>&nbsp; Verify</Button> : "-"
      ),
      sortable: true,
      width: '100px'
    }
  ]
  const columnsOnlineSelfPayment = [
    {
      name: 'S.no',
      selector: (row: any) => row.sno,
      sortable: true,
      width: '60px'
    },
    {
      name: 'Society',
      selector: (row: any) => row.societyName,
      sortable: true,
      width: '170px'
    },

    {
      name: 'Date Of Payment',
      selector: (row: any) => row.dateOfPayment,
      sortable: true,
      width: '170px'

    },
    {
      name: 'Payment Mode',
      selector: (row: any) => row.paymentMode,
      sortable: true,
    },
    {
      name: 'Transaction ID',
      selector: (row: any) => row.transactionId,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row: any) => row.amount,
      sortable: true,
    },
    {
      name: 'Bank Name',
      selector: (row: any) => row.bankName ? row.bankName : "-",
      sortable: true,

    },


    {
      name: 'Remarks',
      selector: (row: any) => row.remarks ? row.remarks : "-",
      sortable: true,
    },

    {
      name: 'Payment Status',
      cell: (row: any) => (
        <span className={` 
            ${row.paymentStatus === 'Pending' ? 'badge badge-warning' :
            row.paymentStatus === 'Failure' ? 'badge badge-danger' :
              row.paymentStatus === 'Success' ? 'badge badge-success' :
                'badge badge-success'}
`}>
          {row.paymentStatus}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Receipt  ',
      cell: (row: any) => (<span className='text-info cursor'>View</span>),
      sortable: true,
    },
    {
      name: 'Action',
      width: '90px',
      cell: (row: any) => (
        <Dropdown className='profile-user border-0'>
          <Dropdown.Toggle variant="">
            <strong className="text-danger">Unreceipt </strong>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item className="dropdown-item text-success" href="">Receipt </Dropdown.Item>
            <Dropdown.Item className="dropdown-item text-danger" href="">Unreceipt </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      sortable: true,
    },
  ]
  const propertyOptions = [
    { value: "", label: "All" },
    ...propertyData.map((property: any) => ({
      value: property.propertyIdentifier,
      label: property.propertyName
    }))
  ];
  const propertyOptionsWithoutAll = [
    ...propertyData.map((property: any) => ({
      value: property.propertyIdentifier,
      label: property.propertyName
    }))
  ];
  const tableData = {
    columns,
    data: accountdata
  };

  const receiptTableData = {
    columns: columnsReceipt,
    data: receiptData
  };
  const paymentLogTableData = {
    columns: columnsPaymentLog,
    data: paymentLogData
  };

  const onlineSelfPaymentTableData = {
    columns: columnsOnlineSelfPayment,
    data: onlineSelfData
  };

  const handleCountChange = (index: number, value: number) => {
    const updatedDenominations = [...denominations];

    updatedDenominations[index].count = value;
    updatedDenominations[index].total = updatedDenominations[index].value * value;

    setDenominations(updatedDenominations);
  };

  const calculateGrandTotal = () => {
    return denominations.reduce((total, denomination) => total + denomination.total, 0);
  };

  const handleChange = (element: any, index: number) => {
    const value = element.value.replace(/\D/, ''); // Only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (index < 5 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputsRef.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };


  const handleSendOTP = async () => {
    try {
      if (!mobile || mobile.length < 10) {
        return alert("Please enter a valid mobile number")
      }
      console.log(transactionData);

      const response = await sendOTPApi(mobile, transactionData.invoiceNumber, "", transactionData.chequeNumber, transactionData.amount, transactionData.paymentMethod)
      if (response.status === 200) {
        // setTransactionData(response.data.data)
        showToast("success", "OTP sent successfully")
        viewDemoShow("otpverify");
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)

    }
  }
  // const tableData = {
  //   columns,
  //   data,
  //   receiptcolumns,
  //   receiptdata
  // };

  const fetchInvoicePaymentOutstanding = async (invoiceNumber: string) => {
    try {
      const response = await getInvoicePaymentOutstandingApi(invoiceNumber)
      if (response.status === 200) {
        setInvoicePaymentOutstanding(response.data.data[0])
      }
    }
    catch (error) {
      console.log(error)
      handleApiError(error)
    }
  }
  const fetchAllAccounts = async () => {
    try {
      const response = await getAllInvoicesApi({}, society.value)
      const data = response.data.data
      const formattedData = data.map((account: any, index: number) => (
        {
          sno: index + 1,
          name: account?.name,
          invoiceNumber: account?.invoiceNumber,
          propertyName: account?.property?.propertyName,
          status: account?.status,
          type: account?.type,
          dueDate: account?.dueDate,
          invoiceCreatedDate: account?.invoiceCreatedDate,
          totalAmount: account?.totalAmount,
          totalPaidAmount: account?.totalPaidAmount,
          propertyIdentifier: account.propertyIdentifier,
          totalOutstanding: account?.invoicePaymentOutstanding?.principleOutstanding * 1,
        }

      ));
      setAccountdata(formattedData)
    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAllReceipts = async () => {
    try {

      const response = await getAllReceiptsApi(society.value, {})
      const data = response.data.data
      const formattedData = data.map((reciept: any, index: number) => (
        {
          sno: index + 1,
          receiptNumber: reciept?.receiptNumber,
          propertyIdentifier: reciept?.property?.propertyIdentifier,
          propertyName: reciept?.property?.propertyName,
          receiptType: reciept?.invoice?.type,
          totalAmountPaid: reciept?.paidAmount,
          onAccountBalance: reciept?.currentRemainingAmount,
          paymentMode: reciept?.paymentMode,
          date: reciept?.invoice?.billStartDate,
          createdDate: reciept?.loggedAt,
          cashData: reciept?.cash,
          chequeData: reciept?.cheque,
        }

      ));
      setReceiptData(formattedData)
    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAllPropertiesForDropDown = async () => {
    try {
      const response = await getAllPropertiesForDropdownApi(society.value)
      const data = response.data.data
      setPropertyData(data)
    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAllPaymentLogs = async () => {
    try {
      const response = await getAllPaymentLogsApi(society.value)
      const data = response.data.data
      const formattedData = data.map((paymentLog: any, index: number) => (
        {
          sno: index + 1,
          date: paymentLog?.createdAt,
          amount: paymentLog?.amount,
          chequeNumber: paymentLog?.cheque?.chequeNumber,
          paymentMethod: paymentLog?.paymentMethod,
          status: paymentLog?.paymentStatus,
          invoiceNumber: paymentLog?.invoiceNumber,
          txnId: paymentLog?.txnId,
        }
      ));
      setPaymentLogData(formattedData)

    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTowersOfSociety = async () => {
    try {
      const response = await getTowersOfSocietyApi(society.value)
      const data = response.data.data
      const formattedData = data.map((tower: any) => (
        {
          label: tower.towerName,
          value: tower.towerIdentifier,
        }
      ));
      setTowers(formattedData)

    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchWingsOfTower = async (towerIdentifier: string) => {
    try {
      const response = await getWingsOfTowerApi(towerIdentifier)
      const data = response.data.data
      const formattedData = data.map((wing: any) => (
        {
          label: wing.wingName,
          value: wing.wingIdentifier,
        }
      ));
      setWings(formattedData)

    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }


  const fetchPropertiesOfWings = async (wingIdentifier: string) => {
    try {
      const response = await getPropertiesOfWing(wingIdentifier)
      const data = response.data.data
      const formattedData = data.map((property: any) => (
        {
          label: property.propertyName,
          value: property.propertyIdentifier,
        }
      ));
      setProperties(formattedData)

    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchPropertyInfo = async (towerIdentifier: string) => {
    try {
      const response = await getSinglePropertyDetailsApi(towerIdentifier)
      const data = response.data.data
      let memberName = ""
      data.propertyMembers.forEach((member: any) => {
        if (member.ownership === 1) {
          memberName = member.member.firstName + " " + member.member.middleName + " " + member.member.lastName
        }
      })
      let dueDate = (data.society.interestCalculationStartDate).split("T")[0]
      console.log(dueDate);

      const formattedData = {
        memberName: memberName,
      }
      setPropertyInfo(formattedData)
    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSocietyInfo = async () => {
    try {
      const response = await getSocietyDetailsApi(society.value)
      const data = response.data.data
      let dueDate = (data.interestCalculationStartDate).split("T")[0]
      setInterestCalculationStartDate(dueDate)
    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }
  const fetchAllOnlineSelfPayments = async () => {
    try {
      const response = await getAllOnlineSelfPaymentApi(society.value, {})
      const data = response.data.data
      const formattedData = data.map((paymentLog: any, index: number) => (
        {
          sno: index + 1,
          societyName: paymentLog.property.society.societyName,
          dateOfPayment: paymentLog.dateOfPayment,
          paymentMode: paymentLog.paymentMode,
          transactionId: paymentLog.transactionId,
          amount: paymentLog.amount,
          bankName: paymentLog.bankName,
          paymentStatus: paymentLog.paymentStatus,
          remarks: paymentLog.remarks,
        }
      ));
      setOnlineSelfData(formattedData)

    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleCashSubmit = async (amount: any) => {
    try {
      if (amount > invoicePaymentOutstanding?.totalDueNow * 1) {
        return alert("Amount cannot be greater than outstanding amount")
      }

      if (amount <= 0) {
        return alert("Amount cannot be less than or equal to zero")
      }
      if (!receiptDate) {
        return alert("Please select a valid date")
      }
      if (!mobile || mobile.length < 10) {
        return alert("Please enter a valid mobile number")
      }

      const notesDetails = denominations.reduce((acc: Record<number, number>, curr) => {
        if (curr.count > 0) {
          acc[curr.value] = curr.count;
        }
        return acc;
      }, {} as Record<number, number>);

      console.log(amount, invoiceToPay.invoiceNumber, invoiceToPay.propertyIdentifier, notesDetails, mobile, receiptDate);

      const response = await createCashPaymentApi(amount, invoiceToPay.invoiceNumber, invoiceToPay.propertyIdentifier, notesDetails, mobile, receiptDate)
      if (response.status === 200) {
        setTransactionData(response.data.data)
        viewDemoShow("otpverify");
      }

      // viewDemoShow("otpverify");

    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }
  const handleChequeSubmit = async (values: any) => {
    try {

      if (values.amountInFigures * 1 > invoicePaymentOutstanding?.totalDueNow * 1) {
        return alert("Amount cannot be greater than outstanding amount")
      }
      if (values.amountInFigures <= 0) {
        return alert("Amount cannot be less than or equal to zero")
      }
      setMobile(values.mobile)
      const response = await createChequePaymentApi(invoiceToPay.invoiceNumber,
        values.bankName,
        values.chequeDate,
        values.receiptDate,
        values.chequeReceivedDate,
        values.branchName,
        values.amountInFigures,
        values.amountInWords,
        invoiceToPay.propertyIdentifier,
        values.chequeNumber,
        values.mobile)
      if (response.status === 200) {
        setTransactionData(response.data.data)
        viewDemoShow("otpverify");
      }

    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }

  const handleVerifyPayment = async () => {
    try {
      const joinedOtp = otp.join('');

      if (joinedOtp.length === 6) {
        const response = await verifyPaymentApi(transactionData.invoiceNumber, transactionData.amount, transactionData.createdAt, transactionData.propertyIdentifier, transactionData.txnId, mobile, joinedOtp)
        if (response.status === 200) {
          viewDemoClose("otpverify");
          showToast("success", "Payment verified successfully")
          fetchAllReceipts()
          fetchAllPaymentLogs()
        }
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }

  const handleResendOTP = async () => {
    try {
      console.log(transactionData);

      const response = await sendOTPApi(mobile, transactionData.invoiceNumber, "", transactionData.chequeNumber, transactionData.amount, transactionData.paymentMethod)
      if (response.status === 200) {
        // setTransactionData(response.data.data)
        showToast("success", "OTP sent successfully")
      }


    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }

  }

  useEffect(() => {
    fetchAllAccounts();
    fetchAllPropertiesForDropDown();
    fetchAllReceipts();
    fetchAllPaymentLogs();
    fetchAllOnlineSelfPayments();
  }, [])



  const viewDemoShow = (modal: any) => {
    switch (modal) {

      case "onlineself":
        setonlineself(true);
        setpaynow(false);
        break;

      case "chequeview":
        setchequeview(true);
        break;

      case "cashview":
        setcashview(true);
        break;

      case "paynow":
        setpaynow(true);
        break;

      case "cash":
        setcash(true);
        setpaynow(false);
        break;

      case "cheque":
        setcheque(true);
        setpaynow(false);
        break;

      case "otpverify":
        setotpverify(true);
        setSendOTP(false);
        setcheque(false);
        setpaynow(false);
        setcash(false);
        break;

      case "sendOTP":
        setSendOTP(true);
        setotpverify(false);
        setcheque(false);
        setpaynow(false);
        setcash(false);
        break;

      case "select":
        setSelect(true);
        break;

      case "exportshow":
        setExport(true);
        break;

      case "receiptadd":
        setReceiptadd(true);
        break;

      case "receiptexportshow":
        setExportreceipt(true);
        break;

      case "processinvoice":
        setprocessinvoice(true);
        break;

      case "unprocessinvoice":
        setunprocessinvoice(true);
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {

      case "onlineself":
        setonlineself(false);
        break;

      case "cashview":
        setcashview(false);
        setDenominations([
          { value: 1000, count: 0, total: 0 },
          { value: 500, count: 0, total: 0 },
          { value: 200, count: 0, total: 0 },
          { value: 100, count: 0, total: 0 },
          { value: 50, count: 0, total: 0 },
          { value: 20, count: 0, total: 0 },
          { value: 10, count: 0, total: 0 },
          { value: 5, count: 0, total: 0 },
          { value: 2, count: 0, total: 0 },
          { value: 1, count: 0, total: 0 },
        ])
        break;


      case "select":
        setSelect(false);
        break;

      case "exportshow":
        setExport(false);
        break;

      case "receiptadd":
        setReceiptadd(false);
        break;

      case "receiptexportshow":
        setExportreceipt(false);
        break;

      case "paynow":
        setpaynow(false);
        break;

      case "cash":
        setcash(false);
        break;

      case "cheque":
        setcheque(false);
        break;

      case "otpverify":
        setotpverify(false);
        break;

      case "sendOTP":
        setSendOTP(false);
        break;

      case "chequeview":
        setchequeview(false);
        break;

      case "processinvoice":
        setprocessinvoice(false);
        break;

      case "unprocessinvoice":
        setunprocessinvoice(false);
        break;


    }
  };
  const handleReceiptSearch = async (values: any) => {
    try {
      const filters = {
        ...values, propertyIdentifier: values.property.value
      }
      delete filters.property
      const response = await getAllReceiptsApi(society.value, filters)
      const data = response.data.data
      const formattedData = data.map((reciept: any, index: number) => (
        {
          sno: index + 1,
          receiptNumber: reciept?.receiptNumber,
          propertyIdentifier: reciept?.property?.propertyIdentifier,
          propertyName: reciept?.property?.propertyName,
          receiptType: reciept?.invoice?.type,
          totalAmountPaid: reciept?.paidAmount,
          onAccountBalance: reciept?.currentRemainingAmount,
          paymentMode: reciept?.paymentMode,
          date: reciept?.invoice?.billStartDate,
          createdDate: reciept?.loggedAt,
          cashData: reciept?.cash,
          chequeData: reciept?.cheque,
        }

      ));
      setReceiptData(formattedData)
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }
  }
  const handlePaymentLogSearch = async (values: any) => {
    try {
      const filters = {
        ...values, propertyIdentifier: values.property.value
      }
      delete filters.property
      const response = await getAllPaymentLogsApi(society.value, filters)
      const data = response.data.data
      const formattedData = data.map((paymentLog: any, index: number) => (
        {
          sno: index + 1,
          date: paymentLog?.createdAt,
          amount: paymentLog?.amount,
          chequeNumber: paymentLog?.cheque?.chequeNumber,
          paymentMethod: paymentLog?.paymentMethod,
          status: paymentLog?.paymentStatus,
          invoiceNumber: paymentLog?.invoiceNumber,
          txnId: paymentLog?.txnId,
        }
      ));
      setPaymentLogData(formattedData)
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }
  }
  const handleInvoiceSearch = async (values: any) => {
    try {
      const filters = {
        ...values, propertyIdentifier: values.property.value
      }
      delete filters.property
      const response = await getAllInvoicesApi(filters, society.value)
      const data = response.data.data
      const formattedData = data.map((account: any, index: number) => (
        {
          sno: index + 1,
          name: account?.name,
          invoiceNumber: account?.invoiceNumber,
          propertyName: account?.property?.propertyName,
          status: account?.status,
          type: account?.type,
          dueDate: account?.dueDate,
          invoiceCreatedDate: account?.invoiceCreatedDate,
          totalAmount: account?.totalAmount,
          totalPaidAmount: account?.totalPaidAmount,
          propertyIdentifier: account.propertyIdentifier,
          totalOutstanding: account?.invoicePaymentOutstanding?.principleOutstanding * 1 + account?.invoicePaymentOutstanding?.interestOutstanding * 1,
        }

      ));
      setAccountdata(formattedData)
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }
  }
  const handleProcessInvoice = async (values: any) => {
    try {

      const filters = {
        societyIdentifier: society.value,
        invoiceType: values.invoiceType.value,
        propertyStatus: values.propertyStatus.value,
        invoiceProcessType: values.invoiceProcessType,
        propertyIdentifier: values.property.value,
        fromDate: values.fromDate,
        toDate: values.toDate,
        dueDate: values.dueDate ? values.dueDate : values.dueDate2,
      }
      setIsInvoiceProcessing(true)
      const response = await generateInvoiceApi(filters)
      if (response.status === 200) {
        setIsInvoiceProcessing(false);
        viewDemoClose("processinvoice");
        fetchAllAccounts();
        showToast("success", "Invoice processed successfully")
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }

  }
  const handleOnlineSelfSubmit = async (values: any) => {
    try {
      if (values.amount * 1 <= 0) {
        return alert("Amount cannot be less than or equal to zero")
      }

      if (values.amount * 1 > invoicePaymentOutstanding.totalDueNow * 1) {
        return alert("Amount cannot be greater than outstanding amount")
      }
      console.log(values);

      const formattedData = {
        propertyIdentifier: invoiceToPay.propertyIdentifier,
        dateOfPayment: values.dateOfPayment,
        paymentMode: values.paymentMode.value,
        transactionId: values.transactionId,
        amount: values.amount,
        bankName: values.bankName,
        remarks: values.remarks,
        paymentFile: values.paymentFile,
        invoiceNumber: invoiceToPay.invoiceNumber
      }
      const response = await createNewOnlineSelfPaymentApi(formattedData)
      if (response.status === 200) {
        showToast("success", "Payment submitted successfully");
        fetchAllOnlineSelfPayments()
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage);
    }

  }
  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Accounts</span>
        </div>

        <div className="right-content">
          <Dropdown>
            <Dropdown.Toggle variant="primary" className=''>
              <i className="bi bi-arrow-clockwise"></i>&nbsp;Invoice Processing
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => { viewDemoShow("processinvoice"); }}>Process Invoice</Dropdown.Item>
              <Dropdown.Item onClick={() => { viewDemoShow("unprocessinvoice"); }}>Unprocess Invoice</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>
      </div>
      {/* Process invoice */}
      <Modal show={processinvoice} size='lg' centered>
        <Formik
          initialValues={{
            invoiceType: { value: "", label: "" },
            propertyStatus: { value: "", label: "" },
            invoiceProcessType: "",
            society: { value: society.value, label: society.label },
            tower: { value: "", label: "" },
            wing: { value: "", label: "" },
            property: { value: "", label: "" },
            fromDate: "",
            toDate: "",
            dueDateSelectionOption: "",
            dueDate: "",
          }} onSubmit={handleProcessInvoice}>
          {({ setFieldValue, values }) => {
            useEffect(() => {
              if (values.invoiceProcessType === "Property") {
                fetchTowersOfSociety()
                setDisabledProcessInvoiceSelectOptions(false);
              } else if (values.invoiceProcessType === "Tower") {
                setTowers([]);
                setDisabledProcessInvoiceSelectOptions(true);

              } else if (values.invoiceProcessType === "Wing") {
                setTowers([]);
                setDisabledProcessInvoiceSelectOptions(true);
              } else {
                setTowers([]);
                setDisabledProcessInvoiceSelectOptions(true);
              }
            }, [values.invoiceProcessType, setFieldValue]);

            useEffect(() => {

              if (values.dueDateSelectionOption === "SocietyWiseDueDate") {
                setDisabledDueDateField(true);
                fetchSocietyInfo()
                setFieldValue("dueDate", interestCalculationStartDate)
              } else if (values.dueDateSelectionOption === "CustomDueDate") {
                setDisabledDueDateField(false);
                setFieldValue("dueDate", "")
              }
            }, [values.dueDateSelectionOption, setFieldValue, interestCalculationStartDate]);
            return (
              <FormikForm>

                <Modal.Header>
                  <Modal.Title>Process Invoice</Modal.Title>
                  <Button variant="" className="btn-close" onClick={() => {
                    setPropertyInfo({})
                    viewDemoClose("processinvoice")
                  }}>
                    x
                  </Button>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col xl={6}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Invoice Type</Form.Label>
                        <Select
                          options={invoicetype}
                          placeholder="Select type"
                          name="invoiceType"
                          value={values.invoiceType}
                          onChange={(option) => setFieldValue("invoiceType", option)}
                          classNamePrefix='Select2'
                          className="multi-select"

                        />
                      </Form.Group>
                    </Col>
                    <Col xl={6}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Property Status</Form.Label>
                        <Select
                          options={propertytype}
                          placeholder="Select"
                          name="propertyStatus"
                          value={values.propertyStatus}
                          onChange={(option) => setFieldValue("propertyStatus", option)}
                          classNamePrefix='Select2'
                          className="multi-select"

                        />
                      </Form.Group>
                    </Col>

                    <Col xl={12}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Choose</Form.Label>
                        <div className="form-control bg-light process_invoice_radio pt-2">
                          <Row>
                            <Col sm={2}>
                              <Form.Check
                                type="radio"
                                label="Society"
                                name="invoiceProcessType"
                                value="Society"
                                onChange={(e) => setFieldValue("invoiceProcessType", e.target.value)}
                                id="invoice-all"
                              />
                            </Col>
                            <Col sm={3}>
                              <Form.Check
                                type="radio"
                                label="Tower"
                                name="invoiceProcessType"
                                value="Tower"
                                onChange={(e) => setFieldValue("invoiceProcessType", e.target.value)}
                                id="invoice-tower"
                              />
                            </Col>
                            <Col sm={3}>
                              <Form.Check
                                type="radio"
                                label="Wing"
                                name="invoiceProcessType"
                                value="Wing"
                                onChange={(e) => setFieldValue("invoiceProcessType", e.target.value)}
                                id="invoice-wing"
                              />
                            </Col>
                            <Col sm={3}>
                              <Form.Check
                                type="radio"
                                label="Property"
                                name="invoiceProcessType"
                                value="Property"
                                onChange={(e) => setFieldValue("invoiceProcessType", e.target.value)}
                                id="invoice-individual"
                              />
                            </Col>
                          </Row>

                        </div>
                      </Form.Group>
                    </Col>


                    <Col xl={6}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Society</Form.Label>
                        <Select
                          placeholder="Select"
                          name="society"
                          value={values.society}
                          onChange={(option) => setFieldValue("society", option)}
                          classNamePrefix='Select2'
                          className="multi-select"
                          isDisabled={true}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={6}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Tower</Form.Label>
                        <Select
                          options={towers}
                          placeholder="Select"
                          name="tower"
                          value={values.tower}
                          onChange={(option) => {
                            fetchWingsOfTower(option?.value as string)
                            setFieldValue("tower", option)
                          }}
                          classNamePrefix='Select2'
                          className="multi-select"
                          isDisabled={disabledProcessInvoiceSelectOptions}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={6}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Wing</Form.Label>
                        <Select
                          options={wings}
                          placeholder="Select"
                          name="wing"
                          value={values.wing}
                          onChange={(option) => {
                            fetchPropertiesOfWings(option?.value as string)
                            setFieldValue("wing", option)
                          }}
                          classNamePrefix='Select2'
                          className="multi-select"
                          isDisabled={disabledProcessInvoiceSelectOptions}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={6}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Property</Form.Label>
                        <Select
                          options={properties}
                          placeholder="Select"
                          name="property"
                          value={values.property}
                          onChange={(option) => {
                            fetchPropertyInfo(option?.value as string)
                            setFieldValue("property", option)
                          }
                          }
                          classNamePrefix='Select2'
                          className="multi-select"
                          isDisabled={disabledProcessInvoiceSelectOptions}
                        />
                      </Form.Group>
                    </Col>

                    <Col xl={6}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Member</Form.Label>
                        <Field type='text' name='member' value={propertyInfo?.memberName} placeholder='Member Name' disabled className='form-control'></Field>
                      </Form.Group>
                    </Col>

                    <Col xl={3}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>From Date</Form.Label>d
                        <Field type='date' name='fromDate' placeholder='dd/mm/yyyy' className='form-control'
                        ></Field>
                      </Form.Group>
                    </Col>

                    <Col xl={3}>
                      <Form.Group className="form-group mb-1">
                        <Form.Label>To Date</Form.Label>
                        <Field type='date' name='toDate' placeholder='dd/mm/yyyy' className='form-control'></Field>
                      </Form.Group>
                    </Col>

                    <Col xl={6}>
                      <Form.Group className="form-group mb-1 tx-semibold">
                        <Form.Label className='mb-2'>Due Date</Form.Label>

                        <Row>
                          <Col sm={5}>

                            <Form.Check
                              type="radio"
                              label="Society wise"
                              name="dueDateSelectionOption"
                              value="SocietyWiseDueDate"
                              onChange={(e) => setFieldValue("dueDateSelectionOption", e.target.value)}
                              id="society-wise"
                            />
                          </Col>
                          <Col sm={5}>

                            <Form.Check
                              type="radio"
                              label="Custom"
                              name="dueDateSelectionOption"
                              value="CustomDueDate"
                              onChange={(e) => setFieldValue("dueDateSelectionOption", e.target.value)}
                              id="custom"
                            />
                          </Col>

                        </Row>
                        {disabledDueDateField ?
                          <Field disabled={disabledDueDateField} type='date' name='dueDate' placeholder='dd/mm/yyyy' className='form-control'></Field> :
                          <Field disabled={disabledDueDateField} type='date' name='dueDate' placeholder='dd/mm/yyyy' className='form-control'></Field>

                        }
                      </Form.Group>
                    </Col>
                    {isInvoiceProcessing &&
                      <Col xl={6}>
                        <p className='tx-semibold tx-16 mb-2 mt-3'> Processing of Invoices</p>
                        <button className="btn btn-light tx-semibold" type="button" disabled>
                          <span className="spinner-border text-info spinner-border-sm align-middle" style={{ width: "2rem", height: "2rem" }} role="status"
                            aria-hidden="true"></span> <span className='ms-2'>Loading...</span>
                        </button>
                      </Col>}

                  </Row>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="default" onClick={() => viewDemoClose("processinvoice")}>
                    Cancel
                  </Button>
                  <button className="btn btn-primary" type="submit">Process</button>
                </Modal.Footer>
              </FormikForm>
            )
          }
          }
        </Formik>
      </Modal>

      {/* Unprocess invoice */}
      <Modal show={unprocessinvoice} size='lg' centered>

        <Modal.Header>
          <Modal.Title>Unprocess Invoice</Modal.Title>
          <Button variant="" className="btn-close" onClick={() => viewDemoClose("unprocessinvoice")}>
            x
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xl={6}>
              <Form.Group className="form-group mb-1">
                <Form.Label>Invoice Type</Form.Label>
                <Select
                  options={invoicetype}
                  placeholder="Select type"
                  name=""
                  classNamePrefix='Select2'
                  className="multi-select"

                />
              </Form.Group>
            </Col>
            <Col xl={6}>
              <Form.Group className="form-group mb-1">
                <Form.Label>Property Status</Form.Label>
                <Select
                  options={propertytype}
                  placeholder="Select"
                  name=""
                  classNamePrefix='Select2'
                  className="multi-select"

                />
              </Form.Group>
            </Col>

            <Col xl={12}>
              <Form.Group className="form-group mb-1">
                <Form.Label>Choose</Form.Label>
                <div className="form-control bg-light process_invoice_radio pt-2">
                  <Row>
                    <Col sm={2}>

                      <Form.Check type="radio" label="Society" name="invoiceprocess" />
                    </Col>
                    <Col sm={3}>

                      <Form.Check type="radio" label="Tower" name="invoiceprocess" />
                    </Col>
                    <Col sm={3}>

                      <Form.Check type="radio" label="Wing" name="invoiceprocess" />
                    </Col>
                    <Col sm={3}>
                      <Form.Check type="radio" checked label="Property" name="invoiceprocess" />
                    </Col>
                  </Row>
                </div>
              </Form.Group>
            </Col>


            <Col xl={6}>
              <Form.Group className="form-group mb-1">
                <Form.Label>Society</Form.Label>
                <Select
                  options={societyoption}
                  placeholder="Select"
                  name=""
                  classNamePrefix='Select2'
                  className="multi-select"

                />
              </Form.Group>
            </Col>

            <Col xl={6}>
              <Form.Group className="form-group mb-1">
                <Form.Label>Tower</Form.Label>
                <Select
                  options={society}
                  placeholder="Select"
                  name=""
                  classNamePrefix='Select2'
                  className="multi-select"

                />
              </Form.Group>
            </Col>

            <Col xl={6}>
              <Form.Group className="form-group mb-1">
                <Form.Label>Wing</Form.Label>
                <Select
                  options={society}
                  placeholder="Select"
                  name=""
                  classNamePrefix='Select2'
                  className="multi-select"

                />
              </Form.Group>
            </Col>

            <Col xl={6}>
              <Form.Group className="form-group">
                <Form.Label>Property</Form.Label>
                <Select
                  options={society}
                  placeholder="Select"
                  name=""
                  classNamePrefix='Select2'
                  className="multi-select"

                />
              </Form.Group>
            </Col>

            <Col xl={6}>
              <Form.Group className="form-group mb-1">
                <Form.Label>Member</Form.Label>
                <Select
                  options={society}
                  placeholder="Select"
                  name=""
                  classNamePrefix='Select2'
                  className="multi-select"

                />
              </Form.Group>
            </Col>
            <Col xl={12}>
              <Row>
                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>From Date</Form.Label>
                    <Form.Control type='date' placeholder='dd/mm/yyyy' className='form-control'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>To Date</Form.Label>
                    <Form.Control type='date' placeholder='dd/mm/yyyy' className='form-control'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type='date' placeholder='dd/mm/yyyy' className='form-control'></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col xl={12}>
              <p className='text-center tx-semibold tx-16 mb-2 mt-3'>Unrocessing of Invoices (23)</p>
              <div className="progress mg-b-20">
                <ProgressBar
                  variant="success"
                  role="progressbar"
                  now={87}
                  animated
                ></ProgressBar>
              </div>
            </Col>

          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={() => viewDemoClose("unprocessinvoice")}>
            Cancel
          </Button>
          <button className="btn btn-primary" type="submit">Unprocess</button>
        </Modal.Footer>

      </Modal>

      <Row>
        <Col xl={12}>
          <Card>
            <Card.Body>
              <Tabs
                defaultActiveKey="Tab 01"
                id="uncontrolled-tab-example"
                className="panel-tabs main-nav-line bd-b-1"
                transition={false}
              >

                <Tab eventKey="Tab 01" title="Invoice">
                  <Formik initialValues={{
                    fromDate: "",
                    toDate: "",
                    property: { value: "", label: "" },
                    invoiceNumber: "",
                    amountInFigures: "",
                  }}
                    onSubmit={handleInvoiceSearch}>
                    {({ setFieldValue, values }) => (
                      <FormikForm>
                        <Row className='bg-light p-2'>
                          <Col xl={2}>
                            <Form.Group className="form-group mb-0">
                              <Form.Label>From <span className="text-danger">*</span></Form.Label>
                              <Field
                                type='date'
                                name="fromDate"
                                className='form-control'
                              ></Field>
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group className="form-group mb-0">
                              <Form.Label>To <span className="text-danger">*</span></Form.Label>
                              <Field
                                type='date'
                                name="toDate"
                                className='form-control'
                              ></Field>
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group className="form-group mb-0">
                              <Form.Label>Property Name<span className="text-danger">*</span></Form.Label>

                              <div className="SlectBox">
                                <Select
                                  options={propertyOptions}
                                  name="property"
                                  placeholder="Select Property"
                                  value={values.property}
                                  // classNamePrefix="selectform"
                                  classNamePrefix='Select2' className="multi-select"
                                  onChange={(selected) => {
                                    setFieldValue("property", selected)
                                  }}
                                />
                              </div>


                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group className="form-group mb-0">
                              <Form.Label>Invoice Number <span className="text-danger">*</span></Form.Label>
                              <Field
                                type='text'
                                name="invoiceNumber"
                                placeholder='Invoice Number'
                                className='form-control'
                              ></Field>
                            </Form.Group>
                          </Col>


                          <Col xl={2}>
                            <Form.Group className="form-group mb-0">
                              <Form.Label>Amount <span className="text-danger">*</span></Form.Label>
                              <Field
                                type='text'
                                name="amountInFigures"
                                placeholder='enter amount'
                                className='form-control'

                              ></Field>
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Label className='mb-4'></Form.Label>
                            <button type="submit" className="btn btn-primary mt-1 me-1" >Search</button>
                            <button type="button" className="btn btn-info mt-1" onClick={() => viewDemoShow("exportshow")}>Import</button>
                            <Modal centered show={exportshow}>
                              <Modal.Header>
                                <Modal.Title>Import</Modal.Title>
                                <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("exportshow"); }}>
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

                                  <div className='upload-data'>
                                    <div><i className='bi bi-file-earmark-text-fill me-1 text-primary'></i> invoice.xls</div>
                                    <div><i className='bi bi-x-circle float-end cursor text-danger'></i></div>
                                  </div>



                                </Form.Group>


                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="default" onClick={() => { viewDemoClose("exportshow"); }}>
                                  Close
                                </Button>
                                <Button variant="primary" onClick={() => { viewDemoClose("exportshow"); }}>
                                  Save
                                </Button>

                              </Modal.Footer>
                            </Modal>
                          </Col>

                        </Row>
                      </FormikForm>
                    )}

                  </Formik>
                  <div className="table-responsive ">
                    <DataTableExtensions {...tableData}>
                      <DataTable
                        columns={columns}
                        data={accountdata}
                        pagination
                        progressPending={isLoading}
                        progressComponent={<TestLoader />}


                      />
                    </DataTableExtensions>
                  </div>
                </Tab>
                <Tab eventKey="Receipt" title="Receipt">
                  <Formik initialValues={{
                    fromDate: "",
                    toDate: "",
                    property: { value: "", label: "" },
                    invoiceNumber: "",
                    amountInFigures: "",
                  }}
                    onSubmit={handleReceiptSearch}>
                    {({ setFieldValue, values }) => (
                      <FormikForm>
                        <Row className='bg-light p-2'>
                          <Col xl={2}>
                            <Form.Group className="form-group mb-0">
                              <Form.Label>From <span className="text-danger">*</span></Form.Label>
                              <Field
                                type='date'
                                name="fromDate"
                                className='form-control'
                              ></Field>
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group className="form-group mb-0">
                              <Form.Label>To <span className="text-danger">*</span></Form.Label>
                              <Field
                                type='date'
                                name="toDate"
                                className='form-control'
                              ></Field>
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group className="form-group mb-0">
                              <Form.Label>Property Name<span className="text-danger">*</span></Form.Label>

                              <div className="SlectBox">
                                <Select
                                  options={propertyOptions}
                                  name="property"
                                  placeholder="Select Property"
                                  value={values.property}
                                  // classNamePrefix="selectform"
                                  classNamePrefix='Select2' className="multi-select"
                                  onChange={(selected) => {
                                    setFieldValue("property", selected)
                                  }}
                                />
                              </div>


                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group className="form-group mb-0">
                              <Form.Label>Invoice Number <span className="text-danger">*</span></Form.Label>
                              <Field
                                type='text'
                                name="invoiceNumber"
                                placeholder='Invoice Number'
                                className='form-control'
                              ></Field>
                            </Form.Group>
                          </Col>


                          <Col xl={2}>
                            <Form.Group className="form-group mb-0">
                              <Form.Label>Amount <span className="text-danger">*</span></Form.Label>
                              <Field
                                type='text'
                                name="amountInFigures"
                                placeholder='enter amount'
                                className='form-control'

                              ></Field>
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Label className='mb-4'></Form.Label>
                            <button type="submit" className="btn btn-primary mt-1 me-1" >Search</button>
                            <button type="button" className="btn btn-info mt-1" onClick={() => viewDemoShow("exportshow")}>Import</button>
                            <Modal centered show={exportshow}>
                              <Modal.Header>
                                <Modal.Title>Import</Modal.Title>
                                <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("exportshow"); }}>
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

                                  <div className='upload-data'>
                                    <div><i className='bi bi-file-earmark-text-fill me-1 text-primary'></i> invoice.xls</div>
                                    <div><i className='bi bi-x-circle float-end cursor text-danger'></i></div>
                                  </div>



                                </Form.Group>


                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="default" onClick={() => { viewDemoClose("exportshow"); }}>
                                  Close
                                </Button>
                                <Button variant="primary" onClick={() => { viewDemoClose("exportshow"); }}>
                                  Save
                                </Button>

                              </Modal.Footer>
                            </Modal>
                          </Col>

                        </Row>
                      </FormikForm>
                    )}

                  </Formik>
                  <div className="table-responsive ">
                    <DataTableExtensions {...receiptTableData}>
                      <DataTable
                        columns={columnsReceipt}
                        data={receiptData}
                        pagination
                        progressPending={isLoading}
                        progressComponent={<TestLoader />}


                      />
                    </DataTableExtensions>
                  </div>
                </Tab>

                <Tab eventKey="Ledger" title="Ledger" className='pt-2'>

                  <Row>
                    <Col xl={4}>
                      <Row>
                        <Col xl={3} className='mt-3 mb-3'>
                          <img src={imagesData('totalinvoice')} className="m-auto d-block" />

                        </Col>
                        <Col xl={9}>
                          <p className='mb-0 mt-3 tx-16'>Total Invoice</p>
                          <strong className='tx-20'><i className='fa fa-rupee'></i> 3500.00</strong><br />
                          <small>Last 24 hours</small>
                        </Col>
                      </Row>
                    </Col>

                    <Col xl={4}>
                      <Row>
                        <Col xl={3} className='mt-3 mb-3'>
                          <img src={imagesData('totalreceipt')} className="m-auto d-block" />

                        </Col>
                        <Col xl={9}>
                          <p className='mb-0 mt-3 tx-16'>Total Receipt</p>
                          <strong className='tx-20'><i className='fa fa-rupee'></i> 2000.00</strong><br />
                          <small>Last 24 hours</small>
                        </Col>
                      </Row>
                    </Col>


                    <Col xl={4}>
                      <Row>
                        <Col xl={3} className='mt-3 mb-3'>
                          <img src={imagesData('totalbalance')} className="m-auto d-block" />

                        </Col>
                        <Col xl={9}>
                          <p className='mb-0 mt-3 tx-16'>Total Balance</p>
                          <strong className='tx-20'><i className='fa fa-rupee'></i> 1500.00</strong><br />
                          <small>Last 24 hours</small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={9}>
                      <h5 className='tx-semibold mt-3'>Transactions</h5>
                    </Col>
                    <Col xl={3}>
                      <ButtonGroup className="ms-2 mt-2 mb-2 w-100 transactionbtn">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant=""
                            aria-expanded="false"
                            aria-haspopup="true"
                            className={`btn btn-light w-100`}
                            data-bs-toggle="dropdown"
                            id="dropdownMenuButton"
                            type="button"
                          >
                            Daily
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            className="dropdown-menu tx-13"
                            style={{ margin: "0px" }}
                          >
                            <Dropdown.Item href="#">
                              Daily
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              Current Week
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              Last Week
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              Current Month
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              Last Month
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              Last Six Month
                            </Dropdown.Item>
                            <Dropdown.Item href="#">
                              Society Data
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </ButtonGroup>
                    </Col>
                  </Row>
                  <table className='table mt-2'>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Particular</th>
                        <th className='text-end'>Debit</th>
                        <th className='text-end'>Credit</th>
                        <th className='text-end'>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td className='tx-bold' >Opening B/L</td>
                        <td></td>
                        <td></td>
                        <td className='text-end tx-bold'>2900.00</td>
                      </tr>
                      <tr>
                        <td>03/Dec/2024</td>
                        <td>Electricity Charges</td>
                        <td className='text-end text-danger'></td>
                        <td className='text-end'>1500.00</td>
                        <td className='text-end'>2900.00</td>
                      </tr>

                      <tr>
                        <td>22/Nov/2024</td>
                        <td>Lift Charges</td>
                        <td className='text-end text-danger'>800.00</td>
                        <td className='text-end'></td>
                        <td className='text-end'>1400.00</td>
                      </tr>

                      <tr>
                        <td>15/Nov/2024</td>
                        <td>Water Charges</td>
                        <td className='text-end text-danger'>500.00</td>
                        <td className='text-end'></td>
                        <td className='text-end'>2200.00</td>
                      </tr>

                      <tr>
                        <td>16/Oct/2024</td>
                        <td>Electricity Charges</td>
                        <td className='text-end text-danger'></td>
                        <td className='text-end'>300.00</td>
                        <td className='text-end'>2700.00</td>
                      </tr>
                      <tr>
                        <td>09/Oct/2024</td>
                        <td>Lift Charges</td>
                        <td className='text-end text-danger'></td>
                        <td className='text-end'>2000.00</td>
                        <td className='text-end'>2400.00</td>
                      </tr>

                      <tr>
                        <td>10/Sep/2024</td>
                        <td>Lift Charges</td>
                        <td className='text-end text-danger'>1100.00</td>
                        <td className='text-end'></td>
                        <td className='text-end'>1500.00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td className='tx-bold'>Closing B/L</td>
                        <td className='text-end tx-bold'>2400.00</td>
                        <td className='text-end tx-bold'>3800.00</td>
                        <td className='text-end tx-bold'>5600.00</td>
                      </tr>

                    </tbody>
                  </table>
                </Tab>

                <Tab eventKey="CashChequeLog" title="Cash & Cheque Log">
                  <Row className='bg-light p-2'>
                    <Formik initialValues={{
                      fromDate: "",
                      toDate: "",
                      property: { value: "", label: "" },
                      invoiceNumber: "",
                      amountInFigures: "",
                    }}
                      onSubmit={handlePaymentLogSearch}>
                      {({ setFieldValue, values }) => (
                        <FormikForm>
                          <Row className='bg-light p-2'>
                            <Col xl={2}>
                              <Form.Group className="form-group mb-0">
                                <Form.Label>From <span className="text-danger">*</span></Form.Label>
                                <Field
                                  type='date'
                                  name="fromDate"
                                  className='form-control'
                                ></Field>
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group className="form-group mb-0">
                                <Form.Label>To <span className="text-danger">*</span></Form.Label>
                                <Field
                                  type='date'
                                  name="toDate"
                                  className='form-control'
                                ></Field>
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group className="form-group mb-0">
                                <Form.Label>Property Name<span className="text-danger">*</span></Form.Label>

                                <div className="SlectBox">
                                  <Select
                                    options={propertyOptions}
                                    name="property"
                                    placeholder="Select Property"
                                    value={values.property}
                                    // classNamePrefix="selectform"
                                    classNamePrefix='Select2' className="multi-select"
                                    onChange={(selected) => {
                                      setFieldValue("property", selected)
                                    }}
                                  />
                                </div>


                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group className="form-group mb-0">
                                <Form.Label>Invoice Number <span className="text-danger">*</span></Form.Label>
                                <Field
                                  type='text'
                                  name="invoiceNumber"
                                  placeholder='Invoice Number'
                                  className='form-control'
                                ></Field>
                              </Form.Group>
                            </Col>


                            <Col xl={2}>
                              <Form.Group className="form-group mb-0">
                                <Form.Label>Amount <span className="text-danger">*</span></Form.Label>
                                <Field
                                  type='text'
                                  name="amountInFigures"
                                  placeholder='enter amount'
                                  className='form-control'

                                ></Field>
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Label className='mb-4'></Form.Label>
                              <button type="submit" className="btn btn-primary mt-1 me-1" >Search</button>
                              <button type="button" className="btn btn-info mt-1" onClick={() => viewDemoShow("exportshow")}>Import</button>
                              <Modal centered show={exportshow}>
                                <Modal.Header>
                                  <Modal.Title>Import</Modal.Title>
                                  <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("exportshow"); }}>
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

                                    <div className='upload-data'>
                                      <div><i className='bi bi-file-earmark-text-fill me-1 text-primary'></i> invoice.xls</div>
                                      <div><i className='bi bi-x-circle float-end cursor text-danger'></i></div>
                                    </div>



                                  </Form.Group>


                                </Modal.Body>
                                <Modal.Footer>
                                  <Button variant="default" onClick={() => { viewDemoClose("exportshow"); }}>
                                    Close
                                  </Button>
                                  <Button variant="primary" onClick={() => { viewDemoClose("exportshow"); }}>
                                    Save
                                  </Button>

                                </Modal.Footer>
                              </Modal>
                            </Col>

                          </Row>
                        </FormikForm>
                      )}

                    </Formik>
                    <div className="table-responsive ">
                      <DataTableExtensions {...paymentLogTableData}>
                        <DataTable
                          columns={columnsPaymentLog}
                          data={paymentLogData}
                          pagination
                          progressPending={isLoading}
                          progressComponent={<TestLoader />}


                        />
                      </DataTableExtensions>
                    </div>
                  </Row>

                </Tab>


                <Tab eventKey="OnlineSelf" title="Online Self">
                  <Row className='bg-light p-2'>
                    <Formik initialValues={{
                      fromDate: "",
                      toDate: "",
                      property: { value: "", label: "" },
                      invoiceNumber: "",
                      amountInFigures: "",
                    }}
                      onSubmit={handlePaymentLogSearch}>
                      {({ setFieldValue, values }) => (
                        <FormikForm>
                          <Row className='bg-light p-2'>
                            <Col xl={2}>
                              <Form.Group className="form-group mb-0">
                                <Form.Label>From <span className="text-danger">*</span></Form.Label>
                                <Field
                                  type='date'
                                  name="fromDate"
                                  className='form-control'
                                ></Field>
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group className="form-group mb-0">
                                <Form.Label>To <span className="text-danger">*</span></Form.Label>
                                <Field
                                  type='date'
                                  name="toDate"
                                  className='form-control'
                                ></Field>
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group className="form-group mb-0">
                                <Form.Label>Payment Mode<span className="text-danger">*</span></Form.Label>

                                <div className="SlectBox">
                                  <Select
                                    options={paymentmode}
                                    placeholder="Select mode"
                                    value={values.property}
                                    // classNamePrefix="selectform"
                                    classNamePrefix='Select2' className="multi-select"

                                  />
                                </div>


                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Group className="form-group mb-0">
                                <Form.Label>Transaction Id <span className="text-danger">*</span></Form.Label>
                                <Field
                                  type='text'
                                  name="transactionid"
                                  placeholder='Id'
                                  className='form-control'
                                ></Field>
                              </Form.Group>
                            </Col>


                            <Col xl={2}>
                              <Form.Group className="form-group mb-0">
                                <Form.Label>Amount <span className="text-danger">*</span></Form.Label>
                                <Field
                                  type='text'
                                  name="amountInFigures"
                                  placeholder='enter amount'
                                  className='form-control'

                                ></Field>
                              </Form.Group>
                            </Col>

                            <Col xl={2}>
                              <Form.Label className='mb-4'></Form.Label>
                              <button type="submit" className="btn btn-primary mt-1 me-1" >Search</button>
                              {/* <button type="button" className="btn btn-info mt-1" onClick={() => viewDemoShow("exportshow")}>Import</button> */}
                              <Modal centered show={exportshow}>
                                <Modal.Header>
                                  <Modal.Title>Import</Modal.Title>
                                  <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("exportshow"); }}>
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

                                    <div className='upload-data'>
                                      <div><i className='bi bi-file-earmark-text-fill me-1 text-primary'></i> invoice.xls</div>
                                      <div><i className='bi bi-x-circle float-end cursor text-danger'></i></div>
                                    </div>



                                  </Form.Group>


                                </Modal.Body>
                                <Modal.Footer>
                                  <Button variant="default" onClick={() => { viewDemoClose("exportshow"); }}>
                                    Close
                                  </Button>
                                  <Button variant="primary" onClick={() => { viewDemoClose("exportshow"); }}>
                                    Save
                                  </Button>

                                </Modal.Footer>
                              </Modal>
                            </Col>

                          </Row>
                        </FormikForm>
                      )}

                    </Formik>
                    <div className="table-responsive ">
                      <DataTableExtensions {...onlineSelfPaymentTableData}>
                        <DataTable
                          columns={columnsOnlineSelfPayment}
                          data={onlineSelfData}
                          pagination
                          progressPending={isLoading}
                          progressComponent={<TestLoader />}


                        />
                      </DataTableExtensions>
                    </div>
                  </Row>

                </Tab>

              </Tabs>



            </Card.Body>
          </Card>


          <Modal show={paynow} centered>
            <Modal.Header>
              <Modal.Title>Pay Now</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("paynow"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='bg-light'>
              {invoicePaymentOutstanding && (
                <>
                  <Col xl={12} className='w-100 tx-18 mb-1 text-center'>
                    Interest Outstanding: <i className="fa fa-rupee tx-16"></i> {invoicePaymentOutstanding.interestOutstanding}
                  </Col>
                  <Col xl={12} className='w-100 tx-18 mb-1 text-center'>
                    Interest Till Now: <i className="fa fa-rupee tx-16"></i> {invoicePaymentOutstanding.currentInterest}
                  </Col>
                  <Col xl={12} className='w-100 tx-26 text-center tx-bold'>
                    Total:  <i className="fa fa-rupee"></i> {invoicePaymentOutstanding.totalDueNow}
                  </Col>
                </>
              )}


              <Card className='m-3 p-4'>
                <h5>Choose your payment method</h5>
                <ul className='list-unstyled paymentmode mb-2'>
                  <li onClick={() => { viewDemoShow("cash"); }}>
                    <img alt="" src={imagesData('cash')} />
                    <span>Cash</span>
                  </li>
                  <li onClick={() => { viewDemoShow("cheque"); }}>
                    <img alt="" src={imagesData('cheque')} />
                    <span>Cheque</span>
                  </li>
                  <li onClick={() => { viewDemoShow("onlineself"); }}>
                    <img alt="" src={imagesData('online')} />
                    <span>Online Self</span>
                  </li>
                </ul>
              </Card>
            </Modal.Body>

          </Modal>

          <Modal show={cash} size='xl' centered>
            <Modal.Header>
              <Modal.Title>Cash</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("cash"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='bg-light p-0'>

              <Card className='m-3 p-3'>
                <Row>
                  <Col xl={6} className='border border-right pe-5'>
                    <h6>Enter the denomination:</h6>
                    <table className='table cashtable'>
                      <thead>
                        <tr>
                          <th>Currency</th>
                          <th></th>
                          <th>Number Count</th>
                          <th></th>
                          <th className='text-end'>Total</th>
                        </tr>
                      </thead>
                      {/* <tbody>
                        <tr>
                          <td>2000</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' value={5} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>10,000</td>
                        </tr>
                        <tr>
                          <td>1000</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' value={8} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>8,000</td>
                        </tr>
                        <tr>
                          <td>500</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' value={4} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>2,000</td>
                        </tr>
                        <tr>
                          <td>200</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' value={6} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>1,200</td>
                        </tr>
                        <tr>
                          <td>100</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' value={5} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>500</td>
                        </tr>
                        <tr>
                          <td>50</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' value={2} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>100</td>
                        </tr>
                        <tr>
                          <td>20</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>0</td>
                        </tr>
                        <tr>
                          <td>10</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>0</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>0</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>0</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>0</td>
                        </tr>
                      </tbody> */}
                      <tbody>
                        {denominations.map((denomination, index) => (
                          <tr key={index}>
                            <td>{denomination.value}</td>
                            <td>X</td>
                            <td>
                              <Form.Control
                                className="form-control"
                                type="number"
                                value={denomination.count}
                                min="0"
                                onChange={(e) => handleCountChange(index, Number(e.target.value))}
                              />
                            </td>
                            <td>=</td>
                            <td className="text-end tx-semibold">
                              {denomination.total.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan={4} className='text-white tx-semibold'>Grand Total</th>
                          <th className='text-end text-white'>{calculateGrandTotal().toLocaleString()}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </Col>
                  <Col xl={6} className='pt-5 ps-4'>
                    <Col xl={12} className='w-100 tx-26 text-center tx-bold mb-5'><i className="fa fa-rupee"></i> {calculateGrandTotal().toLocaleString()}</Col>
                    <FormGroup>
                      <FormLabel className='text-black'>Total Amount (in words)</FormLabel>
                      <Form.Control className='form-control' disabled value={numberToWords(calculateGrandTotal())} placeholder='Enter amount in words' type="text"></Form.Control>
                    </FormGroup>
                    <hr />

                    <FormGroup className='mt-3'>
                      <FormLabel className='text-black'>Receipt Date</FormLabel>
                      <input onChange={(e) => setReceiptDate(e.target.value)} className='form-control' required placeholder='Enter Number' type="date"></input>
                    </FormGroup>
                    <FormGroup className='mt-3'>
                      <FormLabel className='text-black'>Mobile Number</FormLabel>
                      <input onChange={(e) => setMobile(e.target.value)} className='form-control' required placeholder='Enter Number' type="text"></input>
                    </FormGroup>

                    <FormGroup className='mt-5'>
                      <Button className='btn btn-primary w-100' type='button' onClick={() =>
                        handleCashSubmit(calculateGrandTotal())
                      }>Send OTP</Button>
                    </FormGroup>

                  </Col>
                </Row>

              </Card>
            </Modal.Body>

          </Modal>

          <Modal show={cheque} centered>
            <Modal.Header>
              <Modal.Title>Cheque</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("cheque"); }}>
                x
              </Button>
            </Modal.Header>


            <Formik
              initialValues={{
                chequeDate: '',
                receiptDate: '',
                chequeReceivedDate: '',
                chequeNumber: '',
                bankName: '',
                branchName: '',
                amountInFigures: '',
                amountInWords: '',
                mobile: ''
              }}
              validationSchema={Yup.object({
                chequeDate: Yup.string().required('Cheque Date is required'),
                receiptDate: Yup.string().required('Cheque Issued Date is required'),
                chequeReceivedDate: Yup.string().required('Cheque Clearing Date is required'),
                chequeNumber: Yup.string().required('Cheque Number is required'),
                bankName: Yup.string().required('Bank Name is required'),
                branchName: Yup.string().required('Branch is required'),
                amountInFigures: Yup.string().required('Amount in Figures is required'),
                mobile: Yup.string()
                  .required('Mobile Number is required')
                  .matches(/^[0-9]{10}$/, 'Mobile Number must be 10 digits'),
              })}
              validateOnChange={true}
              validateOnBlur={true}
              validateOnMount={false}
              onSubmit={(values, { setSubmitting }) => {
                handleChequeSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ values, setFieldValue, errors, touched, isSubmitting }) => {
                useEffect(() => {
                  if (values.amountInFigures && !isNaN(Number(values.amountInFigures))) {
                    const amount = parseInt(values.amountInFigures, 10);
                    if (!isNaN(amount)) {
                      const words = numberToWords(amount); // converts 123 -> "One Hundred Twenty Three"
                      setFieldValue('amountInWords', words);
                    }
                  } else {
                    setFieldValue('amountInWords', '');
                  }
                }, [values.amountInFigures, setFieldValue]);

                return (
                  <FormikForm noValidate>
                    <Modal.Body className='bg-light pt-2'>
                      <Col xl={12} className='w-100 tx-26 text-center tx-bold'>
                        <i className="fa fa-rupee"></i> {invoicePaymentOutstanding.totalDueNow}
                      </Col>
                      <Card className='m-2 p-3'>
                        <Row>
                          <Col xl={6}>
                            <FormGroup>
                              <FormLabel>Cheque Date</FormLabel>
                              <Field name="chequeDate" type="date" className={`form-control ${errors.chequeDate && touched.chequeDate ? 'is-invalid' : ''}`} />
                              <ErrorMessage name="chequeDate" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl={6}>
                            <FormGroup>
                              <FormLabel>Receipt Date</FormLabel>
                              <Field name="receiptDate" type="date" className={`form-control ${errors.receiptDate && touched.receiptDate ? 'is-invalid' : ''}`} />
                              <ErrorMessage name="receiptDate" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl={6}>
                            <FormGroup>
                              <FormLabel>Cheque Clearing Date</FormLabel>
                              <Field disabled type="date" className={`form-control ${errors.chequeReceivedDate && touched.chequeReceivedDate ? 'is-invalid' : ''}`} />
                              <ErrorMessage name="chequeReceivedDate" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl={6}>
                            <FormGroup>
                              <FormLabel>Cheque Number</FormLabel>
                              <Field name="chequeNumber" type="text" className={`form-control ${errors.chequeNumber && touched.chequeNumber ? 'is-invalid' : ''}`} />
                              <ErrorMessage name="chequeNumber" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl={12}>
                            <FormGroup>
                              <FormLabel>Bank Name</FormLabel>
                              <Field name="bankName" type="text" className={`form-control ${errors.bankName && touched.bankName ? 'is-invalid' : ''}`} />
                              <ErrorMessage name="bankName" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl={12}>
                            <FormGroup>
                              <FormLabel>Branch</FormLabel>
                              <Field name="branchName" type="text" className={`form-control ${errors.branchName && touched.branchName ? 'is-invalid' : ''}`} />
                              <ErrorMessage name="branchName" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl={12}>
                            <FormGroup>
                              <FormLabel>Amount (in figures)</FormLabel>
                              <Field name="amountInFigures" type="text" className={`form-control ${errors.amountInFigures && touched.amountInFigures ? 'is-invalid' : ''}`} />
                              <ErrorMessage name="amountInFigures" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl={12}>
                            <FormGroup>
                              <FormLabel>Amount (in words)</FormLabel>
                              <Field name="amountInWords" type="text" disabled className="form-control" />
                              <ErrorMessage name="amountInWords" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl={12}>
                            <FormGroup>
                              <FormLabel>Mobile Number</FormLabel>
                              <Field
                                name="mobile"
                                type="text"
                                className={`form-control ${errors.mobile && touched.mobile ? 'is-invalid' : ''}`}
                                placeholder="Enter mobile number for verification"
                              />
                              <ErrorMessage name="mobile" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <FormGroup>
                          <Button
                            className='btn btn-primary w-100 mt-3'
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Send OTP
                          </Button>
                        </FormGroup>
                      </Card>
                    </Modal.Body>
                  </FormikForm>
                )
              }}
            </Formik>




          </Modal>

          <Modal show={onlineself} centered>
            <Modal.Header>
              <Modal.Title>Online Self</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("onlineself"); }}>
                x
              </Button>
            </Modal.Header>
            <Formik
              initialValues={{
                property: { label: invoiceToPay.propertyName, value: invoiceToPay.propertyIdentifier },
                dateOfPayment: "",
                paymentMode: { label: "Select Payment Mode", value: "" },
                transactionId: "",
                amount: "",
                bankName: "",
                remarks: "",
                paymentFile: null

              }} onSubmit={handleOnlineSelfSubmit}>
              {({ values, setFieldValue }) => (
                <FormikForm>
                  <Modal.Body>
                    <Row>
                      <Col sm={12}>
                        <FormGroup>
                          <FormLabel>Society</FormLabel>
                          <Select
                            // options={society}
                            value={society}
                            isDisabled={true}
                            placeholder="Select society"
                            name="paymentmode"
                            classNamePrefix='Select2'
                            className="multi-select"

                          />
                        </FormGroup>
                      </Col>
                      <Col sm={12}>
                        <FormGroup>
                          <FormLabel>Property</FormLabel>
                          <Select
                            options={[{ label: invoiceToPay.propertyName, value: invoiceToPay.propertyIdentifier }]}
                            placeholder={invoiceToPay.propertyName}
                            isDisabled={true}
                            name="property"
                            classNamePrefix='Select2'
                            className="multi-select"
                            onChange={(e) => setFieldValue("property", e)}

                          />
                        </FormGroup>
                      </Col>
                      <Col sm={6}>
                        <FormGroup>
                          <FormLabel>Date of Payment</FormLabel>
                          <Field type='date' className="form-control" name="dateOfPayment" value={values.dateOfPayment}></Field>
                        </FormGroup>
                      </Col>
                      <Col sm={6}>

                        <FormGroup>
                          <FormLabel>Payment Mode</FormLabel>
                          <Select
                            options={paymentmode}
                            placeholder="Select mode"
                            name="paymentMode"
                            classNamePrefix='Select2'
                            className="multi-select"
                            onChange={(e) => setFieldValue("paymentMode", e)}

                          />
                        </FormGroup>
                      </Col>
                      <Col sm={6}>
                        <FormGroup>
                          <FormLabel>Transaction ID</FormLabel>
                          <Field type='text'
                            className="form-control"
                            name="transactionId"
                            value={values.transactionId}
                            placeholder='enter id' ></Field>
                        </FormGroup>
                      </Col>
                      <Col sm={6}>
                        <FormGroup>
                          <FormLabel>Amount</FormLabel>
                          <Field type='text'
                            className="form-control"
                            name="amount"
                            value={values.amount}
                            placeholder='0.00' ></Field>
                        </FormGroup>
                      </Col>
                      <Col sm={12}>
                        <FormGroup>
                          <FormLabel>Bank Name</FormLabel>
                          <Field type='text'
                            className="form-control"
                            name="bankName"
                            value={values.bankName}
                            placeholder='enter name' ></Field>
                        </FormGroup>
                      </Col>

                      <Col sm={12}>
                        <FormGroup>
                          <FormLabel>Remarks</FormLabel>
                          <textarea className='form-control'
                            name="remarks"
                            value={values.remarks}
                            onChange={(e: any) => setFieldValue("remarks", e.target.value)}
                            placeholder='enter remarks'></textarea>
                        </FormGroup>
                      </Col>
                      <Col sm={12}>
                        <FormGroup>
                          <FormLabel>Upload Receipt</FormLabel>
                          <input className="form-control" type='file' name='paymentFile'
                            onChange={(e: any) => setFieldValue("paymentFile", e.target.files[0])}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button type='button' className='btn btn-default' onClick={() => { viewDemoClose("onlineself"); }}>Cancel</Button>
                    <Button type='submit' className='btn btn-primary me-2' onClick={() => { viewDemoClose("onlineself"); }}>Save</Button>

                  </Modal.Footer>
                </FormikForm>
              )}

            </Formik>
          </Modal>


          <Modal show={otpverify} centered>
            <Modal.Header>
              <Modal.Title>OTP Verification</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => {
                setMobile("");
                setDenominations(denominationsList);
                setOtp(["", "", "", "", "", ""]);
                viewDemoClose("otpverify")
              }
              }>x</Button>
            </Modal.Header>

            <Modal.Body className='p-5 text-center'>
              <h4 className='text-black'>OTP Verification</h4>
              <p>Enter the 6 digit verification code</p>
              <Row className='justify-content-center'>
                {otp.map((digit, index) => (
                  <Col key={index} xs={2} className='px-1'>
                    <Form.Control
                      type="text"
                      maxLength={1}
                      value={digit}
                      className='text-center'
                      ref={(el) => inputsRef.current[index] = el}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </Col>
                ))}
              </Row>


              <FormGroup>
                <Col xl={8} className='m-auto'>
                  <Button className='btn btn-primary w-100 mt-4' type="button" onClick={handleVerifyPayment}>
                    Verify
                  </Button>
                </Col>
              </FormGroup>
              <p className='text-info w-100 text-center mt-4' onClick={handleResendOTP} style={{ cursor: 'pointer' }}>
                Resend OTP
              </p>

              <p className='text-info w-100 text-center mt-4' style={{ cursor: 'pointer' }}>
                {/* Resend OTP */}
              </p>
            </Modal.Body>
          </Modal>
          <Modal show={sendOTP} centered>
            <Modal.Header>
              <Modal.Title>Send OTP</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => {
                setMobile("");
                viewDemoClose("sendOTP")
              }}>x</Button>
            </Modal.Header>

            <Modal.Body className='p-5 text-center'>
              <h4 className='text-black'>Send Verification OTP</h4>
              <p>Enter Mobile Number</p>
              <Row className='justify-content-center'>
                <Col xs={8} className='px-1'>
                  <Form.Control
                    type="text"
                    maxLength={10}
                    value={mobile}
                    className='text-center'
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </Col>
              </Row>


              <FormGroup>
                <Col xl={8} className='m-auto'>
                  <Button className='btn btn-primary w-100 mt-4' type="button" onClick={handleSendOTP}>
                    Send
                  </Button>
                </Col>
              </FormGroup>
              <p className='text-info w-100 text-center mt-4' style={{ cursor: 'pointer' }}>
                {/* Resend OTP */}
              </p>
            </Modal.Body>
          </Modal>

          <Modal show={cashview} size='xl' centered>
            <Modal.Header>
              <Modal.Title>Cash</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("cashview"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='bg-light p-0'>

              <Card className='m-3 p-3'>
                <Row>
                  <Col xl={6} className='border border-right pe-5'>
                    <h6>Enter the denomination:</h6>
                    <table className='table cashtable'>
                      <thead>
                        <tr>
                          <th>Currency</th>
                          <th></th>
                          <th>Number Count</th>
                          <th></th>
                          <th className='text-end'>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* <tr>
                          <td>2000</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled value={5} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>10,000</td>
                        </tr>
                        <tr>
                          <td>1000</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled value={8} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>8,000</td>
                        </tr> */}
                        <tr>
                          <td>500</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled value={cashViewData?.notesDetails?.['500'] ?? 0} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['500'] ?? 0) * 500).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>200</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled value={cashViewData?.notesDetails?.['200'] ?? 0} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['200'] ?? 0) * 200).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>100</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled value={cashViewData?.notesDetails?.['100'] ?? 0} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['100'] ?? 0) * 100).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>50</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled value={cashViewData?.notesDetails?.['50'] ?? 0} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['50'] ?? 0) * 50).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>20</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled type="text" value={cashViewData?.notesDetails?.['20'] ?? 0}></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['20'] ?? 0) * 20).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>10</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled type="text" value={cashViewData?.notesDetails?.['10'] ?? 0}></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['10'] ?? 0) * 10).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled type="text" value={cashViewData?.notesDetails?.['5'] ?? 0}></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['5'] ?? 0) * 5).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled type="text" value={cashViewData?.notesDetails?.['2'] ?? 0}></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['2'] ?? 0) * 2).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled type="text" value={cashViewData?.notesDetails?.['1'] ?? 0}></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['1'] ?? 0) * 1).toLocaleString()}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan={4} className='text-white tx-semibold'>Grand Total</th>
                          <th className='text-end text-white'>{(cashViewData?.amountInFigures * 1).toLocaleString()}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </Col>
                  <Col xl={6} className='pt-5 ps-4'>
                    <Col xl={12} className='w-100 tx-26 text-center tx-bold mb-5'><i className="fa fa-rupee"></i>{(cashViewData?.amountInFigures * 1).toLocaleString()}</Col>
                    <FormGroup>
                      <FormLabel className='text-black'>Total Amount (in words)</FormLabel>
                      <Form.Control className='form-control' value={cashViewData?.amountInWords} type="text"></Form.Control>
                    </FormGroup>
                    <hr />

                    <FormGroup>
                      <FormLabel className='text-black'>Receipt Data</FormLabel>
                      <Form.Control className='form-control' value={cashViewData?.receiptDate} type="date" disabled></Form.Control>
                    </FormGroup>
                    <FormGroup className='mt-3'>
                      <FormLabel className='text-black'>Mobile Number</FormLabel>
                      <Form.Control className='form-control' value={""} disabled type="text"></Form.Control>
                    </FormGroup>


                  </Col>
                </Row>

              </Card>
            </Modal.Body>

          </Modal>

          <Modal show={chequeview} centered>
            <Modal.Header>
              <Modal.Title>Cheque</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("chequeview"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='bg-light pt-2'>
              <Col xl={12} className='w-100 tx-26 text-center tx-bold'><i className="fa fa-rupee"></i>{(chequeViewData?.amountInFigures * 1).toLocaleString()}</Col>
              <Card className='m-2 p-3'>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <FormLabel>Cheque Date</FormLabel>
                      <Form.Control className='form-control' value={chequeViewData?.chequeDate} disabled type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <FormLabel>Cheque Issued Date</FormLabel>
                      <Form.Control className='form-control' value={chequeViewData?.chequeDate} disabled type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <FormLabel>Cheque Clearing Date</FormLabel>
                      <Form.Control className='form-control' value={chequeViewData?.createdAt} disabled type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <FormLabel>Cheque Number</FormLabel>
                      <Form.Control className='form-control' value={chequeViewData?.chequeNumber} disabled type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Bank Name</FormLabel>
                      <Form.Control className='form-control' value={chequeViewData?.bankName} disabled type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Branch</FormLabel>
                      <Form.Control className='form-control' value={chequeViewData?.branchName} disabled type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Amount (in figures)</FormLabel>
                      <Form.Control className='form-control' value={(chequeViewData?.amountInFigures * 1).toLocaleString()} disabled type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Amount (in words)</FormLabel>
                      <Form.Control className='form-control' disabled value={chequeViewData?.amountInWords} type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Mobile Number</FormLabel>
                      <Form.Control className='form-control' value={"000000000"} disabled type="text" />
                    </FormGroup>
                  </Col>
                </Row>

              </Card>
            </Modal.Body>

          </Modal>


        </Col>
      </Row>
      <CustomToastContainer />

    </Fragment >
  );
}
