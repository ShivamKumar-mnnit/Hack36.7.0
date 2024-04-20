import React from 'react';
import ChatBot from 'react-simple-chatbot';

const QAComponent = (props) => {
  const { steps } = props;
  const userMessage = steps['1'].value.toLowerCase();

  const answers = {
    'how are you': 'I am just a bot, but thank you for asking!',
    'what is your purpose': 'I am here to assist you with any questions you have.',
    'who created you': 'I was created by developers at [Your Company].',
    'safety tips': 'Sure! Here are some road safety tips:\n1. Always wear your seatbelt.\n2. Obey speed limits and traffic signals.\n3. Avoid distractions while driving, such as texting or eating.\n4. Never drink and drive.\n5. Stay alert and avoid driving when tired.\nRemember, safety comes first!',
    // Add more predefined answers as needed
  };

  const userMessageLowerCase = userMessage.toLowerCase();
  const response = answers[userMessageLowerCase] || "I'm sorry, I don't understand.";

  return (
    <div>
      {response}
    </div>
  );
};

const MyChatBot = () => {
  const steps = [
    {
      id: '0',
      message: 'Welcome to the Road Safety Chatbot! What is your name?',
      trigger: '1',
    },
    {
      id: '1',
      user: true,
      trigger: '2',
    },
    {
      id: '2',
      message: 'Hi {previousValue}! How can I assist you today?',
      trigger: '3',
    },
    {
      id: '3',
      user: true,
      trigger: 'showAnswer',
    },
    {
      id: 'showAnswer',
      component: <QAComponent />,
      waitAction: true,
      trigger: 'endMessage',
    },
    {
      id: 'endMessage',
      message: 'Is there anything else I can help you with?',
      end: true,
    },
  ];

  return (
    <div className="chatbot-container">
      <ChatBot steps={steps} />
      <style>
        {`
          .chatbot-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999;
          }

          @media (max-width: 768px) {
            .chatbot-container {
              bottom: 10px;
              right: 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MyChatBot;
