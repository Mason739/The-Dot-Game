from random import randint
def randomMove(board):
    if sum(board) == 0:
        return board
    row = randint(0,len(board)-1)
    while board[row]==0:
        row = randint(0,len(board)-1)
    board[row] -= randint(1,board[row])
    return board

class PossMove(object):

    def __init__ (self, board, row, minus):
        self.board = board
        self.row = row
        self.minus = minus
        self.wins = 0
        self.loses = 0

    def printBoard(self,indent):
        print ("|"*indent)+"-"*10
        for i in self.board:
            print ("|"*indent)+"•"*i
    
    def getBoard(self):
        return self.board

class gameBoard(object):
    def __init__ (self, board):
        self.board = board
    def printBoard(self, indent):
        print ("|"*indent)+"-"*10
        for i in self.board:
            print ("|"*indent)+"•"*i
    def getBoard(self):
        return self.board

def getMovesNot(position):
    toReturn = []
    for i in range(0,len(position)):
        for a in range(1,position[i]+1):
            test = position[:]
            test[i] -= a
            toReturn.append(test)
    return toReturn

def boardIn():
    currentBoard = [0,0,0,0,0]
    for i in range(0,5):
        currentBoard[i] = int(raw_input("No. in row "+str(i+1) +": "))
    return currentBoard

def getMoves(position):
    toReturn = []
    for i in range(0,len(position)):
        for a in range(1,position[i]+1):
            test = position[:]
            test[i] -= a
            toReturn.append(PossMove(test,i,a))
    return toReturn

def getRowsLeft(board):
    '''takes a board, returns the indexes of the remaining rows in the inputed list
        if none, returns 0'''
    remaining=[]
    count = -1
    for i in board:
        count += 1
        if i>0:
            remaining.append(count)
    if remaining == []:
        return 0
    else:

        return remaining

def twoSame(dots):
    '''Takes a list in, tests if at least 2 of the values are the same. If so, returns true'''
    if len(dots) != 3:
        return False
    if dots[0]==dots[1]:
        return 3
    elif dots[0]==dots[2]: 
        return 2
    elif dots[1]==dots[2]:
        return 1

    else:
        return False


def numOf123(listIn):
    '''Takes a list, returns the number of times the numbers 1,2,3 occur in the list'''
    num = 0
    for i in listIn:
        if i == 1 or i == 2 or i == 3:
            num += 1
    return num

def removeFromList(listIn, num):
    '''Searches the listIn for num, first instance found is replaced with 0'''
    counter = -1
    for i in listIn:
        counter += 1
        if i == num:
            listIn[counter] = 0
            return listIn
        
    
def all1ButOne(board):
    found = 0
    for i in board:
        if i != 1:
            found += 1
    if found == 1:
        return True
    else:
        return False

def getMovesBack(board):
    '''Returns a list of boards that could have been the move previous to the inputed board'''
    startingBoard = [1,3,5,7,9]
    if len(board)!=len(startingBoard):
        return False
    counter = -1
    output = []
    for i in board:
        counter += 1
        for i in range(1,(startingBoard[counter]-i)+1):
            outTemp = board[:]
            outTemp[counter] += i
            output.append(gameBoard(outTemp))
    return output


def getMovesBackBoard(board):
    '''Returns a list of boards that could have been the move previous to the inputed board'''
    startingBoard = [1,3,5,7,9]
    if len(board)!=len(startingBoard):
        return False
    counter = -1
    output = []
    for i in board:
        counter += 1
        for i in range(1,(startingBoard[counter]-i)+1):
            outTemp = board[:]
            outTemp[counter] += i
            output.append(outTemp)
    return output           
