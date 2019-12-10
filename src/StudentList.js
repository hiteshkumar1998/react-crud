import React, { Component } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Loading } from "./Helper";
import * as myConstants from './Constants';
import { createBrowserHistory } from "history";
const browserHistory = createBrowserHistory();

export default class StudentList extends Component {

  // local state
  state = {
    students: [],
    total_pages: 0,
    current_page: 1,
    offset: 0,
    limit: 1,
    sort_by: "id",
    order_by: "asc",
    fetching: true,
    searching: "",
    opacity_value: "",
    action_message: ""
  };

  timer = null;
  componentDidMount() {
    this.fetchRecords();
    setTimeout(()=> {
      this.setState({
          action_message:''
      })
  }, 2000);
  }

  componentWillMount() {
    if (typeof this.props.location.state != "undefined") {
      this.setState({ action_message: this.props.location.state.message});
    }
    
    browserHistory.replace({
      pathname: "/students",
      state: {}
    });
  }

  // get records from database
  fetchRecords = () => {
    const { offset, limit, sort_by, order_by, searching } = this.state;
    this.setState({ opacity_value: 0.4 });
    axios
      .get(
        myConstants.Fetch_Record_Api +
          offset +
          "&limit=" +
          limit +
          "&sort_by=" +
          sort_by +
          "&order_by=" +
          order_by +
          "&searching=" +
          searching
      )
      .then(response => {
        this.setState({
          students: response.data.records,
          total_pages: response.data.total_pages,
          fetching: false,
          opacity_value: "1"
        });
      });
  };

  //record delete function 
  studentDelete(student_id) {
    this.setState({ fetching: true, opacity_value: 0.4});
    axios
      .get(myConstants.Delete_Record_By_Id + student_id)
      .then(response => {
        this.componentDidMount();
        this.setState({ fetching: false, action_message: "Record Deleted", opacity_value: 1});
      });
  }

  //pagination next page function
  nextPage = pageNumber => {
    const { limit } = this.state;
    this.setState({
      offset: (pageNumber - 1) * limit,
      fetching: true,
      current_page: pageNumber,
      opacity_value : 0.4
    });

    setTimeout(() => {
      this.fetchRecords();
    }, 1000);
  };

  //pagination previous page function
  previousPage = pageNumber => {
    const { limit } = this.state;
    this.setState({
      offset: (pageNumber - 2) * limit,
      fetching: true,
      current_page: pageNumber-1,
      opacity_value : 0.4
    });
    clearTimeout(this.timer);
    setTimeout(() => {
      this.fetchRecords();
    }, 1000);
  };

  // get data from according sorting
  sortingChangeHandler = e => {
    this.setState({ sort_by: e.target.value, fetching: true,opacity_value : 0.4 });
    setTimeout(() => {
      this.fetchRecords();
    }, 1000);
  };

  //update search state
  changeSearchValue = e => {
    this.setState({searching : e.target.value});
  }

  //get data according searching
  handleSearch = () => {
    this.setState({ fetching: true, opacity_value: 0.4});
      this.fetchRecords();
  };

  render() {
    
    const {
      students,
      total_pages,
      current_page,
      fetching,
      opacity_value,
      action_message,
      sort_by
    } = this.state;

    const selectbox_style = {
      width: "100px"
    };

    let divStyle = {
      margin: "auto",
      width: "30%"
    };
    return (
      <div>
        {action_message && (
          <div className="alert alert-success" style={divStyle}>
            {action_message}
          </div>
        )}
        <div className="container mt-4" style={{ opacity: opacity_value }}>
          {fetching && <Loading />}

          <h2 className="text-center text-warning pb-4">Students List</h2>

          <label className="text-primary pr-2">Sorted By</label>
          <select
            value={sort_by}
            onChange={this.sortingChangeHandler}
            style={selectbox_style}
          >
            <option value="id">Id</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="age">Age</option>
            <option value="gender">Gender</option>
            <option value="course">Course</option>
          </select>

          <span className="pl-2">
            <input
              type="text"
              name="search"
              onChange={this.changeSearchValue}
              value={this.state.searching}
            />
            <button type="submit" onClick={this.handleSearch} className="btn btn-primary">Search</button>
          </span>
          
          <button
            type="submit"
            className="btn btn-success float-right mb-4"
            onClick={() => this.props.history.push("/AddStudent")}
          >
            Add Student
          </button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Student Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                return (
                  <tr key={index}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>{student.gender}</td>
                    <td>{student.course}</td>
                    <td><img src={`http://localhost/mycrud/public/upload/${student.image}`} alt="image" width="100px" height="100px" /></td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                          this.props.history.push("/student/edit/" + student.id)
                        }
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={this.studentDelete.bind(this, student.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {/* checks total pages greater than 1  or not for implent pagination*/}
          {total_pages > 1 && (
            <Pagination
              pages={total_pages}
              nextPage={this.nextPage}
              previousPage={this.previousPage}
              currentPage={current_page}
            />
          )}
        </div>
      </div>
    );
  }
}
