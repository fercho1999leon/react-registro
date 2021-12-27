import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DB from "./delectePHP.php";
import ContextLogin from '../../ContextLogin';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [consulta, setConsulta] = React.useState({
    estadoText:0,
    estadoBTN:0
  });
  const stateLogin = React.useContext(ContextLogin);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e,stateLogin) => {
    const url = DB;
    const parametro = props.selected;
    const urlSqlConnt = stateLogin['urlSqlConnt'];
    const user = stateLogin['dataUserLogin'];
    const pass = stateLogin['dataPassLogin'];
    let archivoDatos = {
      parametro,
      urlSqlConnt,
      user,
      pass
    }
    archivoDatos = JSON.stringify(archivoDatos);
    let formData = new FormData();
    formData.append('data', archivoDatos);
    setConsulta({
      estadoText:1,
      estadoBTN:1
    });
    fetch(url,{
      method: 'POST', 
      body: formData, 
    })
    .then(res => {return res.text()})
    .then(dataJson => {
        if(dataJson.length>0){
          if(dataJson=="ok"){
            setConsulta({
              estadoText:2,
              estadoBTN:2
            });
            props.selected.map((elS)=>{
              props.rows.map((elR,index)=>{
                if(elR['correo']==elS){
                  props.rows.splice(index,index);
                }
              });
            })
            props.setSelected([]);
          }
        }
    })
  };
  const cambiosText = () =>{
    if(consulta.estadoText==0){
      return(<h3>{props.selected.length} Usuario selecionado</h3>);
    }else if(consulta.estadoText==1){
      return(
        <>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </>
      );
    }else if(consulta.estadoText==2){
      return(
        <>
          <h3>Usuarios Eliminados</h3>
        </>
      );
    }
  }
  const cambiosBTN = ()=>{
    if(consulta.estadoBTN==0){
      return (
      <>
        <Button onClick={(e)=>{setOpen(false)}}>Cancelar</Button>
        <Button onClick={(e)=>{
          handleClose(e,stateLogin['stateLogin']);
        }} autoFocus>
          Eliminar
        </Button>
      </>);
    }else if(consulta.estadoBTN==1){
      return(<></>);
    }else if(consulta.estadoBTN==2){
      return(
        <Button onClick={(e)=>{setOpen(false)}}>Cerrar</Button>
      );
    }
  }
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ELIMINAR"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {cambiosText()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {cambiosBTN()}
        </DialogActions>
      </Dialog>
    </div>
  );
}