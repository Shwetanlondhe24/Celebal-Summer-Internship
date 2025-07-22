# 📦 ShipTracker - Comprehensive Shipment Delivery Management System

![ShipTracker Banner](https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&fit=crop)

## 🌟 Overview

ShipTracker is a web application designed to revolutionize shipment delivery management through a comprehensive multi-user platform. Built during my internship experience, this project demonstrates modern web development practices and real-world problem-solving capabilities.

**Project Context:**
- **Company:** Celebal Technologies
- **Duration:**  2/6/2025 to 23/7/2025
- **Project Title:** Shipment Delivery Application
- **Role:** React.js Intern

---

## 🎯 Problem Statement

Traditional shipment tracking systems often lack comprehensive management capabilities and fail to provide role-specific interfaces for different stakeholders. Most existing solutions offer limited visibility into the delivery process and don't facilitate efficient communication between customers, couriers, and administrators. ShipTracker addresses these gaps by providing a unified platform that streamlines the entire shipment lifecycle from creation to delivery.

---

## 🏗️ Solution Approach

The solution implements a **multi-user architecture** that serves three distinct user types, each with tailored interfaces and functionalities:

### 👥 Multi-User System Architecture

The system serves **3 types of users**, each with specific goals and responsibilities:

#### 1. 🛍️ **Customers** - *Shipment Creators & Trackers*
**Primary Goal:** Create, manage, and track their shipments efficiently

**Why This Perspective:** Customers need an intuitive interface to manage their shipping needs without technical complexity, while having complete visibility into their shipment status.

#### 2. 🚚 **Couriers** - *Delivery Executors*
**Primary Goal:** Efficiently manage assigned deliveries and update shipment status

**Why This Perspective:** Couriers need a mobile-friendly interface focused on execution efficiency, with minimal data entry and maximum operational support.

#### 3. 👨‍💼 **Administrators** - *System Orchestrators*
**Primary Goal:** Oversee operations, manage assignments, and ensure system efficiency.

**Why This Perspective:** Administrators need a comprehensive control center with analytics and management tools to ensure smooth operations across the entire system.

### 🔄 **Inter-User Interactions:**
- **Customer → Admin:** Shipment requests flow to admin for courier assignment.
- **Admin → Courier:** Assignments are distributed based on capacity and location.
- **Courier → Customer:** Real-time updates and delivery confirmations.
- **All Users:** Shared tracking system provides transparency across all stakeholders.

---

### **Key Features:**
- 🎨 **Responsive Design:** Mobile-first approach with seamless desktop experience.
- 🔐 **Role-Based Authentication:** Secure login system with role-specific redirects.
- 💳 **Payment Integration:** Mock payment system with comprehensive error handling.
- 📱 **Progressive Web App:** Optimized for mobile courier usage.
- 📊 **Analytics Dashboard:** Comprehensive metrics and reporting.

---

## 🚀 Getting Started

### **Installation:**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/shiptracker.git
   cd shiptracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### **Demo Accounts:**
```
Customer: customer@demo.com | Password: demo123
Courier:  courier@demo.com  | Password: demo123
Admin:    admin@demo.com    | Password: demo123
```

### **Build for Production:**
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── PaymentForm.jsx # Payment processing
│   └── ProtectedRoute.jsx # Route protection
├── contexts/           # React Context providers
│   └── AuthContext.jsx # Authentication state
├── hooks/             # Custom React hooks
│   └── usePayment.js  # Payment processing hook
├── pages/             # Main application pages
│   ├── Dashboard.jsx      # Customer dashboard
│   ├── CourierDashboard.jsx # Courier interface
│   ├── AdminPanel.jsx     # Admin management
│   ├── CreateShipment.jsx # Shipment creation
│   ├── TrackShipment.jsx  # Tracking interface
│   ├── LoginPage.jsx      # Authentication
│   └── SignupPage.jsx     # User registration
├── services/          # API and business logic
│   ├── mockPaymentAPI.js  # Payment simulation
│   └── paymentService.js  # Payment abstraction
└── App.jsx           # Main application component
```
---

## 🏢 Internship Experience

### **Mode: Online Internship**

The internship at **Celebal Technologies** offered a flexible and enriching online learning experience. Despite the remote setup, the guidance and structured sessions made it engaging and productive.

---

### **Learning & Development Highlights:**

- ✅ **Code Reviews:** Regular feedback on assignments helped improve code quality and adherence to best practices.  
- ❓ **Doubt-Solving Sessions:** Interactive discussions with mentors to clarify technical concepts and implementation approaches.  
- 🎓 **Training Lectures:** Focused sessions on frontend tools, UI design, and industry-relevant practices. 
- 📄 **Professional Growth:** Sessions on **resume building**, **portfolio tips**, and career preparation.

---

## 🙏 Acknowledgments

- **Celebal Technologies** for providing the internship opportunity.
- **Mentors** for technical guidance and support.

---

*Built with ❤️ during my internship at Celebal Technologies*