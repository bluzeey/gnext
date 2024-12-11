import os
import asyncio
from fastapi import FastAPI, HTTPException, File, UploadFile
from pydantic import BaseModel
from scraper import scrape_google_images, save_uploaded_image, remove_uploaded_image, upload_to_google_lens

app = FastAPI()

class ImageSearchRequest(BaseModel):
    search_query: str
    max_images: int = None

@app.post("/scrape")
async def scrape_images(request: ImageSearchRequest):
    """Scrape images based on the search query."""
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

@app.post("/upload_file/")
async def upload_image(file: UploadFile = File(...)):
    """Handle image uploads and submit the image to Google Lens."""
    try:
        # Save the uploaded image temporarily
        file_path = await save_uploaded_image(file)

        # Upload the image to Google Lens
        lens_response = upload_to_google_lens(file_path)

        # Clean up by removing the uploaded file temporarily saved
        await remove_uploaded_image(file_path)

        return {
            "message": f"Successfully processed the uploaded image '{file.filename}'",
            "lens_response": lens_response  # This now includes the cleaned response data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)