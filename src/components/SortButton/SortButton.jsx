import './SortButton.scss';
import { useDispatch, useSelector } from 'react-redux';
import { sorting } from '../../store/Users/UsersSlice';
import { CustomButton } from '../common/CustomButton';
import { resources } from '../../resources';

export function SortButton() {
    const dispatch = useDispatch();
    const { sortUp } = useSelector(state => state.usersReducer);

    const sort = () => {
        dispatch(sorting())
    }

    return (
        <div className="sort-button">
            <CustomButton className={`${sortUp ? "up": "down"}`} onClick={sort}> 
                <span className="sort-text"> {resources.sorting} </span>
                <span className="sort-icon"></span>
            </CustomButton>
        </div>
    )
}