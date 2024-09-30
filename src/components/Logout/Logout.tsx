import styles from './Logout.module.scss'
export default function Logout () {
    const handleLogout = () => {
        sessionStorage.removeItem('user');
        window.location.href = '/'
    }

    return (
        <button className={styles.button} onClick={handleLogout}>Выйти</button>
    );
}