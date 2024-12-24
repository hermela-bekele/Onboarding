import React, { useState } from 'react'

interface LoginProps {
  onLogin: (username: string, password: string) => void
  onSignupClick: () => void
}

export default function Login({ onLogin, onSignupClick }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(username, password)
  }

  return (
    <div 
      className=" flex items-center justify-center "
      style={{
        backgroundImage: "url('/Main-Page-Background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh'
      }}
    >
      <div className="w-[300px] bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl mb-4 bg-teal-800 text-white p-2 rounded-md">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-300">
          <div>
            <div className="mb-2">Username</div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div>
            <div className="mb-2">Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

        <button
          type="submit"
          className="w-full p-2 bg-yellow-500 text-white rounded hover:bg-yellow-300"
        >
          Login
        </button>
      </form>

        <div className="mt-4">
          <span>Don't have an account? </span>
          <button
            onClick={onSignupClick}
            className="text-blue-500"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}

