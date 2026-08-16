Here is your updated, comprehensive **Team Leader Execution Plan**, perfectly integrating our architectural pivots—dropping Aadhaar for Mobile OTP, implementing Master-Duplicate crowdsourced spatial tracking to save storage, and incorporating transparent user UX feedback.

---

### Phase 1: GitOps, Branch Integrity & Code Review (Your Immediate Priority)

As the Team Leader, you act as the final gatekeeper for all code moving into staging and production.

* **Enforce PR Workflows:** Ensure that your team members (Members 1 through 5) commit strictly to their designated feature branches and open Pull Requests against your `backend` or `staging` branches.


* **Protect API Contracts:** Review any database migrations or schema additions (especially PostGIS geometry extensions) to ensure they match our unified JSON payload contracts before merging.



---

### Phase 2: Core Backend Implementation (`auth-service`)

As the lead backend developer alongside Member 2, you must complete the core Node.js & Express orchestration layer:

* **Authentication & RBAC Routing:** Finalize JWT-based authentication using Mobile Number + OTP or secure login, enforcing strict role boundaries (`CITIZEN`, `WARD_ADMIN`, `STATE_ADMIN`).


* **Citizen Tracking Endpoint:** Implement the `GET /api/v1/citizens/track` route, ensuring users can query issues they either reported directly or backed via the duplicate upvote flow.


* **Master-Duplicate Resolution Logic:** Write the backend service logic that intercepts incoming submissions, executes the spatial radius check (< 10 meters) and pHash duplicate check, and either creates a master `Post` record or appends an entry to the `issue_reports` upvote table to boost issue priority without duplicating image storage.



---

### Phase 3: The Kong Gateway Security Plugin (`gov_controller`)

Your exclusive architectural responsibility:

* Write the custom Lua plugin for Kong to manage the Redis-backed **National Security Visibility Controller**.


* Configure the plugin to intercept outbound responses, check the `restricted_posts` Redis set in milliseconds, and strip sensitive JSON objects at C-level network speeds before they reach the public internet.



---

### Phase 4: Cross-Microservice Integration & Fault Tolerance

Supervise and test the integration points across the decoupled microservices:

* **Kafka Event Streaming:** Verify that the Node.js API successfully publishes payloads to both the `sync_processing` and `async_analytics` Kafka partitions.


* **Circuit Breakers & DLQs:** Ensure that if the NVIDIA Triton GPU cluster experiences memory spikes or latency, your circuit breakers catch the failure, route payloads to the `gpu_retry_dlq` Dead Letter Queue, and gracefully update post statuses to `Delayed_Processing` rather than crashing the client.



---

### Phase 5: Team Synchronization & AI Context Enforcement

Remind your 6-member squad to strictly follow the **Context Injection Protocol** before prompting their AI tools:

* Require every member to initialize their chat threads by uploading `README.md`, `README2.md`, and `plan.md`.


* Enforce the use of their respective **Role Prompts** (Slots 1 through 6) to completely eliminate architectural drift, monolithic rollbacks, or unwanted framework substitutions.



---

### 3. User Experience (UX) & Transparency

When a user uploads a duplicate photo, backend spatial clustering and image matching detect the existing record. Instead of creating a redundant database entry or storing duplicate images, the system responds with a clear, satisfying message:

> *"Thank you! This issue has already been reported by another citizen nearby (Tracking ID: #CIVIC-4092). We have successfully linked your report to increase its priority. You can track its live progress on your dashboard."*
