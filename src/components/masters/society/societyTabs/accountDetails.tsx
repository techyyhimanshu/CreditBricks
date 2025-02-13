import { useState } from "react";
import { Col, Row, Card, Accordion, Button, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";

function AccountDetails() {
    const [formData, setFormData] = useState({
        bankName: "",
        accountNumber: "",
        branchName: "",
        ifscCode: "",
        chequeFavourable: "",
        paymentQrFile: null as File | null,
        isPreferredBank: false
    });

    type Row = {
        id: number;
        isPreferredBank: boolean;
        bankName: string;
        accountNumber: string;
        branchName: string;
        ifscCode: string;
        chequeFavourable: string;
        paymentQrFile: File | null;
    };

    const [bankData, setBankData] = useState<Row[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track editing index

    // Define table columns
    const columns = [
        {
            name: "S.no.",
            selector: (_: Row, index: number) => index + 1, // Serial number fix
            sortable: true,
        },
        {
            name: "Preferred",
            cell: (row: Row) => (
                row.isPreferredBank ? <i className="bi bi-check-square text-success"></i> : ""
            ),
        },
        {
            name: "Bank Name",
            selector: (row: Row) => row.bankName,
        },
        {
            name: "Account Number",
            selector: (row: Row) => row.accountNumber,
        },
        {
            name: "IFSC Code",
            selector: (row: Row) => row.ifscCode,
        },
        {
            name: "Cheque Favourable",
            selector: (row: Row) => row.chequeFavourable,
        },
        {
            name: 'Payment QR',
            cell: (row: Row) =>
                row.paymentQrFile ? (
                    <a href={URL.createObjectURL(row.paymentQrFile)} target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-image text-info"></i>
                    </a>
                ) : (
                    'No File'
                ),
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: "Actions",
            cell: (row: Row, index: number) => (
                <div>
                    <button className="btn btn-light btn-sm" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="btn bg-info-transparent ms-2 btn-sm" onClick={() => handleDelete(index)}>Delete</button>
                </div>
            ),
        },
    ];

    const tableData = {
        columns,
        data: bankData
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData(prevState => ({
                ...prevState,
                paymentQrFile: e.target.files![0]
            }));
        }
    };

    // Handle form submission (Add or Update)
    const handleAddNewBank = () => {
        if (editingIndex !== null) {
            // Update existing row
            const updatedData = [...bankData];
            updatedData[editingIndex] = { ...formData, id: editingIndex + 1 };
            setBankData(updatedData);
            setEditingIndex(null);
        } else {
            // Add new row
            setBankData(prevState => [
                ...prevState,
                { ...formData, id: prevState.length + 1 }
            ]);
        }
        resetForm();
    };
    const handleSubmit = () => {
        let data = bankData.map((bank) => {
            if (bank.paymentQrFile) {
                const oldFile = bank.paymentQrFile;
                const newFile = new File([oldFile], `${bank.accountNumber}.pdf`, { type: oldFile.type });
                return { ...bank, paymentQrFile: newFile };
            }
            return bank;
        });

        console.log(data);
    };


    // Handle edit action
    const handleEdit = (index: number) => {
        setFormData(bankData[index]);
        setEditingIndex(index);
    };

    // Handle delete action
    const handleDelete = (index: number) => {
        setBankData(prevState => prevState.filter((_, i) => i !== index));
    };

    // Reset form after submission
    const resetForm = () => {
        setFormData({
            bankName: "",
            accountNumber: "",
            branchName: "",
            ifscCode: "",
            chequeFavourable: "",
            paymentQrFile: null,
            isPreferredBank: false
        });
    };

    return (
        <Accordion.Item eventKey="Society Account Details" className="bg-white mb-3">
            <Accordion.Header className="borders">Society Account Details</Accordion.Header>
            <Accordion.Body className="borders p-0">
                <Card className="m-0">
                    <Card.Body className="pt-3">
                        <Row>
                            <Col xl={4}>
                                <Form.Group>
                                    <Form.Label>Society Bank Name</Form.Label>
                                    <input type="text" name="bankName" placeholder="Bank name" className="form-control" value={formData.bankName} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>

                            <Col xl={4}>
                                <Form.Group>
                                    <Form.Label>Account Number</Form.Label>
                                    <input type="text" name="accountNumber" placeholder="Account number" className="form-control" value={formData.accountNumber} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>

                            <Col xl={4}>
                                <Form.Group>
                                    <Form.Label>Branch Name</Form.Label>
                                    <input type="text" name="branchName" placeholder="Branch name" className="form-control" value={formData.branchName} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>

                            <Col xl={4}>
                                <Form.Group>
                                    <Form.Label>IFSC Code</Form.Label>
                                    <input type="text" name="ifscCode" placeholder="IFSC code" className="form-control" value={formData.ifscCode} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>

                            <Col xl={4}>
                                <Form.Group>
                                    <Form.Label>Cheque Favourable</Form.Label>
                                    <input type="text" name="chequeFavourable" placeholder="Cheque favourable" className="form-control" value={formData.chequeFavourable} onChange={handleInputChange} />
                                </Form.Group>
                            </Col>

                            <Col xl={4}>
                                <Form.Group>
                                    <Form.Label>Society Payment QR Code</Form.Label>
                                    <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
                                </Form.Group>
                            </Col>

                            <Col xl={4}>
                                <Form.Group>
                                    <div className="custom-checkbox custom-control">
                                        <input type="checkbox" className="custom-control-input" id="checkbox-2" name="isPreferredBank" checked={formData.isPreferredBank} onChange={handleInputChange} />
                                        <Form.Label htmlFor="checkbox-2" className="custom-control-label mt-1">Is Preferred Bank</Form.Label>
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col xl={4}>
                                <Button className="btn btn-primary float-end btn-sm" onClick={handleAddNewBank}>
                                    {editingIndex !== null ? "Update" : "Add"}
                                </Button>
                            </Col>
                            <Col xl={4}>
                                <Button className="btn btn-primary float-end btn-sm" onClick={handleSubmit}>
                                    {editingIndex !== null ? "Update" : "Submit"}
                                </Button>
                            </Col>
                        </Row>

                        <DataTableExtensions {...tableData}>
                            <DataTable columns={columns} data={bankData} pagination fixedHeader />
                        </DataTableExtensions>
                    </Card.Body>
                </Card>
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default AccountDetails;
