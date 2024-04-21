import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";


function EventsDetail() {
  const { id } = useParams();
  const [, setEventDetails ] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: eventDetails }] = await Promise.ass([
          axiosReq.get(`/events/${id}`),
        ])
        setEventDetails({ results: [eventDetails] })
        console.log(eventDetails)
      } catch(err) {
        console.log(err)
      }
    }

    handleMount()
  }, [id])

  return (
    <Row className="h100">
      <Col className="py-2 p-0 p-lg-2">
      <h2>Event</h2>
          <p>Event details.</p>
      </Col>
    </Row>
  );
}

export default EventsDetail;
