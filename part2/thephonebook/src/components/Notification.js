const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  if (message[1] === 1) {
    return <div className="success">{message[0]}</div>;
  } else if (message[1] === 2) {
    return <div className="success">{message[0]}</div>;
  } else if (message[1] === 3) {
    return <div className="error">{message[0]}</div>;
  }
};

export default Notification;
