import { Col, Row, Button, Form, } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";

import { updateUserApi } from '../../../api/user-api';
import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import { CustomToastContainer, showToast } from '../../../common/services/toastServices';
import { handleApiError } from '../../../helpers/handle-api-error';
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import { userDocumentValidationSchema } from "../../../schemas/user-schema";

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

const Document: React.FC<PersonalInfoProps> = ({ handleTabChange, setCompletedTabs, setDisabledTab, renderFooter }) => {
  const handleSubmit = async (values: any) => {
    console.log(values)
    setCompletedTabs({
      Personal: true,
      Document: true,
      Properties: false,
      Loan: false,
      Parking: false
    })
    setDisabledTab({
      Personal: true,
      Document: true,
      Properties: false,
      Loan: true,
      Parking: true
    })
    handleTabChange("Properties")
    try {
      const username = Cookies.get('username')
      const response = await updateUserApi(values, username)
      if (response.status === 200) {
        console.log("Success", response.data.data)
        showToast("success", "Document info saved successfully")
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }

  }
  return (
    <>
      <Formik
        initialValues={{
          aadharNumber: '',
          panNo: '',
          passportNo: '',
          gstinNo: '',
        }}
        validationSchema={userDocumentValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ }) => (
          <FormikForm>
            <Row>
              <Col xl={6}>
                <Form.Group className="form-group">
                  <Form.Label>Aadhar No <span className="text-danger">*</span></Form.Label>
                  <Field
                    type='text'
                    placeholder='Aadhar No'
                    className='form-control'
                    name="aadharNumber"
                  />
                  <ErrorMessage name="aadharNumber" component="div" className="text-danger" />
                </Form.Group>
              </Col>

              <Col xl={6}>
                <Form.Group className="form-group">
                  <Form.Label>Pan No.</Form.Label>
                  <Field
                    type='text'
                    placeholder='Pan No'
                    className='form-control'
                    name="panNo"
                  />
                  <ErrorMessage name="panNo" component="div" className="text-danger" />
                </Form.Group>
              </Col>

              <Col xl={6}>
                <Form.Group className="form-group">
                  <Form.Label>Passport No. </Form.Label>
                  <Field
                    type='text'
                    placeholder='Passport No. '
                    className='form-control'
                    name="passportNo"
                  />
                  <ErrorMessage name="passportNo" component="div" className="text-danger" />
                </Form.Group>
              </Col>

              <Col xl={6}>
                <Form.Group className="form-group">
                  <Form.Label>GSTIN No. (Member) </Form.Label>
                  <Field
                    type='text'
                    placeholder='GSTIN No. '
                    className='form-control'
                    name="gstinNo"
                  />
                  <ErrorMessage name="gstinNo" component="div" className="text-danger" />
                </Form.Group>
              </Col>



            </Row>
            {renderFooter(
              <>
                <Button variant="primary" type="submit">Save Document Info</Button>
              </>
            )}
            {/* <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                bottom: "10px", // Adjust as per modal padding
                right: "20px",  // Adjust as per modal padding
              }}
            >
              <Button type="submit" className="btn btn-primary">
                Save Document Info
              </Button>
            </div> */}
          </FormikForm>
        )}
      </Formik>
      <CustomToastContainer />
    </>
  )
}

export default Document