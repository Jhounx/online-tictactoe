import { useEffect, useState } from 'react'
import axios from '../axios';
import io from 'socket.io-client'
import { useRouter } from 'next/router';
let socket;

const Home = () => {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [roomNameCreate, setRoomNameCreate] = useState("")
  const [roomNameSearch, setRoomNameSearch] = useState("")
  const [rooms, setRooms] = useState([{"name": "room of jhounx", "id": "70477e18-d6cf-4822-b4cc-80f7add688e0"}])

  useEffect(()=> {
    (async ()=>{
      const roomsAvailable = await axios.get("/game/show")
      setRooms(roomsAvailable.data)
    })().then()
  }, [])

  const search = ()=> { 
    axios.get(`/game/show?search=${roomNameSearch}`).then((response)=>{
      setRooms(response.data)
    })
  }

  const createGame = ()=> {
    let id  
    axios.post("/game/create", {
      username,
      room_name: roomNameCreate
    }).then(response => { 
      const data = response.data
      if (data.error) { 
        return alert(JSON.stringify(data.error))
      }
      id = data.id
    }) 
    router.push(`/game/${id}`)
  }

  return (
  <>
    <div className=' h-auto w-full flex-col flex items-center justify-center'>
      <div className='flex flex-col w-4/5 sm:w-2/3 md:w-auto md:flex-row  overflow-auto mt-20 mb-10 rounded-sm shadow-md'>
        <input className='px-4 py-2' type="text" placeholder='Username' onChange={e=>{setUsername(e.target.value)}}/>
        <input type="text" className='px-4 py-2' placeholder='Room Name' onChange={e=>{setRoomNameCreate(e.target.value)}} />
        <button className='bg-purple-700 text-white font-bold px-5 py-2' onClick={createGame}>Create Game</button>
      </div>
      <div className='flex overflow-auto rounded-sm shadow-md'>
        <input type="text" className='px-4 py-2' placeholder='Room Name' onChange={e=>{setRoomNameSearch(e.target.value)}} />
        <button className='bg-green-500 text-white font-bold px-5' onClick={search}>Search</button>
      </div>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-fit w-full overflow-auto'>
      {
        rooms.map((v, i)=> { 
          return (
          <div className='bg-slate-50 shadow-md pt-8 px-10 pb-5 h-fit rounded-md m-10' key={i} onClick={()=>{router.push(`/game/${v.id}`)}}>
            <div className='text-lg font-sans mb-2 font-bold'>
              {v.name}
            </div>
            <p className='font-sans cursor-default text-xs '>
              {v.id}
            </p>
        </div>
        )
        })
      }
    </div>
  </>
  )
}

export default Home;