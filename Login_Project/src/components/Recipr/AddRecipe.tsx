import { useContext, useState } from "react";
// import { RecipeContext } from "./recipeReducer";
import { UserContext } from "../user/userReducer";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { RecipeContext } from "./recipeReducer";


const AddRecipe = () => {
  const { state: user } = useContext(UserContext);
  const { dispatch } = useContext(RecipeContext);
  
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleAddRecipe = async () => {
    const newRecipe = {
      title,
      ingredients,
      instructions,
      createdBy: user.id,
    };
  
    try {
      const response = await fetch("http://localhost:3000/api/recipes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`, 
        },
        body: JSON.stringify(newRecipe),
      });
  
      if (!response.ok) {
        throw new Error("לא ניתן להוסיף את המתכון");
      }
  
      const data = await response.json();
      dispatch({ type: "ADD_RECIPE", data });
      setTitle("");
      setIngredients("");
      setInstructions("");
    } catch (error) {
      console.error("שגיאה בהוספת מתכון:", error);
    }
  }
  // console.log(user);
  if (!user.email) {
    alert('עליך להיות מחובר על מנת להוסיף מתכון')
    return null;
  }
  return (
    <Box sx={{ margin: 2 }}>
      <TextField
        label="שם המתכון"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="חומרים"
        fullWidth
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="הוראות הכנה"
        fullWidth
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddRecipe}>
        הוסף מתכון
      </Button>
    </Box>
  )
}

export default AddRecipe;

// import { useContext, useState } from "react";
// import { RecipeContext } from "./recipeReducer";
// import { UserContext } from "../user/userReducer";
// import { Box, TextField, Button, Typography, Alert } from "@mui/material";

// const AddRecipe = () => {
//   const { state: user } = useContext(UserContext);
//   const recipeContext = useContext(RecipeContext);

//   if (!recipeContext) {
//     throw new Error("RecipeContext must be used within a RecipeProvider");
//   }

//   const { dispatch } = recipeContext;

//   const [title, setTitle] = useState("");
//   const [ingredients, setIngredients] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   const handleAddRecipe = async () => {
//     const newRecipe = {
//       title,
//       ingredients,
//       instructions,
//       createdBy: user.id,
//     };

//     try {
//       const response = await fetch("http://localhost:3000/api/recipes/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${user.token}`,
//         },
//         body: JSON.stringify(newRecipe),
//       });

//       if (!response.ok) {
//         throw new Error("לא ניתן להוסיף את המתכון");
//       }

//       const data = await response.json();
//       dispatch({ type: "ADD_RECIPE", data });
//       setTitle("");
//       setIngredients("");
//       setInstructions("");
//       setError(null);
//     } catch (error) {
//       if (error instanceof Error) {
//         setError("Error adding recipe: " + error.message);
//       } else {
//         setError("Error adding recipe");
//       }
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h4">הוסף מתכון חדש</Typography>
//       {error && <Alert severity="error">{error}</Alert>}
//       <TextField
//         label="כותרת"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="רכיבים"
//         value={ingredients}
//         onChange={(e) => setIngredients(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="הוראות הכנה"
//         value={instructions}
//         onChange={(e) => setInstructions(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//       <Button variant="contained" color="primary" onClick={handleAddRecipe}>
//         הוסף מתכון
//       </Button>
//     </Box>
//   );
// };

// export default AddRecipe;