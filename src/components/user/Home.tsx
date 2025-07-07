
import React, { useState, useEffect } from 'react';
import SideMenu from '../Recipr/SideMenu'
import User from './User';
import { Outlet, useLocation } from 'react-router';
import HomeStyle from './homeStyle';

const Home: React.FC = () => {
  const [showAllRecipes, setShowAllRecipes] = useState(false)
  const [recipes, setRecipes] = useState<any[]>([])
  const location = useLocation();

  const baseUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (showAllRecipes) {
      const fetchRecipes = async () => {
        try {

          const response = await fetch(`${baseUrl}/api/recipes`)
          if (!response.ok) throw new Error('Failed to fetch recipes')
          const data = await response.json()
          setRecipes(data)
        } catch (error) {
          console.error('Error fetching recipes:', error)
        }
      };

      fetchRecipes()
    }
  }, [showAllRecipes])

  return (
    <>
      <User />
      <SideMenu   />
      <Outlet/>
      {location.pathname === '/' && (
       <HomeStyle/>
      )}
   
    </> 
  )
}

export default Home
