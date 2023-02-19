import React from 'react'
import { Link } from 'react-router-dom'
import footprint from '~/assets/dog_footprint.jpeg'
export default function Sidebar() {
  return (
    <div className='sticky top-0 border-r border-gray-300 h-screen'>
      <div className='py-4 border-b border-gray-300'>
        <img src={footprint} alt="" className='rounded object-cover w-20 h-20 mx-auto'/>
        <h1 className='text-center font-bold text-3xl'>Pet shop</h1>
      </div>
      <ul>
        <li className='py-2 px-3 cursor-pointer border border-gray-100 hover:bg-gray-100 '>
          <Link to="/pets">View all pets</Link>
        </li>
        <li className='py-2 px-3 cursor-pointer border border-gray-100 hover:bg-gray-100 '>
          <Link to="/addpet">Add new pet</Link>
        </li>
      </ul>
    </div>
  )
}
