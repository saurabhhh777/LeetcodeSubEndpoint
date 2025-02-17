# LeetCode Submission Endpoint

## Overview
This repository provides an API endpoint to fetch LeetCode submission data on a date-wise basis. Users can check whether the API is working and retrieve submission details by hitting the provided endpoints.

## Base URL

https://leetcode-sub-endpoint.vercel.app/



### Base URL Check
To verify if the endpoint is active, simply visit the base URL:

![Image](https://github.com/user-attachments/assets/e58f8f00-91c6-48ea-94f9-23bc12babcc4)

## API Endpoint

### Fetch User Submissions
To get a user's date-wise LeetCode submission count, use the following endpoint:

GET -  https://leetcode-sub-endpoint.vercel.app/leetcode/:username



Replace `:username` with the actual LeetCode username. The response will contain data indicating how many submissions the user made on each date.

### Example Response
```json
{
  "2024-02-10": 5,
  "2024-02-11": 2,
  "2024-02-12": 8
}
```


### Example Screenshot
Here’s how the response looks when checking a LeetCode user’s submission data:

![Image](https://github.com/user-attachments/assets/daf8b4a2-5a0c-48e6-ada8-2ba8b59f0f08)

![Image](https://github.com/user-attachments/assets/4e8e59a0-1e1e-4f71-8640-0f54dc25786a)
