import { useState, useEffect } from 'react';
import './admin.css';
import { auth, bancoDeDados } from '../../firebaseConections';
import { signOut } from 'firebase/auth';
import {toast} from 'react-toastify'
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';


export default function Admin() {

    const [tarefaInput, setTarefaInput] = useState('')
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState({})

    const [tarefas, setTarefas] = useState([])

    useEffect(() => {

        async function loadTarefas() {
            const useDetails = localStorage.getItem('@detailUser');
            setUser(JSON.parse(useDetails));

            if (useDetails) {

                const data = JSON.parse(useDetails);

                const tarefaRef = collection(bancoDeDados, 'tarefas');
                const q = query(tarefaRef, orderBy('created', 'desc'), where('userUid', '==', data?.uid));

                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid,
                        })
                    })
                    setTarefas(lista)
                })

            }
        }

        loadTarefas();

    }, [])

    async function handleRegister(event) {
        event.preventDefault()

        if (tarefaInput === '') {
            // alert('Digite uma tarefa');
            toast.warn('DIGITE UMA TAREFA')
            return;
        }

        if(edit?.id){
            handleUpdateTarefa();
            return;
        }

        await addDoc(collection(bancoDeDados, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
            .then(() => {
                toast.success('NOVA TAREFA CADASTRADA')
                console.log('TAREFA CADASTRADA!!')
                setTarefaInput('')
            })
            .catch((error) => {
                console.log('ERRO AO CADASTRAR TAREFA ' + error)
            })
    }


    async function handleLogout() {
        await signOut(auth)
        toast.info('VOCÊ SAIU', {
            theme: 'colored'
        })
    }

    async function deleteTarefa(id){
       const vlaorRef = doc(bancoDeDados, 'tarefas', id)
       deleteDoc(vlaorRef)
       toast.success('VOCÊ FINALIZOU MAIS UMA TAREFA, PARABÉNS!', {
        theme: 'colored'
       })
    }

    async function editTarefa(item){
        setTarefaInput(item.tarefa)
        setEdit(item)
    }

    async function handleUpdateTarefa(){
        const valorRef = doc(bancoDeDados, 'tarefas', edit?.id)
        updateDoc(valorRef, {
            tarefa: tarefaInput
        })
        .then(()=>{
            toast.success('TAREFA ATUALIZADA', {
                theme: 'colored'
            })
            console.log('TAREFA ATUALIZADA COM SUCESSO!!')
            setTarefaInput('')
            setEdit({})
        })
        .catch((error)=>{
            console.log('ERRO AO ATUALIZAR TAREFA ' + error)
            setTarefaInput('')
            setEdit({})
        })
    }

    return (
        <div className='form-container' >
            <h1>Minhas tarefas</h1>
            <form className='form' onSubmit={handleRegister} >

                <textarea
                    placeholder='Digite sua tarefa...'
                    value={tarefaInput}
                    onChange={(event) => { setTarefaInput(event.target.value) }}
                />

                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' style={{backgroundColor: '#d1c51e'}} type='submit' >Atualizar tarefa</button>
                ) : (
                    <button className='btn-register' type='submit' >Registrar tarefa</button>
                )}
            </form>

            {
                tarefas.map((item) => {
                    return(
                    <article key={item.id} className='list' >
                        <p>{item.tarefa}</p>
                        <div>
                            <button className='btn-edit' onClick={()=> editTarefa(item)} >Editar</button>
                            <button className='btn-done' onClick={()=> deleteTarefa(item.id)} >Concluir</button>
                        </div>
                    </article>
                )})
            }

            <button onClick={handleLogout} className='btn-exit' >Sair</button>
        </div>
    );
}