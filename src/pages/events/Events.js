import React from "react";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Events = (props) => {
  const {
    id,
    is_owner,
    event_name,
    date,
    description,
    image,
  } = props;

  const currentUser = useCurrentUser();
  const isOwner = currentUser?.username === is_owner;

  return (
    <Row>
      <Col>
        <Container>
          <h1>Events</h1>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={image} alt={event_name} />
            <Card.Body>
              <Card.Title>{event_name}</Card.Title>
              <Card.Text>
                <p>By <strong>Owner</strong></p>
              </Card.Text>
              <Link to={`/events/${id}`}>
                <Card.Text>
                  {description && <p>{description}</p>}
                  {date && <p>{date}</p>}
                </Card.Text>
              </Link>
              {isOwner && (
                <Button variant="primary" as={Link} to={`/events/edit/${id}`}>Edit</Button>
              )}
              <Button variant="primary">Sign Up</Button>
            </Card.Body>
          </Card>
        </Container>
      </Col>
    </Row>
  );
};

export default Events;
