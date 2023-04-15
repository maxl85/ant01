import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Costs from './pages/Costs';
import { RootState } from './redux/store';
import { getAuthDataFromLS, removeUser } from './utils/auth';
import { setAuth, setUsername } from './redux/auth/slice';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  
  

  React.useEffect(() => {
    const auth = getAuthDataFromLS();

    if (!auth || !auth.access_token) {
      removeUser();
    } else {
      dispatch(setAuth(true));
      dispatch(setUsername(auth.username));
    }
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Navigate to='/costs' /> : <Navigate to='login' />} />
        <Route path='/registration' element={isLoggedIn ? <Navigate to='/costs' /> : <Registration />} />
        <Route path='/login' element={isLoggedIn ? <Navigate to='/costs' /> : <Login />} />
        <Route path='/costs' element={isLoggedIn ? <Costs /> : <Navigate to='/login' />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;

