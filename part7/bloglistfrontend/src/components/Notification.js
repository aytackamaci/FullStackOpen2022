import { useSelector } from 'react-redux'

const RNotification = () => {
  const notification = useSelector(({ notification }) => {
    return notification
  })
  if (notification[0].visibility) {
    if (notification[0].type === 1) {
      return <div className="success">{notification[0].message}</div>
    } else if (notification[0].type === 2) {
      return <div className="success">{notification[0].message}</div>
    } else if (notification[0].type === 3) {
      return <div className="error">{notification[0].message}</div>
    }
  } else {
    return ''
  }
}

export default RNotification
