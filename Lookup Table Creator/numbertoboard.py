# -*- coding: utf-8 -*-
# This program converts an array that represents a board to a number (eg: 13579) and vice versa

def numberToBoard(number):
    a = number
    dots = []
    dots[0] = a/10000
    a = a%10000
    dots[1] = a/1000
    a = a%1000
    dots[2] = a/100
    a = a%100
    dots[3] = a/10
    a = a%10
    dots[4] = a
    return dots

def boardToNumber(board):
    number = ""
    numberTo = []
    for i in board:
        numberTo.append(i)
    for i in numberTo:
        number += str(i)
    return int(number)
