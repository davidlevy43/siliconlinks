
export interface Signal {
  id: string;
  title: string;
  description: string;
  category: string;
  timestamp: string;
  link: string;
  status: 'active' | 'synced' | 'pending';
}

export interface AppState {
  isBooting: boolean;
  signals: Signal[];
  loading: boolean;
  error: string | null;
}
