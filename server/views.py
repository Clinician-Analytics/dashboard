from flask import Blueprint, jsonify, request
from .models import Data
from io import TextIOWrapper
import csv
import pandas as pd

main = Blueprint('main', __name__)

@main.route('/upload', methods=['POST', 'GET'])
def upload_data():
    if request.method == 'POST':
        csvfile = request.files['file']
        data = pd.read_csv(csvfile)
        data.to_sql(con=engine, index_label='id', name=cdb1.__data__, if_exists='append')
        # csvfile = TextIOWrapper(csvfile, encoding='utf-8')
        # csvreader = csv.reader(csvfile, delimiter=',')
        # for row in csvreader:
        #     data = Data(id=row[0], last_name=row[1])

        db.session.add(data)
        db.session.commit()

        return 'Done', 201

@main.route('/data', methods=['GET'])
def data():
    all_data = Data.query.all()
    data = []

    return jsonify({'data': data})

# @main.route('/system_heatmap')
# def heatmap():
#
#     heatmap_data = []
#
#     return jsonify({'system_heatmap': heatmap_data})

# @main.route('/login')
# def login():
#
#
#     return jsonify({'users' : user})
