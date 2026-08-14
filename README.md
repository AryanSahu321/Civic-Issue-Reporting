# Civic-Issue-Reporting
## model working flow 
```mermaid
graph TD
    %% ----- STYLING & CLASSES -----
    classDef input fill:#c8e6c9,stroke:#000000,stroke-width:2px,color:#000;
    classDef model fill:#e1bee7,stroke:#6a1b9a,stroke-width:2px,color:#000;
    classDef decision fill:#ffecb3,stroke:#f39c12,stroke-width:2px,shape:diamond,color:#000;
    classDef terminal fill:#ffcdd2,stroke:#c62828,stroke-width:2px,color:#000;
    classDef db fill:#bbdefb,stroke:#1565c0,stroke-width:2px,color:#000;
    classDef bucket fill:#eceff1,stroke:#546e7a,stroke-width:1px,stroke-dasharray: 3 3,color:#000;
    classDef engine fill:#ffe082,stroke:#ff8f00,stroke-width:2px,color:#000;

    %% ----- 1. USER INPUT -----
    Input[/"Civic Post (Text + Image)"/]:::input

    %% ----- 2. LAYER 1: NLP GATEKEEPER -----
    subgraph Layer_1 [Layer 1: NLP Gatekeeper]
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

    Input -->|Route Text| ToxicClass
    ToxicClass --> CheckToxic
    CheckToxic -->|Toxic| Abort
    CheckToxic -->|Compliant| IntentRouter
    IntentRouter --> CheckIntent
    CheckIntent -->|Thank You| ThankYou
    CheckIntent -->|Other| OtherPosts
    CheckIntent -->|Issue| IssuePosts

    %% ----- 3. LAYER 2: FAKE MEDIA & FRAUD PREVENTION -----
    subgraph Layer_2 [Layer 2: Fake Media & Fraud Prevention]
        direction TB
        GenCheck["AI Generative Check (CNN/ViT)"]:::model
        CheckDeepfake{"Is Deepfake?"}:::decision
        RejectFake("Flag & Reject"):::terminal
        pHash["pHash Duplicate Check"]:::model
        CheckDB{"Match in DB?"}:::decision
        RejectFraud("Flag as Fraud"):::terminal
        UniqueImage["Verified Unique Image"]:::input
    end

    IssuePosts -->|Route Image| GenCheck
    GenCheck --> CheckDeepfake
    CheckDeepfake -->|Yes| RejectFake
    CheckDeepfake -->|Authentic| pHash
    pHash --> CheckDB
    CheckDB -->|Match Found| RejectFraud
    CheckDB -->|Unique| UniqueImage

    %% ----- 4. LAYER 3: INFRASTRUCTURE CV ENGINE -----
    subgraph Layer_3 [Layer 3: Infrastructure CV Engine]
        direction TB
        VisionClass["Vision Classifier (YOLO/MobileNet)"]:::model
        CatPotholes["Potholes"]:::bucket
        CatGarbage["Garbage"]:::bucket
        CatLights["Streetlights"]:::bucket
        FinalDB[("Relational Database")]:::db
    end

    UniqueImage -->|Verified Image| VisionClass
    VisionClass -->|Categorize| CatPotholes
    VisionClass -->|Categorize| CatGarbage
    VisionClass -->|Categorize| CatLights
    CatPotholes --> FinalDB
    CatGarbage --> FinalDB
    CatLights --> FinalDB

    %% ----- 5. LAYER 4: BEHAVIORAL ANALYTICS -----
    subgraph Layer_4 [Layer 4: Behavioral Analytics Engine]
        direction TB
        BehaviorEngine["User Behavior & Sentiment Engine"]:::engine
        RatioCalc{"Calc: % Negative vs % Thanks"}:::decision
        Haters[/"[Haters]"/]:::bucket
        Supporters[/"[Supporters]"/]:::bucket
        Neutrals[/"[Neutrals]"/]:::bucket
    end

    %% Dotted asynchronous connection from Input AND Database
    Input -.->|Async: Current Text| BehaviorEngine
    FinalDB -.->|Async: Past Issue/Thanks Data| BehaviorEngine
    
    %% Engine calculates the ratio and routes to buckets
    BehaviorEngine --> RatioCalc
    RatioCalc -->|High % Negative| Haters
    RatioCalc -->|High % Thanks| Supporters
    RatioCalc -->|Balanced / Low Data| Neutrals
```
##1. Text Moderation & Routing (BERT / Gemma-2B) -> Toxic/Policy Classifier
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
    classDef predictLayer fill:#ffe6e6,stroke:#ff0000,stroke-width:2px,color:#000,shape:stadium;

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
