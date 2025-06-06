import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { render, screen } from '@testing-library/react';

describe('MaxWidthWrapper', () => {
  it('renders children correctly', () => {
    render(
      <MaxWidthWrapper>
        <div>Test Child</div>
      </MaxWidthWrapper>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
}); 