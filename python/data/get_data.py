import praw
from collections import defaultdict
from collections import Counter
import itertools
import sys
from firebase import firebase

def get_data(db):
    data = []   
    user_agent = '8N_WAlEuQE4YmLgz8qC-Z5FkHUI'
    
    r = praw.Reddit(user_agent=user_agent)
    subreddits = r.get_popular_subreddits()
    
    for subreddit in subreddits:

        subreddit_ = str(subreddit)

        comments_data = r.get_subreddit(subreddit_)
        comments_data = comments_data.get_comments(limit=20, comment_sort="new")
        comments_data_list = [i for i in comments_data]

        #subscribers.append(subreddit.subscribers)
        
        users = []
    
        for j in comments_data_list:
            
            user = r.get_redditor(str(j.author))
            
            db.post('/users/%s'%(str(user)),
                               [str(comment.subreddit) for comment in user.get_comments(limit=20, comment_sort="new")]
                    
                    )
            connections = [str(comment.subreddit) for comment in user.get_comments(limit=20, comment_sort="new")]
            
        db.post('/reddit_con/%s/'%(subreddit_),connections)