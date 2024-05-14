import './profile.css'
import { useEffect, useState } from "react";
import { apiUrl } from "../../services/apiUrl";
import { getCookie } from "../../services/getCookie";

export default function Profile() {
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

  useEffect(() => {
    getProfileUserData()
  }, [])

  return (
    <div>
      {Object.entries(userInfo).map(([key, value]) => 
      <div className="info-container">
        <p>{key}:</p>
        <p>{value}</p>
      </div>)}
    </div>
  )
} 