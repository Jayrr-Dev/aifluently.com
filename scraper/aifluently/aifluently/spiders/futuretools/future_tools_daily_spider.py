
import scrapy


class FutureToolsDailySpider(scrapy.Spider):
    name = "futuretoolsdaily"
    start_urls = [
        "https://www.futuretools.io/newly-added",
    ]

    def parse(self, response):
        for quote in response.css(".tool"):
            yield {
                "title": quote.css(".tool-item-link---new::text").get(),
                "highlight": quote.css(".tool-item-description-box---new::text").get(),
                "link": quote.css(".tool-item-new-window---new::attr(href)").get(),
                "tags": quote.css(".collection-list-wrapper-9 .text-block-53::text").get(),
                "image": quote.css(".tool-item-image---new::attr(src)").get(),
            }
