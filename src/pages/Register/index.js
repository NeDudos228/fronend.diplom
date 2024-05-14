import './register.css'
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../services/apiUrl";
import { useForm } from "react-hook-form"
import { useState } from "react";

export default function Register() {
  const [ userInfo, setUserInfo ] = useState({
    login: "дані відсутні",
    name: "дані відсутні",
    surname: "дані відсутні",
    email: "дані відсутні",
    mobilephone: "дані відсутні",
  })

  const {
    register,
    handleSubmit,
  } = useForm()
  const onSubmit = regisation
  const navigate = useNavigate();

  function regisation(formData) {
    return fetch(`${apiUrl}/auth.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 1,
        name: formData.name,
        surname: formData.surname,
        login: formData.login,
        password: formData.password,
        // codeCountry: '380',
        phone: formData.mobilephone,
        email: formData.email,
      }),
    })
    .then(response => response.json())
    .then(data =>{
      if(data.success) {
        document.cookie = `token=${data.token}; expires=${new Date(Date.now() + 60*60*1000).toUTCString()}; path=/`;
        navigate('/home')
      }
      console.log(data);
  
      return data;
    })
    .catch(error => console.error('Помилка:', error.message));
  }

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input {...register("name")} />
    //   <input {...register("surname")} />
    //   <input {...register("login")} />
    //   <input {...register("password")} />
    //   <input {...register("mobilephone")} />
    //   <input {...register("email")} />
    //   <input type="submit" />
    // </form>
    <div className='register-container'>
      <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
        <h1>Увійдіть</h1>
        <div className='inputs-container'>
          <div className='inputs-block'>
            <div className='input-container'>
              <p>Ім'я: </p>
              <input pattern='^([a-zA-Z]+|[а-яА-ЯёЁ]+)$' placeholder="Введіть ім'я" {...register('name')} />
            </div>
            <div className='input-container'>
              <p>Прізвище: </p>
              <input pattern='^([a-zA-Z]+|[а-яА-ЯёЁ]+)$' placeholder='Введіть прізвище' {...register('surname')} />
            </div>
          </div>
          <div className='inputs-block'>
            <div className='input-container'>
              <p>Логін: </p>
              <input placeholder="Введіть логін" {...register('login')} />
            </div>
            <div className='input-container'>
              <p>Пароль </p>
              <input type='password' pattern='^.{7,}$' placeholder="Пароль з 6+ символів" {...register('password')} />
            </div>
          </div>
          <div className='inputs-block'>
            <div className='input-container'>
              <p>Телефон: </p>
              <input pattern='^\+?380\d{9}$|^380\d{9}$|^0\d{9}$' placeholder="+380xxxxxxxxx" {...register('mobilephone')} />
            </div>
            <div className='input-container'>
              <p>Пошта: </p>
              <input pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' placeholder="Введіть пошту" {...register('email')} />
            </div>
          </div>
        </div>
        <div className='bottom'>
          <button type='submit'>Зареєструватися</button>
          <Link className='info-link' to="/login">Вже маєте акаунт? Увійти</Link>
        </div>
      </form>
    </div>
  )
}