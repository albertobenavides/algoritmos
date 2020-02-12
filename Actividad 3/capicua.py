import sys

class Capicua:
    def __init__(self, n):
        self.n = list(n)
        self.i = 0
        self.a()

    def a(self):
        print('a ' + str(self.i) + ' ' + str(self.n))
        if self.n[self.i] == '>':
            self.i += 1
            self.a()
        elif self.n[self.i] == '0':
            self.n[self.i] = '>'
            self.i += 1
            self.b()
        elif self.n[self.i] == '1':
            self.n[self.i] = '>'
            self.i += 1
            self.c()
        elif self.n[self.i] == ' ':
            print('sí')

    def b(self):
        print('b ' + str(self.i) + ' ' + str(self.n))
        if self.n[self.i] == '>':
            print('sí')
        elif self.n[self.i] == '0':
            self.i += 1
            self.b()
        elif self.n[self.i] == '1':
            self.i += 1
            self.b()
        elif self.n[self.i] == ' ':
            self.i -= 1
            self.d()

    def c(self):
        print('c ' + str(self.i) + ' ' + str(self.n))
        if self.n[self.i] == '>':
            print('sí')
        elif self.n[self.i] == '0':
            self.i += 1
            self.c()
        elif self.n[self.i] == '1':
            self.i += 1
            self.c()
        elif self.n[self.i] == ' ':
            self.i -= 1
            self.e()
    
    def d(self):
        print('d ' + str(self.i) + ' ' + str(self.n))
        if self.n[self.i] == '>':
            print('sí')
        elif self.n[self.i] == '0':
            self.n[self.i] = ' '
            self.i -= 1
            self.f()
        elif self.n[self.i] == '1':
            print('no')

    def e(self):
        print('e ' + str(self.i) + ' ' + str(self.n))
        if self.n[self.i] == '>':
            print('sí')
        elif self.n[self.i] == '0':
            print('no')
        elif self.n[self.i] == '1':
            self.n[self.i] = ' '
            self.i -= 1
            self.f()

    def f(self):
        print('f ' + str(self.i) + ' ' + str(self.n))
        if self.n[self.i] == '0':
            self.i -= 1
            self.f()
        elif self.n[self.i] == '1':
            self.i -= 1
            self.f()
        elif self.n[self.i] == '>':
            self.i += 1
            self.a()

if len(sys.argv) == 0:
    capicua = Capicua(">101  ")
else:
    print(list(str(sys.argv[1])))
    capicua = Capicua('>{}  '.format(str(sys.argv[1])))