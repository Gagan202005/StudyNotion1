<p align="center">
  <img src="public/Logo-Full-Light.png" alt="StudyNotion Logo" width="300"/>
</p>

<h1 align="center">StudyNotion — Ed-Tech Platform</h1>

<p align="center">
  A fully functional ed-tech platform built with the MERN stack that enables users to create, consume, and rate educational content.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-7.1-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Redux_Toolkit-1.9-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.2-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
</p>

## 📖 Overview

StudyNotion is a comprehensive ed-tech platform (similar to Udemy/Coursera) where:

- **Students** can browse, search, purchase, and consume video-based courses with progress tracking
- **Instructors** can create, manage, and monetize their courses with a rich course builder
- **Admins** can manage course categories and platform settings

The platform features OTP-based email verification, Razorpay payment integration, Cloudinary media management, role-based access control, and a responsive UI — all built end-to-end using the MERN stack.

---

## ✨ Features

### For Students
| Feature | Description |
|---------|-------------|
| 🔐 **OTP Signup** | Email verification with auto-expiring OTP (5-min TTL) |
| 📚 **Browse Courses** | Explore courses by category with ratings and reviews |
| 🔍 **Search** | Find courses by name, description, or tags |
| 🛒 **Cart & Checkout** | Add to cart, purchase via Razorpay gateway |
| 🎬 **Video Player** | Watch lectures with course progress tracking |
| ⭐ **Rate & Review** | Submit ratings and reviews for enrolled courses |
| 👤 **Profile Management** | Update display picture, personal info, and password |

### For Instructors
| Feature | Description |
|---------|-------------|
| 🛠️ **Course Builder** | Create courses with Sections → Sub-sections (video upload) |
| 📊 **Dashboard** | View total students, revenue, and course analytics |
| ✏️ **Course Management** | Edit, delete, and manage Draft/Published status |
| ☁️ **Media Upload** | Upload thumbnails and videos to Cloudinary |

### For Admins
| Feature | Description |
|---------|-------------|
| 🗂️ **Category Management** | Create and manage course categories |
| 🛡️ **Admin Panel** | Platform-level administration |

---

## 📸 Demo

https://github.com/user-attachments/assets/dcdcd5a7-2026-4f09-a2f1-41dbed59756c

---

## 🏗️ Architecture

### System Architecture Diagram

```mermaid
graph TB
    subgraph "Client — React.js SPA"
        A["🖥️ React 18<br/>(React Router v6)"]
        B["📦 Redux Toolkit<br/>(6 Slices)"]
        C["🔌 Axios<br/>(API Service Layer)"]
    end

    subgraph "Server — Node.js + Express.js"
        D["⚡ Express Server<br/>(Port 4000)"]
        E["🔀 Route Handlers<br/>(5 Route Files)"]
        F["🔒 Middleware Chain<br/>(JWT Auth → Role Check)"]
        G["📋 Controllers<br/>(10 Controller Files)"]
    end

    subgraph "Data & Services"
        H[("🍃 MongoDB Atlas<br/>Mongoose ODM")]
        I["☁️ Cloudinary<br/>(Images & Videos)"]
        J["💳 Razorpay<br/>(Payments)"]
        K["📧 Resend<br/>(Emails)"]
    end

    A --> B --> C
    C -- "REST API<br/>JSON + JWT" --> D
    D --> E --> F --> G
    G --> H
    G --> I
    G --> J
    G --> K

    style A fill:#61DAFB,color:#000
    style B fill:#764ABC,color:#fff
    style D fill:#339933,color:#fff
    style H fill:#47A248,color:#fff
    style I fill:#3448C5,color:#fff
    style J fill:#0C2451,color:#fff
```

### Tech Stack

