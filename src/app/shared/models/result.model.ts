export interface Result {
    id?: string;
    observations: string;
    conclusions?: string;
    recommendations: string;
    state?: 'completed' | 'cancelled' | null;
}
