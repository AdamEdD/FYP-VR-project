from data.get_data import get_data
from compute.init_nodes import init_nodes
from compute.update_nodes import update_nodes
from compute.position_users import position_users
from compute.reddit_con_xyz import reddit_con_xyz
from compute.user_to_reddit_con import user_to_reddit_con
    
from firebase import firebase
import daemon

def main():
    db = firebase.FirebaseApplication('https://fyp-vr-project.firebaseio.com/', None)   
    get_data(db)
    init_nodes(db)
    update_nodes(db)
    position_users(db)
    reddit_con_xyz(db)
    user_to_reddit_con(db)

with daemon.DaemonContext():
    main()