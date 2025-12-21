import React, { useState } from 'react';
import { AdminContent, UserSubmission, Language } from '../types';
import { X, Download, Trash2, Users, Clock, CheckCircle, AlertCircle, Search, Monitor, Smartphone, Globe, Info, ChevronDown, ChevronUp, LogOut } from 'lucide-react';

interface AdminPanelProps {
  content: AdminContent;
  submissions: UserSubmission[];
  onClose: () => void;
  onUpdateStatus: (id: string, status: UserSubmission['status']) => void;
  onDelete: (id: string) => void;
  onLogout?: () => void;
  lang: Language;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  content, 
  submissions, 
  onClose, 
  onUpdateStatus, 
  onDelete,
  onLogout,
  lang 
}) => {
  const [filter, setFilter] = useState<'all' | UserSubmission['status']>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'submissions' | 'analytics'>('submissions');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredSubmissions = submissions.filter(sub => {
    const matchesFilter = filter === 'all' || sub.status === filter;
    const matchesSearch = 
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.phone.includes(searchTerm) ||
      sub.business.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    contacted: submissions.filter(s => s.status === 'contacted').length,
    completed: submissions.filter(s => s.status === 'completed').length,
  };

  // Analytics calculations
  const getAnalytics = () => {
    const submissionsWithDeviceInfo = submissions.filter(s => s.deviceInfo);
    
    const browserCounts: Record<string, number> = {};
    const osCounts: Record<string, number> = {};
    const deviceCounts: Record<string, number> = {};
    const screenSizes: Record<string, number> = {};
    
    submissionsWithDeviceInfo.forEach(s => {
      if (s.deviceInfo) {
        browserCounts[s.deviceInfo.browser] = (browserCounts[s.deviceInfo.browser] || 0) + 1;
        osCounts[s.deviceInfo.os] = (osCounts[s.deviceInfo.os] || 0) + 1;
        deviceCounts[s.deviceInfo.device] = (deviceCounts[s.deviceInfo.device] || 0) + 1;
        screenSizes[s.deviceInfo.screenSize] = (screenSizes[s.deviceInfo.screenSize] || 0) + 1;
      }
    });

    return { browserCounts, osCounts, deviceCounts, screenSizes, total: submissionsWithDeviceInfo.length };
  };

  const analytics = getAnalytics();

  const exportToCSV = () => {
    const headers = ['Name', 'Phone', 'Business', 'Message', 'Date', 'Status', 'Browser', 'OS', 'Device', 'Screen', 'Language', 'Timezone', 'Referrer'];
    const rows = submissions.map(s => [
      s.name,
      s.phone,
      s.business,
      s.message,
      new Date(s.timestamp).toLocaleString(),
      s.status,
      s.deviceInfo?.browser || '',
      s.deviceInfo?.os || '',
      s.deviceInfo?.device || '',
      s.deviceInfo?.screenSize || '',
      s.deviceInfo?.language || '',
      s.deviceInfo?.timezone || '',
      s.deviceInfo?.referrer || ''
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `chabakapro-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(lang === 'ar' ? 'ar-MA' : 'fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: UserSubmission['status']) => {
    switch (status) {
      case 'new': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'contacted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-brand-navy text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{content.title}</h2>
            <p className="text-slate-300 text-sm mt-1">Ctrl+Shift+A to toggle</p>
          </div>
          <div className="flex items-center gap-3">
            {onLogout && (
              <button
                onClick={onLogout}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-4 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                {lang === 'ar' ? 'تسجيل الخروج' : 'Déconnexion'}
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 border-b">
          <div className="bg-white rounded-2xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-brand-navy/10 p-2 rounded-xl">
                <Users className="w-6 h-6 text-brand-navy" />
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-navy">{stats.total}</div>
                <div className="text-sm text-slate-500">{content.totalSubmissions}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-xl">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.new}</div>
                <div className="text-sm text-slate-500">{content.newSubmissions}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.contacted}</div>
                <div className="text-sm text-slate-500">{content.contactedSubmissions}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-slate-500">{content.completedSubmissions}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b bg-white">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex-1 py-3 font-medium transition-colors ${
              activeTab === 'submissions' 
                ? 'text-brand-teal border-b-2 border-brand-teal' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            📋 Submissions
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-3 font-medium transition-colors ${
              activeTab === 'analytics' 
                ? 'text-brand-teal border-b-2 border-brand-teal' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            📊 {content.analyticsTitle}
          </button>
        </div>

        {activeTab === 'analytics' ? (
          /* Analytics Tab */
          <div className="flex-1 overflow-auto p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Browsers */}
              <div className="bg-white rounded-2xl p-6 border shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-brand-teal" />
                  <h3 className="font-bold text-slate-700">{content.browserStats}</h3>
                </div>
                {Object.entries(analytics.browserCounts).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(analytics.browserCounts)
                      .sort((a, b) => b[1] - a[1])
                      .map(([browser, count]) => (
                        <div key={browser} className="flex justify-between items-center">
                          <span className="text-slate-600">{browser}</span>
                          <span className="bg-brand-teal/10 text-brand-teal px-2 py-1 rounded-lg text-sm font-medium">
                            {count} ({Math.round((count / analytics.total) * 100)}%)
                          </span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">{content.noData}</p>
                )}
              </div>

              {/* Operating Systems */}
              <div className="bg-white rounded-2xl p-6 border shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Monitor className="w-5 h-5 text-blue-500" />
                  <h3 className="font-bold text-slate-700">OS</h3>
                </div>
                {Object.entries(analytics.osCounts).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(analytics.osCounts)
                      .sort((a, b) => b[1] - a[1])
                      .map(([os, count]) => (
                        <div key={os} className="flex justify-between items-center">
                          <span className="text-slate-600">{os}</span>
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-lg text-sm font-medium">
                            {count} ({Math.round((count / analytics.total) * 100)}%)
                          </span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">{content.noData}</p>
                )}
              </div>

              {/* Devices */}
              <div className="bg-white rounded-2xl p-6 border shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="w-5 h-5 text-purple-500" />
                  <h3 className="font-bold text-slate-700">{content.deviceStats}</h3>
                </div>
                {Object.entries(analytics.deviceCounts).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(analytics.deviceCounts)
                      .sort((a, b) => b[1] - a[1])
                      .map(([device, count]) => (
                        <div key={device} className="flex justify-between items-center">
                          <span className="text-slate-600">{device}</span>
                          <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-lg text-sm font-medium">
                            {count} ({Math.round((count / analytics.total) * 100)}%)
                          </span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">{content.noData}</p>
                )}
              </div>

              {/* Screen Sizes */}
              <div className="bg-white rounded-2xl p-6 border shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Monitor className="w-5 h-5 text-orange-500" />
                  <h3 className="font-bold text-slate-700">Screen Sizes</h3>
                </div>
                {Object.entries(analytics.screenSizes).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(analytics.screenSizes)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([size, count]) => (
                        <div key={size} className="flex justify-between items-center">
                          <span className="text-slate-600 text-sm">{size}</span>
                          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-lg text-sm font-medium">
                            {count}
                          </span>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">{content.noData}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
        {/* Filters & Actions */}
        <div className="p-4 flex flex-wrap gap-4 items-center justify-between border-b bg-white">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                filter === 'all' ? 'bg-brand-navy text-white' : 'bg-slate-100 hover:bg-slate-200'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilter('new')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                filter === 'new' ? 'bg-yellow-500 text-white' : 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700'
              }`}
            >
              {content.statusLabels.new} ({stats.new})
            </button>
            <button
              onClick={() => setFilter('contacted')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                filter === 'contacted' ? 'bg-blue-500 text-white' : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
              }`}
            >
              {content.statusLabels.contacted} ({stats.contacted})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                filter === 'completed' ? 'bg-green-500 text-white' : 'bg-green-50 hover:bg-green-100 text-green-700'
              }`}
            >
              {content.statusLabels.completed} ({stats.completed})
            </button>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ps-10 pe-4 py-2 border rounded-xl focus:outline-none focus:border-brand-teal"
              />
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-brand-teal hover:bg-[#166d85] text-white px-4 py-2 rounded-xl font-medium transition-colors"
            >
              <Download className="w-5 h-5" />
              {content.exportButton}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto p-4">
          {filteredSubmissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <Users className="w-16 h-16 mb-4" />
              <p className="text-xl font-medium">{content.noData}</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 sticky top-0">
                <tr>
                  <th className="text-start p-4 font-semibold text-slate-600 rounded-s-xl"></th>
                  <th className="text-start p-4 font-semibold text-slate-600">{content.tableHeaders.name}</th>
                  <th className="text-start p-4 font-semibold text-slate-600">{content.tableHeaders.phone}</th>
                  <th className="text-start p-4 font-semibold text-slate-600">{content.tableHeaders.business}</th>
                  <th className="text-start p-4 font-semibold text-slate-600">{content.tableHeaders.date}</th>
                  <th className="text-start p-4 font-semibold text-slate-600">{content.tableHeaders.status}</th>
                  <th className="text-start p-4 font-semibold text-slate-600 rounded-e-xl">{content.tableHeaders.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission) => (
                  <React.Fragment key={submission.id}>
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <button
                        onClick={() => setExpandedRow(expandedRow === submission.id ? null : submission.id)}
                        className="text-slate-400 hover:text-brand-teal transition-colors"
                      >
                        {expandedRow === submission.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </td>
                    <td className="p-4 font-medium">{submission.name}</td>
                    <td className="p-4">
                      <a href={`tel:${submission.phone}`} className="text-brand-teal hover:underline" dir="ltr">
                        {submission.phone}
                      </a>
                    </td>
                    <td className="p-4">{submission.business}</td>
                    <td className="p-4 text-sm text-slate-500">{formatDate(submission.timestamp)}</td>
                    <td className="p-4">
                      <select
                        value={submission.status}
                        onChange={(e) => onUpdateStatus(submission.id, e.target.value as UserSubmission['status'])}
                        className={`px-3 py-1 rounded-lg border font-medium cursor-pointer ${getStatusColor(submission.status)}`}
                      >
                        <option value="new">{content.statusLabels.new}</option>
                        <option value="contacted">{content.statusLabels.contacted}</option>
                        <option value="completed">{content.statusLabels.completed}</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => onDelete(submission.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title={content.deleteButton}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                  {/* Expanded Device Info Row */}
                  {expandedRow === submission.id && (
                    <tr className="bg-slate-50">
                      <td colSpan={7} className="p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          {/* User Submitted Data */}
                          <div className="bg-white p-3 rounded-xl border col-span-full">
                            <span className="text-slate-400 block text-xs uppercase tracking-wide mb-2">User Information</span>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div>
                                <span className="text-slate-400 block text-xs">Name</span>
                                <span className="font-bold text-brand-navy">{submission.name}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block text-xs">Phone</span>
                                <a href={`tel:${submission.phone}`} className="font-bold text-brand-teal" dir="ltr">{submission.phone}</a>
                              </div>
                              <div>
                                <span className="text-slate-400 block text-xs">Business</span>
                                <span className="font-bold">{submission.business}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block text-xs">Date</span>
                                <span className="font-medium">{formatDate(submission.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Message */}
                          {submission.message && (
                            <div className="bg-white p-3 rounded-xl border col-span-full">
                              <span className="text-slate-400 block text-xs">Message</span>
                              <span className="font-medium">{submission.message}</span>
                            </div>
                          )}
                          
                          {/* Device Info */}
                          {submission.deviceInfo ? (
                            <>
                              <div className="bg-white p-3 rounded-xl border col-span-full">
                                <span className="text-slate-400 block text-xs uppercase tracking-wide mb-2">Device & Browser Information</span>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                  <div>
                                    <span className="text-slate-400 block text-xs">Browser</span>
                                    <span className="font-medium">{submission.deviceInfo.browser} {submission.deviceInfo.browserVersion}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 block text-xs">Operating System</span>
                                    <span className="font-medium">{submission.deviceInfo.os}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 block text-xs">Device Type</span>
                                    <span className="font-medium">{submission.deviceInfo.device}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 block text-xs">Screen Size</span>
                                    <span className="font-medium">{submission.deviceInfo.screenSize}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 block text-xs">Language</span>
                                    <span className="font-medium">{submission.deviceInfo.language}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 block text-xs">Timezone</span>
                                    <span className="font-medium">{submission.deviceInfo.timezone}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 block text-xs">Referrer</span>
                                    <span className="font-medium truncate block">{submission.deviceInfo.referrer || 'Direct'}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 block text-xs">Page URL</span>
                                    <span className="font-medium truncate block text-xs">{submission.deviceInfo.pageUrl}</span>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="bg-slate-100 p-3 rounded-xl border col-span-full text-center text-slate-400">
                              No device information available
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t flex justify-between items-center">
          <p className="text-sm text-slate-500">
            Showing {filteredSubmissions.length} of {submissions.length} submissions
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl font-medium transition-colors"
          >
            {content.closeButton}
          </button>
        </div>
        </>
        )}
      </div>
    </div>
  );
};
