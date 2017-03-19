"""reddit_con_xyz
calculates node connections
"""
def reddit_con_xyz(database):
    """reddit_con_xyz
    calculates node connections
    """
    for alphakey, value in database.get('reddit_con', None).items():
        for alphav in database.get('reddits/%s'%(alphakey), None).itervalues():
            for betaval in value.itervalues():
                for betaname in betaval:
                    if alphakey != betaname:
                        for betaco in database.get('reddits/%s'%(betaname), None).itervalues():
                            database.post('/reddit_connections', (alphav, betaco))
