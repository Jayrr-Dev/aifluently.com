import scrapy
from PIL import Image
import io
from selenium import webdriver
import os
from urllib.parse import urlparse

# Replace with your own path
driver = webdriver.Chrome()


class FutureToolsSpider(scrapy.Spider):
    name = "futuretools"
    start_urls = [
        "https://www.futuretools.io/?d34f6f6e_page=1",
    ]

    def parse(self, response):
        for tool in response.css(".tool"):
            # Extract the link to follow
            link = tool.css(".tool-item-new-window---new::attr(href)").get()
            if link:
                # If a link exists, make a request to it, passing the current tool data along
                yield response.follow(link, self.parse_tool_link, meta={'tool': tool})
            else:
                # If no link, just yield the tool data as is
                yield self.extract_tool_data(tool)

        # Pagination logic to follow the next page
        next_page_url = self.get_next_page_url(response)
        if next_page_url:
            yield response.follow(next_page_url, self.parse)

    def parse_tool_link(self, response):
        tool = response.meta['tool']
        actual_url = response.url
        driver.get(actual_url)

        # Taking a screenshot
        screenshot_data = driver.get_screenshot_as_png()

        # Extract the tool's title and sanitize it to use as filename
        title = tool.css(".tool-item-link---new::text").get(
            default="screenshot").replace(" ", "").replace("/", "_").replace("\\", "_")
        filename = f"{title}_screenshot.webp"

        # Ensure the "screenshots" directory exists
        screenshots_dir = 'screenshots'
        os.makedirs(screenshots_dir, exist_ok=True)
        screenshot_path = os.path.join(screenshots_dir, filename)

        # Save the screenshot
        image = Image.open(io.BytesIO(screenshot_data))
        image.save(screenshot_path, 'WEBP')

        # Update the tool data
        tool_data = self.extract_tool_data(tool)
        tool_data['link'] = self.update_referral(actual_url, 'aifluently.com')
        tool_data['image'] = os.path.join(
            screenshots_dir, filename)  # Relative link to the image
        yield tool_data

    def extract_tool_data(self, tool):
        # Centralized tool data extraction logic
        return {
            "title": tool.css(".tool-item-link---new::text").get(),
            "highlight": tool.css(".tool-item-description-box---new::text").get(),
            "link": tool.css(".tool-item-new-window---new::attr(href)").get(),
            "tags": tool.css(".collection-list-wrapper-9 .text-block-53::text").get(),
            "image": tool.css(".tool-item-image---new::attr(src)").get(),
        }

    def update_referral(self, url, new_referral):
        # Check if '?ref=' is in the URL, then replace the existing referral with the new one
        if '?ref=' in url:
            base_url, current_referral = url.split('?ref=')
            return f"{base_url}?ref={new_referral}"
        else:
            # If '?ref=' is not in the URL, just append the new referral
            return f"{url}?ref={new_referral}"

    def get_next_page_url(self, response):
        tools_exist = response.css(".tool").get()
        if tools_exist:
            current_page_number = int(response.url.split('=')[-1])
            next_page_number = current_page_number + 1
            return response.url.split('=')[0] + '=' + str(next_page_number)
