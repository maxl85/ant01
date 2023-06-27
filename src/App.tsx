import { FC, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Costs from './pages/Dashboard';
import { RootState } from './redux/store';
import { removeUser } from './utils/auth';
import { setAuth, setUsername } from './redux/auth/slice';

const App: FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth') as string);

    if (!auth || !auth.access_token) {
      removeUser();
    } else {
      dispatch(setAuth(true));
      dispatch(setUsername(auth.username));
    }
  }, [dispatch]);
  return (
    <>
      {/* <Routes>
        <Route path='/' element={isLoggedIn ? <Navigate to='/costs' /> : <Navigate to='login' />} />
        <Route path='/registration' element={isLoggedIn ? <Navigate to='/costs' /> : <Registration />} />
        <Route path='/login' element={isLoggedIn ? <Navigate to='/costs' /> : <Login />} />
        <Route path='/costs' element={isLoggedIn ? <Costs /> : <Navigate to='/login' />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes> */}
      
      <Costs />
    </>
  );
};

export default App;

