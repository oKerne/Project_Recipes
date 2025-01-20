import './Home.css';
import { useState, useEffect } from 'react';
import SideMenu from '../Recipr/SideMenu'
import User from './User';
// import { Grid2 as Grid, Typography, Box } from '@mui/material';


function Home() {
  const [showAllRecipes, setShowAllRecipes] = useState(false)
  const [recipes, setRecipes] = useState<any[]>([])


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
    <div className="home">
      <User />
      <SideMenu userId={1} setShowAllRecipes={setShowAllRecipes} />
     
      <div className="content">
        <h2>מבחר מתכונים</h2>
        <p>באתר תמצאו מגוון רחב של מתכונים, לכל אירוע</p>
        <p>כנסו לקטגוריית "מתכונים" ותהנו משפע מתכונים</p>

       
      </div>
    </div>
  );
}

export default Home
