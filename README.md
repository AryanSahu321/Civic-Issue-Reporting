# Civic-Issue-Reporting
##app work flow
```mermaid
graph TD
    %% ==========================================
    %% GLOBAL STYLING (DARK THEME OPTIMIZED)
    %% ==========================================
    %% 1. Default edge style (Brighter Grey for Dark Backgrounds)
    linkStyle default stroke:#cfd8dc,stroke-width:2px,fill:none;

    %% 2. Node Classes (Brighter Fills, Darker Strokes, Black Text)
    classDef std fill:#82b1ff,stroke:#002171,stroke-width:2px,color:#000
    classDef dec fill:#ff80ab,stroke:#880e4f,stroke-width:2px,color:#000
    classDef db fill:#ffff8d,stroke:#e65100,stroke-width:2px,color:#000

    %% ==========================================
    %% PHASE 1: GATEKEEPER ENGINE
    %% ==========================================
    N1["START: User<br>Submits Post"]:::std --> N2["Post Type:<br>Issue or<br>Thank You"]:::std
    N2 --> N3["Step 1: Content<br>Gatekeeper Engine"]:::std
    N3 --> N4["Policy/Abuse Violation Security<br>Anti-spam/bot<br>Anti-Abuse<br>People-friendly"]:::std
    N4 --> D1{"Spam, Abuse, Policy<br>Violation Present?"}:::dec

    %% DECISION 1 PATHS
    D1 -->|"Yes (Spam)"| E1["Terminated<br>Session"]:::std
    D1 -->|"No (Clean)"| D_Type{"Is Content an<br>Issue or Friendly?"}:::dec

    %% NEW ROUTING: FRIENDLY VS ISSUE
    D_Type -->|"Civic Issue"| N5["Step 2: Fake<br>Media<br>Detection"]:::std
    D_Type -->|"Friendly Data<br>& Thank You"| CentralDB[("Central Database")]:::db

    %% ==========================================
    %% PHASE 2: FAKE MEDIA DETECTION
    %% ==========================================
    N5 --> N6["Check: AI-generated media /<br>Old recycled photo/video"]:::std
    N6 --> D2{"Fake or<br>Duplicated?"}:::dec

    %% DECISION 2 & 3 PATHS
    D2 -->|"Yes"| D3{"Fake or<br>Fraud?"}:::dec
    D3 --> N7["Flag for<br>Review"]:::std
    D3 --> N8["Automated<br>Reject"]:::std
    
    N7 --> BRE1["END: Post<br>Removed /<br>Flagged"]:::std
    N8 --> BRE2["END: Post<br>Removed"]:::std

    %% ==========================================
    %% NEW PHASE 2.5: GEOTAGGING & ROUTING
    %% ==========================================
    D2 -->|"No (Authentic)"| N_Geo["Step 2.5: Geotag Extraction<br>& Routing Engine"]:::std
    N_Geo --> D_Geo{"Is GPS Valid<br>& Match EXIF?"}:::dec
    
    D_Geo -->|"No (Spoofed/Missing)"| GeoReject["Reject: Location Invalid<br>or Spoofed"]:::std
    D_Geo -->|"Yes (Verified)"| N_Assign["GIS Mapping:<br>Auto-Assign to Local Ward Authority"]:::std

    N_Assign --> N9["Step 3: Central<br>Database &<br>Analytics Hub"]:::std

    %% ==========================================
    %% PHASE 3: SENTIMENT & PERCEPTION
    %% ==========================================
    N9 --> N10["Log Post /<br>Update Issue ID<br>Status"]:::std
    N10 --> N11["Sentiment Observation<br>Engine<br>(VADER/TextBlob/<br>BERT NLP)"]:::std
    N11 --> N12["Public<br>Perception<br>Categories"]:::std
    
    N12 --> P1A["Neutrals"]:::std
    N12 --> P1B["Supporters"]:::std
    N12 --> P1C["Haters"]:::std
    
    P1A --> N13["Merge Category<br>Analysis"]:::std
    P1B --> N13
    P1C --> N13

    %% ==========================================
    %% PHASE 4: GOVERNMENT & CITIZEN PORTAL
    %% ==========================================
    N13 --> N14["Step 4: Government<br>Control Site<br>Admin View Local"]:::std
    N14 --> N15["Authorized<br>Officers"]:::std
    N15 --> N16["Visibility Toggle:<br>LOCAL / STATE Level"]:::std
    N16 --> N17["Step 5: Public<br>Viewer Status<br>Portal"]:::std

    %% DIRECT ROUTE FOR FRIENDLY CONTENT TO STEP 5
    CentralDB -->|"Publish directly<br>to Portal"| N17

    N17 --> N18["Secure Citizen<br>Login"]:::std
    N18 --> N19["Track Only Their<br>Problem.<br>Where is my post?"]:::std
    N19 --> N20["Status<br>Updates:"]:::std

    N20 --> P2A["Under<br>Process"]:::std
    N20 --> P2B["Solved"]:::std

    P2A --> N21["Step 6:<br>Automated Status<br>Report Creator"]:::std
    P2B --> N21

    %% ==========================================
    %% PHASE 5: FINAL DECISION
    %% ==========================================
    N21 --> D4{"Solved at Local<br>Level?"}:::dec

    D4 -.->|"No"| N22["Auto-Escalates /<br>Email status report to<br>higher level authority.<br>No local level permission<br>needed."]:::std
    N22 --> T1["END:<br>Escalated"]:::std

    D4 -->|"Yes"| N23["Update<br>Status: Solved"]:::std
    N23 --> N24["Push to<br>Central<br>Database"]:::std
    N24 --> T2["END:<br>Resolved"]:::std

    %% ==========================================
    %% NEW SENTIMENT DB CONNECTIONS
    %% ==========================================
    CentralDB -.->|"Fetch Past Data"| N11
    N13 -->|"Push Result to DB"| CentralDB

    %% ==========================================
    %% LINK STYLING (Neon Green/Red Logic Arrows)
    %% ==========================================
    %% Note: Absolute numbering dynamically matches the current tree structure.
    
    %% D1 Yes (Spam) -> Bright Red
    linkStyle 4 stroke:#ff1744,stroke-width:2px;
    %% D1 No (Clean) -> Bright Green
    linkStyle 5 stroke:#00e676,stroke-width:2px;
    
    %% D2 Yes (Fake) -> Bright Red
    linkStyle 10 stroke:#ff1744,stroke-width:2px;
    %% D2 No (Authentic) -> Bright Green
    linkStyle 15 stroke:#00e676,stroke-width:2px;

    %% D_Geo No (Spoofed) -> Bright Red
    linkStyle 17 stroke:#ff1744,stroke-width:2px;
    %% D_Geo Yes (Verified) -> Bright Green
    linkStyle 18 stroke:#00e676,stroke-width:2px;
    
    %% D4 No (Escalate) -> Bright Red Dashed
    linkStyle 42 stroke:#ff1744,stroke-width:2px,stroke-dasharray: 5 5;
    %% D4 Yes (Solved) -> Bright Green
    linkStyle 44 stroke:#00e676,stroke-width:2px;
```




