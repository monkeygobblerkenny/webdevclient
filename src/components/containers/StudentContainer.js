/*==================================================
StudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentThunk } from "../../store/thunks";
import { editStudentThunk } from '../../store/thunks';
import { StudentView } from "../views";
import {EditStudentView} from "../views"
import { Redirect } from 'react-router-dom'
class StudentContainer extends Component {
  
  
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      campusId: null, 
      email: "",
      image_url: "",
      gpa: 0,
      redirect: false, 
      // redirectId: null
    };
  }
  
  // Get student data from back-end database
  componentDidMount() {
    //getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
    // this.props.editStudentThunk(this.props.match.params.id);
  }

    // Capture input data when it is entered
    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }


    // Take action after user click the submit button
    handleSubmit = async event => {
      event.preventDefault();  // Prevent browser reload/refresh after submit.
      let student = this.props.student
      student.firstname = this.state.firstname
      student.lastname = this.state.lastname
      student.email = this.state.email
      student.imageUrl = this.state.imageUrl
      student.gpa = this.state.gpa
      // // Add new student in back-end database
      // if (student_id!=null)
      // {
        console.log(student)
      
      let editedStudent = await this.props.editStudent(student)
      // this.props.student = editedStudent
      // }

      this.setState({
        firstname:  this.state.firstname, 
        lastname: this.state.lastname, 
        campusId: this.state.campusId, 
        email:this.state.email,
        imageUrl:this.state.imageUrl,
        redirect: true, 
        // redirectId: this.props.student.id
      });
     
     
    }

  // Render Student view by passing student data as props to the corresponding View component
  render() {
    if(this.state.redirect) {
      return (<Redirect to={`/students`}/>)
    }
    return (
      <div>
        <Header />

        <StudentView student={this.props.student} />

        <EditStudentView student={this.props.student}           
        handleChange = {this.handleChange} 
        handleSubmit={this.handleSubmit}     
        ></EditStudentView>
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "StudentContainer" to connect to Redux Store.  
// The following 2 input arguments are passed to the "connect" function used by "AllCampusesContainer" component to connect to Redux Store.
const mapState = (state) => {
  return {
    student: state.student,  // Get the State object from Reducer "student"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (id) => dispatch(editStudentThunk(id))
  };
};

// Export store-connected container by default
// StudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(StudentContainer);