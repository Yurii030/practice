from sklearn.linear_model import LinearRegression
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import  seaborn  as  sns
import  tensorflow  as  tf 

data_train = pd.read_csv('디바이스02.csv') 
data_test = pd.read_csv('디바이스02.csv') 
data_train = data_train.dropna(axis=0,how='any')
x_train = data_train['x'] 
y_train = data_train['y'] 
x_test = data_test['x'] 
y_test = data_test['y']
x_train = np.array(x_train).reshape(-1,1) 
y_train = np.array(y_train) 
