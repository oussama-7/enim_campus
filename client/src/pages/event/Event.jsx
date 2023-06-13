import React from "react";
import "./event.css";
import { useParams } from "react-router-dom"; // Importer useParams depuis react-router-dom
import useFetch from "../../hooks/useFetch";
import EventHeader from "../../components/eventheader/EventHeader";
import Bas from "../../components/bas/Bas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Event = () => {
  const { id } = useParams(); // Utiliser useParams pour extraire l'ID de l'URL
  const { data: event, loading } = useFetch(`/events/find/${id}`);

  return (
    <div>
      
      <EventHeader type="list" />
      <div className="eventContainer">
        {loading ? (
          "Loading"
        ) : (
          <>
           {event && ( // Remplacer 'data' par 'event'
              <div className="eventWrapper">
                <h1 className="eventTitle">{event.name}</h1> 
                <div className="eventAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{event.city}</span> 
                </div>
                <span className="eventDate">{event.date}</span> 
                <div className="eventImages">
                  <div className="eventImgWrapper">

                    <img src={event.photos} alt="" className="eventImg" /> 
                  </div>
                </div>
                <div className="eventDetails">
                  <div className="eventDetailsTexts">
                    <h1 className="eventTitle">{event.title}</h1> 
                    <p className="eventDesc">{event.desc}</p> 
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <Bas />
      </div>
    </div>
  );
};

export default Event;
