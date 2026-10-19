import assert from "node:assert/strict";
import test from "node:test";
import { filterRequestsByPriority } from "../src/priority-filter.js";
import { createRequest, loadRequests, saveRequests, STORAGE_KEY } from "../src/request-store.js";

const sample = [
  { id: "3", priority: "High" },
  { id: "2", priority: "Normal" },
  { id: "1", priority: "Low" },
];

test("AC-01 and AC-03: All shows every request in saved order", () => {
  assert.deepEqual(filterRequestsByPriority(sample), sample);
  assert.deepEqual(filterRequestsByPriority(sample, "All"), sample);
});
test("AC-02: each priority shows only matching requests", () => {
  for (const p of ["High", "Normal", "Low"]) {
    assert.deepEqual(filterRequestsByPriority(sample, p).map(r => r.priority), [p]);
  }
});
test("AC-04: an unmatched priority produces an empty visible list", () => {
  assert.deepEqual(filterRequestsByPriority([{ priority: "High" }], "Low"), []);
});
test("AC-05: legacy requests without priority match Normal", () => {
  assert.deepEqual(filterRequestsByPriority([{ id: "old" }], "Normal"), [{ id: "old" }]);
});
test("AC-06: filtering does not mutate the original list", () => {
  const before = JSON.stringify(sample);
  filterRequestsByPriority(sample, "High");
  assert.equal(JSON.stringify(sample), before);
});
test("AC-07: adding a request retains its priority and filtering behavior", () => {
  const input = { requester:"Alex", department:"Operations", equipment:"Laptop", neededBy:"2026-11-01", reason:"Replacement", priority:"Low" };
  const request = createRequest(input, { id:"new", now:new Date("2026-10-18T12:00:00Z") });
  assert.equal(filterRequestsByPriority([request], "High").length, 0);
  assert.equal(filterRequestsByPriority([request], "Low").length, 1);
});
test("invalid filter is rejected", () => {
  assert.throws(() => filterRequestsByPriority(sample, "Urgent"), RangeError);
});
