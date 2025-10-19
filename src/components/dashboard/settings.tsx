'use client';

import { useState, ReactNode, FC } from 'react';

interface SettingsCardProps {
    title: string;
    description: string;
    children: ReactNode;
}

const SettingsCard: FC<SettingsCardProps> = ({ title, description, children }) => (
    <div className="bg-background/50 backdrop-blur-md rounded-2xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div>
            {children}
        </div>
    </div>
);

export default function Settings() {
  const [notifications, setNotifications] = useState({ newUsers: true, newBookings: true, cancellations: false });
  const [theme, setTheme] = useState('system');

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setNotifications(prev => ({...prev, [name]: checked}));
  }

  return (
    <div className="p-6 bg-transparent rounded-lg">
        <h2 className="text-2xl font-bold text-foreground mb-4">Settings</h2>
        <div className="space-y-6">
            <SettingsCard title="Theme" description="Choose your preferred theme.">
                 <div className="flex space-x-4">
                    <button onClick={() => setTheme('light')} className={`px-4 py-2 rounded-lg ${theme === 'light' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>Light</button>
                    <button onClick={() => setTheme('dark')} className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>Dark</button>
                    <button onClick={() => setTheme('system')} className={`px-4 py-2 rounded-lg ${theme === 'system' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>System</button>
                </div>
            </SettingsCard>
            <SettingsCard title="Notifications" description="Manage your email notifications.">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="newUsers">New user registrations</label>
                        <input type="checkbox" id="newUsers" name="newUsers" checked={notifications.newUsers} onChange={handleNotificationChange} />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="newBookings">New bookings</label>
                        <input type="checkbox" id="newBookings" name="newBookings" checked={notifications.newBookings} onChange={handleNotificationChange} />
                    </div>
                     <div className="flex items-center justify-between">
                        <label htmlFor="cancellations">Cancellations</label>
                        <input type="checkbox" id="cancellations" name="cancellations" checked={notifications.cancellations} onChange={handleNotificationChange} />
                    </div>
                </div>
            </SettingsCard>
             <SettingsCard title="API Keys" description="Manage your API keys for third-party integrations.">
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">Generate New Key</button>
            </SettingsCard>
        </div>
    </div>
  );
}