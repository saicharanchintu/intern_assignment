import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeedbackList from '../Components/FeedbackComponent/FeedbackList';
import '../App.css'

const FeedbackPage = () => {
  const { internId } = useParams();
  const navigate = useNavigate();

  const handleAddFeedbackClick = () => {
    navigate(`/feedback/add/${internId}`);
  };

  return (
    <div>
      <h1>Feedback Management</h1>
      <button onClick={handleAddFeedbackClick} className='add-feedback-btn'>Add New Feedback</button>
      {internId ? (
        <>
          <FeedbackList internId={internId} />
          
        </>
      ) : (
        <p>Please select an intern to view feedback.</p>
      )}
    </div>
  );
};

export default FeedbackPage;
