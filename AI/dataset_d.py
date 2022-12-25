# 홀드아웃(hold-out)방법
# -----------------------------------
# 홀드아웃(hold-out)방법으로 검증 데이터의 분할
from sklearn.model_selection import train_test_split

# train_test_split()함수를 이용한 홀드아웃 방법으로 분할
tr_x, va_x, tr_y, va_y = train_test_split(train_x, train_y,
                                          test_size=0.25, random_state=71, shuffle=True)

# -----------------------------------
# 홀드아웃(hold-out)방법으로 검증을 수행

from sklearn.metrics import log_loss
from sklearn.model_selection import train_test_split

# Model 클래스를 정의
# Model 클래스는 fit으로 학습하고 predict로 예측값 확률을 출력

# train_test_split 함수를 이용하여 홀드아웃 방법으로 분할
tr_x, va_x, tr_y, va_y = train_test_split(train_x, train_y,
                                          test_size=0.25, random_state=71, shuffle=True)

# 학습 실행, 검증 데이터 예측값 출력, 점수 계산
model = Model()
model.fit(tr_x, tr_y, va_x, va_y)
va_pred = model.predict(va_x)
score = log_loss(va_y, va_pred)
print(score)

# -----------------------------------
# KFold 클래스를 이용하여 홀드아웃 방법으로 검증 데이터를 분할

from sklearn.model_selection import KFold

# KFold 클래스를 이용하여 홀드아웃 방법으로 분할
kf = KFold(n_splits=4, shuffle=True, random_state=71)
tr_idx, va_idx = list(kf.split(train_x))[0]
print(tr_idx, va_idx)

tr_x, va_x = train_x.iloc[tr_idx], train_x.iloc[va_idx]
tr_y, va_y = train_y.iloc[tr_idx], train_y.iloc[va_idx]