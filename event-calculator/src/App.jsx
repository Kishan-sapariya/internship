import React from 'react'
import EventCalculator from './component/EventCalculator'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Event Budget Calculator</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <EventCalculator />
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Event Calculator App</p>
        </div>
      </footer>
    </div>
  )
}

export default App