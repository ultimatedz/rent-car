from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

db = SQLAlchemy()
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cars.db"
db.init_app(app)

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    modelo = db.Column(db.String, nullable=False)
    marca = db.Column(db.String, nullable=False)
    ano = db.Column(db.Integer, nullable=False)
    obs = db.Column(db.String, nullable=True)
    price = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String, nullable=False)

    def as_dict(self):
        return {c.name: getattr(self,c.name) for c in self.__table__.columns}

with app.app_context():
    db.create_all()


@app.route("/cars")
def car_list():
    cars = db.session.execute(db.select(Car).order_by(Car.id)).scalars()
    return jsonify([car.as_dict() for car in cars])


@app.route("/cars", methods=['POST'])
def addNewCar():
  
  data = request.get_json()

  carro = Car(
      modelo=data["modelo"],
      marca=data["marca"],
      ano=data["ano"],
      obs=data["obs"],
      price=data["price"],
      status=data["status"],
  )
  db.session.add(carro)
  db.session.commit()
  cars = db.session.execute(db.select(Car).order_by(Car.id)).scalars()
  return jsonify([car.as_dict() for car in cars])


@app.route("/cars/<int:id>", methods=['DELETE'])
def deleteCar(id):

  carro = db.get_or_404(Contacts, id)

  db.session.delete(carro)
  db.session.commit()

  cars = db.session.execute(db.select(Car).order_by(Car.id)).scalars()
  return jsonify([car.as_dict() for car in cars])



@app.route("/cars/<int:id>", methods=['PUT'])
def updateCar(id):

  data = request.get_json()
  carro = db.get_or_404(Car, id)
  
  carro.modelo = data['modelo']
  carro.marca = data['marca']
  carro.ano = data['ano']
  carro.obs=data['obs']
  carro.price=data['price']
  carro.status=data['status']

  carro.verified = True
  db.session.commit()

  contacts = db.session.execute(db.select(Contacts).order_by(Contacts.id)).scalars()
  return jsonify([contact.as_dict() for contact in contacts])