import React from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const EventDetails = (props) => {
  const { id, is_owner, event_name, date, description, image } = props;

  return (
    <Row>
      <Col>
        <Container>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={image} alt={event_name} />
            <Card.Body>
              <Card.Title>{event_name}</Card.Title>
              <Card.Text>
                <p>Description: {description}</p>
                <p>Event date: {date}</p>
              </Card.Text>
              <Button variant="primary" as={Link} to={`/events/${id}`}>
                View more
              </Button>
              {is_owner && (
                <>
                  <Button variant="primary" as={Link} to={`/events/${id}/edit`}>
                    Edit
                  </Button>
                </>
              )}
              <Button variant="primary" as={Link} to={`/events/${id}/signup`}>
                Sign Up
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </Col>
    </Row>
  );
};

export default EventDetails;
