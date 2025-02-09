import React from 'react'
import { AiOutlineMessage } from 'react-icons/ai'
import { IoNotificationsOutline } from 'react-icons/io5'

function Header() {

    type User={
        username:string,
        lastname:string,
        password:string,
        role:string
    }



    const user: User = {
        username: "Victor",
        lastname:"Ralenko",
        password: "1234",
        role:"teacher"

        
    }
  return (
    <header className='w-full h-24 bg-white px-10 py-2 flex justify-between items-center'>
        <div>
            <h1 className='text-black font-k2d text-2xl '>Welcome back, {user.username}</h1>
            <p className='text-neutral-400 font-k2d text-base'>Welcome back, User</p>
        </div>
        <div className='flex flex-row gap-5 items-center'>
            <div className=''>
                <h1 className='text-black font-k2d text-base'>{user.username} {user.lastname}</h1>
                <p className='text-neutral-400 font-k2d text-sm'>{user.role}</p>
            </div>
            <div className='w-[45px] h-[45px] bg-red-400 rounded-full'></div>
            <IoNotificationsOutline size={20} color='A6A6A6'/>
            <AiOutlineMessage size={20} color='A6A6A6'/>
        </div>
    </header>
  )
}

export default Header