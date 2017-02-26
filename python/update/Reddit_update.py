from firebase import firebase
import praw

def Reddit_update(db):
    
    user_agent = '8N_WAlEuQE4YmLgz8qC-Z5FkHUI'
    r = praw.Reddit(user_agent=user_agent)
    
    for k,v in db.get('users',None).items():
        user = r.get_redditor(k)
        for i in [str(comment.subreddit) for comment in user.get_comments(limit=10, comment_sort="top")]:
            if db.get('reddits',i) == None:
                comments_data = r.get_subreddit(i)
                comments_data = comments_data.get_comments(limit=10, comment_sort="top")
                comments_data_list = [j for j in comments_data]
                
                for j in comments_data_list:
                    new_user = r.get_redditor(str(j.author))
                    db.post('/users/%s'%(str(user)),
                                       [str(comment.subreddit) for comment in user.get_comments(limit=10, comment_sort="top")]

                            )
                
                    connections = [str(comment.subreddit) for comment in user.get_comments(limit=10, comment_sort="top")]

                db.post('/reddit_con/%s/'%(subreddit_),connections)
    
Reddit_update(firebase.FirebaseApplication('https://fyp-vr-project.firebaseio.com/', None))