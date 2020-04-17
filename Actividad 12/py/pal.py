
import timeit, functools
import pandas as pd

import random
import string

import sys

# https://pynative.com/python-generate-random-string/
letters = string.ascii_lowercase

def iterativo(s):
    #s = s.replace(' ', '')
    mitad = int(len(s) / 2)
    if mitad == 0:
        return True
    for i in range(mitad):
        if s[i] != s[-1 - i]:
            return False
    return True

def recursivo(s):
    #s = s.replace(' ', '')
    mitad = int(len(s) / 2)
    if mitad == 0:
        return True
    if(s[0] != s[-1]):
        return False
    return recursivo(s[1:-1])


column_names = ["n", "i", "r"]
df = pd.DataFrame(columns = column_names)

N = 6000
r = 1000000
recursion = sys.getrecursionlimit()
sys.setrecursionlimit(N)

for n in range(N):
    p = ''.join(random.choice(letters) for i in range(n))
    p += p[::-1]


    t1 = timeit.timeit(functools.partial(iterativo, p), number=int(r))  
    i = t1 / r

    t2 = timeit.timeit(functools.partial(recursivo, p), number=int(r))
    r = t2 / r
    
    df.loc[len(df)] = [n, i, r]

sys.setrecursionlimit(recursion)

import matplotlib.pyplot as plt

plt.rcParams.update({'font.size': 14})

plt.figure(figsize=(8,5))
plt.xlabel('Longitud de cadena')
plt.ylabel('$t_i - t_r$ (ms)')
plt.plot(df.n * 2, df.i - df.r)
plt.savefig('dif_i_r.png')
plt.close()

plt.figure(figsize=(8,4))
plt.xlabel('Longitud de cadena')
plt.ylabel('$Tiempos de cómputo (ms')
plt.plot(df.n * 2, df.i, 'r--', label="Iterativo")
plt.plot(df.n * 2, df.r, 'b--', label="Recursivo")
plt.legend()
plt.savefig('t_i_r.png')