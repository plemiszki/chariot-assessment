import React, { useState, useEffect } from 'react'
import ChangeCase from 'change-case'
import Modal from 'react-modal'
import ReservationNew from './reservation-new.jsx'
import { newModalStyles, renderMessage, renderSpinner } from '../utils.js'

export default function ReservationDetails() {

  const urlParams = new URLSearchParams(window.location.search)

  const [spinner, setSpinner] = useState(true)
  const [reservation, setReservation] = useState([])
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editModalPage, setEditModalPage] = useState(1)
  const [messageTag, setMessageTag] = useState(urlParams.get('message'))

  const reservationId = window.location.pathname.split('/')[2]
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  const cancelModalStyles = {
    overlay: {
      background: 'rgba(0, 0, 0, 0.50)'
    },
    content: {
      background: '#FFFFFF',
      margin: 'auto',
      maxWidth: 540,
      height: 125,
      border: 'solid 1px red',
      borderRadius: '6px',
      textAlign: 'center',
      color: '#5F5F5F',
      paddingTop: '36px'
    }
  }

  useEffect(() => {
    fetch(`/api/reservations/${reservationId}`)
      .then(data => data.json())
      .then((response) => {
        setReservation(response.reservation)
        setSpinner(false)
      })
  }, [])

  const updateReservationDetails = (reservation) => {
    setEditModalOpen(false)
    setReservation(reservation)
    setMessageTag('success_update')
  }

  const displayUpdateError = () => {
    setEditModalOpen(false)
    if (editModalPage === 1) {
      setMessageTag('failure_truck')
    } else {
      setMessageTag('failure_dates')
    }
  }

  const cancelReservation = () => {
    setSpinner(true)
    setCancelModalOpen(false)
    fetch(`/api/reservations/${reservationId}`, {
      method: 'DELETE',
      headers: {
        'x-csrf-token': csrfToken,
        'Content-Type': 'application/json',
      },
    })
      .then(window.location.pathname = '/reservations')
  }

  const renderDetails = () => {
    return(
      <>
        <ul>
          <li>
            <h2>Truck Type</h2>
            <img src={ `/truck-${ChangeCase.paramCase(reservation.truckType)}.png` } />
            <p>{ reservation.truckTypeEnglish }</p>
            <a onClick={ () => { setEditModalOpen(true); setEditModalPage(1) } }>Change</a>
          </li>
          <li>
            <h2>Start Date</h2>
            <p>{ reservation.startDate }</p>
            <h2>End Date</h2>
            <p>{ reservation.endDate }</p>
            <a onClick={ () => { setEditModalOpen(true); setEditModalPage(2) } }>Change</a>
          </li>
        </ul>
        <style jsx>{`
          li {
            display: inline-block;
            vertical-align: top;
          }
          li:first-of-type {
            margin-right: 40px;
          }
          h2 {
            text-align: left;
            font-size: 16px;
            padding: 0;
            margin-bottom: 10px;
          }
          p {
            font-size: 14px;
            margin-bottom: 15px;
          }
          img {
            margin-bottom: 15px;
          }
          a {
            color: var(--button-color);
            user-select: none;
            cursor: pointer;
            text-decoration: underline;
          }
        `}</style>
      </>
    )
  }

  const renderCancelModal = () => {
    return(
      <>
        <div className="confirm-delete">
          <h1>Are you sure you want to cancel this reservation&#63;</h1>
          <a onClick={ () => { cancelReservation() } }>
            Yes
          </a>
          <a onClick={ () => { setCancelModalOpen(false) } }>
            No
          </a>
        </div>
        <style jsx>{`
          h1 {
            color: #2C2F33;
            font-family: 'TeachableSans-SemiBold';
            font-size: 20px;
            line-height: 27px;
            margin: auto;
            margin-bottom: 30px;
          }

          a {
            display: inline-block;
            font-family: 'TeachableSans-Medium';
            padding: 15px 40px;
            text-align: center;
            font-size: 12px;
            border-radius: 100px;
            background-color: var(--button-color);
            color: white;
            letter-spacing: inherit;
            cursor: pointer;
          }

          a:hover {
            background-color: var(--highlight-color);
          }

          a:first-of-type {
            margin-right: 40px;
            background-color: darkred;
          }

          a:first-of-type:hover {
            background-color: red;
          }
        `}</style>
      </>
    )
  }

  return(
    <>
      <div>
        { renderMessage(messageTag) }
        <h1 className="component-header">Your Reservation Details</h1>
        <div className="white-box">
          { spinner ? renderSpinner() : renderDetails() }
        </div>
        { spinner || (
          <>
            <a href="/reservations">View All Reservations</a>
            <button className="cancel" onClick={ () => { setCancelModalOpen(true) } }>Cancel Reservation</button>
          </>
        ) }
        <Modal isOpen={ editModalOpen } onRequestClose={ () => { setEditModalOpen(false) } } contentLabel="Modal" style={ newModalStyles } ariaHideApp={ false }>
          <ReservationNew
            edit={ true }
            reservationId={ reservation.id }
            currentTruckType={ reservation.truckType }
            currentStartDate={ new Date(reservation.startDate) }
            currentEndDate={ new Date(reservation.endDate) }
            updateReservationDetails={ updateReservationDetails }
            displayUpdateError={ displayUpdateError }
            startPage={ editModalPage }
          />
        </Modal>
        <Modal isOpen={ cancelModalOpen } onRequestClose={ () => { setCancelModalOpen(false) } } contentLabel="Modal" style={ cancelModalStyles } ariaHideApp={ false }>
          { renderCancelModal() }
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
        a, button {
          display: inline-block;
          border: none;
          font-family: 'TeachableSans-Medium';
          padding: 10px;
          text-align: center;
          font-size: 12px;
          border-radius: 5px;
          color: white;
          letter-spacing: inherit;
          cursor: pointer;
        }
        a {
          background-color: var(--button-color);
          margin-right: 20px;
        }
        a:hover {
          background-color: var(--highlight-color);
        }
        button {
          background-color: darkred;
        }
        button:hover {
          background-color: red;
        }
      `}</style>
    </>
  )
}
