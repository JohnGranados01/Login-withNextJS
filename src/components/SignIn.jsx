import { useState, useEffect } from "react";
import { Titulo } from "./Titulo";
import { Label } from "./Label";
import { Input } from "./Input";
import styles from './../styles/Login.module.scss'
import stylesLabel from './../styles/Label.module.scss'
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export function SignIn() {
    // const [ password, setPassword ] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    // const [ userError, setUserError ] = useState(false); 
    const [user, setUser] = useState({
        userName: "",
        password: "",
        passwordVerificar: "",
        conditions: false
    });

    useEffect((e) => {
        console.log(user)
        if (user.password == user.passwordVerificar && user.password) {

            console.log("cumple con las condiciones!")
        }
        else {
            console.log("No cumple con las condiciones!")
        }
    }, [user])

    function handleChange(tagName, value) {
        if (tagName == 'password' || tagName == 'passwordVerificar') {
            const expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{10,15}[^'\s]/
            if (expresion.test(value)) {
                const updateUser = {
                    ...user,
                    // password:value es lo mismo
                    [tagName]: value
                }
                setUser(updateUser)
                if (updateUser.password == updateUser.passwordVerificar) {
                    // console.log(updateUser, "Liena 41")
                    // console.log("cumple con las condiciones!, LiNEA 39")
                    setUser({
                        ...updateUser,
                        conditions: true
                    })
                }
            } else {
                toast.error("Las contraseñas no coinciden!");
                setUser({
                    ...user,
                    conditions: false
                })
            }

        }
    }


    function handleSubmit() {
        let account = { user, password }
        if (account) {
            console.log("account: ", account);
        }
    }

    return (
        <div className={styles.container_login}>
        <ToastContainer />
            <div className={styles.container_card}>
            
                <Titulo text="¡Registrese!"></Titulo>
                {/* { (passwordError || userError) &&
        <label className={styles.label_error}>
                Revise contraseña o usuario
            </label>
        } */}
                <Label text="Ingrese Usuario" />
                <Input
                    atributo={{
                        id: "usuarioNew",
                        name: "usuarioNew",
                        placeholder: "Ingrese nombre Usuario",
                        type: "text"
                    }}
                    handleChange={handleChange}
                // parametro={userError}
                />
                <Label text="Ingrese Contraseña" />
                <Input
                    atributo={{
                        id: "password",
                        name: "password",
                        placeholder: "Ingrese Contaseña",
                        type: "password"
                    }}

                    handleChange={handleChange}

                >{!user.conditions && (<span className={styles.label_error}>Las contraseñas son incorrectas</span>)}
                </Input>

                <Label text="Confirme Contraseña" />
                <Input
                    atributo={{
                        id: "passwordVerificar",
                        name: "passwordVerificar",
                        placeholder: "Confirme Contaseña",
                        type: "password"
                    }}
                    handleChange={handleChange}
                >{!user.conditions && (<span className={styles.label_error}>Las contraseñas son incorrectas</span>)}</Input>
                <div>
                    <button onClick={handleSubmit} className={styles.btns}>Registrar</button>
                    <br></br>
                    <span className={stylesLabel.text_style}>Si ya tienes cuenta ingresa <Link href="/">aqui!</Link></span>
                </div>

            </div>
        </div>
    )
}