# Exercise 7 — Requirements Review: Exercise 6 Priority Filter

## 1. Scope and evidence examined
- Specification: `docs/priority-filter-spec.md`
- UI markup: `index.html`
- UI behavior: `src/app.js`
- Filtering logic: `src/priority-filter.js`
- Automated tests: `tests/priority-filter.test.js`
- Existing data/storage compatibility: `src/request-store.js`
- Repository guidance: `AGENTS.md`

This review is based on static inspection of the files in branch `exercise-6-specification`. The repository was not available in a local runtime during this review, so no test command or browser session was executed. No runtime test results are claimed.

## 2. Acceptance criteria review

| Criterion | Status | Evidence | Review |
|---|---|---|---|
| AC-01: Filter defaults to All and displays all saved requests | Partially satisfied | `index.html` filter options; `src/app.js` initialization and `renderRequests()` | The first option is All and the change handler renders on load. Unit tests check default helper behavior, but do not run the browser UI or verify saved rows. |
| AC-02: Each priority displays only matching requests in newest-first order | Partially satisfied | `src/priority-filter.js`; `src/app.js`; `tests/priority-filter.test.js` | The helper filters in original array order, and storage appends newest records first. Tests assert each priority but do not verify rendered table contents or a mixed-order browser scenario. |
| AC-03: Selecting All restores every request | Partially satisfied | `src/priority-filter.js`; `tests/priority-filter.test.js` | The helper returns a shallow copy for All. Test covers helper output, not selecting All in the UI. |
| AC-04: No-match message appears when saved requests do not match | Partially satisfied | `index.html` filter-empty-state; `src/app.js` `renderRequests()`; `tests/priority-filter.test.js` | Markup and render logic implement the empty state. The test only checks that the helper returns an empty array; it does not assert the message becomes visible. |
| AC-05: Legacy requests without priority appear under Normal and All | Satisfied at data/helper level | `src/request-store.js` legacy normalization; `src/priority-filter.js`; `tests/priority-filter.test.js` | Storage loading supplies Normal for legacy records, and the helper also treats missing priority as Normal. A UI/browser check remains useful. |
| AC-06: Filtering does not alter localStorage or delete requests | Partially satisfied | `src/app.js` filter change handler and `renderRequests()`; `src/priority-filter.js`; `tests/priority-filter.test.js` | The filter path only derives a visible list and does not call `saveRequests()`. The current test checks the in-memory input is not mutated, but does not snapshot or compare localStorage before and after filtering. |
| AC-07: Adding a request while filtered saves it and displays according to filter | Partially satisfied | `src/app.js` submit handler and `renderRequests()`; `tests/priority-filter.test.js` | The submit handler saves the request and re-renders using the selected filter. The unit test tests helper behavior for a new Low request but does not exercise form submission, storage persistence, or the selected filter in the UI. |

## 3. Gaps and unsupported behavior
- The automated tests primarily exercise the pure filtering helper. They do not verify the DOM states, visible no-match message, filter selection events, visible/saved count, or actual browser persistence behavior.
- The specification's Verification Results table remains Pending for AC-01 through AC-07. This is accurate because no browser verification evidence is included in the inspected branch.
- No direct contradiction between the inspected filtering code and the functional rules was found.

## 4. Data and security concerns
- Positive evidence: filtering derives a separate visible array and does not itself write to storage; request rendering uses DOM text nodes/textContent rather than inserting request values as HTML.
- Remaining concern: AC-06's storage-preservation claim is not directly asserted by a test. A regression test should capture the stored JSON before and after filtering or simulate the filter event while monitoring storage writes.
- This static review does not establish security of the complete application or hosting environment.

## 5. Tests still needed
1. Run `npm test` in the repository and record the actual output.
2. Browser test AC-01 through AC-04 with saved High, Normal, and Low requests, including switching All -> High -> Low -> All and checking the visible table and no-match message.
3. For AC-05, load a legacy stored request without a priority and confirm it appears under Normal and All.
4. For AC-06, compare the exact localStorage value before and after changing the filter; confirm it is unchanged.
5. For AC-07, submit a new request while a filter is active; confirm it is saved and appears only when its priority matches or All is selected.
6. Check keyboard operation of the labeled select control.

## 6. Most important finding
**The current automated tests do not prove that the browser interface meets the specification.** In particular, AC-04 expects a specific no-match message and AC-06 requires that filtering leave localStorage unchanged, while the current tests only assert helper output and in-memory immutability. The markup and implementation appear to contain the intended behavior, but that is not the same as observing or testing it end to end.

## 7. Overall assessment
**Needs verification before acceptance.** The inspected implementation appears consistent with the core filter rules, and no direct functional contradiction was found. However, the verification table is still Pending and the automated tests do not cover the UI/storage behavior described above. Do not mark the feature fully verified until the listed automated and browser checks have been run and recorded.
