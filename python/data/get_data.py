"""get_data.py
gets initial Reddit data
"""
import praw

def get_data(database):
    """get_data
    takes inpute database
    uses PRAW Reddit instance to get
    get initial Reddit data
    """
    user_agent = '8N_WAlEuQE4YmLgz8qC-Z5FkHUI'
    reddit = praw.Reddit(user_agent=user_agent)
    subreddits = reddit.get_popular_subreddits()
    for subreddit in subreddits:
        alpha = str(subreddit)
        comments_data = reddit.get_subreddit(alpha)
        comments_data = comments_data.get_comments(limit=25, comment_sort="new")
        comments_data_list = [i for i in comments_data]
        betas = []
        for j in comments_data_list:
            user = reddit.get_redditor(str(j.author))
            for comment in user.get_comments(limit=25, comment_sort="new"):
                betas.append(str(comment.subreddit))
        database.post('/reddit_con/%s/'%(alpha), betas)
        betas[:] = []
