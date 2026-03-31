import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import path from 'node:path';
import { convexLocal } from 'convex-vite-plugin';
import { defineConfig, loadEnv, type PluginOption } from 'vite';

const workspaceRoot = path.resolve(process.cwd()); // add something after in the path resolve for mono repos
const convexProjectDir = workspaceRoot;
const convexFunctionsDir = 'src/convex';
const localConvexPort = 3210;
const localConvexSiteProxyPort = 3211;
const localConvexUrl = `http://localhost:${localConvexPort}`;
const localConvexSiteUrl = `http://localhost:${localConvexSiteProxyPort}`;

const getEnvValue = (loadedEnv: Record<string, string>, key: string) =>
	process.env[key] ?? loadedEnv[key];

// update this to include all the env vars needed for the convex backend
const LOCAL_CONVEX_ENV_KEYS = [
	'CONVEX_PRIVATE_BRIDGE_KEY',
	'CLERK_SECRET_KEY',
	'CLERK_JWT_ISSUER_DOMAIN'
] as const;

const getLocalConvexEnvVars = (loadedEnv: Record<string, string>) => {
	return Object.fromEntries(
		// left this like this for now, so more can be added in that are optional later
		[...LOCAL_CONVEX_ENV_KEYS.map((key) => [key, getEnvValue(loadedEnv, key)])].filter(
			([, value]) => typeof value === 'string' && value.length > 0
		)
	);
};

export default defineConfig(({ mode }) => {
	const loadedEnv = loadEnv(mode, workspaceRoot, '');
	const useLocalConvex = getEnvValue(loadedEnv, 'USE_LOCAL_CONVEX') === 'true';
	const resetLocalBackend = getEnvValue(loadedEnv, 'RESET_LOCAL_BACKEND') === 'true';

	if (useLocalConvex) {
		process.env.PUBLIC_CONVEX_URL = localConvexUrl;
		process.env.PUBLIC_CONVEX_SITE_URL = localConvexSiteUrl;
	}

	// add plugins here
	const plugins: PluginOption[] = [tailwindcss(), devtoolsJson(), sveltekit()];

	if (useLocalConvex) {
		plugins.push(
			convexLocal({
				port: localConvexPort,
				siteProxyPort: localConvexSiteProxyPort,
				projectDir: convexProjectDir,
				convexDir: convexFunctionsDir,
				reset: resetLocalBackend,
				envVars: getLocalConvexEnvVars(loadedEnv)
			})
		);
	}

	return {
		envDir: workspaceRoot,
		plugins: [...plugins, svelteTesting()],
		resolve: {
			alias: {
				'@': path.resolve('./src')
			}
		},
		test: {
			environment: 'jsdom',
			setupFiles: ['./vitest-setup.ts'],
			include: ['src/**/*.{test,spec}.{js,ts}']
		},
		server: {
			fs: {
				allow: [workspaceRoot]
			}
		}
	};
});
