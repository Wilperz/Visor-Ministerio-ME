from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
from geoalchemy2 import Geometry
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Float
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv
import json

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
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/municipios")
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

@app.get("/initial-municipios")
async def get_initial_municipios():
    try:
        session = SessionLocal()
        
        # Query to get one municipality with its geometry
        query = text("""
            SELECT id, ST_AsGeoJSON(geom) as geom
            FROM municipios
            LIMIT 1
        """)
        
        result = session.execute(query)
        row = result.fetchone()
        
        if not row:
            session.close()
            return JSONResponse(
                status_code=404,
                content={"error": "No municipalities found"}
            )
        
        # Create GeoJSON feature
        feature = {
            "type": "Feature",
            "geometry": json.loads(row.geom),
            "properties": {}
        }
        
        session.close()
        return [feature]
        
    except Exception as e:
        if session:
            session.close()
        return JSONResponse(
            status_code=500,
            content={"error": f"Error fetching initial municipios: {str(e)}"}
        )

@app.get("/municipalities-by-department/{department_id}")
async def get_municipalities_by_department(department_id: str):
    try:
        session = SessionLocal()
        
        # Query to get unique municipalities for the department
        query = text("""
            SELECT DISTINCT mpio_cdpmp, mpio_cnmbr
            FROM div_territorial_zonas
            WHERE dpto_ccdgo = :department_id
            ORDER BY mpio_cnmbr
        """)
        
        result = session.execute(query, {"department_id": department_id})
        municipalities = [dict(row._mapping) for row in result]
        
        if not municipalities:
            session.close()
            return JSONResponse(
                status_code=404,
                content={"error": "No municipalities found for this department"}
            )
        
        # Format response to match the frontend structure
        formatted_municipalities = [
            {"id": "all", "name": "Todos"}
        ] + [
            {"id": muni["mpio_cdpmp"], "name": muni["mpio_cnmbr"]}
            for muni in municipalities
        ]
        
        session.close()
        return formatted_municipalities
        
    except Exception as e:
        if session:
            session.close()
        return JSONResponse(
            status_code=500,
            content={"error": f"Error fetching municipalities: {str(e)}"}
        )

@app.get("/municipality-data/{department_id}")
async def get_municipality_data(department_id: str, municipality_name: str | None = None):
    try:
        session = SessionLocal()

        # Build the territorial query
        territorial_query = """
            SELECT id_grilla, mpio_cdpmp, dpto_cnmbr, mpio_cnmbr
            FROM div_territorial_zonas
            WHERE dpto_ccdgo = :department_id
        """
        
        params = {"department_id": department_id}
        
        if municipality_name and municipality_name != "Todos":
            territorial_query += " AND mpio_cnmbr = :municipality_name"
            params["municipality_name"] = municipality_name

        territorial_query += " ORDER BY mpio_cnmbr"
        
        # Execute territorial query
        territorial_result = session.execute(text(territorial_query), params)
        territorial_data = [dict(row._mapping) for row in territorial_result]

        if not territorial_data:
            session.close()
            return JSONResponse(
                status_code=404,
                content={"error": "No territorial data found"}
            )

        # Get unique mpio_cdpmp values and pad them to 5 digits
        unique_mpio_cdpmp = list(set(
            str(item["mpio_cdpmp"]).zfill(5)
            for item in territorial_data
        ))

        # Fetch determinant data
        determinant_query = text("""
            SELECT *
            FROM divterritorialmuni_determinantes
            WHERE mpio_cdpmp = ANY(:mpio_codes)
        """)
        
        determinant_result = session.execute(
            determinant_query,
            {"mpio_codes": unique_mpio_cdpmp}
        )
        determinant_data = [dict(row._mapping) for row in determinant_result]

        # Fetch municipios geometries
        grid_ids = [item["id_grilla"] for item in territorial_data]
        municipios_query = text("""
            SELECT id, geom, id_grilla
            FROM municipios
            WHERE id_grilla = ANY(:grid_ids)
        """)
        
        municipios_result = session.execute(
            municipios_query,
            {"grid_ids": grid_ids}
        )

        # Build features list
        features = []
        for muni in municipios_result:
            muni_dict = dict(muni._mapping)
            # Get corresponding territorial data
            territorial = next(
                (t for t in territorial_data if t["id_grilla"] == muni_dict["id_grilla"]),
                None
            )
            
            if territorial:
                # Get corresponding determinant data
                det_data = next(
                    (d for d in determinant_data if d["mpio_cdpmp"] == str(territorial["mpio_cdpmp"]).zfill(5)),
                    {}
                )
                
                # Convert geometry to GeoJSON
                geom_query = text("SELECT ST_AsGeoJSON(:geom) as geojson")
                geom_result = session.execute(geom_query, {"geom": muni_dict["geom"]})
                geometry = json.loads(geom_result.scalar())

                features.append({
                    "type": "Feature",
                    "geometry": geometry,
                    "properties": det_data
                })

        # Build enriched data
        enriched_data = []
        for det in determinant_data:
            territorial = next(
                (t for t in territorial_data if str(t["mpio_cdpmp"]).zfill(5) == det["mpio_cdpmp"]),
                None
            )
            if territorial:
                enriched_data.append({
                    **det,
                    "mpio_cnmbr": territorial["mpio_cnmbr"],
                    "dpto_cnmbr": territorial["dpto_cnmbr"]
                })

        session.close()
        return JSONResponse(content={
            "features": features,
            "enrichedData": enriched_data
        })

    except Exception as e:
        if session:
            session.close()
        return JSONResponse(
            status_code=500,
            content={"error": f"Error fetching municipality data: {str(e)}"}
        )

@app.get("/indicadores-territorial")
async def get_indicadores_territorial():
    try:
        session = SessionLocal()
        
        # Execute raw SQL query to get all data from indicadores_territorial
        query = text("SELECT * FROM indicadores_territorial")
        result = session.execute(query)
        
        # Convert result to list of dictionaries
        indicadores = []
        for row in result:
            indicador = dict(row._mapping)
            # Convert numeric types to float/int for JSON serialization
            for key, value in indicador.items():
                if isinstance(value, (float, int)):
                    indicador[key] = float(value) if isinstance(value, float) else value
            indicadores.append(indicador)
        
        session.close()
        
        return JSONResponse(content={"indicadores": indicadores})
        
    except Exception as e:
        session.close()
        return JSONResponse(
            status_code=500,
            content={"error": f"Error fetching indicadores territorial: {str(e)}"}
        )

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)