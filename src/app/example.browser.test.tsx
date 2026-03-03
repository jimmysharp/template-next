import { render } from 'vitest-browser-react';

describe('Example browser test', () => {
  test('should pass', async () => {
    const screen = await render(<div>Hello World</div>);

    await expect.element(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
