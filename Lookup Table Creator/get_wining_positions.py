from Dotfunctions import *
# This file creates a list of positions that you can win with

class gameBoard(object):
    def __init__ (self, board):
        self.board = board
    def printBoard(self, indent):
        print ("|"*indent)+"-"*10
        for i in self.board:
            print ("|"*indent)+"•"*i
    def getBoard(self):
        return self.board

file_path = 'Loses.txt'
f = open(file_path,'r')


winningPositions = []
winningBoards = []
for line in f:
    current = []
    current.append(int(line[0]))
    current.append(int(line[1]))
    current.append(int(line[2]))
    current.append(int(line[3]))
    current.append(int(line[4]))
    boardInClass = gameBoard(current)
    winningPositions.append(boardInClass)
    winningBoards.append(boardInClass.board)
f.close()


losingPositions = []
losingBoards = []
for i in winningPositions:
    losingPositions.extend(getMovesBack(i.board))
    losingBoards.extend(getMovesBackBoard(i.board))


#Get all boards
dots = [1,3,5,7,9]
count = 0
allPositions = []
for a in range(0,dots[0]+1):
    for b in range(0,dots[1]+1):
        for c in range(0,dots[2]+1):
            for d in range(0,dots[3]+1):
                for e in range(0,dots[4]+1):
                    count += 1
                    test = [dots[0]-a,dots[1]-b,dots[2]-c,dots[3]-d,dots[4]-e]
                    allPositions.append(gameBoard(test))


winingIndexs = []
losingIndexs = []
noLoops = 0
print 'Pre-loop winning positions detected: ' + str(len(winningBoards))
while True:     #this loop to continues until broken
    noLoops += 1
    newThings = 0
    for i in allPositions:
        if not(i.board in winningBoards) and not(i.board in losingBoards):
            movesTemp = getMoves(i.board)
            moves = []  #moves are all the moves that opponent could do w/ given board
            for a in movesTemp:
                moves.append(a.board)
            good = True
            for a in moves:
                if a in losingBoards:
                    continue
                else:
                    good = False
                    break
            if good:    #if all moves are losing boards
                newThings += 1
                newLosing = getMovesBack(i.board)
                for b in newLosing:
                    if not(b.board in losingBoards):
                        newThings += 1
                        losingPositions.append(b)
                        losingBoards.append(b.board)
                winningPositions.append(gameBoard(i.board))
                winningBoards.append(i.board)


    if newThings == 0: #done finding new information
        print 'Winning positions detected: ' + str(len(winningBoards))
        print 'Losing positions detected: ' + str(len(losingPositions))
        print 'Total number of positions: ' + str(len(allPositions))
        break

f = open('Hard Winning Positions.txt','w+')
f.truncate()
for i in winningBoards:
    for a in i:
        f.write(str(a))
    f.write("\n")
f.close()
