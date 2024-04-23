import React, { useEffect, useState } from "react";
import { useLocation } from "react-router"
import {
    Row,
    Col,
    Container
} from "react-bootstrap"
import { axiosReq } from "../../api/axiosDefaults";
import EventDetails from "./EventDetails";



function Events({message, filter = " "}) {
  
    const [events, setEvents] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const {data} = await axiosReq.get(`/events/${filter}`)
                setEvents(data)
                setHasLoaded(true)
            } catch(err) {
                console.log(err)
            }
        }
        setHasLoaded(false)
        fetchEvents()
    }, [filter, pathname])

    


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <h1>Events</h1>
        {hasLoaded ? (
            <>
                {events.results.length ? (
                    events.results.map(events => (
                        <EventDetails key={events.id} {...events} setEvents={setEvents} />
                    ))
                ) : (
                    <Container>
                        <p> No event has been found with that name, please try again with another keyword.</p>
                    </Container>
                    
                )}
            </>
        ) : (
            <Container>
                <i class="fa-solid fa-spinner"></i>
            </Container>
        )
    }
      </Col>
    </Row>
  );
}

export default Events;