import { describe, expect, it, vi } from 'vitest';

import { fireEvent,render } from '../../test/test.util';

import DraggableCard from './DraggableCard';

describe('DraggableCard', () => {
  const setup = (props = {}) =>
    render(
      <DraggableCard
        title="Sample Title"
        id="sample-id"
        onMoveCard={vi.fn()}
        {...props}
      />,
    );

  it('renders correctly with required props', () => {
    const { getByText } = setup();
    expect(getByText('Sample Title')).toBeInTheDocument();
  });

  it('renders the subtitle if provided', () => {
    const { getByText } = setup({ subtitle: 'Sample Subtitle' });
    expect(getByText('Sample Subtitle')).toBeInTheDocument();
  });

  it('toggles expansion state when header is clicked', () => {
    const onToggleExpand = vi.fn();
    const { getByText } = setup({ onToggleExpand });
    fireEvent.click(getByText('Sample Title'));
    expect(onToggleExpand).toHaveBeenCalledWith(true);
    fireEvent.click(getByText('Sample Title'));
    expect(onToggleExpand).toHaveBeenCalledWith(false);
  });

  it('calls onDeleteClick when the delete button is clicked', () => {
    const onDeleteClick = vi.fn();
    const { getByText } = setup({ onDeleteClick });
    fireEvent.click(getByText('Remove'));
    expect(onDeleteClick).toHaveBeenCalled();
  });

  it('does not render delete button when showDelete is false', () => {
    const { queryByText } = setup({ showDelete: false });
    expect(queryByText('Remove')).toBeNull();
  });

  it('does not render arrow when showArrow is false', () => {
    const { queryByText } = setup({ showArrow: false });
    expect(queryByText('▼')).toBeNull();
  });
});
