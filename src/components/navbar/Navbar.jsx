import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
    return (
        <div className='p-6 flex justify-between items-center border-b'>
            <Link to='/'>Graphique</Link>

            <div className='flex flex-row items-center gap-2'>
                
                    <Link to='/'>Home</Link>
                    <Link to='#'>Features</Link>                
                    <Link to='/main'> main </Link>

                    <div className='flex flex-row items-center gap-2'>
                    <Link to='/auth/signup' >Signup</Link>
                    <Link to='/auth/login'>Login</Link>
                    </div>
                
            </div>
        </div>
    )
}

export default Navbar