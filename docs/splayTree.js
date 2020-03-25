class Nodo {
    constructor(valor) {
        this.valor = parseInt(valor);
        this.izq = null;
        this.der = null;
        this.padre = null;
        this.info = null;
        this.height = 1;
        this.width = 1;
    }
}

class ArbolBiselado{
    constructor(){
        this.raiz = null;
    }
    insertar(nodo, padre = null){
        if (this.raiz == null){
            this.raiz = nodo;
            return;
        }
        if (padre == null){
            padre = this.raiz;
        }
        if(nodo.valor == padre.valor){
            console.log('Ya está');
            return;
        } else if (nodo.valor < padre.valor) {
            if (padre.izq == null){
                padre.izq = nodo;
                nodo.padre = padre;
                return;
            } else {
                this.insertar(nodo, padre.izq);
            }
        } else {
            if (padre.der == null) {
                padre.der = nodo;
                nodo.padre = padre;
                return;
            } else{
                this.insertar(nodo, padre.der);
            }
        }
    }

    buscar(valor, actual = null){
        if (this.raiz == null) {
            console.log('No está');
        } else {
            if (actual == null) {
                actual = this.raiz;
            }
            if (actual.valor == valor) {
                console.log("Lo encontré");
                this.rotar(actual);
                return;
            } else if (valor < actual.valor) {
                if (actual.izq == null) {
                    console.log('No está');
                    return;
                } else {
                    console.log('Izq');
                    this.buscar(valor, actual.izq);
                }
            } else {
                if (actual.der == null) {
                    console.log('No está');
                    return;
                } else {
                    console.log('Der');
                    this.buscar(valor, actual.der);
                }
            }
        }
    }

    rotar(actual){
        if (actual.padre == null) {
            this.raiz = actual;
            return;
        }else{
            if (actual.padre.izq == actual) {
                var t = actual.der;
                actual.der = actual.padre;
                actual.padre = actual.padre.padre;
                if (actual.padre != null) {
                    if (actual.padre.izq == actual.der) {
                        actual.padre.izq = actual;
                    } else if (actual.padre.der == actual.der) {
                        actual.padre.der = actual;
                    }
                }
                actual.der.padre = actual;
                actual.der.izq = t;
                if(t != null){
                    t.padre = actual.der;
                }
            } else if (actual.padre.der == actual) {
                var t = actual.izq;
                actual.izq = actual.padre;
                actual.padre = actual.padre.padre;
                if (actual.padre != null) {
                    if (actual.padre.izq == actual.izq) {
                        actual.padre.izq = actual;
                    } else if (actual.padre.der == actual.izq) {
                        actual.padre.der = actual;
                    }
                }
                actual.izq.padre = actual;
                actual.izq.der = t;
                if(t != null){
                    t.padre = actual.izq;
                }
            }
            this.actualizar(this.raiz);
            this.dibujar(this.raiz);
            this.rotar(actual);
        }
    }
    
    nodo(actual) {
        var notLeaf = false;
        var isRoot = (actual == self.raiz);
        if (actual.izq != null) {
        notLeaf = true;
        this.nodo(actual.izq);
        }
        if (actual.der != null) {
        notLeaf = true;
        this.nodo(actual.der);
        }
        ctx.fillStyle = "#ffffff";
        if (isRoot) {
        ctx.strokeStyle = "#ff0000";
        } else if (notLeaf) {
        ctx.strokeStyle = "#0000ff";
        } else {
        ctx.strokeStyle = "#00ff00";    
        }
        ctx.beginPath();
        ctx.rect(actual.x - r, actual.y - r, 2 * r, 2 * r);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.fillText(actual.valor, actual.x, actual.y + 8);
    }
    
    dibujar(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var tall = this.raiz.height;
        var wide = this.raiz.width;
        var MARGIN = 15;
        var unit = 2.5 * r;
        var w = unit * wide + 2 * MARGIN;
        var h = unit * tall + 2 * MARGIN;
        canvas.width = w;
        canvas.height = h;
        ctx.lineWidth = 3;
        this.conectar(this.raiz, MARGIN, MARGIN, w - 2 * MARGIN, unit);
        ctx.font = "15px Verdana";
        ctx.textAlign = "center"; 
        this.nodo(this.raiz);    
    }
    
    conectar(actual, sx, sy, available, unit) {
        actual.x = sx + (available / 2);     
        actual.y = sy + (unit / 2);
        sy += unit;
        var dw = available / actual.width;
        var uw = 0;
        var hijo = null;
        if (actual.izq != null) {
            hijo = actual.izq;
            uw = dw * hijo.width;
            this.conectar(hijo, sx, sy, uw, unit);
            ctx.strokeStyle = '#333333';	
            ctx.beginPath();
            ctx.moveTo(actual.x, actual.y);
            ctx.lineTo(hijo.x, hijo.y);
            ctx.closePath();
            ctx.stroke();
        }
        sx += uw + dw;
        if (actual.der != null) {
        hijo = actual.der;
        uw = dw * hijo.width;	
        this.conectar(hijo, sx, sy, uw, unit);
        ctx.strokeStyle = '#aaaaaa';
        ctx.beginPath();
        ctx.moveTo(actual.x, actual.y);
        ctx.lineTo(hijo.x, hijo.y);
        ctx.closePath();
        ctx.stroke();
        }
    }
    
    actualizar(actual) {
        var highest = 0;
        var total = 1;
        if (actual.izq != null) {
        this.actualizar(actual.izq);
        highest = Math.max(highest, actual.izq.height);
        total += actual.izq.width;
        }
        if (actual.der != null) {
        this.actualizar(actual.der);
        highest = Math.max(highest, actual.der.height);
        total += actual.der.width;	
        }
        actual.width = total;
        actual.height = highest + 1;
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
    A.actualizar(A.raiz);
    A.dibujar(A.raiz);

    document.getElementById('valor').focus();
}

function buscar(){
    var el = document.querySelector('#valorBuscar');
    if (el.value == '') {
        document.getElementById('valorBuscar').focus();
        return;
    }
    A.buscar(parseInt(el.value));
    A.actualizar(A.raiz);
    A.dibujar(A.raiz);

    el.value = '';
    document.getElementById('valorBuscar').focus();
}

window.onload = function () {
    A = new ArbolBiselado();
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    r = 15;

    document.getElementById('valor').addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("agregar").click();
        }
    });

    document.getElementById('valorBuscar').addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("buscar").click();
        }
    });
}