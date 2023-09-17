
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConections';
import { createUserWithEmailAndPassword} from 'firebase/auth';


export default function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleRegister(event) {
        event.preventDefault();

        if (email !== '' && password !== '') {

            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    alert('USUÁRIO CADASTRADO COM SUCESSO!')
                    console.log('USUÁRIO CADASTRADO COM SUCESSO!!!!!')
                    navigate('/admin', { replace: true })
                })
                .catch((error) => {
                    console.log('ERRO AO CADASTRAR USUÁRIO ' + error)
                })

        } else {
            alert('preencha todos os campos!')
        }


    }


    return (
        <div className="home-container" >

            {/* <div className="square">
                <div className="square_cube square_cube--color"></div>
                <div className="square_cube square_cube--glowing"></div>
            </div> */}

            <h1>Cadastre-se</h1>
            <span>Vamos criar a sua conta!</span>
            <form className='form' onSubmit={handleRegister} >
                <input
                    type='text'
                    placeholder='digite o seu email'
                    value={email}
                    onChange={(event) => { setEmail(event.target.value) }}
                />
                <input
                    type='password'
                    placeholder='*********'
                    value={password}
                    onChange={(event) => { setPassword(event.target.value) }}
                />
                <button className='btn-form' type='submit' >Cadastrar</button>
            </form>

            <div className='button-link' >
                <span>Já possui uma conta? <Link to='/' >faça o login</Link></span>
            </div>
        </div>
    );
}