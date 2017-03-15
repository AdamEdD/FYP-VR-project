from collections import defaultdict
import sqlite3
from firebase import firebase
import math

def update_nodes(db):
    
    xco=0
    yco=1
    zco=2
    
    for i in db.get('reddits',None):
        if db.get('/reddit_con/',i) != None:
            for k,v in db.get('/reddits/',i).items():
                alpha = v
            for k,v in db.get('/reddit_con/',i).items():
                for i in v:
                    for k,v in db.get('/reddits/',i).items():
                        beta = v
                        deltaX = alpha[xco]-beta[xco]
                        deltaY = alpha[yco]-beta[yco]
                        deltaZ = alpha[zco]-beta[zco]
                        #step = [j*.01 for j in [deltaX,deltaY,deltaZ]]
                        #update = [beta[n]+step[n] for n in range(len(step))]
                        step = []
                        delta = [deltaX,deltaY,deltaZ]
    
                        for x in delta:
                            if x<1:
                                step.append(x)
                            else:
                                step.append(x/(math.fabs(x-math.exp(-1)))/x)

                        update = [beta[n]+delta[n]*step[n] for n in range(len(step))]
                        
                        #update = f(alpha,beta)
                        
                        db.put('/reddits/%s'%(i),k,(update[xco],
                                                      update[yco],
                                                      update[zco]
                                                    )
                        )
                        