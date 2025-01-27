import React, { useState } from 'react'
import { Col, Row, Card, Modal, Button, Form, Tab, Tabs } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";

import { addUserApi, addUserLoanApi, deleteUserApi, deleteUserLoanApi, getAllUserApi, updateUserApi } from '../../../api/user-api';
import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import { showToast } from '../../../common/services/toastServices';
import "react-datepicker/dist/react-datepicker.css";
import { imagesData } from "../../../common/commonimages";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import Cookies from "js-cookie";

interface Loan {
    loanType: string
    loanNumber: string,
    loanPeriod: number,
    loanAmount: number,
    startDate: Date,
    endDate: Date,
    monthlyEMI: number,
    bankName: string,
    bankAddress: string,
    loanFile: File | null;
}
interface Tabs {
    Personal: boolean,
    Document: boolean,
    Properties: boolean,
    Loan: boolean,
    Parking: boolean
}

interface PersonalInfoProps {
    handleTabChange: (tabKey: string) => void; // Function to change the active tab
    setCompletedTabs: React.Dispatch<React.SetStateAction<Record<keyof Tabs, boolean>>>;

    setDisabledTab: React.Dispatch<React.
        SetStateAction<Record<keyof Tabs, boolean>>>;

    renderFooter: (customFooter: React.ReactNode) => JSX.Element; // Function to render the modal footer
}

