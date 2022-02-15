import './DeleteUser.scss';
import { CustomButton } from '../common/CustomButton';
import { useHistory } from 'react-router';
import { deleteUser } from '../../store/Users/UsersThunks';
import { useDispatch } from 'react-redux';
import { resources } from '../../resources';

export function DeleteUser({id, setOpen}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const onDelete = async () => {
        try {
          await dispatch(deleteUser(id));
          history.push('/users');
        } catch {}
    }
    
    const onCancel =  () => {
        setOpen(false);
    }

   return (
      <div className="delete__user">
          <div className="delete__wrapper">
              <div className="delete__title">{resources.confirm}</div>
              <div className="delete__container container">
                <CustomButton text={resources.accept}  type="submit" onClick={onDelete} />
                <CustomButton text={resources.cancel}  onClick={onCancel} />
              </div>
          </div>
      </div> 
   );
}