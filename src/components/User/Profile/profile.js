import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.css';
import Items from '../Common/Items'
import {
  updateStudent,
  uploadStudentAvatar
} from '../../../actions'

import {
  Port_s,
  Mobile,
  School,
  Title,
  Address
} from '../../Icon/Icon'
import { Icon } from 'antd'

class Profile extends Component {
  state = {
    editActive: false,
    field: {}
  }
  save = () => {
    const { field } = this.state
    Object.keys(field).forEach(
      key => { if (!field[key]) { field[key] = this.props.info[key] } }
    )
    this.props.updateStudent(field)
    this.setState({
      editActive: false
    })
  }
  changing = () => {
    this.setState({
      editActive: true
    })
  }
  addField = (key, data) => {
    this.setState({
      field: Object.assign({}, this.state.field, { [key]: data })
    })
  }
  uploadAvatar = (e) => {
    e.preventDefault()
    let fd = new FormData()
    const avatar = e.target.files[0]
    
    fd.append('path','avatar')
    fd.append('user',this.props.info.student_ID)
    fd.append('fileName', avatar.name)
    fd.append('avatar', avatar)
    this.props.uploadStudentAvatar(fd)
  }
  render() {
    const {
      first_name,
      last_name,
      student_ID,
      address_1,
      address_2,
      title,
      course,
      school,
      mobile_number
    } = this.props.info

    const infoItems = [
      {
        icon: Port_s,
        labelName: "First Name",
        name: "first_name",
        placeHolder: first_name

      },
      {
        icon: Port_s,
        labelName: "Last Name",
        name: "last_name",
        placeHolder: last_name

      },
      {
        icon: Mobile,
        labelName: "Mobile",
        name: "mobile_number",
        placeHolder: mobile_number

      },
      {
        icon: School,
        labelName: "School",
        name: "school",
        placeHolder: school
      },
      {
        icon: Title,
        labelName: "Title",
        name: "title",
        placeHolder: title
      },
    ]

    let courseName = course.map((item) => item.course_name)
    let finace = course.map((item) => item.paied).reduce((accumulator, currentValue) => accumulator + currentValue)
    let { avatar } = this.props.info
    avatar = avatar ? avatar : (<Icon type="user" />)
    return (
      <div className='profile'>
        <div className="profile__avatarContainer">
          <label>
            <input
              onChange={(e) => { this.uploadAvatar(e) }}
              type="file"
              name="avatar"
              accept="image/gif,image/jpeg,image/x-png" />
            <div className="avatar">{avatar}</div>
          </label>
        </div>

        <div className="profile__mainContainer">
          <div className="main">

            <div className="main__header">
              <h1>Edit your profile here</h1>
            </div>

            <div className="main__body">
              <div className="main__body__left">
                {infoItems.map(
                  (item, index) =>
                    <Items
                      {...item}
                      key={index}
                      name={item.name}
                      changing={this.changing}
                      addField={this.addField}
                    />
                )}
              </div>
            </div>
            <div className="main__body__item">
              <input placeholder={address_1} onChange={this.changing}></input>
              <div className="item__label">
                <h2> {Address} </h2>
                <h2>First Address</h2>
              </div>
            </div>

            <div className="main__body__item">
              <input placeholder={address_2} onChange={this.changing}></input>
              <div className="item__label">
                <h2> {Address} </h2>
                <h2>Second Address</h2>
              </div>
            </div>

            <div className="main__body__setButton">
              <button className={`savebutton ${this.state.editActive ? '' : '--inactive'}`}
                onClick={this.save}
              >Save</button>
            </div>
          </div>
        </div>

        <div className="profile__courseContainer">
          <h2>Student ID: {student_ID}</h2>
          <h2>You have enrolled in: </h2>
          <ul>
            {
              courseName.map((item, index) =>
                <li key={index}> {item} </li>
              )
            }
          </ul>
          <h2>Your finance: <span>${finace}</span></h2>
          <h2>Need to be paied</h2>
          {/* <button>Change Password</button> */}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { student } = state;
  return {
    info: student.info,
    _id: student._id
  };
}
export default connect(mapStateToProps, {
  updateStudent,
  uploadStudentAvatar
})(Profile);
