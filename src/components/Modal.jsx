import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Input } from './Input';
import { Label } from './Label';
import { useState } from 'react';
import styles from './../styles/Login.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export function ModalCustom({setFirstTime, firstTime}) {

    const [user, setUser] = useState({
        password: "",
        passwordVerificar: "",
        conditions: false
    });

    const [changePassword, setChangePassword] = useState(firstTime)
    const [email, setEmail] = useState('')
    useEffect(()=> {
      setEmail(localStorage.getItem('email'))
      localStorage.setItem('first_time', false)
    }, [changePassword])
    function handleChange(tagName, value) {
        if (tagName == 'password' || tagName == 'passwordVerificar') {
            const expresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
            if (expresion.test(value)) {
                const updateUser = {
                    ...user,
                    // password:value es lo mismo
                    [tagName]: value
                }
                setUser(updateUser)
                if (updateUser.password == updateUser.passwordVerificar) {
                    console.log(updateUser, "Liena 41")
                    console.log("cumple con las condiciones!, LiNEA 39")
                    setUser({
                        ...updateUser,
                        conditions: true
                    })
                }
            } else {
                setUser({
                    ...user,
                    conditions: false
                })
            }

        }
    }

    function handleSubmit() {
        if (user.password == user.passwordVerificar && user.conditions) {
            const request = async () => {
                try {
                    const response = await fetch('http://localhost:3000/users/changePassword', {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify({
                            email: email,
                            password: user.password,
                            password_confirm: user.passwordVerificar
                        })
                    })
                    const content = await response.json();
                    toast("Contraseña modificada con exito!");
                    setChangePassword('Cambio')
                    setFirstTime(false)
                    setIsOpen(false)
                } catch (error) {
                    toast.error('No se pudo modificar la contraseña')
                }
            }
            request()
        }
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(true);


    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Debe actualizar su contraseña</h2>
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
                <p>Las contraseñas deben tener mínimo 10 caracteres entre mayúsculas y minúsculas <br></br> y contener un caracter especial como #$%!¡¿?</p>
                <br />
                <button onClick={handleSubmit} className={styles.btns}> Guardar </button>
            </Modal>
            <ToastContainer />
        </div>
    );
}