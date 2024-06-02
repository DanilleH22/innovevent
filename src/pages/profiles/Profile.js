import React, { useEffect, useState } from "react";
import { Button, Card, Form, Alert, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from '../../api/axiosDefaults'; 

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState({ signed_ups: [] });
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);
        console.log("Profile data received from backend:", data);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile", error);
        setErrors("Error fetching profile");
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) return <div>Loading profile...</div>;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.put(`/profiles/${id}/`, profile);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
      setErrors("Error updating profile");
    }
  };

  return (
    <>
      <Card className="d-flex justify-content-center mt-4 border-0">
        <Card.Body className="text-center">
          <Card.Title>Profile of {profile.owner}</Card.Title>
          {!editing ? (
            <>
              <Card.Text>{profile.biography}</Card.Text>
              {profile.is_owner && (
                <Button variant="danger" onClick={() => setEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Biography</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="biography"
                  value={profile.biography}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="danger" type="submit">
                Save Changes
              </Button>
              <Button
                variant="secondary"
                onClick={() => setEditing(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
      <h2>My Signed-Up Events</h2>
      {errors && <Alert variant="danger">{errors}</Alert>}
      <Row>
        {profile.is_owner && profile.signed_up_events && profile.signed_up_events.length > 0 ? (
          profile.signed_up_events.map((event) => (
            <Col key={event.id} md={4}>
              <Card className="mb-4">
                <Card.Img variant="top" src={event.image} alt={event.event_name} />
                <Card.Body>
                  <Card.Title>{event.event_name}</Card.Title>
                  <Card.Text>Description: {event.description}</Card.Text>
                  <Card.Text>Event date: {event.date}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="warning">No signed up events found.</Alert>
          </Col>
        )} 
      </Row>
    </>
  );
}

export default Profile;
