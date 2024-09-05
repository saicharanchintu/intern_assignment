import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeedbackList from '../Components/FeedbackComponent/FeedbackList';

const FeedbackPage = () => {
  const { internId } = useParams();
  const navigate = useNavigate();

  const handleAddFeedbackClick = () => {
    navigate(`/feedback/add/${internId}`);
  };

  return (
    <div>
      <h1>Feedback Management</h1>
      {internId ? (
        <>
          <FeedbackList internId={internId} />
          <button onClick={handleAddFeedbackClick}>Add New Feedback</button>
        </>
      ) : (
        <p>Please select an intern to view feedback.</p>
      )}
    </div>
  );
};

export default FeedbackPage;
