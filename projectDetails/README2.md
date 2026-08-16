#  **App Work Flow**

This flowchart represents the high-level, end-to-end lifecycle of a user's submission within the Civic-Issue-Reporting platform, illustrating how data is ingested, validated, analyzed, and eventually resolved.

Here is the technical breakdown of the architecture, step-by-step:

### Phase 1: Gatekeeper Engine

* The workflow begins when a user submits a post, which is initially categorized as either an "Issue" or a "Thank You" message.


* The Content Gatekeeper Engine scans the submission for spam, bot activity, and policy abuse.


* If a violation is detected, the session is terminated.


* If the content is clean, civic issues are routed forward, while friendly "Thank You" data bypasses the heavy processing and is saved directly to the Central Database.



### Phase 2: Fake Media Detection

* Clean civic issues undergo a security check to detect AI-generated media or recycled, duplicated photos and videos.


* If the media is flagged as fake or fraudulent, the system either flags it for manual review or triggers an automated rejection, terminating the post.


* Authentic media successfully passes through to the spatial validation layer.



### Phase 2.5: Geotagging & Routing

* Authentic posts are processed by the Geotag Extraction and Routing Engine to verify if the device's live GPS matches the image's embedded EXIF data.


* Submissions with spoofed or missing location data are rejected.


* Verified locations trigger a GIS Mapping process that automatically assigns the issue to the correct local ward authority before moving the data to the Central Database.



### Phase 3: Sentiment & Perception

* The system logs the verified post and routes the text data to a Sentiment Observation Engine powered by tools like VADER, TextBlob, or BERT NLP.


* The engine categorizes the public perception of the post into Neutrals, Supporters, or Haters.


* This categorical analysis is merged and pushed directly back into the Central Database to update historical records and feed analytical dashboards.



### Phase 4: Government & Citizen Portal

* Authorized government officers interact with a control site that features a visibility toggle, allowing them to filter issues at the LOCAL or STATE level.


* On the public side, citizens use a secure login to access a Status Portal where they can track updates specifically for their submitted problem.


* The system relies on an Automated Status Report Creator to manage transitions between "Under Process" and "Solved" states.



### Phase 5: Final Decision

* The workflow evaluates whether the issue was successfully solved at the designated local level.


* If the issue remains unresolved locally, the system automatically escalates the ticket and emails a status report to a higher-level authority.


* If the issue is resolved, the status is updated to "Solved" and the final resolution state is permanently pushed to the Central Database.


--------------------------

# model working flow

This is a highly sophisticated, multi-modal machine learning pipeline. As an architect looking at this **Model Working Flow**, I can break down exactly how the system safely ingests raw data, strips out malicious or fraudulent content, and structures the remaining data for actionable municipal insights.

Here is the technical breakdown of how the AI models process a submission from start to finish:

### 1. Initial Ingestion

* The system pipeline begins when it receives a complete **Civic Post**, which consists of text, an image, and GPS coordinates.



### 2. Layer 1: NLP Gatekeeper

This layer acts as the first line of defense, focusing strictly on the text payload.

* The text is routed to a **Toxic/Policy Classifier** to ensure community guidelines are met.


* If the text is deemed toxic, the system triggers a **Hard Abort & Delete**, immediately terminating the process.


* If the text is compliant, an **Intent Router** evaluates the context to determine the post's purpose.


* Irrelevant posts ("Other") and "Thank You" posts are logged and end their journey here, while valid "Issue" posts continue deeper into the pipeline.



### 3. Layer 2: Fake Media & Fraud Prevention

This layer shifts focus to the image payload to prevent digital vandalism and spam.

* The image is analyzed by an **AI Generative Check (using CNN/ViT architectures)** to determine if it is a deepfake or synthetically generated.


* Deepfakes are immediately flagged and rejected.


* Authentic images then pass through a **pHash Duplicate Check**.


* The system checks the database for matching perceptual hashes; if a match is found, it is flagged as fraud (e.g., a user uploading a recycled internet photo).


* Images that pass both checks are declared "Verified Unique".



### 4. Layer 2.5: Geotag & Spatial Engine

Before running heavy computer vision models, the system validates the physical location.

* A **Spatial Extractor** compares the image's embedded EXIF data against the live GPS coordinates provided during ingestion.


* If the location is invalid or spoofed, the post is flagged and rejected.


* Valid coordinates run through **Spatial Clustering (Radius Deduplication)** to group reports of the exact same physical issue, assigning a validated GIS Zone to the data.



