const EventEmitter = require('events');

// Create a dedicated EventEmitter for our app
class MessageObserver extends EventEmitter {}
const observer = new MessageObserver();

// ✅ Observer Pattern: Log when a new message is posted
observer.on('messagePosted', ({ topicId, userId, content }) => {
  const time = new Date().toLocaleString();
  console.log(`🟡 [${time}] New message posted by user ${userId} in topic ${topicId}: "${content}"`);
});

// Fails: Observer Pattern: Log when a user views a topic
//observer.on('topicViewed', ({ topicId, userId }) => {
//  const time = new Date().toLocaleString();
//  console.log(`👁️ [${time}] Topic ${topicId} viewed by user ${userId}`);
//});

// ✅ Observer Pattern: Log when a user subscribes to a topic
observer.on('topicSubscribed', ({ topicId, userId }) => {
  const time = new Date().toLocaleString();
  console.log(`🟢 [${time}] User ${userId} subscribed to topic ${topicId}`);
});

module.exports = observer;