## model working flow 
```mermaid
graph TD
    %% ==========================================
    %% GLOBAL STYLING (DARK THEME OPTIMIZED)
    %% ==========================================
    linkStyle default stroke:#cfd8dc,stroke-width:2px,fill:none;

    classDef input fill:#69f0ae,stroke:#1b5e20,stroke-width:2px,color:#000;
    classDef model fill:#e040fb,stroke:#4a148c,stroke-width:2px,color:#000;
    classDef decision fill:#ffd740,stroke:#e65100,stroke-width:2px,color:#000;
    classDef terminal fill:#ff5252,stroke:#b71c1c,stroke-width:2px,color:#000;
    classDef db fill:#40c4ff,stroke:#01579b,stroke-width:2px,color:#000;
    classDef bucket fill:#cfd8dc,stroke:#37474f,stroke-width:2px,stroke-dasharray: 3 3,color:#000;
    classDef engine fill:#ffab40,stroke:#e65100,stroke-width:2px,color:#000;

    %% ----- 1. USER INPUT -----
    Input[/"Civic Post (Text + Image + GPS)"/]:::input

    %% ----- 2. LAYER 1: NLP GATEKEEPER -----
    subgraph Layer_1 ["Layer 1: NLP Gatekeeper"]
        direction TB
        ToxicClass["Toxic/Policy Classifier"]:::model
        CheckToxic{"Is Toxic?"}:::decision
        Abort("Hard Abort & Delete"):::terminal
        IntentRouter["Intent Router"]:::model
        CheckIntent{"Intent Type?"}:::decision
        OtherPosts("Other/Irrelevant (End)"):::terminal
        ThankYou("Thank You Posts (End)"):::terminal
        IssuePosts["Issue Posts (Continue)"]:::input
    end

    Input -->|"Route Text"| ToxicClass
    ToxicClass --> CheckToxic
    CheckToxic -->|"Toxic"| Abort
    CheckToxic -->|"Compliant"| IntentRouter
    IntentRouter --> CheckIntent
    CheckIntent -->|"Thank You"| ThankYou
    CheckIntent -->|"Other"| OtherPosts
    CheckIntent -->|"Issue"| IssuePosts

    %% ----- 3. LAYER 2: FAKE MEDIA & FRAUD PREVENTION -----
    subgraph Layer_2 ["Layer 2: Fake Media & Fraud Prevention"]
        direction TB
        GenCheck["AI Generative Check (CNN/ViT)"]:::model
        CheckDeepfake{"Is Deepfake?"}:::decision
        RejectFake("Flag & Reject"):::terminal
        pHash["pHash Duplicate Check"]:::model
        CheckDB{"Match in DB?"}:::decision
        RejectFraud("Flag as Fraud"):::terminal
        UniqueImage["Verified Unique Image"]:::input
    end

    IssuePosts -->|"Route Image"| GenCheck
    GenCheck --> CheckDeepfake
    CheckDeepfake -->|"Yes"| RejectFake
    CheckDeepfake -->|"Authentic"| pHash
    pHash --> CheckDB
    CheckDB -->|"Match Found"| RejectFraud
    CheckDB -->|"Unique"| UniqueImage

    %% ----- 3.5 LAYER 2.5: GEOTAG & SPATIAL ENGINE -----
    subgraph Layer_2_5 ["Layer 2.5: Geotag & Spatial Engine"]
        direction TB
        GeoExtract["Spatial Extractor<br>(EXIF vs Live GPS)"]:::model
        CheckGeo{"Is Location<br>Valid?"}:::decision
        RejectGeo("Flag & Reject<br>(Spoofed GPS)"):::terminal
        SpatialDedup["Spatial Clustering<br>(Radius Deduplication)"]:::model
        GeoVerified["Spatially Verified<br>Image & Data"]:::input
    end

    UniqueImage -->|"Extract Coordinates"| GeoExtract
    GeoExtract --> CheckGeo
    CheckGeo -->|"Invalid / Spoofed"| RejectGeo
    CheckGeo -->|"Valid Match"| SpatialDedup
    SpatialDedup -->|"Assign GIS Zone"| GeoVerified

    %% ----- 4. LAYER 3: INFRASTRUCTURE CV ENGINE -----
    subgraph Layer_3 ["Layer 3: Infrastructure CV Engine"]
        direction TB
        VisionClass["Vision Classifier (YOLO/MobileNet)"]:::model
        CatPotholes["Potholes"]:::bucket
        CatGarbage["Garbage"]:::bucket
        CatLights["Streetlights"]:::bucket
        FinalDB[("Central Relational Database<br>+ GIS Data")]:::db
    end

    GeoVerified -->|"Verified Tensor"| VisionClass
    VisionClass -->|"Categorize"| CatPotholes
    VisionClass -->|"Categorize"| CatGarbage
    VisionClass -->|"Categorize"| CatLights
    
    %% Save classified issues and clean text to DB
    CatPotholes -->|"Save Issue + GPS"| FinalDB
    CatGarbage -->|"Save Issue + GPS"| FinalDB
    CatLights -->|"Save Issue + GPS"| FinalDB
    IssuePosts -.->|"Save Clean Text"| FinalDB

    %% ----- 5. LAYER 4: BEHAVIORAL ANALYTICS -----
    subgraph Layer_4 ["Layer 4: Behavioral Analytics Engine"]
        direction TB
        BehaviorEngine["User Behavior & Sentiment Engine"]:::engine
        RatioCalc{"Calc: % Negative vs % Thanks"}:::decision
        Haters[/"[Haters]"/]:::bucket
        Supporters[/"[Supporters]"/]:::bucket
        Neutrals[/"[Neutrals]"/]:::bucket
    end

    %% NEW LOGIC: Engine ONLY pulls from DB, not from Input
    FinalDB -.->|"Fetch Text & Past Data<br>(Async Batch Process)"| BehaviorEngine
    
    BehaviorEngine --> RatioCalc
    RatioCalc -->|"High % Negative"| Haters
    RatioCalc -->|"High % Thanks"| Supporters
    RatioCalc -->|"Balanced / Low Data"| Neutrals

    %% NEW LOGIC: Push results back to DB
    Haters -->|"Update DB Status"| FinalDB
    Supporters -->|"Update DB Status"| FinalDB
    Neutrals -->|"Update DB Status"| FinalDB

    %% ==========================================
    %% SUBGRAPH TRANSPARENCY & DARK TEXT FIX
    %% ==========================================
    style Layer_1 fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style Layer_2 fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style Layer_2_5 fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style Layer_3 fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style Layer_4 fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
```





