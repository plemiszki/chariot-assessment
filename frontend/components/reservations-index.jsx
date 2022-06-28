import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import ReservationNew from './reservation-new.jsx'
import { newModalStyles, renderMessage, renderSpinner } from '../utils.js'

export default function ReservationsIndex() {

  const urlParams = new URLSearchParams(window.location.search)

  const [spinner, setSpinner] = useState(true)
  const [reservations, setReservations] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [messageTag, setMessageTag] = useState(urlParams.get('message'))

  useEffect(() => {
    fetch('/api/reservations')
      .then(data => data.json())
      .then((response) => {
        setReservations(response.reservations)
        setSpinner(false)
      })
  }, [])

  const displayCreateError = () => {
    setMessageTag('failure_truck')
    setModalOpen(false)
  }

  const renderNoReservations = () => {
    return(
      <p>You currently have no reservations.</p>
    )
  }

  const renderTable = () => {
    return(
      <>
        <table>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Vehicle Type</th>
            </tr>
          </thead>
          <tbody>
            { reservations.map((reservation) => {
              const path = `/reservations/${reservation.id}`
              return(
                <tr key={ reservation.id }>
                <td>
                <a href={ path }>
                { reservation.startDate }
                </a>
                </td>
                <td>
                <a href={ path }>
                { reservation.endDate }
                </a>
                </td>
                <td>
                <a href={ path }>
                { reservation.truckType }
                </a>
                </td>
                </tr>
              )
            }) }
          </tbody>
        </table>
        <style jsx>{`
          table {
            width: 100%;
            border-spacing: 0;
            border-collapse: collapse;
          }
          tbody tr:hover {
            background-color: rgb(245, 245, 245);
          }
          th:first-of-type, td:first-of-type {
            padding-left: 10px;
          }
          th {
            font-family: 'TeachableSans-SemiBold';
            padding-bottom: 20px;
            color: black;
            text-align: left;
          }
          tr a {
            display: block;
            padding: 10px 0;
          }
        `}</style>
      </>
    )
  }

  return(
    <>
      <div>
        { renderMessage(messageTag) }
        <h1 className="component-header">Your Reservations</h1>
        <div className="white-box">
          { spinner ? renderSpinner() : (reservations.length === 0 ? renderNoReservations() : renderTable()) }
        </div>
        <button onClick={ () => { setModalOpen(true) } }>Add Reservation</button>
        <Modal isOpen={ modalOpen } onRequestClose={ () => { setModalOpen(false) } } contentLabel="Modal" style={ newModalStyles } ariaHideApp={ false }>
          <ReservationNew displayCreateError={ displayCreateError } />
        </Modal>
      </div>
      <style jsx>{`
        .white-box {
          background-color: white;
          padding: 36px 32px;
          box-shadow: 1px 2px 3px 0px #e6e9ec;
          width: 100%;
          box-sizing: border-box;
          margin-bottom: 28px;
        }
        button {
          display: inline-block;
          border: none;
          font-family: 'TeachableSans-Medium';
          padding: 10px;
          text-align: center;
          font-size: 12px;
          background-color: var(--button-color);
          border-radius: 5px;
          color: white;
          letter-spacing: inherit;
          cursor: pointer;
        }
        button:hover {
          background-color: var(--highlight-color);
        }
      `}</style>
    </>
  )
}
