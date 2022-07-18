import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Game = () => { 
    const [qtdJogadas, setQtdJogadas] = useState(0)
    const [lastWinner, setLastWinner] = useState("")
    const [jogo, setJogo] = useState(Array(9).fill(""));
    const [players, setPlayers] = useState([{"score":0, "char": "X", "name":"Player 1"}, {"score":0, "char":"O", "name":"Player 2"}])
    const [gameEnd, setGameEnd] = useState(false)

    const jogar  =  (index) => { 
        let t = [...jogo]
        t[index] = (qtdJogadas%2 == 0) ? "X" : "O" 
        setQtdJogadas(qtdJogadas+1)
        setJogo(t)    
    }

    const reset = () => { 
        setJogo(Array(9).fill(""))
        setGameEnd(false)
    }

    const newGame = () => { 
        setPlayers([{"score":0, "char": "X", "name":"Player 1"}, {"score":0, "char":"O", "name":"Player 2"}])
        setJogo(Array(9).fill(""))
        setGameEnd(false)
    }

    const winner = (st) => {

        let t = [...players]
        for (let i in t) { 
            if (t[i]["char"] == st) {
                t[i]["score"] += 1
                setLastWinner(t[i]["name"]) 
            }
        }
        setPlayers(t)
        setGameEnd(true)
    }

    useEffect(()=>{ 
        verifyWin()
    }, [jogo])

    const changeName = (e, index) => { 
        let t = [...players]
        t[index]["name"] = e.target.value
        setPlayers(t)
    }

    const verifyWin = () => { 
        let t = []
        for (let i=0; i<3; i++) {
            t.push(jogo.slice(i*3, i*3+3))
            t.push([jogo[i], jogo[i+3], jogo[i+6]]) 
        }
        t.push([jogo[0], jogo[4], jogo[8]])
        t.push([jogo[6], jogo[4], jogo[2]])
        for (let a of t) {
           let  k = true 
            for (let i = 1; i < 3; i++) { 
                if (a[i] != a[i-1] || a[i] == "" || a[i-1] == ""){
                    k = false
                    break
                }
            }
            if (k) {
                winner(a[0])
                break
            }
        }
        
    }

    return (
    <>
        <header className="py-5 bg-gray-200 flex items-center justify-center text-2xl font-bold">
            Local Game
        </header>
        <div className='mt-3 flex justify-center items-center'>
            {
                gameEnd && (
                    <div className='text-2xl font-sans '>
                        {lastWinner} ganhou +1!! 🥳
                    </div>
                )
            }
        </div>
        <div className="w-full flex items-center justify-center py-10 flex-col">
            <div className="grid grid-cols-3  mt-5 mb-10 rounded-sm">
                {
                    jogo.map((v, i ) =>  {
                        if (v != "" || gameEnd) {
                            return (
                                <button className={`w-24 h-24 shadow-lg sm:w-40 sm:h-40 flex items-center rounded-md justify-center font-bold m-1 
                                text-5xl ${v == "X" ? "bg-rose-700 text-red-200" : (v == "O" ? "bg-blue-600 text-blue-200" : "")}`} key={i} disabled >
                                    {v}
                                </button>
                            ) 
                           
                        }
                        return (
                            <button onClick={e => { jogar(i) }} className="w-24 h-24 sm:w-40 sm:h-40 flex items-center justify-center
                            bg-white font-bold m-1 shadow-lg text-red-200 text-5xl rounded-md" key={i}  >
                            </button>
                        ) 
                    }
                    ) 
                }
            </div>
        <div className='bg-white shadow-lg w-4/5  sm:w-3/5  md:w-4/5 lg:w-2/3 xl:w-1/3 h-auto md:h-auto overscroll-y-auto content-center overflow-auto flex flex-col rounded-lg self-center'>
            {
                players.map((v, i)=>{
                    return (
                        <div className='flex flex-row justify-between border-b pb-8 mx-10 md:mx-32 items-center mt-8 last:border-none' key={i}>
                            <input type="text" className=' w-20 outline-none active:border-none' value={v["name"]} onChange={e=> { changeName(e, i)}}/>
                            <h1 className='text-lg font-bold' style={{marginLeft: -70}}>{v["char"]}</h1>
                            <h1 className='text-lg'>{v["score"]}</h1>
                        </div>
                    )
                })
            }
            <div className='flex font-sans font-bold '>
                <button className='w-1/2 py-3 bg-green-400 hover:bg-green-700' onClick={e=> {newGame()}}>New Game</button>
                <button className='w-1/2 py-3 bg-cyan-500 hover:bg-cyan-700' onClick={e=> {reset()}}>Reset Game</button>
            </div>
        </div>
        </div>
    </>
    )
}


export default Game