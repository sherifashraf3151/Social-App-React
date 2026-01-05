import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-4 text-center text-sm">
          Footer © {new Date().getFullYear()}
        </div>
      </div>

    </footer>
  )
}
