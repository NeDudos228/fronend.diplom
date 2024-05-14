import './profileinfo.css'
import { useEffect, useState } from "react";
import { apiUrl } from "../../services/apiUrl";
import { getCookie } from "../../services/getCookie";
import { useNavigate } from 'react-router-dom';

export default function ProfileInfo() {
  const [ isOpen, setIsOpen ] = useState(false);
  const navigate = useNavigate();

  const [ userInfo, setUserInfo ] = useState({
    login: "дані відсутні",
    name: "дані відсутні",
    surname: "дані відсутні",
    email: "дані відсутні",
    mobilephone: "дані відсутні",
  })

  function getProfileUserData() {
    const action = "getProfileUserData";
    const urlAPI = `${apiUrl}/index.php?action=${action}`;
    const token = getCookie('token');
  
    return fetch(urlAPI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': `Bearer ${token}`
      },
    })
    .then(response => response.json())
    .then(data => setUserInfo({
      login: data.login,
      name: data.name,
      surname: data.surname,
      email: data.email,
      mobilephone: data.mobilephone,
    }))
    .catch(error => {
      console.error('Помилка:', error);
    });
  }

  function quitAccount() {
    const cookies = document.cookie.split(";");
  
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    navigate('/login')
  }

  useEffect(() => {
    getProfileUserData()
  }, [])

  return (
    <div>
      <img style={{cursor: 'pointer'}} onClick={() => setIsOpen(true)} width={50}src='user.png'/>
      <div className={`profileinfo-container ${!isOpen && 'closed'}`}>
        <div className='profileinfo'>
          <h1>Профіль</h1>
          <div>
            {Object.entries(userInfo).map(([key, value]) => 
            <div className="info-container">
              <p>{key}:</p>
              <p>{value}</p>
            </div>)}
          </div>
        </div>
        <div className='button-container'>
          <button className='close-button' onClick={() => setIsOpen(false)}>Закрити</button>
          <button className='exit-button' onClick={quitAccount}>Вийти з акаунта</button>
        </div>
      </div>
    </div>
  )
} 