# KI-Labs software engineering assesment

## Prerequisites

### Dependencies

* [Node JS](https://nodejs.org/en/)
* [json-server](https://www.npmjs.com/package/json-server)

### Installation

- Run `npm install` or `yarn` to install the project dependencies.
- Install `json-server`
```
yarn global add json-server
```

### Launch
```
yarn run db - start the dev db server
```

This will start the `json-server` instance on port 5000. Default data (the one in the assesment document) is already inserted in the `database/db.json` file.

```
yarn run dev - start the dev server
```

This will start the development server (`expressjs`) on port 5000.

## API

### Candidates

```
GET ~/candidates - get the list of candidates
```
- `page` - query - page number
- `limit` - query - entries per page

```
GET ~/candidates/:candidate_id - get a candidate by ID
```
- `candidate_id` - path - candidate ID

```
POST ~/candidates - add a new candidate
```
- `name` - formData - name of the candidate

```
DELETE ~/candidates/:candidate_id - remove a candidate
```
- `candidate_id` - path - candidate ID

```
GET candidates/:candidate_id/availability - get the availability of a candidate
```
- `candidate_id` - path - candidate ID

```
POST candidates/:candidate_id/availability - add an availability slot to a candidate
```
- `candidate_id` - path - candidate ID

```
DELETE candidates/:candidate_id/availability/:availability_id - delete an availability slot from a candidate
```
- `candidate_id` - path - candidate ID
- `availability_id` - path - availability ID

### Interviewers
```
GET ~/interviewers - get the list of interviewers
```
- `page` - query - page number
- `limit` - query - entries per page

```
GET ~/interviewers/:interviewer_id - get a interviewer by ID
```
- `interviewer_id` - path - interviewer ID

```
POST ~/interviewers - add a new interviewer
```
- `name` - formData - name of the interviewer

```
DELETE ~/interviewers/:interviewer_id - remove an interviewer
```
- `interviewer_id` - path - interviewer ID

```
GET interviewers/:interviewer_id/availability - get the availability of an interviewer
```
- `interviewer_id` - path - interviewer ID

```
POST interviewers/:interviewer_id/availability - add an availability slot to an interviewer
```
- `interviewer_id` - path - interviewer ID

```
DELETE interviewers/:interviewer_id/availability/:availability_id - delete an availability slot from an interviewer
```
- `interviewer_id` - path - interviewer ID
- `availability_id` - path - availability ID

### Availability
```
GET ~/availability - get availability slots for interviewing
```
- `candidate_id` - query - candidate ID
- `interviewers_ids` - query - comma separated interviewers IDs

## Database schema
The design for the entities supporting this solution are inspired by a relational DB model. Here we have tables (entities) and relations between them.

### `candidates`
Same as above, each candidate has the `id` and `name` properties.

### `interviewers`
Each interviewer has the `id` and `name` properties.

### `candidates_availability`
This entity links availability slots to candidates. Each entry contains the following properties:
- `id` - the unique ID of this entry (key).
- `candidate_id` - the ID of the candidate.
- `from` - first day (`YYYY-MM-DD`) of the availability.
- `to` - last day (`YYYY-MM-DD`) of the availability instance.
- `start` - starting for each day (`HH:mm`).
- `end` - ending hour for each day (`HH:mm`).
- `days` - an array with the days (names) within the interval.

### `interviewers_availability`
This entity links availability slots to interviewers. Each entry contains the following properties:
- `id` - the unique ID of this entry (key).
- `interviewer_id` - the ID of the interviewer.
- `from` - first day (`YYYY-MM-DD`) of the availability.
- `to` - last day (`YYYY-MM-DD`) of the availability instance.
- `start` - starting for each day (`HH:mm`).
- `end` - ending hour for each day (`HH:mm`).
- `days` - an array with the days (names) within the interval.

There is certainly many ways to design the entities for a calendar app. Handling recurring events, deleted instances, etc. can become a little tricky. Model above is meant to be simple. With it we represent the specs for this particular problem clearly and concise.

## Unit testing
The project contains unit tests covering the implementation of the `AvailabilityHelper` class. Please use:

```
yarn run test
```

## Note to reviewers

I certainly spent more than 4-5 hours while working on this challenge. Only creating the `expressjs` blueprint with the API endpoints took me around that time. The other challenge was finding availability slots out of the interception of candidates and interviewers (`AvailabilityHelper` class).

I also tried to pay attention to documentation, uniformity of code and unit tests.
