import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import ConfirmationModal from './ConfirmationModal';
import { Copy, Trash2, AlertCircle, Check } from 'lucide-react';
import * as apiKeyService from '../services/apiKey.service';

interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  environment: 'test' | 'live';
  revoked: boolean;
  lastUsedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const ApiKeys: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [environment, setEnvironment] = useState<'test' | 'live'>('live');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'danger' | 'warning';
    title: string;
    message: string;
    action: () => Promise<void>;
    confirmText: string;
  }>({
    isOpen: false,
    type: 'danger',
    title: '',
    message: '',
    action: async () => {},
    confirmText: 'Confirm',
  });

  // Load API keys on mount
  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    setLoading(true);
    setError(null);

    const response = await apiKeyService.listApiKeys();

    if (response.success && response.apiKeys) {
      setApiKeys(response.apiKeys);
    } else {
      setError(response.error || 'Failed to load API keys');
    }

    setLoading(false);
  };

  const handleCreateKey = async () => {
    if (!keyName.trim()) {
      setError('Please enter a key name');
      return;
    }

    setLoading(true);
    setError(null);

    const response = await apiKeyService.createApiKey(
      keyName.trim(),
      environment
    );

    if (response.success && response.apiKey) {
      // Store the newly created key to display it
      setNewlyCreatedKey(response.apiKey.key || null);

      // Reload the list
      await loadApiKeys();

      // Close create modal
      setIsCreateModalOpen(false);
      setKeyName('');
      setEnvironment('live');
    } else {
      setError(response.error || 'Failed to create API key');
    }

    setLoading(false);
  };

  const handleDeleteKey = (keyId: string) => {
    setConfirmModal({
      isOpen: true,
      type: 'danger',
      title: 'Delete API Key',
      message:
        'Are you sure you want to delete this API key? This action cannot be undone.',
      confirmText: 'Delete Key',
      action: async () => {
        setLoading(true);
        setError(null);
        const response = await apiKeyService.deleteApiKey(keyId);
        if (response.success) {
          await loadApiKeys();
        } else {
          setError(response.error || 'Failed to delete API key');
        }
        setLoading(false);
        closeConfirmModal();
      },
    });
  };

  const handleRevokeKey = (keyId: string) => {
    setConfirmModal({
      isOpen: true,
      type: 'warning', // Using warning style for revoke (yellow/orange)
      title: 'Revoke API Key',
      message:
        'Are you sure you want to revoke this API key? Any applications using it will immediately lose access.',
      confirmText: 'Revoke Key',
      action: async () => {
        setLoading(true);
        setError(null);
        const response = await apiKeyService.revokeApiKey(keyId);
        if (response.success) {
          await loadApiKeys();
        } else {
          setError(response.error || 'Failed to revoke API key');
        }
        setLoading(false);
        closeConfirmModal();
      },
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const maskKey = (key: string) => {
    return key + '....';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">API Keys</h1>
              <p className="text-neutral-400">
                Manage API keys for your organization. Keys are used to
                authenticate SDK requests.
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              disabled={loading}
              className="px-6 py-3 bg-transparent border border-neutral-700 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-xl font-light">+</span>
              Create Key
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* API Keys Table */}
          <div className="mb-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-white">
                Your API Keys ({apiKeys.length})
              </h2>
            </div>

            {loading && apiKeys.length === 0 ? (
              <div className="text-center py-12 text-neutral-400">
                Loading API keys...
              </div>
            ) : apiKeys.length === 0 ? (
              <div className="text-center py-12 text-neutral-400">
                No API keys yet. Create one to get started.
              </div>
            ) : (
              <>
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-neutral-800 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <div className="col-span-4">Key</div>
                  <div className="col-span-3">Created</div>
                  <div className="col-span-3">Last Used</div>
                  <div className="col-span-2"></div>
                </div>

                {/* Table Rows */}
                {apiKeys.map(apiKey => (
                  <div
                    key={apiKey.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-neutral-800 last:border-b-0 items-center hover:bg-neutral-800/30 transition-colors"
                  >
                    <div className="col-span-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-medium">
                              {apiKey.name}
                            </span>
                            {apiKey.revoked && (
                              <span className="px-2 py-0.5 bg-neutral-800 text-neutral-400 text-xs rounded">
                                Revoked
                              </span>
                            )}
                            <span className="px-2 py-0.5 bg-neutral-800 text-neutral-400 text-xs rounded">
                              {apiKey.environment}
                            </span>
                          </div>
                          <code className="text-sm text-neutral-400 font-mono">
                            {maskKey(apiKey.keyPrefix)}
                          </code>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 text-neutral-400 text-sm">
                      {formatDate(apiKey.createdAt)}
                    </div>
                    <div className="col-span-3 text-neutral-400 text-sm">
                      {apiKey.lastUsedAt
                        ? formatDate(apiKey.lastUsedAt)
                        : 'Never'}
                    </div>
                    <div className="col-span-2 flex items-center gap-2 justify-end">
                      {!apiKey.revoked && (
                        <button
                          onClick={() => handleRevokeKey(apiKey.id)}
                          className="p-2 hover:bg-yellow-500/10 rounded-lg transition-colors text-neutral-400 hover:text-yellow-400"
                          title="Revoke key"
                          disabled={loading}
                        >
                          <AlertCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteKey(apiKey.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-neutral-400 hover:text-red-400"
                        title="Delete key"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Usage Instructions */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-start gap-2 mb-4">
              <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Using Your API Keys
                </h3>
                <p className="text-neutral-400 text-sm mb-4">
                  Initialize the Refactron SDK with your API key:
                </p>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-lg p-4 border border-neutral-800">
              <pre className="text-sm text-neutral-300 font-mono">
                <code>{`from refactron import RefactronClient

client = RefactronClient(api_key="refactron_live_xxx")
session_id = client.create_session(name="My Agent")`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Create API Key Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-2xl p-8 max-w-xl w-full">
            <h2 className="text-2xl font-bold text-white mb-6">
              Create API Key
            </h2>

            {/* Key Name Input */}
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-3">
                Key Name
              </label>
              <input
                type="text"
                value={keyName}
                onChange={e => setKeyName(e.target.value)}
                placeholder="e.g., Production"
                className="w-full bg-transparent border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                disabled={loading}
              />
            </div>

            {/* Environment Selection */}
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-3">
                Environment
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setEnvironment('test')}
                  disabled={loading}
                  className={`py-3 px-6 rounded-lg font-medium transition-colors ${
                    environment === 'test'
                      ? 'bg-white text-black'
                      : 'bg-transparent border border-neutral-700 text-white hover:bg-neutral-800'
                  }`}
                >
                  Test
                </button>
                <button
                  onClick={() => setEnvironment('live')}
                  disabled={loading}
                  className={`py-3 px-6 rounded-lg font-medium transition-colors ${
                    environment === 'live'
                      ? 'bg-white text-black'
                      : 'bg-transparent border border-neutral-700 text-white hover:bg-neutral-800'
                  }`}
                >
                  Live
                </button>
              </div>
              <p className="text-neutral-500 text-sm mt-2 font-mono">
                refactron_{environment}_
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setKeyName('');
                  setEnvironment('live');
                  setError(null);
                }}
                disabled={loading}
                className="py-3 px-6 bg-transparent border border-neutral-700 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKey}
                disabled={loading || !keyName.trim()}
                className="py-3 px-6 bg-neutral-600 text-white rounded-lg font-medium hover:bg-neutral-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Key'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Key Display Modal */}
      {newlyCreatedKey && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0f0f] border border-neutral-800 rounded-2xl p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-white mb-4">
              API Key Created!
            </h2>

            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-400 text-sm">
                <strong>Important:</strong> Save this key now. You won't be able
                to see it again.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-3">
                Your API Key
              </label>
              <div className="flex gap-2">
                <code className="flex-1 bg-[#0a0a0a] border border-neutral-800 rounded-lg px-4 py-3 text-white font-mono text-sm break-all">
                  {newlyCreatedKey}
                </code>
                <button
                  onClick={() => copyToClipboard(newlyCreatedKey)}
                  className="px-4 py-3 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors flex items-center gap-2"
                >
                  {copiedKey ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-white" />
                      <span className="text-white">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => setNewlyCreatedKey(null)}
              className="w-full py-3 px-6 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmModal.action}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        type={confirmModal.type}
        isLoading={loading}
      />
    </DashboardLayout>
  );
};

export default ApiKeys;
