'use client'

import { useForm } from 'react-hook-form';
import styles from './RegisterForm.module.scss';

export type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();

  const validateForm= () => {
    
    const username = watch('name');
    const email = watch('email');
    const password = watch('password');

    if (!username) {
      errors.name = { type:'required', message: 'Это поле обязательно' };
    }

    if (!email) {
      errors.email = { type:'required', message: 'Это поле обязательно' };
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = {type:'pattern', message:'Некорректный email'};
    }

    if (!password) {
      errors.password = { type:'required', message: 'Это поле обязательно' };
    } else if (password.length < 6) {
      errors.password = {type:'minLength', message:'Пароль должен быть минимум 6 символов'};
    }
  };

  watch(() => validateForm());

  const onSubmit = (data: FormData) => {
    sessionStorage.setItem('user', JSON.stringify(data));
    window.location.href = '/profile';
    console.log(data);
  };
  
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Заполни свои данные, чтобы пойти дальше</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder='Имя' {...register('name')} />
          {errors.name?.message && <span className={styles.error}>{errors.name.message}</span>}
       
          <input type="email" placeholder='Почта' {...register('email')}/>
          {errors.email?.message && <span className={styles.error}>{errors.email.message}</span>}
        
          <input type="password" placeholder='Секретный пароль' {...register('password')}/>
          {errors.password?.message && <span className={styles.error}>{errors.password.message}</span>}
        
        <button className={styles.button} type="submit">Регистрируйся</button>
      </form>
    </div>
  );
}