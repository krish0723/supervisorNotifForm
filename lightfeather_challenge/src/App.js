import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { FormControl, Select } from '@mui/material';
import { InputLabel } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';

function App() {
  useEffect(() => {
    getSupervisor('/api/supervisors');
  }, []);
  const [listOfManagers, setListOfManagers] = useState([""]);
  const [supMenuItems, setSupMenuItems] = useState([""]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState(0);
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [notifyPhoneNum, setNotifyPhoneNum] = useState(false);
  const [supervisor, setSupervisor] = useState("");
  const getSupervisor = async (url) => {
    const newData = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json());
    console.log(newData);
    let tempArr = [];
    for (let i = 0; i < newData.result.length; i++) {
      if (isNaN(newData.result[i].jurisdiction) === true){
        tempArr.push(newData.result[i].jurisdiction + " - " + newData.result[i].lastName + ", " + newData.result[i].firstName);
      }
    }
    tempArr.sort();
    updateListOfManagers(tempArr);
    let tempArr2 = [];
    tempArr2 = tempArr.map((name) => (
      <MenuItem
      value={name}
      key={name}
      >
        {name}
      </MenuItem>
    ));
    updateSupMenuItems(tempArr2);
  };
  
  const sendData = async (url) => {
    const requestData = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'firstName': firstName,
        'lastname': lastName,
        'email': email,
        'phoneNum': phoneNum.toString(),
        'supervisor': supervisor
      })
    };
    console.log(requestData);
    const responseData = await fetch(url, requestData)
    .then(response => response.json())
    .catch((err) => console.log(err));
  };

  const handleSupervisor = (event) => {
    setSupervisor(event.target.value);
  };
  const updateListOfManagers = (arr) => {
    setListOfManagers(arr);
  };
  const updateSupMenuItems = (arr) => {
    setSupMenuItems(arr);
  };
  const handleFirstName = (event) => {
    setFirstName((event.target.value));
    console.log(firstName);
  };

  const handleLastName = (event) => {
    event.stopPropagation();
    setLastName((event.target.value));
    console.log(lastName);
  };

  const handleEmail = (event) => {
    setEmail((event.target.value));
    console.log(email);
  };

  const handlePhoneNum = (event) => {
    setPhoneNum((event.target.value));
    console.log(phoneNum);
  };

  const handleNotifyType = (event) => {
    if (event.target.value === 'Email'){
      setNotifyEmail(false);
      setNotifyPhoneNum(true);
      console.log(notifyEmail);
    }else if (event.target.value === 'PhNumber'){
      setNotifyPhoneNum(false);
      setNotifyEmail(true);
      console.log(notifyPhoneNum);
    }else if (event.target.value === 'Both'){
      setNotifyEmail(false);
      setNotifyPhoneNum(false);
    }
    
  };
  const handleSubmit = (event) => {
    sendData('/api/submit')
  }

  return (
    <div className="App">
      <AppBar bgcolor='blue' position="static">
        <Box sx={{ p: 2, border: '1px' }}>
          Notification Form
        </Box>

        <Box bgcolor='white' sx={{ p: 20 }}>
          <Grid container 
            spacing={1}
            justifyContent='center'
            alignItems='center'
            direction='column'
            >
              <Grid container
                direction='row'
                justifyContent="center" 
                spacing={1} 
                >
                  <TextField
                    required
                    inputProps={{ inputMode: 'text'}}
                    id="outlined-required"
                    label="First Name"
                    defaultValue=""
                    onChange={handleFirstName}
                />
                  <Box sx={{p:5}}/>
                  <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    defaultValue=""
                    onChange={handleLastName}
                />
              </Grid>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>
                <InputLabel id="demo-simple-select-label">How would you like to be notified?</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="notify"
                    defaultValue=""
                    onChange={handleNotifyType}
                  >
                    <MenuItem key='Email' value='Email'>Email</MenuItem>
                    <MenuItem key='PhNumber' value='PhNumber'>Phone Number</MenuItem>
                    <MenuItem key='Both' value='Both'>Both</MenuItem>
                  </Select>
              </FormControl>
              <Box sx={{p:2}}/>
              <Grid container
                direction='row'
                justifyContent="center" 
                spacing={1} 
                >
                  <TextField
                    disabled={notifyEmail}
                    id="outlined"
                    label="Email"
                    defaultValue=""
                    onChange={handleEmail}
                />
                  <Box sx={{p:5}}/>
                  <TextField
                    disabled={notifyPhoneNum}
                    id="outlined"
                    label="Phone Number"
                    defaultValue=""
                    onChange={handlePhoneNum}
                />
              </Grid>

              <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>
                <InputLabel id="demo-simple-select-label">Supervisor</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Supervisor"
                    defaultValue=""
                    onChange={handleSupervisor}
                  >
                      {supMenuItems}
                  </Select>
              </FormControl>
              <Box sx={{p:2}}/>
            <Button variant='contained' onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Box>
      </AppBar>
    </div>
  );
}

export default App;
