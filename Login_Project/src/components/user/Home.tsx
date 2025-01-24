import './Home.css';
import React, { useState, useEffect } from 'react';
import SideMenu from '../Recipr/SideMenu'
import User from './User';
import { Outlet } from 'react-router';
// import { Grid2 as Grid, Typography, Box } from '@mui/material';


const Home: React.FC = () => {
  const [showAllRecipes, setShowAllRecipes] = useState(false)
  const [recipes, setRecipes] = useState<any[]>([])
  const backgroundImage = 'url(../../image/עוגת גבינה.jpg)'

  useEffect(() => {
    if (showAllRecipes) {
      const fetchRecipes = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/recipes')
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
    <div className="home"style={{ backgroundImage: backgroundImage }}>
      <User />
      <SideMenu userId={1} setShowAllRecipes={setShowAllRecipes} />
      <Outlet/>
     {/* <div className="content">
        <h2>מבחר מתכונים</h2>
        <p>באתר תמצאו מגוון רחב של מתכונים, לכל אירוע</p>
        <p>כנסו לקטגוריית "מתכונים" ותהנו משפע מתכונים</p>
      </div>  */}
    </div>
  )
}

export default Home
