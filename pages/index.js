import { useState } from 'react'

export default function Home() {
    return(
        <div>
            <h1>Home</h1>
            <Contador />
        </div>
    ) 
}

function Contador() {

    const [cont,setCont] = useState(1)

    function adicionarContador() {
        setCont(cont + 1)
    }

    return(
        <div>
            <h2>Contador: {cont}</h2>
            <button onClick={() => {setCont(cont + 1)}}>Próximo</button>
        </div>
    ) 
}