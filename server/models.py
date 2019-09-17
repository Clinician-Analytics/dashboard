from . import db

class User(db.Model):
    __tablename__= 'users'

    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(100))
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    role = db.Column(db.String(100))

class Data(db.Model):
    __tablename__= 'data'

    id = db.Column(db.Integer, primary_key=True)
    last_name = db.Column(db.String(100))
    first_name = db.Column(db.String(100))
    role_status = db.Column(db.String(100))
    unit = db.Column(db.String(100))
    callreceive_time = db.Column(db.DateTime)
    dispatch_time = db.Column(db.DateTime)
    enroute_time = db.Column(db.DateTime)
    onscene_time = db.Column(db.DateTime)
    patientcontact_time = db.Column(db.DateTime)
    departscene_time = db.Column(db.DateTime)
    atdestination_time = db.Column(db.DateTime)
    closed_time = db.Column(db.DateTime)
    lock_date = db.Column(db.DateTime)
    disposition = db.Column(db.String(100))
    cc_anatomy = db.Column(db.String(100))
    cc_organ = db.Column(db.String(100))
    prim_impress = db.Column(db.String(100))
    support_prim = db.Column(db.String(100))
    support_sign = db.Column(db.String(100))




# class Clinician_data(db.Model):
#     pass
