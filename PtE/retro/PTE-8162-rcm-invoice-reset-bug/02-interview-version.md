# Interview Version — PTE-8162: [RCM -> Invoice] Reset button working wrong

## STAR Format (Situation → Task → Action → Result):

**S (Situation):** In our Physical Therapy Management platform (PtEverywhere), users reported that the "Reset" button in the RCM Invoice Quick View module was failing to revert changes properly. Specifically, it would restore columns that the user had just deleted and saved.

**T (Task):** My task was to identify why the client-side state was out of sync with the server after a save action and ensure the Reset button correctly reverted to the most recent saved configuration.

**A (Action):** I debugged the controller and found two root causes: the local view list wasn't being updated with server data after saving, and the reset logic was relying on a stale local closure snapshot (`oldView`). I refactored the reset mechanism to fetch fresh data directly from the server via API, aligning the implementation with the project's standard architectural patterns (ATP).

**R (Result):** The bug was resolved, ensuring data integrity and a consistent user experience. This also reduced future maintenance debt by standardizing the view management logic across different modules.

## Câu trả lời gộp lại (1–4 câu tự nhiên):
I recently fixed a synchronization bug in our RCM Invoice module where the Reset button was restoring stale view configurations. By debugging the state management logic, I discovered that the app relied on outdated local snapshots instead of server-verified data. I implemented an API-driven reset flow that fetches the latest configuration directly from the backend, ensuring the UI is always perfectly in sync with the database.

## Câu hỏi phỏng vấn FE/BE liên quan:
- Q: How do you handle state synchronization issues between client and server?
  A: I prioritize server-side truth. In this case, I moved away from local state snapshots and implemented a fresh API fetch during critical state transitions like a "Reset" action to ensure accuracy.
