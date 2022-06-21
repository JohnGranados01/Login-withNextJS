import styles from './../styles/Title.module.scss'

export function Titulo(props){
    return(
        <div className={styles.titleContainer}>

        <label> {props.text} </label>
        </div>
    )
}