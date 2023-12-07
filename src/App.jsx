import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Container maxWidth="xl">
        <AppBar position='static'>
          <Toolbar>
            <Typography variant="h6">Welcome to Bodybuilders App</Typography>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" anchor="left">
          <List>
            <ListItem button component={Link} to="/customers">
              <ListItemText primary="Customers" />
            </ListItem>
            <ListItem button component={Link} to="/trainings">
              <ListItemText primary="Training" />
            </ListItem>
          </List>
        </Drawer>

        <main style={{ padding: '10px' }}>
          <Outlet />
        </main>
      </Container>
    </>
  );
}

export default App;
