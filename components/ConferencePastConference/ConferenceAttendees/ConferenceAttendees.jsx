'use client';
import React, { useState } from 'react';
import Style from './ConferenceAttendees.module.css';

const Card = ({ name, affliation, country }) => (
  <div className={`card text-center p-4 m-2 shadow-sm ${Style['attendee-card']}`} style={{ width: '18rem' }}>
    <strong className='mb-3'>{name}</strong>
    <p className="mb-0 fs-6">{affliation}</p>
    <small>{country}</small>
  </div>
);

export default function ConferenceAttendees({ conference }) {
  const ConferenceAttendees = conference?.pastConference?.conferenceAttendees || [];
  const cardsData = ConferenceAttendees.length > 0 ? ConferenceAttendees : [];                                                                                                 
  const [showAll, setShowAll] = useState(false);

  // Split into rows (4 in odd, 3 in even)
  const rows = [];
  let i = 0;
  let isOddRow = true;

  while (i < cardsData.length) {
    const count = isOddRow ? 4 : 3;
    rows.push(cardsData.slice(i, i + count));
    i += count;
    isOddRow = !isOddRow;
  }

  const rowsToRender = showAll ? rows : rows.slice(0, 4);

  return (
    <div className="container mt-4 py-5 " style={{  minHeight: '100vh'}}>
      {rowsToRender.map((row, rowIndex) => (
        <div className="d-flex justify-content-center flex-wrap" key={rowIndex}>
          {row.map(card => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      ))}

       {rows.length > 4 && (
        <div className="text-center mt-3">
          <button className="brand-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show Less' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
