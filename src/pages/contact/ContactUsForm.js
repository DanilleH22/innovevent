import React, { useState } from "react";
import { Container, Alert, Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

const ContactUsForm = () => {
  const [contactUsData, setContactUsData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { name, email, subject, message } = contactUsData;

  const [setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContactUsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setContactUsData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/contact_us/", contactUsData);
      setAlertMessage("Message sent successfully!");
      setShowAlert(true);
      resetForm();
    } catch (err) {
      setErrors(err.response?.data);
      setAlertMessage("Failed to send message: " + err.response?.data.error);
      setShowAlert(true);
    }
  };

  return (
    <Row className="my-4">
      <Col>
        <Container>
          {showAlert && (
            <Alert
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}
          <Card>
            <Card.Header className="d-flex justify-content-center">
              Contact us
            </Card.Header>
            <Card.Body>
              <form id="contact-form" onSubmit={handleSubmit} method="POST">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name here"
                    name="name"
                    id="name"
                    autoComplete="on"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address:</label>
                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter your email here"
                    name="email"
                    id="email"
                    autoComplete="on"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your subject here"
                    name="subject"
                    id="subject"
                    value={subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Enter your message here"
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <Button type="submit" className="btn btn-danger">
                    Submit
                  </Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Container>
      </Col>
    </Row>
  );
};

export default ContactUsForm;
