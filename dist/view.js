function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}
reg_json=JSON.parse(httpGet("/view"));
regs=json2array(reg_json);
tabBody=document.getElementsByTagName("tbody").item(0);
regs.forEach(i=>{

    row=document.createElement("tr");
    cell1 = document.createElement("td");
    cell2 = document.createElement("td");
    cell3 = document.createElement("td");
    cell4 = document.createElement("td");
    textnode1=document.createTextNode(i["data"]["name"]);
    textnode2=document.createTextNode(i["data"]["latitude"]);
    textnode3=document.createTextNode(i["data"]["longitude"]);
    textnode4=document.createTextNode(i["data"]["height"]);
    
    cell1.appendChild(textnode1);
    cell2.appendChild(textnode2);
    cell3.appendChild(textnode3);
    cell4.appendChild(textnode4);    
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);    
    tabBody.appendChild(row);

}
);