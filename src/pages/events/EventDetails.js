import { React, useState } from "react";
import { Row, Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


/**
 * Populate event details with information given from
 * eventCreateForm
 */
const EventDetails = (props) => {
  const { id, is_owner, event_name, date, description, image } = props;
  const history = useHistory();
  const [setErrors] = useState({});
  const currentUser = useCurrentUser();

  const deleteEvent = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axiosReq.delete(`/events/${id}/`);
        history.push("/");
      } catch (err) {
        console.error("Error deleting event", err);
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Row>
      <Col md={3} className="mb-4">
        <Card style={{ width: "18rem" }} className="h-100">
          <Card.Img
            variant="top"
            src={image}
            alt={event_name}
            className="h-50"
          />
          <Card.Body>
            <Card.Title>{event_name}</Card.Title>
            <Card.Text>Description: {description}</Card.Text>
            <Card.Text>Event date: {date}</Card.Text>
            {is_owner && (
              <>
                <div className="text-center">
                  <Button
                    variant="danger"
                    as={Link}
                    to={`/events/${id}/edit`}
                    className="mr-1 mb-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={deleteEvent}
                    className="ml-1 mb-2"
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
                        {currentUser && (
                          <>
              <div className="text-center">
              <Button variant="danger" as={Link} to={`/events/${id}/signup`}>
                Sign Up
              </Button>
              </div>
              </>
            )}
          
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EventDetails;
