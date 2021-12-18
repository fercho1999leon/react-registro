import DB from "./shearchPHP.php";
export default function shearch(e,refTextShearch,setData,setBanderaUp){
    const url = DB;
    let parametro = refTextShearch.current.childNodes[1].childNodes[0].value;
    parametro = parametro.length>0?parametro:0;
    let archivoDatos = {
        parametro
    }
    archivoDatos = JSON.stringify(archivoDatos);
    let formData = new FormData();
    formData.append('data', archivoDatos);
    fetch(url,{
        method: 'POST', 
        body: formData, 
    })
    .then(res => {
        console.log("Resultado");
        console.log(res);
        return res.text();
    })
    .then(dataJson => {
        if(dataJson.length>0){
            setData(JSON.parse(dataJson));
            setBanderaUp(true);
        }
    })
}
