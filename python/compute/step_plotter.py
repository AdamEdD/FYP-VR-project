from firebase import firebase
import praw
from random import uniform

def stepplotter(db):
    
    #function to get data to plot graphs for step = 0.1*data , e^data 
    
stepplotter(firebase.FirebaseApplication('https://fyp-vr-project.firebaseio.com/', None))