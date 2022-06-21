import { useState } from "react";
import { Titulo } from "./Titulo";
import { Label } from "./Label";
import { Input } from "./Input";
import styles from './../styles/Login.module.scss'

export function Login() {
    
    // Hooks, estados
    const [ user, setUser ] = useState('');
    const [ password, setPassword ] = useState(''); 
    const [ passwordError, setPasswordError ] = useState(false); 
    const [ userError, setUserError ] = useState(false); 


    function handleChange(name, value){
        if(name === 'usuario'){
            if(value.length < 6){
                setUserError(true);
            }else{
                setUserError(false);
                setUser(value);
            }
            
        }else{
            if(value.length < 8){
                setPasswordError(true);
            }else{
                setPasswordError(false);
                setPassword(value);
            }
            
        }
    }

    function handleSubmit(){
        let account = { user, password}
        if(account){
            console.log("account: ", account);
        }
    }


    return(
        <div className={styles.container_login}>
        <div className={styles.container_card}>
        <Titulo text="¡Bienvenido!"></Titulo>
        { (passwordError || userError) &&
        <label className={styles.label_error}>
                Revise contraseña o usuario
            </label>
        }
            <Label text="Usuario"/>
            <Input 
            atributo={{
                id:"usuario",
                name:"usuario",
                placeholder:"Ingrese Usuario",
                type:"text"
            }}
            handleChange={handleChange} 
            parametro={userError}
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
            // parametro={ passwordError }
            />
            <div>
            <button onClick={handleSubmit} className={styles.btns}>Ingresar</button>
            </div>
            
        </div>
        </div>
        
            
    )
}
