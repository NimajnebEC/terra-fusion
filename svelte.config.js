import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import sequence from "svelte-sequential-preprocessor";
import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-cloudflare";
import { preprocessMeltUI } from "@melt-ui/pp";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			external: [
				"node:*",
				"node:crypto",
				"node:fs",
				"node:stream",
				"node:timers",
				"node:tty",
			],
			alias: {
				fs: "node:fs",
				crypto: "node:crypto",
				stream: "node:stream",
				timers: "node:timers",
				tty: "node:tty",
			},
			esbuild: {
				plugins: [
					NodeModulesPolyfillPlugin(),
					NodeGlobalsPolyfillPlugin()
				]
			}
		}),
	},
};

export default config;
