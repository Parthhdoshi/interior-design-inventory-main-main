import { useState } from "react";
import {
  Container,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const Admin = () => {
  const [currentUser, setCurrentUser] = useState("admin"); // Set 'admin', 'manager', or 'user' here
  // const [data, setData] = useState<any>(userData);
  const [inventory, setInventory] = useState<any>(initialInventory);
  // const [newUser, _] = useState({ name: '', location: locations[0] });
  const [newInventory, setNewInventory] = useState({
    item: "",
    location: locations[0],
  });
  const [newData, setNewData] = useState<any>([]);

  // const handleAddUser = () => {
  //   setData([...data, newUser]);
  //   setNewUser({ name: '', location: locations[0] });
  // };

  let tempData: any = [];
  const handleAddInventory = () => {
    setInventory({
      ...inventory,
      [newInventory.location]: [
        ...inventory[newInventory.location],
        newInventory.item,
      ],
    });
    setNewInventory({ item: "", location: newInventory.location });
    tempData.push(...newData, {
      item: newInventory.item,
      location: newInventory.location,
    });
    setNewData(tempData);
  };

  // const handleChangeUser = (e:any) => {
  //   const { name, value } = e.target;
  //   setNewUser({ ...newUser, [name]: value });
  // };

  const handleChangeInventory = (e: any) => {
    const { name, value } = e.target;
    setNewInventory({ ...newInventory, [name]: value });
  };

  const createAndDownloadExcel = async (data:any) => {
    // Create a new workbook and a worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add some basic formatting or data if needed
    worksheet.columns = [
      // { header: "ID", key: "id", width: 10 },
      { header: "Item", key: "item", width: 30 },
      { header: "Location", key: "location", width: 30 },
    ];

    let tempData;
    if( currentUser === "user" ){
      tempData = data.map((item:any)=>{
        return { item:item , location : "Mumbai"}
      })
    }

    if( currentUser === "user2" ){
      tempData = data.map((item:any)=>{
        return { item:item , location : "Delhi"}
      })
    }

    if(currentUser !== "admin") data = tempData

    // const data = [
    //   { id: 1, name: "John Doe", email: "john@example.com" },
    //   { id: 2, name: "Jane Smith", email: "jane@example.com" },
    //   { id: 3, name: "Alice Johnson", email: "alice@example.com" },
    // ];

    data.forEach((item:any) => {
      worksheet.addRow(item);
    });

    // Create a buffer and save it
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "inventory.xlsx");
  };

  // const filteredData = currentUser === 'user' ? data.filter( (user:any) => user.location === newUser.location) : data;
  const filteredInventory =
    currentUser === "user"
      ? inventory["Mumbai"]
      : Object.values(inventory).flat();
  const filteredInventoryforDelhi =
    currentUser === "user2"
      ? inventory["Delhi"]
      : Object.values(inventory).flat();

  return (
    <Container>
      <Typography variant="h4">User Management</Typography>

      <Select
        value={currentUser}
        size="small"
        sx={{ mb: 2 }}
        onChange={(e) => setCurrentUser(e.target.value)}
      >
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="user">User ( Mumbai )</MenuItem>
        <MenuItem value="user2">User ( Delhi )</MenuItem>
      </Select>

      {/* {currentUser === 'admin' && (
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
        )} */}

      {currentUser === "admin" && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5">Add Inventory</Typography>
          <TextField
            name="item"
            label="Item"
            size="small"
            sx={{ mr: 2, mb: 2 }}
            value={newInventory.item}
            onChange={handleChangeInventory}
          />
          <Select
            name="location"
            size="small"
            value={newInventory.location}
            sx={{ mr: 2, mb: 2, maxWidth: 300 }}
            onChange={handleChangeInventory}
          >
            {locations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
          <Button
            onClick={handleAddInventory}
            variant="contained"
            color="primary"
          >
            Add Inventory
          </Button>
        </Box>
      )}

      {/* <Typography>User Data</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((user:any, index:any) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
   */}
      <Typography variant="h5">Inventory</Typography>
      {currentUser === "user" && (
        <><TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInventory?.map((item: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{item}</TableCell>
                  <TableCell>Mumbai</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer><Button
          variant="contained"
          color="primary"
          sx={{ mt:2 }}
          onClick={() => createAndDownloadExcel(filteredInventory)}
        >
            Download Excel
          </Button></>
      )}

      {currentUser === "user2" && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInventoryforDelhi?.map((item: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{item}</TableCell>
                    <TableCell>Delhi</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt:2 }}
            onClick={() => createAndDownloadExcel(filteredInventoryforDelhi)}
          >
            Download Excel
          </Button>
        </>
      )}

      {currentUser === "admin" && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newData?.map((item: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{item.item}</TableCell>
                    <TableCell>{item.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt:2 }}
            onClick={() => createAndDownloadExcel(newData)}
          >
            Download Excel
          </Button>
        </>
      )}
    </Container>
  );
};

export default Admin;

export const userData = [
  { name: "John Doe", location: "Mumbai" },
  { name: "Jane Smith", location: "Delhi" },
  { name: "Mike Johnson", location: "Goa" },
  { name: "Emily Davis", location: "Kolkata" },
];

export const locations = ["Mumbai", "Delhi", "Goa", "Chennai", "Kolkata"];

export const initialInventory = {
  Mumbai: [],
  Delhi: [],
  Goa: [],
  Chennai: [],
  Kolkata: [],
};
