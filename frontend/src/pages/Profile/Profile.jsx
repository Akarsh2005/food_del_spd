import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/profiles/${profile.userId}`);
        const result = await response.json();
        if (result.success) {
          setProfile(result.data);
        } else {
          setError(result.message || "Error fetching profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile");
      }
    };

    fetchProfile();
  }, [profile.userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`http://localhost:4000/api/profiles/${profile.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Profile updated successfully");
      } else {
        setError(result.message || "Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='profile'>
      <h2 className='title'>Edit Profile</h2>
      <form onSubmit={handleSubmit} className='profile-form'>
        <div className="multi-field">
          <input
            type="text"
            name="userId"
            value={profile.userId}
            onChange={handleChange}
            placeholder='User ID'
            required
          />
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            placeholder='First Name'
            required
          />
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            placeholder='Last Name'
            required
          />
        </div>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder='Email Address'
          required
        />
        <input
          type="text"
          name="street"
          value={profile.street}
          onChange={handleChange}
          placeholder='Street'
          required
        />
        <div className="multi-field">
          <input
            type="text"
            name="city"
            value={profile.city}
            onChange={handleChange}
            placeholder='City'
            required
          />
          <input
            type="text"
            name="state"
            value={profile.state}
            onChange={handleChange}
            placeholder='State'
            required
          />
        </div>
        <div className="multi-field">
          <input
            type="text"
            name="zipcode"
            value={profile.zipcode}
            onChange={handleChange}
            placeholder='Zip Code'
            required
          />
          <input
            type="text"
            name="country"
            value={profile.country}
            onChange={handleChange}
            placeholder='Country'
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder='Phone'
          required
        />
        <button type="submit" className='profile-submit' disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>

      {/* Success/Error Messages */}
      {error && <p className='error'>{error}</p>}
      {success && <p className='success'>{success}</p>}
    </div>
  );
};

export default Profile;
