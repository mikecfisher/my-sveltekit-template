// place files you want to import through the `$lib` alias in this folder.

import { error } from '@sveltejs/kit';

error(300, {
	message: 'This is a test error',
	timestamp: Date.now()
});
