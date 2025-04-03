import React, { useState } from 'react';
import './Subscription.css';
const Subscription = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFeedbackChange = (e) => setFeedback(e.target.value);  

  const handleClick = () => {
    if (email && feedback) {
      const subject = "Subscription Confirmation";
      const body = `Thank you for subscribing to our service!\n\nFeedback:\n${feedback}`;

      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    } else {
      alert('Please provide both email and feedback.');
    }
  };

  return (
    <div>
    <div id='subscribe'>
      <form>
        <fieldset>
      <legend><h2>SubscribePage</h2></legend>
      <div id='email'>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
        />
      </div>
      <div id='feedback'>
        <label>Feedback: </label>
        <textarea
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Enter your feedback"
          required
        />
      </div>
      <button id='send' onClick={handleClick}>Send</button>
      <navigate to='/Home'></navigate>
      </fieldset>
    </form>
  
    </div>
   
    </div>
  );
};

export default Subscription;