const Loan: React.FC<PersonalInfoProps> = ({ handleTabChange, setCompletedTabs, setDisabledTab, renderFooter }) => {
    const [loans, setLoans] = useState<any[]>([])
    const loantype = [
        { value: "Home", label: "Home" },
        { value: "Vehicle", label: "Vehicle" }
    ];
    type Row = {
        sno: number;
        id: number;
        loanType: string;
        loanNumber: string;
        loanPeriod: number;
        startDate: string;
        endDate: string;
        monthlyEMI: number;
        bankName: string;
        bankAddress: string;
        loanFile: File | null;
    };
    const columns = [
        {
            name: "S.no.",
            selector: (row: Row) => row.sno,
            width: "70px",
        },
        {
            name: "Loan Type",
            selector: (row: Row) => row.loanType,
        },
        {
            name: "Loan Number",
            selector: (row: Row) => row.loanNumber,
        },
        {
            name: "Loan Period",
            selector: (row: Row) => row.loanPeriod,
        },
        {
            name: "Start Date",
            selector: (row: Row) => row.startDate,
        },
        {
            name: "End Date",
            selector: (row: Row) => row.endDate,
        },
        {
            name: "Monthly EMI (₹)",
            selector: (row: Row) => row.monthlyEMI,
        },
        {
            name: "Bank Name",
            selector: (row: Row) => row.bankName,
        }, {
            name: "Bank Address",
            selector: (row: Row) => row.bankAddress,
        },
        {
            name: 'Upload File',
            cell: (row: Row) =>
                row.loanFile ? (
                    <a
                        href={URL.createObjectURL(row.loanFile)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={imagesData('pdficon')}
                            alt="PDF Icon"
                            className="wd-50"
                        />
                    </a>
                ) : (
                    'No File'
                ),
            ignoreRowClick: true, // Prevent row click events from triggering here
            allowOverflow: true,
        },
        {
            name: "Action",
            cell: (row: Row) => (
                <i
                    className="bi bi-trash text-danger cursor"
                    onClick={() => handleDelete(row)}
                >
                </i>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];
    const tableData = {
        columns,
        data: loans
    }
    const handleLoanInfo = async () => {
        setCompletedTabs({
            Personal: true,
            Document: true,
            Properties: true,
            Loan: true,
            Parking: false
        })
        setDisabledTab({
            Personal: true,
            Document: true,
            Properties: true,
            Loan: true,
            Parking: false

        })
        handleTabChange("Parking")
        showToast("success", "Loan info saved successfully")

    }
    const handleSubmit = async (values: any) => {
        console.log(values)
        const username = Cookies.get('username')
        const formattedData = {
            username: username,
            loanType: values.loanType.value,
            loanNumber: values.loanNumber,
            loanPeriod: values.loanPeriod,
            loanAmount: values.loanAmount,
            startDate: values.startDate,
            endDate: values.endDate,
            monthlyEMI: values.monthlyEMI,
            bankName: values.bankName,
            bankAddress: values.bankAddress,
            loanFile: values.loanFile
        }

        const response = await addUserLoanApi(formattedData)
        if (response.status === 1) {
            console.log("DAA", response.data)
            const data = {
                sno: loans.length + 1,
                loanFile: values.loanFile,
                ...response.data
            }
            setLoans((prevLoans) => [...prevLoans, data])
        }

    }
    const handleDelete = async (data: Row) => {
        const username = Cookies.get("username")
        const response = await deleteUserLoanApi(username, data.id)
        if (response.status === 200) {
            setLoans(prevData => prevData.filter(loan => loan.id !== data.id))
            showToast("success", "Loan deleted successfully")
        }
    }
    return (
        <>
            <Formik
                initialValues={{
                    loanType: { value: '', label: '' },
                    loanNumber: "",
                    loanPeriod: null,
                    loanAmount: null,
                    startDate: "",
                    endDate: "",
                    monthlyEMI: null,
                    bankName: "",
                    bankAddress: "",
                    loanFile: null
                }}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values }) => (
                    <FormikForm>
                        <Row>
                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Loan Type<span className="text-danger">*</span></Form.Label>
                                    <div className="SlectBox">
                                        <Select
                                            options={loantype}
                                            placeholder="Select Type"
                                            value={values.loanType}
                                            onChange={(e: any) => setFieldValue("loanType", e)}
                                            classNamePrefix='Select2' className="multi-select"
                                        />
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Loan Number<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        name="loanNumber"
                                        type="text"
                                        placeholder="Loan Number"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Loan Period (in yrs)<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        name="loanPeriod"
                                        type="number"
                                        placeholder="Loan Period"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Loan Amount<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        name="loanAmount"
                                        type="number"
                                        placeholder="Loan Amount"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Start Date<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        name="startDate"
                                        type="date"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>End Date<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        name="endDate"
                                        type="date"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Monthly EMI<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        name="monthlyEMI"
                                        type="number"
                                        placeholder="Monthly EMI"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Bank Name<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        name="bankName"
                                        type="text"
                                        placeholder="Bank Name"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={6}>
                                <Form.Group className="form-group">
                                    <Form.Label>Bank Address<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        name="bankAddress"
                                        type="text"
                                        placeholder="Bank Address"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>
                                        Loan Scan Copy <span className="text-danger">*</span>
                                        <span className='float-end text-muted tx-10 tx-normal'>Upload size: Max 2 MB</span>
                                    </Form.Label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="application/pdf"
                                        name="loanFile"
                                        onChange={(e: any) => setFieldValue("loanFile", e.target.files[0])}
                                    />
                                </Form.Group>
                            </Col>


                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label></Form.Label>
                                    <Button className='btn btn-promary btn-sm mt-4' type='submit'>+ Add</Button>
                                </Form.Group>
                            </Col>



                        </Row>
                    </FormikForm>
                )}
            </Formik>
            <Row>
                <Col xl={12}>
                    <div
                        className="table-responsive"
                    >
                        <DataTableExtensions {...tableData}>
                            <DataTable
                                columns={columns}
                                data={loans}
                                fixedHeader
                                fixedHeaderScrollHeight="180px" // Same as maxHeight of table-responsive div
                                pagination
                                keyField="id"
                            />
                        </DataTableExtensions>
                    </div>
                    {/* <table className='table table-bordered mt-3'>
                        <thead>
                            <tr>
                                <th>S.no.</th>
                                <th>Loan Type</th>
                                <th>Loan Number</th>
                                <th>Loan Period</th>
                                <th>Loan Amount</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Monthly EMI</th>
                                <th>Bank Name</th>
                                <th>Bank Address</th>
                                <th>Upload File</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.length > 0 ? loans.map((item, index) => (
                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{item.loanType}</td>
                                    <td>{item.loanNumber}</td>
                                    <td>{item.loanPeriod}</td>
                                    <td>{item.loanAmount}</td>
                                    <td>{item.startDate.toString()}</td>
                                    <td>{item.endDate.toString()}</td>
                                    <td>{item.monthlyEMI}</td>

                                    <td>{item.bankName}</td>
                                    <td>{item.bankAddress}</td>
                                    <td>
                                        {item.loanFile ? (
                                            <a href={URL.createObjectURL(item.loanFile)} target="_blank" rel="noopener noreferrer">
                                                <img src={imagesData('pdficon')} className="wd-50" />
                                            </a>
                                        ) : (
                                            "No File"
                                        )}
                                    </td>
                                    <td align='center'><i className='bi bi-trash text-danger cursor' onClick={() => handleDelete(index)}></i></td>
                                </tr>)) : <tr>
                                <td colSpan={12} align="center" style={{ padding: '10px' }}>
                                    No records
                                </td>
                            </tr>}
                        </tbody>
                    </table> */}
                </Col>
            </Row>
            {renderFooter(
                <>
                    <Button variant="primary" onClick={handleLoanInfo}>Save Loan Info</Button>
                </>
            )}
        </>
    )
}

export default Loan