| Layer | Technology | Role |
|-------|-----------|------|
| **Frontend** | React.js 18, React Router v6 | UI rendering & client-side routing |
| **Styling** | Tailwind CSS 3 | Utility-first responsive design |
| **State Management** | Redux Toolkit | Centralized app state (auth, cart, course, profile) |
| **HTTP Client** | Axios | API communication |
| **Forms** | React Hook Form | Declarative form handling & validation |
| **Backend** | Node.js 20, Express.js 4 | REST API server |
| **Database** | MongoDB Atlas, Mongoose 7 | Document database with ODM |
| **Authentication** | JWT, bcrypt | Stateless auth & password hashing |
| **Payments** | Razorpay | Course purchase & payment verification |
| **Media Storage** | Cloudinary | Image/video upload, CDN delivery |
| **Email** | Resend | OTP, password reset, enrollment emails |
| **File Upload** | express-fileupload | Multipart form handling |

### Project Structure

```
StudyNotion/
│
├── src/                          # ── React Frontend ──
│   ├── Components/
│   │   ├── common/               #   NavBar, Footer
│   │   ├── contactUs/            #   Contact form
│   │   └── core/
│   │       ├── Auth/             #   OpenRoute, PrivateRoute
│   │       ├── Dashboard/        #   MyProfile, Settings, Cart, AddCourse
│   │       ├── HomePage/         #   Landing page sections
│   │       ├── Catalog/          #   Course cards, category pages
│   │       ├── ViewCourse/       #   Video player, sidebar
│   │       └── Ratings/          #   Star ratings, reviews
│   ├── pages/                    #   14 page-level components
│   ├── services/
│   │   ├── apis.js               #   API endpoint constants
│   │   ├── apiConnector.js       #   Axios wrapper
│   │   └── operations/           #   Async API call functions
│   ├── slices/                   #   Redux slices (6 files)
│   ├── reducers/                 #   Root reducer
│   └── utils/                    #   Constants, helpers
│
├── server/                       # ── Node.js Backend ──
│   ├── index.js                  #   Express app entry point
│   ├── config/
│   │   ├── database.js           #   MongoDB connection
│   │   ├── cloudinary.js         #   Cloudinary SDK setup
│   │   └── razorpay.js           #   Razorpay instance
│   ├── models/                   #   9 Mongoose schemas
│   ├── controllers/              #   10 controller files
│   ├── routes/                   #   5 route files
│   ├── middlewares/
│   │   ├── auth.js               #   JWT verification + role guards
│   │   └── demo.js               #   Demo mode protection
│   ├── utils/
│   │   ├── mailSender.js         #   Resend email utility
│   │   ├── imageUploader.js      #   Cloudinary upload utility
│   │   └── secToDuration.js      #   Time formatting
│   └── mail/templates/           #   4 HTML email templates
│
├── package.json                  #   Frontend dependencies
├── tailwind.config.js            #   Tailwind configuration
└── .env                          #   Environment variables
```

---

## 🔄 Workflow Diagrams

### User Registration Flow (OTP-Based)

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant R as ⚛️ React
    participant S as 🟢 Express
    participant DB as 🍃 MongoDB
    participant E as 📧 Resend

    U->>R: Fill signup form
    R->>S: POST /auth/sendotp {email}
    S->>DB: Check if user exists
    DB-->>S: Not found ✅
    S->>S: Generate 6-digit OTP
    S->>DB: Save OTP (TTL: 5 min)
    Note over DB,E: pre-save hook triggers
    DB->>E: Send OTP email
    E-->>U: 📩 OTP received
    S-->>R: OTP sent ✅

    U->>R: Enter OTP
    R->>S: POST /auth/signup {name, email, password, otp, role}
    S->>DB: Find latest OTP for email
    S->>S: Verify OTP match
    S->>S: bcrypt.hash(password, 10)
    S->>DB: Create Profile (empty)
    S->>DB: Create User → refs Profile
    S-->>R: User registered ✅
    R->>U: Redirect to Login
