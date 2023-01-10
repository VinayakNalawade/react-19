import './index.css'

import {Component} from 'react'

class DigitalTimer extends Component {
  state = {timer: '25', minutes: '25', seconds: '00', status: false}

  timerId

  start = () => {
    const {status} = this.state

    if (!status) {
      this.timerId = setInterval(this.stopwatch, 1000)
    } else {
      clearInterval(this.timerId)
    }

    this.setState({status: !status})
  }

  stopwatch = () => {
    let {minutes, seconds, status} = this.state

    minutes = parseInt(minutes)

    seconds = parseInt(seconds)

    seconds -= 1
    if (seconds === -1) {
      seconds = 59
      minutes -= 1
    }

    if (minutes === -1) {
      clearInterval(this.timerId)
      minutes = 0
      seconds = 0
      status = false
    }

    this.setState({
      status,
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    })
  }

  minus = () => {
    let {timer} = this.state

    timer = parseInt(timer)

    if (timer > 0) {
      timer -= 1
    }

    this.setState({
      minutes: timer < 10 ? `0${timer}` : timer,
      timer: timer < 10 ? `0${timer}` : timer,
      seconds: '00',
    })
  }

  add = () => {
    let {timer} = this.state

    timer = parseInt(timer) + 1

    this.setState({
      minutes: timer < 10 ? `0${timer}` : timer,
      timer: timer < 10 ? `0${timer}` : timer,
      seconds: '00',
    })
  }

  reset = () => {
    clearInterval(this.timerId)

    this.setState({timer: '25', minutes: '25', seconds: '00'})
  }

  render() {
    const {minutes, seconds, timer, status} = this.state

    return (
      <div className="mainContainer">
        <h1 className="heading">Digital Timer</h1>
        <div className="contentContainer">
          <div className="clockSection">
            <div className="clockContainer">
              <h1 className="displayTimer">
                {minutes}:{seconds}
              </h1>
              <p className="displayStatus">{status ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="modifySection">
            <div className="startResetContainer">
              <div className="startContainer">
                <img
                  className="startimg"
                  src={
                    status
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  alt={status ? 'pause icon' : 'play icon'}
                />
                <button
                  onClick={this.start}
                  type="button"
                  className="startbutton startPausetext"
                >
                  {status ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="startContainer">
                <img
                  className="startimg"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <button
                  onClick={this.reset}
                  type="button"
                  className="startbutton startPausetext"
                >
                  Reset
                </button>
              </div>
            </div>
            <p className="modifySectionpara">Set Timer Limit</p>
            <div className="adjustingContainer">
              <button
                className="adjustbutton"
                type="button"
                onClick={!status ? this.minus : null}
              >
                -
              </button>
              <p className="adjusttime">{timer}</p>
              <button
                onClick={!status ? this.add : null}
                className="adjustbutton"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
