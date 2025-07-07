import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"

type RecipeType = {
  id: number;
  title: string;
  image: string;
  servings?: number;
  ingredients?: { [key: string]: string[] };
  instructions?: { [key: string]: string[] };
}

const AllRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null)
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/recipes`)
        if (!response.ok) throw new Error("Failed to fetch recipes")
        const data = await response.json()
        setRecipes(data)
      } catch (error) {
        console.error("Error fetching recipes:", error)
      }
    }

    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipe: RecipeType) => {
    setSelectedRecipe(recipe);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Box
        sx={{
          flex: 1,
          padding: 10,
          backgroundColor: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
          paddingTop: 20,
          direction: "rtl",

        }}
      >
        {selectedRecipe ? (
          <Card sx={{ width: "100%", padding: 3 }}>
            <CardMedia
              component="img"
              image={selectedRecipe.image}
              alt={selectedRecipe.title}
              sx={{
                marginTop:"100px",
                //  maxWidth: "80%",
                //  height: "auto",
              
                 }}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {selectedRecipe.title}
              </Typography>
              {selectedRecipe.servings && (
                <Typography variant="subtitle1" gutterBottom>
                  מנות: {selectedRecipe.servings}
                </Typography>
              )}
              {selectedRecipe.ingredients && Object.entries(selectedRecipe.ingredients).map(([section, items]) => (
                <Box key={section} sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle1">{section}</Typography>
                  <ul>
                    {items.map((item, index) => (
                      <li key={index}>
                        <Typography variant="body2">{item}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              ))}
              <Typography variant="h6">הוראות הכנה:</Typography>
              {selectedRecipe.instructions && Object.entries(selectedRecipe.instructions).map(([section, steps]) => (
                <Box key={section} sx={{ marginBottom: 2 }}>
                  <Typography variant="subtitle1">{section}</Typography>
                  <ol>
                    {steps.map((step, index) => (
                      <li key={index}>
                        <Typography variant="body2">{step}</Typography>
                      </li>
                    ))}
                  </ol>
                </Box>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Typography variant="h5" color="text.secondary">
            אנא בחר מתכון להצגה
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          flex: 1,
          padding: 15,
          backgroundColor: "#e8e8e8",
          overflowY: "auto",
        }}
      >
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onClick={() => handleRecipeClick(recipe)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.image}
                  alt={recipe.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {recipe.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default AllRecipes



