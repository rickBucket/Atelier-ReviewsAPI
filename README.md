
# ReviewsAPI
API serving review data for Atelier retail portal.

# Technologies Used
1. MySQL
2. Node/Express.js
3. AWS (EC2 and S3)
4. Loader.io

# Requests

| Request  | Route | Parameters | Return |
| ------------- | ------------- | ------------- | ------------- |
| GET | / | product_id: Number,<br>sort: <'newest' \| 'helpful' \| default>,<br>count: Number,<br>page: Number | {<br>product: Number,<br>page: Number,<br>count: Number,<br>results: {<br>--- review_id: Number,<br>--- rating: Number,<br>--- summary: String,<br>--- recommend: Boolean,<br>--- response: String,<br>--- body: String,<br>--- date: Date,<br>--- reviewer_name: String,<br>--- helpfulness: Number,<br>--- photos: [URLS]<br> -  }<br>} |
| GET | /meta | product_id: Number | {<br>product_id: Number,<br>ratings: Number,<br>recommended: Number,<br>characteristics: { <char_id>: Number }<br>} |
| POST | / | product_id: Number,<br>rating: Number,<br>summary: String,<br>body: String,<br>recommend: Boolean,<br>name: String,<br>email: String,<br>photos: [String],<br>characteristics: { char_id: Number } | - |
| PUT | /:review_id/helpful | - | - |
| PUT | /::review_id/report | - | - |


<img width="924" alt="Screen Shot 2021-05-19 at 2 55 36 PM" src="https://user-images.githubusercontent.com/13191334/118889681-4e2a0c00-b8b2-11eb-945e-e6535d6325c6.png">

