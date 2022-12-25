from python_graphql_client import GraphqlClient
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
import asyncio
import numpy as np
# import argparse
import sys

# data = client.execute(query=query, headers=headers, variables=variables)
data = asyncio.run(client.execute_async(query=query, headers=headers, variables=variables))

y = []
for v in data["data"]["getdevicebyID"]:
    y.append(v["cnt"])

_y = np.expand_dims(np.array(y), axis=1)

scaler = StandardScaler()

tf.model = tf.keras.Sequential()
tf.model.add(tf.keras.layers.Dense(units=1, input_dim=3))
tf.model.load_weights("./checkpoint/equip_check")

predicted = tf.model.predict(scaler.fit_transform([np.array(sys.argv[1].split("-"))]))
scaler.fit_transform(_y)
result = scaler.inverse_transform(predicted)
print({"predict": int(result[0][0])})
