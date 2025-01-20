
// import { useEffect, useState } from "react";
// import { RecipeType } from "./recipeReducer";

// const AllRecipes = () => {
//   const [recipes, setRecipes] = useState<RecipeType[]>([]);
//   const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
 
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/recipes")
//         if (!response.ok) throw new Error("Failed to fetch recipes")
//         const data = await response.json()
//         setRecipes(data);
//       } catch (error) {
//         console.error("Error fetching recipes:", error)
//       } 
//     }
//     fetchRecipes()
//   }, [])

//   const handleRecipeClick = (recipe: RecipeType) => {
//     setSelectedRecipe(recipe)
//   }

//   return (
//     <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
//       {/* Left Side */}
//       <Box
//         sx={{
//           flex: 1,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: 3,
//           backgroundColor: "#f0f0f0",
//           overflowY: "auto",
//         }}
//       >
//         {selectedRecipe ? (
//           <Card
//             sx={{
//               maxWidth: 400,
//               width: "100%",
//               padding: 3,
//               borderRadius: 2,
//               boxShadow: 3,
//               backgroundColor: "#ffffff",
//               textAlign: "center",
//             }}
//           >
//               {/* <img
// //           src={image}
// //           style={styles.image}
// //           onError={() => console.error(`Failed to load image: ${image}`)}
// //         /> */}
//             <CardContent>
//               <Typography variant="h4" gutterBottom>
//                 {selectedRecipe.title}
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 {selectedRecipe.description || "No description available"}
//               </Typography>
//             </CardContent>
//           </Card>
//         ) : (
//           <Typography variant="h5" color="text.secondary">
//             אנא בחר מתכון להצגה
//           </Typography>
//         )}
//       </Box>

//       {/* Right Side */}
//       <Box
//         sx={{
//           flex: 1,
//           padding: 10,
//           backgroundColor: "#e8e8e8",
//           overflowY: "auto",
//         }}
//       >
//         { recipes.length > 0 ? (
//           <Grid container spacing={3}>
//             {recipes.map((recipe) => (
//               <Grid item xs={12} sm={6} md={4} key={recipe.id}>
//                 <Card
//                   sx={{
//                     height: "80%",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     boxShadow: 3,
//                     padding: 2,
//                     cursor: "pointer",
//                     "&:hover": {
//                       transform: "scale(1.05)",
//                       boxShadow: 6,
//                     },
//                     transition: "transform 0.2s, box-shadow 0.2s",
//                     textAlign: "right",
//                     direction: "rtl",
//                   }}
//                   onClick={() => handleRecipeClick(recipe)}
//                 >
//                   <CardContent>
//                     <Typography variant="h6" gutterBottom>
//                       {recipe.title}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {recipe.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography variant="h6" color="text.secondary">
//             לא נמצאו מתכונים
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   )
// }

// export default AllRecipes
import { Box, Card, CardContent, Grid, Typography, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { RecipeType } from "./recipeReducer";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recipes");
        if (!response.ok) throw new Error("Failed to fetch recipes");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipe: RecipeType) => {
    setSelectedRecipe(recipe);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left Side */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          backgroundColor: "#f0f0f0",
          overflowY: "auto",
        }}
      >
        {selectedRecipe ? (
          <Card
            sx={{
              maxWidth: 400,
              width: "100%",
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#ffffff",
              textAlign: "center",
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={selectedRecipe.image}
              alt={selectedRecipe.title}
              sx={{ marginBottom: 2 }}
              onError={(e) => {
                e.currentTarget.src = "images/default.jpg"; // תמונה ברירת מחדל במקרה של שגיאה
              }}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {selectedRecipe.title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                רכיבים:
              </Typography>
              {Object.entries(selectedRecipe.ingredients).map(([key, value]) => (
                <Box key={key} sx={{ textAlign: "left", marginBottom: 2 }}>
                  <Typography variant="subtitle1">{key}:</Typography>
                  <ul>
                    {value.map((ingredient, index) => (
                      <li key={index}>
                        <Typography variant="body2">{ingredient}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              ))}
              <Typography variant="h6" gutterBottom>
                הוראות הכנה:
              </Typography>
              {Object.entries(selectedRecipe.instructions).map(([key, steps]) => (
                <Box key={key} sx={{ textAlign: "left", marginBottom: 2 }}>
                  <Typography variant="subtitle1">{key}:</Typography>
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

      {/* Right Side */}
      <Box
        sx={{
          flex: 1,
          padding: 10,
          backgroundColor: "#e8e8e8",
          overflowY: "auto",
        }}
      >
        {recipes.length > 0 ? (
          <Grid container spacing={3}>
            {recipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: 3,
                    padding: 2,
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                    transition: "transform 0.2s, box-shadow 0.2s",
                    textAlign: "right",
                    direction: "rtl",
                  }}
                  onClick={() => handleRecipeClick(recipe)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={recipe.image}
                    alt={recipe.title}
                    onError={(e) => {
                      e.currentTarget.src = "images/default.jpg"; // תמונה ברירת מחדל במקרה של שגיאה
                    }}
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
        ) : (
          <Typography variant="h6" color="text.secondary">
            לא נמצאו מתכונים
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AllRecipes;
