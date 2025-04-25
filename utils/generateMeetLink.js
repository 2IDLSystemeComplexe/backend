// utils/generateMeetLink.js
const generateMeetLink = (id) => {
    const random = Math.random().toString(36).substring(2, 11);
    return `https://meet.jit.si/consultation-${id}`;
  };
  
  module.exports = generateMeetLink;
  