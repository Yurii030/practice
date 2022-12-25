# app.py
# init_db()  테스트를 진행하기 위한 모듈만들기
# from flask import Flask
# from database import db_session, init_db
# from flask_graphql import GraphQLView
# from schema import schema

# app = Flask(__name__)
# app.debug = True

# app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True, batch=True))

# @app.teardown_appcontext
# def shutdown_session(exception=None):
#     db_session.remove()

# if __name__ == '__main__':
#     # init_db()
#     app.run()
# /app.py
from flask import Flask, jsonify
from sqlalchemy import create_engine, text

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile("config.py")
    
    database = create_engine(app.config['db_url'], encoding='utf-8', max_overflow=0)
    app.database = database
    
    @app.route('/device', methods=['GET'])
    def getdevice(device):
        params = {'count': device}
        row = app.database.execute(text("""
            SELECT COUNT(deviceid) 
            FROM device 
        """), params).fetchone()
        return jsonify(row)
    
    return app 