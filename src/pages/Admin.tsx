import { useState } from 'react';
import { Container, Select, MenuItem, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Admin = () => {
    const [currentUser, setCurrentUser] = useState('admin'); // Set 'admin', 'manager', or 'user' here
    const [data, setData] = useState(userData);
    const [inventory, setInventory] = useState<any>(initialInventory);
    const [newUser, setNewUser] = useState({ name: '', location: locations[0] });
    const [newInventory, setNewInventory] = useState({ item: '', location: locations[0] });
  
    const handleAddUser = () => {
      setData([...data, newUser]);
      setNewUser({ name: '', location: locations[0] });
    };
  
    const handleAddInventory = () => {
      setInventory({
        ...inventory,
        [newInventory.location]: [...inventory[newInventory.location], newInventory.item]
      });
      setNewInventory({ item: '', location: locations[0] });
    };
  
    const handleChangeUser = (e:any) => {
      const { name, value } = e.target;
      setNewUser({ ...newUser, [name]: value });
    };
  
    const handleChangeInventory = (e:any) => {
      const { name, value } = e.target;
      setNewInventory({ ...newInventory, [name]: value });
    };
  
    const filteredData = currentUser === 'user' ? data.filter(user => user.location === newUser.location) : data;
    const filteredInventory = currentUser === 'user' ? inventory[newUser.location] : Object.values(inventory).flat();
  
    return (
      <Container>
        <Typography>User Management</Typography>
  
        <Select value={currentUser} onChange={(e) => setCurrentUser(e.target.value)}>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
  
        {currentUser === 'admin' && (
          <div>
            <Typography>Add User</Typography>
            <TextField name="name" label="Name" value={newUser.name} onChange={handleChangeUser} />
            <Select name="location" value={newUser.location} onChange={handleChangeUser}>
              {locations.map((location) => (
                <MenuItem key={location} value={location}>{location}</MenuItem>
              ))}
            </Select>
            <Button onClick={handleAddUser} variant="contained" color="primary">Add User</Button>
          </div>
        )}
  
        {currentUser === 'admin' && (
          <div>
            <Typography>Add Inventory</Typography>
            <TextField name="item" label="Item" value={newInventory.item} onChange={handleChangeInventory} />
            <Select name="location" value={newInventory.location} onChange={handleChangeInventory}>
              {locations.map((location) => (
                <MenuItem key={location} value={location}>{location}</MenuItem>
              ))}
            </Select>
            <Button onClick={handleAddInventory} variant="contained" color="primary">Add Inventory</Button>
          </div>
        )}
  
        <Typography>User Data</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        <Typography>Inventory</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInventory.map((item:any, index:any) => (
                <TableRow key={index}>
                  <TableCell>{item}</TableCell>
                  <TableCell>{newInventory.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  };

export default Admin;

export const userData = [
    { name: 'John Doe', location: 'New York' },
    { name: 'Jane Smith', location: 'Los Angeles' },
    { name: 'Mike Johnson', location: 'Chicago' },
    { name: 'Emily Davis', location: 'Houston' },
  ];
  
  export const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
  
  export const initialInventory = {
    'New York': [],
    'Los Angeles': [],
    'Chicago': [],
    'Houston': [],
  };
