import { User } from '../User/User';
import './Users.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../store/Users/UsersThunks';
import { useEffect} from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SortButton } from '../SortButton/SortButton';
import { resources } from '../../resources';
import { sorting } from '../../store/Users/UsersSlice';
import { Preloader } from '../Preloader/Preloader';
import { useHistory } from 'react-router';
import { CustomButton } from '../common/CustomButton';
import { NotFound } from '../SearchBar/NotFound';

export function  Users() {
  const dispatch = useDispatch();
  const { modifidedUsers, loading } = useSelector(state => state.usersReducer);
  const { username } = useSelector(state => state.authReducer);
  const history = useHistory();

  const goToRegistration = () => {
    history.push("/registration");
  }

  useEffect(async () =>  {
    try {
      await dispatch(getUsers());
      dispatch(sorting());
    } catch {

    }
  }, []);

  return (
    <div className="users__wrapper wrapper">
      <div className="users__header container">
        <CustomButton text={'Создать пользователя'} onClick={goToRegistration} />
        <div className="users__login">
          <p className="users__login-text">{resources.username}: </p>
          <p className="users__login-content">{username}</p>
        </div>
      </div>
      <div className="users__content">
          <div className="users__content-title">{resources.users}</div>
          <div className="users__content-fields container">
            <SearchBar />
            <SortButton />
          </div>
          <div className="users__content-main">
            { loading && <Preloader /> }
            {modifidedUsers.map((user, index) => (
              <User key={index} user={user} />
            ))}
          { !loading && !modifidedUsers.length && <NotFound text={resources.searchUsers}/> }
          </div>
      </div>
    </div>
  );
}