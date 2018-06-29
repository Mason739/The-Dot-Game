# This program creates a text file that contains all possible board postitions


import json
from decimal import Decimal


dots = [1,3,5,7,9]
count = 0
f= open("Possibilities.txt","w")
f.truncate();
for a in range(0,dots[0]+1):
    for b in range(0,dots[1]+1):
        for c in range(0,dots[2]+1):
            for d in range(0,dots[3]+1):
                for e in range(0,dots[4]+1):
                    count += 1
                    test = [dots[0]-a,dots[1]-b,dots[2]-c,dots[3]-d,dots[4]-e]
                    for g in test:
                        f.write(str(g))
                        f.write(" ")
                    f.write("0 0")
                    f.write("\n")
f.close()
print 'Done!!'
print count
