# Interview Version — PTE-8162: [RCM -> Invoice] Reset button working wrong

## STAR Format (Situation → Task → Action → Result):

**S (Situation):** In our Physical Therapy Management platform (PtEverywhere), users reported that the "Reset" and "Apply" buttons in the RCM Invoice Quick View were failing to correctly reflect chosen configurations. It exhibited two phases of failure: backend stale data and frontend UI reflow failures where the table grid didn't adjust properly.

**T (Task):** My task was twofold: 1) Identify why server state wasn't updating the local closure correctly, and 2) debug the DOM rendering engine to ensure that changed column configurations properly triggered browser reflow events.

**A (Action):**
- Phase 1: Traced stale closure snapshots and implemented a server-fetch model (`_getView`) for guaranteed truth.
- Phase 2: Diagnosed race conditions in AngularJS digest triggers affecting UI resizing. Replaced flaky `$watch` flags with a robust cache-comparison algorithm in `_getInvoices`. Migrated native `setTimeout` to dynamic AngularJS `$timeout` schedules to align window resize events correctly, and centralized UI lifecycle management using `finally()` combined with safe digest execution wrapper `common.applyChanges`.

**R (Result):** Resolved 100% of data sync bugs and eliminated UI layout stuttering. Improved rendering performance scalability based on result set size and established resilient exception handling for spinner control.

## Câu trả lời gộp lại (1–4 câu tự nhiên):
I recently championed a major synchronization overhaul of our RCM Invoice system where the Reset action was restoring outdated states and grid sizes. I solved both the data-layer bug by implementing an API-driven snapshot reset and the rendering race condition by moving from standard watches to deterministic cache comparison mechanisms triggered by the controller. By standardizing event timing via `$timeout` and centralizing state recovery in `.finally()` blocks, I managed to deliver an instantaneous, failure-tolerant UI experience.

## Câu hỏi phỏng vấn FE/BE liên quan:
- Q: How do you solve asynchronous UI race conditions between framework data bindings and native DOM events?
  A: I utilize explicit caching mechanism comparisons combined with framework-aware timers (like `$timeout`). Instead of relying solely on automated watchers which might lag, comparing a specific previous-state cache right inside the render promise chain allows exactly-timed triggering of native custom events (like 'resize') just when the framework finishes applying changes.
- Q: Explain why you might prefer centralized `.finally()` wrappers for state recovery?
  A: It guarantees crucial lifecycle cleanups, like turning off loading spinners, regardless of resolve/reject conditions, protecting users from locked/hanging UI overlays.
