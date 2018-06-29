# This program creates a javascript dictionary variable that contains all of the lookup table information
# Kinda backwards, I know...
with open("Lookup Tables.txt", "r") as f:
    lines = f.readlines()

todo = {}
for i in lines:
    key, answer = i.split(' ')
    todo[key] = answer.replace('\n','')

print todo
