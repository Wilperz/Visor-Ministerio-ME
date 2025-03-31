from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from geoalchemy2 import Geometry
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Float
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database configuration
DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/municipios"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class Municipio(Base):
    __tablename__ = "municipios"
    
    id = Column(Integer, primary_key=True)
    nombre_municipio = Column(String)
    calificacion = Column(Float)
    geom = Column(Geometry('MULTIPOLYGON', srid=4326))

# Create tables
Base.metadata.create_all(bind=engine)

# Sample data insertion
def insert_sample_data():
    session = SessionLocal()
    
    # Check if data already exists
    if session.query(Municipio).count() == 0:
        # Sample GeoJSON for Envigado
        envigado = Municipio(
            nombre_municipio="Envigado",
            calificacion=4.5,
            geom="SRID=4326;MULTIPOLYGON(((-75.5900 6.1600, -75.5500 6.1600, -75.5500 6.1900, -75.5900 6.1900, -75.5900 6.1600)))"
        )
        
        # Sample GeoJSON for Sabaneta
        sabaneta = Municipio(
            nombre_municipio="Sabaneta",
            calificacion=4.2,
            geom="SRID=4326;MULTIPOLYGON(((-75.6200 6.1300, -75.5800 6.1300, -75.5800 6.1600, -75.6200 6.1600, -75.6200 6.1300)))"
        )
        
        session.add_all([envigado, sabaneta])
        session.commit()
    
    session.close()

@app.on_event("startup")
async def startup_event():
    insert_sample_data()

@app.get("/municipios")
async def get_municipios():
    session = SessionLocal()
    municipios = session.query(Municipio).all()
    
    features = []
    for municipio in municipios:
        features.append({
            "type": "Feature",
            "geometry": session.scalar(municipio.geom.ST_AsGeoJSON()),
            "properties": {
                "nombre_municipio": municipio.nombre_municipio,
                "calificacion": municipio.calificacion
            }
        })
    
    session.close()
    
    return {
        "type": "FeatureCollection",
        "features": features
    }

@app.get("/municipios/search/{nombre}")
async def search_municipio(nombre: str):
    session = SessionLocal()
    municipio = session.query(Municipio).filter(
        Municipio.nombre_municipio.ilike(f"%{nombre}%")
    ).first()
    
    if not municipio:
        return {"error": "Municipio no encontrado"}
    
    feature = {
        "type": "Feature",
        "geometry": session.scalar(municipio.geom.ST_AsGeoJSON()),
        "properties": {
            "nombre_municipio": municipio.nombre_municipio,
            "calificacion": municipio.calificacion
        }
    }
    
    session.close()
    return feature