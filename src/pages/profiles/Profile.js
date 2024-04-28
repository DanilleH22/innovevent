import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

/**
 * Render profile
 */

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  /**
   * Populate profile data from id
   */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/profiles/${id}/`);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile", error);
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

 /**
   * Push inputted biography data to API.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/profiles/${id}/`, profile);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <Card className="d-flex justify-content-center mt-4 border-0">
      <Card.Body className="text-center">
        <Card.Title>Profile of {profile.owner}</Card.Title>
        {!editing ? (
          <>
            <Card.Text>{profile.biography}</Card.Text>
            {profile && profile.is_owner && (
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
  );
}

export default Profile;
