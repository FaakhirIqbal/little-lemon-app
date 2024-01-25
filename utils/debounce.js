export default debounce = (func, delay) => {
    let timerId;

  // Returns a function that, as long as it continues to be invoked,
 // will not be triggered. The function will be called after it stops
 // being called for 'delay' milliseconds.
    return (...args) => {
      clearTimeout(timerId);

  // Sets a new timer. The function will be called after the delay
  // period if no new events are triggered on the debounced function. 
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
