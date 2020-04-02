class Nodo {
    constructor(valor) {
        this.id = null;
        this.valor = parseInt(valor);
        this.izq = null;
        this.der = null;
        this.alto = 0;
        this.ancho = 1;
        this.padre = null;
        this.nivel = 0;
    }
}

class Arbol{
    constructor(){
        this.raiz = null;
        this.nivel = 0;
        this.id = 0;
    }

    insertar(nodo, actual = this.raiz){
        if (actual == this.raiz){
            this.nivel = 0;
        }
        if (actual == null){
            nodo.id = this.id;
            this.id = this.id + 1;
            this.raiz = nodo;
            
            g.graph.addNode({ id: nodo.id, label: nodo.valor });
            g.options.data.constraints.push({
                type: 'alignment',
                axis: 'y',
                offsets: [{node: nodo.id, offset: 0}]
            });
            this.dibujar();
            g.update();

            return true;
        } else if (actual.izq == null){
            nodo.id = this.id;
            this.id = this.id + 1;
            nodo.padre = actual;
            nodo.nivel = this.nivel + 1;
            actual.izq = nodo;
            
            g.graph.addNode({ id: nodo.id, label: nodo.valor });
            g.graph.addEdge({ source: nodo.padre.id, target: nodo.id });
            this.dibujar();
            g.update();

            return true;
        } else if (actual.der == null){
            nodo.id = this.id;
            this.id = this.id + 1;
            nodo.padre = actual;
            nodo.nivel = this.nivel + 1;
            actual.der = nodo;

            g.graph.addNode({ id: nodo.id, label: nodo.valor });
            g.graph.addEdge({ source: nodo.padre.id, target: nodo.id });
            this.dibujar();
            g.update();

            return true;
        } else {
            var padre = actual;
            actual = actual.izq;
            if (!(actual.der == null || (actual.der != null && padre.der.der != null))){
                actual = padre.der;
            }
            this.nivel = this.nivel + 1;
            this.insertar(nodo, actual);
        }
    }

    dibujar(actual = this.raiz){
        if (actual == this.raiz){
            g.options.data.constraints.splice(0, g.options.data.constraints.length);
            this.nivel = 0;
            g.options.data.constraints.push({
                type: 'alignment',
                axis: 'y',
                offsets: [{node: actual.id, offset: 0}]
            });
        } 
        if (actual.izq != null){
            actual.izq.alto = actual.alto + 1;
            this.dibujar(actual.izq);
            actual.ancho = actual.ancho + 1;
            g.options.data.constraints[0].offsets.push({node: actual.izq.id, offset: actual.izq.alto * 30});
            g.options.data.constraints.push({axis: 'x', left: actual.izq.id, right: actual.id, gap: actual.ancho * 5, equality: true})
        }
        if (actual.der != null){
            actual.der.alto = actual.alto + 1;
            this.dibujar(actual.der);
            actual.ancho = actual.ancho + 1;
            g.options.data.constraints[0].offsets.push({node: actual.der.id, offset: actual.der.alto * 30});
            g.options.data.constraints.push({axis: 'x', left: actual.id, right: actual.der.id, gap: actual.ancho * 5, equality: true})
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
        A.insertar(n);
        var t = document.querySelector('.greuler');
        t.setAttribute('width', '100%');
        console.clear();
        console.log('Mínimo del montículo fibonacci');
        console.log(A.min);
        document.getElementById('valor').focus();
    el.value = '';
}

window.onload = function () {
    A = new Arbol();

    g = greuler({
        target: '#canvas',
        width: '400',
        height: '800',
        data: {
          nodes: [],
          links: [],
          constraints: [],
        }
      }).update();

    document.getElementById('valor').addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("agregar").click();
        }
    });

    (function(){
        if (A.min != null){
            g.selector.highlightNode({ id: A.min.valor }); 
        }
        setTimeout(arguments.callee, 1000);
    })();
}