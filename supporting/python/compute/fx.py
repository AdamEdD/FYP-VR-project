'''Return Coordinate Update.
    f(x) increases as x approaches 0
    f(x) = beta+delta*[x*|x-e^-1|]/100
'''
import math

def f(alpha, beta):
    """f(a,b)
    returns updated coordinates to database
    """
    xco = 0
    yco = 1
    zco = 2
    delx = math.fabs(alpha[xco]-beta[xco])
    delz = math.fabs(alpha[yco]-beta[yco])
    dely = math.fabs(alpha[zco]-beta[zco])
    step = []
    delta = [delx, dely, delz]
    for coordinate in delta:
        if coordinate < 1:
            step.append(coordinate)
        else:
            step.append(coordinate/(math.fabs(coordinate-math.exp(-1)))/coordinate)
    update = [beta[n]+delta[n]*step[n] if beta[n] < alpha[n]
              else beta[n]-delta[n]*step[n] for n in range(len(step))]
    # step is returned for testing purposes
    return update, step
