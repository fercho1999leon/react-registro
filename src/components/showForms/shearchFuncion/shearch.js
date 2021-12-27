import DB from "./shearchPHP.php";
export default function shearch(e,refTextShearch,setData,setBanderaUp,stateLogin){
    const urlSqlConnt = stateLogin['urlSqlConnt'];
    const user = stateLogin['dataUserLogin'];
    const pass = stateLogin['dataPassLogin'];
    const url = DB;
    let parametro = refTextShearch.current.childNodes[1].childNodes[0].value;
    parametro = parametro.length>0?parametro:0;
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
    .then(res => {
        return res.text();
    })
    .then(dataJson => {
        if(dataJson.length>0){
            setData(JSON.parse(dataJson));
            setBanderaUp(true);
        }
    })
}
