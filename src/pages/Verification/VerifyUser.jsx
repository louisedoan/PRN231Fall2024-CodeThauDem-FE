import React from "react"
import { useState } from "react"

import { Link } from "react-router-dom"
import { useLocation, useNavigate } from "react-router-dom"
import { verifyUser } from "../../lib/api/Authen"


const VerifyUserPage = () => {
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get("token")

  if (token && isLoading) {
    verifyUser(token)
      .then(() => {
        setIsVerified(true) 
      })
      .catch(() => {
        navigate("/error") 
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1>Verifying ...</h1>
      </div>
    )
  }

  if (isVerified) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div>
          <div className="flex flex-col items-center space-y-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-28 w-28 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-4xl font-semibold">
              Your account has been verified successfully !
            </h1>
            <Link
              to="/"
              className="inline-flex items-center rounded-full border border-indigo-600 bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="text-sm font-medium">Home</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default VerifyUserPage
