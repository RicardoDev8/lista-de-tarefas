import {useState, useEffect} from 'react';
import {auth} from '../firebaseConections';
import {onAuthStateChanged} from 'firebase/auth';
import {Navigate} from 'react-router-dom'

export default function Private({children}){

    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)

    useEffect(()=>{

        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user)=>{
                //verifica se tem algum usuário logado
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }

                    localStorage.setItem('@detailUser', JSON.stringify(userData))
                    setLoading(false)
                    setSigned(true)

                }else{
                //quando não tem usuário logado
                setLoading(false)
                setSigned(false)
                }
            })
        }
        checkLogin();

    }, [])

    if(loading){
        return(
            <div></div>
        );
        }
    
    if(!signed){
        return <Navigate to='/' />
    }

    return children;
}