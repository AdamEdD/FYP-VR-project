from collections import defaultdict
import sqlite3
from firebase import firebase

def reddit_con_xyz(database):
    
    for Alphaname,v in database.get('reddit_con',None).items():
        for Alphak,Alphav in database.get('reddits/%s'%(Alphaname),None).items():
            for Betakey,Betaval in v.items():
                for betaname in Betaval:
                    if Alphaname != betaname:
                        for betak,betaco in database.get('reddits/%s'%(betaname),None).items():
                            database.post('/reddit_con_coords', (Alphav,
                                                        betaco
                                                        )
                            )