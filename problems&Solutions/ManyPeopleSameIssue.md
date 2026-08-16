Aapka sochna **bilkul 100% sahi aur industry-standard** hai! Aapne jo point uthaya hai—ki agar ek hi jagah se multiple reports aa rahi hain, toh iska matlab wahan sach mein bada issue hai—yeh real-world GovTech / Smart City platforms ka core logic hota hai.

Aayiye samajhte hain ki is problem ko real-world mein architectural level par kaise implement kiya jata hai:

---

### 1. Kya hamein duplicate post database mein rakhni chahiye ya delete karni chahiye?

**Database mein duplicate post ki image aur text ko baar-baar store karna bilkul galat hai.** Kyunki isse storage waste hoti hai, database ka size badhta hai, aur queries slow ho jati hain.

Iska industry-standard solution yeh hai:

* **Master-Duplicate Architecture:**
1. Pehli baar jo post aati hai, usko **Master Issue** bana kar database mein save kiya jata hai aur uska ek unique `issue_id` banta hai.
2. Jab doosra user same jagah aur same issue ki photo bhejta hai, toh system usko ek naye issue ki tarah save nahi karta. Balki usko **Duplicate/Upvote Log** ki tarah treat karta hai.
3. Image aur text ko discard kar diya jata hai (ya sirf ek audit trail ke liye chhota reference rakha jata hai), aur master post ke andar ek counter badh jata hai—jaise `report_count = 2` ya ek alag `issue_upvotes` table mein user ki entry daal di jati hai.



---

### 2. Priority aur Ranking Kaise Decide Hoti hai?

Jab multiple log ek hi issue ko report karte hain, toh authority ke dashboard par uski priority automatically upar chali jati hai. Isko bolte hain **Crowdsourced Priority Scoring**:

* **Formula Example:** `Priority Score = (Base Severity by YOLO AI) + (Number of Reports * WeightFactor) + (Days Pending)`
* Agar ek pothole ko 10 alag-alag local logon ne report kiya hai, toh system samajh jata hai ki yeh public ke liye ek major hazard hai. Uska Priority Score spike ho jata hai aur woh Ward Admin ke dashboard par **"High Priority / Hotspot"** section mein sabse upar dikhne lagta hai.

---

### 3. User ko kya Experience (UX) milta hai?

Jab doosra user same issue ki photo khinch kar upload karta hai, toh backend spatial clustering aur pHash match karke turant pehchan leta hai ki yeh already reported hai. Us waqt user ko ek smart response dikhaya jata hai:

> *"Thanks for reporting! This issue has already been logged by another neighbor in your area (Issue ID: #CIVIC-8942). We have added your report to increase its priority. You can track its live status here."*

Is approach ke bohot saare fayde hain:

1. **Server & Storage Cost Bachti hai:** S3 bucket aur PostgreSQL database par extra images ka load nahi padta.
2. **Transparency milti hai:** User ko pata chalta hai ki unki awaaz sun li gayi hai aur unka effort count ho gaya hai.
3. **Clutter nahi hota:** Ward officers ke paas 50 alag-alag photos nahi aatiin, balki ek hi main issue aata hai jis par likha hota hai *"Reported by 12 citizens"*, jisse woh bina spam ke jaldi action lete hain.
