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
        g.graph.addEdge({ source: nodo.id, target: nodo.id });
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

window.onload = function () {
    document.getElementById('agregar').focus();
    elPadre = document.getElementById('padre');
    elValor = document.getElementById('valor');
    elIndice = document.getElementById('indice');

    A = new Arbol();

    g = greuler({
        target: '#canvas',
        width: screen.width - window.devicePixelRatio,
        height: '400',
        data: {
          nodes: [],
          links: [],
          constraints: [],
        }
      }).update();

    document.getElementById('agregar').addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("agregarBoton").click();
        }
    });
}