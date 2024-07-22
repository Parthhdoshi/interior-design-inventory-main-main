import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleUserName = (e: any) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    setRefresh(!refresh)
  }

  useEffect(() => {
    if (userName == "admin" && password == "admin") {
      return navigate("/dashboard");
    }
    if (userName == "user" && password == "user") {
      return  navigate("/userDashboard");
    }
  }, [refresh]);

  return (
    <>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            padding: 2,
            borderRadius: "5px",
            backgroundColor: "#f0f0f0",
            boxShadow: 2,
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Login
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              sx={{
                marginBottom: 2,
              }}
              onChange={handleUserName}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              sx={{
                marginBottom: 2,
              }}
              onChange={handlePassword}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#115293",
                },
              }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default App;
