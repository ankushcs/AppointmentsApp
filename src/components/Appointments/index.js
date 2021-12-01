import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItems from '../AppointmentItem'
import './index.css'

const initialAppointment = []

class Appointments extends Component {
  state = {
    appointment: initialAppointment,
    title: '',
    date: '',
    starListButtonValue: false,
  }

  onClickStarredListButton = () => {
    const {starListButtonValue} = this.state
    this.setState({
      starListButtonValue: !starListButtonValue,
    })
  }

  onToggleStar = id => {
    this.setState(prevState => ({
      appointment: prevState.appointment.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddButtonClick = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const appointmentListItem = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointment: [...prevState.appointment, appointmentListItem],
      title: '',
      date: '',
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointment, starListButtonValue} = this.state

    if (starListButtonValue) {
      return appointment.filter(eachItem => eachItem.isStarred === true)
    }
    return appointment
  }

  render() {
    const {appointment, title, date} = this.state
    const filteredList = this.getFilteredAppointmentList()
    console.log(filteredList)

    const numberOfAppointmentLists = appointment.length

    return (
      <div className="main-container">
        <div className="card-container">
          <div className="top-card-container">
            <form className="text-container" onSubmit={this.onAddButtonClick}>
              <h1 className="card-heading">Add Appointment</h1>
              <div className="title-container">
                <label htmlFor="title" className="title-label-element">
                  TITLE
                </label>
                <br />
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className="title-input-element"
                  value={title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="date-container">
                <label htmlFor="date" className="date-label-element">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  className="date-input-element"
                  id="date"
                  value={date}
                  onChange={this.onChangeDate}
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div className="image-container">
              <img
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="card-image"
              />
            </div>
          </div>
          <hr className="separator" />
          <div className="appointment-container">
            {numberOfAppointmentLists > 0 ? (
              <div className="appointment-starred-button-container">
                <h1 className="appointment-container-heading">Appointments</h1>
                <button
                  type="button"
                  className="star-list-button"
                  onClick={this.onClickStarredListButton}
                >
                  Starred
                </button>
              </div>
            ) : null}
            <ul className="appointments-list">
              {filteredList.map(eachAppointmentItem => (
                <AppointmentItems
                  key={eachAppointmentItem.id}
                  eachAppointmentItem={eachAppointmentItem}
                  onToggleStar={this.onToggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
