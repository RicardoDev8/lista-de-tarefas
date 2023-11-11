
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConections';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {toast} from 'react-toastify';

export default function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    async function handleRegister(event) {
        event.preventDefault();
        
        if (email !== '' && password !== '') {

            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    
                    toast.success('USUÁRIO CADASTRADO COM SUCESSO!')
                    
                    navigate('/admin', { replace: true })
                })
                .catch((error) => {
                    if(error.code === 'auth/email-already-in-use'){
                        toast.warn('EMAIL JÁ CADASTRADO')
                    }
                    if(error.code === 'auth/invalid-email'){
                        toast.error('INFORME UM EMAIL VÁLIDO')
                    }
                    
                })

        } else {
            toast.warn('PREENCHA TODOS OS CAMPOS!')
        }


    }


    return (
        <div className="home-container" >

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