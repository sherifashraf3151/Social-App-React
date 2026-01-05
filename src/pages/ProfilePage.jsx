import React, { useContext } from 'react'
import { CounterContext } from '../Context/CounterContext'

export default function ProfilePage() {

    const { count, setCount } = useContext(CounterContext)
  

  return (
    <div className='ProfilePage'>ProfilePage {count}</div>
  )
}
