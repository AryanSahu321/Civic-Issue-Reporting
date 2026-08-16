As the **Team Leader and Chief Integration Architect**, your overarching role is to steer this 6-member squad, manage the Kong API Gateway security perimeter, maintain strict GitOps branch integrity, and ensure zero-downtime microservice communication.

With our recent architectural pivot—**dropping Aadhaar authentication in favor of Mobile OTP/Secure Login** and **implementing a Master-Duplicate Crowdsourced Architecture (using pHash and spatial radius clustering to save storage and increase priority weights)**—our technical roadmap is fully optimized and production-grade.

Here is your updated, comprehensive **Team Leader Execution Plan** to successfully complete your tasks on the `backend` branch and guide your squad to the finish line:

---

### Phase 1: GitOps, Branch Integrity & Code Review (Your Immediate Priority)

Now that your `backend` branch is active on GitHub, you must act as the gatekeeper for all code moving into staging and production.

* **Enforce PR Workflows:** Ensure that your team members (Members 1 through 5) commit strictly to their designated feature branches and open Pull Requests against your `backend` or `staging` branches.


* **Protect API Contracts:** Review any database migrations or schema additions (especially PostGIS geometry extensions) to ensure they match our unified JSON payload contracts before merging.



---

### Phase 2: Core Backend Implementation (`auth-service`)

As the lead backend developer alongside Member 2, you must complete the core Node.js & Express orchestration layer:

1. **Authentication & RBAC Routing:** Finalize JWT-based authentication using Mobile Number + OTP or secure login, enforcing strict role boundaries (`CITIZEN`, `WARD_ADMIN`, `STATE_ADMIN`).


2. **Citizen Tracking Endpoint:** Implement the `GET /api/v1/citizens/track` route, ensuring users can query issues they either reported directly or backed via the duplicate upvote flow.


3. **Master-Duplicate Resolution Logic:** Write the backend service logic that intercepts incoming submissions, executes the spatial radius check (< 10 meters) and pHash duplicate check, and either creates a master `Post` record or appends an entry to the `issue_reports` upvote table to boost issue priority without duplicating image storage.

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

1. Require every member to initialize their chat threads by uploading `README.md`, `README2.md`, and `plan.md`.


2. Enforce the use of their respective **Role Prompts** (Slots 1 through 6) to completely eliminate architectural drift, monolithic rollbacks, or unwanted framework substitutions.
