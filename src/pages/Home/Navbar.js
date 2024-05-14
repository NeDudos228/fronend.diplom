// Navbar.js
import './navbar.css';
import { apiUrl } from '../../services/apiUrl';
import { getCookie } from '../../services/getCookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavbarElement({ structure, handleSelect }) {
  return Object.entries(structure).map(([name, value]) => {
    let children;
    if (Array.isArray(value)) {
      children = value.map(e => (
        <p key={e.postId} className='button' onClick={() => handleSelect(e.postId)}>{e.name}</p>
      ));
    } else {
      children = <NavbarElement key={name} structure={value} handleSelect={handleSelect} />;
    }

    return (
      <Element key={name} name={name}>
        {children}
      </Element>
    );
  });
}

function Element({ name, children }) {
  return (
    <div className='element-container'>
      <p className='category-box'>{name}</p>
      <div className='element__children'>{children}</div>
    </div>
  );
}

export default function Navbar({ handleSelect }) {
  const [postsStructure, setPostsStructure] = useState(undefined);
  const navigate = useNavigate();

  function updatePosts(data) {
    const mergedData = {};

    data.forEach(item => {
      const { category, subcategory } = item;
      if (!mergedData[category]) {
        mergedData[category] = {};
      }
      if (!mergedData[category][subcategory]) {
        mergedData[category][subcategory] = [];
      }
      mergedData[category][subcategory].push(item);
    });

    setPostsStructure(mergedData);
  }

  const getAllPosts = async () => {
    const action = 'getAllPosts';
    const urlAPI = `${apiUrl}/index.php?action=${action}`;
    const token = getCookie('token');
    if (!token) navigate('/');

    return fetch(urlAPI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => updatePosts(data))
    .catch(error => {
      console.error('Помилка:', error);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <nav className='navbar-container'>
      {postsStructure && <NavbarElement structure={postsStructure} handleSelect={handleSelect} />}
    </nav>
  );
}
