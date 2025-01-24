import { useState, useEffect, useReducer } from 'react';
import { BrowserRouter, Route,Routes } from 'react-router';
import userReducer, { initialState, UserContext } from './components/user/userReducer';
import Home from './components/user/Home';
import AddRecipe from './components/Recipr/AddRecipe';
import AllRecipes from './components/Recipr/AllRecipe';

const App: React.FC = () => {
  const [user, dispatchUser] = useReducer(userReducer, initialState);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('userId');
    if (loggedUser) {
      setUserId(Number(loggedUser));
    }
  }, [])

  return (
    <div>
      <UserContext.Provider value={{ state: user, dispatch: dispatchUser }}>
        <BrowserRouter>
          <Routes>
               <Route path="/" element={<Home/>} > 
              <Route path='/recipes' element={<AllRecipes />} /> 
              <Route path='/add' element={<AddRecipe />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App
