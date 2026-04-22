name: write-a-prd
description: Think through a product problem deeply via structured interview and output a structured design spec. Do NOT write final PRD.

---

This skill is used to THINK, not to WRITE.

## Goal
Produce a clear, structured DESIGN SPEC that can be used by downstream prompts to generate a PRD and demo.

---

## Step 1: Problem Interview
Ask the user detailed questions to clarify:

- What problem are we solving?
- Who are the users?
- What triggers this problem?
- What does success look like?

Do NOT proceed until these are clear.

---

## Step 2: Repo Understanding (Optional)
Explore the repo to understand:
- Existing features
- Constraints
- Reusable modules

---

## Step 3: Deep Design Exploration

Break the problem into:

### 1. User Roles
### 2. Core Scenarios
### 3. Key User Flows
(step-by-step)

### 4. Functional Blocks
(group features into logical modules, NOT technical modules)

### 5. State Transitions
(if applicable)

### 6. Edge Cases (initial)

---

## Step 4: Validate with User
Confirm:
- flows correct?
- missing cases?
- over-designed?

---

## Step 5: OUTPUT (IMPORTANT)

Output a structured DESIGN SPEC in Markdown:

# Design Spec

## Background
## Users
## Scenarios
## User Flows
## Functional Blocks
## State Transitions
## Known Edge Cases

---

## STRICT RULES

- DO NOT write PRD
- DO NOT include implementation details
- DO NOT include test plans
- KEEP it product-focused