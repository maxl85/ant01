import { setAuth, setUsername } from '../redux/auth/slice';
import { store } from '../redux/store';
// import { setCosts } from '../context/index';

export const removeUser = () => {
    localStorage.removeItem('auth');
    store.dispatch(setAuth(false));
    store.dispatch(setUsername(''));
    // setCosts([]);
};