```

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant R as ⚛️ React + Redux
    participant S as 🟢 Express
    participant DB as 🍃 MongoDB

    U->>R: Enter email + password
    R->>S: POST /auth/login
    S->>DB: findOne({email}).populate("additionalDetails")
    DB-->>S: User document
    S->>S: bcrypt.compare(password, hash)
    S->>S: jwt.sign({email, id, accountType}, SECRET, {expiresIn: "24h"})
    S->>S: Set httpOnly cookie (3-day expiry)
    S-->>R: {token, user}
    R->>R: Store in Redux + localStorage
    R->>U: Redirect to Dashboard

    Note over R,S: Protected API Request
    R->>S: Request + Authorization header
    S->>S: auth middleware → jwt.verify()
    S->>S: Role middleware → check accountType
    S-->>R: Authorized response ✅
```

### Course Creation Flow (Instructor)

```mermaid
sequenceDiagram
    participant I as 🎓 Instructor
    participant R as ⚛️ React
    participant S as 🟢 Express
    participant CD as ☁️ Cloudinary
    participant DB as 🍃 MongoDB

    I->>R: Fill course form + thumbnail
    R->>S: POST /course/createCourse
    S->>S: auth + isInstructor middleware
    S->>CD: Upload thumbnail
    CD-->>S: secure_url
    S->>DB: Create Course document
    S->>DB: Push to instructor.courses[]
    S->>DB: Push to category.courses[]
    S-->>R: Course created ✅

    I->>R: Add Section
    R->>S: POST /course/addSection
    S->>DB: Create Section → push to course.courseContent[]
    S-->>R: Section added ✅

    I->>R: Add Lecture (video)
    R->>S: POST /course/addSubSection
    S->>CD: Upload video
    CD-->>S: videoUrl + duration
    S->>DB: Create SubSection → push to section.subSection[]
    S-->>R: Lecture added ✅
```

### Payment & Enrollment Flow

```mermaid
sequenceDiagram
    participant S as 🧑‍🎓 Student
    participant R as ⚛️ React
    participant SV as 🟢 Express
    participant RZ as 💳 Razorpay
    participant DB as 🍃 MongoDB
    participant E as 📧 Email

    S->>R: Click "Buy Now"
    R->>SV: POST /payment/capturePayment {courses[]}
    SV->>DB: Validate courses & check not enrolled
    SV->>SV: Calculate total amount (server-side)
    SV->>RZ: orders.create({amount, currency: "INR"})
    RZ-->>SV: {orderId, amount}
    SV-->>R: Order details

    R->>RZ: Open checkout modal
    S->>RZ: Complete payment
    RZ-->>R: {payment_id, order_id, signature}

    R->>SV: POST /payment/verifyPayment
    SV->>SV: HMAC-SHA256 signature verification
    Note over SV: Signature valid ✅

    loop For each course
        SV->>DB: Push student to course.studentsEnrolled[]
        SV->>DB: Push course to user.courses[]
        SV->>DB: Create CourseProgress document
        SV->>E: Send enrollment email
    end

    SV-->>R: Payment verified ✅
    R->>S: Redirect to Enrolled Courses
```

### Application Navigation Map

