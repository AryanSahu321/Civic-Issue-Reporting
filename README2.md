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
