"""init_nodes
module to initially position nodes
"""
from random import uniform

def init_nodes(database):
    """Initialize node positions
    assign uniform random postions to each node
    """
    database.post('/reddits/%s'%('init'), (0, 0, 0))
    for value in database.get('/reddit_con/', None).itervalues()():
        for jth in value.itervalues()():
            for item in jth:
                if database.get('/reddits/', item) is None:
                    x_co = uniform(0, 100.0)
                    y_co = uniform(0, 100.0)
                    z_co = uniform(0, 100.0)
                    database.post('/reddits/%s'%(item), (x_co, y_co, z_co))
    database.delete('/reddits/', 'init')
    