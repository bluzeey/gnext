import os
import asyncio
from fastapi import FastAPI, HTTPException, File, UploadFile
from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from scraper import (
    scrape_google_images, 
    save_uploaded_image, 
    remove_uploaded_image, 
    upload_to_google_lens,
    reverse_image_search_with_custom_api  # New import
)
from config import settings

app = FastAPI(
    title=settings.APP_NAME,
    description="Advanced Image Search and Scraping API",
    version="0.1.0",
    debug=settings.DEBUG
)


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
    
@app.post("/custom-reverse-search/", 
          response_model=Dict, 
          summary="Perform reverse image search using Custom Search API")
async def custom_reverse_image_search(
    file: UploadFile = File(...), 
    max_results: int = 10
):
    """
    Upload an image for reverse image search using Google Custom Search API.
    
    - Supports image file uploads
    - Performs reverse image search 
    - Returns list of similar images
    """
    # Validate file type
    allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400, 
            detail="Invalid file type. Only image files are allowed."
        )

    try:
        # Perform reverse image search
        search_results = await reverse_image_search_with_custom_api(
            file, 
            settings.GOOGLE_CUSTOM_SEARCH_API_KEY, 
            settings.GOOGLE_SEARCH_ENGINE_ID,  
            max_results
        )

        return search_results
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Reverse image search failed: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)