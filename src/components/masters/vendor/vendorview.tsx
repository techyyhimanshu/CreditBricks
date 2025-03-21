
import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, FormLabel } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getVendorDetail } from '../../../api/vendor-api';

export default function VendorView() {
  const [singleVendorData, setSingleVendordata] = useState<any>([])
  const params = useParams()
  const identifier = params.identifier as string

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await getVendorDetail(identifier)
        setSingleVendordata(response?.data?.data || [])
      } catch (error) {

      }
    }
    if (identifier) {
      fetchPropertyData()
    }
  }, [])

  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}vendor/vendormaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Vendor View</span>
        </div>
      </div>
      <Row>
        <Col xl={8}>
          <Card>
            <Card.Body>
              <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Basic Details</h5>
              <Row>
                <Col xl={6}>
                  <FormLabel>Vendor Name</FormLabel>
                  <p className='tx-15'>{singleVendorData.vendorName || "N/A"}</p>
                </Col>


                <Col xl={6}>
                  <FormLabel>Vendor Address</FormLabel>
                  <p className='tx-15'>{singleVendorData.vendorAddress || "N/A"}</p>
                </Col>

                <Col xl={6}>
                  <FormLabel>GST Number</FormLabel>
                  <p className='tx-15'>{singleVendorData.gstin || "N/A"}</p>
                </Col>

                <Col xl={6}>
                  <FormLabel>PAN Number</FormLabel>
                  <p className='tx-15'>{singleVendorData.pan || "N/A"}</p>
                </Col>


                <Col xl={6}>
                  <FormLabel>Product</FormLabel>
                  <p className='tx-15'>{singleVendorData.product || "N/A"}</p>
                </Col>



                <Col xl={6}>
                  <FormLabel>Service Type</FormLabel>
                  <p className='tx-15 col-sm-11 p-0'>{singleVendorData.serviceType || "N/A"}</p>
                </Col>

                <Col xl={6}>
                  <FormLabel>Frequency</FormLabel>
                  <p className='tx-1 p-0'>{singleVendorData.frequency || "N/A"}</p>
                </Col>
                <hr className='w-100' />
                <Col xl={6}>
                  <FormLabel>Contact Person Name</FormLabel>
                  <p className='tx-15'>{singleVendorData.contactPersonName || "N/A"}</p>
                </Col>

                <Col xl={6}>
                  <FormLabel>Contact Person Number</FormLabel>
                  <p className='tx-15'>{singleVendorData.contactPersonNumber || "N/A"}</p>
                </Col>

                <Col xl={6}>
                  <FormLabel>Contact Value:</FormLabel>
                  <p className='tx-15'>{singleVendorData.contactValue  || "N/A"}</p>
                </Col>


              </Row>
            </Card.Body>
          </Card>


        </Col>
        <Col xl={4} className='p-0 pe-3'>


          <Card>
            <Card.Body>
              <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Contract Period Details</h5>
              <Row>
                <Col xl={5} className='mb-1 tx-12'>Start Date</Col>
                <Col xl={7} className='tx-semibold tx-12'>{singleVendorData.contractStartDate || "N/A"}</Col>
                <Col xl={5} className='mb-1 tx-12'>End Date</Col>
                <Col xl={7} className='tx-semibold tx-12'>{singleVendorData.contractEndDate || "N/A"}</Col>
                <Col xl={5} className='mb-1 tx-12'>Total Period Calculation</Col>
                <Col xl={7} className='tx-semibold tx-12'>{singleVendorData.totalPeriodCalculation || "N/A"}</Col>
                <Col xl={12} className='mb-1 tx-12'>Contact Terms & Conditions
                </Col>
                <Col xl={12} className='tx-semibold tx-12'>{singleVendorData.terms || "N/A"}</Col>

              </Row>
            </Card.Body>
          </Card>



          <Card>
            <Card.Body>
              <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Bank Details Details</h5>
              <Row>

                <Col xl={5} className='mb-1 tx-12'>Society Bank Name</Col>
                <Col xl={7} className='tx-semibold tx-12'>{singleVendorData.bankName || "N/A"}</Col>
                <Col xl={5} className='mb-1 tx-12'>Account Number</Col>
                <Col xl={7} className='tx-semibold tx-12'>{singleVendorData.accountNumber || "N/A"}</Col>
                <Col xl={5} className='mb-1 tx-12'>Branch Name</Col>
                <Col xl={7} className='tx-semibold tx-12'>{singleVendorData.branchName || "N/A"}</Col>
                <Col xl={5} className='mb-1 tx-12 '>IFSC Code</Col>
                <Col xl={7} className='tx-semibold tx-12'>{singleVendorData.ifsc || "N/A"}</Col>

              </Row>
            </Card.Body>
          </Card>



        </Col>
      </Row>



    </Fragment >
  );
}
