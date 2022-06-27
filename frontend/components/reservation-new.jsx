import React, { useState, useEffect } from 'react'
import ChangeCase from 'change-case'

export default function ReservationNew() {

  const [spinner, setSpinner] = useState(true)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedTruckType, setTruckType] = useState()
  const [truckTypes, setTruckTypes] = useState([])
  const [page, setPage] = useState(1)

  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  useEffect(() => {
    fetch('/api/trucks')
      .then(data => data.json())
      .then((response) => {
        console.log(response);
        setTruckTypes(response.truckTypes)
        setTruckType(response.truckTypes[0].truckType)
        setSpinner(false)
      })
  }, [])

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
          // .then(window.location.pathname = '/reservations')
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
            <label>Start Date
              <input value={ startDate } onChange={ (e) => { setStartDate(e.target.value) } } />
            </label>
            <label>End Date
              <input value={ endDate } onChange={ (e) => { setEndDate(e.target.value) } } />
            </label>
          </div>
          <style jsx>{`
          `}</style>
        </>
      )
    }
  }

  return(
    <>
      <div className="container">
        { spinner ? renderSpinner() : renderForm() }
        { spinner || <button onClick={ () => { clickNextButton() } }>Next</button> }
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
