import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InternForm from "../InternForm/InternFrom";
import "./InternList.css";

const InternList = () => {
  const [interns, setInterns] = useState([]);
  const [editingIntern, setEditingIntern] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterns = async () => {
      const response = await axios.get("http://localhost:5000/api/interns");
      setInterns(response.data);
    };

    fetchInterns();
  }, []);

  const deleteIntern = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/interns/${id}`);
      setInterns(interns.filter((intern) => intern._id !== id));
      alert("Intern deleted successfully");
    } catch (error) {
      console.error("Error deleting intern:", error);
    }
  };

  const handleEditClick = (intern) => {
    setEditingIntern(intern);
  };

  const handleSave = () => {
    setEditingIntern(null);
    const fetchInterns = async () => {
      const response = await axios.get("http://localhost:5000/api/interns");
      setInterns(response.data);
    };

    fetchInterns();
  };

  const handleAddNewIntern = () => {
    navigate("/add");
  };

  const handleTask=(id)=>{
    navigate(`/task/${id}`);
  }

  const handleFeedback=(id)=>{
    navigate(`/feedback/${id}`);
  }

  return (
    <div className="interns-containers">
      <h2>Interns</h2>
      <button className="add-intern-btn" onClick={handleAddNewIntern}>
        Add New Intern
      </button>
      {editingIntern ? (
        <InternForm intern={editingIntern} onSave={handleSave} />
      ) : (
        <div className="interns-container">
          <ul>
            {interns.map((intern) => (
              <li key={intern._id}>
                <Link to={`/interns/${intern._id}`}>
                  {intern.name} - {intern.department}
                </Link>
                <button onClick={() => handleEditClick(intern)}>Update</button>
                <button onClick={() => deleteIntern(intern._id)}>Delete</button>
                <button onClick={() => handleTask(intern._id)}>Tasks</button>
                <button onClick={()=>handleFeedback(intern._id)}>Feedback</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InternList;
