import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import PageError from './PageError.svelte';

test('renders fallback for unknown errors', () => {
	render(PageError, { props: { error: new Error('unexpected') } });

	expect(screen.getByText('Unknown error')).toBeInTheDocument();
	expect(screen.getByText('UnknownError')).toBeInTheDocument();
});

test('renders fallback for non-error values', () => {
	render(PageError, { props: { error: 'something broke' } });

	expect(screen.getByText('Unknown error')).toBeInTheDocument();
});
