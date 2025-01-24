import { useState, useEffect, useReducer } from 'react';
import SideMenu from './components/Recipr/SideMenu'
import Home from './components/user/Home';
import { BrowserRouter, Route,Routes } from 'react-router';
import userReducer, { initialState, UserContext } from './components/user/userReducer';
import C from './components/c';
import AddRecipe from './components/Recipr/AddRecipe';
import AllRecipes from './components/Recipr/AllRecipe';




const App: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('userId');
    if (loggedUser) {
      setUserId(Number(loggedUser));
    }
  }, [])

  const [user, dispatchUser] = useReducer(userReducer, initialState);
  return (
    <div>
      <UserContext.Provider value={{ state: user, dispatch: dispatchUser }}>
        <BrowserRouter>
          <Routes> 
           <Route path="/" element={<Home />} >
           {/* <Route path='/' element={<C/>}>  */}
            {/* <Route path='/' element={<SideMenu />} />  */}
          
              <Route path='/recipes' element={<AllRecipes />} />
              <Route path='/add' element={<AddRecipe/>} />
           </Route> 
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  )
}

export default App
