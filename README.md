# KI-Labs software engineering assesment

## Prerequisites

### Dependencies

* [Node JS](https://nodejs.org/en/)
* [json-server](https://www.npmjs.com/package/json-server)

### Installation

- Run `npm install` or `yarn` to instal the projects dependencies.
- Install and start `json-server`
```
npm install -g json-server && json-server --watch database/db.json --port [port]
```

## API


## Schemas

Both `interviewer` and `candidate` entities contain an `availability` collection. Each availability instance describes a particular availabilty slot and contains the following properties:
- `id` - The unique ID of this instance relative to the parent entity.
- `from` - First day (`YYYY-MM-DD`) of the availability.
- `to` - Last day (`YYYY-MM-DD`) of the availability instance.
- `start` - Starting for each day (`HH:mm`).
- `end` - Ending hour for each day (`HH:mm`).
- `days` - An array with the days (names) withing the interval.

There is certainly many ways to design the entities for a calendar app. Handling recurring events, deleted instances, etc. can become a little tricky. Model above is meant to be simple. With it we can easily represent the specs for this particular problem clearly and concise.

### Interviewer

Each interviewer has the `id`, `name` and `availability` properties. `availability` is an array where instances describe a particular slot reserved by this interviewer.

### Candidate

Same as above, each candidate has the `id`, `name` and `availability` properties. `availability` is an array where instances describe a particular slot reserved by this candidate.
