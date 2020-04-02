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
        this.nodos = [];
        this.id = 0;
        this.ordenProfundidad = []; // Sólo para dibujar bonito
    }

    insertar(nodo){
        nodo.id = this.id;
        this.nodos.push(nodo);
        if (this.id == 0){
            g.graph.addNode({ id: nodo.id, label: nodo.valor });
            g.options.data.constraints.push({
                type: 'alignment',
                axis: 'y',
                offsets: [{node: nodo.id, offset: 0}]
            });
            this.dibujar();
            g.update();
        } else{
            var idPadre = Math.floor((nodo.id - 1) / 2);
            var padre = this.nodos[idPadre];
            nodo.padre = padre;
            if(nodo.id % 2 == 0){
                padre.der = nodo;
            } else {
                padre.izq = nodo;
            }
            
            g.graph.addNode({ id: nodo.id, label: nodo.valor });
            g.graph.addEdge({ source: nodo.padre.id, target: nodo.id });
            this.dibujar();
            g.update();
        }
        this.id = this.id + 1;
    }

    buscar(valor, id = 0){
        if (id < this.id){
            g.selector.highlightNode({ id: id });
            var n = this.nodos[id];
            if(n.valor == valor){
                g.selector.getNode({ id: id })
                    .attr('fill', greuler.colors.RED)
                    .transition('custom')
                    .duration(10000)
                    .attr('fill', greuler.colors.BLUE);
                console.log('Encontrado');
                
            } else{
                setTimeout(() => {  
                    this.buscar(valor, id + 1);
                }, 500);
            }
        }
    }

    buscarP(valor, actual = this.nodos[0]){
        if (actual != null){
            this.ordenProfundidad.push(actual.id);
            if(actual.valor == valor){
                return true;
            } else{
                var encontrado = false;
                if (actual.izq != null){ 
                    encontrado = this.buscarP(valor, actual.izq);
                }
                if (actual.der != null && !encontrado){
                    encontrado = this.buscarP(valor, actual.der);
                }
                return false;
            }
        }
        return false;
    }

    resaltarP(valor, i = 0){
        var id = this.ordenProfundidad[i];
        var actual = this.nodos[id];
        if (actual != null){
            g.selector.highlightNode({ id: actual.id });
            if(actual.valor == valor){
                g.selector.getNode({ id: actual.id })
                    .attr('fill', greuler.colors.RED)
                    .transition('custom')
                    .duration(10000)
                    .attr('fill', greuler.colors.BLUE);
            } else {
                // https://www.sitepoint.com/delay-sleep-pause-wait/
                setTimeout(() => {
                    this.resaltarP(valor, i + 1);
                }, 500);
            }
        }
    }

    dibujar(actual = this.nodos[0]){
        if (actual == this.nodos[0]){
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
            var maxAncho = actual.izq.ancho;
            if (actual.der != null) {
                maxAncho = Math.max(actual.izq.ancho, actual.der.ancho);
            }
            actual.ancho = maxAncho * 2;
            g.options.data.constraints[0].offsets.push({node: actual.izq.id, offset: actual.izq.alto * 50});
            g.options.data.constraints.push({axis: 'x', left: actual.izq.id, right: actual.id, gap: actual.ancho * 7, equality: true})
        }
        if (actual.der != null){
            actual.der.alto = actual.alto + 1;
            this.dibujar(actual.der);
            var maxAncho = Math.max(actual.izq.ancho, actual.der.ancho);
            actual.ancho = maxAncho * 2;
            g.options.data.constraints[0].offsets.push({node: actual.der.id, offset: actual.der.alto * 50});
            g.options.data.constraints.push({axis: 'x', left: actual.id, right: actual.der.id, gap: actual.ancho * 7, equality: true})
        }
    }
}

function agregar() {
    var el = document.querySelector('#agregar');
    if (el.value == '') {
        document.getElementById('agregar').focus();
        return;
    }
        var n = new Nodo(el.value);
        A.insertar(n);
        document.getElementById('agregar').focus();
    el.value = '';
}

function buscar() {
    var el = document.querySelector('#buscar');
    if (el.value == '') {
        document.getElementById('buscar').focus();
        return;
    }
    var n = new Nodo(el.value);
    A.buscar(el.value);
    document.getElementById('buscar').focus();
    el.value = '';
}

function buscarP() {
    var el = document.getElementById('buscarP');
    if (el.value == '') {
        document.getElementById('buscarP').focus();
        return;
    }
    var n = new Nodo(el.value);
    A.ordenProfundidad.splice(0, A.ordenProfundidad.length);
    A.buscarP(el.value);
    A.resaltarP(el.value);
    document.getElementById('buscarP').focus();
    el.value = '';
}

window.onload = function () {
    document.getElementById('agregar').focus();

    A = new Arbol();

    g = greuler({
        target: '#canvas',
        width: screen.width - window.devicePixelRatio,
        height: '800',
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

    document.getElementById('buscar').addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("buscarBoton").click();
        }
    });

    document.getElementById('buscarP').addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("buscarPBoton").click();
        }
    });
}