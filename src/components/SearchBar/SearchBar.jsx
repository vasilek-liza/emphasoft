import './SearchBar.scss';
import { useDispatch } from 'react-redux';
import { searchUsers } from '../../store/Users/UsersSlice';
import { useState } from 'react';

export function SearchBar() {
    const dispatch = useDispatch();
    const [debounce] = useState({ time: null })

    const dataSearch = e => {
        clearTimeout(debounce.time);
        debounce.time = setTimeout(() => {
            const value = e.target.value.toLowerCase();
            dispatch(searchUsers(value));
        }, 0);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-bar__input"
                placeholder="Search people by username..."
                onChange={dataSearch}
            />
        </div>
      );
}