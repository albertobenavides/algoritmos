#include <iostream>
#include <stdlib.h>
#include <chrono> 

using namespace std;

struct nodo{
    int valor;
    struct nodo *sig;  
};

nodo *inicio, *fin;

void CrearNodo(int t){
    nodo *temp = new nodo;
    temp->valor = t;
    temp->sig = NULL;
    if(inicio == NULL){
        inicio = temp;
        fin = temp;
    } else {
        fin->sig = temp;
        fin = temp;
    }
}

void MostrarNodos(){
    nodo *temp = new nodo;
    temp = inicio;
    while(temp != NULL)
    {
      //cout << temp->valor << endl;
      temp = temp->sig;
    }
}

int main()
{
    float repeticiones = 1000000;
    int n = 1000;
    auto start = chrono::high_resolution_clock::now(); 
    
    int a [n];

    for (int i = 0; i < repeticiones; i++){
        for (int j = 0; j < n; j++){
            a[j] = rand() % 10;
        }
    }

    auto stop = chrono::high_resolution_clock::now();

    auto duration = chrono::duration_cast<chrono::microseconds>(stop - start) / repeticiones;

    cout << duration.count() << endl;

    start = chrono::high_resolution_clock::now(); 
    for (int i = 0; i < repeticiones; i++){
        inicio = NULL;
        fin = NULL;
        for (int j = 0; j < n; j++){
            CrearNodo(rand() % 10);
        }
    }

    stop = chrono::high_resolution_clock::now();

    duration = chrono::duration_cast<chrono::microseconds>(stop - start) / repeticiones;

    cout << duration.count() << endl;

    ////////////////////////////////

    start = chrono::high_resolution_clock::now(); 

    for (int i = 0; i < repeticiones; i++){
        for (int j = 0; j < n; j++){
            a[j];
        }
    }

    stop = chrono::high_resolution_clock::now();

    duration = chrono::duration_cast<chrono::microseconds>(stop - start) / repeticiones;

    cout << duration.count() << endl;

    start = chrono::high_resolution_clock::now(); 
    for (int i = 0; i < repeticiones; i++){
        MostrarNodos();
    }

    stop = chrono::high_resolution_clock::now();

    duration = chrono::duration_cast<chrono::microseconds>(stop - start) / repeticiones;

    cout << duration.count() << endl;

    return 1;
}
