import type { ContrastResult, WCAGLevel } from '@tummycrypt/tinyland-color-utils';

export const schedulingBridgeBrandContrast = {
	background: '#faf6ef',
	foreground: '#1e2832',
	requiredLevel: 'AA',
} satisfies {
	background: string;
	foreground: string;
	requiredLevel: Extract<WCAGLevel, 'AA' | 'AAA'>;
};

export type SchedulingBridgeBrandContrastResult = ContrastResult;
