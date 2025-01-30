
import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, Accordion, Button, Form, Tabs, Tab, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function PropertyView() {

  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}property/propertymaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Property View</span>
        </div>
      </div>


      <Row>
        <Col xl={8} className='ps-0 pe-0'>

          <div className="tab-menu-heading">
            <div className="tabs-menu1">
              <Tabs defaultActiveKey="Details" className="panel-tabs bd_bottom main-nav-line bd-b-0 mb-1">
                <Tab eventKey="Details" title="Details">
                  <div className="tabs-menu-body main-content-body-right" id="Details">

                      <Card className='m-3 mb-5'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Basic Details</h5>
<Row>
  <Col xl={6}>
  <FormLabel>Property Name</FormLabel>
  <p className='tx-15'>A 101</p>
  </Col>

  <Col xl={6}>
  <FormLabel>Owner</FormLabel>
  <p className='tx-15'>Mohan Areca</p>
  </Col>

  <Col xl={6}>
  <FormLabel>Ledger Name</FormLabel>
  <p className='tx-15 col-sm-11 p-0'>A 101 Mr. Vinod Kumar Pandia Mrs. Chanda Vinod Pandia</p>
  </Col>

  <Col xl={6}>
  <FormLabel>Status</FormLabel>
  <p className='tx-15'>Occupied</p>
  </Col>

  <Col xl={6}>
  <FormLabel>Society</FormLabel>
  <p className='tx-15 col-sm-11 p-0'><Link to ={``} className='text-info'>Mohan Areca Co-Op Housing Society Limited</Link></p>
  </Col>

  <Col xl={6}>
  <FormLabel>Tower</FormLabel>
  <p className='tx-15'>-</p>
  </Col>

  <Col xl={6}>
  <FormLabel>Area(sq.ft.)</FormLabel>
  <p className='tx-15'>995</p>
  </Col>

  <Col xl={6}>
  <FormLabel>Wing</FormLabel>
  <p className='tx-15'>A</p>
  </Col>

  <Col xl={6}>
  <FormLabel>Flat No.</FormLabel>
  <p className='tx-15'>101</p>
  </Col>

  <Col xl={6}>
  <FormLabel>Deal Type</FormLabel>
  <p className='tx-15'>None</p>
  </Col>

  <Col xl={6}>
  <FormLabel>Floor No.</FormLabel>
  <p className='tx-15'>5</p>
  </Col>

</Row>
                        </Card.Body>
                      </Card>



                  </div>
                </Tab>
                <Tab eventKey="Parking" title="Parking">
                <div className="tabs-menu-body main-content-body-right">

<Card className='m-3 mb-5'>
  <Card.Body>
    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Parking Details</h5>
<div className='table-responsive p-0 mt-4'>
  <table className='table'>
    <thead>
      <tr>
        <th>S.No.</th>
        <th>Parking Number</th>
        <th>Parking Type</th>
        <th>Parking Vehicle Type</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>UB324324</td>
        <td>Open</td>
        <td>4 Wheeler</td>
        <td>Allocated</td>
      </tr>
      <tr>
        <td>2</td>
        <td>UB324324</td>
        <td>Basement</td>
        <td>4 Wheeler</td>
        <td>Allocated</td>
      </tr>
    </tbody>
  </table>
</div>
  </Card.Body>
</Card>



</div>
                </Tab>
                <Tab eventKey="Loan" title="Loan">
                <div className="tabs-menu-body main-content-body-right">

<Card className='m-3 mb-5'>
  <Card.Body>
    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Loan Details</h5>
<div className='table-responsive p-0 mt-4'>
  <table className='table'>
    <thead>
      <tr>
        <th>S.No.</th>
        <th>Loan Case Number</th>
        <th>Account No</th>
        <th>Bank Name</th>
        <th>IFSC Code</th>
        <th>Interest Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>465475676876</td>
        <td>2324354554</td>
        <td>HDFC Bank</td>
        <td>HDFC0000678</td>
        <td>7%</td>
      </tr>
      <tr>
        <td>2</td>
        <td>465475676876</td>
        <td>2324354554</td>
        <td>HDFC Bank</td>
        <td>HDFC0000678</td>
        <td>7%</td>
      </tr>
    </tbody>
  </table>
</div>
  </Card.Body>
</Card>



</div>

                </Tab>
                <Tab eventKey="Invoices" title="Invoices">

                </Tab>
                <Tab eventKey="Receipts" title="Receipts">