```mermaid
graph LR
    subgraph "🌐 Public Pages"
        HOME["🏠 Home"]
        CATALOG["📚 Catalog"]
        DETAILS["📝 Course Details"]
        SEARCH["🔍 Search"]
        ABOUT["ℹ️ About"]
        CONTACT["📞 Contact"]
    end

    subgraph "🔑 Auth"
        LOGIN["Login"]
        SIGNUP["Signup"]
        OTP["Verify OTP"]
        FORGOT["Forgot Password"]
        RESET["Reset Password"]
    end

    subgraph "🧑‍🎓 Student Dashboard"
        S_PROF["My Profile"]
        S_SET["Settings"]
        S_ENROLL["Enrolled Courses"]
        S_CART["Cart"]
        S_VIEW["Video Player"]
        S_HIST["Purchase History"]
    end

    subgraph "🎓 Instructor Dashboard"
        I_PROF["My Profile"]
        I_DASH["Analytics Dashboard"]
        I_ADD["Add Course"]
        I_MY["My Courses"]
        I_EDIT["Edit Course"]
    end

    HOME --> CATALOG --> DETAILS
    HOME --> SEARCH --> DETAILS
    DETAILS --> S_CART --> S_ENROLL --> S_VIEW
    SIGNUP --> OTP --> LOGIN
    LOGIN --> S_PROF
    LOGIN --> I_PROF
    I_PROF --> I_ADD --> I_MY --> I_EDIT
    I_PROF --> I_DASH
```

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```mermaid
erDiagram
    USER {
        ObjectId _id
        String firstName
        String lastName
        String email
        String password
        String accountType "Admin | Student | Instructor"
        Boolean active
        Boolean approved
        ObjectId additionalDetails "→ Profile"
        String image
        String token
        Date resetPasswordExpires
    }

    PROFILE {
        ObjectId _id
        String gender
        String dateOfBirth
        String about
        Number contactNumber
    }

    COURSE {
        ObjectId _id
        String courseName
        String courseDescription
        ObjectId instructor "→ User"
        String whatYouWillLearn
        Number price
        String thumbnail
        String tag
        ObjectId category "→ Category"
        String instructions
        String status "Draft | Published"
    }

    SECTION {
        ObjectId _id
        String sectionName
    }

    SUBSECTION {
        ObjectId _id
        String title
        String timeDuration
        String description
        String videoUrl
    }

    CATEGORY {
        ObjectId _id
        String name
        String description
    }

    RATING_AND_REVIEW {
        ObjectId _id
        ObjectId user "→ User"
        Number rating
        String review
        ObjectId course "→ Course"
    }

    COURSE_PROGRESS {
        ObjectId _id
        ObjectId courseID "→ Course"
        ObjectId userID "→ User"
    }

    OTP {
        ObjectId _id
        String email
        String otp
        Date createdAt "TTL: 5 min"
    }

    USER ||--|| PROFILE : "additionalDetails"
    USER ||--o{ COURSE : "creates / enrolls"
    USER ||--o{ COURSE_PROGRESS : "tracks"
    USER ||--o{ RATING_AND_REVIEW : "writes"
    COURSE ||--o{ SECTION : "courseContent[]"
    SECTION ||--o{ SUBSECTION : "subSection[]"
    COURSE }o--|| CATEGORY : "belongs to"
    COURSE ||--o{ RATING_AND_REVIEW : "has"
    COURSE ||--o{ USER : "studentsEnrolled[]"
    COURSE_PROGRESS ||--|| COURSE : "for"
    COURSE_PROGRESS ||--o{ SUBSECTION : "completedVideos[]"
```

### 9 Models at a Glance

| Model | Key Fields | Purpose |
|-------|-----------|---------|
| **User** | firstName, lastName, email, password, accountType, courses[] | User accounts with role-based access |
| **Profile** | gender, dateOfBirth, about, contactNumber | Extended user profile (referenced by User) |
| **Course** | courseName, instructor, price, status, studentsEnrolled[] | Course metadata & enrollment tracking |
| **Section** | sectionName, subSection[] | Course content grouping |
| **SubSection** | title, timeDuration, videoUrl | Individual video lectures |
| **Category** | name, description, courses[] | Course categorization |
| **RatingAndReview** | user, rating (1-5), review, course | Student course reviews |
| **CourseProgress** | courseID, userID, completedVideos[] | Per-student progress tracking |
| **OTP** | email, otp, createdAt (TTL: 5 min) | Email verification with auto-expiry |

---

## 📡 API Reference

**Base URL:** `/api/v1`

