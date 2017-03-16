"""main()
main() build file
"""
from python.data.get_data import get_data
from python.compute.init_nodes import init_nodes
from python.compute.update_nodes import update_nodes
#from compute.position_users import position_users
#from compute.reddit_con_xyz import reddit_con_xyz
#from compute.user_to_reddit_con import user_to_reddit_con
from firebase import firebase
import daemon

def main():
    """main
    calls all other initiation files
    """
    database = firebase.FirebaseApplication('https://fyp-vr-project.firebaseio.com/', None)
    get_data(database)
    init_nodes(database)
    update_nodes(database)
    #position_users(database)
    #reddit_con_xyz(database)
    #user_to_reddit_con(database)
with daemon.DaemonContext():
    main()
