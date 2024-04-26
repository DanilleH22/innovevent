import React, { useState, useRef, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Row, Col, Container, Form, Button, Alert, Image } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
// import useRedirect from "../../hooks/useRedirect"

function EditCreateForm() {
  // const is_owner = owner;
  // useRedirect("loggedIn", is_owner)

  const { id } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [createEventData, setCreateEventData] = useState({
    event_name: "",
    description: "",
    image: "",
    date: "",
  });
  const { event_name, description, image, date } = createEventData;

  const imageInput = useRef(null);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/events/${id}/`);
        if (!data.is_owner) {
          history.push("/not-authorised");
          return;
        }
        setCreateEventData({
          event_name: data.event_name,
          description: data.description,
          image: data.image,
          date: data.date
        });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id, history]);

  const handleChange = (event) => {
    setCreateEventData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      setCreateEventData((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(event.target.files[0]),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("event_name", event_name);
    formData.append("description", description);
    formData.append("date", date);
    if (imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/events/${id}/`, formData);
      history.push(`/events/${id}`);
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
            <h1>Edit {event_name}</h1>
            {image && (
              <div>
                <Image src={image} thumbnail />
                <p>Current Image</p>
              </div>
            )}
            <Form.Group className="text-center">
              <Form.Label>Event Name:</Form.Label>
              <Form.Control
                type="text"
                name="event_name"
                value={event_name}
                onChange={handleChange}
              />
              {errors.event_name &&
                errors.event_name.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              <Form.Label>Description:</Form.Label>
              <textarea
                className="form-control"
                rows="6"
                name="description"
                value={description}
                onChange={handleChange}
              />
              {errors.description &&
                errors.description.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              <Form.Label>Date:</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={date}
                onChange={handleChange}
              />
              {errors.date &&
                errors.date.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
              <Form.File
                id="exampleFormControlFile1"
                accept="image/*"
                label="Change Image"
                ref={imageInput}
                onChange={handleChangeImage}
              />
              {errors.image &&
                errors.image.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
            </Form.Group>
            <div className="text-center">
              <Button variant="danger" onClick={() => history.goBack()} className="mr-3">Cancel</Button>
              <Button type="submit" variant="danger">Save Changes</Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default EditCreateForm;