## 1. Text Moderation & Routing (BERT / Gemma-2B) -> Toxic/Policy Classifier
*  Yeh model text ko samajhne ke liye Transformer architecture ka use karta hai. Is prompt se aapko Multi-Head Attention mechanism ki mapping milegi.

```mermaid
graph TD
    %% ----- STYLING & COLOR CODING -----
    %% Green for Input Layer
    classDef inputLayer fill:#d5e8d4,stroke:#82b366,stroke-width:2px,color:#000;
    %% Blue for Transformer Block
    classDef transformer fill:#dae8fc,stroke:#6c8ebf,stroke-width:2px,color:#000;
    %% Red for Output & Prediction
    classDef outputLayer fill:#f8cecc,stroke:#b85450,stroke-width:2px,color:#000;
    classDef predictLayer fill:#ffe6e6,stroke:#ff0000,stroke-width:2px,color:#000;

    %% ----- 1. INPUT LAYER -----
    subgraph Sub_Input [1. Input Layer]
        direction TB
        RawText["Raw User Text"]:::inputLayer
        Tokenizer["Tokenization (Sub-word)"]:::inputLayer
        Embed["Input Embeddings"]:::inputLayer
        Positional["Positional Encodings"]:::inputLayer
        CombineEmbed{"⊕ Combine"}:::inputLayer
        
        RawText --> Tokenizer
        Tokenizer --> Embed
        Tokenizer --> Positional
        Embed --> CombineEmbed
        Positional --> CombineEmbed
    end

    %% ----- 2. HIDDEN LAYERS (TRANSFORMER BLOCK) -----
    subgraph Sub_Transformer [2. Hidden Layers: Transformer Block]
        direction TB
        Attention["Multi-Head Self-Attention"]:::transformer
        AddNorm1["Add & Norm"]:::transformer
        FFN["Position-wise Feed Forward Network"]:::transformer
        AddNorm2["Add & Norm"]:::transformer
        
        Attention --> AddNorm1
        AddNorm1 --> FFN
        FFN --> AddNorm2
    end

    %% Connect Input to Transformer
    CombineEmbed -->|Embedded Tokens| Attention
    
    %% Looping mechanism to indicate N repeating blocks
    AddNorm2 -.->|Repeat Block N Times| Attention

    %% ----- 3. OUTPUT LAYER -----
    subgraph Sub_Output [3. Output Layer]
        direction TB
        Pooled["Pooled Output"]:::outputLayer
        Linear["Fully Connected Linear Layer"]:::outputLayer
        Softmax["Softmax Activation"]:::outputLayer
        
        Pooled --> Linear
        Linear --> Softmax
    end

    %% Connect Transformer to Output Layer
    AddNorm2 -->|Final Hidden State| Pooled

    %% ----- 4. FINAL PREDICTION -----
    subgraph Sub_Prediction [4. Final Classification]
        direction TB
        ClassIssue(["Issue"]):::predictLayer
        ClassThankYou(["Thank You"]):::predictLayer
        ClassToxic(["Toxic"]):::predictLayer
    end

    %% Connect Output to Classification Nodes
    Softmax -->|Probability Distribution| ClassIssue
    Softmax -->|Probability Distribution| ClassThankYou
    Softmax -->|Probability Distribution| ClassToxic
```







## 2. Fake Media & Fraud Detection (CNN / Vision Transformer)
*  Yeh model deepfakes ya AI-generated noise pakadne ke liye image ki deep structural frequencies ko analyze karta hai.

``` mermaid
graph TD
    %% ==========================================
    %% STYLING & COLOR CODING
    %% ==========================================
    classDef inputLayer fill:#d5e8d4,stroke:#82b366,stroke-width:2px,color:#000;
    classDef convBlock fill:#dae8fc,stroke:#6c8ebf,stroke-width:2px,color:#000;
    classDef decision fill:#ffecb3,stroke:#f39c12,stroke-width:2px,color:#000;
    classDef outputLayer fill:#f8cecc,stroke:#b85450,stroke-width:2px,color:#000;
    classDef predictLayer fill:#ffe6e6,stroke:#ff0000,stroke-width:2px,color:#000;

    %% ==========================================
    %% 1. INPUT LAYER
    %% ==========================================
    subgraph Sub_Input ["1. Input Layer: Multi-Modal Civic Data"]
        direction TB
        RawImage["Raw Civic Image (RGB Matrix)"]:::inputLayer
        EXIFData["EXIF Metadata & Device GPS"]:::inputLayer
        FreqTrans["Frequency Domain Transformation"]:::inputLayer
        
        RawImage --> FreqTrans
    end

    %% ==========================================
    %% 2. HIDDEN LAYERS (HYBRID FEATURE EXTRACTION)
    %% ==========================================
    subgraph Sub_Hidden ["2. Hidden Layers: Visual + Spatial Verification"]
        direction TB
        
        subgraph CNN_Branch ["Visual Artifact Analysis (CNN/ViT)"]
            direction TB
            Conv2D["Conv2D Layer"]:::convBlock
            BatchNorm["Batch Normalization"]:::convBlock
            ReLU["ReLU Activation"]:::convBlock
            MaxPool["Max Pooling (Downsampling)"]:::convBlock
            FeatureMaps["Noise & Artifact Feature Maps"]:::convBlock

            Conv2D --> BatchNorm --> ReLU --> MaxPool --> FeatureMaps
        end

        subgraph Geo_Branch ["Metadata & Geolocation Engine"]
            direction TB
            GeoValidator["EXIF & Geo-Validator<br>(Check Stripped Tags / Device vs Metadata Match)"]:::convBlock
            GeoDecision{"Valid GPS & Match?"}:::decision
            GeoFlag["Flag: Recycled / Geo-Tampered"]:::outputLayer

            GeoValidator --> GeoDecision
            GeoDecision -->|"No (Stripped / Mismatched)"| GeoFlag
        end
    end

    %% Connect Inputs to Hidden Branches
    FreqTrans --> Conv2D
    EXIFData --> GeoValidator

    %% ==========================================
    %% 3. OUTPUT LAYER
    %% ==========================================
    subgraph Sub_Output ["3. Output Layer: Multimodal Aggregation"]
        direction TB
        GAP["Global Average Pooling (Visual Maps)"]:::outputLayer
        Dense["Dense (Fully Connected) Layer"]:::outputLayer
        Sigmoid["Sigmoid / Softmax Classification Hub"]:::outputLayer

        GAP --> Dense
        GeoDecision -->|"Yes (Verified Match)"| Dense
        Dense --> Sigmoid
    end

    FeatureMaps --> GAP

    %% ==========================================
    %% 4. FINAL PREDICTION
    %% ==========================================
    subgraph Sub_Prediction ["4. Final Prediction: Fraud & Tamper Classification"]
        direction TB
        AuthMedia(["Authentic Media (Verified GPS & Real)"]):::predictLayer
        AIGenerated(["AI-Generated / Deepfake"]):::predictLayer
        GeoTampered(["Recycled Photo / Location Fraud"]):::predictLayer
    end

    %% Connect Output to Predictions
    Sigmoid -->|"Clean Visuals & Valid GPS"| AuthMedia
    Sigmoid -->|"Synthetic Frequencies Detected"| AIGenerated
    GeoFlag --> GeoTampered
```



