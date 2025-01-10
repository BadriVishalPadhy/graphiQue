import { div } from 'framer-motion/client'
import { Link } from 'react-router'

const Navbar = () => {
    return (

        <div className='fixed w-full p-6 flex justify-between items-center border-b
            text-slate-50 shadow-md 
        '>
            
            <Link to='/' className='text-3xl font-semibold'>Graphique</Link>

            <div className='flex  flex-row items-center gap-2'>
                <div className='flex-row items-center hidden md:flex gap-2'>
                
                    <Link to='/'>Home</Link>
                    <Link to='#'>Features</Link>                
                    <Link to='/main'> main </Link>
                    </div>

                    <div className='flex flex-row items-center gap-2'>
                    <Link className='py-2 px-4 text-sm bg-slate-50 text-slate-950 rounded-xl ' to='/auth/signup' >Signup</Link>
                    <Link className='py-2 px-4 text-sm bg-slate-50 text-slate-950 rounded-xl'  to='/auth/login'>Login</Link>
                    </div>
                
            
            </div>
        </div>
    )
}

export default Navbar