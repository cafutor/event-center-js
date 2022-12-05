# event-center-js

### install

```
npm install event-center-js@latest --save
```

### useage

```javascript
import EventCenter from 'event-center-js';

const eventCenter = new EventCenter();

// first listener
eventCenter.on('eventA', (data) => {
  // processing data
  // ...
});

// second listener
eventCenter.on('eventA', (data) => {
  // processing data
  // ...
});

// all listeners will be called
eventCenter.fire('eventA', 1);

// remove latest event listener. eg:the second listener of eventA will be removed then the first one.
eventCenter.off('eventA');
eventCenter.off('eventA');

// the listener of eventB will be called once
eventCenter.once('eventB', (data) => {
  // processing data
  // ...
});

// the method eventCenter.on() will return a off method. call it will remove the listener
const off = eventCenter.on('eventC', (data) => {
  // processing data
  // ...
  off();
});
```
