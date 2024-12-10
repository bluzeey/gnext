import asyncio
import json
import os
import shutil
from aiohttp import ClientSession, ClientTimeout
from urllib.parse import urlparse, urlencode
from playwright.async_api import async_playwright

def extract_domain(url):
    """Extract the domain from a given URL."""
    domain = urlparse(url).netloc
    return domain[4:] if domain.startswith("www.") else domain

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

async def scrape_google_images(search_query="macbook m3", max_images=10, timeout_duration=10):
    """Scrape images from Google Images for a given search query."""
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)  # Use headless mode for the server
        page = await browser.new_page()

        query_params = urlencode({"q": search_query, "tbm": "isch"})
        search_url = f"https://www.google.com/search?{query_params}"

        print(f"Navigating to search URL: {search_url}")
        await page.goto(search_url)
        await scroll_to_bottom(page)

        image_elements = await page.query_selector_all('img')  # Get all <img> elements
        print(f"Found {len(image_elements)} image elements on the page.")

        image_data_list = []

        for idx, image_element in enumerate(image_elements):
            if max_images is not None and len(image_data_list) >= max_images:
                print(f"Reached max image limit of {max_images}. Stopping extraction.")
                break
            try:
                img_url = await image_element.get_attribute("src")  # Get image URL
                if not img_url:
                    print(f"No URL found for image element {idx + 1}")
                    continue
                
                print(f"Image URL: {img_url}")  # Debug statement for URL

                # Create a metadata object for the image
                image_data = {
                    "image_url": img_url,
                    # You can add more metadata that can be extracted here if needed
                }

                image_data_list.append(image_data)
                
            except Exception as e:
                print(f"Error processing image {idx + 1}: {e}")
                continue

        await browser.close()
        return image_data_list  # Return image data for the retrieved images