## 3. Civic Issue Classification (YOLOv8 / MobileNetV2)
*  Object detection aur classification models (jaise YOLO) ka structure simple CNN se thoda alag hota hai kyunki inhein objects ki location (bounding boxes) bhi predict karni hoti hai.

```mermaid
graph TD
    %% ==========================================
    %% STYLING & COLOR CODING
    %% ==========================================
    classDef inputLayer fill:#d5e8d4,stroke:#82b366,stroke-width:2px,color:#000;
    classDef hiddenBlock fill:#dae8fc,stroke:#6c8ebf,stroke-width:2px,color:#000;
    classDef outputLayer fill:#f8cecc,stroke:#b85450,stroke-width:2px,color:#000;
    classDef predictLayer fill:#ffe6e6,stroke:#ff0000,stroke-width:2px,color:#000,shape:stadium;

    %% ==========================================
    %% 1. INPUT LAYER (WITH SPATIAL BINDING)
    %% ==========================================
    subgraph Sub_Input ["1. Input Layer: Vision Grid & Spatial Metadata"]
        direction TB
        InputGrid["Pre-processed Image Grid (e.g., 640x640x3)"]:::inputLayer
        VerifiedGPS["Verified GPS Coordinates & Ward Metadata"]:::inputLayer
    end

    %% ==========================================
    %% 2. HIDDEN LAYERS (THE BACKBONE & NECK)
    %% ==========================================
    subgraph Sub_Hidden ["2. Hidden Layers: Feature Extraction & Aggregation"]
        direction TB
        Backbone["Backbone (Feature Extractor):<br>CSPNet / MobileNet Blocks<br>Extracting spatial features (edges, textures)"]:::hiddenBlock
        Neck["Neck (Feature Aggregation):<br>PANet / FPN<br>Merging multi-scale features"]:::hiddenBlock

        Backbone --> Neck
    end

    %% Connect Input to Hidden
    InputGrid -->|"Tensor Feed"| Backbone

    %% ==========================================
    %% 3. OUTPUT LAYER (THE HEAD & GIS MAPPING)
    %% ==========================================
    subgraph Sub_Output ["3. Output Layer: Detection Head & GIS Routing"]
        direction TB
        BBRegressor["Bounding Box Regressor<br>Coordinates: (x, y, w, h)"]:::outputLayer
        ClassPredictor["Class Predictor<br>Object Probabilities"]:::outputLayer
        NMS["Non-Maximum Suppression (NMS)<br>Filter overlapping/duplicate boxes"]:::outputLayer
        GISBind["GIS Spatial Engine<br>Bind Bounding Boxes to Ward Coordinates"]:::outputLayer

        BBRegressor --> NMS
        ClassPredictor --> NMS
        NMS --> GISBind
    end

    %% Connect Hidden to Output
    Neck -->|"Split Dense Tensors"| BBRegressor
    Neck -->|"Split Dense Tensors"| ClassPredictor
    VerifiedGPS -->|"Attach Spatial Context"| GISBind

    %% ==========================================
    %% 4. FINAL PREDICTION
    %% ==========================================
    subgraph Sub_Prediction ["4. Final Prediction: Spatially Localized Civic Issues"]
        direction TB
        PredPothole(["Localized & Geotagged: Pothole [94%]"]):::predictLayer
        PredGarbage(["Localized & Geotagged: Garbage [89%]"]):::predictLayer
        PredLight(["Localized & Geotagged: Broken Streetlight [91%]"]):::predictLayer
    end

    %% Connect Output to Predictions
    GISBind -->|"Ward-Assigned Match"| PredPothole
    GISBind -->|"Ward-Assigned Match"| PredGarbage
    GISBind -->|"Ward-Assigned Match"| PredLight
```





## 4. Sentiment Analytics Engine (VADER / RoBERTa)
*  Yeh system background mein chalta hai. Agar model RoBERTa (Deep Learning) hai, toh architecture BERT jaisa hoga, par agar VADER (Lexicon/Rule-based) use ho raha hai, toh internal logic math aur dictionaries par base hoga.

