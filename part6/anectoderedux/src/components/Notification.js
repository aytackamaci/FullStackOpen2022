import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return notification[0].visibility ? (
    <div style={style}>{notification[0].message}</div>
  ) : (
    ''
  )
}

export default Notification
