//// move lines below to .e.g _app.tsx when required
//import { enableES5 } from 'immer'
//enableES5()

import produce from 'immer'

export const logger = fn => (set, get) =>
	fn(args => {
		set(args);
		console.log("  new state", get());
	}, get);

export const immer = config => set => {
	return Object.entries(config()).reduce(
		(acc, [key, value]) => ({
			...acc,
			[key]:
				typeof value === "function"
					? (...args) => set(produce(draft => void config(draft)[key](...args)))
					: value
		}),
		{}
	);
};
