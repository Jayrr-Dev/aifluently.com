import scrapy
import json


class ToolDirectorySpider(scrapy.Spider):
    name = "tooldirectory"

    # Starting with page 1
    api_url = 'https://striking-kindness-e0d93214bb.strapiapp.com/api/tools?populate[image]=true&populate[logo]=true&populate[categories][filters][id][$gt]=0&pagination[page]={page}&pagination[pageSize]=15&sort[]=likes:desc&sort[]=createdAt:desc'
    page_number = 1

    def start_requests(self):
        # Make the first request
        yield scrapy.Request(url=self.api_url.format(page=self.page_number), callback=self.parse)

    def parse(self, response):
        # Convert the response to JSON
        data = json.loads(response.text)

        # Extracting the data
        for item in data.get('data', []):
            yield {
                'id': item.get('id'),
                'name': item.get('name'),
                'description': item.get('description'),
                'url': item.get('visitUrl'),
                'highlights': item.get('shortDescription'),
                'rating': item.get('rating'),
                'slug': item.get('slug'),
                'pricingModel': item.get('pricingModel'),
                'tags': item.get('tags'),
                'videoLinks': item.get('carouselVideoLinks'),
                'image': item.get('image').get('url'),
                'logo': item.get('logo').get('url'),
                # Add more fields as needed
            }

        # Check if there is a next page using pagination metadata
        page_count = data.get('meta', {}).get(
            'pagination', {}).get('pageCount', 0)
        if self.page_number < page_count:
            self.page_number += 1
            next_page = self.api_url.format(page=self.page_number)
            yield scrapy.Request(next_page, callback=self.parse)
