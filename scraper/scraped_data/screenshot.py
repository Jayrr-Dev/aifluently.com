from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from PIL import Image
import os
import json
import threading
import time


def interrupt_driver(driver):
    """Forcefully stops the driver if timeout is reached."""
    driver.quit()


def take_screenshot_with_timeout(driver, screenshot_path, timeout=5):
    """Attempt to take a screenshot within a given timeout period."""
    def attempt_screenshot():
        driver.save_screenshot(screenshot_path)

    screenshot_timer = threading.Timer(0, attempt_screenshot)
    screenshot_timer.start()
    screenshot_timer.join(timeout)
    if screenshot_timer.is_alive():
        print("Screenshot timer is still alive - operation took too long.")
        return False
    return True


def load_url_with_timeout(driver, url, page_load_timeout, screenshot_timeout, screenshot_path_png):
    """Attempt to load the URL and take a screenshot within given timeout periods."""
    try:
        driver.get(url)
        time.sleep(2)
        # After the page is loaded, attempt to take a screenshot with its own timeout
        if not take_screenshot_with_timeout(driver, screenshot_path_png, screenshot_timeout):
            print(f"Failed to take screenshot in time for {url}")
            return False
    except TimeoutException:
        print(f"Timeout reached while loading {url}")
        return False
    return True


options = Options()
options.headless = True

# Ensure the screenshots folder exists
screenshot_folder = "./screenshots"
if not os.path.exists(screenshot_folder):
    os.makedirs(screenshot_folder)

# Load JSON data
json_file_path = './ft.json'
with open(json_file_path, 'r') as file:
    data = json.load(file)

cleaned_data = []

for i, item in enumerate(data):
    try:
        # Reinitialize driver for each URL
        driver = webdriver.Chrome(options=options)
        title = item['title'].replace(' ', '_')
        url = item['link']
        screenshot_path_png = os.path.join(screenshot_folder, f"{title}.png")
        screenshot_path_webp = os.path.join(screenshot_folder, f"{title}.webp")

        # Page load timeout, Screenshot timeout
        if load_url_with_timeout(driver, url, 10, 5, screenshot_path_png):
            print(f"Successfully processed {title}")
            print(f"{i}/{len(data)}")
            # Convert and save WEBP, update `cleaned_data`, remove PNG as before
            with Image.open(screenshot_path_png) as img:
                img.save(screenshot_path_webp, "WEBP")
            item['image'] = screenshot_path_webp
            cleaned_data.append(item)
            os.remove(screenshot_path_png)
        else:
            print(f"Failed or timed out for {title}")

        driver.quit()
    except Exception as e:
        print(f"Failed to process {title} due to {e}")
        continue

# Save the cleaned data to a new JSON file
new_json_file_path = './cleaned_ft.json'
with open(new_json_file_path, 'w') as new_file:
    json.dump(cleaned_data, new_file, indent=4)

print("Cleaned JSON data saved to", new_json_file_path)
