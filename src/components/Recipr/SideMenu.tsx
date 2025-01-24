import { useState } from "react";
import { Button, Drawer, Box } from "@mui/material"
import { Link } from "react-router"

const SideMenu: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Button
          variant="contained"
          onClick={toggleDrawer}
          sx={{ position: "absolute", top: 20, right: 20 }}
        >
          תפריט
        </Button>
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={toggleDrawer}
          sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
            },
          }}
        >
          <Box sx={{ padding: 2 }}>
            <>
              <nav>
                <Link
                  to='/recipes'
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      color: "rgda",
                      fontFamily: "sans-serif",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      transition: "color 0.3s ease",
                      '&:hover': {
                        backgroundColor: "rgba(173, 117, 126, 0.2)"
                      }
                    }}
                  >
                    הצג את כל המתכונים
                  </Box>
                </Link>
              </nav>
            </>
            <nav>
              <Link
                to='/add'
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    color: "blue",
                    fontFamily: "sans-serif",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    transition: "color 0.3s ease",
                    '&:hover': {
                      backgroundColor: "rgba(86, 86, 139, 0.1)"
                    }
                  }}
                >
                  הוסף מתכון
                </Box>
              </Link>
            </nav>
          </Box>
        </Drawer>
      </Box></>
  )
}

export default SideMenu
