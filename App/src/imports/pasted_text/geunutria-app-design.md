Design a premium, modern mobile app called GeoNutria for farms and agricultural intelligence.
The app is powered by multiple AI models for crop health, disease detection, soil understanding, yield prediction, palm analysis, and agronomy consulting.

Create a complete mobile app UI system and connected screen flow for both English and Arabic, with strong support for RTL and LTR layouts.
The design should feel professional, trustworthy, agricultural, intelligent, clean, and field-ready.
It must look like a real startup product ready for investors, pilots, and actual farm operators.

Product positioning

GeoNutria is an AI-powered farming assistant that helps farms:

monitor crop health from IoT sensors
diagnose plant diseases from leaf images
classify soil type from soil images
recommend the best crops for exact field conditions
predict agricultural yield
consult an AI agronomist in Arabic and English
segment palm leaves for clean visual analysis
detect palm diseases
segment general leaves for canopy visualization
count palm trees from drone or satellite imagery
Brand identity

Use this exact color palette:

Primary: #0F4C5C
Secondary: #C47A2C
Background: #F4EFEA
Main Text: #1B263B
Tiny Visual Elements / accents / success-natural hints: #6B8F71
Visual style

Create a polished agri-tech design language:

clean mobile-first UI
elegant cards with soft shadows
rounded corners 16–24px
rich spacing, breathable layouts
subtle gradients only when helpful
calm natural visual cues inspired by soil, leaves, satellite maps, and sensors
premium dashboard style, not cartoonish
data-heavy but easy to scan in the field
use micro-illustrations, map patterns, farm textures, sensor icons, leaf/palm imagery, and AI/data motifs
prioritize clarity over decoration
all charts and data panels should look production-ready
Typography

Use a clean, modern font pairing suitable for Arabic and English.
Arabic must look native and elegant.
English must feel sharp and technical.
Create a hierarchy for:

app title
section headers
card titles
labels
KPI values
body text
helper text
alerts
buttons
Core UX principles
the app is for real farms, so the design must support quick decisions
all critical statuses should be visible at a glance
show confidence scores clearly
show AI outputs in a way that feels actionable, not academic
users should understand “what happened”, “how confident the AI is”, and “what to do next”
support multiple farm zones/plots
support switching language between Arabic and English
support offline-friendly visual behavior hints, even if not fully offline
use strong empty states, upload states, scanning states, and error states
include loading skeletons and AI processing states
include permission flows for camera, gallery, location, and notifications
Information architecture

Create the app with these main tabs:

Home
Diagnostics
Fields
AI Consultant
Profile / Settings

Also include deep flows for each AI capability.

Main screens to generate
1) Splash / Onboarding

Create:

splash screen with GeoNutria logo
onboarding carousel, 3 to 5 screens
benefits:
smart crop monitoring
disease diagnosis from images
crop and yield recommendations
AI agronomist in Arabic and English
onboarding should feel premium and investor-ready
include sign in / create account CTA
2) Authentication

Create:

login
signup
forgot password
OTP / verification flow
choose language screen
select account type: farm owner / agronomist / farm manager / technician
3) Home Dashboard

Design a highly polished farm command center.
Include:

greeting with farm name and current weather summary
quick farm status badge: Healthy / Moderate Stress / High Stress
mini map or field overview
top KPI cards:
active fields
sensor health
disease alerts
recommended crops
estimated yield
palm count
quick actions:
scan leaf
scan soil
check IoT diagnosis
ask AI agronomist
upload drone image
recent AI results timeline
urgent alerts section
recommended actions section
crop health trend chart
irrigation / nutrient hints card
multilingual switch shortcut
make this screen feel like the main intelligence hub
4) Fields / Farm Management

Create full farm structure UI:

fields list
field details
add field flow
edit field flow
plot / zone cards
field size, crop type, irrigation type, planting date
sensor connection status
field history and AI summaries
map-based field visualization
tabs inside field details:
overview
sensors
diagnoses
recommendations
yield
history
5) IoT Health Diagnosis Module

Create a full flow for the IoT model.
Input data:

Soil Moisture
Ambient Temperature
Soil Temperature
Humidity
Light
pH
Nitrogen (N)
Phosphorus (P)
Potassium (K)
Chlorophyll
EC

Design:

live sensor dashboard
sensor cards with ranges
line charts for recent readings
connectivity indicators
health status output card
prediction probabilities
feature importance breakdown
“what is causing stress most?” section
smart recommendations panel
manual entry mode + live IoT sync mode
field-level and farm-level views
6) General Leaf Disease Classifier

