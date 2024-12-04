import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-around bg-slate-500 py-2 items-center h-16 text-white'>
            <div className="logo font-bold text-3xl ">
                <span className='text-green-500 font-bold'>&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <ul>
                <li className='list-none flex gap-5 text-lg '>
                    <a className='hover:text-green-200' href="#">Home</a>
                    <a className='hover:text-green-200' href="#">About</a>
                    <a className='hover:text-green-200' href="#">Contact</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
