adamedwarddarcy.tech

To initiate the files contained in this folder run __main__.py (This is done at the beginning of the process and does not need to be repeated)

To start realtime updates for the application run compute/realtime.py

#python/data/get_data.py
A file that accesses Reddit through PRAW, PRAW is needed to run this file.
The purpose of this file is to get the initial data that is used as a base for the real time updates in the future.
Firebase is needed to run this file.

#python/compute/init_data.py
A that file that assigns initial 3d coordinates to nodes.
Firebase is needed to run this file.

#python/compute/update_nodes.py
A file that updates node positions for use in view.ts
Firebase is needed to run this file.
fx.py is a dependency of this file

#python/compute/fx.py
A file that calculates node updates

#python/compute/reddit_con_xyz
A file that calculates and returns reddit connections for use a vertices in view.ts
Firebase is needed to run this file.

#python/__main__.py
This is the main runner file for getting initial data from Reddit and runs all above files.
Firebase is needed to run this file.

#python/compute/realtime.py
A file that provides realtime updates to the application.
fx.py is a dependency of this file.
PRAW is needed to run this file.
Firebase is needed to run this file.

#app/view.ts
A file that renders the three dimensional visualisation.
can be viewed on the browser through index.html or at adamedwardarcy.tech.
TypeScript is needed to run this file along with the babylonjs typescript definition file, JQuery definitions, firebase typings.
Viewing at adamedwarddarcy.tech is recommended.




