import { render, screen, fireEvent } from '@testing-library/react';
import { DonationWidget } from '@/components/campaigns/DonationWidget';

// Mock fetch
global.fetch = jest.fn();

describe('DonationWidget', () => {
  const props = {
    campaignId:    'camp_123',
    campaignTitle: 'Test Campaign',
    goalAmount:    100000,
    raisedAmount:  45000,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders preset amounts', () => {
    render(<DonationWidget {...props} />);
    expect(screen.getByText('₹500')).toBeInTheDocument();
    expect(screen.getByText('₹1,000')).toBeInTheDocument();
    expect(screen.getByText('₹5,000')).toBeInTheDocument();
  });

  it('shows progress bar', () => {
    render(<DonationWidget {...props} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows error when name/email missing', async () => {
    render(<DonationWidget {...props} />);
    const btn = screen.getByText(/Donate/i);
    fireEvent.click(btn);
    // toast.error should fire — test via mocking react-hot-toast
  });

  it('renders accessibility attributes on progress bar', () => {
    render(<DonationWidget {...props} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });
});