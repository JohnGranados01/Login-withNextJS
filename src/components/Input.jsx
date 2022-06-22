import styles from './../styles/Input.module.scss'

// export function Input({atributo, handleChange, parametro}){

export function Input({atributo, handleChange, children}){
// console.log(children)
    return(
        <div>
        <input
        className={styles.style_input}
        id={atributo.id}
        name={atributo.name}
        placeholder={atributo.placeholder}
        type={atributo.type}
        onChange = {(e) => handleChange(e.target.name, e.target.value)}
        />
        {children}
        </div>
    )
}
