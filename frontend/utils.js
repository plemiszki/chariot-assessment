import React from 'react'

export const newModalStyles = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.50)'
  },
  content: {
    background: '#F5F6F7',
    padding: 0,
    margin: 'auto',
    maxWidth: 1000,
    height: 525,
  }
}

export const renderSpinner = () => {
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

export const renderMessage = (tag) => {
  let text
  let className
  switch(tag) {
    case "success_new":
      text = "Thank you! Your reservation has been completed."
      className = "success"
      break
    case "success_update":
      text = "Thank you! Your reservation has been updated."
      className = "success"
      break
    case "failure_truck":
      text = "We're sorry, but a truck of that type is not available within your reservation period."
      className = "failure"
      break
    case "failure_dates":
      text = "We're sorry, but a truck of your type is not available within that date range."
      className = "failure"
      break
    case "failure":
      text = "We're sorry, but a truck of that type is not available for your requested reservation period."
      className = "failure"
      break
    default:
      return
  }
  return(
    <>
      <p className={ className }>{ text }</p>
      <style jsx>{`
        p {
          padding: 20px;
          border-radius: 5px;
          font-family: 'TeachableSans-SemiBold';
          margin-bottom: 30px;
          box-shadow: 1px 2px 3px 0px #e6e9ec;
        }
        p.success {
          background: lightgreen;
        }
        p.failure {
          background: pink;
        }
      `}</style>
    </>
  )
}
