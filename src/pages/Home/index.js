import './home.scss' 
import Navbar from './Navbar';
import { getCookie } from '../../services/getCookie';
import { apiUrl } from '../../services/apiUrl';
import { useEffect, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import Markdown from 'react-markdown';

export default function Home() {
  const name = `${localStorage.getItem('name')} ${localStorage.getItem('surname')}`
  const [ content, setContent ] = useState('Стаття не вибрана');

  function getPosts(postId) {
    const action = "getPosts";
    const urlAPI = `${apiUrl}/index.php?action=${action}&postId=${postId}`;
    const token = getCookie('token');
    console.log(token);

    return fetch(urlAPI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => setContent(data.content))
    .catch(error => {
      console.error('Помилка:', error);
    });
  
  }

  return (
    <div className='home-container'>
      <header className='header'>
        <div className='logo-container'>
          <img width={40} height={40} src='logo.png'/>
          <h2>Веб-довідник: "Графічне та Геометричне моделювання"</h2>
        </div>
        <div className='right'>
          <p>{name}</p>
          <ProfileInfo />
        </div>
      </header>
      <div className='content-container'>
        <Navbar handleSelect={getPosts}/>
        <Markdown className='content'>{content}</Markdown>
      </div>
    </div>
  )
}

