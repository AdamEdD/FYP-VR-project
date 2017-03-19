"""main()
main() build file
"""
from data.get_data import get_data
from compute.init_nodes import init_nodes
from compute.update_nodes import update_nodes

from firebase import firebase

def main():
    """main
    calls all other initiation files
    """
    database = firebase.FirebaseApplication('https://fyp-vr-project.firebaseio.com/', None)
    get_data(database)
    init_nodes(database)
    update_nodes(database)
main()
