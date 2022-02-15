import './User.scss';
import { useSelector } from 'react-redux';
import { CustomButton } from '../common/CustomButton';
import { useHistory } from 'react-router';
import { resources } from '../../resources';

export function User({user}) {
  const { account } = useSelector(state => state.authReducer);
  const history = useHistory();

  const goToUserEdit = async () => {
    history.push("/users/" + user.id);
  }

  return (
    <div className={`user ${(account.username == user.username)? "user__own": ""}`}>
      <span  className="icon icon-ava"/>
      <div className="user__info">
        <div className="user__username">
          {user.username}
        </div>
        <div className="user__full_name">
            {user.first_name} {user.last_name}
        </div>
        <div className="user__details">
          <div className="user__id">
            {resources.id}: {user.id}
          </div>
          <div className="container">
            {(account.is_superuser || account.username == user.username) && (
              <CustomButton text={resources.redact} onClick={goToUserEdit}/>
            )}

            { user.is_active ?
              <span className="user__is_active true">
              </span> :
              <>
                <div className="user__last_login">
                  {user.last_login}
                </div>
                <span className="user__is_active false">
                </span> 
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}