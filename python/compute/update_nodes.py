"""update nodes
updates node positions in db
"""
from fx import f

def update_nodes(database):
    """update nodes
    module to update nodes in db
    beta nodes are moved toward alpha nodes
    computation takes place in compute.fx
    """
    xco = 0
    yco = 1
    zco = 2
    for i in database.get('reddits', None):
        if database.get('/reddit_con/', i) != None:
            for value in database.get('/reddits/', i).itervalues():
                alpha = value
            for value in database.get('/reddit_con/', i).itervalues():
                for i in value:
                    for key, value in database.get('/reddits/', i).items():
                        beta = value
                        update = f(alpha, beta)[0]
                        database.put('/reddits/%s'%(i), key,
                                     (update[xco], update[yco], update[zco]))
                        