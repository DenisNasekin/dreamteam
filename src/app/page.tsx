import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Привет друг. Ты на страницы по составлению своей команды мечты.</h1>
      <Link href={'/register'}>Для начала пройди регистрацию</Link>
    </div>
  );
}
