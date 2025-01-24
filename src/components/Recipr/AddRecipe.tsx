import { useContext, useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { UserContext } from "../user/userReducer";
import { RecipeContext } from "./recipeReducer";


const AddRecipe = () => {
  const { state: user } = useContext(UserContext)
  const { dispatch } = useContext(RecipeContext)
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  })

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddRecipe = async () => {
    setSuccess(null);
    if (!user || !user.id) {
      setError("עליך להיות מחובר על מנת להוסיף מתכון.")
      return;
    }

    const newRecipe = {
      ...formData,
      createdBy: user.id,
    }

    try {
      const response = await fetch("http://localhost:3000/api/recipes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newRecipe),
      })

      if (!response.ok) {
        throw new Error("לא ניתן להוסיף את המתכון")
      }

      const data = await response.json()
      setSuccess("המתכון נוסף בהצלחה!");
      dispatch({ type: "ADD_RECIPE", data })
      setFormData({ title: "", ingredients: "", instructions: "" })
      setError(null) 
    } catch (error) {
      console.error("שגיאה בהוספת מתכון:", error)
      setError("אירעה שגיאה בהוספת המתכון.")
    }
  }

  return (
    <Box 
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      padding: 4,
      maxWidth: 800,
      maxHeight: 600,
      margin: '0 auto',
      backgroundColor: '#f9f9f9',
      borderRadius: 3,
      boxShadow: '0px 4px 12px rgba(231, 210, 210, 0.1)',
    }}>
      {!user || !user.id ? (
        <Alert severity="error">
          עליך להיות מחובר על מנת להוסיף מתכון.
        </Alert>
      ) : (
        <>
          <TextField
            name="title"
            label="שם המתכון"
            fullWidth
            value={formData.title}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="ingredients"
            label="חומרים"
            fullWidth
            value={formData.ingredients}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="instructions"
            label="הוראות הכנה"
            fullWidth
            value={formData.instructions}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
           <Button variant="contained" color="primary" onClick={handleAddRecipe}>
          הוסף מתכון
        </Button>
        {success && (
          <Typography color="success" sx={{ marginTop: 2 }}>
            {success}
          </Typography>
        )}
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
        </>
      )}
    </Box>
  )
}

export default AddRecipe