Create:

capture leaf image screen
upload from gallery screen
smart image crop / preview
AI processing state
result screen with:
detected disease name
confidence %
disease class group
severity hint
suggested immediate action
save to field history
allow comparing old scans
include educational details card
7) Soil Type Classifier

Create:

soil image capture / upload
image tips overlay before capture
AI result screen
soil type card with confidence
properties overview card
implications for crop suitability
option to pass result into crop recommendation engine
8) Crop Recommendation Engine

Create a detailed recommendation flow.
Input sources:

N, P, K
temperature
humidity
rainfall
pH
classified soil type

Output:

top 7 recommended crops ranked by confidence
confidence bars
comparison cards
why this crop matches the conditions
expected suitability notes
CTA to run yield prediction
filter by season / field / water requirement
list and card views
9) Yield Prediction

Create:

form flow to choose target crop
prefilled values from field and previous models
result page with:
estimated yield in kg/ha
confidence / reliability indicator
comparison to regional average placeholder
productivity improvement hints
scenario comparison card
include “save report” and “share report” actions
10) AI Agronomist Consultant

This should be one of the most premium parts.
Create:

chat interface with clean AI assistant UI
selectable context chips:
sensor readings
disease detections
soil type
crop recommendations
yield prediction
aerial analysis
prompt suggestions
Arabic / English chat toggle
answer cards with:
diagnosis summary
prioritized action plan
recommended interventions
warning notes
next best steps
option to generate full report
option to pin advice to a field
voice note input placeholder
show trust-building design, expert but friendly
11) Palm Leaf Segmentation

Create:

palm image upload / capture
processing state
before / after comparison
transparent isolated frond preview
export / continue to classification CTA
explanation of why segmentation improves analysis
12) Palm Disease Classifier

Create:

result screen after segmentation
disease name
confidence %
visual preview of isolated palm frond
severity / urgency label
action recommendations
save and consult agronomist CTA
13) General Leaf Segmentation

Create:

upload image of crops
segmented leaves overlay result
transparency overlay visualization
overall detection confidence
canopy visualization card
switch between original / overlay / blended
save result to field analysis
14) Aerial Palm Tree Counter

Create:

upload drone or satellite image
large preview screen
AI processing state
result screen with:
total palm tree count
clean bounding boxes without text clutter
zoomable image viewer
detection confidence
save to farm inventory
include insights like density and monitored area placeholders
15) Notifications / Alerts

Create:

alert center
categories:
disease alert
stress alert
sensor disconnected
recommendation ready
aerial analysis completed
priority labels
read/unread states
filter chips
16) Reports

Create:

farm reports list
report details
PDF-like report preview screen
multilingual report export
sections:
field overview
crop health
disease findings
soil analysis
recommended crops
yield estimate
agronomist action plan
17) Settings / Profile

Create:

profile
farm information
language settings
AI preferences
sensor integrations
notifications settings
support / help center
subscription / plan
privacy and security
dark mode optional preview
Component system

Build a reusable mobile design system for this app:

app bars
bottom navigation
KPI cards
alert banners
AI result cards
confidence bars
segmented image comparison blocks
sensor metric cards
charts
chips
status pills
CTA buttons
upload zones
map cards
empty states
loading states
error states
success states
modal sheets
filter bottom sheets
report cards
States to include

For every major flow, generate:

default state
empty state
loading state
AI processing state
success state
warning state
error state
low confidence state
no connectivity / sensor offline state
Motion and interaction guidance

Design with smooth modern interactions:

animated transitions between scans and results
chart reveal animations
loading shimmer/skeletons
camera capture confirmation
before/after image slider for segmentation
expandable explanation panels
swipeable cards where suitable
interactive chips and filters
Arabic and English support

Generate screens in a way that can support:

full Arabic RTL layouts
full English LTR layouts
proper mirrored navigation and spacing for Arabic
Arabic typography that looks native and premium
bilingual report generation
Design output expectation

Create:

a complete high-fidelity mobile app prototype
connected flows between main screens
consistent reusable component system
premium startup-ready UI
screens that look realistic and testable
investor-demo quality visuals
mobile app design, not web dashboard
Extra creative direction

Blend these moods:

agricultural intelligence
satellite and sensor precision
calm earthy premium tone
AI confidence and trust
practical tools for real farm operations

Avoid:

childish farm visuals
cluttered dashboards
generic healthcare-style design
overly dark industrial style
heavy neon tech aesthetics

The final result should feel like:
“the premium AI operating system for modern farms.”

