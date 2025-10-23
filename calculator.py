sum = 0
x = -24
for i in range (1,10) :
    a = 0
    if i %2 != 0 :
        a = 20*(x**i)
    else:
        a = 20*(x**i)
    sum = sum + a
print(x**10+sum )

print(" "*(5-1),"s")