# app.py
from flask import Flask
app = Flask(__name__)
@app.route('/')
def hello_world():
    return 'Hello world!'

@app.route('/upload', methods=['POST'])
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


if __name__ == '__main__':
    app.run(host='0.0.0.0')