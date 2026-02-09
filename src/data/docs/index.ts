import { v1_0_15 } from './versions/v1.0.15';
import { v1_0_13 } from './versions/v1.0.13';
import { v1_0_1 } from './versions/v1.0.1';
import { v1_0_0 } from './versions/v1.0.0';
import { v0_1_0b } from './versions/v0.1.0b';
import { VersionContent } from './types';

// Export types
export * from './types';

// Export common data
export { commonDocsData } from './common';

// Export version-specific content
export { v1_0_15 } from './versions/v1.0.15';
export { v1_0_13 } from './versions/v1.0.13';
export { v1_0_1 } from './versions/v1.0.1';
export { v1_0_0 } from './versions/v1.0.0';
export { v0_1_0b } from './versions/v0.1.0b';

/**
 * Get version-specific content by version string
 * @param version - Version string (e.g., 'v1.0.1')
 * @returns Version content or undefined if not found
 */
export const getVersionContent = (
  version: string
): VersionContent | undefined => {
  const versionMap: Record<string, VersionContent> = {
    'v1.0.15': v1_0_15,
    'v1.0.13': v1_0_13,
    'v1.0.1': v1_0_1,
    'v1.0.0': v1_0_0,
    v0_1_0b: v0_1_0b,
  };

  return versionMap[version];
};
