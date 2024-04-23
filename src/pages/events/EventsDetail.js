import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import EventDetails from "./EventDetails";

function EventsDetail() {
  const { id } = useParams();
  const [ eventDetails, setEventDetails] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: eventDetails }] = await Promise.all([
          axiosReq.get(`/events/${id}`),
        ]);
        setEventDetails({ results: [eventDetails] });
        console.log(eventDetails);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h100 d-flex justify-content-center">
      <Col className="d-flex justify-content-center">
        <EventDetails {...eventDetails.results[0]} setEventDetails={setEventDetails} EventDetails />
      </Col>
    </Row>
  );
}

export default EventsDetail;
