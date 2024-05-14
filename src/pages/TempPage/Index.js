import './welcome-page.css';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className='welcome-page-container'>
      <h1>Вітаємо на веб-довіднику: "Графічне та Геометричне моделювання"</h1>
      <div className='buttons-container'>
        <Link className='link-button' to="/login">Log in</Link>
        <Link className='link-button' to="/register">Register</Link>
      </div>
    </div>
  );
}