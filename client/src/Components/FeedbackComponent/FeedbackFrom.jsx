// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const FeedbackForm = () => {
//   const [internId, setInternId] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const [managerId, setManagerId] = useState('');
//   const [mentorId, setMentorId] = useState('');
//   const navigate = useNavigate(); 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/feedback', {
//         internId,
//         feedback,
//         managerId: managerId || null,
//         mentorId: mentorId || null,
//       });
//       // Clear the form fields after submission
//       setInternId('');
//       setFeedback('');
//       setManagerId('');
//       setMentorId('');
//       alert('Feedback added successfully!');
//       // Redirect to the feedback page
//       navigate(`/feedback/${internId}`); // Adjust the route based on your setup
//     } catch (error) {
//       console.error('Error adding feedback:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add New Feedback</h2>
//       <div>
//         <label htmlFor="internId">Intern ID:</label>
//         <input
//           type="text"
//           id="internId"
//           value={internId}
//           onChange={(e) => setInternId(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="feedback">Feedback:</label>
//         <textarea
//           id="feedback"
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//           required
//         ></textarea>
//       </div>
//       <div>
//         <label htmlFor="managerId">Manager ID (optional):</label>
//         <input
//           type="text"
//           id="managerId"
//           value={managerId}
//           onChange={(e) => setManagerId(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="mentorId">Mentor ID (optional):</label>
//         <input
//           type="text"
//           id="mentorId"
//           value={mentorId}
//           onChange={(e) => setMentorId(e.target.value)}
//         />
//       </div>
//       <button type="submit">Submit Feedback</button>
//     </form>
//   );
// };

// export default FeedbackForm;


import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const { internId } = useParams();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState('');
  const [managerId, setManagerId] = useState('');
  const [mentorId, setMentorId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/feedback', {
        internId,
        feedback,
        managerId: managerId || null,
        mentorId: mentorId || null,
      });
      // Clear the form fields after submission
      setFeedback('');
      setManagerId('');
      setMentorId('');
      alert('Feedback added successfully!');
      // Redirect to the feedback page
      navigate(`/feedback/${internId}`);
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Feedback</h2>
      <label htmlFor="feedback" className='label'>Feedback:</label>
      <div className="input-container">
        
        <textarea
          id="feedback"
          className="input-feild"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        ></textarea>
      </div>
      <label htmlFor="managerId" className='label'>Manager ID (optional):</label>
      <div className="input-container">
        
        <input
          type="text"
          id="managerId"
          className="input-feild"
          value={managerId}
          onChange={(e) => setManagerId(e.target.value)}
        />
      </div>
      <label htmlFor="mentorId" className='label'>Mentor ID (optional):</label>
      <div className="input-container">
        
        <input
          type="text"
          id="mentorId"
          className="input-feild"
          value={mentorId}
          onChange={(e) => setMentorId(e.target.value)}
        />
      </div>
      <button type="submit" className='submit-btn'>Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
