import { JsonData } from 'json-edit-react';
import { describe, it } from 'vitest';

import { render } from '../../test/test.util'; // Use your custom render setup

import CodeBlockEditor from './CodeBlockEditor';

describe('CodeBlockEditor', () => {
  it('renders successfully', () => {
    const defaultValue: JsonData = { key: 'value' };

    // Render the component to ensure it doesn't throw an error
    render(<CodeBlockEditor defaultValue={defaultValue} onChange={() => {}} />);

    // No need to add any specific assertions; if the render fails, the test will automatically fail
  });
});
