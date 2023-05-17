/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent } = props;

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
        <div key={student.id}>
            <Link to={`/campus/${student.campus.id}`}>
              <h3>{student.campus.name}</h3>
            </Link>
        </div>
      <img src={student.imageUrl} alt='Profile' style={{
        minWidth: '20%',
        maxWidth: 200,
        minHeight: '20%',
        maxHeight: 200,
      }}/>
      <h3>Email: {student.email}</h3>
      <h3>GPA: {student.gpa}</h3>

      <Link to={'/students'}>
        <button onClick={() => deleteStudent(student.id)}>Delete</button>
      </Link>
      
    </div>
  );

};

export default StudentView;