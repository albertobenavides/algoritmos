class Nodo {
    constructor(valor) {
        this.id = null;
        this.valor = parseInt(valor);
        this.alto = 0;
        this.ancho = 1;
        this.padre = null;
        this.nivel = 0;
    }
}

class Arbol{
    constructor(){
        this.nodos = [];
        this.id = 0;
        this.ordenProfundidad = []; // Sólo para dibujar bonito
    }

    insertar(nodo){
        nodo.id = this.id;
        nodo.padre = nodo;
        this.nodos.push(nodo);
        
        g.graph.addNode({ id: nodo.id, label: nodo.valor });
        //g.graph.addEdge({ source: nodo.id, target: nodo.id });
        g.update();
        
        this.id = this.id + 1;
        var tdPadre = document.createElement("td");
        var txtPadre = document.createTextNode(nodo.padre.id);
        tdPadre.appendChild(txtPadre);
        elPadre.appendChild(tdPadre);

        var tdValor = document.createElement("td");
        var txtValor = document.createTextNode(nodo.valor);
        tdValor.appendChild(txtValor);
        elValor.appendChild(tdValor);

        var tdIndice = document.createElement("td");
        var txtIndice = document.createTextNode(nodo.id);
        tdIndice.appendChild(txtIndice);
        elIndice.appendChild(tdIndice);
    }
}

function agregar() {
    var el = document.querySelector('#agregar');
    if (el.value == '') {
        document.getElementById('agregar').focus();
        return;
    }
        for (var i = 0; i < A.nodos.length; i++){
            if (A.nodos[i].valor == el.value){
                return;
            }
        }
        var n = new Nodo(el.value);
        A.insertar(n);
        document.getElementById('agregar').focus();
    el.value = '';
}

function unir(){
    let el1 = document.querySelector('#unir1');
    let el2 = document.querySelector('#unir2');
    if (el1.value == '' || el2.value == '') {
        return;
    }
    let indice1 = -1;
    let indice2 = -1;
    for (var i = 0; i < A.nodos.length; i++){
        if (A.nodos[i].valor == el1.value){
            indice1 = A.nodos[i].id;
        }
        if (A.nodos[i].valor == el2.value){
            indice2 = A.nodos[i].id;
        }
    }

    // Si los nodos existen
    if (indice1 > -1 && indice2 > -1){
        var sig = A.nodos[indice2];
        while (sig.padre.id != sig.id) {
            sig = sig.padre;
        }
        sig.padre = A.nodos[indice1];

        // Se borran los renglones de las tablas
        elPadre.innerHTML = "";
        elValor.innerHTML = "";
        elIndice.innerHTML = "";

        // Se borran las aristas
        g.graph.edges.splice(0, g.graph.edges.length)

        // Se crean los encabezados
        var thPadre = document.createElement("th");
        var txtPadre = document.createTextNode("# Padre");
        thPadre.appendChild(txtPadre);
        elPadre.appendChild(thPadre);

        var thValor = document.createElement("th");
        var txtValor = document.createTextNode("Valor");
        thValor.appendChild(txtValor);
        elValor.appendChild(thValor);

        var thIndice = document.createElement("th");
        var txtIndice = document.createTextNode("#");
        thIndice.appendChild(txtIndice);
        elIndice.appendChild(thIndice);

        // Se llena la tabla
        A.nodos.forEach(n => {
            var tdPadre = document.createElement("td");
            txtPadre = document.createTextNode(n.padre.id);
            tdPadre.appendChild(txtPadre);
            elPadre.appendChild(tdPadre);

            var tdValor = document.createElement("td");
            txtValor = document.createTextNode(n.valor);
            tdValor.appendChild(txtValor);
            elValor.appendChild(tdValor);

            var tdIndice = document.createElement("td");
            txtIndice = document.createTextNode(n.id);
            tdIndice.appendChild(txtIndice);
            elIndice.appendChild(tdIndice);

            // Se redibujan las aristas si el padre es distinto de sí mismo
            if (n.padre.id != n.id){
                g.graph.addEdge({ source: n.id, target: n.padre.id, directed: 1 });
            }
        });

        // Se redibuja el grafo
        g.update();
        
        // Se borran los inputs
        el1.value = "";
        el2.value = "";

        // Se selecciona el input1
        el1.focus();
    }
}

window.onload = function () {
    document.getElementById('agregar').focus();
    elPadre = document.getElementById('padre');
    elValor = document.getElementById('valor');
    elIndice = document.getElementById('indice');

    A = new Arbol();

    let ancho = (screen.width - window.devicePixelRatio) * 0.5;
    console.log(ancho);

    g = greuler({
        target: '#canvas',
        width: ancho,
        height: 500,
        data: {
          nodes: [],
          links: [],
          constraints: [],
        }
      }).update();

    document.querySelector('.greuler').classList.add('border');

    document.getElementById('agregar').addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("agregarBoton").click();
        }
    });

    document.getElementById('unir2').addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("unirBoton").click();
        }
    });
}