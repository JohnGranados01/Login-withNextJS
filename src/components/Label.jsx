import styles from './../styles/Label.module.scss'

export function Label(props){
    return(
        <div className={styles.text_style}>{props.text}</div>
    )
}
