
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Accordion, Button, Form, Modal, FormControl } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
// import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
// import stateCities from "../stateCity.json"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { Uploader } from 'uploader';
// import { UploadButton } from 'react-uploader';
import { getAllSocietyApi, getTowersOfSocietyApi, getWingsOfSocietyApi } from '../../../api/society-api';
import { handleApiError } from '../../../helpers/handle-api-error';
import { showToast, CustomToastContainer } from '../../../common/services/toastServices';
// import { getAllWingApi } from '../../../api/wing-api';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { getMemberForDropDownApi } from '../../../api/user-api';
import { getSinglePropertyDetailsApi, getTenantOptions, updatePropertyApi } from '../../../api/property-api';
import * as Yup from 'yup';
// Define the types for the stateCities object
// interface StateCities {
//     [key: string]: string[];
// }

interface Member {
    memberIdentifier: string;
    ownership: number;
    isPrimary?: boolean;
    member: {
        firstName: string;
        middleName: string;
        lastName: string;
    };
}
interface TenantProperty {
    tenantIdentifier: string;
    tenant: {
        firstName: string;
        middleName: string;
        lastName: string;
    };

}
// interface Society {
//     societyIdentifier: string,
//     societyName: string,
//     address: string,
//     addressLine2: string,
//     addressLine3: string,
//     state: string,
//     city: string,
//     pincode: string
// }

// interface Tower {
//     towerName: string,
//     towerIdentifier: string
// }
// interface Wing {
//     wingName: string,
//     wingIdentifier: string
// }

interface Property {
    propertyId: string | null;
    propertyName: string;
    status: string | null;
    narration: string | null;
    area: string;
    societyIdentifier: string;
    societyName: string;
    society: any;
    towerIdentifier: string | null;
    towerName: string | null;
    tower: any;
    wingIdentifier: string | null;
    wingName: string | null;
    wing: any;
    flatNumber: string;
    floorNumber: string;
    dealType: string | null;
    flatRegistrationNumber: string;
    dateOfAgreement: string;
    dateOfRegistration: string;
    memberName: string | null;
    memberIdentifier: string | null;
    propertyMembers: Member[];
    tenantName: string | null;
    tenantIdentifier: string | null;
    rentAgreementStartDate: string;
    rentAgreementEndDate: string;
    monthlyRent: string;
    rentRegistrationId: string;
    rentAgreementFile: string | null;
    policeVerificationDocFile: string | null;
    intercomNumber: string;
    electricityNumber: string;
    gasConnectionNumber: string;
    monthlyMaintenance: string;
    monthlyMaintenanceUpto: string;
    monthlyPaidArrears: string;
    monthlyPaidArrearsUpto: string;
    isPrimary: boolean;
    tenantProperty: TenantProperty;
    openingPrincipalAmount: string,
    openingInterestAmount: string,
    dateOfOpeningBalance: string
}
// const uploader = Uploader({
//     apiKey: 'free'
// });
// const stateCitiesTyped: StateCities = stateCities;

const selectFieldValidation = (fieldLabel: string) =>
    Yup.object()
        .nullable()
        .test(fieldLabel, `${fieldLabel} is required`, function (val: any) {

            if (!val || typeof val !== 'object') return false;

            if (typeof val.value === 'undefined' || val.value === null || val.value === '') return false;

            return true;
        });

