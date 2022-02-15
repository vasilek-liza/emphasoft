import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../../store/Auth/AuthSlice';
import { CustomButton } from '../common/CustomButton';
import { resetUsers } from '../../store/Users/UsersSlice';

export function Header() {
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.authReducer);

    const logOut = () => {
        dispatch(removeToken())
        dispatch(resetUsers())
    }

   return (
    <header className="header">
        <div className="header__wrapper">
            <a href="https://emphasoft.com/" className="header__logo">
                <img alt="logo" src="/img/logo.svg" />
            </a>
            { token 
                ? <CustomButton onClick={logOut} text={"выйти"} />
                : ""
            }
        </div>
    </header>  
   );
}