
# ReviewsAPI
API serving review data for Atelier retail portal.

# Technologies Used
- MySQL
- Node/Express.js
- AWS (EC2 and S3)
- Loader.io
- K6

# Requests

| Request  | Route | Parameters | Return |
| ------------- | ------------- | ------------- | ------------- |
| GET | / | product_id: Number,<br>sort: <'newest' \| 'helpful' \| default>,<br>count: Number,<br>page: Number | {<br>product: Number,<br>page: Number,<br>count: Number,<br>results: {<br>--- review_id: Number,<br>--- rating: Number,<br>--- summary: String,<br>--- recommend: Boolean,<br>--- response: String,<br>--- body: String,<br>--- date: Date,<br>--- reviewer_name: String,<br>--- helpfulness: Number,<br>--- photos: [URLS]<br> -  }<br>} |
| GET | /meta | product_id: Number | {<br>product_id: Number,<br>ratings: Number,<br>recommended: Number,<br>characteristics: { <char_id>: Number }<br>} |
| POST | / | product_id: Number,<br>rating: Number,<br>summary: String,<br>body: String,<br>recommend: Boolean,<br>name: String,<br>email: String,<br>photos: [String],<br>characteristics: { char_id: Number } | - |
| PUT | /:review_id/helpful | - | - |
| PUT | /::review_id/report | - | - |

# Constraints
- Under 1s response time
- Under 1% error rate

# Loader.io Results

83ms average response time at 850 requests per second with 0% error rate.

<img width="1179" alt="Screen Shot 2021-05-19 at 8 59 05 PM" src="https://user-images.githubusercontent.com/13191334/118918522-af200700-b8e7-11eb-8d23-9c1c949d2d37.png">


