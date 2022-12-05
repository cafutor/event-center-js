export default function EventCenter() {
  this.eventHub = {};

  this.on = (eventName, listener) => {
    if (Object.prototype.toString.call(eventName) !== '[object String]') {
      throw new Error(
        'event name must be a string.check the method eventCenter.on()!'
      );
    }
    if (eventName.length === 0) {
      throw new Error(
        'empty event name is not allowed.check the method eventCenter.on()!'
      );
    }
    if (Object.prototype.toString.call(listener) !== '[object Function]') {
      throw new Error(
        'listener must be a function. check the method eventCenter.on()!'
      );
    }

    const _listener = (...args) => {
      listener(...args);
    };

    if (this.eventHub[eventName] === undefined) {
      this.eventHub[eventName] = [_listener];
    } else {
    //   console.warn(
    //     `duplicate event name '${eventName}'. warning from event-center-js.`
    //   );
      this.eventHub[eventName].push(_listener);
    }
    return () => {
      if (this.eventHub[eventName] !== undefined) {
        this.eventHub[eventName] = this.eventHub[
          eventName
        ].map((cacheListener) =>
          cacheListener === _listener ? undefined : cacheListener
        );
        if (this.eventHub[eventName].length === 0)
          delete this.eventHub[eventName];
      }
    };
  };

  this.fire = (eventName, data) => {
    if (this.eventHub[eventName] !== undefined) {
      const len = this.eventHub[eventName].length;
      for (let i = 0; i < len; i++) {
        this.eventHub[eventName][i](data);
      }
      this.fixListener(eventName);
    }
  };

  this.off = (eventName) => {
    if (this.eventHub[eventName] !== undefined) {
      this.eventHub[eventName].pop();
      if (this.eventHub[eventName].length === 0)
        delete this.eventHub[eventName];
    }
  };

  this.once = (eventName, listener) => {
    const off = this.on(eventName, (...args) => {
      listener(...args);
      off();
      this.fixListener();
    });
  };
}

EventCenter.prototype = {
  fixListener: function (eventName) {
    if (this.eventHub[eventName] !== undefined) {
      this.eventHub[eventName] = this.eventHub[eventName].filter(
        (_listener) => _listener !== undefined
      );
      if (this.eventHub[eventName].length === 0)
        delete this.eventHub[eventName];
    }
  },
};
