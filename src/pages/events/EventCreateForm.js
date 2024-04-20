import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";
import styles from "../../styles/EventCreateEditForm.module.css";
import { axiosReq } from "../../api/axiosDefaults";

function EventCreateForm() {
  const [errors, setErrors] = useState({});


  const [createEventData, setCreateEventData] = useState({
    event: "",
    description: "",
    image: "",
    date: "",
  });
  const { event, description, image, date } = createEventData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setCreateEventData({
      ...createEventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setCreateEventData({
        ...createEventData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
  
    formData.append("event", event);
    formData.append("description", description);
    formData.append("image", imageInput.current.files[0]);
    formData.append("date", date);
  
    try {
      const { data } = await axiosReq.post("/events/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      history.push(`/events/${data.id}`);
    } catch (err) {
      console.error(err);
      setErrors(err.response?.data);
    }
  };
  

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="m-4 p-4">
          <Container className="d-flex flex-column justify-content-center text-center">
            <h1 id={styles.creatingForm}>Create event</h1>
            <p>Complete the form below to create your event.</p>
            <Form.Group className="text-center">
              <Form.Label>Event name:</Form.Label>
              <Form.Control
                type="text"
                name="event"
                value={event}
                onChange={handleChange}
              />
              {errors.event?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                      {message}
                    </Alert>
                  ))}
              <Form.Label>Description:</Form.Label>
              <textarea
                className="form-control"
                type="text"
                rows="6"
                name="description"
                value={description}
                onChange={handleChange}
              />
              {errors.description?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                      {message}
                    </Alert>
                  ))}
              <Form.Label>Date:</Form.Label>
              <Form.Control
                className="form-control"
                type="date"
                name="date"
                value={date}
                onChange={handleChange}
              />
              {errors.date?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                      {message}
                    </Alert>
                  ))}
              <Form.File
                id="exampleFormControlFile1"
                accept="image/*"
                label="Upload an image"
                ref={imageInput}
                onChange={handleChangeImage}
              />
              {errors.image?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                      {message}
                    </Alert>
                  ))}
            </Form.Group>
            <div className="text-center">
              <Button onClick={() => history.goBack()} className="mr-3" variant="danger">
                Cancel
              </Button>
              <Button type="submit" variant="danger">Create</Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default EventCreateForm;