const validationSchema = Yup.object().shape({
    propertyName: Yup.string().required('Property name is required'),
    status: selectFieldValidation('Status'),
    narration: selectFieldValidation('Narration'),
    area: Yup.string().required('Area is required'),
    society: selectFieldValidation('Society'),
    member: selectFieldValidation('Member'),
    tower: selectFieldValidation('Tower'),
    wing: selectFieldValidation('Wing'),
    flatNumber: Yup.string().required('Flat number is required'),
    floorNumber: Yup.string().required('Floor number is required'),

    dateOfOpeningBalance: Yup.date().required('Date of opening balance is required'),

    openingPrincipalAmount: Yup.string()
        .test('is-number', 'Opening principal amount must be a number', function (val) {
            return !val || /^\d+(\.\d+)?$/.test(val);
        }),

    openingInterestAmount: Yup.string()
        .test('is-number', 'Opening interest amount must be a number', function (val) {
            return !val || /^\d+(\.\d+)?$/.test(val);
        }),

    monthlyMaintenance: Yup.string()
        .test('is-number', 'Monthly paid maintenance must be a number', function (val) {
            return !val || /^\d+(\.\d+)?$/.test(val);
        }),

    monthlyPaidArrears: Yup.string()
        .test('is-number', 'Monthly paid arrears must be a number', function (val) {
            return !val || /^\d+(\.\d+)?$/.test(val);
        }),

    intercomNumber: Yup.string()
        .test('is-number', 'Intercom number must be a number', function (val) {
            return !val || /^\d+$/.test(val);
        }),
});
export default function EditPropertyMaster() {
    const [currentProperty, setCurrentProperty] = useState<Property>({
        propertyId: null,
        propertyName: '',
        status: null,
        narration: null,
        area: "",
        societyIdentifier: "",
        societyName: "",
        society: null,
        tower: null,
        wing: null,
        towerIdentifier: null,
        towerName: null,
        wingIdentifier: null,
        wingName: null,
        flatNumber: "",
        floorNumber: "",
        dealType: null,
        flatRegistrationNumber: '',
        dateOfAgreement: "",
        dateOfRegistration: "",
        memberName: null,
        memberIdentifier: null,
        propertyMembers: [],
        tenantName: null,
        tenantIdentifier: null,
        rentAgreementStartDate: "",
        rentAgreementEndDate: "",
        monthlyRent: "",
        rentRegistrationId: "",
        rentAgreementFile: null,
        policeVerificationDocFile: null,
        intercomNumber: "",
        electricityNumber: "",
        gasConnectionNumber: "",
        monthlyMaintenance: "",
        monthlyMaintenanceUpto: "",
        monthlyPaidArrears: "",
        monthlyPaidArrearsUpto: "",
        openingPrincipalAmount: "",
        openingInterestAmount: "",
        dateOfOpeningBalance: "",
        tenantProperty: {
            tenantIdentifier: "",
            tenant: {
                firstName: "",
                middleName: "",
                lastName: ""
            }
        },
        isPrimary: false
    });
    const [societyData, setSocietyData] = useState<any[]>([]);
    const [towerOptions, setTowerOptions] = useState<any[]>([]);
    const [wingOptions, setWingOptions] = useState<any[]>([]);
    const [tenantOptions, setTenantOptions] = useState<any[]>([]);
    const [memberOptions, setMemberOptions] = useState<any[]>([]);
    const [co_OwnerOptions, setCo_OwnerOptions] = useState<any[]>([]);
    const [thirdOwnerOptions, setThirdOwnerOptions] = useState<any[]>([]);
    const [fourthOwnerOptions, setFourthOwnerOptions] = useState<any[]>([]);
    const [fifthOwnerOptions, setFifthOwnerOptions] = useState<any[]>([]);
    const [flatsoldmodalshow, setflatsoldmodal] = useState(false);
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation();
    const ownerChange = location.state ?? false;
    const identifier = params.identifier as string



    const propertystatus = [
        { value: "Sold", label: "Sold" },
        { value: "Unsold", label: "Unsold" },
        { value: "Blocked by Management", label: "Blocked by Management" },
        { value: "Refuge", label: "Refuge" },
        { value: "Resale", label: "Resale" },
    ]

    const filteredStatus = ownerChange
        ? propertystatus.filter(status => status.value === "Resale")
        : propertystatus.filter(status => status.value !== "Resale");

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


    const dealtype = [
        { value: "Self Occupied", label: "Self Occupied" },
        { value: "Rented", label: "Rented" },
        { value: "Sell", label: "Sell" },
        { value: "Rent", label: "Rent" },
        { value: "Lease", label: "Lease" },

    ]

    const societyOptions = societyData?.map((society) => ({
        value: society.societyIdentifier,
        label: society.societyName
    }))

    useEffect(() => {
        (async () => {
            await fetchSocietiesForDropDown();
            // await fetchTenantsForDropDown();
            await fetchMembersForDropDown();

            await fetchTenantOptions()
        })()
    }, [])


    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await getSinglePropertyDetailsApi(identifier)
                setCurrentProperty(response.data.data)
            } catch (error: any) {
                const errorMessage = handleApiError(error)
                showToast('error', errorMessage)
            }
        }
        if (identifier) {
            fetchPropertyDetails()
        }
    }, [identifier])



    const fetchTenantOptions = async () => {
        try {
            const response = await getTenantOptions();
            const formattedData = response.data.data.map((item: any) => ({
                value: item.tenantIdentifier,
                label: `${item.firstName} ${item.middleName} ${item.lastName}`,
            }));
            setTenantOptions(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }

    const fetchSocietiesForDropDown = async () => {
        try {
            const response = await getAllSocietyApi();
            const formattedData = response.data.data.map((item: any) => ({
                societyIdentifier: item.societyIdentifier,
                societyName: item.societyName,
            }));
            setSocietyData(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }
    const fetchWingsForDropDown = async (society: any) => {
        try {
            const response = await getWingsOfSocietyApi(society.value);
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
            const response = await getTowersOfSocietyApi(society.value);
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
    const fetchMembersForDropDown = async () => {
        try {
            const response = await getMemberForDropDownApi();
            const formattedData = response.data.data.map((item: any) => ({
                value: item.identifier,
                label: `${item.firstName} ${item.middleName} ${item.lastName}`,
            }));
            setMemberOptions(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }


    // const viewDemoShow = (modal: any) => {
    //     switch (modal) {

    //         case "flatsoldmodalshow":
    //             setflatsoldmodal(true);
    //             break;

    //     }
    // };

    const viewDemoClose = (modal: any) => {
        switch (modal) {

            case "flatsoldmodalshow":
                setflatsoldmodal(false);
                break;

        }
    };


    const handleSubmit = async (values: any) => {
        const formattedData: any = {
            propertyName: values.propertyName,
            status: values.status.value,
            narration: values.narration.value,
            area: values.area,
            societyIdentifier: values.society?.value,
            towerIdentifier: values.tower?.value,
            wingIdentifier: values.wing?.value,
            flatNumber: values?.flatNumber,
            floorNumber: values.floorNumber,
            dealType: values.dealType.value,
            flatRegistrationNumber: values.flatRegistrationNumber,
            dateOfAgreement: values.dateOfAgreement,
            dateOfRegistration: values.dateOfRegistration,
            firstOwnerIdentifier: values.member.value,
            coOwnerIdentifier: values.coOwner.value,
            thirdOwnerIdentifier: values.thirdOwner.value,
            fourthOwnerIdentifier: values.fourthOwner.value,
            fifthOwnerIdentifier: values.fifthOwner.value,
            tenantIdentifier: values.tenant.value,
            rentAgreementStartDate: values.rentAgreementStartDate,
            rentAgreementEndDate: values.rentAgreementEndDate,
            monthlyRent: values.monthlyRent,
            rentRegistrationId: values.rentRegistrationId,
            rentAgreementFile: values.rentAgreementFile,
            policeVerificationDocFile: values.policeVerificationDocFile,
            intercomNumber: values.intercomNumber,
            consumerElectricityNumber: values.electricityNumber,
            gasConnectionNumber: values.gasConnectionNumber,
            monthlyPaidMaintenance: values.monthlyMaintenance,
            monthlyPaidMaintenanceUpto: values.monthlyMaintenanceUpto,
            monthlyPaidArrears: values.monthlyPaidArrears,
            monthlyPaidArrearsUpto: values.monthlyPaidArrearsUpto,
            openingPrincipalAmount: values?.openingPrincipalAmount,
            openingInterestAmount: values?.openingInterestAmount,
            dateOfOpeningBalance: values?.dateOfOpeningBalance,

        }
        if (formattedData.dealType === "Self Occupied") {
            formattedData.isPrimary = values.primaryProperty === "yes" ? true : false
            formattedData.tenantIdentifier = null
        }

        const response = await updatePropertyApi(formattedData, identifier)
        if (response.status === 201 || response.status === 200) {
            showToast("success", "Property updated successfully")
        }
    }

    const handleMemberChange = async (identifier: string) => {

        const updatedData = memberOptions.filter((member: any) => member.value !== identifier);
        setCo_OwnerOptions(updatedData);

    };
    const handleCoOwnerChange = async (identifier: string, memberId: string) => {
        const updatedData = memberOptions.filter((coOwner: any) => coOwner.value !== identifier && coOwner.value !== memberId);
        setThirdOwnerOptions(updatedData);
    };
    const handleThirdOwnerChange = async (identifier: string, memberid: string, coOwnerId: string) => {
        const updatedData = memberOptions.filter((thirdOwner: any) => thirdOwner.value !== identifier && thirdOwner.value !== memberid && thirdOwner.value !== coOwnerId);
        setFourthOwnerOptions(updatedData);
    };

    const handleFourthOwnerChange = async (identifier: string, memberid: string, coOwnerId: string, thirdOwnerId: string) => {
        const updatedData = memberOptions.filter((fourthOwner: any) => fourthOwner.value !== identifier && fourthOwner.value !== memberid && fourthOwner.value !== coOwnerId && fourthOwner.value !== thirdOwnerId);
        setFifthOwnerOptions(updatedData);
    };

    const getMemberByOwnership = (ownership: number) => {
        const member = currentProperty?.propertyMembers.find((member: any) => member.ownership === ownership);
        if (member) {
            return {
                value: member.memberIdentifier || "",
                label: `${member.member.firstName || ''} ${member.member.middleName || ''} ${member.member.lastName || ''}`.trim() || ""
            };
        }

        return { value: "", label: "" };
    };



    return (
        <Fragment>
            <div className="breadcrumb-header justify-content-between">
                <div className="left-content">
                    <span className="main-content-title mg-b-0 mg-b-lg-1"> <Button onClick={() => navigate(-1)} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Button> Edit Property Master</span>
                </div>
            </div>
            {currentProperty ? (
                <Formik
                    enableReinitialize
                    initialValues={{
                        propertyName: currentProperty?.propertyName || "",
                        // status: currentProperty?.status,
                        status: { value: currentProperty?.status || "", label: currentProperty?.status || "" },

                        narration: { value: currentProperty?.narration || "", label: currentProperty?.narration || "" },

                        area: currentProperty?.area || "",

                        society: { value: currentProperty?.society?.societyIdentifier || "", label: currentProperty?.society?.societyName || "" },

                        tower: { value: currentProperty?.tower?.towerIdentifier || "", label: currentProperty?.tower?.towerName || "" },

                        wing: { value: currentProperty?.wing?.wingIdentifier || "", label: currentProperty?.wing?.wingName || "" },

                        flatNumber: currentProperty?.flatNumber || "",

                        floorNumber: currentProperty?.floorNumber || "",

                        openingPrincipalAmount: currentProperty?.openingPrincipalAmount || "",
                        openingInterestAmount: currentProperty?.openingInterestAmount || "",
                        dateOfOpeningBalance: currentProperty?.dateOfOpeningBalance || "",

                        // dealType: currentProperty?.dealType,
                        dealType: { value: currentProperty?.dealType || "", label: currentProperty?.dealType || "" },

                        flatRegistrationNumber: currentProperty?.flatRegistrationNumber || "",

                        dateOfAgreement: currentProperty?.dateOfAgreement || "",

                        dateOfRegistration: currentProperty?.dateOfRegistration || "",

                        // member: { value: currentProperty?.memberIdentifier, label: currentProperty?.memberName },
                        member: getMemberByOwnership(1),
                        coOwner: getMemberByOwnership(2),
                        thirdOwner: getMemberByOwnership(3),
                        fourthOwner: getMemberByOwnership(4),
                        fifthOwner: getMemberByOwnership(5),

                        tenant: { value: currentProperty?.tenantProperty?.tenantIdentifier || "", label: `${currentProperty?.tenantProperty?.tenant?.firstName || ''} ${currentProperty?.tenantProperty?.tenant?.middleName || ''} ${currentProperty?.tenantProperty?.tenant?.lastName || ''}`.trim() || "" },

                        rentAgreementStartDate: currentProperty?.rentAgreementStartDate || "",

                        rentAgreementEndDate: currentProperty?.rentAgreementEndDate || "",

                        monthlyRent: currentProperty?.monthlyRent || "",

                        rentRegistrationId: currentProperty?.rentRegistrationId || "",

                        rentAgreementFile: currentProperty?.rentAgreementFile || "",

                        policeVerificationDocFile: currentProperty?.policeVerificationDocFile || "",

                        intercomNumber: currentProperty?.intercomNumber || "",

                        electricityNumber: currentProperty?.electricityNumber || "",

                        gasConnectionNumber: currentProperty?.gasConnectionNumber || "",

                        monthlyMaintenance: currentProperty?.monthlyMaintenance || "",

                        monthlyMaintenanceUpto: currentProperty?.monthlyMaintenanceUpto || "",

                        monthlyPaidArrears: currentProperty?.monthlyPaidArrears || "",

                        monthlyPaidArrearsUpto: currentProperty?.monthlyPaidArrearsUpto || "",

                        primaryProperty: currentProperty?.propertyMembers[0]?.isPrimary ? "yes" : "no"

                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values,errors }) => {
                        console.log(errors)
                        useEffect(() => {
                            if (values.member && values.member.value) {
                                handleMemberChange(values.member.value);
                            }
                        }, [values.member, memberOptions]);

                        useEffect(() => {
                            if (values.coOwner && values.coOwner.value) {
                                handleCoOwnerChange(values.coOwner.value, values.member?.value);
                            }
                        }, [values.coOwner, memberOptions]);

                        useEffect(() => {
                            if (values.thirdOwner && values.thirdOwner.value) {
                                handleThirdOwnerChange(values.thirdOwner.value, values.member?.value, values.coOwner.value);
                            }
                        }, [values.thirdOwner, memberOptions]);
                        return (
                            <FormikForm>

                                <Row>
                                    <Col xl={12}>

                                        <Accordion defaultActiveKey="Basic Details">

                                            <Accordion.Item eventKey="Basic Details" className="bg-white mb-3">
                                                <Accordion.Header className="borders ">
                                                    Basic Details
                                                </Accordion.Header>
                                                <Accordion.Body className="borders p-0">
                                                    <Card className='m-0'>

                                                        <Card.Body className='pt-3'>

                                                            <Row>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Property Name <span className="text-danger">*</span></Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="propertyName"
                                                                            placeholder="Property name"
                                                                            className="form-control"
                                                                            disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="propertyName" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>

                                                                {/* <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Owner <span className="text-danger">*</span></Form.Label>
                                <FormControl
                                  type="text"
                                  name="ownername"
                                  placeholder="Owner name"
                                  className="form-control"
                                />
                               
                              </Form.Group>
                            </Col> */}


                                                                {/* <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Ledger Name <span className="text-danger">*</span></Form.Label>
                                <FormControl
                                  type="text"
                                  name="ledgername"
                                  placeholder="Ledger Name"
                                  className="form-control"
                                />

                              </Form.Group>
                            </Col> */}


                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Status <span className="text-danger">*</span></Form.Label>
                                                                        <Select
                                                                            options={filteredStatus}
                                                                            name='status'
                                                                            value={values.status}
                                                                            onChange={(selected) => setFieldValue("status", selected)}
                                                                            placeholder="Select Status"
                                                                            classNamePrefix="Select2"
                                                                        />
                                                                        <ErrorMessage name="status" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>


                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Narration <span className="text-danger">*</span></Form.Label>
                                                                        <Select
                                                                            options={narration}
                                                                            name="narration"
                                                                            value={values.narration}
                                                                            onChange={(selected) => setFieldValue("narration", selected)}
                                                                            placeholder="Select narration"
                                                                            classNamePrefix="Select2"
                                                                            isDisabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="narration" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Area(sq.ft.) <span className="text-danger">*</span></Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="area"
                                                                            placeholder="Area"
                                                                            className="form-control"
                                                                            disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="area" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Society <span className="text-danger">*</span></Form.Label>
                                                                        <Select
                                                                            options={societyOptions}
                                                                            name='society'
                                                                            value={values.society}
                                                                            onChange={(selected) => {
                                                                                setFieldValue("society", selected)
                                                                                setFieldValue("tower", null); // Reset tower selection
                                                                                fetchTowersForDropDown(selected);
                                                                                fetchWingsForDropDown(selected);
                                                                            }}
                                                                            isDisabled={ownerChange}
                                                                            placeholder="Select Society"
                                                                            classNamePrefix="Select2"
                                                                        />
                                                                        <ErrorMessage name="society" component="div" className="text-danger" />

                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Tower</Form.Label>
                                                                        <Select
                                                                            options={towerOptions}
                                                                            name='tower'
                                                                            value={values.tower}
                                                                            onChange={(selected) => setFieldValue("tower", selected)}
                                                                            placeholder="Select tower"
                                                                            classNamePrefix="Select2"
                                                                            isDisabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="tower" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>



                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Wing <span className="text-danger">*</span></Form.Label>
                                                                        <Select
                                                                            options={wingOptions}
                                                                            name='wing'
                                                                            value={values.wing}
                                                                            onChange={(selected) => setFieldValue("wing", selected)}
                                                                            placeholder="Select wing"
                                                                            classNamePrefix="Select2"
                                                                            isDisabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="wing" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>


                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Flat No. <span className="text-danger">*</span></Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="flatNumber"
                                                                            placeholder="Flat no"
                                                                            className="form-control"
                                                                            disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="flatNumber" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Floor No.</Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="floorNumber"
                                                                            placeholder="Floor no"
                                                                            className="form-control"
                                                                            disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="floorNumber" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Deal Type</Form.Label>
                                                                        <Select
                                                                            options={dealtype}
                                                                            name="dealType"
                                                                            value={values.dealType}
                                                                            onChange={(selected) => setFieldValue("dealType", selected)}
                                                                            placeholder="Select Type"
                                                                            classNamePrefix="Select2"
                                                                        // isDisabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="dealType" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>
                                                                {
                                                                    ["Rented", "Rent", "Lease"].includes(values?.dealType?.label || "") && <Col xl={4}>
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>Tenant</Form.Label>
                                                                            <Select
                                                                                options={tenantOptions}
                                                                                name='tenant'
                                                                                value={values.tenant}
                                                                                onChange={(selected) => setFieldValue("tenant", selected)}
                                                                                placeholder="Select tenant"
                                                                                classNamePrefix="Select2"
                                                                            // isDisabled={ownerChange}
                                                                            />
                                                                            <ErrorMessage name="tenant" component="div" className="text-danger" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                }

                                                                {
                                                                    ["Rented", "Rent", "Lease"].includes(values?.dealType?.label || "") &&
                                                                    <Col xl={4}>
                                                                        <Form.Group className="form-group pt-1">
                                                                            {/* <Button disabled={true} className='btn mt-4 btn-default'>Add Tenant</Button> */}
                                                                            <Link style={{ display: "grid" }} to={`${import.meta.env.BASE_URL}tenant/addtenant`} className='btn mt-4 btn-default'>Add Tenant</Link>
                                                                        </Form.Group>
                                                                    </Col>
                                                                }
                                                                {
                                                                    ["Self Occupied"].includes(values?.dealType?.label || "") &&
                                                                    <Col xl={4}>
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>Primary Property</Form.Label>

                                                                            <div className="d-flex align-items-center">
                                                                                {/* Primary Radio Button */}
                                                                                <div className="me-3">
                                                                                    <Field
                                                                                        type="radio"
                                                                                        name="primaryProperty"
                                                                                        value="yes"
                                                                                        checked={values.primaryProperty === "yes"}
                                                                                        onChange={() => setFieldValue("primaryProperty", "yes")}
                                                                                    // disabled={ownerChange}
                                                                                    />
                                                                                    <label htmlFor="yes" className="ms-2">Yes</label>
                                                                                </div>

                                                                                {/* Secondary Radio Button */}
                                                                                <div>
                                                                                    <Field
                                                                                        type="radio"
                                                                                        name="primaryProperty"
                                                                                        value="no"
                                                                                        checked={values.primaryProperty === "no"}
                                                                                        onChange={() => setFieldValue("primaryProperty", "no")}
                                                                                    // disabled={ownerChange}
                                                                                    />
                                                                                    <label htmlFor="no" className="ms-2">No</label>
                                                                                </div>
                                                                            </div>
                                                                        </Form.Group>
                                                                    </Col>
                                                                }

                                                            </Row>

                                                        </Card.Body>
                                                    </Card>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            <Accordion.Item eventKey="Owner Details" className="bg-white  mb-3">
                                                <Accordion.Header className="borders">
                                                    Owner Details
                                                </Accordion.Header>
                                                <Accordion.Body className="borders p-0">
                                                    <Card className='m-0'>

                                                        <Card.Body className='pt-3'>

                                                            <Row>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Member</Form.Label>
                                                                        <Select
                                                                            options={memberOptions}
                                                                            name="member"
                                                                            value={values.member}
                                                                            onChange={(selected) => {
                                                                                setFieldValue("member", selected)
                                                                                handleMemberChange(selected?.value || "")
                                                                                // setCoOwnerDisabled(false)
                                                                            }
                                                                            }
                                                                            placeholder="Select Member"
                                                                            classNamePrefix="Select2"
                                                                        />
                                                                        <ErrorMessage name="member" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Co Owner </Form.Label>
                                                                        <Select
                                                                            options={co_OwnerOptions}
                                                                            name="coOwner"
                                                                            value={values.coOwner}
                                                                            // isDisabled={coOwnerDisabled}
                                                                            onChange={(selected) => {
                                                                                setFieldValue("coOwner", selected)
                                                                                handleCoOwnerChange(selected?.value || "", values.member?.value)
                                                                                // setThirdOwnerDisabled(false)
                                                                            }}
                                                                            placeholder="Select Co Owner"
                                                                            classNamePrefix="Select2"
                                                                        />
                                                                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                                    </Form.Group>
                                                                </Col>


                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Third Owner</Form.Label>
                                                                        <Select
                                                                            options={thirdOwnerOptions}
                                                                            name="thirdOwner"
                                                                            value={values.thirdOwner}
                                                                            // isDisabled={thirdOwnerDisabled}
                                                                            onChange={(selected) => {
                                                                                handleThirdOwnerChange(selected?.value || "", values.member?.value, values.coOwner.value)
                                                                                setFieldValue("thirdOwner", selected)
                                                                                // setFourthOwnerDisabled(false)
                                                                            }
                                                                            }
                                                                            placeholder="Select Third Owner"
                                                                            classNamePrefix="Select2"
                                                                        />
                                                                        {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                                                    </Form.Group>
                                                                </Col>


                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Fourth Owner</Form.Label>
                                                                        <Select
                                                                            options={fourthOwnerOptions}
                                                                            name="fourthOwner"
                                                                            value={values.fourthOwner}
                                                                            // isDisabled={fourthOwnerDisabled}
                                                                            onChange={(selected) => {
                                                                                handleFourthOwnerChange(selected?.value || "", values.member?.value, values.coOwner?.value, values.thirdOwner?.value)
                                                                                setFieldValue("fourthOwner", selected)
                                                                                // setFifthOwnerDisabled(false)
                                                                            }}
                                                                            placeholder="Select Fourth Owner"
                                                                            classNamePrefix="Select2"
                                                                        />
                                                                        {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                                                                    </Form.Group>
                                                                </Col>



                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Fifth Owner</Form.Label>
                                                                        <Select
                                                                            options={fifthOwnerOptions}
                                                                            name="fifthOwner"
                                                                            value={values.fifthOwner}
                                                                            // isDisabled={fifthOwnerDisabled}
                                                                            onChange={(selected) => setFieldValue("fifthOwner", selected)}
                                                                            placeholder="Select Fifth Owner"
                                                                            classNamePrefix="Select2"
                                                                        />
                                                                        {/* <ErrorMessage name="state" component="div" className="text-danger" /> */}
                                                                    </Form.Group>
                                                                </Col>


                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Previous Owner</Form.Label>
                                                                        <FormControl
                                                                            type="text"
                                                                            name="previousOwner"
                                                                            disabled={true}
                                                                            className="form-control"
                                                                        />
                                                                        {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                                                                    </Form.Group>
                                                                </Col>






                                                            </Row>

                                                        </Card.Body>
                                                    </Card>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            <Accordion.Item eventKey="Registration Details" className="bg-white  mb-3">
                                                <Accordion.Header className="borders">
                                                    Registration Details
                                                </Accordion.Header>
                                                <Accordion.Body className="borders p-0">
                                                    <Card className='m-0'>

                                                        <Card.Body className='pt-3'>

                                                            <Row>

                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Flat Registration Number</Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="flatRegistrationNumber"
                                                                            placeholder="Flat Registration Number"
                                                                            className="form-control"
                                                                        // disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="flatRegistrationNumber" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Date of Agreement </Form.Label>
                                                                        <Field
                                                                            type="date"
                                                                            name="dateOfAgreement"
                                                                            placeholder="Date of Agreement"
                                                                            className="form-control"
                                                                        // disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="dateOfAgreement" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>


                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Date of Registration</Form.Label>
                                                                        <Field
                                                                            type="date"
                                                                            name="dateOfRegistration"
                                                                            placeholder="Date of Registration"
                                                                            className="form-control"
                                                                        // disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="dateOfRegistration" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>




                                                            </Row>

                                                        </Card.Body>
                                                    </Card>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            <Accordion.Item eventKey="Interest Details" className="bg-white  mb-3">
                                                <Accordion.Header className="borders">
                                                    Interest Details
                                                </Accordion.Header>
                                                <Accordion.Body className="borders p-0">
                                                    <Card className='m-0'>

                                                        <Card.Body className='pt-3'>

                                                            <Row>


                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Opening Principal Amount </Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="openingPrincipalAmount"
                                                                            placeholder="Principal Amount"
                                                                            className="form-control"
                                                                        // disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="openingPrincipalAmount" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Opening Interest Amount </Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="openingInterestAmount"
                                                                            placeholder="Interest Amount"
                                                                            className="form-control"
                                                                        // disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="openingInterestAmount" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Date of opening Balance<span className="text-danger">*</span></Form.Label>
                                                                        <Field
                                                                            type="date"
                                                                            name="dateOfOpeningBalance"
                                                                            className="form-control"
                                                                        // disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="dateOfOpeningBalance" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>

                                                            </Row>

                                                        </Card.Body>
                                                    </Card>
                                                </Accordion.Body>
                                            </Accordion.Item>




                                            <Accordion.Item eventKey="Address Details" className="bg-white  mb-3">
                                                <Accordion.Header className="borders">
                                                    Address Details
                                                </Accordion.Header>
                                                <Accordion.Body className="borders p-0">
                                                    <Card className='m-0'>

                                                        <Card.Body className='pt-3'>

                                                            <Row>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Address line 1</Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            disabled
                                                                            name="address"
                                                                            placeholder="Opp Mohan Palms"
                                                                            className="form-control"
                                                                        />
                                                                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Address line 2</Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            disabled
                                                                            name="address"
                                                                            placeholder="Shirgaon"
                                                                            className="form-control"
                                                                        />
                                                                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Address line 3</Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            disabled
                                                                            name="address"
                                                                            placeholder="Badlapur East"
                                                                            className="form-control"
                                                                        />
                                                                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>City </Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="city"
                                                                            disabled
                                                                            placeholder="Thane"
                                                                            className="form-control"
                                                                        />
                                                                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>State </Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="city"
                                                                            disabled
                                                                            placeholder="Maharashtra"
                                                                            className="form-control"
                                                                        />
                                                                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Pincode </Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="city"
                                                                            disabled
                                                                            placeholder="421503"
                                                                            className="form-control"
                                                                        />
                                                                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                                    </Form.Group>
                                                                </Col>

                                                            </Row>

                                                        </Card.Body>
                                                    </Card>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            <Accordion.Item eventKey="Other Details" className="bg-white  mb-3">
                                                <Accordion.Header className="borders" id="Portfolio">
                                                    Other Details
                                                </Accordion.Header>
                                                <Accordion.Body className="borders p-0">
                                                    <Card className='m-0'>

                                                        <Card.Body className='pt-3'>
                                                            <Row>
                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Intercom Number </Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="intercomNumber"
                                                                            placeholder="Intercom Number"
                                                                            className="form-control"
                                                                        // disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="intercomNumber" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Consumer Electricity Number </Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="electricityNumber"
                                                                            placeholder="Consumer Electricity Number"
                                                                            className="form-control"
                                                                        // disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="electricityNumber" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={4}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Gas Connection Number </Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="gasConnectionNumber"
                                                                            placeholder="Gas Connection Number"
                                                                            className="form-control"
                                                                        // disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="gasConnectionNumber" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </Card.Body>
                                                    </Card>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                            <Accordion.Item eventKey="Already Paid Details" className="bg-white  mb-3">
                                                <Accordion.Header className="borders" id="Portfolio">
                                                    Already Paid Details
                                                </Accordion.Header>
                                                <Accordion.Body className="borders p-0">
                                                    <Card className='m-0'>

                                                        <Card.Body className='pt-3'>
                                                            <Row>
                                                                <Col xl={3}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>
                                                                            Monthly Paid Maintenance to Builder</Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="monthlyMaintenance"
                                                                            placeholder="Monthly Paid Maintenance to Builder"
                                                                            className="form-control"
                                                                        // disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="monthlyMaintenance" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={3}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>
                                                                            Monthly Paid Maintenance to Builder Upto</Form.Label>
                                                                        <Field
                                                                            type="date"
                                                                            name="monthlyMaintenanceUpto"
                                                                            placeholder="Monthly Paid Maintenance to Builder Upto"
                                                                            className="form-control"
                                                                        // disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="monthlyMaintenanceUpto" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={3}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>
                                                                            Monthly Paid Arrears</Form.Label>
                                                                        <Field
                                                                            type="text"
                                                                            name="monthlyPaidArrears"
                                                                            placeholder="Monthly Paid Arrears"
                                                                            className="form-control"
                                                                        // disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="monthlyPaidArrears" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col xl={3}>
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>
                                                                            Monthly Paid Arrears Upto</Form.Label>
                                                                        <Field
                                                                            type="date"
                                                                            name="monthlyPaidArrearsUpto"
                                                                            placeholder="Monthly Paid Arrears Upto"
                                                                            className="form-control"
                                                                        // disabled={ownerChange}
                                                                        />
                                                                        <ErrorMessage name="monthlyPaidArrearsUpto" component="div" className="text-danger" />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                        </Card.Body>
                                                    </Card>
                                                </Accordion.Body>
                                            </Accordion.Item>

                                        </Accordion>
                                        <span className='float-end mb-5'>
                                            <Button variant="default ms-3"> Cancel </Button>
                                            <Button className="btn btn-primary" type="submit">Save </Button>
                                        </span>
                                    </Col>
                                </Row >
                            </FormikForm>
                        )
                    }}
                </Formik>
            ) : (
                <p>Loading society data...</p>
            )}
            {/* <Button variant="success" onClick={() => viewDemoShow("flatsoldmodalshow")}> Flat Sold </Button> */}
            <Modal centered show={flatsoldmodalshow}>
                <Modal.Header>
                    <Modal.Title>Flat Sold</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("flatsoldmodalshow"); }}>
                        x
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="form-group">
                        <Form.Label>Owner Name</Form.Label>
                        <FormControl
                            type="text"
                            name="ownername"
                            placeholder="Owner name"
                            className="form-control"
                        />
                    </Form.Group>


                    <Form.Group className="form-group">
                        <Form.Label>Owner Mobile Number</Form.Label>
                        <FormControl
                            type="text"
                            name="ownernumber"
                            placeholder="Owner number"
                            className="form-control"
                        />
                    </Form.Group>


                    <Form.Group className="form-group">
                        <Form.Label>Owner Email</Form.Label>
                        <FormControl
                            type="text"
                            name="owneremail"
                            placeholder="Owner email"
                            className="form-control"
                        />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label>Owner Address</Form.Label>
                        <FormControl
                            type="text"
                            name="owneraddress"
                            placeholder="Owner address"
                            className="form-control"
                        />
                    </Form.Group>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={() => { viewDemoClose("flatsoldmodalshow"); }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { viewDemoClose("flatsoldmodalshow"); }}>
                        Save
                    </Button>

                </Modal.Footer>
            </Modal>
            <CustomToastContainer />
        </Fragment >
    );
}
