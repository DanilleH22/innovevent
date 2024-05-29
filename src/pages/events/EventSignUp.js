import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Form, Button, Alert } from "react-bootstrap";

/**
 * Render Event details and sign up to event
 */
function EventSignUp() {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [eventSignUpData, setEventSignUpData] = useState({
    name: "",
    email: "",
  });
  const [signedUp, setSignedUp] = useState(false);
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);
  const [errors, setErrors] = useState("");
  const [showAlert, setShowAlert] = useState(true);

  /**
   * Populate event details with Id
   */
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const { data } = await axiosReq.get(`/events/${id}`);
        setEventDetails(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEventDetails();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventSignUpData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * Push inputted sign up data to API.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post(`/events/${id}/signup/`, eventSignUpData);
      setSignedUp(true);
      setAlreadySignedUp(false);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setAlreadySignedUp(true);
        setSignedUp(false);
      } else {
        setErrors("An error occurred. Please try again later.");
        console.log(err);
      }
    }
  };

  return (
    <div className="signUp">
      {signedUp && showAlert && (
        <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
          You have successfully signed up for {eventDetails.event_name}.
        </Alert>
      )}
      {alreadySignedUp && showAlert && (
        <Alert variant="warning" dismissible onClose={() => setShowAlert(false)}>
          You have already signed up for {eventDetails.event_name}.
        </Alert>
      )}
      {errors && showAlert && (
        <Alert variant="danger" dismissible onClose={() => setShowAlert(false)}>
          {errors}
        </Alert>
      )}
      <h1 className="text-center">Sign Up for {eventDetails.event_name}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            autoComplete="on"
            value={eventSignUpData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name && errors.name[0]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            autoComplete="on"
            value={eventSignUpData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email && errors.email[0]}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="danger" type="submit">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default EventSignUp;
