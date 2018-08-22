# EAI Technical Assessment

**Node port can be changed in app.js**

**Elasticsearch port can be changed in elasticsearch.js**

## Completed Features

- GET /contact
- POST /contact
- GET /contact/{name}
- PUT /contact/{name}
- delete /contact/{name}

## Incomplete Features and Bugs

- GET /contact does not account for query parameters (?pageSize={}&page={}&query={})
- POST /contact does not handle duplicates
- POST /contact does not validate empty strings
- PUT /contact/{name} does not validate empty strings
- Because of duplicates, PUT and DELETE both update/delete all instances of the matched query
- Mocha tests sometimes fails for PUT and DELETE, possibly due to asynchronous before() method that doesn't complete before the test methods run

## Extra Info

- I had no prior knowledge of any part of the tech stack, and no prior experience writing APIs
- This took around 20-22 hours of work including doing tutorials for express and elastic search
- Used very simple contact definition to focus more on functionality since this was all new
- It was a bit hard to find resources for elasticsearch.js resources online that weren't deprecated
- Mocha tests are very basic tests that just check for HTTP status code

## References

- https://blog.manifold.co/leveraging-the-power-of-elasticsearch-autocomplete-and-fuzzy-search-1d491d3e0b38
- https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
- Stackoverflow
- Elastic Search API
- Express API
- Chai API
