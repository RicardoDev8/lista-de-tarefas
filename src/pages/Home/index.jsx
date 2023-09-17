import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConections';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {toast} from 'react-toastify'


import { useNavigate } from 'react-router-dom'
import './home.css';


export default function Home() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleLogin(event) {
        event.preventDefault();

        if(email !== email){
            alert('email errado')
            return;
        }

        if (email !== '' || email !== email && password !== '') {
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    toast.success('LOGIN REALIZADO COM SUCESSO!')
                    console.log('LOGIN REALIZADO COM SUCESSO!')
                    navigate('/admin', { replace: true })
                })
                .catch((error) => {
                    toast.error("EMAIL OU SENHA INVÁLIDOS")
                    console.log('ERRO AO CRIAR CONTA ' + error)
                })
        } else {
            toast.warn('PREENCHA TODOS OS CAMPOS!')
        }
    }


    return (
        <div className="home-container" >

            <div className="square">
                <div className="square_cube square_cube--color"></div>
                <div className="square_cube square_cube--glowing"></div>
            </div>

            <h1>Lista de tarefas</h1>
            <span>Gerencie sua agenda de forma fácil!</span>
            <form className='form' onSubmit={handleLogin} >
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
                <button className='btn-form' type='submit' >Acessar</button>
            </form>

            <div className='button-link' >
                <span>Não possui conta? <Link to='/register' >Cadastre-se</Link></span>
            </div>
        </div>
    );
}