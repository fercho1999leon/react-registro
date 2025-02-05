import React, {createContext, useState } from 'react';
import EnhancedTable from './componetTable/EnhancedTable.jsx';
import ShearchComponent from './shearchFuncion/ShearchComponent.jsx'
const style = {
    margin: 'auto 5px',
    width:'inherit',
    'min-width': '200px'
}
export default function FormShowDate(){
    const [dataTable,setDataTable] = useState("");
    const [banderaUp,setBanderaUp] = useState(true);
    return(
        <div style={style}>
            <ShearchComponent setData={setDataTable} setBandera={setBanderaUp}/>
            <EnhancedTable data={dataTable} bandera={banderaUp} setData={setDataTable} setBandera={setBanderaUp}></EnhancedTable>
        </div>
    );
};