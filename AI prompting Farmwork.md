### AI Copilot, Gemini Execution & Troubleshooting Framework

To ensure all 6 team members maximize their AI assistants without diverging from our event-driven microservices architecture, you must standardize how prompts and context files are injected.

Here is the official framework for deploying the AI prompts, injecting file context, and troubleshooting hallucinations or architectural drift.

---

### 1. The Context Injection Protocol (Pre-Requisite)

Before any team member asks the AI to write a single line of code, they must establish the absolute architectural baseline. AI models lose context over long conversations, so establishing a "ground truth" using our project files is mandatory.

**Step-by-Step Initialization:**

1. **Attach Documentation Files:** Instruct every team member to upload or paste the contents of the following core documentation files into their AI assistant's context window:
* `README.md` (Core workflow and API routing).
* `README2.md` (Model workflow, Fake Media, CV, and Sentiment logic).
* `plan.md` (Implementation specs, ERD, Circuit Breakers, and MLOps strategies).


2. **Inject the Universal Prompt: ** Paste the **Universal Context Prompt** at first prompt of thread and before starting with new thread ask ai to create summery to begiven to new thread to resume same flow 
4. **Inject the Role Prompt:** Paste the specific **Role Prompt** Ex. Act as a Principal Backend and Database Architect specializing in Node.js/Express, PostgreSQL, PostGIS, and distributed caching with Redis. (these are given to all.)

> **Instruction to Team Members:**
> *"Do not start coding until the AI explicitly acknowledges the `README`, `README2`, and `plan` files, understands the Universal Prompt, and confirms your specific role."*

---


### 2. Troubleshooting & Error Handling Matrix

AI models naturally gravitate toward the easiest, most common solutions (like monolithic REST APIs or standard SQL). If the AI forgets our advanced constraints, team members must use these exact "Correction Prompts" to steer it back.

| Error Symptom / AI Hallucination | Root Cause | Correction Prompt to Issue to the AI |
| --- | --- | --- |
| **AI suggests a monolithic architecture or merges services.** | The AI forgot the microservices boundary. | *"Correction: Re-read `README2.md`. We are using decoupled microservices. Do not merge the auth-service with the cv-engine. Rewrite this specifically for isolated pods."* |
| **AI suggests standard REST API for Triton Inference.** | The AI defaulted to standard HTTP instead of high-speed buffers. | *"Correction: Refer to the MLOps section in the `plan.md` file. We strictly use high-speed gRPC for Triton communication. Rewrite the client using `tritonclient.grpc`."* |
| **AI forgets PostGIS and writes standard SQL coordinate math.** | The AI forgot the spatial extension constraints. | *"Correction: Stop using Haversine math in the SQL query. Refer to the ERD in `plan.md`. You must use PostGIS `ST_Contains()` and GIST indexes."* |
| **AI writes executable JS (like `eval()`) for the dynamic UI.** | The AI misunderstood Server-Driven UI (SDUI). | *"CRITICAL SECURITY CORRECTION: Do not send executable code. Our SDUI strictly uses JSON schemas parsed by Flutter/React Native. Rewrite the payload to only output JSON data."* |
| **AI removes the Circuit Breaker or DLQ logic.** | The AI prioritized brief code over fault tolerance. | *"Correction: You forgot the fallback strategy from `plan.md`. Wrap this inference call in an Opossum circuit breaker and route failures to the Kafka `gpu_retry_dlq`."* |

---

### 4. Context Refresh Strategy (Anti-Drift)

If a team member's conversation thread becomes too long (typically after 10-15 deep coding interactions), the AI will begin to "forget" the early architecture files (`README`, `plan`).

**The Solution:**
If the AI starts hallucinating standard CRUD apps instead of our B2G Spatial Engine, do not fight it.

1. Open a completely new chat thread.
2. Re-upload the `README`, `README2`, and `plan` files.
3. Re-paste the Universal Prompt and Role Prompt.
4. Paste the last working snippet of code and resume.
