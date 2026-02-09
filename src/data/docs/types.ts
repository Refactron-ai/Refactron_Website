import { LucideIcon } from 'lucide-react';

/**
 * Navigation section in the documentation
 */
export interface DocSection {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
}

/**
 * Code sample with language and content
 */
export interface CodeSample {
  language: string;
  code: string;
}

/**
 * Security feature item
 */
export interface SecurityItem {
  title: string;
  copy: string;
}

/**
 * Individual feature or enhancement item
 */
export interface FeatureItem {
  code?: string;
  description: string;
}

/**
 * Feature category (e.g., Performance Analyzer, Security Enhancements)
 */
export interface FeatureCategory {
  title: string;
  items: FeatureItem[];
}

/**
 * Subsection with title and content
 */
export interface SubSection {
  title: string;
  description?: string;
  items?: string[];
}

/**
 * CLI command information
 */
export interface CommandInfo {
  command: string;
  description: string;
}

/**
 * What's New section for a specific version
 */
export interface WhatsNewContent {
  overview: string;
  sections: {
    performanceAnalyzer?: FeatureCategory;
    analyzerEnhancements?: {
      complexity?: FeatureItem[];
      security?: {
        description: string;
        items: string[];
      };
    };
    falsePositiveReduction?: string[];
    documentation?: {
      files: string[];
      additionalInfo: string;
    };
    quality?: {
      coverage: string;
      testSuites: string[];
    };
    // New for v1.0.13
    patternLearning?: FeatureCategory;
    astCaching?: FeatureCategory;
    secureCLI?: FeatureCategory;
    gitRollback?: FeatureCategory;
    securityEnhancements?: FeatureCategory;
    // New for v1.0.15
    repositoryManagement?: FeatureCategory;
    aiPoweredCommands?: FeatureCategory;
    observabilityMetrics?: FeatureCategory;
    ciCdIntegration?: FeatureCategory;
    cliExperience?: FeatureCategory;
    securityFixes?: FeatureCategory;
    compatibility?: FeatureCategory;
  };
}

/**
 * CLI command group
 */
export interface CommandGroup {
  title: string;
  commands: CommandInfo[];
}

/**
 * CLI workflows section content
 */
export interface CLIWorkflowsContent {
  description?: string;
  commands?: CommandInfo[];
  commandGroups?: CommandGroup[];
  cliSample?: string;
}

/**
 * Tutorial item
 */
export interface TutorialItem {
  title: string;
  steps: string[];
}

/**
 * Complete version-specific documentation content
 */
export interface VersionContent {
  version: string;
  whatsNew?: WhatsNewContent;
  cliWorkflows?: CLIWorkflowsContent;
  quickStart?: {
    installation?: string;
    authentication?: string;
    firstAnalysis?: string;
  };
  tutorials?: TutorialItem[];
  coreConcepts?: {
    description: string;
    items?: FeatureItem[];
  };
  security?: {
    description: string;
    items?: SecurityItem[];
  };
  apiReference?: {
    sample: string;
  };
}

/**
 * Common documentation data shared across all versions
 */
export interface CommonDocsData {
  sections: DocSection[];
  pythonApiSample: string;
  cliSamples: {
    cli: string;
  };
  securityItems: SecurityItem[];
  availableVersions: string[];
  quickStart: {
    installation: string;
    authentication: string;
    firstAnalysis: string;
  };
}
