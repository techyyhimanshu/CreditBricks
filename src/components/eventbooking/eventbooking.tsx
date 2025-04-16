import  { Fragment, useEffect, useState } from "react";
import {  Button, Card, Col, Row, Modal, Form } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Accordion from 'react-bootstrap/Accordion';
import Select from "react-select";
import { Link } from "react-router-dom";

export function EventBooking (){

  const day = [
    { value: "1", label: "Full Day" },
    { value: "2", label: "First Half" },
    { value: "3", label: "Second Half" },
  ]

  const application = [
    { value: "1", label: "Celebration" },
    { value: "2", label: "Banquet Hall" },
    { value: "3", label: "Club House" },
    { value: "4", label: "Play Area" }
  ]

  const designation = [
    { value: "1", label: "Secretary " },
    { value: "2", label: "Committe Member " },
  ]

  const property = [
    { value: "1", label: "A101" },
    { value: "2", label: "A102" },

  ];


  const society = [
    { value: "1", label: "Mohan Areca Co-Op Housing Society Limited" },
    { value: "2", label: "SKA MetroVilla Society Limited" },
  ]

  const occasion = [
    { value: "1", label: "Birthday" },
    { value: "2", label: "Marriage" },
    { value: "3", label: "House Warming" },
    { value: "4", label: "Naming Ceremony" },
    { value: "5", label: "Anniversary" },
    { value: "6", label: "Festivals" },
    { value: "7", label: "Reunion" },
    { value: "8", label: "Retirement" },
    { value: "9", label: "Other" },
    { value: "10", label: "Get Together" },
    { value: "11", label: "Event" },
    { value: "12", label: "Camp" },
  ]

  const venue = [
    { value: "1", label: "Flat" },
    { value: "2", label: "Banquet Hall" },
    { value: "3", label: "Parking Area" },
  ]

  const flat = [
    { value: "1", label: "Select Flat " },
  ]

  const wing = [
    { value: "1", label: "Select Wing " },
  ]

    const [createevent, setcreateevent] = useState(false);

    const viewDemoShow = (modal: any) => {
      switch (modal) {

        case "createevent":
          setcreateevent(true);
          break;
      }
    };

    const viewDemoClose = (modal: any) => {
      switch (modal) {

        case "createevent":
          setcreateevent(false);
          break;

      }
    };

  let eventGuid = 0;
  const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
  const INITIAL_EVENTS = [
    {
      id: createEventId(),
      title: "Banquet Hall",
      start: todayStr,
    },
    {
      id: createEventId(),
      title: "Club House",
      start: todayStr + "T16:00:00",
    },


  ];

  function createEventId() {
    return String(eventGuid++);
  }
  const initialstate1 = {
    calendarEvents: [
      {
        title: "Atlanta Monster",
        start: new Date("2019-04-04 00:00"),
        id: "1001",
      },
      {
        title: "My Favorite Murder",
        start: new Date("2019-04-05 00:00"),
        id: "1002",
      },
    ],

    events: [
      {
        title: "Celebration",
        id: "1",
        bg: "bg-info",
        border: "border-primary",
      },
      {
        title: "Banquet Hall",
        id: "2",
        bg: " bg-secondary",
        border: "border-success",
      },
      {
        title: "Club House",
        id: "3",
        bg: "bg-warning",
        border: "border-warning",
      },

      {
        title: "Play Area",
        id: "4",
        bg: "bg-success",
        border: "border-success",
      }
    ],
  };
  const [state] = useState(initialstate1);

  useEffect(() => {
    const draggableEl:any = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        const title = eventEl.getAttribute("title");
        const id = eventEl.getAttribute("data");
        const classValue = eventEl.getAttribute("class");
        return {
          title: title,
          id: id,
          className: classValue,
        };
      },
    });
  }, []);

  function renderEventContent(eventInfo:any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  const handleEventClick = (clickInfo:any) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };
  const handleEvents = () => {};

  const handleDateSelect = (selectInfo:any) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };
  return (
    <Fragment>



      <div className="pd-b-0  main-content-calendar pt-0 mt-3">

        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <h3>
                 <Link to={`${import.meta.env.BASE_URL}applications/applications`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Events Calender
                </h3>
              </Card.Header>
              <Card.Body>
                   {/* createevent */}
                          <Modal show={createevent} size='xl' centered>
                            <Modal.Header>
                              <Modal.Title>Create Event</Modal.Title>
                              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("createevent"); }}>
                                x
                              </Button>
                            </Modal.Header>
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
                                            options={society}
                                            placeholder="Select society"
                                            classNamePrefix="Select2"
                                          />
                                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                      </Col>

                                      <Col xl="4">
                                        <Form.Group className="form-group mb-1">
                                          <Form.Label>Property </Form.Label>
                                          <Select
                                            options={property}
                                            placeholder="Select property"
                                            classNamePrefix="Select2"
                                          />
                                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                      </Col>

                                      <Col xl="4">
                                        <Form.Group className="form-group mb-1">
                                          <Form.Label>Application </Form.Label>
                                          <Select
                                            options={application}
                                            placeholder="Select application"
                                            classNamePrefix="Select2"
                                          />
                                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                      </Col>

                                <Col xl="4">
                                  <Form.Group className="form-group mb-0">
                                    <Form.Label>Occasion</Form.Label>
                                    <Select
                                      options={occasion}
                                      placeholder="Select occasion"
                                      classNamePrefix="Select2"
                                    />
                                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                  </Form.Group>
                                </Col>

                                <Col xl="2">
                                  <Form.Group className="form-group mb-0">
                                    <Form.Label>Day</Form.Label>
                                    <Select
                                      options={day}
                                      placeholder="Select day"
                                      classNamePrefix="Select2"
                                    />
                                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                  </Form.Group>
                                </Col>

                                <Col xl="2">
                                  <Form.Group className="form-group mb-0">
                                    <Form.Label>No. of Guest </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Number"
                                      className="form-control"
                                    ></Form.Control>
                                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                  </Form.Group>
                                </Col>

                                <Col xl={2}>
                                  <Form.Group className="form-group mb-0">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control
                                      type="date"
                                      placeholder="dd/mm/yyyy"
                                      className="form-control"
                                    ></Form.Control>
                                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                  </Form.Group>
                                </Col>

                                <Col xl={2}>
                                  <Form.Group className="form-group mb-0">
                                    <Form.Label>Time In</Form.Label>
                                    <Form.Control
                                      type="time"
                                      placeholder=""
                                      className="form-control"
                                    ></Form.Control>
                                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                  </Form.Group>
                                </Col>

                                <Col xl={2}>
                                  <Form.Group className="form-group mb-0">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control
                                      type="date"
                                      placeholder="dd/mm/yyyy"
                                      className="form-control"
                                    ></Form.Control>
                                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                  </Form.Group>
                                </Col>

                                <Col xl={2}>
                                  <Form.Group className="form-group mb-0">
                                    <Form.Label>Time Ount</Form.Label>
                                    <Form.Control
                                      type="time"
                                      placeholder=""
                                      className="form-control"
                                    ></Form.Control>
                                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                  </Form.Group>
                                </Col>



                                <Col xl="4">
                                  <Form.Group className="form-group mb-0">
                                    <Form.Label>Venue</Form.Label>
                                    <Select
                                      options={venue}
                                      placeholder="Select venue"
                                      classNamePrefix="Select2"
                                    />
                                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                  </Form.Group>
                                </Col>
                                <Col xl={4}>
                                  <Form.Group className="form-group mb-0">
                                    <Form.Label>Name of the Organizer</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="name"
                                      className="form-control"
                                    ></Form.Control>
                                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                  </Form.Group>
                                </Col>

                                <Col xl={4}>
                                  <Form.Group className="form-group mb-0">
                                    <Form.Label>Contatc Details</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="details"
                                      className="form-control"
                                    ></Form.Control>
                                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                  </Form.Group>
                                </Col>
                                <Col xl={12}>
                                  <Form.Group className="form-group mb-0">
                                    <Form.Label clas>Does this celebration include any of the following?</Form.Label>
                                    <Form.Group className="form-group mb-0">

                                      <Row>
                                        <Col lg={10}>
                                          <Form.Label className='text-muted'>Catering Service</Form.Label>
                                        </Col>
                                        <Col lg={1} className='mt-2'>

                                          <Form.Check type="radio" label="Yes" name="CateringService" />
                                        </Col>
                                        <Col lg={1} className='mt-2'>

                                          <Form.Check type="radio" label="No" name="CateringService" />
                                        </Col>

                                      </Row>
                                      <Row>
                                        <Col lg={10}>
                                          <Form.Label className='text-muted'>Decorations</Form.Label>
                                        </Col>
                                        <Col lg={1} className='mt-2'>

                                          <Form.Check type="radio" label="Yes" name="Decorations" />
                                        </Col>
                                        <Col lg={1} className='mt-2'>

                                          <Form.Check type="radio" label="No" name="Decorations" />
                                        </Col>

                                      </Row>
                                      <Row>
                                        <Col lg={10}>
                                          <Form.Label className='text-muted'>Sound System</Form.Label>
                                        </Col>
                                        <Col lg={1} className='mt-2'>

                                          <Form.Check type="radio" label="Yes" name="SoundSystem" />
                                        </Col>
                                        <Col lg={1} className='mt-2'>

                                          <Form.Check type="radio" label="No" name="SoundSystem" />
                                        </Col>

                                      </Row>
                                      <Row>
                                        <Col lg={10}>
                                          <Form.Label className='text-muted'>Guest Parking</Form.Label>
                                        </Col>
                                        <Col lg={1} className='mt-2'>

                                          <Form.Check type="radio" label="Yes" name="GuestParking" />
                                        </Col>
                                        <Col lg={1} className='mt-2'>

                                          <Form.Check type="radio" label="No" name="GuestParking" />
                                        </Col>

                                      </Row>
                                    </Form.Group>
                                  </Form.Group>
                                </Col>

                                <Col xl={12}>
                                  <Form.Group className="form-group">
                                    <Form.Label>Remarks
                                      <small className='text-muted float-end'>max 250 Character</small>
                                    </Form.Label>
                                    <textarea className="form-control" placeholder='Remarks' cols="60" rows="5"></textarea>
                                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                  </Form.Group>
                                </Col>


                              </Row>
                                  </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="approvaldetails">
                                  <Accordion.Header>Approval Details</Accordion.Header>
                                  <Accordion.Body className='p-2'>
                                    <Row>
                                      <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                          <Form.Label>Society </Form.Label>
                                          <Select
                                            options={society}
                                            placeholder="Select Society"
                                            classNamePrefix="Select2"
                                          />
                                        </Form.Group>
                                      </Col>

                                      <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                          <Form.Label>Property </Form.Label>
                                          <Select
                                            options={property}
                                            placeholder="Select property"
                                            classNamePrefix="Select2"
                                          />
                                        </Form.Group>
                                      </Col>

                                      <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                          <Form.Label>Tower </Form.Label>
                                          <Select
                                            options={wing}
                                            placeholder="Select Tower"
                                            classNamePrefix="Select2"
                                          />
                                        </Form.Group>
                                      </Col>


                                      <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                          <Form.Label>Wing </Form.Label>
                                          <Select
                                            options={wing}
                                            placeholder="Select Wing"
                                            classNamePrefix="Select2"
                                          />
                                        </Form.Group>
                                      </Col>

                                      <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                          <Form.Label>Flat </Form.Label>
                                          <Select
                                            options={flat}
                                            placeholder="Select Flat"
                                            classNamePrefix="Select2"
                                          />
                                        </Form.Group>
                                      </Col>



                                      <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                          <Form.Label>Approver Name</Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="approverName"
                                            placeholder="Approver Name"
                                            className="form-control"
                                          />
                                        </Form.Group>
                                      </Col>

                                      <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                          <Form.Label>Approver Contact</Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="contactdetails"
                                            placeholder="Contact"
                                            className="form-control"
                                          />
                                        </Form.Group>
                                      </Col>

                                      <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                          <Form.Label>Designation </Form.Label>
                                          <Select
                                            options={designation}
                                            placeholder="Select Designation"
                                            classNamePrefix="Select2"
                                          />
                                        </Form.Group>
                                      </Col>


                                    </Row>
                                  </Accordion.Body>
                                </Accordion.Item>

                              </Accordion>

                              <Col xl={12} className='p-0'>
                                <label><input type="checkbox" className='float-start m-2' /><b className='float-start mt-1 cursor' onClick={() => { viewDemoShow("termsconditionsview"); }}> Terms & Conditions</b></label>
                              </Col>
                            </Modal.Body>

                            <Modal.Footer>
                              <Button variant="default" onClick={() => { viewDemoClose("createevent"); }}>
                                Close
                              </Button>
                              <Button variant="primary" onClick={() => { viewDemoClose("createevent"); }}>
                                Save
                              </Button>

                            </Modal.Footer>
                          </Modal>
                <Row>
                  <Col md={12} sm={12} lg={3}>

                    <div id="external-events" className="mt-0">
                    <Button className="btn btn-primary w-100 mb-3" type="button" onClick={() => { viewDemoShow("createevent"); }}>+ Create New Event</Button>
                      <h4>Events</h4>
                      {state.events.map((event:any) => (
                        <div
                          className={`fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event ${event.bg} ${event.border}`}
                          title={event.title}
                          key={event.id}
                        >
                          <div className="fc-event-main">{event.title}</div>
                        </div>
                      ))}
                    </div>
                    <div></div>
                  </Col>
                  <Col md={12} lg={9}>
                    <div id="calendar2">
                      <FullCalendar
                        plugins={[
                          dayGridPlugin,
                          timeGridPlugin,
                          interactionPlugin,
                        ]}
                        headerToolbar={{
                          left: "prev,next today",
                          center: "title",
                          right: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        initialEvents={INITIAL_EVENTS}
                        select={handleDateSelect}
                        eventContent={renderEventContent}
                        eventClick={handleEventClick}
                        eventsSet={handleEvents}
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

        </Row>

      </div>
    </Fragment>
  ); }

  EventBooking.propTypes = {};

EventBooking.defaultProps = {};

export default EventBooking;
