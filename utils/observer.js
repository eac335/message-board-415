const EventEmitter = require('events');

// Create a dedicated EventEmitter for our app
class MessageObserver extends EventEmitter {}
const observer = new MessageObserver();

// ✅ Observer Pattern: Log when a new message is posted
observer.on('messagePosted', ({ topicId, userId, content }) => {
  const time = new Date().toLocaleString();
  console.log(`🟡 [${time}] New message posted by user ${userId} in topic ${topicId}: "${content}"`);
});

module.exports = observer;
