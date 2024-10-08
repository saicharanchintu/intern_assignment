import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Components/TaskComponent/task.css";

const TaskPage = ({ task, onSave, onCancel }) => {
  const { internId } = useParams();
  const [formData, setFormData] = useState({
    description: "",
    dueDate: "",
    priority: "Medium", // Default value
    status: "Pending", // Default value
  });

  useEffect(() => {
    if (task) {
      setFormData({
        description: task.description || "",
        dueDate: task.dueDate || "",
        priority: task.priority || "Medium",
        status: task.status || "Pending",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let internIdString = "";

    if (internId && typeof internId === "object") {
      // If internId is an object, convert to a string
      internIdString = internId.toString(); // or access a specific property if applicable
    } else {
      internIdString = internId;
    }

    if (!internIdString) {
      throw new Error("Intern ID is required");
    }

    const taskData = {
      ...formData,
      internId: internIdString, // Ensure internId is a string
    };

    try {
      if (task) {
        // Update existing task
        await axios.put(
          `http://localhost:5000/api/tasks/${task._id}`,
          taskData
        );
      } else {
        // Add new task
        await axios.post("http://localhost:5000/api/tasks", taskData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="taskpage-container">
      <form onSubmit={handleSubmit} className="login-page-form">
        <label htmlFor="description" className="label">
          Description
        </label>
        <div className="input-container">
          <input
            type="text"
            className="input-feild"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <label htmlFor="dueDate" className="label">
          Due Date
        </label>
        <div className="input-container">
          <input
            type="date"
            name="dueDate"
            className="input-feild"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <label htmlFor="priority" className="label">
          Priority
        </label>
        <div className="input-container">
          <select
            name="priority"
            className="input-feild"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <label htmlFor="status" className="label">
          Status
        </label>
        <div className="input-container">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-feild"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Add Task
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TaskPage;