```mermaid
graph TD
    %% ==========================================
    %% STYLING & COLOR CODING (DARK THEME OPTIMIZED)
    %% ==========================================
    classDef inputLayer fill:#d5e8d4,stroke:#82b366,stroke-width:2px,color:#000;
    classDef hiddenBlock fill:#dae8fc,stroke:#6c8ebf,stroke-width:2px,color:#000;
    classDef logicDec fill:#dae8fc,stroke:#6c8ebf,stroke-width:2px,color:#000;
    classDef outputLayer fill:#f8cecc,stroke:#b85450,stroke-width:2px,color:#000;
    classDef predictLayer fill:#ffe6e6,stroke:#ff0000,stroke-width:2px,color:#000;

    %% ==========================================
    %% 1. INPUT LAYER (WITH SPATIAL METADATA)
    %% ==========================================
    subgraph Sub_Input ["1. Input Layer: Data Ingestion & Spatial Context"]
        direction TB
        RawComments["Raw Public Comments + Ward GPS Metadata"]:::inputLayer
        Preprocess["Text Preprocessing<br>(Removing URLs, Stop words)"]:::inputLayer
        
        RawComments --> Preprocess
    end

    %% ==========================================
    %% 2. HIDDEN LAYERS (SEMANTIC ANALYSIS)
    %% ==========================================
    subgraph Sub_Hidden ["2. Hidden Layers: Semantic Analysis (Hybrid Engine)"]
        direction TB
        Embeddings["Embedding Layer<br>Context-aware embeddings"]:::hiddenBlock
        Attention["Attention Mechanism<br>Weighing emotional keywords"]:::hiddenBlock
        Polarity["Polarity Scoring Logic<br>Calculating compound scores (-1.0 to +1.0)"]:::hiddenBlock

        Embeddings --> Attention
        Attention --> Polarity
    end

    Preprocess -->|"Cleaned Text Tokens + Ward ID"| Embeddings

    %% ==========================================
    %% 3. OUTPUT LAYER
    %% ==========================================
    subgraph Sub_Output ["3. Output Layer: Threshold Mapping & Spatial Tagging"]
        direction TB
        ScoreCheck{"Compound Score?"}:::logicDec
        RouteHater["Route to Haters"]:::outputLayer
        RouteSupporter["Route to Supporters"]:::outputLayer
        RouteNeutral["Route to Neutrals"]:::outputLayer

        ScoreCheck -->|"Score <= -0.3"| RouteHater
        ScoreCheck -->|"Score >= 0.3"| RouteSupporter
        ScoreCheck -->|"Else (-0.29 to +0.29)"| RouteNeutral
    end

    Polarity -->|"Final Decimal Score + Spatial Link"| ScoreCheck

    %% ==========================================
    %% 4. FINAL PREDICTION & SPATIAL DASHBOARD
    %% ==========================================
    subgraph Sub_Prediction ["4. Final Prediction: Ward-Wise Sentiment Bucketing"]
        direction TB
        BucketHaters(["[Haters] Ward Bucket"]):::predictLayer
        BucketSupporters(["[Supporters] Ward Bucket"]):::predictLayer
        BucketNeutrals(["[Neutrals] Ward Bucket"]):::predictLayer
        Dashboard["GIS Analytics Dashboard<br>(Live Ward Heatmaps & Metrics)"]:::outputLayer
    end

    RouteHater --> BucketHaters
    RouteSupporter --> BucketSupporters
    RouteNeutral --> BucketNeutrals

    BucketHaters --> Dashboard
    BucketSupporters --> Dashboard
    BucketNeutrals --> Dashboard
```
## work flow of all layer together
```mermaid
graph TD
    %% ==========================================
    %% GLOBAL STYLING (DARK THEME OPTIMIZED)
    %% ==========================================
    classDef infra fill:#ffb74d,stroke:#e65100,stroke-width:2px,color:#000;
    classDef ai fill:#64b5f6,stroke:#0d47a1,stroke-width:2px,color:#000;
    classDef db fill:#fff176,stroke:#f57f17,stroke-width:2px,color:#000;
    classDef client fill:#81c784,stroke:#1b5e20,stroke-width:2px,color:#000;

    %% Make arrows clearly visible on dark background
    linkStyle default stroke:#b0bec5,stroke-width:2px,fill:none;

    %% ==========================================
    %% 1. CLIENT & EDGE INGESTION
    %% ==========================================
    subgraph L0 ["Client & Edge Ingestion"]
        direction TB
        MC["Mobile Client"]:::client
        API["AWS API Gateway"]:::infra
        K_Sync["Kafka Topic:<br>sync_processing"]:::infra
        K_Async["Kafka Topic:<br>async_analytics"]:::infra

        MC -- "Sends JSON<br>(Text + Image + GPS)" --> API
        API -->|"Route Block"| K_Sync
        API -->|"Route Async"| K_Async
    end

    %% ==========================================
    %% 2. LAYER 1: NLP MODERATION
    %% ==========================================
    subgraph L1 ["Layer 1: NLP Moderation (ONNX-Optimized)"]
        direction TB
        K_Cons["Kafka Consumer"]:::infra
        Redis{"Redis Cache:<br>Duplicate Text?"}:::db
        CacheResp["Return Cached Response"]:::client
        Toxic["Toxic Classifier<br>(Gemma-2B INT8)"]:::ai
        D1{"Decision 1:<br>Toxicity Score > 0.9?"}:::infra
        DLQ["Dead Letter Queue /<br>Auto-Delete"]:::infra
        Intent["Intent Router<br>(BERT-Base)"]:::ai
        ThankYou["Thank You Stream<br>(Ends)"]:::client
        Issue["Issue Stream"]:::infra

        K_Sync --> K_Cons
        K_Cons --> Redis
        Redis -- "Yes" --> CacheResp
        Redis -- "No" --> Toxic
        Toxic --> D1
        D1 -- "Yes" --> DLQ
        D1 -- "No (Compliant)" --> Intent
        Intent -- "Thank You" --> ThankYou
        Intent -- "Issue" --> Issue
    end

    %% ==========================================
    %% 3. LAYER 2: VISION SECURITY & GEOTAGGING
    %% ==========================================
    subgraph L2 ["Layer 2: Vision Security & Geotagging"]
        direction TB
        pHash["pHash Logic Engine"]:::ai
        DB_Vec[("PostgreSQL / Redis<br>Vector Store")]:::db
        D2{"Decision 2:<br>Hash Match?<br>(Hamming < 5)"}:::infra
        Fraud["Flag as Fraud"]:::client
        ViT["Generative AI Anomaly Detector<br>(ViT in TensorRT)"]:::ai
        D3{"Decision 3:<br>Is Deepfake?"}:::infra
        Reject["Reject"]:::client
        GeoEngine["Geo & Spatial Engine<br>(EXIF vs GPS & Ward Mapping)"]:::ai
        D_Geo{"Valid GPS Match?"}:::infra
        GeoReject["Reject: Spoofed / Missing GPS"]:::client
        PassAuth["Pass Spatially Verified Data to Layer 3"]:::infra

        Issue -- "Image + GPS Metadata" --> pHash
        pHash <-->|"Queries for exact matches"| DB_Vec
        pHash --> D2
        D2 -- "Yes" --> Fraud
        D2 -- "No (Unique)" --> ViT
        ViT --> D3
        D3 -- "Yes" --> Reject
        D3 -- "No (Authentic)" --> GeoEngine
        GeoEngine --> D_Geo
        D_Geo -- "No" --> GeoReject
        D_Geo -- "Yes" --> PassAuth
    end

    %% ==========================================
    %% 4. LAYER 3: CIVIC ISSUE CLASSIFICATION
    %% ==========================================
    subgraph L3 ["Layer 3: Civic Issue Classification (GPU Cluster)"]
        direction TB
        CV["Civic Vision Classifier<br>(YOLOv8/MobileNetV3 on Kubernetes Pods)"]:::ai
        BBox["Generates Bounding Boxes<br>& Confidence Scores"]:::infra
        Potholes["Potholes"]:::infra
        Dumping["Illegal Dumping"]:::infra
        Wires["Wire Hazards"]:::infra
        DB_Meta[("PostgreSQL<br>(Metadata + GIS Ward)")]:::db
        DB_S3[("AWS S3 Bucket<br>(Raw Image)")]:::db
        Push["Success Push Notification"]:::client

        PassAuth --> CV
        CV --> BBox
        BBox --> Potholes
        BBox --> Dumping
        BBox --> Wires
        
        Potholes -->|"Write Metadata + Ward"| DB_Meta
        Dumping -->|"Write Metadata + Ward"| DB_Meta
        Wires -->|"Write Metadata + Ward"| DB_Meta
        
        Potholes -->|"Write Raw Image"| DB_S3
        Dumping -->|"Write Raw Image"| DB_S3
        Wires -->|"Write Raw Image"| DB_S3

        DB_Meta -->|"Trigger"| Push
        DB_S3 -->|"Trigger"| Push
    end

    %% ==========================================
    %% 5. LAYER 4: SENTIMENT ANALYTICS
    %% ==========================================
    subgraph L4 ["Layer 4: Sentiment Analytics (Asynchronous Engine)"]
        direction TB
        SentEng["Sentiment Engine<br>(VADER + RoBERTa)"]:::ai
        Agg["Aggregates Polarity Scores<br>+ Ward Clustering"]:::infra
        Haters["Haters"]:::infra
        Neutrals["Neutrals"]:::infra
        Supporters["Supporters"]:::infra
        Dash["Live Admin Dashboard<br>(Ward Heatmaps)"]:::client

        K_Async -.->|"Async Text Feed"| SentEng
        SentEng --> Agg
        Agg --> Haters
        Agg --> Neutrals
        Agg --> Supporters
        Haters -->|"Updates Metrics"| Dash
        Neutrals -->|"Updates Metrics"| Dash
        Supporters -->|"Updates Metrics"| Dash
    end

    %% ==========================================
    %% SUBGRAPH TRANSPARENCY & DARK TEXT FIX
    %% ==========================================
    style L0 fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style L1 fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style L2 fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style L3 fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style L4 fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
```


