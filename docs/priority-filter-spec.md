# Priority Filter Specification

## Goal
Help managers quickly focus on equipment requests by displaying only requests with a selected priority, using the priority data already stored by Exercise 5.

## User Need
A manager wants to switch between all requests and requests marked High, Normal, or Low without losing or changing any saved request.

## Functional Rules
1. Show a labeled **Filter by priority** control above the equipment request list, with choices **All, High, Normal, Low**.
2. Default the filter to **All** whenever the page loads.
3. When a priority is selected, show only requests with that priority; **All** shows every request. Keep the existing newest-first order.
4. Treat previously saved requests that have no priority as **Normal**, as the Exercise 5 storage loader already does.
5. Filtering is a display-only action. It must not delete, edit, or rewrite requests in localStorage.
6. If there are saved requests but none match the filter, display a clear **No requests match this priority** message; if there are no saved requests, keep the existing **No requests yet** message.
7. Show how many requests are currently visible and how many are saved. New requests should still be saved normally; the current filter determines whether a new request appears in the list.

## Constraints
- Use the existing HTML, CSS, and JavaScript modules. No frameworks, login, backend, database, or external services.
- Preserve all previously saved requests and all Exercise 5 priority choices and validation.
- Keep the filter labeled and keyboard accessible; do not render user-provided text as HTML.

## Acceptance Criteria
- **AC-01:** On first opening or refreshing the page, the priority filter shows **All** and every saved request is visible.
- **AC-02:** With saved High, Normal, and Low requests, selecting each priority displays only the corresponding requests, in the existing newest-first order.
- **AC-03:** Selecting **All** after filtering restores every saved request.
- **AC-04:** When no saved requests match the selected priority, the page displays **No requests match this priority** instead of an empty table.
- **AC-05:** A previously saved request without a priority is displayed under **Normal** and under **All**.
- **AC-06:** Changing the filter does not change localStorage or delete any requests. Reloading the page restores the saved requests.
- **AC-07:** Adding a request still works while a filter is active. The new request is saved; it is visible only when its priority matches the selected filter or when **All** is selected.

## Out of Scope
- Changing priority values, sorting options, authentication, server storage, deleting requests, advanced search, and database work.

## Verification Results
Record **Pass** or **Fail** for each acceptance criterion after testing the running application. Do not mark a browser test as passed until it has actually been checked.

| Criterion | Result | Evidence |
| --- | --- | --- |
| AC-01 | Pending | Browser check |
| AC-02 | Pending | Browser check |
| AC-03 | Pending | Browser check |
| AC-04 | Pending | Browser check |
| AC-05 | Pending | Legacy-data browser check |
| AC-06 | Pending | Browser/localStorage check |
| AC-07 | Pending | Browser check |
