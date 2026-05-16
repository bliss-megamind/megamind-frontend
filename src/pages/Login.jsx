import { useState } from 'react'
import AuthForm from '../components/AuthForm'
import { authService } from '../services/authService'
import './Login.css'

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [user, setUser] = useState(null)

  const handleSubmit = async (formData) => {
    setError('')
    setSuccess('')

    // Validation
    if (!formData.username || formData.username.length < 3) {
      setError('Username must be at least 3 characters')
      return
    }

    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      let response
      if (isLogin) {
        response = await authService.login(formData.username, formData.password)
      } else {
        response = await authService.register(formData.username, formData.password)
      }

      const { token, user: userData } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))

      setUser(userData)
      setSuccess(
        isLogin ? '✅ Login successful!' : '✅ Registration successful!'
      )
      setError('')

      // Reset form
      setTimeout(() => {
        setSuccess('')
      }, 3000)
    } catch (err) {
      const message =
        err.response?.data?.message || 'An error occurred. Please try again.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    setIsLogin(true)
    setSuccess('')
    setError('')
  }

  if (user) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="welcome-section">
            <h1>🎉 Welcome, {user.username}!</h1>
            <p>You have successfully logged in</p>
            <div className="user-info">
              <p>
                <strong>User ID:</strong> {user.id}
              </p>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="header">
          <h1>🧠 MegaMind</h1>
          <p>Secure Authentication</p>
        </div>

        <div className="tabs">
          <button
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true)
              setError('')
              setSuccess('')
            }}
          >
            Login
          </button>
          <button
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false)
              setError('')
              setSuccess('')
            }}
          >
            Register
          </button>
        </div>

        <div className="form-container">
          <AuthForm
            isLogin={isLogin}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
            success={success}
          />
        </div>
      </div>
    </div>
  )
}

export default Login