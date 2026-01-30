# Crudzaso · MatchFlow

**Match-first hiring platform**

MatchFlow is a web application developed by **Crudzaso** that rethinks the traditional recruitment process by prioritizing active talent discovery and significantly reducing hiring time.

Unlike classic job boards, MatchFlow **does not rely on candidates applying for jobs**. Instead, companies actively search for available candidates and create direct matches, simulating a fast-paced, realistic, match-driven hiring flow.

---

## Project Objective

Build a web application that allows:

### Candidates

* Create, edit, and maintain their professional profile.
* Activate or deactivate their **Open to Work** status.
* Browse job offers published by companies.
* Wait to be contacted by interested companies.

### Companies

* Create and manage their company profile.
* Publish and manage job offers.
* Search for available candidates.
* Create direct matches with candidates.
* Reserve candidates for specific job offers.
* Manage the different states of the hiring process.

The project must clearly demonstrate the **MatchFlow business rules**, along with proper usage of **state management**, **frontend caching**, **cookies**, and a **mocked backend**.

---

## System Roles

### Candidate

* Manages their own professional profile.
* Controls availability through the **Open to Work** status.
* Can view job offers published by companies.
* Cannot view other candidates’ profiles.
* Does not apply for jobs.

### Company

* Manages the company profile.
* Creates and manages job offers.
* Searches for available candidates.
* Creates direct matches.
* Reserves candidates for specific job offers.
* Manages the hiring process states.

---

## Mandatory Business Rules

### Open to Work

* A candidate is visible to companies only if **Open to Work** is active.
* If inactive, the candidate must not appear in company searches.

---

### Matches

A match is always associated with:

* One company
* One job offer
* One candidate

Only companies can create matches.

#### Minimum match states:

* `pending`
* `contacted`
* `interview`
* `hired`
* `rejected`

---

### Candidate Reservation and Locking

* A company can reserve a candidate for a specific job offer.
* While a candidate is reserved:

  * They cannot be reserved by other companies.
  * The candidate may be hidden or marked as reserved (team decision).
* Functional locking is mandatory.
* The system must allow releasing a reservation when:

  * The hiring process ends.
  * The candidate is rejected.

---

### Contact and Privacy

* Companies cannot see candidate contact information until the match reaches the `contacted` state.
* Once contacted:

  * Communication may redirect to WhatsApp, or
  * Be handled through a simple internal messaging system.

---

## Mandatory Technical Requirements

* Use **json-server** as a mocked backend.
* Consume data using the **Fetch API**.
* Implement **frontend caching** (localStorage or similar strategy).
* Correctly handle:

  * Reservation conflicts.
  * Candidate locking logic.

### SPA

* Implementing the project as an SPA is optional and left to the team’s decision.

---

## Team Organization

* Maximum of 5 members per team.
* Each team must include at least 2 members from each involved clan.

### Review and Support

* The project will be under review throughout the day.
* Teams may:

  * Ask questions to any Team Leader (TL).
  * Ask questions to any coder.
* Teams are encouraged to validate technical and business decisions during development, not only at the end.

---

## GitHub and Version Control

### Organization Setup

* Each team must create a GitHub organization for the project.
* All Team Leaders (TLs) must be invited as organization owners.
* This is mandatory for project tracking and review.

### Workflow

The project must follow **Git Flow**:

* `main`
* `develop`
* `feature/*` for new features

### Commits

* **Conventional Commits** must be used.

---

## Suggested Technologies

* HTML, CSS, JavaScript
* json-server
* Fetch API
* LocalStorage / Cookies
* Git and GitHub

---

## License

This project is intended for educational and demonstrative purposes.

# Project Structure

```
MatchFlow
|
|_Backend
  |_db.json
|
|_Frontend
  |_index.html
  |_style.css
  |_script.js
  |_modules
    |_fetch.js
    |_views.js
    |_crud.js
  |_windows
    |_admin
      |_index.html
      |_style.css
      |_script.js
    |_user
      |_index.html
      |_style.css
      |_script.js
    |_signup
      |_index.html
      |_style.css
      |_script.js
  |_.gitignore
```


## Install Json-server

```
Install in Backend directory (/Backend)
1. npm i json-server

execute in terminal in Backend directory (/Backend):
2. npx json-server db.json

```

## Authors

Santiago
Camilo
Jeronimo
Bray
Ismael