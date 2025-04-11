import { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, FormControl, FormCheck } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import { getAllSocietyApi, getPropertiesOfSocietyApi, getSocietyDetailsApi } from '../../api/society-api';
import { handleApiError } from '../../helpers/handle-api-error';
import { showToast } from '../services/toastServices';
import { getTowerWingsApi } from '../../api/wing-api';
import { getSocietyTowersApi } from '../../api/tower-api';
import { getWingPropertiesApi } from '../../api/property-api';

interface ProductModalProps {
    show: boolean;
    onSave: (values: any) => void;
    mode?: string;
    handleEdit?: () => void;
    onClose: () => void;
    isShow?: boolean;
    editing: boolean;
    initialVals?: any;

}

const narration = [
    { value: "1 BHK", label: "1 BHK" },
    { value: "1.5 BHK", label: "1.5 BHK" },
    { value: "2 BHK", label: "2 BHK" },
    { value: "2.5 BHK", label: "2.5 BHK" },
    { value: "1 RK", label: "1 RK" },
    { value: "3 BHK", label: "3 BHK" },
    { value: "3.5 BHK", label: "3.5 BHK" },
    { value: "4 BHK", label: "4 BHK" },
    { value: "Shop", label: "Shop" },
    { value: "Duplex", label: "Duplex" },
    { value: "Villa", label: "Villa" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Basement", label: "Basement" },
    { value: "Gala", label: "Gala" },
    { value: "Garage", label: "Garage" },
    { value: "Godown", label: "Godown" },
    { value: "Independent House", label: "Independent House" },
    { value: "Industrial Gala", label: "Industrial Gala" },
    { value: "Office", label: "Office" },
    { value: "Stall", label: "Stall" },
];

// Validation schema (example)
const validationSchema = Yup.object({
    chargeName: Yup.string().required("Charge Name is required"),
    chargeType: Yup.object()
        .required("Charge Type is required")
        .test("non-empty-object", "Charge type is required", (value: any) => {
            // Check if the object has both 'label' and 'value' properties and they are not empty
            return value && value.label && value.value && value.label !== "" && value.value !== "";
        }),
    societyName: Yup.object().required("Society is required"),
    // startDate: Yup.date().required("Start Date is required"),
    // endDate: Yup.date().required("End Date is required"),
    billingType: Yup.object().required("Billing Type is required"),
    gstPercentage: Yup.string().matches(/^\d+(\.\d{1,2})?$/, "Invalid GST format (e.g. 0.00%)"),
    interestApplicable: Yup.object().nullable(),

    interestStartDate: Yup.date()
        .nullable()
        .test("is-after-interest-due-date", "Interest Start Date must be after Due Date", function (value) {
            const { interestDueDate } = this.parent;
            if (value && interestDueDate) {
                return new Date(value) > new Date(interestDueDate);
            }
            return true;
        })
        .test("is-before-start-date", "Interest Start Date must be before the Start Date of next month", function (value) {
            const { startDate } = this.parent;
            if (value && startDate) {
                const startDateObj = new Date(startDate);
                const nextMonth = new Date(startDateObj.setMonth(startDateObj.getMonth() + 1));
                nextMonth.setDate(1);
                return new Date(value) < nextMonth;
            }
            return true;
        }),

    interestDueDate: Yup.date()
        .nullable(),
    // .test("is-before-start-date", "Interest Due Date must be before the Start Date", function (value) {
    //     const { startDate } = this.parent;
    //     if (value && startDate) {
    //         return new Date(value) < new Date(startDate);
    //     }
    //     return true; 
    // }),

    startDate: Yup.date()
        .required("Start Date is required")
        .test('is-before-end-date', 'Start date must be before the End date', function (value) {
            const { endDate } = this.parent;
            return value && new Date(value) < new Date(endDate);
        }),

    endDate: Yup.date()
        .required("End Date is required")
        .test('is-after-start-date', 'End date must be after the Start date', function (value) {
            const { startDate } = this.parent;
            return value && new Date(value) > new Date(startDate);
        })
});

const ChargeMasterModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose, onSave, editing }) => {
    const [societyOptions, setSocietyOptions] = useState<any[]>([]);
    const [propertyOptions, setPropertyOptions] = useState<any[]>([]);
    const [wingOptions, setWingOptions] = useState<any[]>([]);
    const [towerOptions, setTowerOptions] = useState<any[]>([]);
    const [societyData, setSocietyData] = useState<any>(null);

    useEffect(() => {
        fetchSocietiesForDropDown()
    }, [])

    const fetchSocietiesForDropDown = async () => {
        try {
            const response = await getAllSocietyApi();
            const formattedData = response.data.data.map((item: any) => ({
                value: item.societyIdentifier,
                label: item.societyName,
            }));
            setSocietyOptions(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }

    const fetchSocietyDetails = async (identifier: string) => {
        try {
            const response = await getSocietyDetailsApi(identifier)
            setSocietyData(response.data.data)
        } catch (error: any) {
            const errorMessage = handleApiError(error)
            showToast('error', errorMessage)
        }
    }

    const fetchPropertiesForDropDown = async (society: any) => {
        try {
            const response = await getWingPropertiesApi(society.value);
            const formattedData = response.data.data.map((item: any) => ({
                value: item.propertyIdentifier,
                label: item.propertyName ? item.propertyName : item.flatNumber,
            }));
            setPropertyOptions(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }

    const fetchWingsForDropDown = async (society: any) => {
        try {
            const response = await getTowerWingsApi(society.value);
            const formattedData = response.data.data.map((item: any) => ({
                value: item.wingIdentifier,
                label: item.wingName,
            }));

            setWingOptions(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }

    const fetchTowersForDropDown = async (society: any) => {
        try {
            const response = await getSocietyTowersApi(society.value);
            const formattedData = response.data.data.map((item: any) => ({
                value: item.towerIdentifier,
                label: item.towerName,
            }));
            setTowerOptions(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }


    const maintenanceOptions = [
        { value: "Society", label: "Society" },
        { value: "Property", label: "Property" }
    ];

    const additionalBillOptions = [
        { value: "Tower", label: "Tower" },
        { value: "Wing", label: "Wing" }
    ];

    const chargetype = [
        { value: "Maintenance", label: "Maintenance" },
        { value: "Additional Bill", label: "Additional Bill" },
    ]

    const billingtype = [
        // { value: "1", label: "--None--" },
        { value: "PSF", label: "PSF" },
        { value: "Lumpsum", label: "Lumpsum" },
        { value: "Narration", label: "Narration" },
    ]

    const interestApplicable = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
    ]

    const resetFields = (setFieldValue: any, fieldName: any) => {
        const fieldsToReset: any = {
            "chargeType": ["chargeMasterType", "societyName", "tower", "wing", "property", "billingFrequency", "interestApplicable", "rateOfInterest", "interestStartDate", "interestDueDate", "billingType", "psfRate", "narration", "amount", "totalAmount"],
            "chargeMasterType": ["societyName", "tower", "wing", "property"],
            "societyName": ["tower", "wing", "property"],
            "tower": ["wing", "property"],
            "wing": ["property"],
            "interestApplicable": ["rateOfInterest", "interestStartDate", "interestDueDate"],
            "billingType": ["psfRate", "narration", "amount", "totalAmount"],
        };

        const resetFields = fieldsToReset[fieldName] || [];
        resetFields.forEach((field: any) => {
            if (["chargeMasterType", "societyName", "tower", "wing", "property", "interestApplicable", "narration"].includes(field)) {
                setFieldValue(field, null);
            } else {
                setFieldValue(field, "");
            }
        });
    };

    const handleSubmit = async (values: any) => {
        try {
            if (onSave) {
                onSave(values)
                // onClose()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal show={show} size="lg">
            <Modal.Header>
                <Modal.Title>Charge Master</Modal.Title>
                <Button variant="" className="btn btn-close" onClick={onClose}>
                    x
                </Button>
            </Modal.Header>

            <Formik
                enableReinitialize
                initialValues={{
                    chargeName: initialVals?.chargeName || "",
                    chargeNumber: initialVals?.chargeNumber || "",
                    chargeType: { label: initialVals?.chargeType || "", value: initialVals?.chargeType || "" },
                    chargeMasterType: { label: initialVals?.chargeMasterType || "", value: initialVals?.chargeMasterType || "" },
                    property: { label: initialVals?.property?.propertyName || "", value: initialVals?.property?.propertyIdentifier || "" },
                    societyName: { label: initialVals?.society?.societyName || "", value: initialVals?.society?.societyIdentifier || "" },
                    wing: { label: initialVals?.wing?.wingName || "", value: initialVals?.wing?.wingIdentifier || "" },
                    tower: { label: initialVals?.tower?.towerName || "", value: initialVals?.tower?.towerIdentifier || "" },
                    billingType: { label: initialVals?.billingType || "", value: initialVals?.billingType || "" },
                    interestStartDate: initialVals?.interestStartDate || "",
                    dueDate: initialVals?.dueDate || "",
                    rateOfInterest: initialVals?.rateOfInterest || "",
                    psfRate: initialVals?.psfRate || "",
                    // area: initialVals?.area || "",
                    narration: { value: initialVals?.narration || "", label: initialVals?.narration || "" },
                    amount: initialVals?.amount || "",
                    // interestApplicable: initialVals?.interestApplicable === true? { label: "Yes", value: "Yes" }: initialVals?.interestApplicable === false? { label: "No", value: "No" }: { label: "", value: "" },
                    interestApplicable:initialVals?.rateOfInterest? { label: "Yes", value: "Yes" }: initialVals?.chargeType === "Additional Bill"? { label: "No", value: "No" }: { label: "", value: "" },
                    totalAmount: initialVals?.totalAmount || "",
                    billingFrequency: initialVals?.billingFrequency || "",
                    endDate: initialVals?.endDate || "",
                    startDate: initialVals?.startDate || "",
                    gst: initialVals?.gst || ""
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, setFieldValue, errors, touched }) => {
                    useEffect(() => {
                        // if (values.billingType.value === "PSF") {
                        //     const amount = values.psfRate * values.area;
                        //     setFieldValue("amount", amount);
                        //     setFieldValue("totalAmount", amount * getMultiplier(values.billingFrequency));
                        // } 
                        if (values.billingType.value === "Lumpsum" || values.billingType.value === "Narration") {
                            const totalAmount = values.amount * getMultiplier(values.billingFrequency);
                            setFieldValue("totalAmount", totalAmount);
                        } else {
                            setFieldValue("amount", "");
                            setFieldValue("totalAmount", "");
                        }
                    }, [values.billingType, values.psfRate, values.billingFrequency, values.amount, setFieldValue]);

                    useEffect(() => {
                        if (societyData && values.chargeType.value === 'Maintenance') {
                            setFieldValue("billingFrequency", societyData.billingFrequency || "");
                            setFieldValue("interestStartDate", societyData.interestCalculationStartDate?.split('T')[0] || "");
                        }
                    }, [societyData, setFieldValue]);
                    useEffect(() => {
                        if (["Wing", "Property", "Tower"].includes(values.chargeMasterType?.value) && values.societyName?.value) {
                            fetchTowersForDropDown(values.societyName)
                        }
                    }, [values.societyName?.value, values.chargeMasterType?.value])
                    useEffect(() => {
                        if (["Wing", "Property"].includes(values.chargeMasterType?.value) && values.tower?.value) {
                            fetchWingsForDropDown(values.tower)
                        }
                    }, [values.tower?.value, values.chargeMasterType?.value])
                    useEffect(() => {
                        if (["Property"].includes(values.chargeMasterType?.value) && values.wing?.value) {
                            fetchPropertiesForDropDown(values.wing)
                        }
                    }, [values.wing?.value, values.chargeMasterType?.value])
                    const getMultiplier = (billingFrequency: string) => {
                        switch (billingFrequency) {
                            case "Monthly":
                                return 1;
                            case "Bi-monthly":
                                return 2;
                            case "Quarterly":
                                return 3;
                            case "Half-Yearly":
                                return 6;
                            case "Yearly":
                                return 12;
                            default:
                                return 1;
                        }
                    };

                    return (
                        <FormikForm>
                            <Modal.Body>
                                <Row>
                                    <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Charge Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                name="chargeNumber"
                                                value={values.chargeNumber}
                                                onChange={handleChange}
                                                placeholder="charge Name"
                                                disabled
                                            />
                                        </Form.Group>
                                    </Col>
                                    {/* <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Charge Name<span className="text-danger">*</span></Form.Label>
                                            <Select
                                                name="chargeName"
                                                options={chargename}
                                                placeholder="Select name"
                                                classNamePrefix="Select2"
                                                value={values.chargeName}
                                                onChange={(selected) => setFieldValue("chargeName", selected)}
                                            />
                                            {errors.chargeName && touched.chargeName && (
                                                <div className="text-danger">{errors.chargeName as string}</div>
                                            )}
                                        </Form.Group>
                                    </Col> */}
                                    <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Charge Name<span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                name="chargeName"
                                                value={values.chargeName}
                                                onChange={handleChange}
                                                placeholder="charge Name"
                                            />
                                            {errors.chargeName && touched.chargeName && (
                                                <div className="text-danger">{errors.chargeName as string}</div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Charge Type<span className="text-danger">*</span></Form.Label>
                                            <Select
                                                name="chargeType"
                                                options={chargetype}
                                                placeholder="Select Type"
                                                classNamePrefix="Select2"
                                                value={values.chargeType}
                                                onChange={(selected) => {
                                                    setFieldValue("chargeType", selected)
                                                    resetFields(setFieldValue, "chargeType");
                                                }}
                                            />
                                            {errors.chargeType && touched.chargeType && (
                                                <div className="text-danger">{errors.chargeType as string}</div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Charge Master Type</Form.Label>
                                            <Select
                                                name="chargeMasterType"
                                                // options={chargemastertype}
                                                options={
                                                    values.chargeType?.value === "Maintenance"
                                                        ? maintenanceOptions
                                                        : values.chargeType?.value === "Additional Bill"
                                                            ? additionalBillOptions
                                                            : []
                                                }
                                                placeholder="Select Charge Master Type"
                                                classNamePrefix="Select2"
                                                value={values.chargeMasterType}
                                                onChange={(selected) => {
                                                    setFieldValue("chargeMasterType", selected)
                                                    setFieldValue("tower", null)
                                                    setFieldValue("wing", null)
                                                    setFieldValue("property", null)
                                                    setFieldValue("societyName", null)
                                                    resetFields(setFieldValue, "chargeMasterType");
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Society<span className="text-danger">*</span></Form.Label>
                                            <Select
                                                name="societyName"
                                                options={societyOptions}
                                                placeholder="Select Society"
                                                classNamePrefix="Select2"
                                                value={values.societyName}
                                                onChange={(selected) => {
                                                    setFieldValue("societyName", selected)
                                                    setFieldValue("tower", null)
                                                    setFieldValue("wing", null)
                                                    setFieldValue("property", null)
                                                    resetFields(setFieldValue, "societyName");
                                                    fetchSocietyDetails(selected?.value);

                                                    if (["Wing", "Property", "Tower"].includes(values.chargeMasterType?.value)) {
                                                        fetchTowersForDropDown(selected)
                                                    }
                                                }}
                                            />
                                            {errors.societyName && touched.societyName && (
                                                <div className="text-danger">{errors.societyName as string}</div>
                                            )}
                                        </Form.Group>
                                    </Col>

                                    {["Wing", "Property", "Tower"].includes(values.chargeMasterType?.value) && <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Tower</Form.Label>
                                            <Select
                                                name="tower"
                                                options={towerOptions}
                                                placeholder="Select Tower"
                                                classNamePrefix="Select2"
                                                value={values.tower}
                                                onChange={(selected) => {
                                                    setFieldValue("tower", selected)
                                                    setFieldValue("wing", null)
                                                    setFieldValue("prperty", null)
                                                    resetFields(setFieldValue, "tower");
                                                    if (["Wing", "Property"].includes(values.chargeMasterType?.value)) {
                                                        fetchWingsForDropDown(selected)
                                                    }
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>}
                                    {["Wing", "Property"].includes(values.chargeMasterType?.value) && <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Wing</Form.Label>
                                            <Select
                                                name="wing"
                                                options={wingOptions}
                                                placeholder="Select Wing"
                                                classNamePrefix="Select2"
                                                value={values.wing}
                                                onChange={(selected) => {
                                                    setFieldValue("wing", selected)
                                                    setFieldValue("property", null)
                                                    resetFields(setFieldValue, "wing");
                                                    if (["Property"].includes(values.chargeMasterType?.value)) {
                                                        fetchPropertiesForDropDown(selected)
                                                    }
                                                }

                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                    }


                                    {values.chargeMasterType?.value === "Property" && <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Property</Form.Label>
                                            <Select
                                                name="property"
                                                options={propertyOptions}
                                                placeholder="Select Properties"
                                                classNamePrefix="Select2"
                                                value={values.property}
                                                onChange={(selected) => setFieldValue("property", selected)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    }
                                    {
                                        values.chargeType?.value === "Maintenance" && <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Billing Frequency</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    className="form-control"
                                                    name="billingFrequency"
                                                    value={values.billingFrequency}
                                                    onChange={handleChange}
                                                    placeholder="Billing Frequency"
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Col>
                                    }

                                    {
                                        values.chargeType?.value === "Additional Bill" && <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Interest Applicable<span className="text-danger">*</span></Form.Label>
                                                <Select
                                                    name="interestApplicable"
                                                    options={interestApplicable}
                                                    placeholder="Select name"
                                                    classNamePrefix="Select2"
                                                    value={values.interestApplicable}
                                                    onChange={(selected) => {
                                                        setFieldValue("interestApplicable", selected)
                                                        resetFields(setFieldValue, "interestApplicable");
                                                    }}
                                                />
                                                {errors.interestApplicable && touched.interestApplicable && (
                                                    <div className="text-danger">{errors.interestApplicable as string}</div>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    }
                                    {
                                        values.interestApplicable?.value === "Yes" && <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Rate of Interest %<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    className="form-control"
                                                    name="rateOfInterest"
                                                    value={values.rateOfInterest}
                                                    onChange={handleChange}
                                                    placeholder="Interest rate %"
                                                />
                                                {errors.rateOfInterest && touched.rateOfInterest && (
                                                    <div className="text-danger">{errors.rateOfInterest as string}</div>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    }
                                    {(values.chargeType?.value === 'Maintenance' ||
                                        (values.chargeType?.value === 'Additional Bill' && values.interestApplicable?.value === 'Yes')) && <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Interest Start Date<span className="text-danger">*</span></Form.Label>
                                                <FormControl
                                                    type="date"
                                                    name="interestStartDate"
                                                    value={values.interestStartDate}
                                                    onChange={handleChange}
                                                />
                                                {errors.interestStartDate && touched.interestStartDate && (
                                                    <div className="text-danger">{errors.interestStartDate as string}</div>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    }
                                    {/* {
                                        (values.chargeType?.value === 'Maintenance' ||
                                            (values.chargeType?.value === 'Additional Bill' && values.interestApplicable?.value === 'Yes')) && <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Interest Due Date<span className="text-danger">*</span></Form.Label>
                                                <FormControl
                                                    type="date"
                                                    name="interestDueDate"
                                                    value={values.interestDueDate}
                                                    onChange={handleChange}
                                                />
                                                {errors.interestDueDate && touched.interestDueDate && (
                                                    <div className="text-danger">{errors.interestDueDate as string}</div>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    } */}
                                    <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Due Date<span className="text-danger">*</span></Form.Label>
                                            <FormControl
                                                type="date"
                                                name="dueDate"
                                                value={values.dueDate}
                                                onChange={handleChange}
                                            />
                                            {errors.dueDate && touched.dueDate && (
                                                <div className="text-danger">{errors.dueDate as string}</div>
                                            )}
                                        </Form.Group>
                                    </Col>


                                    <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Billing Type<span className="text-danger">*</span></Form.Label>
                                            <Select
                                                name="billingType"
                                                options={billingtype}
                                                placeholder="Select Billing Type"
                                                classNamePrefix="Select2"
                                                value={values.billingType}
                                                onChange={(selected) => setFieldValue("billingType", selected)}
                                            />
                                            {errors.billingType && touched.billingType && (
                                                <div className="text-danger">{errors.billingType as string}</div>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    {values.billingType?.value === "PSF" && (
                                        <>
                                            <Col xl={6}>
                                                <Form.Group className="form-group mb-1">
                                                    <Form.Label>PSF Rate</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="psfRate"
                                                        value={values.psfRate}
                                                        onChange={handleChange}
                                                        placeholder="PSF Rate"
                                                    />
                                                </Form.Group>
                                            </Col>

                                            {/* <Col xl={6}>
                                                <Form.Group className="form-group mb-1">
                                                    <Form.Label>Area (sq. ft.)</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="area"
                                                        value={values.area}
                                                        onChange={handleChange}
                                                        placeholder="Area"
                                                    />
                                                </Form.Group>
                                            </Col> */}
                                        </>
                                    )}
                                    {values.billingType?.value === "Narration" && <Col xl={6}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Narration <span className="text-danger">*</span></Form.Label>
                                            <Select
                                                options={narration}
                                                name="narration"
                                                onChange={(selected) => setFieldValue("narration", selected)}
                                                placeholder="Select narration"
                                                value={values.narration}
                                                classNamePrefix="Select2"
                                            />
                                            {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>
                                    }
                                    {
                                        (values.billingType?.value === "Narration" || values.billingType?.value === "Lumpsum") && <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Amount</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    className="form-control"
                                                    name="amount"
                                                    value={values.amount}
                                                    onChange={handleChange}
                                                    placeholder="Amount"
                                                    disabled={values.billingType?.value === "PSF"}
                                                />
                                            </Form.Group>
                                        </Col>
                                    }
                                    {
                                        (values.billingType?.value === "Narration" || values.billingType?.value === "Lumpsum") && <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Total Amount</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    className="form-control"
                                                    name="totalAmount"
                                                    value={values.totalAmount}
                                                    onChange={handleChange}
                                                    placeholder="Total Amount"
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Col>
                                    }
                                    <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Start Date<span className="text-danger">*</span></Form.Label>
                                            <FormControl
                                                type="date"
                                                name="startDate"
                                                value={values.startDate}
                                                onChange={handleChange}
                                            />
                                            {errors.startDate && touched.startDate && (
                                                <div className="text-danger">{errors.startDate as string}</div>
                                            )}
                                        </Form.Group>
                                    </Col>

                                    <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>End Date<span className="text-danger">*</span></Form.Label>
                                            <FormControl
                                                type="date"
                                                name="endDate"
                                                value={values.endDate}
                                                onChange={handleChange}
                                            />
                                            {errors.endDate && touched.endDate && (
                                                <div className="text-danger">{errors.endDate as string}</div>
                                            )}
                                        </Form.Group>
                                    </Col>


                                    {/* <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Is Active</Form.Label>
                                            <FormCheck
                                                type="checkbox"
                                                name="isActive"
                                                checked={values.isActive || false}
                                                onChange={() => setFieldValue("isActive", !values.isActive)}
                                            />
                                        </Form.Group>
                                    </Col> */}

                                    <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>GST %</Form.Label>
                                            <FormControl
                                                type="text"
                                                name="gst"
                                                className='form-control'
                                                value={values.gst}
                                                onChange={handleChange}
                                                placeholder='0.00%'
                                            />
                                        </Form.Group>
                                    </Col>

                                </Row>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="default" onClick={onClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit">
                                    {editing ? "Update" : "Save"}
                                </Button>
                            </Modal.Footer>
                        </FormikForm>
                    );
                }}
            </Formik>
        </Modal>
    );
};

export default ChargeMasterModal;
