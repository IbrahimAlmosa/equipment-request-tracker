---
name: requirements-reviewer
description: Review a repository feature against its written specification before acceptance. Use when asked to check whether an implementation matches acceptance criteria, find gaps, identify unsupported behavior or data/security concerns, and list tests still needed. Read-only by default; never edit files unless the user explicitly asks for changes.
---

# Requirements Reviewer

## Purpose
Compare a feature specification with its implementation and provide an evidence-based review before the change is accepted.

## When to use
Use this workflow when a repository contains a feature specification and the user asks for a requirements review, acceptance review, or specification-to-code check. Do not use it for general code cleanup or feature implementation unless separately requested.

## Required inputs
- The specification path (normally under `docs/`).
- The implementation paths related to that specification.
- Relevant automated tests and repository instructions, when present.

If the specification or implementation cannot be found, report what is missing and stop. Do not invent requirements or infer undocumented product decisions.

## Review workflow
1. Read the complete specification, including constraints, acceptance criteria, out-of-scope items, and any verification results.
2. Read repository guidance such as `AGENTS.md` and inspect the relevant implementation files.
3. Read tests that claim to cover the acceptance criteria. Distinguish unit tests, integration tests, and manual/browser checks.
4. For every acceptance criterion, assign one status:
   - **Satisfied** — direct code or test evidence supports the behavior.
   - **Partially satisfied** — some behavior is supported, but a stated case or layer is not verified.
   - **Not satisfied** — evidence shows the behavior is missing or conflicts with the requirement.
   - **Unverified** — available source does not establish whether the behavior works.
5. Report any behavior implemented that is not required by the specification, and any missing behavior the specification requires.
6. Examine data integrity, persistence, backwards compatibility, privacy/security, access control, safe rendering, and failure states when relevant to the feature.
7. Identify the most important finding and explain its user or acceptance impact.
8. List the tests still needed. Do not claim a test was run unless you actually ran it and observed its result.

## Required output
Use these headings:
1. **Scope and evidence examined** — list specification, source files, tests, and repository instructions.
2. **Acceptance criteria review** — a table with criterion, status, evidence path/line, and explanation.
3. **Gaps and unsupported behavior** — distinguish missing implementation from insufficient evidence.
4. **Data and security concerns** — explain only concerns supported by inspected evidence; say when none were identified or when review was limited.
5. **Tests still needed** — list concrete, observable tests and identify whether automated or manual.
6. **Most important finding** — explain why it matters.
7. **Overall assessment** — state whether the feature is ready for acceptance, needs changes, or cannot yet be verified.

## Evidence and accuracy rules
- Cite exact repository paths and line numbers where possible. Use short code excerpts only when useful.
- Tie each statement to a specification criterion, code, or test.
- Never treat a test name as proof that the entire UI or workflow was tested; inspect the assertions.
- Never mark a criterion satisfied solely because a function exists.
- Never invent test results, browser observations, client confirmation, security guarantees, or runtime behavior.
- If a test environment is unavailable, state that clearly and provide commands or steps needed to run the checks.
- Identify assumptions separately from documented requirements.

## File-editing boundary
This Skill is read-only by default. It must not modify the specification, source code, tests, or repository files. If a change is appropriate, describe it and ask for explicit permission before editing. Only edit files after the user explicitly requests changes.
