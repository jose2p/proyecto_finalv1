const SHEET_ID = "1Wie6TH-w_i2ANnDroxTOymzsybQS-ad2lIGDl0BBRws";

const ACCESS_TOKEN =
  "ya29.a0Aa4xrXMUDeSxNxsULmiIP2PZupfCCTnQmQrs7RHyz_fu2f3pUkZioSDZgCwOJ-rmlmJhCbllbRJjI6EdqU0WL9-9pRinbl1BHCD610pfRhGV7P0ZEuegdJuY1wkdxfhyiS7guSfXqTr2SOt6h-09O7mrGnNnaCgYKATASARESFQEjDvL9q9JPzqHKQLqpBL_QfJKfqA0163";

fetch(
  // Obtenemos los datos de la planilla, de la hoja hojaMenu, columnas A y B desde la segunda fila
  `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/usuario!A2:BB`,
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  }
//esperamos el response
)

.then(function (response) {
    //esperamos el json del response para poder utilizarlo
    response.json().then(function (data) {
    const values = data.values;
    console.log(values);


    //Todo esto es para iniciar sesion


    // Obtenemos el elemento de inicio de sesion
    const formulario = document.getElementById("inicio");

    
    //Evitar enviar el formulario si falla
    formulario.onsubmit = () => {
    let nombre_usuario = document.getElementById("username").value;
    let contrasena = document.getElementById("password").value;
    let resultado;
    for (let index = 0; index < values.length; index++) {
        const element = values[index];
    //    console.log(element);
    //   console.log(element[0]);
    //   console.log(nombre_usuario);
    //   console.log(element[1]);
    //   console.log(contrasena);
        if (element[0] === nombre_usuario && element[1] === contrasena) {
          resultado = true;
          console.log(resultado);
          window.location.href = 'https://jose2p.github.io/Speed_Typing/';
          return false;
        }
    }
    if (resultado != true) {
      document.getElementById("mensaje_error").innerHTML = "Usuario o contraseña incorrecta";
      return false;
    }
    };




    // Obtenemos el elemento para registrar
    const registrar = document.getElementById("registro");

    registrar.onsubmit = () => {
      //Creamos el JSON que espera nuestra API
      const usuario = document.getElementById("username1").value;
      const contrasena = document.getElementById("passwordr").value;
      const contrasena1 = document.getElementById("passwordr2").value;

      if (contrasena === contrasena1) {
        let data = {};
        let values = [];
  
        let fila = [usuario, contrasena];

        values.push(fila);
  
        //Verificar que coincida con el nombre de la hoja de nuestro sheet
        data.range = "usuario";
  
        data.majorDimension = "ROWS";
  
        data.values = values;

        //Invocamos al método POST de la API
        fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/usuario:append?valueInputOption=USER_ENTERED`,
          {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify(data)
          }
        ).then(function (response) {
          response.json().then(function (data) {
        
          });
        });
        document.getElementById("mensaje_registrado").innerHTML = "Registrado correctamente";
        return false;
      }else{
        alert("Las contraseñas no coinciden");
        return false;
      }
    }
    
    });
});
