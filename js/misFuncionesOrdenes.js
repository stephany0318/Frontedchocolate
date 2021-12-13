var cantidades ={};
var banderai = 0;

function traerOrdenes(){
    console.log("test funcion ordenes")
    $.ajax({
        url:"http://localhost:8080/api/order/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           // console.log(respuesta);
          // pintarRespuesta(respuesta);
        }

    })

}


function pintarRespuesta(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].registerDay+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td> <button onclick='verPedido("+JSON.stringify(respuesta[i].reference)+")'>Ver Pedido</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);   

}


///////////////////////usuarios/////////////////////////
function traerInformacionUsuario(){

    urlString = "http://localhost:8080/api/user/"+6;
    $.ajax({
        method: "GET",
        url: urlString
    })
    .done(
        function(respuesta)
        {
           // console.log(respuesta);
            sessionStorage.setItem('miUser', JSON.stringify(respuesta));
            recuperarJson = respuesta;
            $('#tablaUsuarios').dataTable( {
                responsive: true,
                data : respuesta,
                columns: [
                    {"data": "identification"},
                    {"data": "name"},
                    {"data": "address"},
                    {"data": "cellPhone"},
                    {"data": "email"},
                    {"data": "password"},
                    {"data": "zone"},
                    {"data": "type"},
                    {"defaultContent": "<div class='text-center'><div class='btn-group'><button type='button' class='btn btn-primary btnEditarAbrir'>Editar</button><button type='button' class='btn btn-danger btn_borrar'>Borrar</button></div></div>"}
                ],
            });
        }
    )
    .fail(
        function()
        {
            //alert("Error servidor");
        }
    )
    .always(
        function()
        {
            //alert("siempre ejecutandose")
        }
    )
    ;
}

////////////////////////////productos///////////////////////////////
function traerProductos(){
   // console.log("test funcion")
    $.ajax({
        url:"http://localhost:8080/api/chocolate/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        //    console.log(respuesta);
            pintarRespuesta1(respuesta);
            sessionStorage.setItem('misProductos', JSON.stringify(respuesta));
        }

    })

}

function pintarRespuesta1(respuesta){

    let myTable="<table class= 'misCantidades'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].reference+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].category+"</td>";
        myTable+="<td>"+respuesta[i].price+"</td>";
        myTable+="<td>"+respuesta[i].quantity+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].availability+"</td>";
        myTable+="<td> <input type='number' id='micantidad"+i+"'></input> </td>";
       
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);   
    banderai=respuesta.length;

}


var etiquetaContador ={};

function cantidad(){
    
    var d_reference = JSON.parse(sessionStorage.getItem('misProductos'));
    var miContador = $('.misCantidades tr').length;
    //console.log(banderai);
    
    for(a=0;a<banderai;a++){
        var id = $("#micantidad"+a).val(); 
        console.log("este es"+id);
        var etiqueta = d_reference[a].reference; 
        etiquetaContador[a] += etiqueta+':'+id ;
    }
    
    cantidades = etiquetaContador;
    console.log(cantidades);
}


function agregarOrden(){
   // console.log("prueba boton")
   
    var date = new Date();
    var d_user = JSON.parse(sessionStorage.getItem('miUser'));
    var d_producto = JSON.parse(sessionStorage.getItem('misProductos'));
    var id = parseInt($.trim($("#idOrden").val()));

    cantidad();
let dataToSend = {
    id:id,
    registerDay:date.toISOString(),
    status:"Pendiente",
    salesman:d_user,
    products:d_producto,
    quantities:cantidades


}
console.log(dataToSend);

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url:"http://localhost:8080/api/order/new",
        data: dataToSend,
        datatype:"json",
        cache: false,
        timeout: 600000,
        success:function(respuesta){
            location.reload();
        },
        error : function(e) {
            alert("No FUNCIONA");
        },
        done : function(e) {
            alert("No FUNCIONA");
        }
    });
}

    


