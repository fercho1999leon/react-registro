import React, {createContext, useState } from 'react';
import EnhancedTable from './componetTable/EnhancedTable.jsx';
import ShearchComponent from './shearchFuncion/ShearchComponent.jsx'
const style = {
    margin: 'auto 5px',
    width:'74.55%'
}
export default function FormShowDate(){
    const [dataTable,setDataTable] = useState("");
    const [banderaUp,setBanderaUp] = useState(true);
    return(
        <div style={style}>
            <ShearchComponent setData={setDataTable} setBandera={setBanderaUp}/>
            <EnhancedTable data={dataTable} setData={setDataTable} bandera={banderaUp} setBandera={setBanderaUp}></EnhancedTable>
        </div>
    );
};