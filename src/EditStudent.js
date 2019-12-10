import React, { Component } from "react";
import axios from "axios";
import { Loading } from "./Helper";
import * as myConstants from './Constants';

export default class EditStudent extends Component {
  //local state
  state = {
    name: "",
    email: "",
    age: "",
    gender: "",
    course: "",
    image: "",
    nameError: "",
    emailError: "",
    ageError: "",
    genderError: "",
    courseError: "",
    imageError: "",
    updateStatus: "",
    opacity_value: "",
    fetching: true,
    show_image: "",
    student_image: ""
  };

  componentDidMount() {
    this.setState({ opacity_value: 0.4 });
    axios
      .get(myConstants.Get_Record_By_Id + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          email: response.data.email,
          age: response.data.age,
          gender: response.data.gender,
          course: response.data.course,
          student_image: response.data.image,
          fetching: false,
          opacity_value: "1"
        });
      });
  }

  //sets field data in local state
  changeHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  //checks form validation
  validate = () => {
    this.setState({
      nameError: "",
      emailError: "",
      ageError: "",
      genderError: "",
      courseError: "",
      imageError: ""
    });

    let error = false;
    if (this.state.name === "") {
      this.setState({ nameError: "Name is required" });
      error = true;
    }
    if (this.state.name !== "" && this.state.name.length < 5) {
      this.setState({
        nameError: "Name should be greater than 5 characters"
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
    if (this.state.course === "0") {
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

  //update record in database
  onSubmit = e => {
    e.preventDefault();
    const studentData = new FormData();

    studentData.append("image", this.state.image);
    studentData.append("name", this.state.name);
    studentData.append("email", this.state.email);
    studentData.append("age", this.state.age);
    studentData.append("gender", this.state.gender);
    studentData.append("course", this.state.course);

    const isValid = this.validate();
    if (isValid) {
      this.setState({ fetching: true });
      axios
        .post(
          myConstants.Update_Record_By_Id + this.props.match.params.id,
          studentData,
          {
            headers:{
              "Content-Type": "multipart/form-data"
            }
          },
          studentData
        )
        .then(response => {
          if (response.data.status === true) {
            this.setState(
              { updateStatus: true, fetching: false },
              this.props.history.push("/students", {
                message: "Record Updated"
              })
            );
          }
        });
    }
  };
  render() {
    
    const {
      fetching,
      opacity_value,
      name,
      email,
      age,
      gender,
      course,
      show_image,
      student_image,
      nameError,
      emailError,
      ageError,
      genderError,
      courseError,
      imageError
    } = this.state;
    return (
      <div>
        <h2 className="text-center text-warning pb-4">Update Student Record</h2>
        <form
          onSubmit={this.onSubmit}
          style={{ opacity: opacity_value, margin: "auto", width: "50%" }}
          encType="multipart/form-data"
        >
          {fetching && <Loading />}
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              onChange={this.changeHandler}
              value={name}
              className="form-control"
            />
          </div>
          {nameError && <div class="alert alert-danger">{nameError}</div>}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              onChange={this.changeHandler}
              value={email}
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
              value={age}
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
              <option value="0">Select</option>
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
          <img style={{ width: "30%" }} alt="" id="target" src={show_image ? show_image : `http://localhost/mycrud/public/upload/${student_image}`} />
          <br />
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    );
  }
}
