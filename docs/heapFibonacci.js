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
            var t = this.min.izq;
            this.min.izq = nodo;
            nodo.der = this.min;
            nodo.izq = t;
            t.der = nodo;
            if(nodo.valor < this.min.valor){
                this.min = nodo
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

    conectar(actual, sx, sy, available, unit) {
        var sig = actual.izq;
        while (sig != actual) {
            sig.x = sx;     
            sig.y = unit;
            sx += sx + (sig.width * 2);
            ctx.strokeStyle = '#333333';	
            ctx.beginPath();
            ctx.moveTo(sig.x, sig.y);
            ctx.lineTo(sig.x, sig.y);
            ctx.closePath();
            ctx.stroke();
            sig = sig.izq;
        }
    }
    
    nodo(actual) {
        ctx.fillStyle = "#ffffff";
        
    }
    
    dibujar(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var tall = this.min.height;
        var wide = this.min.width;

        var sig = this.min;
        do {
            wide += sig.width * 2;
            sig = sig.izq;
        } while (sig != this.min);
        var MARGIN = 15;
        var unit = 2.5 * r;
        var w = unit * wide + 2 * MARGIN;
        var h = unit * tall + 2 * MARGIN;
        canvas.width = w;
        canvas.height = h;
        ctx.lineWidth = 3;
        ctx.font = "15px Verdana";
        ctx.textAlign = "center";
        ctx.globalCompositeOperation='destination-over';
        
        var sx = MARGIN;
        var sy = MARGIN;
        var sig = this.min;
        do {
            sig.x = sx;
            sig.y = sy;
            sx += sig.width * 50;
            ctx.beginPath();
            ctx.rect(sig.x - r, sig.y - r, 2 * r, 2 * r);
            ctx.closePath();
            ctx.stroke();
            ctx.fillStyle = "#000000";
            ctx.fillText(sig.valor, sig.x, sig.y + 8);
            if (sig == this.min) {
                ctx.fillStyle = "#ff0000";
            } else{
                ctx.fillStyle = "#ffffff";
            }
            ctx.fill();
            
            sig = sig.izq;
        }while (sig != this.min)
    }
    
    actualizar(actual) {
        var highest = 0;
        var total = 1;
        if (actual.hijo != null) {
            this.actualizar(actual.hijo);
            highest = Math.max(highest, actual.hijo.height);
            var sig = actual.hijo;
            while (sig != actual) {
                total += sig.width;	
                sig = sig.izq;
            }
        }
        actual.width = total;
        //actual.height = highest + 1;
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
    A.dibujar();

    document.getElementById('valor').focus();
}

function buscar(){
    var el = document.querySelector('#valorBuscar');
    if (el.value == '') {
        document.getElementById('valorBuscar').focus();
        return;
    }
    A.buscar(parseInt(el.value));
    A.actualizar(A.min);
    A.dibujar(A.min);

    el.value = '';
    document.getElementById('valorBuscar').focus();
}

window.onload = function () {
    A = new MonticuloFibonacci();
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