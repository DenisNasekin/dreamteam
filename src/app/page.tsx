import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Привет друг.</h1>
        <h3 className={styles.subtitle}>Создай свою команду.</h3>
        <Link href={'/register'}>Для начала пройди регистрацию</Link>
      </div>
    </div>
  );
}
