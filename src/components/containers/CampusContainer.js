/*==================================================
CampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { editCampusThunk, fetchCampusThunk } from "../../store/thunks";
import { CampusView } from "../views";
import {EditCampusView} from '../views';
import { Redirect } from 'react-router-dom'
class CampusContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "", 
      description: "", 
      campusId: null, 
      image_url: "",
      redirect: false, 
    };
  }

  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
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
    let campus = this.props.campus
    campus.name = this.state.name
    campus.address = this.state.address
    campus.description = this.state.description
    campus.imageUrl = this.state.imageUrl
    console.log(campus)
    
    let editedCampus = await this.props.editCampus(campus)
    this.state = {
      redirect:true
    }

    this.setState({
      name:  this.state.name, 
      description: this.state.description, 
      campusId: this.state.campusId, 
      image_url:this.state.image_url,
      redirect: true, 
    });
    

  }

  // Render a Campus view by passing campus data as props to the corresponding View component
  render() {
    if(this.state.redirect) {
      return (<Redirect to={`/campuses`}/>)
    }
    return (
      <div>
        <Header />
        <CampusView campus={this.props.campus} />

        <EditCampusView campus={this.props.campus}           
        handleChange = {this.handleChange} 
        handleSubmit={this.handleSubmit}     
        ></EditCampusView>
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "CampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (id) => dispatch(editCampusThunk(id))
  };
};

// Export store-connected container by default
// CampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(CampusContainer);