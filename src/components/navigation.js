// Navigation.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li className='nav-list'>
          <a href="/auth/login" style={{ textDecoration: 'none', color: '#FDCC0D' }} title="Favourites">
            <FontAwesomeIcon icon={faHeart} fontSize={24} />
          </a>
        </li>
        <li className='nav-list'>
          <a href="/auth/register" style={{ textDecoration: 'none', color: '#f8f8f8' }} title="SignOut">
            <FontAwesomeIcon icon={faSignOutAlt} fontSize={24} />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
