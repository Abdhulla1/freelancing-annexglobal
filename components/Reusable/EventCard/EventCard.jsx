import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './EventCard.module.css';

function EventCard({ event,onClick}) {
  return (
    <div className="mt-5">
      <div className={`card ${styles.cardStyle}`} onClick={onClick}> 
        <div className="card-body">
          <h5 className={`card-title ${styles.cardTitle}`}>
            {event.title}
          </h5>
          <p className="card-text text-uppercase">
            {`${event.date}  |  ${event.location}`}
          </p>
          <div className="mt-3">
            <img
              src={event.image}
              className="card-img-bottom"
              alt="Nursing Team"
              style={{ borderRadius: '5px' }}
            />
          </div>
        </div>
        <div className={styles.arrowCircle}>
          <i className={`pi pi-arrow-up-right ${styles.arrow}`}></i>
        </div>
      </div>
    </div>
  );
}

export default EventCard;