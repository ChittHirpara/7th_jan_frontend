import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { analysisApi } from '../api/analysis';
import type { AnalysisResult } from '../types/analysis';
import { EthicalBanner } from '../components/EthicalBanner';
import { RiskMeter } from '../components/RiskMeter';
import { VulnerabilityCard } from '../components/VulnerabilityCard';

export const HistoryPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await analysisApi.getHistory();
        setHistory(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load analysis history');
        console.error('History error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analysis History</h1>
              <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/analyze')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                New Analysis
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EthicalBanner />

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* History List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Past Analyses ({history.length})
              </h2>
              {history.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No analysis history found</p>
                  <button
                    onClick={() => navigate('/analyze')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Start First Analysis
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {history.map((analysis) => (
                    <button
                      key={analysis._id}
                      onClick={() => setSelectedAnalysis(analysis)}
                      className={`w-full text-left p-3 rounded border transition-colors ${
                        selectedAnalysis?._id === analysis._id
                          ? 'bg-blue-50 border-blue-300'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {analysis.inputType.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(analysis.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Risk: {analysis.riskScore}/100 • Vulns: {analysis.vulnerabilities.length}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Selected Analysis Details */}
          <div className="lg:col-span-2">
            {selectedAnalysis ? (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900">Analysis Details</h2>
                    <span className="text-sm text-gray-500">
                      {new Date(selectedAnalysis.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Input Type:</span> {selectedAnalysis.inputType}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Original Content:</p>
                      <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded border border-gray-700 overflow-x-auto">
                        <code>{selectedAnalysis.content}</code>
                      </pre>
                    </div>
                  </div>
                  <RiskMeter riskScore={selectedAnalysis.riskScore} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Vulnerabilities ({selectedAnalysis.vulnerabilities.length})
                  </h3>
                  {selectedAnalysis.vulnerabilities.length === 0 ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded text-green-800">
                      <p className="font-medium">No vulnerabilities detected in this analysis.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedAnalysis.vulnerabilities.map((vuln) => (
                        <VulnerabilityCard key={vuln._id} vulnerability={vuln} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
                <p className="text-gray-500">Select an analysis from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;