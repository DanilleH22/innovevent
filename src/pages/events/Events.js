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
    <Row className="h-100 ">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <h1 className="text-center/">Events</h1>
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
          <Row lg={3} md={2}>
            {events.results.map((event) => (
              <Row>
                <EventDetails key={event.id} {...event} setEvents={setEvents} />
              </Row>
            ))}
          </Row>
        ) : (
          <Container>
            <p>
              No event has been found with that name, please try again with
              another keyword.
            </p>
          </Container>
        )
      ) : (
        <Container>
          <Spinner
            animation="border"
            role="status"
            className="d-flex justify-content-center"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )}
    </Row>
  );
}

export default Events;
