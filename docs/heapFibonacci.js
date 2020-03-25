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

    eliminarMin(){
        if(this.min != null){
            if(this.min.izq == this.min){
                this.min = null
            } else if(this.min.izq.izq == this.min){
                var izq = this.min.izq;
                if(this.min.hijo == null){
                    izq.izq = izq;
                    izq.der = izq;
                    this.min = izq;
                } else{
                    // La derecha de la izq del mín va al hijo
                    izq.der = this.min.hijo;
                    var t = this.min.hijo.izq;
                    // La izq del hijo del mín va a la izq del min
                    this.min.hijo.izq = izq;
                    // La izq del hijo del mí va a la derecha del mín
                    t.der = izq;
                    izq.izq = t;

                    var min = Infinity;
                    var sig = izq;
                    do {
                        if (sig.valor < min) {
                            this.min = sig;
                            min = sig.valor;
                        }
                        sig = sig.izq;
                    }while (sig != izq);
                }
            }else{
                var izq = this.min.izq;
                var der = this.min.der;
                if(this.min.hijo == null){
                    izq.der = der;
                    der.izq = izq;
                } else{
                    // La derecha de la izq del mín va al hijo
                    izq.der = this.min.hijo;
                    var t = this.min.hijo.izq;
                    // La izq del hijo del mín va a la izq del min
                    this.min.hijo.izq = izq;
                    // La izq del hijo del mí va a la derecha del mín
                    t.der = der;
                    der.izq = t;
                }    
                var min = Infinity;
                var sig = izq;
                do {
                    if (sig.valor < min) {
                        this.min = sig;
                        min = sig.valor;
                    }
                    sig = sig.izq;
                }while (sig != izq);
            }
        }
        if(this.min != null){
            var sig = this.min;
            // Falta agregar qué onda cuando son uno o dos
            do {
                this.consolidar(sig);
                sig = sig.izq;
            }while (sig != this.min);
        }
    }

    consolidar(actual){
        var sig = actual.izq;
        while (sig != actual) {
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
            actual.height = highest + 1;
            var sig = actual.hijo;
            do {
                this.actualizar(sig);
                highest = Math.max(highest, sig.height);
                total += sig.width;
                sig = sig.izq;
            } while (sig != actual.hijo);
        }
        actual.width = total;
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

function eliminar(){
    A.eliminarMin();
    A.dibujar();
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
}