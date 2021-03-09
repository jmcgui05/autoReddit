# autoReddit

## An application to expose an API
The expected functionality is:

* Create and update users (complete)
* Creating and updating a users favorite subreddits (complete)
* Setting the newsletter time (complete)
* Enabling/disabling the newsletter per user (complete)
* Triggering the sending of the newsletter at each users specific time (Incomplete)

## Instructions to test

* Make sure you have Postgres installed locally.
* Using the cli, run a createdb command to create a dtabase named `reddit-users`
* At the root of the project, run `npm install`
* Run `node index.js`
* Verify that the console has created the table and the approapriate schema.
* Using Postman, we can test our endpoints:
  * To create a user, POST a request to `localhost:8080/users`, providing the required parameters in the `x-www-form-urlencoded` section
  * Verify the user was created
  * Update the users subreddits, email_time or email_enabled property by hitting the appropriate endpoint, adding the user id as a string param:
    * `localhost:8080/users/subreddits/<ID>`
    * `localhost:8080/users/email_time/<ID>`
    * `localhost:8080/users/email_enabled/<ID>`

## Improvements to be made

### Complete api.js
The reddit api implementation is not functional. I need some more time to figure out why my call to `snoowrap.getSubReddit` just returns the name. I cannot retrieve any other data in my current state, and do not get any error. 

### Implement auto scheduling of the emails
I wanted to use something like `node-schedule` to basically have a scheduler.js file located in the services directory. I would have liked to implement the following:

* Scheduler creates a job per user
* The job is configured to use the users `email_time` param as values for the cron, by splitting on `:`. Example, `11:00` would give us the hour and minute to send the email each day.
* Each job would run on this schedule until the email_enabled is set to false, which would result in a job.cancel call
* The scheduler would be initiated in the index.js file as the jobs would need to be recreated in the event the server is restarted.