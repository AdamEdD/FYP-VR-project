"""realtime
realtime update module
"""
from random import uniform
from firebase import firebase
import praw
from fx import f

def realtime(database):
    """realtime updates
    provides realtime updates
    finds new subreddits and adds them to the database
    """
    xco = 0
    yco = 1
    zco = 2
    user_agent = '8N_WAlEuQE4YmLgz8qC-Z5FkHUI'
    reddit = praw.Reddit(user_agent=user_agent)
    for key in database.get('reddits', None).iterkeys():
        if database.get('reddit_con', key) is None:
            subreddit = reddit.get_subreddit(key)
            for key, value_co in database.get('/reddits/', str(subreddit)).items():
                alpha = value_co
            comments = subreddit.get_comments(limit=25, comment_sort="new")
            comments_list = [i for i in comments]
            for j in comments_list:
                user = reddit.get_redditor(str(j.author))
                for potential in user.get_comments(limit=25, comment_sort="new"):
                    if database.get('/reddits/', str(potential.subreddit)) is None:
                        x_co = uniform(0, 100.0)
                        y_co = uniform(0, 100.0)
                        z_co = uniform(0, 100.0)
                        database.post('/reddits/%s'%(str(potential.subreddit)), (x_co, y_co, z_co))
                    if database.get('/reddits/', str(potential.subreddit)) is not None:
                        for key, value_co in database.get('/reddits/', str(potential.subreddit)).items():
                            if str(subreddit) != str(potential.subreddit):
                                beta = value_co
                                update = f(alpha, beta)[0]
                                database.put('/reddits/%s'%(str(potential.subreddit)), key,
                                                            (update[xco],
                                                             update[yco],
                                                             update[zco]
                                                            )
                                            )
realtime(firebase.FirebaseApplication('https://fyp-vr-project.firebaseio.com/', None))
