from collections import defaultdict
import sqlite3
from firebase import firebase

def position_users(db):
    
    xco=0
    yco=1
    zco=2
    
    temp=[]
    db_temp=[]
    for k,v in db.get('users',None).items():
        for i,j in db.get('users/%s'%(k),None).items():
            if len(temp)>0:
                for i in list(map(list, zip(*temp))):
                    db_temp.append(sum(i)/len(i))
            temp[:]=[]
            if len(db_temp)>0:
                db.post('/user_positions', (k,
                                            db_temp[xco],
                                            db_temp[yco],
                                            db_temp[zco]
                                           )
                )
            db_temp[:]=[]
            for n in j:
                for p,q in db.get('reddits/%s'%(n),None).items():
                    temp.append(q)
    