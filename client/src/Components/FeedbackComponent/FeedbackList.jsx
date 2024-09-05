import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackList = ({ internId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editFeedback, setEditFeedback] = useState(null);
  const [newFeedbackText, setNewFeedbackText] = useState('');
  const [internName, setInternName] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/feedback/${internId}`);
        setFeedbacks(response.data.feedbacks);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    const fetchInternDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/interns`); 
        const intern = response.data.find((intern) => intern._id === internId);
        if (intern) {
          setInternName(intern.name);
        }
      } catch (error) {
        console.error('Error fetching intern details:', error);
      }
    };

    fetchFeedbacks();
    fetchInternDetails();
  }, [internId]);

  const handleDelete = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${feedbackId}`);
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== feedbackId));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const handleUpdate = async (feedbackId) => {
    try {
      await axios.put(`http://localhost:5000/api/feedback/${feedbackId}`, {
        feedback: newFeedbackText,
      });
      setFeedbacks(feedbacks.map((feedback) =>
        feedback._id === feedbackId ? { ...feedback, feedback: newFeedbackText } : feedback
      ));
      setEditFeedback(null);
      setNewFeedbackText('');
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  const handleEditClick = (feedback) => {
    setEditFeedback(feedback);
    setNewFeedbackText(feedback.feedback);
  };

  return (
    <div>
      <h2>Feedbacks for Intern {internName}</h2>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback._id}>
            <p>{feedback.feedback}</p>
            <p>Manager ID: {feedback.managerId || 'N/A'}</p>
            <p>Mentor ID: {feedback.mentorId || 'N/A'}</p>
            <p>Timestamp: {new Date(feedback.timestamp).toLocaleString()}</p>
            <button onClick={() => handleEditClick(feedback)}>Edit</button>
            <button onClick={() => handleDelete(feedback._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editFeedback && (
        <div>
          <h3>Update Feedback</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editFeedback._id);
            }}
          >
            <textarea
              value={newFeedbackText}
              onChange={(e) => setNewFeedbackText(e.target.value)}
              required
            ></textarea>
            <button type="submit">Update Feedback</button>
            <button
              type="button"
              onClick={() => {
                setEditFeedback(null);
                setNewFeedbackText('');
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
