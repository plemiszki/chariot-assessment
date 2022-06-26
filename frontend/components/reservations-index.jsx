import React, { useState, useEffect } from 'react'

export default function ReservationsIndex() {

  const [reservations, setReservations] = useState([])
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    fetch('/api/reservations')
      .then(data => data.json())
      .then((response) => {
        setReservations(response.reservations)
        setSpinner(false)
      })
  }, [])

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

  const renderTable = () => {
    return(
      <>
        <table>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Truck Type</th>
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
        <h1 className="component-header">Your Reservations</h1>
        <div className="white-box">
          { spinner ? renderSpinner() : renderTable() }
        </div>
        <button onClick={ () => { console.log('add reservation') } }>Add Reservation</button>
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
