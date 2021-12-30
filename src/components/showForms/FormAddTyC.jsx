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
const SxBtn = {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '5px 20px',
    borderRadius: '10px',
    backgroundColor: '#22376D',
    color: 'white',
    'margin-top': '20px'
};
export default function FormAddTyC(){
    return(
    <div className='ContentConponentAddTyC'>
        <h2>AGREGAR CARRERA O CURSO</h2>
        <div style={{
            'margin-top': '20px'
        }}>
            <FormControl component="fieldset">
                <RadioGroup row name="row-radio-buttons-group">
                    <FormControlLabel value="carrera" control={<Radio />} label="Carrera" />
                    <FormControlLabel value="curso" control={<Radio />} label="Curso" />
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
            <TextField id="standard-basic" label="Ingrese Nombre" variant="standard" />
        </Box>
        <Stack spacing={2} direction="row">
            <Button sx={SxBtn} variant="contained">AGREGAR</Button>
        </Stack>
    </div>
    );
}