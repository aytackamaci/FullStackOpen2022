import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'

const RNotification = () => {
  const notification = useSelector(({ notification }) => {
    return notification
  })
  if (notification[0].visibility) {
    if (notification[0].type === 1) {
      return <Alert severity="success">{notification[0].message} </Alert>
    } else if (notification[0].type === 2) {
      return <Alert severity="success">{notification[0].message} </Alert>
    } else if (notification[0].type === 3) {
      return <Alert severity="error">{notification[0].message}</Alert>
    }
  } else {
    return ''
  }
}

export default RNotification
