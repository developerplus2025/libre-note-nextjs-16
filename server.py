def find_fourth_fast(p1, p2, p3,):
    # p1,p2,p3: tuple (x,y)
    def dot(u, v):
        return u[0]*v[0] + u[1]*v[1]

    pts = [p1, p2, p3]
    for i in range(3):
        B = pts[i]
        A = pts[(i+1) % 3]
        C = pts[(i+2) % 3]
        v1 = (A[0]-B[0], A[1]-B[1])
        v2 = (C[0]-B[0], C[1]-B[1])
        if abs(dot(v1, v2)) == 0:  # góc vuông tại B
            D = (A[0] + C[0] - B[0], A[1] + C[1] - B[1])
            return D
    return None  # không tìm được góc vuông trực tiếp
p2 = (0,0)
p1 = (2,0)
p3 = (0,3)
print(find_fourth_fast(p1,p2,p3))  # (2,3)


def Generate(number,n) :
    if number < n :
       print(" "*((n-number)*2),end="")
    else:
        print(" "*(n-number),end="")
    for i in range(1,number+1):
        if i < number :
            print(i ,"",end="")
        if i == number :
            for i in range(-number,0):
                 print(-i ,"",end="")
            break
n = int(input("Enter your number: "))
a = n
for i in range(1,n+1):
    Generate(i ,a)
    print("")
def Generate(number,n) :
    for i in range(1,number+1):
        if i < number :
            print(i ,"",end="")
        if i == number :
            for i in range(-number,0):
                 print(-i ,"",end="")
            break
a = n
for i in range(1,n+1):
    Generate(i ,a)
    print("")