## dedicated "Security & Infrastructure Architecture" diagram.
```mermaid
graph TD
    %% ==========================================
    %% GLOBAL STYLING (DARK THEME OPTIMIZED)
    %% ==========================================
    classDef infra fill:#ffb74d,stroke:#e65100,stroke-width:2px,color:#000;
    classDef ai fill:#64b5f6,stroke:#0d47a1,stroke-width:2px,color:#000;
    classDef db fill:#fff176,stroke:#f57f17,stroke-width:2px,color:#000;
    classDef client fill:#81c784,stroke:#1b5e20,stroke-width:2px,color:#000;
    classDef sec fill:#ff80ab,stroke:#880e4f,stroke-width:2px,color:#000;

    linkStyle default stroke:#b0bec5,stroke-width:2px,fill:none;

    %% ==========================================
    %% 1. PERIMETER & EDGE SECURITY
    %% ==========================================
    subgraph Perimeter ["Perimeter & Edge Security Layer"]
        direction TB
        Client["Mobile Client / Web Portal"]:::client
        WAF["AWS WAF & DDoS Protection<br>(IP Throttling & Rate Limiting)"]:::sec
        APIGateway["AWS API Gateway<br>(Enforced TLS 1.3)"]:::infra

        Client -->|"HTTPS / TLS 1.3"| WAF
        WAF --> APIGateway
    end

    %% ==========================================
    %% 2. AUTHENTICATION & ACCESS CONTROL (IAM)
    %% ==========================================
    subgraph IAM ["Identity & Access Management (IAM)"]
        direction TB
        AuthService["Auth Service<br>(JWT & OAuth2 Validation)"]:::sec
        RBAC["Role-Based Access Control (RBAC)<br>(Citizen vs. Ward Admin)"]:::sec

        APIGateway --> AuthService
        AuthService --> RBAC
    end

    %% ==========================================
    %% 3. APPLICATION & AI INFERENCE VPC (PRIVATE SUBNET)
    %% ==========================================
    subgraph PrivateVPC ["Private VPC (Isolated Cluster)"]
        direction TB
        mTLS["mTLS Service Mesh<br>(Encrypted Pod-to-Pod Comms)"]:::sec
        AI_Cluster["Secure AI Inference Pods<br>(NLP, Vision, & Sentiment Models)"]:::ai
        DataSanitizer["Input Sanitization & PII Redactor<br>(Prompt Injection & Script Guard)"]:::sec

        RBAC --> mTLS
        mTLS --> DataSanitizer
        DataSanitizer --> AI_Cluster
    end

    %% ==========================================
    %% 4. SECURE DATA LAYER (AT REST & STORAGE)
    %% ==========================================
    subgraph DataLayer ["Secure Data Layer (At Rest Encryption)"]
        direction TB
        PG[("PostgreSQL Database<br>(AES-256 + Row-Level Security)")]:::db
        Redis[("Redis Cache<br>(Encrypted Token & Session Store)")]:::db
        S3[("AWS S3 Storage<br>(Encrypted Buckets + Pre-signed URLs)")]:::db
    end

    AI_Cluster -->|"Encrypted Queries"| PG
    AI_Cluster -->|"Session Check"| Redis
    AI_Cluster -->|"Secure Asset Archive"| S3

    %% ==========================================
    %% 5. MONITORING & AUDITING
    %% ==========================================
    subgraph Compliance ["Monitoring & Security Auditing"]
        direction TB
        SIEM["Centralized SIEM & Audit Logs<br>(Anomaly Detection & Kafka Audit)"]:::sec
    end

    PG -.-> SIEM
    APIGateway -.-> SIEM
    AI_Cluster -.-> SIEM

    %% ==========================================
    %% SUBGRAPH TRANSPARENCY
    %% ==========================================
    style Perimeter fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style IAM fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style PrivateVPC fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style DataLayer fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style Compliance fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
```

