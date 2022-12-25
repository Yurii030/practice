from sklearn import linear_model, model_selection
import tensorflow as tf
import numpy as np
import  pymysql
import matplotlib.pyplot as plt
import os, random
import datetime
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

plt.plot(model_selection.losses)
plt.xlabel('epoch')
plt.ylabel('loss')
plt.show()