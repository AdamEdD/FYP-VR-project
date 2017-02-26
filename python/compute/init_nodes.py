from collections import defaultdict
from random import uniform
from firebase import firebase


def init_nodes(db):
    
    db.post('/reddits/%s'%('init'), (0,0,0))
    
    for k,v in db.get('/users/',None).items():
        for i,j in v.items():
            for n in j:
                if db.get('/reddits/',n)==None:
                    x = uniform(0, 100.0)
                    y = uniform(0, 100.0)
                    z = uniform(0, 100.0)
                    db.post('/reddits/%s'%(n), (x,y,z))
    db.delete('/users/', 'init')