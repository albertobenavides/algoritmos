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
                        sig.parent = null; // Se quita el padre
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
                        sig.parent = null; // Se quita el padre
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
                    }while(sig != hijo);
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
        var actual = this.min;
        var sig = actual.izq;
        while (sig != actual) {
            var izq = sig.izq;
            var der = sig.der;
            var hijo = sig.hijo;
            if(actual.hijos == sig.hijos){
                if (sig.izq == actual && sig.der == actual) {
                    actual.izq = actual;
                    actual.der = actual;
                } else {
                    var izq = sig.izq;
                    var der = sig.der;
                    izq.der = der;
                    der.izq = izq;
                }
                if (actual.valor < sig.valor){
                    sig.padre = actual;
                    if(actual.hijo == null){
                        actual.hijo = sig;
                        actual.hijos = actual.hijos + 1;
                        sig.der = sig;
                        sig.izq = sig;
                    } else {
                        var t = actual.hijo.izq;
                        actual.hijo.izq = sig;
                        sig.der = actual.hijo;
                        t.der = sig;
                        sig.izq = t;
                    }

                    sig = actual.izq;
                } else { // Si el siguiente tiene un valor menor o igual, entonces se hace padre del actual
                    actual.padre = sig;
                    if(actual.hijo == null){
                        sig.hijo = actual;
                        sig.hijos = sig.hijos + 1;
                        sig.der = sig;
                        sig.izq = sig;
                    } else {
                        var t = sig.hijo.izq;
                        sig.hijo.izq = actual;
                        actual.der = sig.hijo;
                        t.der = actual;
                        actual.izq = t;
                    }

                    actual = sig;
                }
            } else{
                sig = sig.izq;
            }
        }
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
    g.graph.edges.splice(0, g.graph.edges.length);
    g.graph.nodes.splice(0, g.graph.nodes.length);
    var sig = A.min;
    do{
        if(A.min.valor == sig.valor){
            g.graph.addNode({ id: sig.valor, fill: greuler.colors.BLUE});
        } else {            
            g.graph.addNode({ id: sig.valor, fill: greuler.colors.BLUE});
        }
        sig = sig.izq;
    } while(sig != A.min);
    var sig = A.min;
    do{
        g.graph.addEdge({ source: sig.valor, target: sig.izq.valor});
        sig = sig.izq;
    } while(sig != A.min);
    g.update();
    
    document.getElementById('valor').focus();
}

function eliminar(){
    A.eliminarMin();
}

window.onload = function () {
    A = new MonticuloFibonacci();

    g = greuler({
        target: '#canvas',
        width: 800,
        height: 640,
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