### Authentication (`/auth`)
| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/auth/sendotp` | ❌ | Send OTP to email |
| `POST` | `/auth/signup` | ❌ | Register with OTP verification |
| `POST` | `/auth/login` | ❌ | Login & receive JWT |
| `POST` | `/auth/changepassword` | ✅ | Change password |
| `POST` | `/auth/reset-password-token` | ❌ | Request password reset link |
| `POST` | `/auth/reset-password` | ❌ | Reset password via token |

### Profile (`/profile`)
| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `GET` | `/profile/getUserDetails` | ✅ | Get user profile |
| `PUT` | `/profile/updateProfile` | ✅ | Update profile info |
| `PUT` | `/profile/updateDisplayPicture` | ✅ | Upload profile picture |
| `DELETE` | `/profile/deleteProfile` | ✅ | Delete account |
| `GET` | `/profile/getEnrolledCourses` | ✅ | List enrolled courses |
| `GET` | `/profile/getInstructorDashboardDetails` | ✅ | Instructor analytics |

### Courses (`/course`)
| Method | Endpoint | Auth | Role | Description |
|--------|----------|:----:|------|-------------|
| `GET` | `/course/getAllCourses` | ❌ | — | List all courses |
| `POST` | `/course/getCourseDetails` | ❌ | — | Public course details |
| `POST` | `/course/getFullCourseDetails` | ✅ | Any | Details + progress (enrolled) |
| `POST` | `/course/createCourse` | ✅ | Instructor | Create course |
| `POST` | `/course/editCourse` | ✅ | Instructor | Edit course |
| `DELETE` | `/course/deleteCourse` | ✅ | Auth | Delete course |
| `GET` | `/course/getInstructorCourses` | ✅ | Instructor | Instructor's courses |
| `POST` | `/course/searchCourse` | ❌ | — | Search by name/desc/tag |
| `POST` | `/course/updateCourseProgress` | ✅ | Student | Mark lecture complete |

### Sections & Sub-Sections (`/course`)
| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/course/addSection` | ✅ | Add section to course |
| `POST` | `/course/updateSection` | ✅ | Update section |
| `POST` | `/course/deleteSection` | ✅ | Delete section |
| `POST` | `/course/addSubSection` | ✅ | Add lecture with video |
| `POST` | `/course/updateSubSection` | ✅ | Update lecture |
| `POST` | `/course/deleteSubSection` | ✅ | Delete lecture |

### Categories (`/course`)
| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/course/createCategory` | ✅ | Create category (Admin) |
| `GET` | `/course/showAllCategories` | ❌ | List all categories |
| `POST` | `/course/getCategoryPageDetails` | ❌ | Courses in a category |
| `POST` | `/course/addCourseToCategory` | ✅ | Assign course to category |

### Ratings & Reviews (`/course`)
| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/course/createRating` | ✅ | Submit rating & review |
| `GET` | `/course/getAverageRating` | ❌ | Average rating for a course |
| `GET` | `/course/getReviews` | ❌ | All reviews |

