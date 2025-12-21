import React from 'react'

const NoPage = () => {
  return (
    <div>

      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-2xl font-light text-gray-600 mb-8">Page not found</p>
          <p className="text-gray-500 mb-12 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go home
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default NoPage;

//FlowFunds
//Slogan: “Let your money move the right way.”
//Description: A smooth and stylish tracker that helps keep your finances flowing toward your goals.