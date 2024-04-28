import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
   * Populate event details with information given from 
   * eventCreateForm
   */
const EventDetails = (props) => {
  const { id, is_owner, event_name, date, description, image } = props;

  return (
    <Col md={3} className="mb-4">
      <Card style={{ width: "18rem" }} className="h-100">
        <Card.Img variant="top" src={image} alt={event_name}
        className="h-50" />
        <Card.Body>
          <Card.Title>{event_name}</Card.Title>
          <Card.Text>Description: {description}</Card.Text>
          <Card.Text>Event date: {date}</Card.Text>
          {is_owner && (
            <Button variant="danger" as={Link} to={`/events/${id}/edit`} className="mr-3">
              Edit
            </Button>
          )}
          <Button variant="danger" as={Link} to={`/events/${id}/signup`}>
            Sign Up
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EventDetails;
