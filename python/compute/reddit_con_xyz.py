from collections import defaultdict
import sqlite3
from firebase import firebase

def reddit_con_xyz(db):
    
    for Alphaname,v in db.get('reddit_con',None).items():
        for Alphak,Alphav in db.get('reddits/%s'%(Alphaname),None).items():
            for Betakey,Betaval in v.items():
                for betaname in Betaval:
                    if Alphaname != betaname:
                        for betak,betaco in db.get('reddits/%s'%(betaname),None).items():
                            db.post('/reddit_con_coords', (Alphav,
                                                        betaco
                                                        )
                            )