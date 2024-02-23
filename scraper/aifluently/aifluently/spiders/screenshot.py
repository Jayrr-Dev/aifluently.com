from selenium import webdriver
import os
import json

# Define the path to save screenshots
screenshot_folder = "path/to/screenshot_folder"
if not os.path.exists(screenshot_folder):
    os.makedirs(screenshot_folder)

# Load JSON data
data = [
    # Your JSON objects here
]

driver = webdriver.Chrome()

# Iterate through each item in the JSON data
for item in data:
    # Simplify the title for the filename
    title = item['title'].replace(' ', '_')
    url = item['link']

    try:
        driver.get(url)
        driver.save_screenshot(f"{screenshot_folder}/{title}.png")
        print(f"Screenshot saved for {title}")
    except Exception as e:
        print(f"Failed to take screenshot for {title}: {e}")

driver.quit()
