# User Stories: Pulse

## Notes
*   HF = Health Facilitator
*   Priority - [High, Medium, Low]
*   Estimation - 1SP = 1/2 day

---

## ES1: Doctor
> As a Doctor, I want to provide a professional health diagnosis or recommendation to patients who require help so that I can save lives.

#### US1.1: View patients
> As a doctor, I want to see all the patients that require care so that I can allocate time in my day to reviewing patients.

Priority: ,

Acceptance criteria:
*   There is a tab on the navigation bar that redirects me to the the `patients` page
*   On the `patients` page, there is table of all patients, including their:
    *   Full name with a hyperlink to their profile page
    *   The datetime that their case was posted
    *   Region in which it was posted
*  The list of patients is sorted having the oldest cases at the top

#### US1.2: See 'helped' patients
> As a doctor, I want to see all the patients that I have provided a recommendation/diagnosis for so that I can review the case to better prepare myself for future cases.

Priority: high,

Acceptance criteria:
*   There is a tab on the navigation bar that redirects me to the the `past patients` page
*   On the `past patients` page, there is table of all patients, including their:
    *   Full name with a hyperlink to their profile page
    *   The datetime that their case was posted
    *   The datetime that the doctor review the patients case
    *   The recommendation/diagnosis provided
*  The list of patients is sorted having the most recent review date at the top of the page

#### US1.3: View patient data
> As a doctor, I want to see the patient's health data so that I can review the information to make a diagnosis.

Priority: high,

Acceptance criteria:
*   The following information about a patient is displayed:
    *   Full name
    *   Date of birth
    *   Heart rate
    *   Otis recommendation (if x-ray is presented)
*

#### US1.4: Provide diagnosis
> As a doctor, I want to see all the patients that I have provided a recommendation/diagnosis for so that I can review the case to better prepare myself for future cases.

Priority: high,

Acceptance criteria:
*   ds
---
## ES2: HF
> As a HF, I want to be able to upload health data for each of my patients and receive diagnosis and re


#### US2.3: Doctor details
> As a HF, I want to be able to view basic contact information for a doctor so that I can contact them if necessary.

Priority: low,

Acceptance criteria:
*   1

#### US2.4: Who provided recommendation
> As a HF, I want to see who provided the recommendation for a given patient, so I know who to contact if I have questions about their recommendaiton.

Priority: low,

Acceptance criteria:
*   1

---
## ES3: Login
> As a user, I want to be able to login and out so that I can securely access the system, and so that I can be accountable for my actions.

#### US3.1: Log in
> As a registered user, I want to be able to log in so that I can securely access the system, and so that others can view
>
Priority: high

Acceptance criteria:
*   When a user first navigated to `pulse`, they are presented with a login form asking for their email and password
*   If the username and/or password is wrong, the user is prompted with the message `Email & password combination is invalid`
*   There is a link on the `log in` page to the register page

#### US3.2: Log out
> As a registered user, I want to be able to log out to prevent future users of my shared, work computer from acting on my behalf.

Priority: high,

Acceptance criteria:
*   After the user clicks 'log out', they shall no longer be able to access any of the routes - they shall be redirected back to `log in`

#### US3.3: Register
> As a unregistered HF, I want to be able to sign up to `pulse` so that any patients under my care can have their health assessed by a qualified Doctor.

> As a unregisetered Doctor, I want to be able to sign up to `pulse` so that I can provide diagnoses to patients.

Priority: high,

Acceptance criteria:
*   From the login screen, there is a link that navigates to the register form
*   The register form first asks the user if they are a Doctor or a HF
*   Regardless of this choice, the user will be asked for:
    *   First name
    *   Last name
    *   Email - in valid email format, email should be unique (check if the email is not already registered)
    *   Password, confirm password
    *   Phone number
    *   Current city
*   If the user selects that they are a Doctor, then they will also be prompted for:
    *   The Doctor's formal qualifications - they can have multiple - including qualification and institution that they received it from
    *   Their current job title and place of work (optional)
*   If the user selects that they are a HF, then they will also be prompted for:
    *   Their current work place
    *   Rough number of patients under care
