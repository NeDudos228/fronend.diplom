import './login.css'
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../services/apiUrl";
import { useForm } from "react-hook-form"

export default function Login() {
  const {
    register,
    handleSubmit,
  } = useForm()
  const onSubmit = login

  const navigate = useNavigate();

  function login(formData) {
    console.log(formData.login);
    console.log(formData.password);

    return fetch(`${apiUrl}/auth.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 2,
        login: formData.login,
        password: formData.password,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        document.cookie = `token=${data.token}; expires=${new Date(Date.now() + 60*60*1000).toUTCString()}; path=/`;
        localStorage.setItem('name', data.name)
        localStorage.setItem('surname', data.surname)
        navigate('/home')
      }
      console.log(data);
  
      return data;
    })
    .catch(error => console.error('Помилка:', error.message));
  }

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
        <h1>Увійдіть</h1>
        <div className='inputs-container'>
          <div className='input-container'>
            <p>Логін: </p>
            <input placeholder='Введіть логін' {...register('login')} />
          </div>
          <div className='input-container'>
            <p>Пароль: </p>
            <input type='password' placeholder='Введіть пароль' {...register('password')} />
          </div>
        </div>
        <div className='bottom'>
          <button type='submit'>Увійти</button>
          <Link className='info-link' to="/register">Не маєте акаунта? Зареєструйтеся!</Link>
        </div>
      </form>
    </div>
  )
}