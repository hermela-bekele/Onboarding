import React from 'react'
import { useState } from 'react'
import { Button, Input, Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui'

interface SignupProps {
  onSignup: (username: string) => void
  onLoginClick: () => void
}

export default function Signup({ onSignup, onLoginClick }: SignupProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }
    
    onSignup(username)
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
    <Card className="w-[350px]">
      <CardHeader >
        <CardTitle className="text-2xl mb-4 bg-teal-800 text-white p-2 rounded-md">Sign Up</CardTitle>
      </CardHeader>
      <CardContent className="bg-gray-100">
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <Input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full p-2 bg-yellow-500 text-white rounded hover:bg-yellow-300">Sign Up</Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button variant="link" onClick={onLoginClick} className="w-full">
          Already have an account? Log in
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

