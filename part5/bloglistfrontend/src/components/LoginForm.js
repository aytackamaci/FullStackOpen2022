import React, { useCallback } from 'react'

const LoginForm = ({
  username,
  password,
  handleLogin,
  onNameChange,
  onPasswordChange,
}) => {
  const handleNameInputChange = useCallback(
    (event) => {
      onNameChange(event.target.value)
    },
    [onNameChange]
  )

  const handlePasswordInputChange = useCallback(
    (event) => {
      onPasswordChange(event.target.value)
    },
    [onPasswordChange]
  )
  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleNameInputChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordInputChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
