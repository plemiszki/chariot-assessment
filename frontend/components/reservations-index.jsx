import React, { useState, useEffect } from 'react'

export default function ReservationsIndex() {

  const [reservations, setReservations] = useState([])

  useEffect(() => {
    fetch('/api/reservations')
      .then(data => data.json())
      .then(response => setReservations(response.reservations))
  }, [])

  return(
    <>
      <div>
        RESERVATIONS INDEX
      </div>
    </>
  )
}
