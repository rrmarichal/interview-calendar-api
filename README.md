# Build an interview calendar API.

There are two roles that are supposed to use the calendar API, a candidate and an interviewer. The following shows a typical use case of the API:

- An interview slot is a 1-hour period of time that spreads from the beginning of any hour until the beginning of the next hour. For example, a time span between 9 a.m. and 10 a.m. is a valid interview slot, whereas a time span between 9:30 a.m. and 10:30 a.m. is not.

- Each interviewer sets their own availability slot. For example, the interviewer Philipp is available next week each day from 9 a.m. through 4 p.m. without breaks and the interviewer Sarah is available from 12 p.m. to 6 p.m. on Monday and Wednesday next week, and from 9 a.m. to 12 p.m. on Tuesday and Thursday.

- Each candidate sets their own requested slots for the interview. For example, the candidate Carl is available for the interview from 9 a.m. to 10 a.m. any weekday next week and from 10 a.m. to 12 p.m. on Wednesday.

- Anyone may then query the API to get a collection of periods of time that indicate possible slots to arrange an interview for a particular candidate and one or more interviewers. In this example, if the API is queried for the candidate Carl and the interviewers Philipp and Sarah, the response should be a collection of 1-hour slots: from 9 a.m. to 10 a.m. on Tuesday, from 9 a.m. to 10 a.m. on Thursday.

# Prerequisites

## Dependencies

* [Node JS](https://nodejs.org/en/)
* [json-server](https://www.npmjs.com/package/json-server)

## Installation

- Run `npm install` or `yarn` to install the project dependencies.
- Install `json-server`
```
yarn global add json-server
```

## Launch
```
yarn run db - start the dev db server
```

This will start the `json-server` instance on port 5000. Default data from the example above is already inserted in the `database/db.json` file.

```
yarn run dev - start the dev server
```

This will start the development server (`expressjs`) on port 5000.

# API

## Candidates

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

## Interviewers
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

## Availability
```
GET ~/availability - get availability slots for interviewing
```
- `candidate_id` - query - candidate ID
- `interviewers_ids` - query - comma separated interviewers IDs

# Database schema
The design for the entities supporting this solution are inspired by a relational DB model. Here we have tables (entities) and relations between them.

## `candidates`
Each candidate has the `id` and `name` properties.

## `interviewers`
Each interviewer has the `id` and `name` properties.

## `candidates_availability`
This entity links availability slots to candidates. Each entry contains the following properties:
- `id` - the unique ID of this entry (key).
- `candidate_id` - the ID of the candidate.
- `from` - first day (`YYYY-MM-DD`) of the availability.
- `to` - last day (`YYYY-MM-DD`) of the availability instance.
- `start` - starting for each day (`HH:mm`).
- `end` - ending hour for each day (`HH:mm`).
- `days` - an array with the days (names) within the interval.

## `interviewers_availability`
This entity links availability slots to interviewers. Each entry contains the following properties:
- `id` - the unique ID of this entry (key).
- `interviewer_id` - the ID of the interviewer.
- `from` - first day (`YYYY-MM-DD`) of the availability.
- `to` - last day (`YYYY-MM-DD`) of the availability instance.
- `start` - starting for each day (`HH:mm`).
- `end` - ending hour for each day (`HH:mm`).
- `days` - an array with the days (names) within the interval.

There is certainly many ways to design the entities for a calendar app. Handling recurring events, deleted instances, etc. can become a little tricky. Model above is meant to be simple. With it we represent the specs for this particular problem clearly and concise.

# Unit testing
The project contains unit tests covering the implementation of the `AvailabilityHelper` class. Please use:

```
yarn run test
```
