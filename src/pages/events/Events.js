import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Row, Col, Container, Spinner, Form } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import EventDetails from "./EventDetails";

function Events({ filter = "" }) {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(
          `/events?${filter}&search=${query}`,
        );
        console.log(data);
        setEvents(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchEvents();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="justify-content-center">
      <Col xs={12} sm={10} md={8} lg={6} className="py-2 px-0 px-lg-2">
        <h1 className="text-center">Events</h1>
        <Form onSubmit={(event) => event.preventDefault()} className="mb-4">
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            id="search"
            placeholder="Search event"
          />
        </Form>
      </Col>

      {hasLoaded ? (
        events.results.length ? (
          <Row className="w-100 justify-content-center">
            {events.results.map((event) => (
              <Col
                key={event.id}
                lg={4}
                md={6}
                sm={8}
                xs={12}
                className="mb-4 d-flex align-items-stretch"
              >
                    <EventDetails {...event} setEvents={setEvents} />
              </Col>
            ))}
          </Row>
        ) : (
          <Container className="text-center">
            <p>
              No event has been found with that name, please try again with
              another keyword.
            </p>
          </Container>
        )
      ) : (
        <Container className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )}
    </Row>
  );
}

export default Events;
