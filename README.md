**Overview:**

This API allows users to register and sign in with an account. Once they are signed in and receive a JWT they will be able to run the execute the following actions

1. Request a borrow
2. Create a Listing
3. Modify their profile

**Getting Started:**

**How to check condition of the API:**

To see if the server is up and running make a get request to the url [https://use-my-tools.herokuapp.com/api](https://use-my-tools.herokuapp.com/api) it should return &quot;it&#39;s working!&quot; if the server is up if you don&#39;t get that message the server could be down.

**First Steps:**

Since most endpoints in this api require you to have a JWT to use. Make an account and login first.

**How to register:**

In order to register an account with our API you will need to make a POST request to the url [https://use-my-tools.herokuapp.com/api/auth/register](https://use-my-tools.herokuapp.com/api/auth/register) (example post request below) with required fields being password [string], first_name [string], last_name [string], and email [string]

-Example Request:

Let ex_data = {password: &quot;test&quot;, first_name: &quot;billy&quot;, last_name: &quot;bob&quot;, email : &quot;me@example.com&quot;}

axios.post(&#39;[https://use-my-tools.herokuapp.com/api/auth/register](https://use-my-tools.herokuapp.com/api/auth/register)&#39;, ex_data)

.then(do something if it succeeds)

.catch(error message)

**How to log in:**

To log in with a previously made account use a post request to the url [https://use-my-tools.herokuapp.com/api/auth/login](https://use-my-tools.herokuapp.com/api/auth/login) sending in the body the users email [string] and the users password [string] (example request below). If the credentials are correct you will be returned a JWT to use for future requests.

-Example Request:

Let ex_data = {password: &quot;test&quot;, email : &quot;me@example.com&quot;}

axios.post(&#39;[https://use-my-tools.herokuapp.com/api/auth/login](https://use-my-tools.herokuapp.com/api/auth/login), ex_data)

.then(We suggest saving the JWT returned in local storage)

.catch(error message)

**API Calls:**

All these require an authorization header in the form of -\&gt; authorization : your_token

**GET:**

**To get all tools in database**

URL **:** [https://use-my-tools.herokuapp.com/api/tools/](https://use-my-tools.herokuapp.com/api/tools/)

Example Request :

axios.get(URL, {headers: {authorization: your_token}})

.then(do something)

.catch();

**To get a single tool by it&#39;s id**

URL **:** [https://use-my-tools.herokuapp.com/api/tools/:id](https://use-my-tools.herokuapp.com/api/tools/:id)

Note : Make sure to pass in a number for the :id

Example Request :

axios.get(URL, {headers: {authorization: your_token}})

.then(do something)

.catch();

**To get all lent tools**

URL **:** [https://use-my-tools.herokuapp.com/api/lent-tools/](https://use-my-tools.herokuapp.com/api/lent-tools/)

Example Request :

axios.get(URL, {headers: {authorization: your_token}})

.then(do something)

.catch();

**To get lent tool by id**

URL **:** [https://use-my-tools.herokuapp.com/api/lent-tools/:id](https://use-my-tools.herokuapp.com/api/lent-tools/:id)

Note : Make sure to pass in a number for the :id

Example Request :

axios.get(URL, {headers: {authorization: your_token}})

.then(do something)

.catch();

**POST:**

**To add a tool**

URL **:** [https://use-my-tools.herokuapp.com/api/tools/](https://use-my-tools.herokuapp.com/api/tools/)

EX_DATA : {name:&quot;test&quot;, photo_url:&quot;url.com&quot;, price:3.22, lender_id:2}

Example Request :

axios.post(URL,EX_DATA, {headers: {authorization: your_token})

.then(do something)

.catch();

**To add a lent tool**

URL **:** [https://use-my-tools.herokuapp.com/api/lent-tools/](https://use-my-tools.herokuapp.com/api/lent-tools/)

EX_DATA : {borrower_id : 7, tool_id : 13}

Example Request :

axios.post(URL,EX_DATA, {headers: {authorization: your_token}})

.then(do something)

.catch();

**PUT:**

**Edit a tools field by id**

URL **:** [https://use-my-tools.herokuapp.com/api/tools/:id](https://use-my-tools.herokuapp.com/api/tools/:id)

EX_DATA : {}

Example Request:

axios.put(URL, {...EX_DATA}, {headers: {authorization: your_token}})

.then(do something)

.catch();

**DELETE:**

**Delete a tool by id**

URL **:** [https://use-my-tools.herokuapp.com/api/tools/:id](https://use-my-tools.herokuapp.com/api/tools/:id)

Example Request:

axios.delete(URL, {headers: {authorization: your_token}})

.then(do something)

.catch();

**Statuses and what to Expect:**

**GET:**

**To get all tools in database**

URL **:** [https://use-my-tools.herokuapp.com/api/tools/](https://use-my-tools.herokuapp.com/api/tools/)

**Status 200** : You will receive an object that contains an array of tool objects.{[{tools}, {tools}]}

**Status 401** : You will receive a message stating &quot;no record of this account&quot;. Most likely this is because your JWT has expired or you have not signed in yet

**Status 500** : You will receive an error message, it&#39;s possible that the server is down

**To get a single tool by it&#39;s id**

URL **:** [https://use-my-tools.herokuapp.com/api/tools/:id](https://use-my-tools.herokuapp.com/api/tools/:id)

**Status\*\*** 200\*\*: You should receive a single tool object

**Status 401** : You will receive a message stating &quot;no record of this account&quot;. Most likely this is because your JWT has expired or you have not signed in yet

**Status 404** : Tool with specified id was not found

**Status 500** : You will receive an error message, it&#39;s possible that the server is down

**To get all lent tools**

URL **:** [https://use-my-tools.herokuapp.com/api/lent-tools/](https://use-my-tools.herokuapp.com/api/lent-tools/)

**Status 200** : You will receive an array of lent-tool objects.{[{tool}, {tool}]}

**Status 401** : You will receive a message stating &quot;no record of this account&quot;. Most likely this is because your JWT has expired or you have not signed in yet

**Status 500** : You will receive an error message, it&#39;s possible that the server is down

**To get lent tool by id**

URL **:** [https://use-my-tools.herokuapp.com/api/lent-tools/:id](https://use-my-tools.herokuapp.com/api/lent-tools/:id)

**Status\*\*** 200\*\*: You should receive a single lent-tool object

**Status 401** : You will receive a message stating &quot;no record of this account&quot;. Most likely this is because your JWT has expired or you have not signed in yet

**Status 404** : Tool with specified id was not found

**Status 500** : You will receive an error message, it&#39;s possible that the server is down

**POST:**

**To add a tool**

URL **:** [https://use-my-tools.herokuapp.com/api/tools/](https://use-my-tools.herokuapp.com/api/tools/)

**Status 201:** The request went through, you should receive the id of the inserted tool inside an object {43}

**Status 400:** If you get this status that means all required field of the request were not present make sure you have {name, price, lender_id} all passed in

**Status 500:** You will receive an error message, it&#39;s possible that the server is down

**Status 401:** You will receive a message stating &quot;no record of this account&quot;. Most likely this is because your JWT has expired or you have not signed in yet

**To add a lent tool**

URL **:** [https://use-my-tools.herokuapp.com/api/lent-tools/](https://use-my-tools.herokuapp.com/api/lent-tools/)

**Status 201:** The request went through, you should receive the id of the inserted lent-tool inside an object {43}

**Status 400:** If you get this status that means all required field of the request were not present make sure you have {borrower_id, lender_id} all passed in

**Status 500:** You will receive an error message, it&#39;s possible that the server is down

**Status 401:** You will receive a message stating &quot;no record of this account&quot;. Most likely this is because your JWT has expired or you have not signed in yet

**PUT:**

**Edit a tools field by id**

URL **:** [https://use-my-tools.herokuapp.com/api/tools/:id](https://use-my-tools.herokuapp.com/api/tools/:id)

**Status 201:** The request went through

**Status 400:** If you get this status that means all required field of the request were not present make sure you have {name, price, lender_id} all passed in

**Status 500:** You will receive an error message, it&#39;s possible that the server is down

**Status 401:** You will receive a message stating &quot;no record of this account&quot;. Most likely this is because your JWT has expired or you have not signed in yet

**DELETE:**

**Delete a tool by id**

URL **:** [https://use-my-tools.herokuapp.com/api/tools/:id](https://use-my-tools.herokuapp.com/api/tools/:id)

**Status 200:** The request went through you will receive a message stating &quot;tool has been deleted!&quot;

**Status 500:** You will receive an error message, it&#39;s possible that the server is down

**Status 401:** You will receive a message stating &quot;no record of this account&quot;. Most likely this is because your JWT has expired or you have not signed in yet

**Status 404:** You will receive this message if you gave an id that did not exist

**Field Reference / Data types:**

Any item with a **\*** before declaration is required in the body if sending / all fields are sent to client if receiving.

For Users

- Id [int]
- \*first_name [string]
- \*last_name [string]
- \*password [string]
- \*email [string]
- photo_url [string]

For Tools

- id [int]
- \*name [string]
- photo_url [string]
- \*price [decimal]
- \*lender_id [int]

For Lent Tools

- id [int]
- \*borrower_id [int]
- \*tool_id [int]
- Timestamp [no need to specify this]

**Frequently Asked Questions:**

Question: Are these endpoints tested?

Answer: Yes, each endpoint is tested using unit tests

**Contact Us:**

GitHub : Back End Engineer - [https://github.com/olivia-osborn](https://github.com/olivia-osborn)
