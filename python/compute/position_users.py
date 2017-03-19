from collections import defaultdict
import sqlite3
from firebase import firebase

def position_users(database):
    
    xco=0
    yco=1
    zco=2
    
    temp=[]
    database_temp=[]
    for k,v in database.get('users',None).items():
        for i,j in database.get('users/%s'%(k),None).items():
            if len(temp)>0:
                for i in list(map(list, zip(*temp))):
                    database_temp.append(sum(i)/len(i))
            temp[:]=[]
            if len(database_temp)>0:
                database.post('/user_positions', (k,
                                            database_temp[xco],
                                            database_temp[yco],
                                            database_temp[zco]
                                           )
                )
            database_temp[:]=[]
            for n in j:
                for p,q in database.get('reddits/%s'%(n),None).items():
                    temp.append(q)
    