const handleEnterPress = (callback, shouldPreventDefault = true) => (event) => {
  event = event || window.event;
  let isEnter;

  if ('key' in event) {
    isEnter = event.key === 'Enter';
  } else {
    isEnter = (event.keyCode === 13);
  }

  if (isEnter) {
    if (shouldPreventDefault) {
      event.preventDefault();
    }
    callback();
  }
};

export default handleEnterPress;