### 5. Layer 3: Infrastructure CV Engine

This is the core diagnostic layer where the system identifies the actual civic problem.

* The spatially verified image tensor is fed into a **Vision Classifier (such as YOLO or MobileNet)**.


* The model categorizes the issue into specific buckets, such as **Potholes, Garbage, or Streetlights**.


* Once classified, the issue, its validated GPS coordinates, and the cleaned text are permanently saved to the **Central Relational Database (+ GIS Data)** for municipal action.



### 6. Layer 4: Behavioral Analytics Engine

This final layer operates asynchronously to measure public sentiment and user behavior.

* Instead of pulling directly from the live input stream, a **User Behavior & Sentiment Engine** fetches text and historical data directly from the Central Database via an async batch process.


* The engine calculates the ratio of negative comments versus "Thank You" posts.


* Users and their respective wards are categorized into **Haters (High % Negative), Supporters (High % Thanks), or Neutrals (Balanced/Low Data)**.


* Finally, these sentiment statuses are pushed back to update the Central Database, feeding the analytics dashboards.

------------

#  Text Moderation & Routing (BERT / Gemma-2B) -> Toxic/Policy Classifier

This diagram illustrates the internal neural network architecture of the Layer 1 NLP Gatekeeper. It maps exactly how a Transformer-based Large Language Model (like BERT or Gemma-2B) ingests raw text, understands its context, and classifies its intent.

Here is the technical breakdown of how data flows through this classification pipeline:

### 1. Input Layer: Data Preparation

Transformers cannot read plain text, so the initial layer focuses on translating human language into a mathematical format the model can process.

* **Tokenization:** The **Raw User Text** is broken down into smaller, manageable pieces via **Tokenization (Sub-word)**.


* **Vectorization:** These tokens are converted into numerical **Input Embeddings**, giving each token a mathematical representation.


* **Contextual Mapping:** Because Transformer models process all words simultaneously rather than one by one, **Positional Encodings** are generated to tell the model the exact sequence and order of the words.


* **Merge:** The embeddings and positional data are merged at the **Combine** node before being fed into the neural network.



### 2. Hidden Layers: The Transformer Block

This is the "brain" of the model where deep semantic understanding occurs.

* **Multi-Head Self-Attention:** The embedded tokens enter this mechanism, which allows the model to look at the entire sentence at once and calculate how strongly each word relates to every other word. This is how it understands that "terrible" in "terrible pothole" is a complaint, not a compliment.


* **Add & Norm:** The data passes through normalization layers to stabilize the learning process and prevent the numerical values from exploding.


* **Feed Forward Network (FFN):** A **Position-wise Feed Forward Network** processes the attention data to recognize deeper, non-linear patterns in the language.


