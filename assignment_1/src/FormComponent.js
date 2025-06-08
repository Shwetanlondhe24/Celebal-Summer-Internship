import React, { useState } from 'react';
import "./style.css";
const countries = [
  { name: 'India', code: 'IN', phoneCode: '+91', cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'] },
  { name: 'United States', code: 'US', phoneCode: '+1', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'] },
  { name: 'United Kingdom', code: 'GB', phoneCode: '+44', cities: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool', 'Leeds'] },
  { name: 'Canada', code: 'CA', phoneCode: '+1', cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton'] },
  { name: 'Australia', code: 'AU', phoneCode: '+61', cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast'] }
];

function FormComponent() {
  const [currentPage, setCurrentPage] = useState('form');
  const [submittedData, setSubmittedData] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    country: '',
    city: '',
    panNumber: '',
    aadharNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name should contain only letters';
        }
        break;
      
      case 'username':
        if (!value.trim()) {
          error = 'Username is required';
        } else if (value.length < 3) {
          error = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = 'Username can only contain letters, numbers, and underscores';
        }
        break;
      
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = 'Password must contain uppercase, lowercase, and number';
        }
        break;
      
      case 'phoneNumber':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value.replace(/\s/g, ''))) {
          error = 'Please enter a valid 10-digit phone number';
        }
        break;
      
      case 'country':
        if (!value) {
          error = 'Country is required';
        }
        break;
      
      case 'city':
        if (!value) {
          error = 'City is required';
        }
        break;
      
      case 'panNumber':
        if (!value.trim()) {
          error = 'PAN number is required';
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())) {
          error = 'Please enter a valid PAN number (e.g., ABCDE1234F)';
        }
        break;
      
      case 'aadharNumber':
        if (!value.trim()) {
          error = 'Aadhar number is required';
        } else if (!/^\d{12}$/.test(value.replace(/\s/g, ''))) {
          error = 'Please enter a valid 12-digit Aadhar number';
        }
        break;
      
      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    if (name === 'country') {
      const country = countries.find(c => c.name === value);
      setSelectedCountry(country);
      setFormData(prev => ({
        ...prev,
        city: ''
      }));
      setErrors(prev => ({
        ...prev,
        city: ''
      }));
    }
  };

  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'username', 'email', 'password', 'phoneNumber', 'country', 'city', 'panNumber', 'aadharNumber'];
    
    const allFieldsFilled = requiredFields.every(field => formData[field].trim() !== '');
    const noErrors = requiredFields.every(field => !validateField(field, formData[field]));
    
    return allFieldsFilled && noErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setSubmittedData({
        ...formData,
        phoneCode: selectedCountry?.phoneCode || '',
        countryCode: selectedCountry?.code || ''
      });
      setCurrentPage('success');
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      country: '',
      city: '',
      panNumber: '',
      aadharNumber: ''
    });
    setErrors({});
    setSelectedCountry(null);
    setCurrentPage('form');
    setSubmittedData(null);
  };

  if (currentPage === 'success') {
    return (
      <div className="container">
        <div className="form-container">
          <h2 className="success-title">Registration Successful!</h2>
          
          <div className="success-details">
            <h3 className="details-title">Submitted Details:</h3>
            
            <div className="details-grid">
              <div><strong>First Name:</strong> {submittedData.firstName}</div>
              <div><strong>Last Name:</strong> {submittedData.lastName}</div>
              <div><strong>Username:</strong> {submittedData.username}</div>
              <div><strong>Email:</strong> {submittedData.email}</div>
              <div><strong>Phone:</strong> {submittedData.phoneCode} {submittedData.phoneNumber}</div>
              <div><strong>Country:</strong> {submittedData.country} ({submittedData.countryCode})</div>
              <div><strong>City:</strong> {submittedData.city}</div>
              <div><strong>PAN Number:</strong> {submittedData.panNumber.toUpperCase()}</div>
              <div><strong>Aadhar Number:</strong> {submittedData.aadharNumber}</div>
            </div>
          </div>
          
          <button 
            onClick={resetForm}
            className="btn btn-primary btn-full"
          >
            Register Another User
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Registration Form</h2>
        
        <div className="form-wrapper">
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`form-input ${errors.firstName ? 'error' : ''}`}
                placeholder="Enter your first name"
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`form-input ${errors.lastName ? 'error' : ''}`}
                placeholder="Enter your last name"
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`form-input ${errors.username ? 'error' : ''}`}
                placeholder="Enter username"
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Password *</label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-input password-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Phone Number *</label>
              <div className="phone-container">
                <input
                  type="text"
                  value={selectedCountry?.phoneCode || ''}
                  readOnly
                  className="phone-code"
                  placeholder="Code"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`form-input phone-number ${errors.phoneNumber ? 'error' : ''}`}
                  placeholder="Enter phone number"
                />
              </div>
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`form-select ${errors.country ? 'error' : ''}`}
              >
                <option value="">Select Country</option>
                {countries.map(country => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && <span className="error-message">{errors.country}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">City *</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!selectedCountry}
                className={`form-select ${errors.city ? 'error' : ''} ${!selectedCountry ? 'disabled' : ''}`}
              >
                <option value="">Select City</option>
                {selectedCountry?.cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">PAN Number *</label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleInputChange}
                className={`form-input pan-input ${errors.panNumber ? 'error' : ''}`}
                placeholder="Enter PAN number (e.g., ABCDE1234F)"
                maxLength="10"
              />
              {errors.panNumber && <span className="error-message">{errors.panNumber}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">Aadhar Number *</label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                className={`form-input ${errors.aadharNumber ? 'error' : ''}`}
                placeholder="Enter 12-digit Aadhar number"
                maxLength="12"
              />
              {errors.aadharNumber && <span className="error-message">{errors.aadharNumber}</span>}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className={`btn btn-submit ${isFormValid() ? 'btn-success' : 'btn-disabled'}`}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormComponent;