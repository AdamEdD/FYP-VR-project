from firebase import firebase
import praw
from random import uniform

def realtime(db):
    
    xco=0
    yco=1
    zco=2
    
    user_agent = '8N_WAlEuQE4YmLgz8qC-Z5FkHUI' 
    r = praw.Reddit(user_agent=user_agent)
    
    for k,v in db.get('reddits',None).items():
        if db.get('reddit_con',k) is None:
            subreddit = r.get_subreddit(k)
            for key, co in db.get('/reddits/',str(subreddit)).items():
                alpha = co
                
            comments = subreddit.get_comments(limit=10, comment_sort="new")
            comments_list = [i for i in comments]
            
            for j in comments_list:
                user = r.get_redditor(str(j.author))
                for potential in user.get_comments(limit=10, comment_sort="new"):
                    
                    if db.get('/reddits/',str(potential.subreddit)) is None:
                        print('%s has been added'%(str(potential.subreddit)))
                        x = uniform(0, 100.0)
                        y = uniform(0, 100.0)
                        z = uniform(0, 100.0)
                        print(x,y,z)
                        db.post('/reddits/%s'%(str(potential.subreddit)), (x,y,z))
                    
                    if db.get('/reddits/',str(potential.subreddit)) is not None:
                        for key,co in db.get('/reddits/',str(potential.subreddit)).items():
                            if str(subreddit) != str(potential.subreddit):
                                beta = co
                                deltaX = alpha[xco]-beta[xco]
                                deltaY = alpha[yco]-beta[yco]
                                deltaZ = alpha[zco]-beta[zco]
                                step = [j*.01 for j in [deltaX,deltaY,deltaZ]]
                                update = [beta[n]+step[n] for n in range(len(step))]
                                   
                                db.put('/reddits/%s'%(str(potential.subreddit)),key,(update[xco],
                                                                                        update[yco],
                                                                                        update[zco]
                                                        )
                                )
                            
                
realtime(firebase.FirebaseApplication('https://fyp-vr-project.firebaseio.com/', None))