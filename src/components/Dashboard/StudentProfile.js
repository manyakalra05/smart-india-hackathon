import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, Camera, Award, Target, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const StudentProfile = () => {
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+91-9876543212',
    dateOfBirth: '2005-08-15',
    address: 'Mumbai, Maharashtra, India',
    guardianName: 'राज शर्मा',
    guardianPhone: '+91-9876543210',
    bloodGroup: 'O+',
    emergencyContact: '+91-9876543211',
    bio: 'Passionate about mathematics and science. Aspiring to become a software engineer.',
    interests: ['Mathematics', 'Computer Science', 'Physics', 'Chess'],
    languages: ['English', 'Hindi', 'Marathi'],
    achievements: [
      'Math Olympiad Regional Winner 2023',
      'Science Fair First Prize 2023',
      'Perfect Attendance Award 2022'
    ]
  });

  const [stats] = useState({
    level: 3,
    points: 450,
    streak: 5,
    completedGoals: 8,
    currentRank: 45,
    totalStudents: 200,
    averageGrade: 'B+',
    attendance: 82
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    updateUser({ name: profileData.name, phone: profileData.phone });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const addInterest = () => {
    const interest = prompt('Enter a new interest:');
    if (interest && !profileData.interests.includes(interest)) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const removeInterest = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-1 text-gray-600">
            Manage your personal information and preferences
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          {isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card p-6 text-center">
            {/* Profile Picture */}
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profileData.name.charAt(0)}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 hover:bg-gray-50">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              )}
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-1">{profileData.name}</h2>
            <p className="text-gray-600 mb-4">Student • Level {stats.level}</p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.points}</div>
                <div className="text-xs text-gray-600">Total Points</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.averageGrade}</div>
                <div className="text-xs text-gray-600">Avg Grade</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{stats.currentRank}</div>
                <div className="text-xs text-gray-600">Class Rank</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{stats.streak}</div>
                <div className="text-xs text-gray-600">Day Streak</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button className="w-full btn-secondary text-sm">
                View Progress Report
              </button>
              <button className="w-full btn-secondary text-sm">
                Download Certificate
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <div className="flex items-center p-2 bg-gray-50 rounded">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{profileData.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="flex items-center p-2 bg-gray-50 rounded">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{profileData.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <div className="flex items-center p-2 bg-gray-50 rounded">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{profileData.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <div className="flex items-center p-2 bg-gray-50 rounded">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <div className="flex items-center p-2 bg-gray-50 rounded">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{profileData.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Guardian Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.guardianName}
                    onChange={(e) => handleInputChange('guardianName', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{profileData.guardianName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guardian Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.guardianPhone}
                    onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{profileData.guardianPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                {isEditing ? (
                  <select
                    value={profileData.bloodGroup}
                    onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                    className="input-field"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{profileData.bloodGroup}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded">{profileData.emergencyContact}</p>
                )}
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows="4"
                className="input-field"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-700 p-4 bg-gray-50 rounded">{profileData.bio}</p>
            )}
          </div>

          {/* Interests & Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Interests</h3>
                {isEditing && (
                  <button
                    onClick={addInterest}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Interest
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {interest}
                    {isEditing && (
                      <button
                        onClick={() => removeInterest(interest)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.languages.map((language, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-500" />
              Achievements
            </h3>
            <div className="space-y-3">
              {profileData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <Award className="h-5 w-5 text-yellow-500 mr-3" />
                  <span className="text-gray-900">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;