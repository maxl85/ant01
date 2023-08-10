import { FC, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Server from './pages/Server';
import { RootState } from './redux/store';
import { removeUser } from './utils/auth';
import { setAuth, setUsername } from './redux/auth/slice';

const App: FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  // console.log(isLoggedIn)

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth') as string);

    if (!auth || !auth.token) {
      removeUser();
    } else {
      dispatch(setAuth(true));
      // dispatch(setUsername(auth.username));
    }
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Navigate to='/dashboard' /> : <Navigate to='login' />} />
        <Route path='/registration' element={isLoggedIn ? <Navigate to='/dashboard' /> : <Registration />} />
        <Route path='/login' element={isLoggedIn ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to='/login' />} />
        <Route path='/server' element={isLoggedIn ? <Server /> : <Navigate to='/login' />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;

