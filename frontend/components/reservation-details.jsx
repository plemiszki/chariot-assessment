import React, { useState, useEffect } from 'react'
import ChangeCase from 'change-case'
import Modal from 'react-modal'

export default function ReservationDetails() {

  const [spinner, setSpinner] = useState(true)
  const [reservation, setReservation] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetch(`/api/reservations/${window.location.pathname.split('/')[2]}`)
      .then(data => data.json())
      .then((response) => {
        setReservation(response.reservation)
        setSpinner(false)
      })
  }, [])

  const modalStyles = {
    overlay: {
      background: 'rgba(0, 0, 0, 0.50)'
    },
    content: {
      background: '#F5F6F7',
      padding: 0,
      margin: 'auto',
      maxWidth: 1000,
      height: 420
    }
  }

  const renderSpinner = () => {
    return(
      <>
        <div className="spinner"></div>
        <style jsx>{`
          width: 90px;
          height: 90px;
          background: url(/ajax-loader.svg);
          left: calc(50% - 45px);
          top: cacl(50% - 45px);
          margin: auto;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.75;
        `}</style>
      </>
    )
  }

  const renderDetails = () => {
    return(
      <>
        <ul>
          <li>
            <h2>Truck Type</h2>
            <img src={ `/truck-${ChangeCase.paramCase(reservation.truckType)}.png` } />
            <p>{ reservation.truckTypeEnglish }</p>
            <a>Change</a>
          </li>
          <li>
            <h2>Start Date</h2>
            <p>{ reservation.startDate }</p>
            <h2>End Date</h2>
            <p>{ reservation.endDate }</p>
            <a>Change</a>
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

  return(
    <>
      <div>
        <h1 className="component-header">Your Reservation Details</h1>
        <div className="white-box">
          { spinner ? renderSpinner() : renderDetails() }
        </div>
        <button className="cancel" onClick={ () => { setModalOpen(true) } }>Cancel Reservation</button>
        <Modal isOpen={ modalOpen } onRequestClose={ () => { setModalOpen(false) } } contentLabel="Modal" style={ modalStyles }>
          hello
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
