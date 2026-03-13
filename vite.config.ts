import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'node:path';
import { convexLocal } from 'convex-vite-plugin';
import { defineConfig, loadEnv, type PluginOption } from 'vite';

const workspaceRoot = path.resolve(process.cwd()); // add something after in the path resolve for mono repos
const convexProjectDir = workspaceRoot;
const convexFunctionsDir = 'src/convex';

const getEnvValue = (loadedEnv: Record<string, string>, key: string) =>
	process.env[key] ?? loadedEnv[key];

const LOCAL_CONVEX_ENV_KEYS = [] as const;

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

	// add plugins here
	const plugins: PluginOption[] = [tailwindcss(), devtoolsJson(), sveltekit()];

	if (useLocalConvex) {
		plugins.push(
			convexLocal({
				port: 3210,
				siteProxyPort: 3211,
				projectDir: convexProjectDir,
				convexDir: convexFunctionsDir,
				reset: resetLocalBackend,
				envVars: getLocalConvexEnvVars(loadedEnv)
			})
		);
	}

	return {
		envDir: workspaceRoot,
		plugins,
		resolve: {
			alias: {
				'@': path.resolve('./src')
			}
		},
		server: {
			fs: {
				allow: [workspaceRoot]
			}
		}
	};
});
