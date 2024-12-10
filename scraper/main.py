import asyncio
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from scraper import scrape_google_images

app = FastAPI()

class ImageSearchRequest(BaseModel):
    search_query: str
    max_images: int = None

@app.post("/scrape")
async def scrape_images(request: ImageSearchRequest):
    try:
        image_data_list = await scrape_google_images(
            search_query=request.search_query,
            max_images=request.max_images
        )
        return {
            "message": f"Finished scraping images for query: {request.search_query}",
            "images": image_data_list  # Return image metadata
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)