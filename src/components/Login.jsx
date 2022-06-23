import { useEffect, useState } from "react";
import { Titulo } from "./Titulo";
import { Label } from "./Label";
import { Input } from "./Input";
import styles from './../styles/Login.module.scss'
import stylesLabel from './../styles/Label.module.scss'
import Link from "next/link";
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Login() {
    
        

    // Hooks, estados
    const [ user, setUser ] = useState('');
    const [ password, setPassword ] = useState(''); 
    const [ passwordError, setPasswordError ] = useState(false); 
    const [ userError, setUserError ] = useState(false); 
    const router = useRouter()

    function handleChange(name, value){
        if(name === 'password'){
            setPassword(value);
        }else{
            setUser(value)
        }
    }

    function handleSubmit(){
        let account = { user, password}
        if(account){
            const request = async ()=> {
                try {
                    const response = await fetch('http://192.168.0.106:3000/auth/login',{
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            username: user,
                            password: password
                        })})
                    const content = await response.json();
                    if(content.statusCode != 201) {
                        toast.error("Usuario o contraseña incorrectas!");
                    }
                    if(content.access_token){
                        localStorage.setItem('first_time', JSON.stringify(content.first_time));
                        router.push('/dashboard')
                    }
                } catch (error) {
                    alert('Hubo un error')
                }
            }
            request()
        }
    }


    return(
        <div className={styles.container_login}>
        <ToastContainer />
        <div className={styles.container_card}>
        
        <Titulo text="¡Bienvenido!"></Titulo>
        { passwordError &&
        <label className={styles.label_error}>
                Revise contraseña o usuario
            </label>
        }
            <Label text="Usuario"/>
            <Input 
            atributo={{
                id:"usuario",
                name:"usuario",
                placeholder:"Ingrese el correo",
                type:"email"
            }}
            handleChange={handleChange} 
            // parametro={userError}
            />
            <Label text="Contraseña"/>
            <Input 
            atributo={{
                id:"password", 
                name:"password", 
                placeholder:"Ingrese Contaseña", 
                type:"password"
            }}
            handleChange={handleChange}
            parametro={ passwordError }
            />
            <div>
            <button onClick={handleSubmit} className={styles.btns}>Ingresar</button>
            <br></br>
            <span className={stylesLabel.text_style}>Si no tienes cuenta registrate <Link href="/register">aqui!</Link></span>
            </div>
            <div>
            </div>
        </div>
        </div>
        
            
    )
}