# 1. Database Schema Map (Dark Theme Optimized)
*  Highly-Styled Structural Map (graph TD): Perfectly matches the custom color-coding, layout, and styling constraints of your previous diagrams. It visually incorporates the Point-in-Polygon (PiP) trigger.
```mermaid
graph TD
    %% ==========================================
    %% GLOBAL STYLING (DARK THEME OPTIMIZED)
    %% ==========================================
    classDef dbNode fill:#263238,stroke:#546e7a,stroke-width:2px,color:#ffffff,text-align:left;
    classDef extNode fill:#37474f,stroke:#ffb74d,stroke-width:2px,color:#ffffff,text-align:center,stroke-dasharray: 5 5;
    
    linkStyle default stroke:#90a4ae,stroke-width:2px,fill:none;

    %% ==========================================
    %% TABLES (ENTITIES)
    %% ==========================================
    USERS["<b>USERS</b><br/>-------------------------<br/>🔑 user_id (SERIAL)<br/>▪️ username (VARCHAR)<br/>▪️ email (VARCHAR)<br/>▪️ password_hash (VARCHAR)<br/>▪️ role (VARCHAR)<br/>▪️ created_at (TIMESTAMP)"]:::dbNode
    
    WARDS["<b>WARDS (GIS)</b><br/>-------------------------<br/>🔑 ward_id (SERIAL)<br/>▪️ ward_name (VARCHAR)<br/>▪️ city (VARCHAR)<br/>🌐 boundary (GEOMETRY: MultiPolygon)"]:::dbNode
    
    POSTS["<b>POSTS</b><br/>-------------------------<br/>🔑 post_id (SERIAL)<br/>🔗 user_id (INT)<br/>▪️ post_type (VARCHAR)<br/>▪️ content (TEXT)<br/>▪️ image_url (VARCHAR)<br/>▪️ status (VARCHAR)<br/>📍 location (GEOMETRY: Point)<br/>🔗 ward_id (INT)<br/>▪️ created_at (TIMESTAMP)<br/>▪️ updated_at (TIMESTAMP)"]:::dbNode
    
    AUDIT_LOGS["<b>AUDIT_LOGS</b><br/>-------------------------<br/>🔑 log_id (SERIAL)<br/>🔗 actor_id (INT)<br/>▪️ action (VARCHAR)<br/>▪️ details (JSONB)<br/>▪️ ip_address (VARCHAR)<br/>▪️ timestamp (TIMESTAMP)"]:::dbNode
    
    SENTIMENT["<b>SENTIMENT_METRICS</b><br/>-------------------------<br/>🔑 metric_id (SERIAL)<br/>🔗 ward_id (INT)<br/>🔗 post_id (INT)<br/>▪️ sentiment_category (VARCHAR)<br/>▪️ compound_score (NUMERIC)<br/>▪️ calculated_at (TIMESTAMP)"]:::dbNode

    TRIGGER["<b>PiP SPATIAL TRIGGER</b><br/>-------------------------<br/>⚡ assign_ward_to_post()<br/><i>ST_Contains(boundary, location)</i>"]:::extNode

    %% ==========================================
    %% RELATIONSHIPS
    %% ==========================================
    USERS -->|"1 : N<br>submits"| POSTS
    USERS -->|"1 : N<br>logs action"| AUDIT_LOGS
    WARDS -->|"1 : N<br>aggregates"| SENTIMENT
    POSTS -->|"1 : 1<br>analyzed as"| SENTIMENT
    
    %% SPATIAL JOIN
    WARDS -.->|"Provides boundary"| TRIGGER
    POSTS -.->|"BEFORE INSERT/UPDATE"| TRIGGER
    TRIGGER -.->|"Auto-assigns FK<br>(ward_id)"| POSTS

    %% ==========================================
    %% HIGHLIGHT BORDERS
    %% ==========================================
    style USERS stroke:#64b5f6
    style WARDS stroke:#ffb74d
    style POSTS stroke:#81c784
    style AUDIT_LOGS stroke:#ff80ab
    style SENTIMENT stroke:#e040fb
```

# Standard Native ERD (erDiagram): 
*  The strict technical standard for entity-relationship documentation.

```mermaid
erDiagram
    %% ==========================================
    %% DATABASE ERD: Civic-Issue-Reporting
    %% ==========================================
    
    USERS {
        SERIAL user_id PK
        VARCHAR username UK
        VARCHAR email UK
        VARCHAR password_hash
        VARCHAR role "Citizen, WardAdmin, StateAdmin"
        TIMESTAMP created_at
    }
    
    WARDS {
        SERIAL ward_id PK
        VARCHAR ward_name
        VARCHAR city
        GEOMETRY boundary "MultiPolygon, SRID 4326 (GIST)"
    }
    
    POSTS {
        SERIAL post_id PK
        INT user_id FK
        VARCHAR post_type "Issue, ThankYou"
        TEXT content
        VARCHAR image_url
        VARCHAR status "Pending...Escalated"
        GEOMETRY location "Point, SRID 4326 (GIST)"
        INT ward_id FK "Auto-assigned via PostGIS PiP"
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }
    
    AUDIT_LOGS {
        SERIAL log_id PK
        INT actor_id FK "References users(user_id)"
        VARCHAR action
        JSONB details
        VARCHAR ip_address
        TIMESTAMP timestamp
    }
    
    SENTIMENT_METRICS {
        SERIAL metric_id PK
        INT ward_id FK
        INT post_id FK
        VARCHAR sentiment_category "Haters, Supporters, Neutrals"
        NUMERIC compound_score "-1.000 to +1.000"
        TIMESTAMP calculated_at
    }

    %% ==========================================
    %% RELATIONSHIPS & CARDINALITY
    %% ==========================================
    USERS ||--o{ POSTS : "submits"
    USERS ||--o{ AUDIT_LOGS : "triggers"
    WARDS ||--o{ POSTS : "contains (spatial ST_Contains)"
    POSTS ||--o{ SENTIMENT_METRICS : "analyzed for"
    WARDS ||--o{ SENTIMENT_METRICS : "aggregated by"
```
# 2. API Request Flow Diagram
*  Yeh sequence diagram dikhata hai ki Mobile Client se aane wali single atomic request API Gateway ke through kaise validate aur route hoti hai.

```mermaid
sequenceDiagram
    autonumber
    participant App as Mobile Client
    participant WAF as AWS WAF & Rate Limiter
    participant API as AWS API Gateway
    participant Auth as Node.js Auth Service
    participant Kafka as Kafka Queue

    App->>WAF: POST /api/v1/posts/submit (Multipart + GPS Headers)
    WAF-->>WAF: Security Check (IP, Throttling, TLS 1.3)
    WAF->>API: Route Traffic
    
    API->>Auth: Validate JWT Token (RBAC)
    alt Invalid Token
        Auth-->>API: 401 Unauthorized
        API-->>App: 401 Unauthorized
    else Valid Token
        Auth-->>API: 200 OK (User Identity Confirmed)
        API->>Kafka: Push raw payload to sync_processing topic
        Kafka-->>API: Ack (Message Queued)
        API-->>App: 202 Accepted (Issue Pending Processing)
    end
```
# 3. State Machine Diagram (GitHub-Safe)
* If we don't strictly define how an issue moves from one state to another (and exactly who or what has the permission to move it), we risk race conditions—like a citizen accidentally marking an unresolved issue as "Solved" or the AI bypassing the local ward.

```mermaid
stateDiagram-v2
    %% Define States
    state "Pending NLP & Vision" as PENDING_NLP
    state "Flagged Fraud / Toxic" as FLAGGED_FRAUD
    state "Spatially Verified" as SPATIAL_VERIFIED
    state "Assigned to Ward" as ASSIGNED_TO_WARD
    state "Under Process" as UNDER_PROCESS
    state "Escalated to State" as ESCALATED
    state "Resolved" as RESOLVED

    %% Transitions
    [*] --> PENDING_NLP : Mobile App Submit

    PENDING_NLP --> FLAGGED_FRAUD : AI Rejects (ViT/Gemma)
    FLAGGED_FRAUD --> [*] : Auto-Delete or Admin Reject

    PENDING_NLP --> SPATIAL_VERIFIED : AI Approves (Clean)
    SPATIAL_VERIFIED --> ASSIGNED_TO_WARD : PostGIS PiP Trigger

    ASSIGNED_TO_WARD --> UNDER_PROCESS : Ward Admin Acknowledges
    UNDER_PROCESS --> RESOLVED : Ward Admin Fixes

    ASSIGNED_TO_WARD --> ESCALATED : SLA Timeout (48 Hrs)
    UNDER_PROCESS --> ESCALATED : SLA Timeout (7 Days)

    ESCALATED --> RESOLVED : State Admin Intervenes
    RESOLVED --> [*]
```
# 4. Circuit Breaker & Fallback Architecture 
*  Yeh flowchart dikhata hai ki jab GPU pod overload hota hai ya EXIF data missing hota hai, toh system gracefully kaise degrade karta hai.
*  Yeh Circuit Breakers, Fallbacks, aur Dead Letter Queue (DLQ) strategy kisi bhi production-grade distributed system ki backbone hoti hai, especially jab aap heavy GPU clusters (YOLOv8/ViT) run kar rahe hon. Agar ek microservice crash hoti hai, toh humein ensure karna hai ki cascading failure na ho aur mobile app down na ho.

