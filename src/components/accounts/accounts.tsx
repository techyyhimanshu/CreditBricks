import { Fragment, useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { Col, Row, Card, Modal, Button, Form, Tabs, Tab, Dropdown, ButtonGroup, FormLabel, FormGroup, ProgressBar } from "react-bootstrap";
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { imagesData } from "../../common/commonimages";
import { getAllInvoicesApi, getAllPaymentLogsApi, getAllReceiptsApi } from '../../api/account-api';
import { handleApiError } from '../../helpers/handle-api-error';
import TestLoader from '../../layout/layoutcomponent/testloader';
import { createCashPaymentApi, createChequePaymentApi, getInvoicePaymentOutstandingApi, sendOTPApi, verifyPaymentApi } from '../../api/payment-api';
import { showToast, CustomToastContainer } from '../../common/services/toastServices';
import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import { numberToWords } from "amount-to-words";
import { getAllPropertiesForDropdownApi } from '../../api/complaint-api';
import { useSelector } from 'react-redux';
import { RootState } from '../../common/store/store';
export default function Accounts() {
  const [accountdata, setAccountdata] = useState<any>([]);
  const [paynow, setpaynow] = useState(false);
  const [cash, setcash] = useState(false);
  const [cheque, setcheque] = useState(false);
  const [otpverify, setotpverify] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [invoiceToPay, setInvoiceToPay] = useState<any>({})
  const [denominations, setDenominations] = useState([
    { value: 500, count: 0, total: 0 },
    { value: 200, count: 0, total: 0 },
    { value: 100, count: 0, total: 0 },
    { value: 50, count: 0, total: 0 },
    { value: 20, count: 0, total: 0 },
    { value: 10, count: 0, total: 0 },
    { value: 5, count: 0, total: 0 },
    { value: 2, count: 0, total: 0 },
    { value: 1, count: 0, total: 0 },
  ]);
  const [cashview, setcashview] = useState(false);
  const [chequeview, setchequeview] = useState(false);
  const [receiptData, setReceiptData] = useState([]);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  const propertyoption = [
    { value: "1", label: "A101" },
    { value: "2", label: "A102" },
    { value: "3", label: "A103" }
  ];

  const paymenttype = [
    { value: "1", label: "Cash" },
    { value: "2", label: "Cheque" }
  ];

  const invoicetype = [
     { value: "1", label: "Maintenance" },
    { value: "2", label: "Additional" }
  ];

  const propertytype = [
    { value: "1", label: "All" },
    { value: "2", label: "Sold" },
    { value: "3", label: "Unsold" },
    { value: "4", label: "Blocked by Management" },
    { value: "5", label: "Refuge" }
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
  const [transactionData, setTransactionData] = useState<any>([]);

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
        <span className={` ${row.status === 'Unpaid' ? 'text-danger' : 'text-success'}`}>
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
      width: '50px'
    },
    {
      name: 'Date',
      selector: (row: any) => row.date,
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
      name: 'Payee Description',
      selector: (row: any) => "-",
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row: any) => (
        row.status === "Pending" ? <Button type="button" className='btn btn-sm btn-success' onClick={
          () => {
            setTransactionData(row)
            viewDemoShow("otpverify")
          }
        }><i className='bo bi-check-circle'></i>&nbsp; Verify</Button> : "-"
      ),
      sortable: true,
    }
  ]
  const propertyOptions = [
    { value: "", label: "All" },
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
          totalOutstanding: account?.invoicePaymentOutstanding?.principleOutstanding * 1 + account?.invoicePaymentOutstanding?.interestOutstanding * 1,
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
  const handleCashSubmit = async (amount: any) => {
    try {
      if (amount > invoicePaymentOutstanding?.totalDueNow * 1) {
        return showToast("error", "Amount cannot be greater than outstanding amount")
      }
      if (amount <= 0) {
        return showToast("error", "Amount cannot be less than or equal to zero")
      }
      if (!mobile || mobile.length < 10) {
        return showToast("error", "Please enter a valid mobile number")
      }
      const notesDetails = denominations.reduce((acc: Record<number, number>, curr) => {
        if (curr.count > 0) {
          acc[curr.value] = curr.count;
        }
        return acc;
      }, {} as Record<number, number>);


      const response = await createCashPaymentApi(amount, invoiceToPay.invoiceNumber, invoiceToPay.propertyIdentifier, notesDetails, mobile)
      if (response.status === 200) {
        setTransactionData(response.data.data)
        viewDemoShow("otpverify");
      }
      viewDemoShow("otpverify");

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
        values.chequeIssuedDate,
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
        }
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }

  const handleResendOTP = async () => {
    try {
      const param = "CSH"
      const response = await sendOTPApi(mobile, invoiceToPay.propertyIdentifier, invoiceToPay.amountInFigures, param)
      if (response.status === 200) {
        setTransactionData(response.data.data)
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
  }, [])



  const viewDemoShow = (modal: any) => {
    switch (modal) {

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

        <Modal.Header>
          <Modal.Title>Process Invoice</Modal.Title>
          <Button variant="" className="btn-close" onClick={() => viewDemoClose("processinvoice")}>
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

                      <Form.Check type="radio" label="All" name="invoiceprocess" />
                    </Col>
                    <Col sm={3}>

                      <Form.Check type="radio" label="Tower" name="invoiceprocess" />
                    </Col>
                    <Col sm={3}>

                      <Form.Check type="radio" label="Wing" name="invoiceprocess" />
                    </Col>
                    <Col sm={3}>
                      <Form.Check type="radio" checked label="Individual" name="invoiceprocess" />
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
              <p className='text-center tx-semibold tx-16 mb-2 mt-3'>Processing of Invoices (23)</p>
              <div className="progress mg-b-20">
                <ProgressBar
                  variant="success"
                  role="progressbar"
                  now={35}
                  animated
                ></ProgressBar>
              </div>
            </Col>

          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={() => viewDemoClose("processinvoice")}>
            Cancel
          </Button>
          <button className="btn btn-primary" type="submit">Process</button>
        </Modal.Footer>

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

                      <Form.Check type="radio" label="All" name="invoiceprocess" />
                    </Col>
                    <Col sm={3}>

                      <Form.Check type="radio" label="Tower" name="invoiceprocess" />
                    </Col>
                    <Col sm={3}>

                      <Form.Check type="radio" label="Wing" name="invoiceprocess" />
                    </Col>
                    <Col sm={3}>
                      <Form.Check type="radio" checked label="Individual" name="invoiceprocess" />
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
                              All Data
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

            <Modal.Body className='bg-light pt-4'>
              {invoicePaymentOutstanding && (
                <>
                  <Col xl={12} className='w-100 tx-20 text-center tx-bold'>
                    Interest Outstanding: <i className="fa fa-rupee"></i> {invoicePaymentOutstanding.interestOutstanding}
                  </Col>
                  <Col xl={12} className='w-100 tx-20 text-center tx-bold'>
                    Interest Till Now: <i className="fa fa-rupee"></i> {invoicePaymentOutstanding.currentInterest}
                  </Col>
                  <Col xl={12} className='w-100 tx-26 text-center tx-bold'>
                    Total: <i className="fa fa-rupee"></i> {invoicePaymentOutstanding.totalDueNow}
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
                  <li>
                    <img alt="" src={imagesData('online')} />
                    <span>Online</span>
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
                      <FormLabel className='text-black'>Mobile Number</FormLabel>
                      <Form.Control onChange={(e) => setMobile(e.target.value)} className='form-control' placeholder='Enter Number' type="text"></Form.Control>
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
                chequeIssuedDate: '',
                chequeReceivedDate: '',
                chequeNumber: '',
                bankName: '',
                branch: '',
                amountInFigures: '',
                amountInWords: '',
                mobile: ''
              }}
              // validationSchema={validationSchema}
              onSubmit={handleChequeSubmit}
            >
              {({ values, setFieldValue }) => {
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
                  <FormikForm>
                    <Modal.Body className='bg-light pt-2'>
                      <Col xl={12} className='w-100 tx-26 text-center tx-bold'>
                        <i className="fa fa-rupee"></i> {invoicePaymentOutstanding.totalDueNow}
                      </Col>
                      <Card className='m-2 p-3'>
                        <Row>
                          <Col xl={6}>
                            <FormGroup>
                              <FormLabel>Cheque Date</FormLabel>
                              <Field name="chequeDate" type="date" className="form-control" />
                              <ErrorMessage name="chequeDate" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl={6}>
                            <FormGroup>
                              <FormLabel>Cheque Issued Date</FormLabel>
                              <Field name="chequeIssuedDate" type="date" className="form-control" />
                              <ErrorMessage name="chequeIssuedDate" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl={6}>
                            <FormGroup>
                              <FormLabel>Cheque Recived Date</FormLabel>
                              <Field name="chequeReceivedDate" type="date" className="form-control" />
                              <ErrorMessage name="chequeReceivedDate" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl={6}>
                            <FormGroup>
                              <FormLabel>Cheque Number</FormLabel>
                              <Field name="chequeNumber" type="text" className="form-control" />
                              <ErrorMessage name="chequeNumber" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl={12}>
                            <FormGroup>
                              <FormLabel>Bank Name</FormLabel>
                              <Field name="bankName" type="text" className="form-control" />
                              <ErrorMessage name="bankName" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl={12}>
                            <FormGroup>
                              <FormLabel>Branch</FormLabel>
                              <Field name="branchName" type="text" className="form-control" />
                              <ErrorMessage name="branchName" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                          <Col xl={12}>
                            <FormGroup>
                              <FormLabel>Amount (in figures)</FormLabel>
                              <Field name="amountInFigures" type="text" className="form-control" />
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
                                className="form-control"
                                placeholder="Enter mobile number for verification"
                              />
                              <ErrorMessage name="mobile" component="div" className="text-danger" />
                            </FormGroup>
                          </Col>
                        </Row>
                        <FormGroup>
                          <Button className='btn btn-primary w-100 mt-3' type="submit">
                            Send OTP
                          </Button>
                        </FormGroup>
                      </Card>
                    </Modal.Body>
                  </FormikForm>
                )
              }
              }
            </Formik>




          </Modal>


          <Modal show={otpverify} centered>
            <Modal.Header>
              <Modal.Title>OTP Verification</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => viewDemoClose("otpverify")}>x</Button>
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
                    <FormGroup className='mt-3'>
                      <FormLabel className='text-black'>Mobile Number</FormLabel>
                      <Form.Control className='form-control' value={"0000000000"} disabled type="text"></Form.Control>
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
                      <FormLabel>Cheque Recived Date</FormLabel>
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
