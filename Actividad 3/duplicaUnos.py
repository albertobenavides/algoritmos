class Duplica:
    def __init__(self, n):
        self.n = list(n)
        self.i = 0
        self.a()

    def a(self):
        print('a {} {}'.format(self.i, str(self.n)))
        if self.n[self.i] == '>':
            self.i += 1
            self.a()
        elif self.n[self.i] == '0':
            self.n[self.i] = '1'
            self.i += 1
            self.a()
        elif self.n[self.i] == '1':
            self.n[self.i] = '0'
            self.i += 1
            self.b()
        elif self.n[self.i] == ' ':
            self.i += 1
            self.f()
    
    def b(self):
        print('b {} {}'.format(self.i, str(self.n)))
        if self.n[self.i] == '1':
            self.i += 1
            self.b()
        elif self.n[self.i] == ' ':
            self.n[self.i] = '*'
            self.i += 1
            self.n += ' '
            self.c()
    
    def c(self):
        print('c {} {}'.format(self.i, str(self.n)))
        if self.n[self.i] == '0':
            self.i += 1
            self.c()
        elif self.n[self.i] == ' ':
            self.n[self.i] = '0'
            self.i += 1
            # Se añade un espacio a la longitud de la cadena
            self.n += ' '
            self.d()

    def d(self):
        print('d {} {}'.format(self.i, str(self.n)))
        if self.n[self.i] == '0':
            self.i -= 1
            self.d()
        elif self.n[self.i] == '*':
            self.n[self.i] = ' '
            self.i -= 1
            self.e()
        elif self.n[self.i] == ' ':
            self.n[self.i] = '0'
            self.i -= 1
            self.d()
    
    def e(self):
        print('e {} {}'.format(self.i, str(self.n)))
        if self.n[self.i] == '0':
            self.n[self.i] = '1'
            self.i += 1
            self.a()
        elif self.n[self.i] == '1':
            self.i -= 1
            self.e()

    def f(self):
        print('f {} {}'.format(self.i, str(self.n)))
        if self.i > len(self.n) - 1:
            print('alto')
        elif self.n[self.i] == '0':
            self.n[self.i] = '1'
            self. i += 1
            self.f()


Duplica('>11111 ')