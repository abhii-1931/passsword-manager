import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from "uuid"



const Manager = () => {
    const seehideref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ url: "", user: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    let getpasswords = (async () => {
        let req = await fetch('http://localhost:3000/')
        let passwords = await req.json()
        setPasswordArray(passwords)
        console.log(passwordArray)
    })

    useEffect(() => {
      getpasswords()
    }, [])
    


    let showpassword = () => {
        if (seehideref.current.src.includes("hide.svg")) {
            seehideref.current.src = 'src\\images\\show.svg'
            passwordRef.current.type = "text"
        }
        else {
            seehideref.current.src = 'src\\images\\hide.svg'
            passwordRef.current.type = "password"
        }
    }

    let handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    let savePassword = async () => {
        if (form.url.length > 3 && form.password.length > 3 && form.user.length > 3) {
            console.log("here")
            // await fetch('http://localhost:3000/', {method: "DELET", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
            
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])

            
            await fetch('http://localhost:3000/', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            toast.success('Password Saved!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setForm({ url: "", user: "", password: "" })
        }
        else{
            toast.error('Password not saved!', {
                autoClose:3000,
            });
        }
    }

    let deletPassword = async (id) => {
        let confirming = confirm('Do you realy want to delet this password?')
        if (confirming) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            console.log("deleting item")
            await fetch('http://localhost:3000/', { method: "DELET", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id}) })
            toast.success('Password deleted!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    
    let editPassword = (id) => {
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }

    let copyText = (text) => {
        toast('Copied to clipbord!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    return (

        <div className='bg-green-50'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce" />
            {/* Same as */}
            <ToastContainer />
            <div className="hadding flex flex-col items-center py-5">
                <div className="logo font-bold text-4xl ">
                    <span className='text-green-500 font-bold'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </div>
                <p className='text-xl text-green-600'>This is your own Password manager.</p>
                <div className=' flex flex-col gap-4 pt-8'>
                    <input onChange={handleChange} value={form.url} name='url' className="outline-none border-2 rounded-full border-green-400 p-2 px-10 w-[60vw]" type="text" placeholder='Enter website URL' />
                    <div className='flex gap-10 w-[60vw]'>
                        <input onChange={handleChange} value={form.user} name='user' className="outline-none border-2 rounded-full border-green-400 p-2 px-10 w-full" type="text" placeholder='Enter username' />
                        <div className='flex relative justify-center items-center'>
                            <input ref={passwordRef} onChange={handleChange} value={form.password} name='password' className="outline-none border-2 rounded-full border-green-400 p-2 px-10 w-full" type="password" placeholder='Enter Password' />
                            <img ref={seehideref} className='absolute right-0 z-10 pr-2 cursor-pointer' src='src\images\hide.svg' alt="image" onClick={showpassword} />
                        </div>
                    </div>
                </div>
                <button onClick={savePassword} className='bg-green-500 rounded-full p-2 px-4 mt-8 flex justify-center gap-2 items-center'>
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>
                    Save Password</button>
            </div>
            <div className="password-table container w-4/5 mx-auto">
                <h1 className="text-2xl font-bold mb-4">Your Saved Passwords</h1>
                <div className="overflow-x-auto">
                    {passwordArray.length == 0 && <div>No Passwords to show!</div>}
                    {passwordArray.length != 0 && <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden ">
                        <thead>
                            <tr className="bg-green-700 text-white rounded-t-md text-center">
                                <th className="py-3 px-4">URL</th>
                                <th className="py-3 px-4">Username</th>
                                <th className="py-3 px-4">Password</th>
                                <th className="py-3 px-4">update/delet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map(item => {
                                return (
                                    <tr key={item.id} className="border-b hover:bg-gray-50 text-center">
                                        <td className="py-3 px-4 w-[30%] ">
                                            <div className='flex justify-center items-center gap-1'>
                                                <span>{item.url}</span>
                                                <lord-icon onClick={() => copyText(item.url)}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{ "cursor": "pointer", "width": "20px" }}>
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 w-[30%] ">
                                            <div className='flex justify-center items-center gap-1'>
                                                <span>{item.user}</span>
                                                <lord-icon onClick={() => copyText(item.user)}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{ "cursor": "pointer", "width": "20px" }}>
                                                </lord-icon>

                                            </div>
                                        </td>
                                        <td className="py-3 px-4 w-[30%] ">
                                            <div className='flex justify-center items-center gap-1'>
                                                <span>{item.password}</span>
                                                <lord-icon onClick={() => copyText(item.password)}
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{ "cursor": "pointer", "width": "20px" }}>
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 w-[10%] ">
                                            <div className='flex justify-center items-center gap-5'>
                                                <div className='cursor-pointer'>
                                                    <div onClick={() => editPassword(item.id)} >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/zfzufhzk.json"
                                                            trigger="hover"
                                                            stroke="light"
                                                            colors="primary:#000000,secondary:#16c79e,tertiary:#16c79e,quaternary:#000000,quinary:#000000"
                                                            style={{ "width": "20px" }}>
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                                <div className='cursor-pointer'>
                                                    <div onClick={() => deletPassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{ "width": "20px" }}>
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>)
                            })}

                        </tbody>
                    </table>}
                </div>
            </div>
        </div>
    )
}

export default Manager
