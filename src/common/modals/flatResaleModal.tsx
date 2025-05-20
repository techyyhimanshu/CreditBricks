import { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import 'suneditor/dist/css/suneditor.min.css';
import { getAllSocietyApi, getPropertiesOfSocietyApi, getSocietyDetailsApi } from "../../api/society-api";
import { handleApiError } from "../../helpers/handle-api-error";
import { showToast, CustomToastContainer } from "../services/toastServices";
import { Field, Formik, Form as FormikForm } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getTermsConditionBySocietyAndTypeApi } from "../../api/termsCondition-api";
import TermsAndConditionModal from "./termsAndConditionModal";
import { getMemberForDropDownApi } from "../../api/user-api";
import { getMemberSearhApi } from "../../api/member-api";

interface ProductModalProps {
    show: boolean;
    onSave?: (values: any, editing: boolean) => void;
    mode?: string;
    handleEdit?: () => void;
    onClose: () => void;
    isShow?: boolean;
    editing: boolean;
    initialVals?: any;
}

const FlatResaleModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose, editing, onSave }) => {
    const [societiesForDropDown, setSocietiesForDropDown] = useState<any[]>([]);
    const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);
    const [, setCommiteeMemberData] = useState<any>(null);
    const [termsconditionsview, settermsconditionsview] = useState(false);
    const [termsAndConditionData, setTermsAndConditionData] = useState("")
    const [memberOptions, setMemberOptions] = useState<any[]>([]);
    const [dummyMemberOptions, setDummyMemberOptions] = useState<any[]>([]);
    const [co_OwnerOptions, setCo_OwnerOptions] = useState<any[]>([]);
    const [thirdOwnerOptions, setThirdOwnerOptions] = useState<any[]>([]);
    const [fourthOwnerOptions, setFourthOwnerOptions] = useState<any[]>([]);
    const [fifthOwnerOptions, setFifthOwnerOptions] = useState<any[]>([]);
    const { society } = useSelector((state: RootState) => state.auth)

    const viewDemoShow = (modal: any) => {
        switch (modal) {

            case "termsconditionsview":
                settermsconditionsview(true);
                break;

        }
    };

    const viewDemoClose = (modal: any) => {
        switch (modal) {

            case "termsconditionsview":
                settermsconditionsview(false);
                break;

        }
    };



    useEffect(() => {
        fetchSocietiesForDropDown()
        fetchTermsData()
        fetchMembersForDropDown();
    }, [society])

    const fetchTermsData = async () => {
        try {
            const response = await getTermsConditionBySocietyAndTypeApi(society.value, "Flat Resale")
            if (response.status === 200) {
                setTermsAndConditionData(response.data.data?.termCondition)
            }
        } catch (error: any) {

            // const errorMessage = handleApiError(error)
            // showToast("error", errorMessage)
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

    const fetchSocietiesForDropDown = async () => {
        try {
            const response = await getAllSocietyApi();
            const formattedData = response.data.data.map((item: any) => ({
                value: item.societyIdentifier,
                label: item.societyName,
            }));
            setSocietiesForDropDown(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }

    const fetchPropertiesForDropDown = async (society: any) => {
        try {
            const response = await getPropertiesOfSocietyApi(society.value);
            const formattedData = response.data.data.map((item: any) => ({
                value: item.propertyIdentifier,
                label: item.propertyName ? item.propertyName : item.flatNumber,
            }));
            setPropertiesForDropDown(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }


    const fetchApproverDetails = async (society: any, setFieldValue: any) => {
        try {
            const response = await getSocietyDetailsApi(society.value)
            const members = response.data.data?.committeeMembers || [];
            const parentMembers = response.data.data?.parentSociety?.parentSociety?.committeeMembers || [];

            const matched = members.find((member: any) =>
                Array.isArray(member.applicationType) &&
                member.applicationType.includes("Flat Resale")
            );
            const parentMatched = parentMembers.find((member: any) =>
                Array.isArray(member.applicationType) &&
                member.applicationType.includes("Flat Resale")
            );
            console.log(matched, parentMatched)
            if (matched) {
                setFieldValue("tower", { value: matched.towerIdentifier, label: matched.towerName });
                setFieldValue("wing", { value: matched.wingIdentifier, label: matched.wingName });
                setFieldValue("approverSociety", { value: matched.societyIdentifier, label: matched.societyName });
                setFieldValue("approverProperty", { value: matched.propertyIdentifier, label: matched.propertyName });
                setFieldValue("approverName", matched.fullName);
                setFieldValue("approverContact", matched.contactNumber);
                setFieldValue("approverIdentifier", matched.committeeMemberId);
                setFieldValue("designation", { value: matched.designation, label: matched.designation });
            }
            if (parentMatched) {
                setFieldValue("hasParentApprover", "true");
                setFieldValue("parentApproverName", parentMatched.fullName);
                setFieldValue("parentApproverContact", parentMatched.contactNumber);
                setFieldValue("parentCommitteeMemberId", parentMatched.parentCommitteeMemberId);
                setFieldValue("parentDesignation", {
                    value: parentMatched.designation,
                    label: parentMatched.designation
                });
                setFieldValue("parentSocietyName", { label: response.data.data.parentSociety?.parentSociety?.parentSocietyName || "", value: response.data.data.parentSociety?.parentSocietyIdentifier || "" });
            } else if (!parentMatched) {
                setFieldValue("hasParentApprover", "false");
            }
            setCommiteeMemberData(matched)
        } catch (error: any) {
            const errorMessage = handleApiError(error)
            showToast('error', errorMessage)
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
    // const handleThirdOwnerChange = async (identifier: string, memberid: string, coOwnerId: string) => {
    //     const updatedData = memberOptions.filter((thirdOwner: any) => thirdOwner.value !== identifier && thirdOwner.value !== memberid && thirdOwner.value !== coOwnerId);
    //     setFourthOwnerOptions(updatedData);
    // };

    // const handleFourthOwnerChange = async (identifier: string, memberid: string, coOwnerId: string, thirdOwnerId: string) => {
    //     const updatedData = memberOptions.filter((fourthOwner: any) => fourthOwner.value !== identifier && fourthOwner.value !== memberid && fourthOwner.value !== coOwnerId && fourthOwner.value !== thirdOwnerId);
    //     setFifthOwnerOptions(updatedData);
    // };

    const getMemberByOwnership = (ownership: number) => {
        const member = initialVals?.propertyMembers?.find((member: any) => member.ownership === ownership);
        if (member) {
            return {
                value: member.memberIdentifier || "",
                label: `${member.member.firstName || ''} ${member.member.middleName || ''} ${member.member.lastName || ''}`.trim() || ""
            };
        }

        return { value: "", label: "" };
    };

    const handleMemberOptionsData = (inputValue: string) => {
        const fetchModuleOptions = async (inputValue: string) => {

            try {
                const data = {
                    searchTerm: inputValue,
                }
                const res = await getMemberSearhApi(data)
                const formatted = res?.data?.data?.map((member: any) => ({
                    value: member.memberIdentifier,
                    label: member.memberName.trim(),
                    mobileNumber: member.mobileNumber
                })) || [];

                setDummyMemberOptions(formatted);
            } catch (error) {
                console.error("Error in fetching options:", error);
            }
        }

        if (inputValue.length >= 3) {
            fetchModuleOptions(inputValue)
        }
    };



    const handleSubmit = async (values: any) => {
        try {
            const formattedData: any = {
                societyIdentifier: values?.society?.value,
                propertyIdentifier: values?.property?.value,
                committeeMemberId: values.approverIdentifier || "",
                parentCommitteeMemberId: values.parentCommitteeMemberId || "",
                transferDocumentsSubmitted: values.transferdocument,
                originalShareCertificateProcessed: values.proccesscertificate,
                existingHomeLoan: values.existinghomeloanproperty,
                homeLoanFullySettled: values.fullysettledhomeloan,
                shareTransferPremiumPaid: values.transferpremiumpaid,
                shareTransferFeesPaid: values.transferfeespaid,
                membershipFeePaid: values.membershipfeepaid,
                entranceFeePaid: values.entrancefeepaid,
                otherChargesPaid: values.otherchargepaid,
                otherCharges: values.otherchargeDetails,
                // saleAgreementCopy: values.saleAgreementCopy,
                saleAgreement: values.saleAgreementFile,
                // flatRegistrationCertificateSubmitted: values.flatRegistrationCertificate,
                flatRegistrationCertificate: values.flatRegistrationFile,
                // homeLoanSanctionLetterSubmitted: values.homeLoanSanctionLetter,
                homeLoanSanctionLetter: values.homeLoanSanctionFile,
                // oldLoanClosureLetter: values.oldLoanClosureLetter,
                oldOwnerHomeLoanClosureLetter: values.oldLoanClosureFile,
                receipt: values.uploadReceipt,
                loanClosureLetter: values.uploadLoanClosureLetter,
                // jointHolder: values.jointHolder,
                jointHolders: [
                    { memberIdentifier: values.ownerName?.value || "" },
                    { memberIdentifier: values.coOwnerName?.value || "" }
                ],
                // ownerName: values.ownerName,
                // coOwnerName: values.coOwnerName,
                flatRegistrationNumber: values.flatRegistrationId,
                flatRegistrationFilePath: values.flatRegistrationCopy,
            };

            if (editing) {
                formattedData.eventIdentifier = initialVals?.applicationIdentifier
            }
            if (onSave) {
                onSave(formattedData, editing)
            }

        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }

    const handleTermsAndConditionClose = () => {
        viewDemoClose("termsconditionsview")
    }


    return (
        <>
            <Modal show={show} size="xl" centered>
                <Modal.Header>
                    <Modal.Title>Flat Resale</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={(event) => { event.preventDefault(), onClose() }}>
                        x
                    </Button>
                </Modal.Header>
                <Formik
                    enableReinitialize
                    initialValues=
                    {{
                        society: initialVals ? { label: initialVals.society?.societyName, value: initialVals.society?.societyIdentifier } : { label: society?.label || "", value: society?.value || "" },
                        property: initialVals ? { label: initialVals.property?.propertyName, value: initialVals.property?.propertyIdentifier } : { label: "", value: "" },
                        approverIdentifier: "",
                        parentCommitteeMemberId: "",
                        transferdocument: initialVals?.transferDocumentsSubmitted || "",
                        proccesscertificate: initialVals?.originalShareCertificateProcessed || "",
                        existinghomeloanproperty: initialVals?.existingHomeLoan || "",
                        fullysettledhomeloan: initialVals?.homeLoanFullySettled || "",
                        transferpremiumpaid: initialVals?.shareTransferPremiumPaid || "",
                        transferfeespaid: initialVals?.shareTransferFeesPaid || "",
                        membershipfeepaid: initialVals?.membershipFeePaid || "",
                        entrancefeepaid: initialVals?.entranceFeePaid || "",
                        otherchargepaid: initialVals?.otherChargesPaid || "",
                        saleAgreementCopy: initialVals?.saleAgreement ? "Yes" : "No",
                        saleAgreementFile: null,
                        saleAgreementFileView: initialVals?.saleAgreement,
                        flatRegistrationCertificate: initialVals?.flatRegistrationCertificate ? "Yes" : "No",
                        flatRegistrationFile: null,
                        flatRegistrationFileView: initialVals?.flatRegistrationCertificate,
                        homeLoanSanctionLetter: initialVals?.homeLoanSanctionLetter ? "Yes" : "No",
                        homeLoanSanctionFile: null,
                        homeLoanSanctionFileView: initialVals?.homeLoanSanctionLetter,
                        oldLoanClosureLetter: initialVals?.oldOwnerHomeLoanClosureLetter ? "Yes" : "No",
                        oldLoanClosureFile: null,
                        oldLoanClosureFileView: initialVals?.oldOwnerHomeLoanClosureLetter,
                        uploadReceipt: null,
                        uploadReceiptView: initialVals?.receipt,
                        uploadLoanClosureLetter: null,
                        uploadLoanClosureLetterView: initialVals?.loanClosureLetter,
                        otherchargeDetails: initialVals?.otherCharges || "",
                        jointHolder: "",
                        ownerName: getMemberByOwnership(1),
                        coOwnerName: getMemberByOwnership(2),
                        flatRegistrationId: initialVals?.flatRegistrationNumber,
                        flatRegistrationCopy: null,
                        flatRegistrationCopyView: initialVals?.flatRegistrationFilePath,
                        tower: { value: initialVals?.towerIdentifier || "", label: initialVals?.towerName || "" },
                        wing: { value: initialVals?.wingIdentifier || "", label: initialVals?.wingName || "" },
                        approverSociety: { value: initialVals?.socityIdentifier || "", label: initialVals?.societyName || "" },
                        approverProperty: initialVals ? { label: initialVals.propertyName, value: initialVals.propertyIdentifier } : { label: "", value: "" },
                        approverName: initialVals?.fullName || "",
                        approverContact: initialVals?.contactNumber || "",
                        designation: { value: initialVals?.designation || "", label: initialVals?.designation || "" },
                        hasParentApprover: "false",
                        parentApproverName: initialVals?.fullName || "",
                        parentApproverContact: initialVals?.contactNumber || "",
                        parentDesignation: { value: initialVals?.parentDesignation || "", label: initialVals?.parentDesignation || "" },
                        parentSocietyName: { value: "", label: "" },

                    }}
                    onSubmit={handleSubmit}>
                    {({ values, handleChange, setFieldValue }) => {
                        const getFileExtension = (fileName: string) => {
                            if (!fileName) {
                                return '';
                            }
                            return fileName.split(".").pop()?.toLowerCase() || '';
                        };
                        const getFileName = (fileName: string) => {
                            if (!fileName) {
                                return '';
                            }
                            return fileName?.split("/").pop() || '';
                        };

                        useEffect(() => {
                            if (society) {
                                setFieldValue("society", society);
                                fetchPropertiesForDropDown(society);
                                fetchApproverDetails(society, setFieldValue)
                            }
                        }, [society]);
                        return (
                            <FormikForm>
                                <Modal.Body className='bg-light'>
                                    <Accordion defaultActiveKey="basicinfo">
                                        <Accordion.Item eventKey="basicinfo">
                                            <Accordion.Header>Basic Information</Accordion.Header>
                                            <Accordion.Body className='p-2'>
                                                <Row>
                                                    <Col xl="4">
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Society </Form.Label>
                                                            <Select
                                                                options={societiesForDropDown}
                                                                placeholder="Select society"
                                                                classNamePrefix="Select2"
                                                                name="society"
                                                                value={values.society}
                                                                onChange={(selected) => {
                                                                    fetchPropertiesForDropDown(selected);
                                                                    fetchApproverDetails(selected, setFieldValue)
                                                                    setFieldValue("society", selected);
                                                                }}
                                                                isDisabled
                                                            />
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl="4">
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Property </Form.Label>
                                                            <Select
                                                                options={propertiesForDropDown}
                                                                name="property"
                                                                value={values.property}
                                                                onChange={(selected) => {
                                                                    setFieldValue("property", selected);
                                                                }}
                                                                placeholder="Select property"
                                                                classNamePrefix="Select2"
                                                                isDisabled={initialVals && !editing}
                                                            />
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12}>
                                                        <p className='mb-2 mt-3 tx-bold'>To share your payment receipt, kindly click on the "Yes" option</p>
                                                        <hr className='w-100 m-0' />
                                                    </Col>

                                                    {/* Share Transfer Documents Submitted */}
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Share Transfer Documents<br />Submitted</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Yes"
                                                                        name="transferdocument"
                                                                        value="Yes"
                                                                        checked={values.transferdocument === "Yes"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="No"
                                                                        name="transferdocument"
                                                                        value="No"
                                                                        checked={values.transferdocument === "No"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="N/A"
                                                                        name="transferdocument"
                                                                        value="N/A"
                                                                        checked={values.transferdocument === "N/A"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>

                                                    {/* Process Original Share Certificate */}
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Do you currently process the original share<br />certificate?</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Yes"
                                                                        name="proccesscertificate"
                                                                        value="Yes"
                                                                        checked={values.proccesscertificate === "Yes"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="No"
                                                                        name="proccesscertificate"
                                                                        value="No"
                                                                        checked={values.proccesscertificate === "No"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="N/A"
                                                                        name="proccesscertificate"
                                                                        value="N/A"
                                                                        checked={values.proccesscertificate === "N/A"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>

                                                    {/* Existing Home Loan */}
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Is there an existing home loan on your<br />property?</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Yes"
                                                                        name="existinghomeloanproperty"
                                                                        value="Yes"
                                                                        checked={values.existinghomeloanproperty === "Yes"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="No"
                                                                        name="existinghomeloanproperty"
                                                                        value="No"
                                                                        checked={values.existinghomeloanproperty === "No"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="N/A"
                                                                        name="existinghomeloanproperty"
                                                                        value="N/A"
                                                                        checked={values.existinghomeloanproperty === "N/A"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>

                                                    {/* Fully Settled Home Loan */}
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Have you fully settled your home loan?</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Yes"
                                                                        name="fullysettledhomeloan"
                                                                        value="Yes"
                                                                        checked={values.fullysettledhomeloan === "Yes"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="No"
                                                                        name="fullysettledhomeloan"
                                                                        value="No"
                                                                        checked={values.fullysettledhomeloan === "No"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="N/A"
                                                                        name="fullysettledhomeloan"
                                                                        value="N/A"
                                                                        checked={values.fullysettledhomeloan === "N/A"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>

                                                    {/* Share Transfer Premium Paid */}
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Share Transfer Premium Paid</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Yes"
                                                                        name="transferpremiumpaid"
                                                                        value="Yes"
                                                                        checked={values.transferpremiumpaid === "Yes"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="No"
                                                                        name="transferpremiumpaid"
                                                                        value="No"
                                                                        checked={values.transferpremiumpaid === "No"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="N/A"
                                                                        name="transferpremiumpaid"
                                                                        value="N/A"
                                                                        checked={values.transferpremiumpaid === "N/A"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>

                                                    {/* Share Transfer Fees Paid */}
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Share Transfer Fees Paid</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Yes"
                                                                        name="transferfeespaid"
                                                                        value="Yes"
                                                                        checked={values.transferfeespaid === "Yes"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="No"
                                                                        name="transferfeespaid"
                                                                        value="No"
                                                                        checked={values.transferfeespaid === "No"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="N/A"
                                                                        name="transferfeespaid"
                                                                        value="N/A"
                                                                        checked={values.transferfeespaid === "N/A"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>

                                                    {/* Membership Fee Paid */}
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Membership Fee Paid</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Yes"
                                                                        name="membershipfeepaid"
                                                                        value="Yes"
                                                                        checked={values.membershipfeepaid === "Yes"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="No"
                                                                        name="membershipfeepaid"
                                                                        value="No"
                                                                        checked={values.membershipfeepaid === "No"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="N/A"
                                                                        name="membershipfeepaid"
                                                                        value="N/A"
                                                                        checked={values.membershipfeepaid === "N/A"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>

                                                    {/* Entrance Fee Paid */}
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Entrance Fee Paid</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Yes"
                                                                        name="entrancefeepaid"
                                                                        value="Yes"
                                                                        checked={values.entrancefeepaid === "Yes"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="No"
                                                                        name="entrancefeepaid"
                                                                        value="No"
                                                                        checked={values.entrancefeepaid === "No"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="N/A"
                                                                        name="entrancefeepaid"
                                                                        value="N/A"
                                                                        checked={values.entrancefeepaid === "N/A"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>

                                                    {/* Other Charges Paid */}
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Other Charges Paid</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Yes"
                                                                        name="otherchargepaid"
                                                                        value="Yes"
                                                                        checked={values.otherchargepaid === "Yes"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="No"
                                                                        name="otherchargepaid"
                                                                        value="No"
                                                                        checked={values.otherchargepaid === "No"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="N/A"
                                                                        name="otherchargepaid"
                                                                        value="N/A"
                                                                        checked={values.otherchargepaid === "N/A"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>

                                                                <Col xl={12} className='pt-2'>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="otherchargeDetails"
                                                                        value={values.otherchargeDetails}
                                                                        onChange={handleChange}
                                                                        placeholder="Other Charges"
                                                                        className="form-control"
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>



                                            </Accordion.Body>
                                        </Accordion.Item>

                                        <Accordion.Item eventKey="ApplicationDescription">
                                            <Accordion.Header>Documents</Accordion.Header>
                                            <Accordion.Body className='p-2'>
                                                <Row>
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Sale Agreement Copy</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Yes"
                                                                        name="saleAgreementCopy"
                                                                        value="Yes"
                                                                        checked={values.saleAgreementCopy === "Yes"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="No"
                                                                        name="saleAgreementCopy"
                                                                        value="No"
                                                                        checked={values.saleAgreementCopy === "No"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <small className='text-muted float-end'>Size : Max 2MB</small>
                                                                </Col>
                                                                {values.saleAgreementCopy === "Yes" && (
                                                                    <Col xl={12} className='mt-1'>
                                                                        <Form.Control
                                                                            type="file"
                                                                            name="saleAgreementFile"
                                                                            className="form-control"
                                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                setFieldValue("saleAgreementFile", e.currentTarget.files?.[0]);
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                )}
                                                            </Row>
                                                        </Form.Group>
                                                        {values.saleAgreementFileView && (
                                                            <p
                                                                className="text-center pt-2"
                                                                style={{ cursor: "pointer", color: "blue" }}
                                                                onClick={() => {
                                                                    const fileExtension = getFileExtension(values.saleAgreementFileView);


                                                                    // If it's a PDF, image, or Excel file, open in new tab
                                                                    if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                                                        window.open(import.meta.env.VITE_STATIC_PATH + values.saleAgreementFileView, "_blank");
                                                                    } else {
                                                                        // For other files, trigger download
                                                                        const link = document.createElement("a");
                                                                        link.href = import.meta.env.VITE_STATIC_PATH + values.saleAgreementFileView;
                                                                        link.download = values.saleAgreementFileView;
                                                                        link.click();
                                                                    }
                                                                }}
                                                            >
                                                                {getFileName(values.saleAgreementFileView)}
                                                            </p>
                                                        )}
                                                    </Col>

                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Flat Registration Certificate</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Yes"
                                                                        name="flatRegistrationCertificate"
                                                                        value="Yes"
                                                                        checked={values.flatRegistrationCertificate === "Yes"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="No"
                                                                        name="flatRegistrationCertificate"
                                                                        value="No"
                                                                        checked={values.flatRegistrationCertificate === "No"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <small className='text-muted float-end'>Size : Max 2MB</small>
                                                                </Col>
                                                                {values.flatRegistrationCertificate === "Yes" && (
                                                                    <Col xl={12} className='mt-1'>
                                                                        <Form.Control
                                                                            type="file"
                                                                            name="flatRegistrationFile"
                                                                            className="form-control"
                                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                setFieldValue("flatRegistrationFile", e.currentTarget.files?.[0]);
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                )}
                                                            </Row>
                                                        </Form.Group>
                                                        {values.flatRegistrationFileView && (
                                                            <p
                                                                className="text-center pt-2"
                                                                style={{ cursor: "pointer", color: "blue" }}
                                                                onClick={() => {
                                                                    const fileExtension = getFileExtension(values.flatRegistrationFileView);


                                                                    // If it's a PDF, image, or Excel file, open in new tab
                                                                    if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                                                        window.open(import.meta.env.VITE_STATIC_PATH + values.flatRegistrationFileView, "_blank");
                                                                    } else {
                                                                        // For other files, trigger download
                                                                        const link = document.createElement("a");
                                                                        link.href = import.meta.env.VITE_STATIC_PATH + values.flatRegistrationFileView;
                                                                        link.download = values.flatRegistrationFileView;
                                                                        link.click();
                                                                    }
                                                                }}
                                                            >
                                                                {getFileName(values.flatRegistrationFileView)}
                                                            </p>
                                                        )}
                                                    </Col>

                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Home Loan Sanction Letter</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Yes"
                                                                        name="homeLoanSanctionLetter"
                                                                        value="Yes"
                                                                        checked={values.homeLoanSanctionLetter === "Yes"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="No"
                                                                        name="homeLoanSanctionLetter"
                                                                        value="No"
                                                                        checked={values.homeLoanSanctionLetter === "No"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <small className='text-muted float-end'>Size : Max 2MB</small>
                                                                </Col>
                                                                {values.homeLoanSanctionLetter === "Yes" && (
                                                                    <Col xl={12} className='mt-1'>
                                                                        <Form.Control
                                                                            type="file"
                                                                            name="homeLoanSanctionFile"
                                                                            className="form-control"
                                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                setFieldValue("homeLoanSanctionFile", e.currentTarget.files?.[0]);
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                )}
                                                            </Row>
                                                        </Form.Group>
                                                        {values.homeLoanSanctionFileView && (
                                                            <p
                                                                className="text-center pt-2"
                                                                style={{ cursor: "pointer", color: "blue" }}
                                                                onClick={() => {
                                                                    const fileExtension = getFileExtension(values.homeLoanSanctionFileView);


                                                                    // If it's a PDF, image, or Excel file, open in new tab
                                                                    if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                                                        window.open(import.meta.env.VITE_STATIC_PATH + values.homeLoanSanctionFileView, "_blank");
                                                                    } else {
                                                                        // For other files, trigger download
                                                                        const link = document.createElement("a");
                                                                        link.href = import.meta.env.VITE_STATIC_PATH + values.homeLoanSanctionFileView;
                                                                        link.download = values.homeLoanSanctionFileView;
                                                                        link.click();
                                                                    }
                                                                }}
                                                            >
                                                                {getFileName(values.homeLoanSanctionFileView)}
                                                            </p>
                                                        )}
                                                    </Col>

                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Old Owner Home Loan Closure Letter</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Yes"
                                                                        name="oldLoanClosureLetter"
                                                                        value="Yes"
                                                                        checked={values.oldLoanClosureLetter === "Yes"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="No"
                                                                        name="oldLoanClosureLetter"
                                                                        value="No"
                                                                        checked={values.oldLoanClosureLetter === "No"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <small className='text-muted float-end'>Size : Max 2MB</small>
                                                                </Col>
                                                                {values.oldLoanClosureLetter === "Yes" && (
                                                                    <Col xl={12} className='mt-1'>
                                                                        <Form.Control
                                                                            type="file"
                                                                            name="oldLoanClosureFile"
                                                                            className="form-control"
                                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                setFieldValue("oldLoanClosureFile", e.currentTarget.files?.[0]);
                                                                            }}
                                                                        />
                                                                    </Col>
                                                                )}
                                                            </Row>
                                                        </Form.Group>
                                                        {values.oldLoanClosureFileView && (
                                                            <p
                                                                className="text-center pt-2"
                                                                style={{ cursor: "pointer", color: "blue" }}
                                                                onClick={() => {
                                                                    const fileExtension = getFileExtension(values.oldLoanClosureFileView);


                                                                    // If it's a PDF, image, or Excel file, open in new tab
                                                                    if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                                                        window.open(import.meta.env.VITE_STATIC_PATH + values.oldLoanClosureFileView, "_blank");
                                                                    } else {
                                                                        // For other files, trigger download
                                                                        const link = document.createElement("a");
                                                                        link.href = import.meta.env.VITE_STATIC_PATH + values.oldLoanClosureFileView;
                                                                        link.download = values.oldLoanClosureFileView;
                                                                        link.click();
                                                                    }
                                                                }}
                                                            >
                                                                {getFileName(values.oldLoanClosureFileView)}
                                                            </p>
                                                        )}
                                                    </Col>

                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label className='mb-2'>
                                                                Upload Receipt
                                                                <small className='text-muted float-end'>Size : Max 2MB</small>
                                                            </Form.Label>
                                                            <Row>
                                                                <Col xl={12} className='mt-4'>
                                                                    <Form.Control
                                                                        type="file"
                                                                        name="uploadReceipt"
                                                                        className="form-control"
                                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                            setFieldValue("uploadReceipt", e.currentTarget.files?.[0]);
                                                                        }}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                        {values.uploadReceiptView && (
                                                            <p
                                                                className="text-center pt-2"
                                                                style={{ cursor: "pointer", color: "blue" }}
                                                                onClick={() => {
                                                                    const fileExtension = getFileExtension(values.uploadReceiptView);


                                                                    // If it's a PDF, image, or Excel file, open in new tab
                                                                    if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                                                        window.open(import.meta.env.VITE_STATIC_PATH + values.uploadReceiptView, "_blank");
                                                                    } else {
                                                                        // For other files, trigger download
                                                                        const link = document.createElement("a");
                                                                        link.href = import.meta.env.VITE_STATIC_PATH + values.uploadReceiptView;
                                                                        link.download = values.uploadReceiptView;
                                                                        link.click();
                                                                    }
                                                                }}
                                                            >
                                                                {getFileName(values.uploadReceiptView)}
                                                            </p>
                                                        )}
                                                    </Col>

                                                    <Col xl={4}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label className='mb-2'>
                                                                Upload Loan Closure Letter
                                                                <small className='text-muted float-end'>Size : Max 2MB</small>
                                                            </Form.Label>
                                                            <Row>
                                                                <Col xl={12} className='mt-4'>
                                                                    <Form.Control
                                                                        type="file"
                                                                        name="uploadLoanClosureLetter"
                                                                        className="form-control"
                                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                            setFieldValue("uploadLoanClosureLetter", e.currentTarget.files?.[0]);
                                                                        }}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                        {values.uploadLoanClosureLetterView && (
                                                            <p
                                                                className="text-center pt-2"
                                                                style={{ cursor: "pointer", color: "blue" }}
                                                                onClick={() => {
                                                                    const fileExtension = getFileExtension(values.uploadLoanClosureLetterView);


                                                                    // If it's a PDF, image, or Excel file, open in new tab
                                                                    if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                                                        window.open(import.meta.env.VITE_STATIC_PATH + values.uploadLoanClosureLetterView, "_blank");
                                                                    } else {
                                                                        // For other files, trigger download
                                                                        const link = document.createElement("a");
                                                                        link.href = import.meta.env.VITE_STATIC_PATH + values.uploadLoanClosureLetterView;
                                                                        link.download = values.uploadLoanClosureLetterView;
                                                                        link.click();
                                                                    }
                                                                }}
                                                            >
                                                                {getFileName(values.uploadLoanClosureLetterView)}
                                                            </p>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>


                                        <Accordion.Item eventKey="vehicledetails">
                                            <Accordion.Header>Joint Holder</Accordion.Header>
                                            <Accordion.Body className='p-2'>
                                                <Row>
                                                    <Col xl={12}>
                                                        <p className='mb-2 tx-bold'></p>
                                                        <hr className='w-100 m-0' />
                                                    </Col>

                                                    {/* Joint Holder Radio */}
                                                    <Col xl={12}>
                                                        <Form.Group className="form-group mb-0">
                                                            <Form.Label>Joint Holder</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="Yes"
                                                                        name="jointHolder"
                                                                        value="Yes"
                                                                        checked={values.jointHolder === "Yes"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                                <Col lg={3}>
                                                                    <Form.Check
                                                                        type="radio"
                                                                        label="No"
                                                                        name="jointHolder"
                                                                        value="No"
                                                                        checked={values.jointHolder === "No"}
                                                                        onChange={handleChange}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>


                                                    <>
                                                        {/* Owner Name */}
                                                        <Col xl={4}>
                                                            <Form.Group className="form-group mb-0 mt-0">
                                                                <Form.Label>Owner Name <small className='text-muted tx-bold'>(As per Agreement)</small></Form.Label>

                                                                {/* <Select
                                                                    options={memberOptions}
                                                                    name="ownerName"
                                                                    value={values.ownerName}
                                                                    onChange={(selected) => {
                                                                        setFieldValue("ownerName", selected)
                                                                        handleMemberChange(selected?.value || "")
                                                                    }
                                                                    }
                                                                    placeholder="Select Member"
                                                                    classNamePrefix="Select2"
                                                                /> */}
                                                                <Select
                                                                    name="ownerName"
                                                                    value={values.ownerName}
                                                                    onChange={(selected) => {
                                                                        setFieldValue("ownerName", selected);
                                                                        handleMemberChange(selected?.value || "");
                                                                    }}
                                                                    isClearable
                                                                    placeholder="Select Member"
                                                                    classNamePrefix="Select2"
                                                                    formatOptionLabel={(option: any) => {
                                                                        return (
                                                                            <div>
                                                                                <div>{option.label}</div>
                                                                                <div className="text-muted" style={{ fontSize: '12px' }}>{option.mobileNumber}</div>
                                                                            </div>
                                                                        )
                                                                    }}
                                                                    getOptionLabel={(data: any) => data.label}
                                                                    filterOption={(candidate: any, input: string) => {
                                                                        // Filter by both productName and hsnCode
                                                                        return (
                                                                            candidate.data.label.toLowerCase().includes(input.toLowerCase()) ||
                                                                            candidate.data.mobileNumber.toLowerCase().includes(input.toLowerCase())
                                                                        );
                                                                    }}
                                                                    onInputChange={(inputValue) => {
                                                                        if (inputValue.length >= 3) {
                                                                            handleMemberOptionsData(inputValue)
                                                                        }
                                                                    }}
                                                                    options={dummyMemberOptions}
                                                                />
                                                            </Form.Group>
                                                        </Col>

                                                        {/* Co-owner Name */}
                                                        <Col xl={4}>
                                                            <Form.Group className="form-group mb-0">
                                                                <Form.Label>
                                                                    Co-owner Name <small className='text-muted tx-bold'>(As per Agreement)</small>
                                                                </Form.Label>

                                                                <Select
                                                                    options={co_OwnerOptions}
                                                                    name="coOwnerName"
                                                                    value={values.coOwnerName}
                                                                    // isDisabled={coOwnerNameDisabled}
                                                                    onChange={(selected) => {
                                                                        setFieldValue("coOwnerName", selected)
                                                                        handleCoOwnerChange(selected?.value || "", values.ownerName?.value)
                                                                        // setThirdOwnerDisabled(false)
                                                                    }}
                                                                    placeholder="Select Co Owner"
                                                                    classNamePrefix="Select2"
                                                                />
                                                                <small className='float-end text-black tx-bold cursor mt-1'>+ Add</small>
                                                            </Form.Group>
                                                        </Col>

                                                        {/* Flat Registration ID */}
                                                        <Col xl={4}>
                                                            <Form.Group className="form-group mb-0">
                                                                <Form.Label>Flat Registration ID</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="flatRegistrationId"
                                                                    placeholder="ID"
                                                                    className="form-control"
                                                                    value={values.flatRegistrationId}
                                                                    onChange={handleChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>

                                                        {/* Flat Registration Copy */}
                                                        <Col xl={4}>
                                                            <Form.Group className="form-group mb-0">
                                                                <Form.Label>Flat Registration Copy</Form.Label>
                                                                <Form.Control
                                                                    type="file"
                                                                    name="flatRegistrationCopy"
                                                                    className="form-control"
                                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                        setFieldValue("flatRegistrationCopy", e.currentTarget.files?.[0]);
                                                                    }}
                                                                />
                                                            </Form.Group>
                                                            {values.flatRegistrationCopyView && (
                                                                <p
                                                                    className="text-center pt-2"
                                                                    style={{ cursor: "pointer", color: "blue" }}
                                                                    onClick={() => {
                                                                        const fileExtension = getFileExtension(values.flatRegistrationCopyView);


                                                                        // If it's a PDF, image, or Excel file, open in new tab
                                                                        if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                                                            window.open(import.meta.env.VITE_STATIC_PATH + values.flatRegistrationCopyView, "_blank");
                                                                        } else {
                                                                            // For other files, trigger download
                                                                            const link = document.createElement("a");
                                                                            link.href = import.meta.env.VITE_STATIC_PATH + values.flatRegistrationCopyView;
                                                                            link.download = values.flatRegistrationCopyView;
                                                                            link.click();
                                                                        }
                                                                    }}
                                                                >
                                                                    {getFileName(values.flatRegistrationCopyView)}
                                                                </p>
                                                            )}
                                                        </Col>
                                                    </>

                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>



                                        <Accordion.Item eventKey="approvaldetails">
                                            <Accordion.Header>Approval Details</Accordion.Header>
                                            <Accordion.Body className='p-2'>
                                                <Row>
                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Society </Form.Label>
                                                            <Select
                                                                name='approverSociety'
                                                                placeholder="Select Society"
                                                                classNamePrefix="Select2"
                                                                onChange={(selected) => setFieldValue("approverSociety", selected)}
                                                                value={values.approverSociety}
                                                                isDisabled
                                                            />
                                                        </Form.Group>
                                                    </Col>



                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Tower </Form.Label>
                                                            <Select
                                                                // options={towerOptions}
                                                                placeholder="Select Tower"
                                                                classNamePrefix="Select2"
                                                                name='tower'
                                                                onChange={(selected) => {
                                                                    // fetchWingsForDropDown(selected);
                                                                    // setFieldValue("wing", null);
                                                                    // setFieldValue("property", null);
                                                                    setFieldValue("tower", selected);
                                                                }}
                                                                value={values.tower}
                                                                isDisabled
                                                            />
                                                        </Form.Group>
                                                    </Col>


                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Wing </Form.Label>
                                                            <Select
                                                                placeholder="Select Wing"
                                                                classNamePrefix="Select2"
                                                                name='wing'
                                                                onChange={(selected) => {
                                                                    // fetchPropertiesForDropDown(selected);
                                                                    // setFieldValue("property", null);
                                                                    setFieldValue("wing", selected);
                                                                }}
                                                                value={values.wing}
                                                                isDisabled
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Property </Form.Label>
                                                            <Select
                                                                placeholder="Select property"
                                                                options={propertiesForDropDown}
                                                                classNamePrefix="Select2"
                                                                name='approverProperty'
                                                                onChange={(selected) => setFieldValue("approverProperty", selected)}
                                                                value={values.approverProperty}
                                                                isDisabled
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Approver Name</Form.Label>
                                                            <Field
                                                                type="text"
                                                                name="approverName"
                                                                placeholder="Approver Name"
                                                                className="form-control"
                                                                value={values.approverName}
                                                                disabled
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Approver Contact</Form.Label>
                                                            <Field
                                                                type="text"
                                                                name="approverContact"
                                                                placeholder="Contact"
                                                                className="form-control"
                                                                value={values.approverContact}
                                                                disabled
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Designation </Form.Label>
                                                            <Select
                                                                // options={designation}
                                                                placeholder="Select Designation"
                                                                classNamePrefix="Select2"
                                                                name='designation'
                                                                onChange={(selected) => setFieldValue("designation", selected)}
                                                                value={values.designation}
                                                                isDisabled
                                                            />
                                                        </Form.Group>
                                                    </Col>



                                                </Row>
                                                {values.hasParentApprover === "true" && (
                                                    <>
                                                        <hr />
                                                        <h6>Parent Approver Details</h6>
                                                        <Row>
                                                            <Col xl={6}>
                                                                <Form.Group className="form-group mb-1">
                                                                    <Form.Label>Parent Approver Name</Form.Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="parentApproverName"
                                                                        placeholder="Parent Approver Name"
                                                                        className="form-control"
                                                                        value={values.parentApproverName}
                                                                        disabled
                                                                    />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col xl={6}>
                                                                <Form.Group className="form-group mb-1">
                                                                    <Form.Label>Parent Approver Contact</Form.Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="parentApproverContact"
                                                                        placeholder="Parent Contact"
                                                                        className="form-control"
                                                                        value={values.parentApproverContact}
                                                                        disabled
                                                                    />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col xl={6}>
                                                                <Form.Group className="form-group mb-1">
                                                                    <Form.Label>Parent Designation</Form.Label>
                                                                    <Select
                                                                        placeholder="Parent Designation"
                                                                        classNamePrefix="Select2"
                                                                        name="parentDesignation"
                                                                        onChange={(selected) => setFieldValue("parentDesignation", selected)}
                                                                        value={values.parentDesignation}
                                                                        isDisabled
                                                                    />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col xl={6}>
                                                                <Form.Group className="form-group mb-1">
                                                                    <Form.Label>Parent Society Name</Form.Label>
                                                                    <Select
                                                                        name='parentSocietyName'
                                                                        placeholder="Select Society"
                                                                        classNamePrefix="Select2"
                                                                        onChange={(selected) => setFieldValue("parentSocietyName", selected)}
                                                                        value={values.parentSocietyName}
                                                                        isDisabled
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                    </>
                                                )}

                                            </Accordion.Body>
                                        </Accordion.Item>

                                    </Accordion>

                                    <Col xl={12} className='p-0'>
                                        <label><input type="checkbox" className='float-start m-2' />
                                            <b className='float-start mt-1 cursor'
                                                onClick={() => { viewDemoShow("termsconditionsview"); }}> Terms & Conditions</b></label>
                                    </Col>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="default" onClick={(event) => { event.preventDefault(), onClose() }}>
                                        Close
                                    </Button>
                                    {!(initialVals && !editing) && (
                                        <Button variant="primary" type="submit">
                                            {editing ? "Update" : "Save"}
                                        </Button>
                                    )}


                                </Modal.Footer>
                                <CustomToastContainer />

                            </FormikForm>
                        )
                    }}

                </Formik>

            </Modal>
            {
                termsconditionsview && <TermsAndConditionModal onClose={handleTermsAndConditionClose} initialVals={termsAndConditionData} show={termsconditionsview} />
            }



        </>
    )
}
export default FlatResaleModal;