import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Form, Button, Alert } from "react-bootstrap";

function EventSignUp() {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [eventSignUpData, setEventSignUpData] = useState({
    name: "",
    email: "",
  });
  const [signedUp, setSignedUp] = useState(false);
  const [errors, setErrors] = useState({});
  // const history = useHistory();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.post(`/events/${id}/signup/`, eventSignUpData);
      setSignedUp(true);
    } catch (err) {
      setErrors("You have already signed up to this event!");
      console.log("You have already signed up to this event!");
    }
  };

  if (signedUp) {
    return (
      <Alert variant="success" dismissible>
        You have successfully signed up for {eventDetails.event_name}.
      </Alert>
    );
  }

  return (
    <div className="event-sign-up-form">
      <h1>Sign Up for {eventDetails.event_name}</h1>
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

// {errors.username?.map((message, idx) => (
//   <Alert variant="warning" key={idx}>
//     {message}
//   </Alert>
// ))}
