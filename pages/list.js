import { query } from '../lib/db'

export default function List() {

    const dados = {
        nome: 'teste',
        senha: 'senha',
    }

    handler(dados);

    return (
        <div>
            <h1>Lista</h1>
            {/* <CreateUser /> */}
        </div>
    )
    
}

const handler = async (props) => {
    try {
        const results = await query(
            'INSERT INTO user (user_tx_nome, user_tx_senha, user_tx_status) VALUES (?, ?)',
            [props.nome, props.senha, 'ativo']
        )
        return res.json(results)
    } catch (e) {
        console.log(e)
    }
}