### Payments (`/payment`)
| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/payment/capturePayment` | ✅ | Create Razorpay order |
| `POST` | `/payment/verifyPayment` | ✅ | Verify signature & enroll |
| `POST` | `/payment/sendPaymentSuccessEmail` | ✅ | Payment confirmation email |

### Contact (`/contact`)
| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/contact/contactUs` | ❌ | Submit contact form |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20+ — [Download](https://nodejs.org/)
- **MongoDB Atlas** account — [Free Tier](https://www.mongodb.com/atlas)
- **Cloudinary** account — [Sign Up](https://cloudinary.com/)
- **Razorpay** account — [Dashboard](https://dashboard.razorpay.com/)
- **Resend** account — [Sign Up](https://resend.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Gagan202005/StudyNotion1.git
cd StudyNotion1
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Variables

Create a `.env` file in the **root** directory:

```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Create a `.env` file in the **`server/`** directory:

```env
# Server
PORT=4000

# Database
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUD_NAME=your_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=your_cloudinary_folder

# Razorpay
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
MAIL_FROM=your_verified_email@yourdomain.com

# CORS
CORS_ORIGIN=["http://localhost:3000"]

# Contact
CONTACT_MAIL=your_contact_email@gmail.com
```

### 4. Run the Application

```bash
# Run both frontend and backend concurrently
npm run dev
```

This starts:
- **Frontend** → `http://localhost:3000`
- **Backend** → `http://localhost:4000`

Or run them separately:

```bash
# Frontend only
npm start

# Backend only (from root)
npm run server
```

---

## 🌐 Deployment

| Component | Service | URL |
|-----------|---------|-----|
| **Frontend** | [Vercel](https://vercel.com) | Auto-deploys from GitHub |
| **Backend** | [Render](https://render.com) | Auto-deploys from GitHub |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) | Managed cloud cluster |
| **Media** | [Cloudinary](https://cloudinary.com) | CDN-backed media storage |

### Deployment Steps

1. **Frontend (Vercel):**
   - Import GitHub repo → set `REACT_APP_BASE_URL` to your Render backend URL → Deploy

2. **Backend (Render):**
   - Create Web Service → connect GitHub → set all `server/.env` variables → Deploy

3. **Database (MongoDB Atlas):**
   - Create free cluster → whitelist Render's IPs → copy connection string to `MONGODB_URL`

4. **Cloudinary:**
   - Create account → copy Cloud Name, API Key, API Secret to env vars

---

## 🔧 Environment Variables Reference

| Variable | Location | Description |
|----------|----------|-------------|
| `REACT_APP_BASE_URL` | Root `.env` | Backend API base URL |
| `REACT_APP_RAZORPAY_KEY_ID` | Root `.env` | Razorpay public key (for checkout) |
| `PORT` | Server `.env` | Backend server port |
| `MONGODB_URL` | Server `.env` | MongoDB Atlas connection string |
| `JWT_SECRET` | Server `.env` | Secret key for JWT signing |
| `CLOUD_NAME` | Server `.env` | Cloudinary cloud name |
| `API_KEY` | Server `.env` | Cloudinary API key |
| `API_SECRET` | Server `.env` | Cloudinary API secret |
| `FOLDER_NAME` | Server `.env` | Cloudinary upload folder |
| `RAZORPAY_KEY` | Server `.env` | Razorpay key ID |
| `RAZORPAY_SECRET` | Server `.env` | Razorpay key secret |
| `RESEND_API_KEY` | Server `.env` | Resend API key |
| `MAIL_FROM` | Server `.env` | Verified sender email (Resend) |
| `CORS_ORIGIN` | Server `.env` | Allowed origins (JSON array) |
| `CONTACT_MAIL` | Server `.env` | Contact form recipient |

---

## 📬 Email Templates

The platform sends transactional emails using custom HTML templates:

| Template | Trigger | Content |
|----------|---------|---------|
| **Email Verification** | User signup | OTP code for email verification |
| **Password Update** | Password changed/reset | Confirmation of password change |
| **Course Enrollment** | Successful purchase | Course name, description, thumbnail |
| **Payment Success** | Payment verified | Amount, payment ID, order ID |

---

## 🛡️ Security Features

- **Password Hashing** — bcrypt with 10 salt rounds
- **JWT Authentication** — 24-hour token expiry with httpOnly cookies
- **OTP Auto-Expiry** — MongoDB TTL index (5 minutes)
- **CORS Whitelist** — Configurable allowed origins
- **Role-Based Authorization** — Middleware guards for Student / Instructor / Admin
- **Payment Verification** — HMAC-SHA256 signature validation (Razorpay)
- **Server-Side Price Calculation** — Prevents client-side amount tampering

---

## 🗂️ Redux State Architecture

| Slice | State Shape | Purpose |
|-------|------------|---------|
| `authSlice` | `{ signupData, loading, token }` | Authentication & signup flow |
| `profileSlice` | `{ user, loading }` | Logged-in user data |
| `cartSlice` | `{ cart, total, totalItems }` | Shopping cart (localStorage) |
| `courseSlice` | `{ step, course, editCourse, paymentLoading }` | Course builder wizard |
| `viewCourseSlice` | `{ courseSectionData, completedLectures, totalNoOfLectures }` | Video player & progress |
| `loadingBarSlice` | `progress` | Top loading indicator |

---

## 📄 License

This project is built for educational purposes.

---

<p align="center">
  Built with ❤️ using the MERN Stack
</p>
