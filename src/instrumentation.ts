export const register = async (): Promise<void> => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { setupNodeInstrumentation } = await import('./instrumentation.node');
    setupNodeInstrumentation();
  }
};
