// import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import { UserContext } from './context/userContext';
import Home from './pages/Home';
import Messages from './pages/Messages';
import MessageSearch from './pages/MessageSearch';
import Profile from './pages/Profile';
import Users from './pages/Users';
import UserSearch from './pages/UserSearch';



function App() {

  // const { isLoggedIn } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Messages />} />
          <Route path="messages/search" element={<MessageSearch />} />
          <Route path="users" element={<Users />} />
          <Route path="users/search" element={<UserSearch />} />
          <Route path="users/:userId" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
