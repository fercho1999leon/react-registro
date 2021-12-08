import * as React from 'react';
import {useRef} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
//import { styled } from '@mui/styles';
//import { ThemeProvider,createTheme } from '@mui/material/styles';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const btn = {
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '5px 20px',
  margin: '8px auto',
  borderRadius: '10px',
  backgroundColor: '#22376D',
  border: 'solid 2px var(--color-primary)',
  color: 'white',
  "&:hover":{
    color: "var(--color-primary)",
  }
};/*
let theme = createTheme({
  palette: {
    neutral: {
      main: '#000',
      contrastText: '#000',
    },
  },
});*/
export default function BasicModal(props) {
  const refVtnModal = useRef();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  /*<ThemeProvider theme={theme}>
    <Button color="neutral" onClick={(e)=>{props.handlerClick(e,refVtnModal,handleOpen)}}>GUARDAR</Button>
  </ThemeProvider> va dentro del div*/
  return (
    <div>
      <Button sx={btn} onClick={(e)=>{props.handlerClick(e,refVtnModal,handleOpen)}}>GUARDAR</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            INFORMACION
          </Typography>
          <Typography id="modal-modal-description" ref={refVtnModal} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}