</Tab>
                <Tab eventKey="Ledgers" title="Ledgers">

                </Tab>
              </Tabs>
            </div>
          </div>
        </Col>

        <Col xl={4}>

            <Card>
              <Card.Body>
                <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Registration Details</h5>
                <Row>
                  <Col xl={6} className='mb-1 tx-12'>Flat Registration Number</Col>
                  <Col xl={6} className='tx-semibold'>2686/2020</Col>
                  <Col xl={6} className='mb-1 tx-12'>Date of Agreement</Col>
                  <Col xl={6} className='tx-semibold'>2/28/2024</Col>
                  <Col xl={6} className='mb-1 tx-12'>Date of Registration</Col>
                  <Col xl={6} className='tx-semibold'>2/28/2024</Col>

                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Owner Details</h5>
                <Row>
                <Col xl={6} className='mb-1 tx-12'>Member Name</Col>
                  <Col xl={6} className='tx-semibold'><Link to={``} className='text-info'> Mr. Vinod Kumar Pandia</Link></Col>
                  <Col xl={6} className='mb-1 tx-12'>Co Owner</Col>
                  <Col xl={6} className='tx-semibold'><Link to={``} className='text-info'>Mrs. Chanda Vinod Pandia</Link></Col>
                  <Col xl={6} className='mb-1 tx-12'>Third Owner</Col>
                  <Col xl={6} className='tx-semibold'>-</Col>
                  <Col xl={6} className='mb-1 tx-12'>Fourth Owner</Col>
                  <Col xl={6} className='tx-semibold'>-</Col>
                  <Col xl={6} className='mb-1 tx-12'>Fifth Owner</Col>
                  <Col xl={6} className='tx-semibold'>-</Col>
                  <Col xl={6} className='mb-1 tx-12'>Previous Owner</Col>
                  <Col xl={6} className='tx-semibold'>-</Col>
                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Address Details</h5>
                <Row>
                <Col xl={6} className='mb-1 tx-12'>Address line 1</Col>
                  <Col xl={6} className='tx-semibold'>Opp Mohan Palms</Col>
                  <Col xl={6} className='mb-1 tx-12'>Address line 2</Col>
                  <Col xl={6} className='tx-semibold'>Shirgaon</Col>
                  <Col xl={6} className='mb-1 tx-12'>Address line 3</Col>
                  <Col xl={6} className='tx-semibold'>Badlapur East</Col>
                  <Col xl={6} className='mb-1 tx-12'>City</Col>
                  <Col xl={6} className='tx-semibold'>Thane</Col>
                  <Col xl={6} className='mb-1 tx-12'>State</Col>
                  <Col xl={6} className='tx-semibold'>Maharashtra</Col>
                  <Col xl={6} className='mb-1 tx-12'>Pincode</Col>
                  <Col xl={6} className='tx-semibold'>421503</Col>
                </Row>
              </Card.Body>
            </Card>



            <Card >
              <Card.Body>
                <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Other Details</h5>
                <Row>
                <Col xl={6} className='mb-1 tx-12'>Intercom Number</Col>
                  <Col xl={6} className='tx-semibold'>-</Col>
                  <Col xl={6} className='mb-1 tx-12'>Gas Connection Number</Col>
                  <Col xl={6} className='tx-semibold'>-</Col>
                  <Col xl={6} className='mb-1 tx-12'>Consumer Electricity Number</Col>
                  <Col xl={6} className='tx-semibold'>-</Col>

                </Row>
              </Card.Body>
            </Card>




            <Card>
              <Card.Body>
                <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Already Paid Details</h5>
                <Row>
                <Col xl={6} className='mb-1 tx-12'>Monthly Paid Maintenance to Builder</Col>
                  <Col xl={6} className='tx-semibold'>-</Col>
                  <Col xl={6} className='mb-1 tx-12'>Monthly Paid Maintenance to Builder Upto</Col>
                  <Col xl={6} className='tx-semibold'>-</Col>
                  <Col xl={6} className='mb-1 tx-12'>Monthly Paid Arrears</Col>
                  <Col xl={6} className='tx-semibold'>-</Col>
                  <Col xl={6} className='mb-1 tx-12'>Monthly Paid Arrears Upto</Col>
                  <Col xl={6} className='tx-semibold'>-</Col>
                </Row>
              </Card.Body>
            </Card>


        </Col>
      </Row>


    </Fragment >
  );
}
