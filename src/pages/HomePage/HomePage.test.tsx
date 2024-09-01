import { beforeEach,describe, expect, it, vi } from 'vitest';

import { render } from '../../test/test.util';

import HomePage from './HomePage';
import { useHomePage } from './useHomePage';

vi.mock('./useHomePage');

describe('HomePage', () => {
  const mockSavedTemplates = [
    { id: '1', formValue: { templateName: 'Template 1' } },
    { id: '2', formValue: { templateName: 'Template 2' } },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    (useHomePage as vi.Mock).mockReturnValue({
      savedTemplates: mockSavedTemplates,
    });
  });

  it('renders HomePage with saved templates and links', () => {
    const {  getByText } = render(<HomePage />);

    // Check if the "Create new Template" button is rendered
    expect(getByText('Create new Template')).toBeInTheDocument();

    // Check if the "Create new Resume" button is rendered
    expect(getByText('Create new Resume')).toBeInTheDocument();

    // Check if the templates are rendered as DraggableCards
    expect(getByText('Template 1')).toBeInTheDocument();
    expect(getByText('Template 2')).toBeInTheDocument();
  });

  it('renders with no saved templates', () => {
    (useHomePage as vi.Mock).mockReturnValue({
      savedTemplates: [],
    });

    const {  queryByText, getByText } = render(<HomePage />);

    // Check if the "Create new Template" button is rendered
    expect(getByText('Create new Template')).toBeInTheDocument();

    // Check if the "Create new Resume" button is rendered
    expect(getByText('Create new Resume')).toBeInTheDocument();

    // Check that no DraggableCards are rendered
    expect(queryByText('Template 1')).not.toBeInTheDocument();
    expect(queryByText('Template 2')).not.toBeInTheDocument();
  });
});