* **Looping:** This entire block repeats *N times* (depending on the model's depth, e.g., 12 times for BERT-Base) to build a profound understanding of the user's intent.



### 3. Output Layer: Probability Calculation

Once the text has passed through all the Transformer blocks, the system must translate that complex understanding into a simple decision.

* **Pooled Output:** The final hidden state is compressed into a single, dense **Pooled Output** vector that represents the entire meaning of the user's post.


* **Linear Layer:** This vector passes through a **Fully Connected Linear Layer** to map the features to your specific classification categories.


* **Softmax Activation:** The **Softmax Activation** function converts the raw neural network numbers into a clean probability distribution. For example, it might output: `[0.92, 0.05, 0.03]`.



### 4. Final Classification: Intent Routing

* Using the probability distribution generated by the Softmax function, the model makes its final decision.


* The system routes the post into one of three distinct buckets: **Issue** (to be sent to the CV engine), **Thank You** (to be safely logged), or **Toxic** (to be hard-aborted and deleted).

----------


#  Fake Media & Fraud Detection (CNN / Vision Transformer)

As an expert system designer, I can explain the sophisticated mechanics behind your **Fake Media & Fraud Detection** pipeline. This architecture is a highly effective, multi-modal hybrid engine. Rather than relying solely on standard pixel analysis, it cross-examines visual artifacts against spatial metadata to catch deepfakes, recycled internet photos, and location-spoofed submissions.

Here is the technical breakdown of how data flows through this detection model:

### 1. Input Layer: Multi-Modal Civic Data

Instead of just looking at the picture, the system ingests three distinct streams of data to build a complete profile of the submission.

* The system ingests the **Raw Civic Image (RGB Matrix)** to capture the standard pixel data.


* It simultaneously parses the file's **EXIF Metadata & Device GPS** to capture hidden data like the device model, timestamp, and location coordinates.


* The raw image undergoes a **Frequency Domain Transformation** to expose underlying synthetic noise or blending errors that generative AI models leave behind, which are invisible to the naked eye.



### 2. Hidden Layers: Visual + Spatial Verification

The pipeline splits the processing into two parallel branches to independently verify what the image shows and where it claims to be from.

**Branch A: Visual Artifact Analysis (CNN/ViT)**

* The frequency-transformed image is fed into a **Conv2D Layer** to begin spatial feature extraction.


* The data passes through **Batch Normalization** and **ReLU Activation** to stabilize the neural network and introduce non-linearity.


* A **Max Pooling (Downsampling)** layer compresses the spatial dimensions to focus on the most prominent structural anomalies.


* This results in highly specialized **Noise & Artifact Feature Maps** that highlight synthetic manipulation.



**Branch B: Metadata & Geolocation Engine**

* An **EXIF & Geo-Validator** inspects the metadata to ensure privacy-stripping tools have not deleted crucial tags.


* The validator checks for a match between the live device GPS and the embedded image metadata.


* If the data is stripped or mismatched, a decision gate triggers a **Flag: Recycled / Geo-Tampered** alert.



### 3. Output Layer: Multimodal Aggregation

This layer merges the visual deepfake analysis with the spatial GPS analysis to form a unified mathematical conclusion.

* The 2D visual feature maps are flattened into a 1D vector using **Global Average Pooling (Visual Maps)**.


* Both the pooled visual data and the successfully verified GPS match data are routed into a **Dense (Fully Connected) Layer**.


* The combined data passes through a **Sigmoid / Softmax Classification Hub** to calculate the final probability scores for fraud.



### 4. Final Prediction: Fraud & Tamper Classification

Based on the probability distributions, the pipeline routes the image into one of three definitive terminal states.

* Images featuring clean visual frequencies and valid GPS data are classified as **Authentic Media (Verified GPS & Real)** and are passed forward to the computer vision engine.


* Submissions that trigger synthetic frequency patterns are immediately classified as **AI-Generated / Deepfake** and rejected.


* Submissions that pass the visual check but fail the spatial validation are classified as **Recycled Photo / Location Fraud** to prevent users from reporting old issues from different jurisdictions.

---------

# Civic Issue Classification (YOLOv8 / MobileNetV2)

This is the core computer vision engine of your architecture. As an architect, I can tell you that designing an object detection pipeline requires a very different approach than standard image classification (like the CNN used in your Fake Media detection layer). You aren't just asking the model *what* is in the image; you are asking it *where* the object is, *how big* it is, and exactly *which municipal ward* it belongs to.

Here is the deep-dive technical breakdown of the **Civic Issue Classification** pipeline, utilizing a single-shot detector architecture like YOLOv8 or MobileNetV2:

### 1. Input Layer: Vision Grid & Spatial Metadata

Object detection models require strict dimensional consistency and rich context.

* **Pre-processed Image Grid:** The image is resized and normalized into a fixed, dense mathematical tensor—typically $640 \times 640 \times 3$ (representing width, height, and the 3 RGB color channels). This ensures the neural network processes the image consistently.
* **Verified GPS Coordinates & Ward Metadata:** Before the heavy convolutional math begins, the spatial metadata (which was verified in Layer 2.5) is attached to the payload. This guarantees that whatever the model detects visually remains bound to its geographic reality in the physical world.



### 2. Hidden Layers: Feature Extraction & Aggregation

This section is split into two specialized sub-components designed to understand both the fine details and the broader context of the image.

* **The Backbone (CSPNet / MobileNet Blocks):** This acts as the primary feature extractor. As the $640 \times 640 \times 3$ tensor passes through these deep convolutional layers, the model learns to recognize basic visual patterns—starting with simple edges and gradients, and combining them into complex textures like cracked asphalt or piled debris.
* **The Neck (PANet / FPN):** The Feature Pyramid Network (FPN) aggregates these extracted features across multiple scales. This is crucial for civic reporting: it ensures the model is equally accurate at detecting a massive garbage dump taking up the entire frame as it is at detecting a small, distant pothole on a street in Prayagraj.

### 3. Output Layer: Detection Head & GIS Routing

This is where the network translates extracted features into concrete, actionable municipal data.

* **Bounding Box Regressor:** The model outputs exact spatial coordinates predicting the boundary of the detected issue. This is typically formatted as $(x, y, w, h)$, where $(x, y)$ represents the center point of the problem, and $(w, h)$ represents its width and height relative to the image frame.
* **Class Predictor:** Simultaneously, the model calculates the probability distribution for the object's class (e.g., $P(Pothole) = 0.94$, $P(Garbage) = 0.02$).
* **Non-Maximum Suppression (NMS):** YOLO architectures often predict hundreds of overlapping bounding boxes for a single object. NMS uses an Intersection over Union (IoU) mathematical threshold to filter out the noise, discarding redundant boxes and keeping only the single highest-confidence boundary.
* **GIS Spatial Engine:** The finalized bounding box is directly bound to the verified GPS and ward coordinates. This bridges the gap between pixel space and geospatial reality.



### 4. Final Prediction: Spatially Localized Civic Issues

Once the data clears the NMS filter and spatial binding, the pipeline generates its terminal output.

* The system produces highly localized, geotagged classifications with exact confidence scores (e.g., **Localized & Geotagged: Pothole [94%]**).
* Because this prediction contains both the visual diagnosis and the GIS ward routing data, it can be instantly written to the Central Relational Database and used to trigger automated dispatch push notifications to the correct local authorities.

-------

# Sentiment Analytics Engine (VADER / RoBERTa)

As a system architect, here is the technical breakdown of the **Sentiment Analytics Engine (VADER / RoBERTa)** based on your provided workflow architecture. This pipeline operates asynchronously to extract semantic meaning from citizen feedback and maps it to specific municipal geographic zones.

Here is how the data flows through the four distinct layers of this engine:

### 1. Input Layer: Data Ingestion & Spatial Context

This initial layer is responsible for gathering and cleaning the incoming data before it enters the semantic model.

* The system ingests raw public comments alongside their associated Ward GPS metadata.


* This raw data passes through a text preprocessing stage.


* During preprocessing, unnecessary noise such as URLs and stop words are removed.


* The output is a clean set of text tokens paired with a specific Ward ID, which is then fed into the hidden layers.



### 2. Hidden Layers: Semantic Analysis (Hybrid Engine)

This is the analytical core where the system understands the context and emotion behind the text.

* The cleaned tokens first enter an Embedding Layer, which generates context-aware embeddings to understand the semantic meaning of the words.


* The data then flows into an Attention Mechanism.


* This mechanism specifically weighs emotional keywords to determine their impact on the overall sentence.


* Finally, Polarity Scoring Logic calculates a compound mathematical score for the text, outputting a value that ranges from -1.0 to +1.0.



### 3. Output Layer: Threshold Mapping & Spatial Tagging

Once the neural network (or lexicon logic) generates the numerical sentiment score, this layer translates it into a discrete business logic category.

* The system evaluates the final decimal score and its spatial link using a compound score check.


* If the score is less than or equal to -0.3, the system routes the post to the "Haters" logic path.


* If the score is greater than or equal to 0.3, it routes the post to the "Supporters" logic path.


* If the score falls anywhere in between (-0.29 to +0.29), it routes the post to the "Neutrals" logic path.



### 4. Final Prediction: Ward-Wise Sentiment Bucketing

The final step aggregates the categorized data into actionable insights for government administrators.

* The routed data is organized into specific Ward-Wise Sentiment Buckets: a [Haters] Ward Bucket, a [Supporters] Ward Bucket, and a [Neutrals] Ward Bucket.


* All three of these geographic sentiment buckets push their data directly to a GIS Analytics Dashboard.


* This dashboard provides administrators with live ward heatmaps and real-time metrics based on the public's perception.

------

# Security & Infrastructure Architecture

As a system architect, looking at the **"work flow of all layer together"** diagram, I can see this is a highly sophisticated, event-driven microservices architecture. It seamlessly bridges real-time API ingestion with intensive AI pipelines, separating synchronous blocking tasks (like fraud detection) from asynchronous heavy-lifting (like sentiment analysis).

Here is the technical breakdown of how data moves end-to-end through all five layers of the platform:

### 1. Client & Edge Ingestion (Layer 0)

This layer acts as the system's front door, prioritizing high throughput and decoupling ingestion from processing.

* The workflow initiates when the Mobile Client sends a JSON payload containing Text, Image, and GPS data to the AWS API Gateway.


* The API Gateway acts as a router, pushing the incoming payload into an Apache Kafka message broker.


* It specifically splits the data stream into two distinct Kafka Topics: a `sync_processing` topic for immediate validation, and an `async_analytics` topic for background processing.



### 2. NLP Moderation (Layer 1)

This synchronous layer is optimized with ONNX to quickly filter out garbage text and direct valid issues forward.

* A Kafka Consumer pulls the data from the sync queue and immediately checks a Redis Cache to see if the exact text is a duplicate.


* If it is a duplicate, the system returns a cached response directly to the client; if not, the text is fed into a Toxic Classifier powered by Gemma-2B INT8.


* A decision gate evaluates the toxicity score: if the score is greater than 0.9, the payload is hard-aborted into a Dead Letter Queue for auto-deletion.


* Compliant text is passed to a BERT-Base Intent Router, which evaluates the context.


* "Thank You" streams end here, while validated "Issue Streams" continue deeper into the architecture.



### 3. Vision Security & Geotagging (Layer 2)

Before the heavy computer vision models run, this layer ensures the media is physically authentic and spatially valid.

* The image and GPS metadata first enter a pHash Logic Engine, which queries a PostgreSQL/Redis Vector Store for exact perceptual matches.


* If a match with a Hamming distance of less than 5 is found, the system triggers Decision 2 to flag it as Fraud.


* Unique images pass to a Generative AI Anomaly Detector (ViT in TensorRT) to determine if the media is a deepfake.


* Deepfakes are rejected, but authentic images move to the Geo & Spatial Engine, which cross-references EXIF data against the live GPS and performs municipal Ward Mapping.


* Posts with spoofed or missing GPS data are rejected, while fully verified data is securely passed to Layer 3.



### 4. Civic Issue Classification (Layer 3)

Operating on a GPU Cluster (Kubernetes Pods), this layer handles the heaviest mathematical lifting to diagnose the civic problem.

* The spatially verified data enters the Civic Vision Classifier (YOLOv8/MobileNetV3).


* The model generates bounding boxes and confidence scores to isolate the problem.


* The issues are actively categorized into distinct infrastructure buckets, such as Potholes, Illegal Dumping, or Wire Hazards.


* The classified metadata and its associated GIS Ward are written to a PostgreSQL database, while the raw image is archived in an AWS S3 Bucket.


* Both storage events act as a trigger to send a Success Push Notification back to the mobile client.



### 5. Sentiment Analytics (Layer 4)

This asynchronous background engine ensures that the heavy NLP sentiment models do not block the primary user experience.

* An Async Text Feed is pulled from the secondary Kafka topic into the Sentiment Engine, which utilizes VADER and RoBERTa.


* The engine aggregates polarity scores and performs Ward Clustering.


* The system routes the localized sentiment into specific buckets: Haters, Neutrals, and Supporters.


* Finally, these aggregated metrics are pushed to the Live Admin Dashboard, updating the GIS Ward Heatmaps in real-time for government officials.

-----

# 1. ER Diagram Explaination

Chalo is Database Architecture aur ERD ko detail mein samajhte hain. Yeh normal relational database nahi hai; isme **PostGIS** ka use hua hai jo spatial (geographical) data ko handle karne ke liye industry standard hai.

Here is the technical breakdown in HINGLISH of how the different pieces fit together:

### 1. 👥 USERS Table (Identity & Access)

Yeh table system ke authentication aur authorization ko handle karti hai.

* **Concept:** Isme ek strict `role` constraint (Citizen, WardAdmin, StateAdmin) laga hua hai. Iska matlab jab API Gateway se request aayegi, toh JWT token mein yahi roles encode honge.
* **Link:** Yeh table baaki system ka anchor hai. Har `POST` aur har `AUDIT_LOG` ek `user_id` se connected hota hai.

### 2. 🗺️ WARDS Table (The GIS Hub)

Yeh system ka geographical foundation hai.

* **Concept:** Isme normal text ke bajaye `boundary` naam ka ek special column hai jiska type `GEOMETRY(MultiPolygon, 4326)` hai. SRID 4326 ka matlab global GPS coordinates (Latitude/Longitude). Yahan city ke har ward (zone) ka pura naksha (map boundaries) store hota hai.
* **Performance:** Kyunki geographical queries heavy hoti hain, humne is par ek **GIST (Generalized Search Tree) Index** lagaya hai taaki spatial lookups super-fast hon.

### 3. 📝 POSTS Table (The Core Engine)

Jab citizen app se koi civic issue (jaise pothole ya kachra) report karta hai, toh main data yahan insert hota hai.

* **Concept:** Isme user ki issue text, image ki AWS S3 link (`image_url`), aur sabse zaroori `location` store hoti hai jiska type `GEOMETRY(Point)` hai. Yeh 'Point' user ke phone ka live GPS coordinate hai.
* **Tracking:** Iska `status` column ek state-machine ki tarah kaam karta hai (`Pending` se `Solved` ya `Escalated` tak).

### 4. ⚡ The Real Magic: PiP (Point-in-Polygon) Trigger

Yeh is database design ka sabse bada masterstroke hai.

* **Concept:** Bina PostGIS ke, backend ko manually calculate karna padta ki user ka GPS coordinate kis ward mein aata hai, jo ki slow aur complex hota. Humne yahan ek **Database Trigger** likha hai: `assign_ward_to_post()`.
* **Execution (Dry Run logic):** Jaise hi POSTS table mein nayi row insert hoti hai, trigger activate hota hai. Woh Post ke `location` (Point) ko uthata hai, aur check karta hai ki yeh point kis Ward ke `boundary` (Polygon) ke andar girta hai using the `ST_Contains()` function. Phir yeh automatically us Post ko correct `ward_id` assign kar deta hai. Zero backend overhead!

### 5. 📊 SENTIMENT_METRICS & AUDIT_LOGS

* **Sentiment Metrics:** Aapka async Python Kafka worker jab VADER aur RoBERTa AI models chala lega, toh unka output (Haters, Supporters, Neutrals aur unka score) is table mein aayega. Is table par query karke Admin Dashboard ka Heatmap banega.
* **Audit Logs:** Security compliance ke liye, koi bhi State Admin ya Ward Admin system mein jo bhi changes karega (e.g., status 'Solved' mark karna), woh action yahan unke IP address ke saath log hoga.

-----

# 2. OpenAPI / Swagger 3.0 Contract (YAML)
Yeh schema strict JSON payload aur headers ko define karta hai. Ise aap apne Swagger UI ya API Gateway configurations (AWS API Gateway models) mein directly import kar sakte hain.
*  High-Density Breakdown:Security (Bearer JWT): Har request ko prove karna hoga ki user authenticated hai. Yeh Node.js auth-service validate karega.
*  Headers for Metadata: Humne GPS coordinates (X-Device-Latitude, X-Device-Longitude) ko request body mein nahi, balki Headers mein rakha hai. Iska reason yeh hai ki API Gateway headers ko bina multipart body parse kiye fast-read kar sakta hai, jisse geolocation spoofing blocks aur routing decisions millisecond mein liye ja sakein.
*  Multipart/Form-Data: Content (text) aur image ek saath single request mein jaate hain taaki partial data failure (jaise text save ho gaya par image fail ho gayi) jaisi race conditions avoid ki ja sakein.


-------

# 3. State Transition Rules & Authorization Matrix
*  This matrix acts as the exact business logic you will implement in your Node.js auth-service middleware and Express controllers.

| Current State | Trigger / Action | Next State | Authorized Role (Actor) | Code Logic / Note |
| :--- | :--- | :--- | :--- | :--- |
| **`NULL`** | User submits multipart payload | **`PENDING_NLP`** | Citizen | Starts Kafka `sync_processing` stream. |
| **`PENDING_NLP`** | Gemma-2B/ViT detects abuse/deepfake | **`FLAGGED_FRAUD`** | System (AI Microservice) | Automatically flagged; bypasses Ward logic. |
| **`PENDING_NLP`** | YOLOv8/ViT verifies authenticity | **`SPATIAL_VERIFIED`** | System (AI Microservice) | Triggers Geotag extraction. |
| **`SPATIAL_VERIFIED`**| PostGIS runs `ST_Contains()` | **`ASSIGNED_TO_WARD`** | System (PostgreSQL Trigger) | Binds to `ward_id`; sends Push Notification. |
| **`ASSIGNED_TO_WARD`**| Officer starts work | **`UNDER_PROCESS`** | WardAdmin | Updates status on Citizen tracking portal. |
| **`UNDER_PROCESS`** | Officer completes physical fix | **`RESOLVED`** | WardAdmin | Triggers final success notification. |
| **`ASSIGNED_TO_WARD`**| 48 hours pass without action | **`ESCALATED`** | System (Cron Job) | Bypasses local permissions; alerts State. |
| **`ESCALATED`** | Higher authority resolves issue | **`RESOLVED`** | StateAdmin | Cannot be resolved by WardAdmin anymore. |

## Dry Run (Execution Flow in HINGLISH)
Is matrix ka main logic permissions aur automated fallbacks ko lock karna hai.

Phase 1 (AI Gatekeeper): Jaise hi Citizen post submit karta hai, status PENDING_NLP hota hai. Is state mein koi human (Admin/Citizen) isko edit nahi kar sakta. Yeh strictly AI Microservices ka domain hai. Agar ViT ko deepfake milta hai, toh yeh turant FLAGGED_FRAUD mein chala jayega.

Phase 2 (Spatial Bind): AI se pass hone ke baad, SPATIAL_VERIFIED state hit hoti hai. Yahan DB trigger apna magic karta hai aur issue ko ASSIGNED_TO_WARD state dekar local dashboard par push kar deta hai.

Phase 3 (Human Intervention & SLA): Ab WardAdmin action leta hai (UNDER_PROCESS). Lekin sabse crucial part SLA (Service Level Agreement) hai. Agar officer ne 48 hours tak us post ko ignore kiya, toh system ka background cron job automatically status ko ESCALATED kar dega. Ek baar escalate hone ke baad, local WardAdmin apni galti chhupane ke liye usko RESOLVED mark nahi kar payega—ab yeh power sirf StateAdmin ke paas hai.

-------


# 4. The Solutions to Your Architectural Constraints (Circuit Breaker & Fallback Architecture)

* Scenario A: The YOLO / ViT GPU Cluster Crashes or Spikes
  *  Logic: Hum requests ko drop nahi karenge. Hum ek Circuit Breaker Pattern implement karenge.
  *  Closed State: Normal traffic flows to GPUs.
  *  Open State: Agar GPUs lagatar 5 requests fail karte hain (OOM/Timeout), circuit "Open" ho jata hai. Nayi requests directly Kafka Dead Letter Queue (DLQ) (gpu_retry_dlq) mein bhej di jati hain.
  *  User Experience: User ko error nahi dikhega. API abhi bhi 202 Accepted dega, par issue ka status DB mein Pending se Delayed_Processing ho jayega. Jab GPU recover hoga (Half-Open state), Kafka DLQ se messages wapas      consume karna shuru karega.
* Scenario B: User's Image has EXIF Tags Stripped for Privacy
  * Logic: Privacy settings (like WhatsApp/Telegram images) EXIF metadata hata deti hain.
  * Fallback 1: Agar image mein EXIF nahi hai, toh Geotag Engine turant X-Device-Latitude aur X-Device-Longitude headers par fallback karega jo API Gateway ne accept kiye the.
  * Anti-Spoofing Check: Agar EXIF mojood hai aur headers bhi hain, toh engine dono ka distance calculate karega (Haversine formula). Agar difference > 500 meters hai, toh flag as GEO_SPOOFED (Location Fraud).
 
-----

# 5. MLOps Strategy & Dry Run (HINGLISH Breakdown)
* Is architecture ka main goal API latency ko zero karna aur expensive GPU resources ko optimize karna hai.
   * Hot-Swapping (Zero Downtime): Agar aapka Data Science team YOLOv8 ka ek naya, better version train karta hai, toh unhe sirf naya model AWS S3 ke v2/ folder mein drop karna hai. Triton automatically usko detect karega, background mein load karega, aur traffic ko smoothly naye model par shift kar dega bina kisi API downtime ke.
   * Dynamic Batching: Agar ek sath 10 citizens civic issues report karte hain, toh 10 alag-alag GPU threads launch karne (jo system crash kar dega) ke bajaye, Triton un requests ko 50 milliseconds ke liye hold karega aur ek single batch banakar GPU mein bhejega. Isse throughput maximize hota hai aur RAM/VRAM spikes prevent hote hain.
   * Microservice Isolation: Aapka Python FastAPI code ab heavy machine learning logic run nahi kar raha hai. Woh sirf images accept karta hai aur gRPC ke through Triton ko bhej deta hai. Iska matlab agar YOLO crash bhi ho jaye, toh FastAPI zinda rahegi aur requests ko gpu_retry_dlq (Kafka) mein daal degi.
