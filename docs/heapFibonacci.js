class Nodo {
    constructor(valor) {
        this.valor = parseInt(valor);
        this.izq = null;
        this.der = null;
        this.padre = null;
        this.hijo = null;
        this.hijos = 0;
        this.height = 1;
        this.width = 1;
    }
}

class MonticuloFibonacci{
    constructor(){
        this.min = null;
    }

    insertar(nodo){
        if (this.min == null){
            nodo.izq = nodo;
            nodo.der = nodo;
            this.min = nodo;
            return;
        } else {
            var izq = this.min.izq;
            this.min.izq = nodo;
            nodo.der = this.min;
            nodo.izq = izq;
            izq.der = nodo;            
            if(nodo.valor < this.min.valor){
                this.min = nodo;
            }
        }
    }

    eliminar(valor, actual = null){
        if(this.min == null){
            console.log('No está');
        } else{
            if (actual == null){
                actual == this.min;
            }
            if(actual.valor == valor){
                console.log('Encontrado');
                // Se hace el desmadre de moverlos
            } else if(actual.valor > valor){
                console.log('Aquí no está');
                var sig = actual.izq;
                while (sig != actual) {
                    this.eliminar(valor, sig);
                    sig = sig.izq;
                }
            } else { // Si el valor buscado es mayor que el actual
                if(actual.hijos == 0){
                    console.log('Aquí no está');
                    var sig = actual.izq;
                    while (sig != actual) {
                        this.eliminar(valor, sig);
                        sig = sig.izq;
                    }
                } else { // Y tiene hijos donde buscar
                    console.log('Aquí podría estar');
                    this.eliminar(valor, actual.hijo);
                }
            }
        }
    }

    eliminarMin(){
        if(this.min != null){ // Si hay mínimo
            var izq = this.min.izq;
            var der = this.min.der;
            var hijo = this.min.hijo;

            if(izq == this.min){ // Si sólo hay uno
                if(this.min.hijo != null){ // Y tiene hijos
                    var sig = hijo;
                    var min = Infinity;
                    do{ // Por cada hijo
                        sig.padre = null; // Se quita el padre
                        if(sig.valor < min){ // Se puede establecer como el nuevo mínimo
                            this.min = sig;
                            min = sig.valor;
                        }
                        sig = sig.izq;
                    }while(sig != hijo);
                } else{ // Si no tiene hijos
                    this.min = null;
                }
            } else { // Si hay más de uno
                if(this.min.hijo != null){ // Y tiene hijos
                    // Se conectan los hijos con sus hermanos
                    /*
                    1 - 2
                        3
                    */

                    izq.der = hijo; // 1 - 3
                    var t = hijo.izq; // t = 3
                    hijo.izq = izq; // 1 - 3
                    der.izq = t; // 1 - 3
                    t.der = der;

                    // Se revisa quién es el mayor
                    var sig = hijo;
                    var min = Infinity;
                    do{ // Por cada hijo
                        sig.padre = null; // Se quita el padre
                        if(sig.valor < min){ // Se puede establecer como el nuevo mínimo
                            this.min = sig;
                            min = sig.valor;
                        }
                        sig = sig.izq;
                    }while(sig != hijo);
                } else{ // Si no tiene hijos
                    izq.der = der;
                    der.izq = izq;
                    var sig = izq;
                    var min = Infinity;
                    do{ // Por cada hermano
                        if(sig.valor < min){ // Se puede establecer como el nuevo mínimo
                            this.min = sig;
                            min = sig.valor;
                        }
                        sig = sig.izq;
                    }while(sig != izq);
                }
            }
        }
        if(this.min != null){
            var raices = []
            var sig = this.min;
            do {
                raices.push(sig);
                sig = sig.izq;
            }while (sig != this.min);

            this.consolidar(raices);
        }
    }

    consolidar(raices){
        for (let i = 0; i < raices.length; i++) {
            for (let j = 0; j < raices.length; j++) {
                if(i == j || raices[i].padre != null || raices[j].padre != null){ // Si son iguales o alguno tiene padre
                    continue; // No se comparan (porque esto es sólo para raíces distintas)
                } else{
                    if(raices[i].hijos == raices[j].hijos){ // si tienen la misma cantidad de hijos
                        if (raices[i].valor < raices[j].valor){ // Si i es menor a j
                            // j pasa a ser hijo de i
                            var padre = raices[i];
                            var hijo = raices[j];
                        } else{
                            //i pasa a ser hijo de j
                            var padre = raices[j];
                            var hijo = raices[i];
                        }
                        // Se actualizan los hermanos del que va a ser hijo
                        hijo.izq.der = hijo.der;
                        hijo.der.izq = hijo.izq;
                        if (padre.hijo == null) { // Si no tenía hijos el padre
                            padre.hijo = hijo;
                            hijo.padre = padre;
                            hijo.izq = hijo;
                            hijo.der = hijo;
                        } else{ // En caso de que tenga hijos
                            var tIzq = padre.hijo.izq; // Se guarda el hermano izq del hijo
                            hijo.padre = padre;
                            padre.hijo.izq = hijo;
                            hijo.der = padre.hijo;
                            tIzq.der = hijo;
                            hijo.izq = tIzq;
                        }
                        padre.hijos = padre.hijos + 1;
                    } else{
                        // No pasa nada
                    }
                }
            }
            
        }
    }

    dibujar(actual){
        if(this.min == null){
            g.graph.edges.splice(0, g.graph.edges.length);
            g.graph.nodes.splice(0, g.graph.nodes.length);
            g.update();
            return;
        }
        if(actual == this.min){
            g.graph.edges.splice(0, g.graph.edges.length);
            g.graph.nodes.splice(0, g.graph.nodes.length);
            g.graph.addNode({ id: 'rs', fill: greuler.colors.BROWN});
        }
        var sig = actual;
        do{
            if(sig == this.min){
                g.graph.addNode({ id: sig.valor});
                g.selector.getNode({ id: this.min.valor }).attr('fill', "#f00");
            } else {            
                g.graph.addNode({ id: sig.valor});
            }
            if (actual == this.min) {
                g.graph.addEdge({ source: 'rs', target: sig.valor });
            }
            if (sig.hijo != null) {
                this.dibujar(sig.hijo);
            }
            sig = sig.izq;
        } while(sig != actual);
        
        var sig = actual;
        do{
            g.graph.addEdge({ source: sig.valor, target: sig.izq.valor});
            if (sig.padre != null) {
                g.graph.addEdge({ source: sig.valor, target: sig.padre.valor});
            }
            sig = sig.izq;
        } while(sig != actual);
        g.update();
    }
}

function agregar() {
    var el = document.querySelector('#valor');
    if (el.value == '') {
        document.getElementById('valor').focus();
        return;
    }
    var n = new Nodo(el.value);
    el.value = '';
    A.insertar(n);
    A.dibujar(A.min);
    console.clear();
    console.log('Mínimo del montículo fibonacci');
    console.log(A.min);
    document.getElementById('valor').focus();
}

function eliminar(){
    A.eliminarMin();
    A.dibujar(A.min);
    console.clear();
    console.log('Mínimo del montículo fibonacci');
    console.log(A.min);
}

window.onload = function () {
    A = new MonticuloFibonacci();

    g = greuler({
        target: '#canvas',
        width: 800,
        data: {
          nodes: [],
          links: []
        }
      }).update()

    document.getElementById('valor').addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("agregar").click();
        }
    });
}