```mermaid
graph TD
    %% ==========================================
    %% GLOBAL STYLING (GITHUB SAFE & TRANSPARENT)
    %% ==========================================
    classDef client fill:#81c784,stroke:#1b5e20,stroke-width:2px,color:#000;
    classDef cb fill:#ffb74d,stroke:#e65100,stroke-width:2px,color:#000;
    classDef ai fill:#64b5f6,stroke:#0d47a1,stroke-width:2px,color:#000;
    classDef dlq fill:#ff5252,stroke:#b71c1c,stroke-width:2px,color:#000;
    classDef db fill:#fff176,stroke:#f57f17,stroke-width:2px,color:#000;

    linkStyle default stroke:#b0bec5,stroke-width:2px,fill:none;

    Input["Kafka Topic:<br>sync_processing"]:::client
    
    subgraph Circuit_Breaker ["Circuit Breaker (Opossum/Resilience4j)"]
        direction TB
        StateCheck{"Is Circuit<br>OPEN?"}:::cb
    end

    subgraph GPU_Cluster ["AI Vision Cluster (YOLO/ViT)"]
        direction TB
        Inference["Process Image Tensor"]:::ai
        Crash{"Memory Spike /<br>Timeout?"}:::cb
    end

    subgraph Fallback_DLQ ["Fallback & Recovery"]
        direction TB
        DLQ["Kafka DLQ:<br>gpu_retry_dlq"]:::dlq
        StatusUpdate["Update DB Status:<br>Delayed_Processing"]:::db
    end

    %% Flow
    Input --> StateCheck
    StateCheck -->|"No (CLOSED)"| Inference
    StateCheck -->|"Yes (OPEN)"| DLQ
    
    Inference --> Crash
    Crash -->|"Success"| GeoLogic["GeoTag Engine"]:::ai
    Crash -->|"Fail (Crash/Timeout)"| DLQ
    DLQ --> StatusUpdate

    %% GeoTag Fallback Logic
    subgraph Geo_Fallback ["Geotag Fallback Engine"]
        direction TB
        CheckEXIF{"EXIF GPS<br>Exists?"}:::cb
        UseEXIF["Use EXIF Data"]:::ai
        CheckHeader{"Live GPS Headers<br>Exist?"}:::cb
        UseHeader["Fallback to Mobile<br>GPS Headers"]:::ai
        RejectFraud["Reject: Spoofed / Missing"]:::dlq

        CheckEXIF -->|"Yes"| UseEXIF
        CheckEXIF -->|"No (Stripped)"| CheckHeader
        CheckHeader -->|"Yes"| UseHeader
        CheckHeader -->|"No"| RejectFraud
    end

    GeoLogic --> CheckEXIF

    %% ==========================================
    %% SUBGRAPH TRANSPARENCY STYLING
    %% ==========================================
    style Circuit_Breaker fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style GPU_Cluster fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style Fallback_DLQ fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style Geo_Fallback fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
```

# 5. MLOps Architecture & Versioning Flow 
*  To run multiple deep learning models simultaneously (Gemma-2B, ViT, YOLOv8) in a production cluster without causing memory spikes or API latency, we must decouple the heavy GPU inference from our Python/FastAPI microservices.
*  Instead of loading these heavy models directly into FastAPI's memory, FastAPI will act as a lightweight client that sends data via high-speed gRPC to NVIDIA Triton Inference Server. Triton is superior to standard ONNX Runtime here because it supports dynamic batching and can run TensorRT (for YOLOv8), ONNX (for ViT), and vLLM (for Gemma-2B) within the exact same unified GPU pod
*  Yeh diagram dikhata hai ki models AWS S3 (Model Registry) se Triton mein kaise load hote hain, aur API Gateway bina downtime ke inference kaise karta hai.

```mermaid

graph TD
    %% ==========================================
    %% GLOBAL STYLING (GITHUB SAFE & TRANSPARENT)
    %% ==========================================
    classDef client fill:transparent,stroke:#ffb74d,stroke-width:2px,color:#ffffff;
    classDef api fill:transparent,stroke:#64b5f6,stroke-width:2px,color:#ffffff,stroke-dasharray: 5 5;
    classDef triton fill:transparent,stroke:#81c784,stroke-width:2px,color:#ffffff;
    classDef db fill:transparent,stroke:#f57f17,stroke-width:2px,color:#ffffff;

    linkStyle default stroke:#b0bec5,stroke-width:2px,fill:none;

    S3[("AWS S3 Model Registry<br/>(Stores v1, v2, v3 weights)")]:::db
    FastAPI["Python / FastAPI<br/>(Lightweight API Wrapper)"]:::api

    subgraph Triton_Cluster ["NVIDIA Triton Inference Server (GPU Kubernetes Pod)"]
        direction TB
        GRPC["gRPC Endpoint<br/>(Ultra-low latency)"]:::triton
        Batcher["Dynamic Batcher<br/>(Combines concurrent requests)"]:::triton
        
        subgraph Models ["Loaded Models in VRAM"]
            M1["YOLOv8<br/>(TensorRT Backend)"]:::client
            M2["ViT<br/>(ONNX Backend)"]:::client
            M3["Gemma-2B<br/>(vLLM / PyTorch Backend)"]:::client
        end

        GRPC --> Batcher
        Batcher --> M1
        Batcher --> M2
        Batcher --> M3
    end

    S3 -.->|"Hot-swaps new versions<br/>without dropping traffic"| Triton_Cluster
    FastAPI -->|"Sends image tensors & text<br/>via gRPC"| GRPC

    %% ==========================================
    %% SUBGRAPH TRANSPARENCY STYLING
    %% ==========================================
    style Triton_Cluster fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
    style Models fill:transparent,stroke:#90a4ae,stroke-width:2px,stroke-dasharray: 5 5,color:#ffffff
```
