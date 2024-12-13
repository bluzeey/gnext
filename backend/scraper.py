import os
import base64
import aiofiles
import asyncio
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urlencode
from playwright.async_api import async_playwright
from typing import List, Dict, Optional
from fastapi import UploadFile


def perform_google_custom_image_search(
    api_key: str, 
    search_engine_id: str, 
    file_path: str, 
    max_results: int = 10
) -> List[Dict[str, str]]:
    """
    Perform reverse image search using Google Custom Search API
    
    :param api_key: Google Custom Search API key
    :param search_engine_id: Google Custom Search Engine ID
    :param file_path: Path to the uploaded image file
    :param max_results: Maximum number of results to return
    :return: List of image search results
    """
    try:
        # Read image file and encode to base64
        with open(file_path, 'rb') as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

        # Prepare API request parameters
        base_url = "https://www.googleapis.com/customsearch/v1"
        params = {
            'key': api_key,
            'cx': search_engine_id,
            'searchType': 'image',
            'num': max_results,  # Number of results to return
            'q': 'similar images'  # Generic query for similar images
        }

        # Make the API request
        response = requests.get(base_url, params=params)
        
        # Check if request was successful
        if response.status_code == 200:
            results = response.json().get('items', [])
            
            # Process and return image results
            processed_results = []
            for idx, item in enumerate(results):
                processed_results.append({
                    'index': idx,
                    'title': item.get('title', ''),
                    'link': item.get('link', ''),
                    'image_url': item.get('image', {}).get('thumbnailLink', ''),
                    'source': item.get('displayLink', '')
                })
            
            return processed_results
        else:
            raise Exception(f"API request failed: {response.status_code} - {response.text}")
    
    except Exception as e:
        print(f"Error in reverse image search: {e}")
        raise

async def reverse_image_search_with_custom_api(
    file: UploadFile, 
    api_key: str, 
    search_engine_id: str, 
    max_results: int = 10
) -> Dict:
    """
    Async method to handle reverse image search using Custom Search API
    
    :param file: Uploaded file
    :param api_key: Google Custom Search API key
    :param search_engine_id: Google Custom Search Engine ID
    :param max_results: Maximum number of results to return
    :return: Dictionary with search results
    """
    file_path = None
    try:
        # Save the uploaded image temporarily
        file_path = await save_uploaded_image(file)

        # Perform reverse image search
        search_results = perform_google_custom_image_search(
            api_key, 
            search_engine_id, 
            file_path, 
            max_results
        )

        return {
            "message": f"Successfully performed reverse image search for '{file.filename}'",
            "total_results": len(search_results),
            "results": search_results
        }
    except Exception as e:
        print(f"Error in reverse image search: {e}")
        raise
    finally:
        # Ensure temporary file is removed
        if file_path:
            await remove_uploaded_image(file_path)

async def scroll_to_bottom(page):
    """Scroll to the bottom of the web page using Playwright."""
    print("Scrolling...")
    previous_height = await page.evaluate("document.body.scrollHeight")
    while True:
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await asyncio.sleep(1)
        new_height = await page.evaluate("document.body.scrollHeight")
        if new_height == previous_height:
            break
        previous_height = new_height
    print("Reached the bottom of the page.")

async def scrape_google_images(search_query="macbook m3", max_images=10):
    """Scrape images from Google Images for a given search query."""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        query_params = urlencode({"q": search_query, "tbm": "isch"})
        search_url = f"https://www.google.com/search?{query_params}"

        print(f"Navigating to search URL: {search_url}")
        await page.goto(search_url)
        await scroll_to_bottom(page)

        image_elements = await page.query_selector_all('img')
        print(f"Found {len(image_elements)} image elements on the page.")

        image_data_list = []

        for idx, image_element in enumerate(image_elements):
            if max_images is not None and len(image_data_list) >= max_images:
                break
            img_url = await image_element.get_attribute("src")
            if img_url:
                image_data = {
                    "image_url": img_url,
                }
                image_data_list.append(image_data)

        await browser.close()
        return image_data_list

async def save_uploaded_image(file):
    """Save the uploaded file to a temporary location."""
    os.makedirs('temp', exist_ok=True)
    file_path = f"temp/{file.filename}"

    async with aiofiles.open(file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)

    return file_path

async def remove_uploaded_image(file_path):
    """Remove the uploaded image from the temporary location."""
    os.remove(file_path)

def upload_to_google_lens(file_path):
    """Upload an image to Google Lens and return the cleaned response data."""
    search_url = 'https://lens.google.com/v3/upload?hl=en-GB'

    with open(file_path, 'rb') as image_file:
        files = {'encoded_image': image_file}
        response = requests.post(search_url, files=files)

    if response.status_code == 200:
        # Use Beautiful Soup to parse the returned HTML
        soup = BeautifulSoup(response.text, 'html.parser')

        # Example: Extract links to similar images or any other relevant data
        # You'll need to tailor these selectors based on the actual HTML structure returned by Google Lens
        result_links = []
        for link in soup.find_all('a'):
            href = link.get('href', '')
            if "image" in href:  # Modify this condition based on what you need
                result_links.append(href)

        return {
            "result_links": result_links,
            "raw_html": response.text,  # You can also include raw HTML if needed
        }
    else:
        raise Exception(f'Failed to upload image to Google Lens. Status: {response.status_code}, Response: {response.text}')