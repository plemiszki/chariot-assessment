import React from 'react'
import { createRoot } from 'react-dom/client'

import ReservationsIndex from './components/reservations-index.jsx'
import ReservationDetails from './components/reservation-details.jsx'
import ReservationNew from './components/reservation-new.jsx'

window.addEventListener('DOMContentLoaded', () => {

  const reservationsIndexContainer = document.getElementById('reservations-index')
  const reservationDetailsContainer = document.getElementById('reservation-details')
  const reservationNewContainer = document.getElementById('reservation-new')

  if (reservationsIndexContainer) {
    createRoot(reservationsIndexContainer).render(<ReservationsIndex />)
  }

  if (reservationDetailsContainer) {
    createRoot(reservationDetailsContainer).render(<ReservationDetails />)
  }

  if (reservationNewContainer) {
    createRoot(reservationNewContainer).render(<ReservationNew />)
  }
})
