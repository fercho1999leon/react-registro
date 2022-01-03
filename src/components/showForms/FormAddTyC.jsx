import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './FormAddTyCStyle.css';
import ContextLogin from '../ContextLogin';
import DB from "./AddTyCPHP.php";
const SxBtn = {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '5px 20px',
    borderRadius: '10px',
    backgroundColor: '#22376D',
    color: 'white',
    'margin-top': '20px'
};
const onClickAddCyT = (e,StateLogin) =>{
    const urlSqlConnt = StateLogin['urlSqlConnt'];
    const user = StateLogin['dataUserLogin'];
    const pass = StateLogin['dataPassLogin'];
    const dataForm = document.getElementsByClassName('dataOut');
    const typeInteres = dataForm[0].childNodes[0].checked?1:2;
    const name = dataForm[2].childNodes[1].childNodes[0].value;
    let archivoDatos={
        typeInteres,
        name,
        urlSqlConnt,
        user,
        pass
    }
    /*const id = archivoDatos['configForm'].listInteresC.length+1;
    console.log(archivoDatos);
    archivoDatos['configForm'].listInteresC.push({id,name});
    console.log(archivoDatos);
    const formData = new FormData();*/
}
export default function FormAddTyC(){
    const StateLogin = React.useContext(ContextLogin);
    return(
    <div className='ContentConponentAddTyC'>
        <h2>AGREGAR CARRERA O CURSO</h2>
        <div style={{
            'margin-top': '20px'
        }}>
            <FormControl component="fieldset">
                <RadioGroup row name="row-radio-buttons-group">
                    <FormControlLabel value="carrera" control={<Radio className="dataOut"/>} label="Carrera" />
                    <FormControlLabel value="curso" control={<Radio className="dataOut"/>} label="Curso" />
                </RadioGroup>
            </FormControl>
        </div>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField className="dataOut" id="standard-basic" label="Ingrese Nombre" variant="standard" />
        </Box>
        <Stack spacing={2} direction="row">
            <Button sx={SxBtn} onClick={(e)=>{
                onClickAddCyT(e,StateLogin);
            }} variant="contained">AGREGAR</Button>
        </Stack>
    </div>
    );
}