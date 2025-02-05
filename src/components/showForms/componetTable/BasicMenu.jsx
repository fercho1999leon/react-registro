import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import DB from "./filterPHP.php";
import ContextLogin from '../../ContextLogin';

export default function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const stateLogin = React.useContext(ContextLogin);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e,parametro,stateLoginP) => {
    const url = DB;
    const urlSqlConnt = stateLoginP['urlSqlConnt'];
    const user = stateLoginP['dataUserLogin'];
    const pass = stateLoginP['dataPassLogin'];
    let archivoDatos = {
      parametro,
      urlSqlConnt,
      user,
      pass
    }
    archivoDatos = JSON.stringify(archivoDatos);
    let formData = new FormData();
    formData.append('data', archivoDatos);
    fetch(url,{
      method: 'POST', 
      body: formData, 
    })
    .then(res => {return res.text()})
    .then(dataJson => {
        //console.log(dataJson);
        if(dataJson.length>0){
          props.setData(JSON.parse(dataJson));
          props.setBandera(true);
        }
    })
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FilterListIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={(e)=>handleClose(e,1,stateLogin['stateLogin'])}>Contactado</MenuItem>
        <MenuItem onClick={(e)=>handleClose(e,2,stateLogin['stateLogin'])}>Sin contactar</MenuItem>
        <MenuItem onClick={(e)=>handleClose(e,3,stateLogin['stateLogin'])}>Cita</MenuItem>
      </Menu>
    </div>
  );
}