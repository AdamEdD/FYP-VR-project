from data.get_data import get_data
from compute.init_nodes import init_nodes
from compute.update_nodes import update_nodes
from compute.position_users import position_users
from compute.reddit_con_xyz import reddit_con_xyz
from compute.user_to_reddit_con import user_to_reddit_con
    
from firebase import firebase
import daemon

def main():

    print('started')
    db = firebase.FirebaseApplication('https://fyp-vr-project.firebaseio.com/', None) 

    get_data(db)
    print('got data')
    init_nodes(db)
    print('initiated')

    update_nodes(db)
    print('updated')
    #position_users(db)
    #reddit_con_xyz(db)
    #user_to_reddit_con(db)
    print('complete')


#with daemon.DaemonContext():
 #   main()
    
    
main()