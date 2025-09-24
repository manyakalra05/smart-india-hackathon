import React, { useState } from 'react';
import { Target, Clock, CheckCircle, AlertCircle, User, Calendar, MessageCircle, Plus, Filter } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { mockInterventions } from '../../utils/mockData';

const Interventions = () => {
  const { t } = useLanguage();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedIntervention, setSelectedIntervention] = useState(null);

  const statusOptions = [
    { value: 'all', label: 'All Interventions' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' }
  ];

  const interventionTypes = [
    'Academic Support', 'Financial Aid', 'Counseling', 'Health Support',
    'Transportation', 'Peer Mentoring', 'Family Counseling', 'Career Guidance'
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'ongoing': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'completed': return 'text-green-600 bg-green-100 border-green-200';
      case 'approved': return 'text-green-600 bg-green-100 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'cancelled': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredInterventions = mockInterventions.filter(intervention => {
    if (selectedStatus === 'all') return true;
    return intervention.status.toLowerCase() === selectedStatus;
  });

  const CreateInterventionModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      studentId: '',
      type: '',
      priority: 'medium',
      assignedTo: '',
      description: '',
      dueDate: ''
    });

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Intervention</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
              <select className="input-field" value={formData.studentId} onChange={(e) => setFormData({...formData, studentId: e.target.value})}>
                <option value="">Select Student</option>
                <option value="1">आर्यन शर्मा</option>
                <option value="2">प्रिया पटेल</option>
                <option value="4">அனிதா முருகன்</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Intervention Type</label>
              <select className="input-field" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option value="">Select Type</option>
                {interventionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select className="input-field" value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
              <input 
                type="text" 
                className="input-field" 
                value={formData.assignedTo}
                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                placeholder="Enter staff member name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                className="input-field" 
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the intervention plan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input 
                type="date" 
                className="input-field"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
              <button type="submit" className="btn-primary flex-1">Create Intervention</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('interventions')}</h1>
          <p className="mt-1 text-gray-600">
            Manage and track student support interventions
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-field text-sm"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Intervention
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Active</p>
              <p className="text-2xl font-bold text-blue-600">
                {mockInterventions.filter(i => i.status === 'ongoing').length}
              </p>
            </div>
            <Target className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">
                {mockInterventions.filter(i => i.priority === 'high').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {mockInterventions.filter(i => i.status === 'completed' || i.status === 'approved').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Success</p>
              <p className="text-2xl font-bold text-green-600">78%</p>
            </div>
            <Target className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Interventions List */}
      <div className="space-y-4">
        {filteredInterventions.map((intervention) => (
          <div key={intervention.id} className="card p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              {/* Main Info */}
              <div className="flex items-start space-x-4 mb-4 lg:mb-0 flex-1">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {intervention.studentName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(intervention.status)}`}>
                      {intervention.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(intervention.priority)}`}>
                      {intervention.priority} priority
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{intervention.type}</p>
                  <p className="text-sm text-gray-500 mb-3">{intervention.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{intervention.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(intervention.progress)}`}
                        style={{ width: `${intervention.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {intervention.assignedTo}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Due: {intervention.dueDate}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Created: {intervention.createdDate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2 lg:ml-4">
                <button className="btn-secondary text-xs px-3 py-2 flex items-center">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Add Note
                </button>
                <button className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Update Status
                </button>
              </div>
            </div>

            {/* Notes Section */}
            {intervention.notes && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Latest Notes:</h4>
                <p className="text-sm text-gray-600 italic">{intervention.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Intervention Types Overview */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Intervention Types & Effectiveness</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {interventionTypes.map((type, index) => {
            const count = mockInterventions.filter(i => i.type === type).length;
            const effectiveness = [85, 92, 78, 88, 95, 82, 75, 80][index] || 80;
            
            return (
              <div key={type} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2 text-sm">{type}</h4>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{count} active</span>
                  <span>{effectiveness}% effective</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${getProgressColor(effectiveness)}`}
                    style={{ width: `${effectiveness}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Intervention Modal */}
      <CreateInterventionModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default Interventions;