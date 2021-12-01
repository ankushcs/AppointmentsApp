import './index.css'
// import {getDay} from 'date-fns'

const AppointmentItems = props => {
  const {eachAppointmentItem, onToggleStar} = props
  const {id, title, date, isStarred} = eachAppointmentItem

  const starUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarButton = () => {
    onToggleStar(id)
  }

  return (
    <li className="appointment-element">
      <div className="title-star-container">
        <p className="title">{title}</p>
        <button
          type="button"
          testid="star"
          className="star-button"
          onClick={onClickStarButton}
        >
          <img alt="star" src={starUrl} className="star" />
        </button>
      </div>
      <p className="date-text">{date}</p>
    </li>
  )
}

export default AppointmentItems
