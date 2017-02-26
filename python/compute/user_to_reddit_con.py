from collections import defaultdict
import sqlite3
from firebase import firebase

def user_to_reddit_con(db):

    for k,v in db.get('user_positions',None).items():
        Alphaname = v[0]
        Alphacoords = [v[1],v[2],v[3]]
        for bk, bv in db.get('users',Alphaname).items():
            for Betaname in bv:
                for Betak,Betav in db.get('reddits/%s'%(Betaname),None).items():
                    db.post('/user-reddit_coords', (Alphacoords,
                                                    Betav
                                                    )
                            )