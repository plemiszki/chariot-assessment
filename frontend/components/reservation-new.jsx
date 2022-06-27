import React, { useState, useEffect } from 'react'
import DatePicker from 'react-date-picker'
import ChangeCase from 'change-case'

export default function ReservationNew({
  edit,
  reservationId,
  currentTruckType,
  currentStartDate,
  currentEndDate,
  updateReservationDetails,
}) {

  const [spinner, setSpinner] = useState(true)
  const [startDate, setStartDate] = useState(currentStartDate || new Date)
  const [endDate, setEndDate] = useState(currentEndDate || new Date)
  const [selectedTruckType, setTruckType] = useState(currentTruckType || null)
  const [truckTypes, setTruckTypes] = useState([])
  const [page, setPage] = useState(1)

  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  useEffect(() => {
    fetch('/api/trucks')
      .then(data => data.json())
      .then((response) => {
        setTruckTypes(response.truckTypes)
        setTruckType(selectedTruckType || response.truckTypes[0].truckType)
        setSpinner(false)
      })
  }, [])

  useEffect(() => {
    if (startDate.getTime() > endDate.getTime()) {
      setEndDate(startDate)
    }
  }, [startDate])

  const clickUpdateButton = () => {
    setSpinner(true)
    fetch(`/api/reservations/${reservationId}`, {
      method: 'PUT',
      headers: {
        'x-csrf-token': csrfToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reservation: {
          start_date: startDate,
          end_date: endDate,
          truck_type: selectedTruckType,
        }
      })
    })
      .then(data => data.json())
      .then((response) => {
        updateReservationDetails(response.reservation)
      })
  }

  const clickNextButton = () => {
    switch (page) {
      case 1:
        setPage(2)
        break
      case 2:
        setSpinner(true)
        fetch('/api/reservations', {
          method: 'POST',
          headers: {
            'x-csrf-token': csrfToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reservation: {
              start_date: startDate,
              end_date: endDate,
              truck_type: selectedTruckType,
            }
          })
        })
          .then(data => data.json())
          .then((response) => {
            window.location.href = `/reservations/${response.reservation.id}?message=success_new`
          })
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
          top: calc(50% - 45px);
          margin: auto;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.75;
          position: absolute;
        `}</style>
      </>
    )
  }

  const renderForm = () => {
    if (page === 1) {
      return(
        <>
          <div>
            <h2>Select Truck Type</h2>
            <ul>
              { truckTypes.map((truckType) => {
                return(
                  <li key={ truckType.truckType }>
                    <label>
                      <img src={ `/truck-${ChangeCase.paramCase(truckType.truckType)}.png` } />
                      <p>{ truckType.truckTypeEnglish }</p>
                      <input
                        type="radio"
                        name="truck type"
                        value={ truckType.truckType }
                        onChange={ (e) => setTruckType(e.target.value) }
                        checked={ selectedTruckType === truckType.truckType }
                      />
                    </label>
                  </li>
                )
              }) }
            </ul>
          </div>
          <style jsx>{`
            h2 {
              text-align: center;
              font-family: 'TeachableSans-Bold';
              font-size: 30px;
              padding: 0;
              margin-bottom: 20px;
            }
            ul {
              display: grid;
              grid-auto-rows: 1fr;
              grid-template-columns: repeat(3, 1fr);
              grid-row-gap: 20px;
              grid-column-gap: 20px;
              margin-bottom: 20px;
            }
            li {
              display: inline-block;
              text-align: center;
              border: solid 1px lightgray;
              border-radius: 10px;
              box-shadow: 1px 2px 3px 0px #e6e9ec;
            }
            label {
              display: block;
              padding: 20px;
            }
            img {
              margin-bottom: 10px;
            }
            p {
              font-family: 'TeachableSans-SemiBold';
              margin-bottom: 10px;
            }
          `}</style>
        </>
      )
    } else {
      return(
        <>
          <div>
            <h2>Select Dates</h2>
            <div className="calendars-container">
              <div>
                <h3>Pick Up</h3>
                <DatePicker
                  isOpen={ true }
                  value={ startDate }
                  minDate={ new Date }
                  onChange={ (date) => setStartDate(date) }
                />
              </div>
              <div>
                <h3>Return</h3>
                <DatePicker
                  isOpen={ true }
                  value={ endDate }
                  minDate={ startDate }
                  onChange={ (date) => setEndDate(date) }
                />
              </div>
            </div>
          </div>
          <style jsx>{`
            h2 {
              text-align: center;
              font-family: 'TeachableSans-Bold';
              font-size: 30px;
              padding: 0;
              margin-bottom: 20px;
            }
            h3 {
              font-size: 20px;
              font-family: 'TeachableSans-SemiBold';
              text-align: center;
            }
            .calendars-container {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              height: 300px;
              margin-bottom: 20px;
            }
            .calendars-container div {
              text-align: left;
            }
          `}</style>
        </>
      )
    }
  }

  return(
    <>
      <div className="container">
        { spinner ? renderSpinner() : renderForm() }
        { spinner || <button onClick={ () => { edit ? clickUpdateButton() : clickNextButton() } }>{ edit ? 'Update' : 'Next' }</button> }
      </div>
      <style jsx>{`
        .container {
          padding: 30px;
          height: 100%;
          box-sizing: border-box;
          position: relative;
          text-align: center;
        }
        h1 {
          text-align: center;
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
