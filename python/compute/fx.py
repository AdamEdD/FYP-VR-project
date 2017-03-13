'''
f(x) increases as x approaches 0

f(x) = beta+delta*[x*|x-e^-1|]/100
'''
import plotly
from plotly.graph_objs import *
import plotly.graph_objs as go
import math

def f(alpha,beta):
    
    xco=0
    yco=1
    zco=2
    
    deltaX = alpha[xco]-beta[xco]
    deltaY = alpha[yco]-beta[yco]
    deltaZ = alpha[zco]-beta[zco]
    
    step = []
    
    delta = [deltaX,deltaY,deltaZ]
    
    for x in delta:
        if x<1:
            step.append(x)
        else:
            step.append(x/(math.fabs(x-math.exp(-1)))/x)
    
    update = [beta[n]+delta[n]*step[n] for n in range(len(step))]

    return update


"""a = [100,120,95]
b = [20,27,21]

def get_data_points(a,b):
    plotlist = []
    for i in range(1,200):    
        update = f(a,b)
        b = update
        plotlist.append(b)
        
    return plotlist

def scatterplot(z1):
    
    trace1 = Scatter3d(
    x=[i for i in z1[0]],
    y=[i for i in z1[1]],
    z=[i for i in z1[2]],
    mode='markers',
    marker=dict(
        sizemode='diameter',
        sizeref=2000,
        color = [i for i in z1[0]],
        colorscale = 'Viridis',
        colorbar = dict(title = 'strength <br> of <br> connection'),
        line=dict(color='rgb(140, 140, 170)')
        )
    )

    data=[trace1]
    layout=dict(height=800, width=800, title='As Beta connections to Alpha grows in Strength')
    fig=dict(data=data, layout=layout)
    plotly.offline.plot(fig, filename='e.html')
    
#scatterplot(get_data_points(a,b))

def windrose(z1):
    
    data = [
     go.Contour(
        z=z1,
        colorscale='Jet',
    )]
    fig = go.Figure(data=data)
    plotly.offline.plot(fig, filename='wind.html')
    
windrose(get_data_points(a,b))"""
    
    