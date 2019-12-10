import React, { Component } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import * as myConstants from './Constants';

export default class AddStudent extends Component {

  // local state
  state = {
    studentName: "",
    email: "",
    age: "",
    gender: "",
    course: "",
    image: "",
    studentNameError: "",
    emailError: "",
    ageError: "",
    genderError: "",
    courseError: "",
    imageError: "",
    addStatus: "",
    fetching: false,
    show_image: ""
  };

  //sets field data in local state
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //checks form validation
  validate = () => {
    this.setState({
      studentNameError: "",
      emailError: "",
      ageError: "",
      genderError: "",
      courseError: "",
      imageError: ""
    });

    //defin error = false
    let error = false;

    if (this.state.studentName === "") {
      this.setState({ studentNameError: "Name is required" });
      error = true;
    }
    if (this.state.studentName !== "" && this.state.studentName.length < 5) {
      this.setState({
        studentNameError: "Name should be greater than 5 characters"
      });
      error = true;
    }
    if (this.state.email === "") {
      this.setState({ emailError: "Email is required" });
      error = true;
    }
    if (this.state.email !== "" && !myConstants.Email_Reg_Expression.test(this.state.email)) {
      this.setState({ emailError: "Email is invalid" });
      error = true;
    }
    if (this.state.age === "") {
      this.setState({ ageError: "Age is required" });
      error = true;
    }
    if (
      this.state.age !== "" &&
      Number.isInteger(parseInt(this.state.age)) === false
    ) {
      this.setState({ ageError: "Enter only numbers" });
      error = true;
    }
    if (this.state.gender === "") {
      this.setState({ genderError: "Gender is required" });
      error = true;
    }
    if (!this.state.course) {
      this.setState({ courseError: "Course is required" });
      error = true;
    }
    if (this.state.image === "") {
      this.setState({ imageError: "Image is required" });
      error = true;
    }
    if (error) {
      return false;
    }
    return true;
  };

  //insert record to database
  onSubmit = e => {
    e.preventDefault();
    const studentData = new FormData();

    studentData.append("image", this.state.image);
    studentData.append("name", this.state.studentName);
    studentData.append("email", this.state.email);
    studentData.append("age", this.state.age);
    studentData.append("gender", this.state.gender);
    studentData.append("course", this.state.course);

    const isValid = this.validate();
    
    //checks form data is valid or not
    if (isValid) {
      this.setState({ fetching: true });
      axios
        .post(
          myConstants.Insert_Record_Api,
          studentData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          },
          studentData
        )
        .then(res => {
          if (res.data.status === true) {
            this.setState(
              { addStatus: true, fetching: false },
              this.props.history.push("/students", { message: "Record Added" })
            );
          }
        });
    }
  };
  render() {
    const {
      fetching,
      gender,
      course,
      show_image,
      studentNameError,
      emailError,
      ageError,
      genderError,
      courseError,
      imageError
    } = this.state;
    let divStyle = {
      margin: "auto",
      width: "50%"
    };
    if (fetching) {
      return (
        <div style={{ position: "fixed", top: "40%", left: "45%" }}>
          <Loader type="Oval" color="#00BFFF" height={150} width={150} />
        </div>
      );
    }
    return (
      <div>
        <h2 className="text-center text-warning pb-4">Add Student</h2>
        {this.state.addStatus > 0 && (
          <div className="alert alert-success" style={divStyle}>
            Student added successfully
          </div>
        )}
        <form
          onSubmit={this.onSubmit}
          ref="form"
          style={divStyle}
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="studentName"
              onChange={this.changeHandler}
              className="form-control"
            />
          </div>
          {studentNameError && (
            <div class="alert alert-danger">{studentNameError}</div>
          )}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              onChange={this.changeHandler}
              className="form-control"
            />
          </div>
          {emailError && <div className="alert alert-danger">{emailError}</div>}
          <div className="form-group">
            <label>Age:</label>
            <input
              type="text"
              name="age"
              onChange={this.changeHandler}
              className="form-control"
            />
          </div>
          {ageError && <div className="alert alert-danger">{ageError}</div>}
          <div className="form-group">
            <label className="pr-2">Gender</label>
            <span className="pr-2">
              <label className="radio-inline">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={this.changeHandler}
                  checked={gender === "male"}
                />
                Male
              </label>
            </span>
            <span>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={this.changeHandler}
                  checked={gender === "female"}
                />
                Female
              </label>
            </span>
          </div>
          {genderError && (
            <div className="alert alert-danger">{genderError}</div>
          )}
          <div class="form-group">
            <label for="sel1">Select Course</label>
            <select
              class="form-control"
              id="sel1"
              name="course"
              value={course}
              onChange={this.changeHandler}
            >
              <option>Select</option>
              <option value="B.A">B.A</option>
              <option value="Bsc">Bsc</option>
              <option value="Bcom">Bcom</option>
              <option value="Btech">Btech</option>
              <option value="Mca">Mca</option>
            </select>
          </div>

          {courseError && (
            <div className="alert alert-danger">{courseError}</div>
          )}

          <div class="form-group">
            <label for="img">Select Image</label>
            <input
              type="file"
              name="image"
              onChange={e =>
                this.setState({
                  image: e.target.files[0],
                  show_image: URL.createObjectURL(e.target.files[0])
                })
              }
            />
          </div>
          {imageError && <div className="alert alert-danger">{imageError}</div>}
          <img style={{ width: "30%" }} alt="" id="target" src={show_image} />
          <br />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    );
  }
}