A shorter Stitch-optimized version can also help, because sometimes these tools respond better to a tighter prompt plus follow-up iterations. Stitch is designed for conversational iteration, so a phased prompt often works well.

Shorter version for first generation

Design a premium mobile app called GeoNutria, an AI-powered farming assistant for modern farms.
Style: elegant agri-tech, clean, trustworthy, investor-ready, bilingual Arabic/English, full RTL/LTR support.

Palette:

Primary #0F4C5C
Secondary #C47A2C
Background #F4EFEA
Text #1B263B
Accent #6B8F71

Main tabs:

Home
Diagnostics
Fields
AI Consultant
Profile

Key modules:

IoT crop health diagnosis from 11 sensor values
leaf disease classification
soil type classification
crop recommendation with top 7 crops
yield prediction in kg/ha
AI agronomist chat in Arabic/English
palm leaf segmentation
palm disease classification
general leaf segmentation
aerial palm tree counting from drone/satellite images

Generate full mobile flows for:

onboarding
auth
home dashboard
fields list and field details
IoT diagnosis dashboard
leaf scan upload and result
soil scan upload and result
crop recommendation result
yield prediction form and result
AI agronomist chat
palm segmentation before/after
palm disease result
general leaf segmentation overlay
aerial palm tree counting result
notifications
reports
settings
Subscription System (Credit-Based Plans)

Design a credit-based subscription system for GeoNutria that allows users to consume AI features using credits instead of unlimited usage.

Concept
Users purchase subscription plans that provide:
Credits (points) → consumed per AI action
Validity period → monthly / yearly
Each AI feature consumes a different number of credits
Credit Consumption Model

Define a clear cost per feature:

IoT Health Diagnosis → 2 credits
Leaf Disease Scan → 3 credits
Soil Classification → 3 credits
Crop Recommendation → 4 credits
Yield Prediction → 5 credits
AI Agronomist Chat → 1 credit per message
Palm Segmentation → 2 credits
Palm Disease Classification → 3 credits
General Leaf Segmentation → 2 credits
Aerial Palm Counting → 6 credits

Show this clearly inside UI where relevant.

Subscription Plans

Design multiple plans:

Free Plan
Limited credits (e.g., 20 credits/month)
limited features or lower priority AI
Basic Plan
moderate credits (e.g., 200 credits/month)
Pro Plan
high credits (e.g., 1000 credits/month)
Enterprise Plan
custom credits
multi-farm support
team access
Screens to Generate
1) Subscription Plans Screen
plan cards (Free / Basic / Pro / Enterprise)
credits included
validity period
feature access comparison
CTA: subscribe / upgrade
highlight recommended plan
pricing toggle (monthly / yearly)
2) Wallet / Credits Screen

Create a wallet-style UI:

current credit balance
usage graph
recent transactions:
AI usage deductions
subscription renewals
credit expiration indicator
“Buy more credits” CTA
3) Buy Credits Flow
credit packages:
50 credits
200 credits
500 credits
pricing cards
payment flow UI
success state with animation
4) Feature Usage Indicator

Inside every AI module:

show:
credits required
current balance
before execution:
confirmation modal:
“This action will cost X credits”
after execution:
deduction feedback animation
5) Insufficient Credits State

Design a strong UX:

warning message
suggested plan upgrade
quick buy credits CTA
do not block user harshly → guide them smoothly
6) Subscription Management Screen
current plan
renewal date
remaining credits
auto-renew toggle
upgrade / downgrade
cancel subscription
7) Admin / Advanced UX Considerations

Include UI placeholders for:

promo codes
bonus credits
referral rewards
enterprise custom plans
UX Rules for Credits
Always visible (top bar or profile area)
Never surprise users with hidden costs
Always show:
cost before action
balance after action
Use:
green for sufficient credits
orange/red for low credits
Visual Style for Subscription
make plans feel premium and trustworthy
use subtle gradients with primary color
highlight Pro plan visually
use badges like:
“Most Popular”
“Best Value”
include icons for each plan
Integration with AI Modules

For every AI feature screen:

show credit cost badge
disable action if insufficient credits
allow shortcut to buy credits
show remaining credits after result

Ensure the subscription and credit system is deeply integrated into all AI feature flows, not treated as a separate module. Every AI interaction must reflect credit usage clearly in the UI and UX.


Requirements:

premium cards, soft shadows, rounded corners
charts, confidence bars, alert badges, upload states, loading states, error states
clear AI confidence display
actionable recommendations
map-based field overview
realistic mobile spacing and testable prototype quality
Arabic typography must be native and elegant
create a reusable design system and connected high-fidelity prototype